<template>
	<Row :wrap="false" class="listinfo-page">
		<Col flex="auto">
		</Col>
		<Col flex="1200px" class="middle-area">
		<Space direction="vertical" style="width: 100%;">
			<div class="page-header">
				<Row :wrap="false">
					<Col flex="120px">
					<!-- <Avatar shape="square" icon="md-people" size="80" /> -->
					<img src="../../../assets/problem-hot.png" style="width: 90px;height: 90px;border-radius: 15px;">
					<!-- <Avatar shape="square" icon="md-people" src="@/assets/goforit-group.png" size="80" /> -->
					</Col>
					<Col flex="auto">
					<Space direction="vertical" style="width: 100%;">
						<Space :wrap="false" class="problemlist-base-top" split>
							<span style="font-size:20px;height: 20px;">{{ problemlistInfo.title }}</span>
							<!-- <span style="font-size:14px;">ID:{{ problemlistInfo.id }}</span> -->
						</Space>
						<Space>
							<span style="font-size: 14px;margin-right: 10px;">
								<Icon type="md-person" style="margin-right: 10px;" size="18" />
								题单ID：{{ problemlistInfo.id }}
							</span>
							<span style="font-size: 14px;">
								<Icon type="md-person" style="margin-right: 10px;" size="18" />
								创建者：{{ problemlistInfo.userName }}
							</span>
						</Space>
						<Ellipsis :text="problemlistInfo.instruction" :lines="2" tooltip />
						<Row class="problemlist-info-bot" :wrap="false">
							<Col flex="auto">
							<Space wrap>
								<Icon type="ios-pricetags" /><span>题目标签：</span>
								<Tag color="blue" v-for="item in problemlistInfo.tags"> {{ item.name }}</Tag>
							</Space>
							</Col>
							<Col flex="300px">
							<!-- <Button v-if="problemlistInfo.public == 2" style="float: right;" shape="circle" type="primary"
								icon="md-checkmark" disabled>已购买</Button> -->
							<!-- 用户已收藏此题单 -->
							<Button v-if="problemlistInfo.status" style="float: right;" shape="circle" type="error"
								icon="md-close" @click="collectProblemlist">取消收藏</Button>
							<!-- 用户未收藏此题单 -->
							<!-- <Button v-else-if="problemlistInfo.public == 1 && problemlistInfo.status == 0"
								style="float: right;" shape="circle" type="primary" icon="md-add">收藏</Button> -->
							<!-- 此题单不对用户公开收藏 -->
							<Button v-else style="float: right;" shape="circle" type="primary" icon="md-add"
								@click="collectProblemlist">收藏</Button>
							<!-- 用户必须收藏之后才可以随即开始 -->
							<Button v-if="problemlistInfo.status" style="float: right;margin-right: 20px;" shape="circle"
								type="success" icon="md-sync" @click="radomPratice">随机开始</Button>
							</Col>
						</Row>

					</Space>
					</Col>
				</Row>
			</div>
			<Row :wrap="false">
				<Col flex="250px" class="middle-left">
				<Card style="width: 100%;border-radius: 15px;">
					<Space direction="vertical" style="width:100%;">
						<Row :wrap="false" style="text-align: center;font-size: 14px;">
							<Col flex="12">
							<Icon style="margin-right: 5px;color:#ff9900" type="ios-star" size="20" />收藏数</Col><span
								style="color: #abacaf;">|</span>
							<Col flex="12">
							<Icon style="margin-right: 5px;color: #ed4014;" type="md-bonfire" size="20" />活跃度</Col>
						</Row>
						<Row :wrap="false" style="text-align: center;font-size: 12px;">
							<Col flex="12">{{ problemlistInfo.collections }}</Col>
							<Col flex="12">{{ problemlistInfo.activation }}</Col>
						</Row>
						<Divider class="left-divider" v-if="problemlistInfo.deadline != ''" />
						<div v-if="problemlistInfo.deadline != ''" class="left-title">
							<h3>截止时间</h3>
						</div>
						<Space v-if="problemlistInfo.deadline != ''" direction="vertical" style="width: 100%;">
							<span>截止：<span style="font-size: 16px;">2023-06-16</span> </span>
							<span>剩余：
								<CountDown :target="deadlineTime" @on-end="handleEnd" v-font="16" />
							</span>
						</Space>
						<Divider class="left-divider" />
						<div class="left-title">
							<h3>做题数据</h3>
						</div>
						<Space direction="vertical" style="width: 100%;">
							<span>
								完成度：
								<span style="color: #19be6b;font-size: 20px;font-weight: bolder;">
									{{ problemlistInfo.finish }}
								</span>/
								<span style="color: #2db7f5;">{{ problemlistInfo.total }}</span>
							</span>
							<Progress :percent="(((problemlistInfo.finish) / (problemlistInfo.total || 1))*100).toFixed(0)"
								:stroke-width="20" status="active" style="width: 100%;" text-inside />
						</Space>
					</Space>
				</Card>

				</Col>
				<Col flex="auto">
				<Card class="middle-right" style="border-radius: 15px;">
					
					<ProblemlistProblemTable></ProblemlistProblemTable>
				</Card>
				</Col>
			</Row>
		</Space>
		</Col>
		<Col flex="auto">
		</Col>
	</Row>
</template>
<script setup name="ProblemListDetail">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ProblemlistProblemTable from '../../../components/goforit/problem/ProblemlistProblemTable.vue';
import { useStore } from 'vuex';
import http from '../../../plugin/axios';
import msg from '../../../common/msg';
import BigNumber from '_bignumber.js@9.1.1@bignumber.js';

const router = useRouter()
const store = useStore()

const problemlistInfo = reactive({
	title: 'GoForIt热题 HOT 100',
	avator: '',
	userName: 'edmund',
	creator: 12345,
	id: '12345678912341',
	instruction: '精选 100 道GoForIt上最热门的题目，适合初识算法与数据结构的新手和想要在短时间内高效提升的人，熟练掌握这 100 道题，你就已经具备了在代码世界通行的基本能力。',
	problemNum: 999,
	// public 为 1时表示公开可供用户收藏的题单， 0时是团队发起的训练， 2 表示已购买的题单
	public: 2,
	status: false,
	deadline: '',
	tags: [{ id: 1, name: '二分查找' }, { id: 2, name: '排序' }, { id: 3, name: '高精度' }],
	finish: 0,
	total: 0,
	collections: 9,
	activation: 7,
})

const issubmitAble = ref(true)
const deadlineTime = ref(new Date('2023-06-16'))
const algorithmTagList = ref(['二分查找', '排序', '高精度', '前缀和', '位运算',
	'离散化', '区间合并', '单链表', '双链表', '单调栈', '单调队列', 'KMP'])
const handleEnd = () => {
	// 题单倒计时截至处理函数
	// 禁止在此题单提交
	if (problemlistInfo.deadline != '') {
		issubmitAble.value = false
	}
}


const collectProblemlist = async () => {
	if (String(store.getters.userInfo.id) == String(problemlistInfo.creator)) {
        msg.err('自己创建的题单无法取消收藏')
		return
    }
	const { data: res } = await http.post('/problemlist/collect', {
		problemlistId: BigNumber(router.currentRoute.value.params.id),
		userId: BigNumber(store.getters.userInfo.id)
	})
	if (res.code != 200) {
		msg.err(res.msg)
		return
	}
	problemlistInfo.status = !problemlistInfo.status
}

const isCollectProblemlist = async () => {
	const { data: res } = await http.post('/problemlist/is/collected', {
		problemlistId: BigNumber(router.currentRoute.value.params.id),
		userId: BigNumber(store.getters.userInfo.id)
	})
	if (res.code != 200) {
		msg.err(res.msg)
		return
	}
	problemlistInfo.status = Boolean(res.data.status || false)
}

const radomPratice = async () => {
	const { data: res } = await http.post('/problemlist/all/problem', {
		problemlistId: BigNumber(router.currentRoute.value.params.id)
	})
	if (res.code != 200) {
		msg.err(res.msg)
		return
	}
	console.log(res);
	let routeUrl = router.resolve({
		path: "/practice/" + res.data.problemlist[Math.floor(Math.random() * res.data.problemlist.length)].id,
		// query: { id: id }
	});
	window.open(routeUrl.href, '_blank');
}


const getProblemlistDetial = async () => {
	const { data: res } = await http.post('/problemlist/detial', {
		problemlistId: BigNumber(router.currentRoute.value.params.id)
	})
	if (res.code != 200) {
		msg.err(res.msg)
		return
	}
	console.log('problemlist detial', res);
	problemlistInfo.tags = res.data.tags
	problemlistInfo.activation = res.data.info.activation || 0
	problemlistInfo.collections = res.data.info.collections || 0
	problemlistInfo.title = res.data.info.title || ''
	problemlistInfo.avator = res.data.info.avator || ''
	problemlistInfo.creator = res.data.info.creator || 0
	problemlistInfo.userName = res.data.info.userName || ''
	problemlistInfo.instruction = res.data.info.instruction || ''
	problemlistInfo.problemNum = res.data.info.problemNum || 0
}


const getUserProblemlistFinishCount = async () => {

	const { data: res } = await http.post('/problemlist/user/finish/count', {
		problemlistId: BigNumber(router.currentRoute.value.params.id),
		userId: BigNumber(store.getters.userInfo.id)
	})
	if (res.code != 200) {
		msg.err(res.msg)
		return
	}
	try {
		problemlistInfo.finish = res.data.finish || 0
	} catch (e) {
		problemlistInfo.finish = 0
	}
	try {
		problemlistInfo.total = res.data.total || 0
	} catch (e) {
		problemlistInfo.total = 0
	}
	console.log('userInfo', res);
}

onMounted(() => {

	isCollectProblemlist()
	getProblemlistDetial()
	getUserProblemlistFinishCount()
})

</script>

<style scoped lang="less">
.listinfo-page {
	width: 100%;
	min-height: calc(100vh - 172px);

	.middle-area {
		min-width: 1200px;
		margin-bottom: 20px;


		.page-header {
			// background-color: green;
			width: 100%;
			margin-top: 40px;
			padding: 10px;

			.problemlist-base-top {
				display: flex;
				align-items: center;
			}

			.problemlist-info-instruction {
				width: 100%;
				// margin-top: 16px;
			}

			.problemlist-info-bot {
				width: 100%;
				margin-top: 16px;
			}
		}

		.middle-left {
			padding: 0px 10px 0px 0px;

			.left-divider {
				margin-top: 10px;
				margin-bottom: 10px;
			}

			.left-title {
				padding-left: 5px;
				border-left: 3px solid #2d8cf0;
				margin-bottom: 10px;
			}

			.problemlist-top-lang-item {
				width: 100%;
				padding: 5px;

				.problemlist-top-lang-left {
					font-size: 12px;
					background-color: #f2f3f4;
					border-radius: 10px;
					float: left;
					padding-left: 6px;
					padding-right: 6px;
					color: #abacaf;
					margin-right: 20px;
					margin-bottom: 10px;
				}

				.problemlist-top-lang-right {
					float: right;
					font-size: 12px;
				}
			}


		}

		.middle-right {
			width: 100%;
			// border-radius: 15px;

			.top-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 10px 20px;
				font-size: 14px;
				color: #262626;
				background-color: #f2f3f4;
				border-radius: 25px;
			}
		}

	}
}
</style>
