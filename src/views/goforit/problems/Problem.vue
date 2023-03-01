<template>
	<div class="problem-main">
		<!-- <div style="padding: 20px;"> -->
			<Card class="problem-card" :padding="0">
				<Split v-model="split" class="card-split" min="400px" max="400px">
					<template #left>
						<!-- 左半部分 -->
						<div class="split-left">
							<Tabs value="name1" style="height: 100%;overflow-y:hidden;" @on-click="clickTab">
								<TabPane label="题目" name="name1">
									<div class="tab-page-wrapper">
										<v-md-preview :text="problem.info.content"></v-md-preview>
									</div>
								</TabPane>
								<TabPane label="提交记录" name="name2">
									<!-- tab-page-wrapper 样式统一包装tab page页 -->
									<div class="tab-page-wrapper">
										<Table stripe :columns="commitHistoryColumns" :data="commitHistoryList">
											<template #result="{ row }">
												<strong>{{ row.result }}</strong>
											</template>
											<template #mode="{ row, index }">
												<Button type="primary" size="small" style="margin-right: 5px">Test</Button>
											</template>
										</Table>
									</div>
								</TabPane>
								<TabPane label="题解" name="name3">
									<div class="tab-page-wrapper">
										<List item-layout="vertical">
											<ListItem v-for="item in solutionList" :key="item.title">
												<ListItemMeta :avatar="item.avatar" :title="item.title"
													:description="item.description" @click="displaySolution(item)" />
												<template #action>
													<li @click="clickStar">
														<Icon type="ios-star-outline" /> 123
													</li>
													<li @click="clickThumbs">
														<Icon type="ios-thumbs-up-outline" /> 234
													</li>
													<li @click="displaySolution(item)">
														<Icon type="ios-chatbubbles-outline" /> 345
													</li>
												</template>
											</ListItem>
										</List>
									</div>
								</TabPane>

								<TabPane label="视频讲解" name="name4">
									<List item-layout="vertical">
										<!-- 暂时用solutionList -->
										<ListItem v-for="item in solutionList" :key="item.title">
											<ListItemMeta :avatar="item.avatar" :title="item.title"
												:description="item.description" />
											{{ item.content }}
											<template #action>
												<li>
													<Icon type="ios-star-outline" /> 123
												</li>
												<li>
													<Icon type="ios-thumbs-up-outline" /> 234
												</li>
												<li>
													<Icon type="ios-chatbubbles-outline" /> 345
												</li>
											</template>
											<template #extra>
												<img src="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large"
													style="width: 280px">
											</template>
										</ListItem>
									</List>
								</TabPane>

							</Tabs>
						</div>
					</template>
					<template #right>
						<div class="split-right">
							<!-- code-editor-option -->
							<div style="height: 8%;width: 100%; ">
								<table style="height:100%">
									<tr>
										<td class="split-right-td">
											<span>语言:</span>
											<Select style="width:100px" @on-change="handleLanguageChange"
												:placeholder="languages.at(0).language">
												<Option v-for="item in languages" :value="item.language"
													:key="item.language">
													{{ item.language }}
												</Option>
											</Select>

										</td>
										<td class="split-right-td">
											<span>主题:</span>
											<Select v-model="problem.theme" style="width:100px"
												:placeholder="themes.at(0).theme" @on-change="handleThemeChange">
												<Option v-for="item in themes" :value="item.theme" :key="item.theme">
													{{ item.theme }}
												</Option>
											</Select>
										</td>
										<td class="split-right-td">
											<Button type="primary">
												<Icon type="md-refresh" />
											</Button>
										</td>
									</tr>
								</table>

							</div>
							<!-- code-editor-area -->
							<div style="height: 87%;width: 100%; position: relative; overflow: hidden;">
								<CodeMirror v-model:value="codeMirrorOpt.codeContent" :scene="codeMirrorOpt.editorType"
									:height-size="codeMirrorHeight" :language="problem.language" :theme="problem.theme"
									:showDrawer="codeMirrorOpt.showDrawer"></CodeMirror>

								<Drawer placement="bottom" :closable="false" :inner='true' :transfer="false"
									v-model="codeMirrorOpt.showDrawer" :mask-closable="false" :mask="false">
									<Tabs value="tag1" style="padding:0px">
										<TabPane label="自测输入" name="tag1">
											<Input v-model="codeMirrorOpt.userCase" type="textarea" :rows="7" />
										</TabPane>
										<TabPane label="运行结果" name="tag2">
											<h1>HHHHHHHHHHHHHHHHHHHH-2</h1>
										</TabPane>
									</Tabs>
								</Drawer>
							</div>
							<!-- code-editor-button-area -->
							<div style="height: 5%;width: 100%;">
								<table style="height:100%;float: right;margin-right: 20px;">
									<tr>
										<td class="split-right-td">
											<Button @click="handleOpenDrawer">
												<span>Open</span>
											</Button>
										</td>
										<td class="split-right-td">
											<Button>
												<span>运行自测</span>
											</Button>
										</td>
										<td class="split-right-td">
											<Button type="primary" @click="handleSubmitProblem">提交</Button>
										</td>
									</tr>
								</table>
							</div>
						</div>
					</template>
				</Split>
			</Card>
		</div>
	<!-- </div> -->
</template>
<script setup name="Problem">
import CodeMirror from '../../../components/common/CodeMirror.vue';
import { onMounted, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import http from '../../../plugin/axios';
const router = useRouter();
const problemId = ref(0)

const split = ref(0.5)

const codeMirrorHeight = ref(300)
// 屏幕宽度
const windowWidth = ref(0)
// 屏幕高度
const windowHeight = ref(0)
// 生命周期
onMounted(() => {
	getWindowResize()
	window.addEventListener('resize', getWindowResize)
})
// 获取屏幕尺寸
const getWindowResize = function () {
	windowWidth.value = window.innerWidth
	windowHeight.value = window.innerHeight

	let h = windowHeight.value - 110
	if (h > 500) {
		codeMirrorHeight.value = h * 0.87
	}
}

const problem = reactive({
	id: router.currentRoute.value.params.id,
	info: {},
	tags: [],
	language: 'text/x-go',
	theme: 'solarized'
})

const getProblemInfo = async () => {
	const { data: res } = await http.get('/problem/detial?id=' + problem.id)
	console.log(res);
	problem.info = res.data.info
	problem.tags = res.data.tags
}
const handleLanguageChange = (e) => {
	console.log(e);
	languages.forEach((item) => {
		if (item.language == e) {
			problem.language = item.mode
			console.log("set", problem.language);
		}
	})
}

const handleOpenDrawer = () => {

	codeMirrorOpt.showDrawer = !codeMirrorOpt.showDrawer
	if (codeMirrorOpt.showDrawer) {
		codeMirrorHeight.value -= 256
	} else {
		codeMirrorHeight.value += 256
	}
	console.log(codeMirrorHeight.value);
}


const handleThemeChange = (e) => {
	console.log(e);
}

const handleSubmitProblem = () => {
	console.log(codeMirrorOpt.codeContent);
}


const clickThumbs = () => {
	console.log("点赞")
}

const clickStar = () => {
	console.log("收藏")
}

const displaySolution = (item) => {
	console.log("题解详细信息", item)
}
//  tab点击事件用于后期对于不同的标签页向后端发送请求
const clickTab = (colname) => {
	console.log("点击不同的标签页", colname)
}

onMounted(() => {
	getProblemInfo()
	// problemId.value = router.currentRoute.value.params.id
	// console.log('router:', router.currentRoute.value.params);
});

const codeMirrorOpt = reactive({
	userCase: '1 2 3 4 5 6 7 8 9',
	codeContent: `package main

import "fmt"

func main(){
	fmt.Println("Hello World")
}`,
	editorType: 'edit',
	showDrawer: false
})


const showDrawer = ref(false)


// 支持的编程语言与主题
const languages = reactive([
	{ language: 'c++11', mode: 'text/x-c++src' },
	{ language: 'c', mode: 'text/x-csrc' },
	{ language: 'java', mode: 'text/x-java' },
	{ language: 'python', mode: 'text/x-python' },
	{ language: 'go', mode: 'text/x-go' },
])
const themes = reactive([
	{ theme: 'default' },
	{ theme: 'darcula' },
	{ theme: 'idea' },
	{ theme: 'eclipse' },
	{ theme: 'solarized' },
])

const commitHistoryColumns = ref([
	{ title: '提交结果', key: 'result', slot: 'result' },
	{ title: '执行用时', key: 'costTime' },
	{ title: '内存消耗', key: 'memCost' },
	{ title: '语言', key: 'language' },
	{ title: '提交时间', key: 'commitTime' },
	{ title: '模式', key: 'mode', slot: 'mode' },
])

const commitHistoryList = reactive([
	{
		result: 'Accept',
		costTime: '18ms',
		memCost: '4096kb',
		language: 'c++11',
		commitTime: '2016-10-03',
		mode: 'acm',
	},
	{
		result: 'Accept',
		costTime: '18ms',
		memCost: '4096kb',
		language: 'c++11',
		commitTime: '2016-10-03',
		mode: 'acm',
	}, {
		result: 'Accept',
		costTime: '18ms',
		memCost: '4096kb',
		language: 'c++11',
		commitTime: '2016-10-03',
		mode: 'acm',
	}, {
		result: 'Accept',
		costTime: '18ms',
		memCost: '4096kb',
		language: 'c++11',
		commitTime: '2016-10-03',
		mode: 'acm',
	}
])

const solutionList = reactive([
	{
		title: 'This is title 1',
		description: 'This is description, this is description, this is description.',
		avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
		content: 'This is the content, this is the content, this is the content, this is the content.'
	},
	{
		title: 'This is title 2',
		description: 'This is description, this is description, this is description.',
		avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
		content: 'This is the content, this is the content, this is the content, this is the content.'
	},
	{
		title: 'This is title 3',
		description: 'This is description, this is description, this is description.',
		avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
		content: 'This is the content, this is the content, this is the content, this is the content.'
	}
])



const problemMdText = ref(`
### Acwing789.数的范围

给定一个按照升序排列的长度为 n 的整数数组，以及 q 个查询。

对于每个查询，返回一个元素 k 的起始位置和终止位置（位置从 0 开始计数）。problemMdTextproblemMdTextproblemMdTextproblemMdText

如果数组中不存在该元素，则返回 \`-1\`。

#### 输入格式

第一行包含整数 n 和 q，表示数组长度和询问个数。

第二行包含 n 个整数（均在 1∼10000 范围内），表示完整数组。

接下来 q 行，每行包含一个整数 k，表示一个询问元素。

#### 输出格式

共 q 行，每行包含两个整数，表示所求元素的起始位置和终止位置。

如果数组中不存在该元素，则返回 \`-1\`。

#### 数据范围

$1≤n≤100000$
$1≤q≤10000$
$1≤k≤10000$

#### 输入样例：

第二行包含 n 个整数（均在 1∼10000 范围内），表示完整数组。

接下来 q 行，每行包含一个整数 k，表示一个询问元素。

#### 输出格式

共 q 行，每行包含两个整数，表示所求元素的起始位置和终止位置。

如果数组中不存在该元素，则返回 \`-1\`。

#### 数据范围

$1≤n≤100000$
$1≤q≤10000$
$1≤k≤10000$

#### 输入样例：
#### 数据范围

$1≤n≤100000$
$1≤q≤10000$
$1≤k≤10000$

#### 输入样例：
`)
</script>

<style lang="less" scoped >
.problem-main {
	// width: calc(100vw);
	// height: calc(100vh - 50px);
	// width: 100vw;
	overflow-x: hidden;
	// height: 100vh;
	// 把Card向下顶
	padding: 20px;
	
	.problem-card {
		// margin: 20px;
		// 把Card向左顶
		height: calc(100vh - 90px);
		width: calc(100vw - 40px);
		padding: 10px;
		border-radius: 25px;
		min-width: 800px;
		min-height: 520px;
		// margin-bottom: 20px;


		.card-split {
			height: calc(100vh - 110px);
			min-height: 500px;

			.split-left {
				width: 100%;
				height: 100%;
				min-height: 500px;

				.tab-page-wrapper {
					height: calc(100vh - 160px);
					min-height: 480px;
					width: 100%;
					overflow-y: auto;
				}
			}

			.split-right {
				width: 100%;
				height: 100%;
				padding-left: 10px;
				min-height: 500px;

				.split-right-td {
					padding-left: 10px;
				}
			}

		}
	}


}
</style>