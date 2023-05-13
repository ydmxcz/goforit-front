<template>
	<div>
		<Space class="mdeditor-main" direction="vertical" style="width: 100%;">
			<Row class="top-area" type="flex">
				<Col flex="100px" class="elem-center">
				<span>文章标题：</span>
				</Col>
				<Col flex="auto" class="elem-center">
				<Input v-model="data.formItem.blogTitle" show-word-limit maxlength="100" style="flex: 1;"></Input>
				</Col>
				<Col flex="100px" class="elem-center">
				<Button type="primary" @click="handlerOpenModal">发布</Button>
				</Col>
			</Row>
			<v-md-editor v-model="data.problemMdText" :height="data.windowHeight + 'px'"></v-md-editor>
		</Space>
		<Modal v-model="data.showCreateBlog" title="发布博客" width="500" :closable="false" :mask-closable="false">
			<Form :model="data.formItem" :label-width="80">
				<FormItem label="文章标题">
					<Input v-model="data.formItem.blogTitle" show-word-limit maxlength="100" style="flex: 1;"></Input>
				</FormItem>
				<FormItem label="选择分类">
					<Select v-model="data.formItem.topicId">
						<Option v-for="item in topicList" :label="item.topicName" :value="item.id"></Option>
					</Select>
				</FormItem>
				<FormItem label="题目标签">
					<Select class="sb-select" :placeholder="data.selectorPlaceholder"
						style="width:160px;margin: 0px 0px 10px 0px;" not-found-text="">
						<div style="width: 500px; padding: 0px 20px 20px 20px;">
							<Space style="width:100% ;margin-bottom: 20px;">
								<Input style="width: 100%;" v-model="data.tagSearchKey" search enter-button
									placeholder="搜索标签" @on-search="searchTag" />
								<Button v-if="data.tagSearchList.length != 0"
									@click="handleTagSelectClearSearch">清空</Button>
							</Space>
							<Space style="width: 100%;" v-if="data.tagSearchList.length != 0" direction="vertical">
								<!-- <div class="vertical-center item-title"
									style=" borderLeft: 3px solid #2d8cf0 ;background-color: #9dcbfb ;">
									搜索结果</div> -->
								<div class="vertical-center item-title"
									:style="{ borderLeft: '3px solid ' + colors[0 % colors.length].border, background: colors[0 % colors.length].backGround }">
									搜索结果</div>
								<Space :wrap="true" style="margin-bottom: 16px;">
									<Tag v-for="item in data.tagSearchList" color="blue"
										style="cursor: pointer;margin: 5px;" @click="handleSelectTag(item.name, item)">
										{{ item.name }}
									</Tag>
								</Space>
							</Space>
							<div class="all-tag-item" v-for="(item, idx) in data.tagList">
								<div class="vertical-center item-title"
									:style="{ borderLeft: '3px solid ' + colors[idx % colors.length].border, background: colors[idx % colors.length].backGround }">
									{{ item.name }}</div>
								<Row :wrap="true">
									<Tag v-for="subitem in item.tagList" :color="colors[idx % colors.length].tag"
										@click="handleSelectTag(item.name, subitem)" style="margin: 5px;">
										{{ subitem.name }}
									</Tag>
								</Row>
							</div>
						</div>
					</Select>
					<Button shape="circle" @click="clearSelectedTag" style="margin: 0px 10px 10px 10px;">
						清除筛选
						<Icon type="md-refresh" />
					</Button>
					<Space wrap style="width: 100%;">
						<Tag v-for="item in data.formItem.selectedTagList" :key="item.id" :name="item.name" type="border"
							closable color="primary" @on-close="handleTagRemove">{{
								item.name }}</Tag>
					</Space>
				</FormItem>
				<FormItem label="博客摘要">
					<Input v-model="data.formItem.abstract" show-word-limit maxlength="255" style="flex: 1;" type="textarea"
						:rows="3"></Input>
				</FormItem>
			</Form>
			<template #footer>
				<div style="width: 100%;height: 40px;">
					<Space style="float: right;">
						<Button @click="createBlogCancel">取消</Button>
						<Button type="primary" @click="createBlogOk">确定</Button>
					</Space>
				</div>
			</template>
		</Modal>
	</div>
</template>
<script setup name="GroupShareEditer">
import { onMounted, onUnmounted, ref, reactive } from 'vue';
import http from '../../../plugin/axios';
import msg from '../../../common/msg';
import { useStore } from 'vuex';
import BigNumber from '_bignumber.js@9.1.1@bignumber.js';
const store = useStore()


const data = reactive({
	problemMdText: ``,
	windowHeight: window.innerHeight,
	showCreateBlog: false,
	formItem: {
		blogTitle: '',
		topicId: 0,
		date: '',
		time: '',
		radio: '',
		search: [],
		abstract: '',
		selectedTagList: [],
		searchKey: '',
		selectedTagMap: new Map(),
	},
	selectorPlaceholder: '点击选择算法标签',
	tagList: [],
	tagSearchKey: '',
	tagSearchList: [],
	// problemList: [],
	// problemListTagMap: new Map()
});

const createBlogCancel = () => {
	let t = data.formItem.blogTitle
	data.formItem = {
		blogTitle: t,
		topicId: 0,
		date: '',
		time: '',
		radio: '',
		search: [],
		abstract: '',
		selectedTagList: [],
		searchKey: '',
		selectedTagMap: new Map(),
	}
	data.showCreateBlog = false
}


const createBlogOk = async () => {
	let ids = []
	data.formItem.selectedTagList.forEach((item) => {
		ids.push(item.id)
	})
	let d = {
		author: BigNumber(store.getters.userInfo.id), // bigint 
		title: data.formItem.blogTitle, // varchar(100) 
		content: data.problemMdText,
		abstract: data.formItem.abstract,
		topicId: Number(data.formItem.topicId),
		tagIds: ids
	}
	if (!d.topicId) {
		msg.err("请选择博客分区")
		return
	}
	if (d.tagIds.length == 0) {
		msg.err('请选择至少一个博客标签')
		return
	}
	console.log(d, data.formItem.topicId);
	const { data: res } = await http.post('/group/discussion/add', d)
	if (res.code != 200) {
		msg.err(res.msg)
		return
	} else {
		msg.ok('发布成功')
	}

	data.showCreateBlog = false
}



const handlerOpenModal = () => {
	getBlogTags()
	getAllTopicList()
	data.showCreateBlog = true
}


const colors = reactive([
	{ border: '#2d8cf0', backGround: '#9dcbfb', tag: 'blue' },
	{ border: '#19be6b', backGround: '#a6ecc9', tag: 'green' },
	{ border: '#ff9900', backGround: '#fcd69d', tag: 'orange' }
])


const updateHeight = function () {
	let h = window.innerHeight - 50 - 20 - 45
	if (h < 500) {
		data.windowHeight = 500
	} else {
		data.windowHeight = h
	}
}

onMounted(() => {
	updateHeight()
	window.addEventListener('resize', updateHeight)
})

onUnmounted(() => {
	window.removeEventListener('resize', updateHeight)
})

const topicList = ref([]);

const getAllTopicList = async () => {
	const { data: res } = await http.get('/blog/select/topic')
	if (res.code != 200) {
		msg.err(res.msg)
		return
	}
	topicList.value = res.data.topicList
}

const getBlogTags = async () => {
	const { data: res } = await http.get('/blog/tag/all')
	if (res.code != 200) {
		msg.err(res.msg)
		return
	}
	data.tagList = res.data.all
	console.log(data.tagList);
}



const searchTag = () => {
	if (data.tagSearchKey == '') {
		return
	}
	data.tagList.forEach((i) => {
		i.tagList.forEach((item) => {
			if (item.name.includes(data.tagSearchKey)) {
				data.tagSearchList.push({
					id: item.id,
					name: item.name
				})
			}
		})
	})
}

const clearSelectedTag = () => {
	data.formItem.selectedTagList = []
	data.formItem.selectedTagMap = new Map()
}

const clearCreateProblemListFormInput = () => {
	data.formItem = {
		search: [],
		selectedTagList: [],
		searchKey: '',
		selectedTagMap: new Map()
	}
}

const handleTagSelectClearSearch = () => {
	data.tagSearchList = []
}

const handleTagRemove = (_, name) => {
	// 删除array指定元素
	let i = 0, id = 0;
	for (i = 0; i < data.formItem.selectedTagList.length; i++) {
		if (data.formItem.selectedTagList[i].name == name) {
			id = data.formItem.selectedTagList[i].id
			break
		}
	}
	data.formItem.selectedTagList.splice(i, 1)
	data.formItem.selectedTagMap.delete(id)
}

const handleSelectTag = (tagFarther, tag) => {
	console.log(tagFarther, tag)
	if (!data.formItem.selectedTagMap.has(tag.id)) {
		data.formItem.selectedTagMap.set(tag.id, 0)
		data.formItem.selectedTagList.push({
			id: tag.id,
			name: tag.name
		})
	}
}

</script>

<style lang="less" scoped >
.mdeditor-main {

	width: 100%;
	height: 100%;
	min-width: 600px;

	.top-area {
		padding: 10px;
	}

	.mdeditor-card {
		// 把Card向左顶
		// margin-left: 20px;
		// padding: 10px;
		// border-radius: 25px;
		// min-width: 800px;
		// .md-editor{
		// 	height: 100px;
		// }

	}

	.elem-center {
		display: flex;
		align-items: center;
		justify-content: center;
	}

}

.all-tag-item {
	width: 100%;
	margin-bottom: 10px;


}

.item-title {
	height: 30px;
	margin-bottom: 5px;
	width: 100%;
	// border-left: 3px solid #6ea7f1;
	text-align: left;
	padding-left: 10px;
}

.vertical-center {
	display: flex;
	align-items: center;
}


.sb-select {
	:deep(.ivu-select-dropdown) {
		max-height: 600px !important;
	}
}
</style>