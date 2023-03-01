

<template>
	<!-- 圣杯布局 -->
	<div class="home-main">
		<!-- 圣杯布局--左侧占位 -->
		<div class="left"></div>
		<div class="middle">
			<!-- 使用Row和Col分为左右大小两栏 -->
			<Row>
				<Col class="home-main-left">
				<Card class="content-card" shadow style="width:100%; margin-bottom: 10px;" :padding="0">
					<div ref="contentCard" style="padding: 20px 30px 30px 30px;width:100%;">
						<Tabs value="tabPaneDiv1" @on-click="clickTabPlane">
							<TabPane label="题库" name="tabPaneDiv1">
								<div ref="tabPaneDiv1">
									<Space>

										<Select v-model="problemDifficult" :placeholder="problemFiled.difficult"
											style="width:100px">
											<Option v-for="item in cityList" :value="item.value" :key="item.value">{{
												item.label
											}}</Option>
										</Select>
										<Select v-model="problemStatus" :placeholder="problemFiled.status"
											style="width:100px">
											<Option v-for="item in cityList2" :value="item.value" :key="item.value">{{
												item.label
											}}</Option>
										</Select>
										<Select v-model="problemTag" :placeholder="problemFiled.tag"
											style="width:100px">
											<div style="padding: 10px;">
												<Space direction="vertical" size="large" type="flex">
													<Input search placeholder="Enter something..." />
													<Input search enter-button placeholder="Enter something..." />
													<Input search enter-button="Search"
														placeholder="Enter something..." />
												</Space>
											</div>
										</Select>

										<Input placeholder="搜索题目" style="width: auto;float:right;">
										<template #suffix>
											<Icon type="ios-search" />
										</template>
										</Input>

									</Space>
									<!-- 筛选标签长度不为零时显示 -->
									<Space wrap style="padding: 20px 20px 00px 20px;" v-if="tagList.length !== 0">
										<Button shape="circle">
											清除筛选
											<Icon type="md-refresh" />
										</Button>
										<Tag v-for="item in tagList" :key="item" :name="item" type="border" closable
											color="primary" @on-close="handleClose2">标签{{ item + 1 }}</Tag>
									</Space>

									<!-- 表格 -->
									<Table :columns="tabelColums" :data="tableData"
										style="margin-top: 20px;margin-bottom: 20px;">
										<template #status="{ row }">

											<Icon v-if="row.status" type="md-checkmark" color="#19be6b" />
											<Icon v-else="row.status" type="md-checkmark" />
										</template>
										<template #difficult="{ row }">
											<Tag v-if="row.difficult === 1" color="green">简单</Tag>
											<Tag v-else-if="row.difficult === 2" color="orange">普通</Tag>
											<Tag v-else color="red">困难</Tag>
										</template>
										<template #action="{ row, index }">
											<Button type="primary" shape="circle">
												开始挑战
												<Icon type="ios-arrow-forward"></Icon>
											</Button>
										</template>
									</Table>
									<!-- 使用Space可以非常简单的让分页栏居中 -->
									<Space direction="vertical" type="flex" align="center">
										<Page :total="100" :page-size="10" show-elevator show-sizer show-total />
									</Space>
								</div>
							</TabPane>
							<TabPane label="题单" name="tabPaneDiv2">
								<div ref="tabPaneDiv2">
									<List>
										<ListItem v-for="i in [1, 2, 3, 4, 5, 6, 7, 8]">
											<ListItemMeta
												avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
												title="This is title"
												description="This is description, this is description." />
											<template #action>
												<Space>
													<Button type="warning" shape="circle" size="small">
														收藏
														<Icon type="md-star" />
													</Button>
													<Button type="primary" shape="circle" size="small">
														查看
														<Icon type="md-arrow-forward" />
													</Button>
												</Space>
											</template>
										</ListItem>

									</List>
								</div>
								<!-- 使用Space可以非常简单的让分页栏居中 -->
								<Space direction="vertical" type="flex" align="center">
									<Page :total="100" :page-size="10" show-elevator show-sizer show-total />
								</Space>
							</TabPane>
							<TabPane label="我的题单" name="tabPaneDiv3">
								<div ref="tabPaneDiv3">
									<List>
										<ListItem v-for="i in [1, 2, 3, 4, 5, 6, 7, 8]">
											<ListItemMeta
												avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
												title="This is title"
												description="This is description, this is description." />
											<template #action>
												<Button type="primary" shape="circle">
													<Icon type="md-arrow-forward" />
												</Button>
											</template>
										</ListItem>
									</List>
									<!-- 使用Space可以非常简单的让分页栏居中 -->
									<Space direction="vertical" type="flex" align="center">
										<Page :total="100" :page-size="10" show-elevator show-sizer show-total />
									</Space>
								</div>
							</TabPane>
						</Tabs>
					</div>
				</Card>

				</Col>

				<Col class="home-main-right">
				<Card class="content-card" shadow style="width:100%;margin-bottom: 10px;" :padding="0">
					<div class="area-title">
						<h4>Rating排行</h4>
					</div>
					<div style="padding: 0px 15px 15px 15px;">
						<!-- list-header -->
						<div class="content-card-datalist">
							<Col flex="3" style="text-align: center;">
							<span>用户</span>
							</Col>
							<Col flex="2" style="text-align: center;">
							<span>Rating</span>
							</Col>
						</div>
						<!-- list-main-data -->
						<div class="content-card-datalist" v-for="(item, idx) in contentCardDatalist">
							<!-- username -->
							<Col flex="3" style=" text-align: center;padding-left: 10px;">
							<h4>{{ item.username }}</h4>
							</Col>
							<!-- user rating -->
							<Col flex="2" style="text-align: center;padding-left: 10px;">
							<h4>{{ item.rating }}</h4>
							</Col>
						</div>
					</div>
				</Card>
				</Col>
			</Row>
		</div>
		<div class="right"></div>
	</div>
</template>
<script setup name="Problems">
import { reactive, ref } from 'vue';

// it is sorted list
const contentCardDatalist = reactive([
	{ username: "AAAA", rating: 10000 },
	{ username: "BBBB", rating: 9999 },
	{ username: "CCCC", rating: 8888 },
	{ username: "DDDD", rating: 7777 },
	{ username: "EEEE", rating: 6666 },
	{ username: "FFFF", rating: 5555 },
	{ username: "GGGG", rating: 4444 },
	{ username: "HHHH", rating: 3333 },
	{ username: "IIII", rating: 2222 },
	{ username: "JJJJ", rating: 1111 },
])

const problemFiled = reactive({
	difficult: '难度',
	status: '状态',
	tag: '标签'
})

const problemDifficult = ref('')
const problemStatus = ref('')
const problemTag = ref('')
const model = ref('')

const cityList = reactive([
	{ value: 'New York', label: 'New York' },
	{ value: 'London', label: 'London' },
	{ value: 'Sydney', label: 'Sydney' },
	{ value: 'Ottawa', label: 'Ottawa' },
	{ value: 'Paris', label: 'Paris' },
	{ value: 'Canberra', label: 'Canberra' }
])

const cityList2 = reactive([
	{ value: 'New York', label: 'New York' },
	{ value: 'London', label: 'London' },
	{ value: 'Sydney', label: 'Sydney' },
	{ value: 'Ottawa', label: 'Ottawa' },
	{ value: 'Paris', label: 'Paris' },
	{ value: 'Canberra', label: 'Canberra' }
])

const tabelColums = reactive([
	{
		title: ' ',
		key: 'status',
		slot: 'status',
		width: 50,
		align: 'center'
	},
	{
		title: '题号',
		key: 'number',
		width: 90,
		align: 'center'
	},
	{
		title: '题目',
		key: 'title',
		sortable: true
	},
	{
		title: '通过率',
		key: 'rate',
		width: 100,
		align: 'center'
	},
	{
		title: '难度',
		key: 'difficult',
		width: 100,
		slot: 'difficult',
		align: 'center'
	}, {
		title: ' ',
		key: 'action',
		slot: 'action',
		width: 150,
		align: 'center'
	}
])

const tableData = reactive([
	{
		status: true,
		number: 1,
		title: '两数之和',
		rate: 70.3,
		difficult: 1,
		action: 0
	}, {
		status: true,
		number: 2,
		title: '01背包',
		rate: 99.9,
		difficult: 1,
		action: 0
	}, {
		status: true,
		number: 999999,
		title: '完全背包',
		rate: 70.3,
		difficult: 1,
		action: 0
	}, {
		status: true,
		number: 4,
		title: '多重背包问题I',
		rate: 70.3,
		difficult: 2,
		action: 0
	}, {
		status: true,
		number: 5,
		title: '多重背包问题II',
		rate: 30.1,
		difficult: 3,
		action: 0
	},
])

const tagList = reactive([])
const handleClose2 = () => {

}

const contentCard = ref()
const tabPaneDiv1 = ref()
const tabPaneDiv2 = ref()
const tabPaneDiv3 = ref()

const clickTabPlane = (tabPaneName) => {
	let h;
	if (tabPaneName === 'tabPaneDiv1') {
		h = tabPaneDiv1.value.offsetHeight
		contentCard.value.style.height = (h + 102) + 'px'
	} else if (tabPaneName === 'tabPaneDiv2') {
		h = tabPaneDiv2.value.offsetHeight
		contentCard.value.style.height = (h + 135) + 'px'

	} else {
		h = tabPaneDiv3.value.offsetHeight
		contentCard.value.style.height = (h + 102) + 'px'
	}
	console.log(tabPaneName, h)
}

</script>
<style lang="less" scoped>
.home-main {
	height: calc(100vh - 50px);
	width: 100%;
	display: flex;

	.left {
		flex: calc(15vw) 0 0;
		order: 1;
	}

	.middle {
		display: inline;
		flex: auto 1 0;
		order: 2;
		min-width: 910px;
		max-width: 70vw;

		.home-main-left {
			width: 70%;
			padding: 10px;


		}

		.home-main-right {
			width: 30%;
			padding: 10px;
		}

	}

	.content-card {
		border-radius: 20px;

		.area-title {
			padding: 15px;

		}

		.content-card-datalist {
			display: flex;
			width: 100%;
			// background-color: red;
		}
	}

	.right {
		// background-color: darkred;
		flex: calc(15vw) 0 0;
		order: 3;
	}

}

.demo-circle-custom h1 {
	color: #3f414d;
	font-size: 14px;
	font-weight: normal;
}

.demo-circle-custom p {
	color: #657180;
	font-size: 4px;
	margin: 0px 0 5px;
}

.demo-circle-custom span {
	display: block;
	padding-top: 5px;
	color: #657180;
	font-size: 4px;
}

.demo-circle-custom span:before {
	content: '';
	display: block;
	width: 60px;
	height: 1px;
	margin: 0 auto;
	background: #aeaeaf;
	position: relative;
	top: -5px;
}

.demo-circle-custom span i {
	font-style: normal;
	color: #3f414d;
}
</style>


