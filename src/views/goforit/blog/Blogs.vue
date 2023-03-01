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
						<div class="tag-list" v-for="(item, idx) in blogClassList"
							@click="handleBlogClassListClick(idx)">
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
										<Button>清空</Button>
									</Space>

									<div class="all-tag-item" v-for="item in allTagList">
										<div class="vertical-center item-title"
											:style="{ borderLeft: '3px solid ' + item.color, background: item.colorBg }">
											{{ item.name }}</div>
										<Row :wrap="true">
											<Tag v-for="subitem in item.children" :color="subitem.color"
												@click="searchInAllTag(item.name, subitem)" style="margin: 5px;">{{
													subitem.name
												}}
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
				<Button style="background-color: #409EFF; " class="row-right-top-button">
					<Icon type="md-open" size="16px" /> 写博客
				</Button>
				<Button style="background-color: #F56C6C;" class="row-right-top-button">
					<Icon type="md-paper" size="16px" /> 我的
				</Button>
				<Card class="row-right-search" :shadow="false">
					<h4>搜索</h4>
					<Input v-model="blogSearchKey" search enter-button placeholder="搜索博客" @on-search="searchBlog" />
				</Card>
				<Card class="row-right-hot-tag" :shadow="false">
					<Space direction="vertical">
						<h4>热门标签</h4>
						<Row>
							<Tag v-for="item in hotTagList" :color="item.color" style="margin: 5px;"
								@click="searchByTag(item.text)">{{ item.text }}</Tag>
						</Row>
					</Space>

				</Card>

				<Card class="row-right-hot-topic">
					<Space direction="vertical" style="width: 100%;">
						<h4>热门分区</h4>
						<div class="hot-topic-item" v-for="item in hotTopicList">
							<div class="hot-topic-item-name vertical-center">{{ item.name }}</div>
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
const router = useRouter()
const blogClassList = reactive([
	{ name: '最新', to: '/blog/all', icon: 'md-pulse' },
	{ name: '热门', to: '/blog/hot', icon: 'md-thermometer' },
	{ name: '关注', to: '/blog/subscription', icon: 'md-star' },
	{ name: '分区', to: '/blog/tag/all', icon: 'ios-options' },
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

const tagSearchKey = ref('')
const searchTag = () => {
	console.log(tagSearchKey.value)
}
// 搜索框数据
const blogSearchKey = ref('')
// 搜索点击事件，按下回车或点击搜索图标触发
// 函数逻辑：在左侧分类列表添加搜索结果一栏并跳转到相应页面
const searchBlog = () => {
	blogClassList.push({ name: '搜索结果', to: '/blogs/search/' + blogSearchKey.value, icon: 'md-search' })
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


const hotTagList = reactive([
	{ color: 'magenta', text: 'ascdscsd' },
	{ color: 'red', text: 'asc' },
	{ color: 'volcano', text: 'ascasdasddscsd' },
	{ color: 'orange', text: 'ascdscscdd' },
	{ color: 'gold', text: 'ascd' },
	{ color: 'yellow', text: 'ascdsdscsd' },
	{ color: 'lime', text: 'ascdcsd' },
	{ color: 'green', text: 'ascdcsdsdcscsd' },
	{ color: 'cyan', text: 'ascds' },
	{ color: 'blue', text: 'ascdssdccsd' },
	{ color: 'geekblue', text: 'ad' },
	{ color: 'purple', text: 'asdcdscscdscsd' },
	{ color: '#FFA2D3', text: 'ascdd' },
	{ color: 'red', text: 'ascdcsdscsd' },
	{ color: 'yellow', text: 'ascdscdsd' },
	{ color: 'magenta', text: 'ascdscsd' },
	{ color: 'volcano', text: 'ascdscssdcsdcd' },
	{ color: 'cyan', text: 'ascds' },
	{ color: 'geekblue', text: 'asc' },
])

const searchByTag = (tagName) => {
	console.log(tagName)
}

const hotTopicList = reactive([
	{ name: '学习讨论', id: '12345' },
	{ name: '技术分享', id: '12345' },
	{ name: '开源推荐', id: '12345' },
	{ name: '蓝桥杯', id: '12345' },
	{ name: '站内公告', id: '12345' },
])

const allTagList = reactive([
	{
		name: '算法', id: '1', colorBg: '#9dcbfb', color: '#2d8cf0', children: [
			{ name: '分布式系统', id: '1', color: 'blue' },
			{ name: 'Go', id: '1', color: 'blue' },
			{ name: 'Java', id: '1', color: 'blue' },
			{ name: 'MySQL', id: '1', color: 'blue' },
			{ name: 'Redis', id: '1', color: 'blue' },
			{ name: 'Kafka', id: '1', color: 'blue' },
			{ name: 'ElasticSearch', id: '1', color: 'blue' },
			{ name: 'Spring', id: '1', color: 'blue' },
			{ name: 'SpringCloud', id: '1', color: 'blue' },
			{ name: 'Linux', id: '1', color: 'blue' },
			{ name: '计算机网络', id: '1', color: 'blue' },
			{ name: '算法', id: '1', color: 'blue' },
			{ name: '面试', id: '1', color: 'blue' },
			{ name: '架构', id: '1', color: 'blue' },
			{ name: '数据库', id: '1', color: 'blue' },
			{ name: 'Kubernetes', id: '1', color: 'blue' },
			{ name: 'Docker', id: '1', color: 'blue' },
			{ name: '源码阅读', id: '1', color: 'blue' },
		]
	}, {
		name: '后端', id: '1', colorBg: '#9dcbfb', color: '#2d8cf0', children: [
			{ name: '分布式系统', id: '1', color: 'blue' },
			{ name: 'Go', id: '1', color: 'blue' },
			{ name: 'Java', id: '1', color: 'blue' },
			{ name: 'MySQL', id: '1', color: 'blue' },
			{ name: 'Redis', id: '1', color: 'blue' },
			{ name: 'Kafka', id: '1', color: 'blue' },
			{ name: 'ElasticSearch', id: '1', color: 'blue' },
			{ name: 'Spring', id: '1', color: 'blue' },
			{ name: 'SpringCloud', id: '1', color: 'blue' },
			{ name: 'Linux', id: '1', color: 'blue' },
			{ name: '计算机网络', id: '1', color: 'blue' },
			{ name: '算法', id: '1', color: 'blue' },
			{ name: '面试', id: '1', color: 'blue' },
			{ name: '架构', id: '1', color: 'blue' },
			{ name: '数据库', id: '1', color: 'blue' },
			{ name: 'Kubernetes', id: '1', color: 'blue' },
			{ name: 'Docker', id: '1', color: 'blue' },
			{ name: '源码阅读', id: '1', color: 'blue' },
		]
	}, {
		name: '前端', id: '1', colorBg: '#a6ecc9', color: '#19be6b', children: [
			{ name: 'Html', id: '1', color: 'green' },
			{ name: 'JavaScript', id: '1', color: 'green' },
			{ name: 'TypeScript', id: '1', color: 'green' },
			{ name: 'CSS', id: '1', color: 'green' },
			{ name: 'Vue', id: '1', color: 'green' },
			{ name: 'Node.js', id: '1', color: 'green' },
			{ name: 'Next.js', id: '1', color: 'green' },
			{ name: 'React', id: '1', color: 'green' },
			{ name: 'Webpack', id: '1', color: 'green' },
			{ name: 'Flutter', id: '1', color: 'green' },
		]
	}, {
		name: 'Android', id: '1', colorBg: '#fcd69d', color: '#ff9900', children: [
			{ name: 'Java', id: '1', color: 'orange' },
			{ name: 'Go', id: '1', color: 'orange' },
			{ name: 'MySQL', id: '1', color: 'orange' },
			{ name: 'Redis', id: '1', color: 'orange' },
			{ name: 'Kafka', id: '1', color: 'orange' },
			{ name: 'ElasticSearch', id: '1', color: 'orange' },
			{ name: 'Spring', id: '1', color: 'orange' },
			{ name: 'SpringCloud', id: '1', color: 'orange' },
			{ name: 'Linux', id: '1', color: 'orange' },
			{ name: '计算机网络', id: '1', color: 'orange' },
			{ name: '算法', id: '1', color: 'orange' },
			{ name: '面试', id: '1', color: 'orange' },
			{ name: '架构', id: '1', color: 'orange' },
			{ name: '数据库', id: '1', color: 'orange' },
		]
	}
])

const searchInAllTag = (tagFarther, tagName) => {
	console.log(tagFarther, tagName)
}


onMounted(() => {
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
					height: 300px;
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