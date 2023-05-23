<template>
	<Row class="blog-main">
		<Col flex="3">
		</Col>
		<Col class="middle" flex="14" style="height: 100%;">

		<Row class="middle-row" :wrap="false">
			<Col flex="100px">
			<!-- 左半部分分类列表 -->
			<Affix :offset-top="0">
				<Card class="left-class-list" :padding="5" shadow>
					<div ref="blogClassDomList">
						<div class="tag-list" v-for="(item, idx) in blogClassList" @click="handleBlogClassListClick(idx)">
							<Icon :type="item.icon" />{{ item.name }}
						</div>
					</div>

					<Divider style="margin: 5px;" />
					<Poptip class="tag-list" placement="right" width="500" trigger="hover" title="全部分类">
						<Icon type="ios-pricetag" />标签
						<template #content>
							<div class="all-tag">
								<Space style="width: 100%;" direction="vertical" align="start">
									<Space>
										<Input style="width: 100%;" v-model="tagSearchKey" search enter-button
											placeholder="搜索标签" @on-search="searchTag" />
										<Button v-if="tagSearchList.length != 0"
											@click="handleTagSelectClearSearch">清空</Button>
									</Space>
									<Space style="width: 100%;" v-if="tagSearchList.length != 0" direction="vertical">
										<div class="vertical-center item-title"
											style=" borderLeft: 3px solid #2d8cf0 ;background-color: #9dcbfb ;display: flex;align-items: center;">
											搜索结果</div>
										<Space :wrap="true" style="margin-bottom: 16px;">
											<Tag v-for="item in tagSearchList" color="blue" style="cursor: pointer;"
												@click="selectTag(item.name, item)">
												{{ item.name }}
											</Tag>
										</Space>
									</Space>

									<div class="all-tag-item" v-for="(item, idx) in allTagList">
										<div class="vertical-center item-title"
											:style="{ borderLeft: '3px solid ' + colors[idx % colors.length].border, background: colors[idx % colors.length].backGround }">
											{{ item.name }}</div>
										<Row :wrap="true">
											<Tag v-for="subitem in item.tagList" :color="colors[idx % colors.length].tag"
												@click="selectTag(item.name, subitem)" style="margin: 5px;">
												{{ subitem.name }}
											</Tag>
										</Row>
									</div>
								</Space>
							</div>
						</template>
					</Poptip>
				</Card>
			</Affix>
			</Col>
			<!-- 页面主要内容区域 -->
			<Col flex="auto">
			<div style="margin-left: 20px;">
				<DynamicBreadcrumb />
			</div>
			<div style="margin-bottom: 20px;margin-left: 10px;margin-right: 10px;">
				<RouterView />
			</div>
			</Col>
			<Col flex="300px" class="row-right">
			<Space style="width: 100%;" direction="vertical">
				<Button style="background-color: #409EFF; " icon="md-open" class="row-right-top-button"
					@click="router.push('/mdedit/' + store.getters.userInfo.id)">
					写博客
				</Button>
				<!-- <Button style="background-color: #F56C6C;" class="row-right-top-button">
					<Icon type="md-paper" size="16px" /> 我的
				</Button> -->
				<Card class="row-right-search" :shadow="false">
					<h4>搜索</h4>
					<Input v-model="blogSearchKey" search enter-button placeholder="搜索博客" @on-search="searchBlog" />
				</Card>
				<Card class="row-right-hot-tag" :shadow="false">
					<Space direction="vertical">
						<h4>热门标签</h4>
						<Row>
							<Tag v-for="item in hotTag"
								:color="hotTagColors[Math.floor(Math.random() * (hotTagColors.length - 1))]"
								style="margin: 5px;" @click="searchByTag(item.name)">{{ item.name }}</Tag>
						</Row>
					</Space>

				</Card>

				<Card class="row-right-hot-topic">
					<Space direction="vertical" style="width: 100%;">
						<h4>热门分区</h4>
						<div class="hot-topic-item" v-for="item in hotTopic" @click="toTopicDetial(item.id)">
							<div class="hot-topic-item-name vertical-center">{{ item.topicName }}</div>
							<div class="hot-topic-item-arrow vertical-center" style="">></div>
						</div>
					</Space>

				</Card>

			</Space>

			</Col>
		</Row>

		</Col>
		<Col flex="3">
		</Col>
	</Row>
</template>

<script setup name="Blog">
import DynamicBreadcrumb from '../../../components/common/DynamicBreadcrumb.vue';

import { reactive, ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
import msg from '../../../common/msg';
import http from '../../../plugin/axios';
const router = useRouter()
const store = useStore()
const blogClassList = reactive([
	{ name: '最新', to: '/blog/all', icon: 'md-pulse' },
	{ name: '热门', to: '/blog/hot', icon: 'md-thermometer' },
	{ name: '收藏', to: '/blog/collect', icon: 'md-thermometer' },
	// { name: '关注', to: '/blog/subscription', icon: 'md-star' },
	{ name: '分区', to: '/blog/all-topic', icon: 'ios-options' },
])

const blogClassListOriginLen = ref(blogClassList.length)

// 通过 blogClassList 获取博客分类列表的dom
const blogClassDomList = ref()
// 上一次点击左侧标签列表的索引，防止重复点击
let lastPage = 0

// 处理点击事件,更新idx位置的样式
const handleBlogClassListClick = (idx) => {
	if (blogClassList.length > blogClassListOriginLen.value) {
		blogClassList.pop()
	}
	updateAndPushToBlogClassListByIdx(idx)
}

// 通过当前页面路由更新左侧分类列表并跳转，刷新页面时使用
const updateAndPushToBlogClassListByIdx = (idx) => {
	blogClassList.forEach((item, i) => {
		if (i === idx) {
			blogClassDomList.value.children[i].id = 'left-active-item';
			if (i != lastPage) {
				router.push(blogClassList[idx].to)
			}
			lastPage = i
		} else {
			blogClassDomList.value.children[i].id = '';
		}
	})
}

// 通过当前页面路由更新左侧分类列表，刷新页面时使用
const updateBlogClassListByPath = (path) => {
	blogClassList.forEach((item, i) => {
		if (item.to === path) {
			blogClassDomList.value.children[i].id = 'left-active-item';
			lastPage = i
		} else {
			blogClassDomList.value.children[i].id = '';
		}
	})
}

const toTopicDetial = (id) => {
	console.log(id);
	router.push('/blog/topic/' + id)
}


const tagSearchKey = ref('')
const tagSearchList = ref([])
const searchTag = () => {
	console.log(tagSearchKey.value)
	if (tagSearchKey.value == '') {
		return
	}
	allTagList.forEach((i) => {
		i.tagList.forEach((item) => {
			if (item.name.includes(tagSearchKey)) {
				tagSearchList.push({
					id: item.id,
					name: item.name
				})
			}
		})
	})
}

const handleTagSelectClearSearch = () => {
	data.tagSearchList = []
}
// 搜索框数据
const blogSearchKey = ref('')
// 搜索点击事件，按下回车或点击搜索图标触发
// 函数逻辑：在左侧分类列表添加搜索结果一栏并跳转到相应页面
const searchBlog = () => {
	blogClassList.push({ name: '搜索结果', to: '/blog/search/' + blogSearchKey.value, icon: 'md-search' })
	// 当DOM完成刷新时调用，否侧blogClassDomList会因为来不及刷新而更新失败
	nextTick(() => {
		updateAndPushToBlogClassListByIdx(blogClassList.length - 1)
	})

}

const initBlogClassList = () => {
	let path = router.currentRoute.value.fullPath
	if (path.includes('search')) {
		blogClassList.push({ name: '搜索结果', to: '/blogs/search/' + blogSearchKey.value, icon: 'md-search' })
		nextTick(() => {
			blogClassDomList.value.children[blogClassList.length - 1].id = 'left-active-item';
		})
	} else {
		updateBlogClassListByPath(path)
	}
}


const searchByTag = (name) => {
	console.log(name)
}

const hotTag = ref();
const hotTopic = ref();
const getHotBlogTag = async () => {
	const { data: res } = await http.get('/blog/hot/tag')
	if (res.code != 200) {
		msg.err(res.msg)
		return
	}
	hotTag.value = res.data.tags
}


const getHotBlogTopic = async () => {
	const { data: res } = await http.get('/blog/hot/topic')
	if (res.code != 200) {
		msg.err(res.msg)
		return
	}

	hotTopic.value = res.data.topic
	// console.log(res);
}

const getBlogTags = async () => {
	const { data: res } = await http.get('/blog/tag/all')
	if (res.code != 200) {
		msg.err(res.msg)
		return
	}
	allTagList.value = res.data.all
	// console.log(res);
}

const hotTagColors = reactive(['magenta', 'red', 'volcano',
	'orange', 'gold', 'yellow', 'lime',
	'green', 'cyan', 'blue', 'geekblue',
	'purple', 'red', 'yellow', 'magenta',
	'volcano', 'cyan', 'geekblue']);

const colors = reactive([
	{ border: '#2d8cf0', backGround: '#9dcbfb', tag: 'blue' },
	{ border: '#19be6b', backGround: '#a6ecc9', tag: 'green' },
	{ border: '#ff9900', backGround: '#fcd69d', tag: 'orange' }
])

const allTagList = ref(null)

const selectTag = (tagFarther, name) => {
	console.log(tagFarther, name)
}


onMounted(() => {
	getBlogTags()
	getHotBlogTopic()
	getHotBlogTag()
	// 页面刷新时处理左侧标签列表
	initBlogClassList()
})



</script>

<style scoped lang="less">
.blog-main {
	min-height: calc(100vh - 50px);
	width: 100%;


	.middle {

		.middle-row {
			height: 100%;
			min-width: 1000px;

			.left-class-list {
				width: 100%;
				margin-top: 20px;
				border-radius: 15px;

				.tag-list {
					width: 100%;
					height: 40px;
					text-align: center;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.all-tag {
					width: 100%;
					height: 300px;

					.all-tag-item {
						width: 100%;

						.item-title {
							height: 30px;
							margin-bottom: 5px;
							width: 100%;
							// border-left: 3px solid #6ea7f1;
							text-align: left;
							padding-left: 10px;
						}
					}
				}
			}

			.row-main {
				padding: 5px;
				min-width: 570px;
			}

			.row-right {
				padding: 20px 5px 5px 5px;

				.row-right-top-button {
					width: 100%;
					color: #fff;
					height: 40px;
					border-radius: 10px;
					font-size: 16px;
				}

				.row-right-search {
					width: 100%;
					border-radius: 15px;
				}

				.row-right-hot-tag {
					width: 100%;
					// height: 300px;
					border-radius: 15px;
				}

				.row-right-hot-topic {
					width: 100%;
					border-radius: 15px;

					.hot-topic-item {
						padding-left: 10px;
						padding-right: 10px;
						width: 100%;
						height: 40px;
						border-bottom: 1px solid #e9eaeb;

						.hot-topic-item-name {
							width: auto;
							height: 100%;
							float: left;
						}

						.hot-topic-item-arrow {
							height: 100%;
							float: right;
						}
					}

					.hot-topic-item:hover {
						// width: 100%;
						// height: 40px;
						border-bottom: 1px solid #6563fd;
						background-color: #e9eaeb;
					}
				}
			}
		}
	}
}

.vertical-center {
	display: flex;
	align-items: center;
}

.area-title {
	padding: 15px;
}

#left-active-item {
	background-color: #2d8cf0;
	color: #fff;
	border-radius: 10px;
}
</style>