<template>
	<div class="competirion-page">
		<!-- 页面顶部图片以及标题 -->
		<Row>
			<div class="contest-header-title">
				<div class="title-detail">
					<img src="../../../assets/goforit-white-2-1.png">
					<span>竞赛</span>
				</div>
			</div>
			<img class="contest-top-pic" src="../../../assets/contest-bg.png">
		</Row>
		<!-- 页面最小宽度为1200px -->
		<!-- 图片以下，使用圣杯布局 -->
		<Row :wrap="false">
			<!-- left area -->
			<Col flex="auto">
			</Col>
			<!-- 圣杯布局-main-area -->
			<Col flex="1200px" style="min-width: 1200px;">
			<!-- main-area顶部用户信息区域，包含用户头像和比赛数据区域 -->
			<Card class="userinfo-area">
				<div class="avatar_box">
					<img :src="store.getters.userInfo.avatar" alt="" />
				</div>
				<Space type="flex" direction="vertical" class="userinfo-data" align="center">
					<span style="font-size: 30px;">{{ store.getters.userInfo.userName }}</span>
					<span style="font-size: 16px;">{{ store.getters.userInfo.school }}</span>
					<!-- <Row class="userinfo-data-row">
						<div style="margin-right: 20px;">总分:--</div>
						<div style="margin-right: 20px;">全国排名: -- </div>
						<div style="margin-right: 20px;">山东省排名: -- </div>
						<div style="margin-right: 20px;">校内排名: --</div>
					</Row> -->
				</Space>

			</Card>
			<!-- main-area 比赛信息区域,用户信息区域以下，包含比赛信息的主要区域 -->
			<div class="competitioninfo-area">
				<!-- 75% ---3/4---左侧 -->
				<div class="cia-left">
					<Card style="border-radius: 10px;">
						<Space type="flex" direction="vertical">
							<Input search enter-button placeholder="请输入比赛名称 / 比赛ID进行搜索" />
							<div style="width: 100%;">
								<div v-if="cascaderList.length == 0" style="width: 100%;height: 120px;">
									<Spin fix></Spin>
								</div>
								<Space v-else direction="vertical">
									<CascaderTagSelect title-lv1="方向" title-lv2="分类" :data-list="cascaderList"
										@on-lv2-change="handleClickContestTag" @on-lv1-change="handleLv1Change">
									</CascaderTagSelect>
									<TagSelectSignle title="状态" :data-list="contestStatusTagList"
										@on-change="handleClickContestStatus">
									</TagSelectSignle>
								</Space>
							</div>

							<div style="width: 100%; border-left: 5px solid #ed4014;padding-left: 10px;"
								v-if="contestListInProcess.length > 0">
								<span style="font-size: 16px;">正在进行</span>
							</div>
							<ContestList v-for="item in contestListInProcess" :contest-id="item.id" :name="item.title"
								:is-original="true" :is-rated="item.ratingTop != -1" :sign-up-start="item.signUpStartTime"
								:sign-up-end="item.signUpEndTime" :contest-start="item.startTime"
								:contest-end="item.endTime" :length-time="(item.endTime - item.startTime) / 3600000"
								:sponsor="item.sponsorName" :number="item.signUpNum || 0" :max-rating="item.ratingTop"
								@on-sign-up="handleOnSignUp" @to-detial-page="handleOnSignUp" />
							<div style="width: 100%;height: 50px;" v-if="contestListInProcess.length > 10">
								<Button type="text" style="float: right;">查看所有正在进行的比赛</Button>
							</div>
							<div style="width: 100%; border-left: 5px solid #4ea3fa;padding-left: 10px;"
								v-if="contestListNotStrated.length > 0">
								<span style="font-size: 16px;">等你来战</span>
							</div>
							<ContestList v-for="item in contestListNotStrated" :contest-id="item.id" :name="item.title"
								:is-original="true" :is-rated="item.ratingTop != -1" :sign-up-start="item.signUpStartTime"
								:sign-up-end="item.signUpEndTime" :contest-start="item.startTime"
								:contest-end="item.endTime" :length-time="(item.endTime - item.startTime) / 3600000"
								:sponsor="item.sponsorName" :number="item.signUpNum || 0" :max-rating="item.ratingTop"
								@on-sign-up="handleOnSignUp" @to-detial-page="handleOnSignUp" />

							<div style="width: 100%;height: 50px;" v-if="contestListNotStrated.length > 0">
								<Button type="text" style="float: right;">查看所有正在报名的比赛</Button>
							</div>
							<div style="width: 100%; border-left: 5px solid #9b9b9b;padding-left: 10px;"
								v-if="contestListFinished.length > 0">
								<span style="font-size: 16px;">已结束</span>
							</div>
							<ContestList v-for="item in contestListFinished" :contest-id="item.id" :name="item.title"
								:is-original="true" :is-rated="item.ratingTop != -1" :sign-up-start="item.signUpStartTime"
								:sign-up-end="item.signUpEndTime" :contest-start="item.startTime"
								:contest-end="item.endTime" :length-time="(item.endTime - item.startTime) / 3600000"
								:sponsor="item.sponsorName" :number="item.signUpNum || 0" :max-rating="item.ratingTop"
								@on-sign-up="handleOnSignUp" @to-detial-page="handleOnSignUp" />
							<div style="width: 100%;height: 50px;" v-if="contestListFinished.length > 10">
								<Button style="background-color: #9b9b9b;float: right;" type="text">查看所有已结束的比赛</Button>
							</div>
						</Space>
					</Card>
					<div style="width: 100%;height: 100px;display: flex;align-items: center;justify-content: center;">
						<Button type="success" size="large" @click="router.push('/contest/all/list')">查看全部比赛>></Button>
					</div>
				</div>
				<!-- 25% ---1/4---右侧 -->
				<div class="cia-right">
					<Card style="width: 100%;border-radius: 10px;">
						<h4>Rating排行榜</h4>
						<RatingList />
					</Card>
				</div>
			</div>
			</Col>
			<!-- 圣杯布局-right-area -->
			<Col flex="auto">
			</Col>
		</Row>
	</div>
	<!-- <LoginDialog :flag="loginDialogShow" @on-login="onSuccessLogin"></LoginDialog> -->
</template>

<script setup name="Contest" >
import { ref, reactive, onMounted } from 'vue';
import ContestList from '../../../components/goforit/contest/ContestList.vue'
import RatingList from '../../../components/goforit/common/RatingList.vue';
import TagSelectSignle from '../../../components/common/TagSelectSignle.vue';
import CascaderTagSelect from '../../../components/common/CascaderTagSelect.vue';
import http from '../../../plugin/axios';
import msg from '../../../common/msg';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
const router = useRouter()
const store = useStore()
const contestStatusTagList = ref([
	{ label: '全部', value: 0 },
	{ label: '未开始', value: 1 },
	{ label: '已结束', value: 2 },
	{ label: '正在进行', value: 3 }
]);


const handleOnSignUp = (id) => {
	// loginDialogShow.value = true
	router.push("/contest/detail/" + id)
}

const getContestTags = async () => {
	const { data: res } = await http.get('/contest/tags')
	if (res.code != 200) {
		msg.err(res.msg)
		return
	}
	cascaderList.value = [{
		id: 0, name: '全部', tags: [{ id: 0, name: '全部' }]
	}]
	res.data.tagList.forEach((item) => {
		item.tags.forEach((subItem) => {
			cascaderList.value[0].tags.push(subItem)
		})
		cascaderList.value.push(item)
	})
}

const cascaderList = ref([])
const contestListFinished = ref([])
const contestListNotStrated = ref([])
const contestListInProcess = ref([])
const queryContestStatus = ref(0)
const queryContestTagId = ref(0)

const getContestList = async () => {
	let d = {
		tagId: queryContestTagId.value,
		status: queryContestStatus.value
	}
	console.log(d);
	const { data: res } = await http.post('/contest/with/status', d)
	if (res.code != 200) {
		msg.err(res.msg)
		return
	}
	try {
		contestListFinished.value = res.data.finished || []

	} catch (e) {
		contestListFinished.value = []
	}
	try {
		contestListInProcess.value = res.data.inProcess || []

	} catch (e) {
		contestListInProcess.value = []
	}
	try {
		contestListNotStrated.value = res.data.notStarted || []

	} catch (e) {
		contestListNotStrated.value = []
	}
}


onMounted(() => {
	getContestList()
	getContestTags()
})

const handleClickContestStatus = (t) => {
	queryContestStatus.value = t
	getContestList()
}

const handleLv1Change = (t) => {
}

const handleClickContestTag = (t) => {
	queryContestTagId.value = t.id
	getContestList()

}

const competitionItem = reactive([{
	id: 1,
	name: '2023牛客寒假算法基础集训营1',
	isOriginal: true,
	isRated: true,
	signUpStart: '2022-11-10 10:00',
	signUpEnd: '2023-01-30 18:00',
	competitionStart: '2023-02-01 13:00',
	competitionEnd: '2023-02-01 18:00',
	lengthTime: 666,
	sponsor: 'nowcoder.com',
	number: 999999,
	status: true,
	// maxRating:2199,
}, {
	id: 2,
	name: '2023牛客寒假算法基础集训营2',
	isOriginal: true,
	isRated: true,
	signUpStart: '2022-11-10 10:00',
	signUpEnd: '2023-01-30 18:00',
	competitionStart: '2023-02-01 13:00',
	competitionEnd: '2023-02-01 18:00',
	lengthTime: 5,
	sponsor: 'nowcoder.com',
	number: 999999,
	status: true,
	maxRating: 2199,
}, {
	id: 3,
	name: '2023牛客寒假算法基础集训营3',
	isOriginal: true,
	isRated: true,
	signUpStart: '2022-11-10 10:00',
	signUpEnd: '2023-01-30 18:00',
	competitionStart: '2023-02-01 13:00',
	competitionEnd: '2023-02-01 18:00',
	lengthTime: 5,
	sponsor: 'nowcoder.com',
	number: 999999,
	status: true,
	maxRating: 2199,
}, {
	id: 4,
	name: '2023牛客寒假算法基础集训营4',
	isOriginal: true,
	isRated: true,
	signUpStart: '2022-11-10 10:00',
	signUpEnd: '2023-01-30 18:00',
	competitionStart: '2023-02-01 13:00',
	competitionEnd: '2023-02-01 18:00',
	lengthTime: 5,
	sponsor: 'nowcoder.com',
	number: 999999,
	status: false,
	maxRating: 2199,
}, {
	id: 5,
	name: '2023牛客寒假算法基础集训营5',
	isOriginal: true,
	isRated: false,
	signUpStart: '2022-11-10 10:00',
	signUpEnd: '2023-01-30 18:00',
	competitionStart: '2023-02-01 13:00',
	competitionEnd: '2023-02-01 18:00',
	lengthTime: 5,
	sponsor: 'nowcoder.com',
	number: 999999,
	status: false,
	maxRating: 2199,
}, {
	id: 6,
	name: '2023牛客寒假算法基础集训营6',
	isOriginal: false,
	isRated: false,
	signUpStart: '2022-11-10 10:00',
	signUpEnd: '2023-01-30 18:00',
	competitionStart: '2023-02-01 13:00',
	competitionEnd: '2023-02-01 18:00',
	lengthTime: 5,
	sponsor: 'nowcoder.com',
	number: 999999,
	status: false,
	maxRating: 2199,
}])

</script>

<style scoped lang="less">
.competirion-page {
	width: 100%;
	min-height: calc(100vh - 50px);
	// position: relative;

	.elem-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.contest-header-title {
		height: 0px;
		width: 100%;
		min-width: 1200px;
		position: absolute;
		top: 180px;
		display: flex;
		justify-content: center;
		align-items: center;

		.title-detail {
			width: 350px;
			height: 100px;
			display: inline-flex;

			img {
				width: 200px;
				height: 100px;
			}

			span {
				color: #fff;
				font-size: 60px;
				text-align: center;
				width: 150px;
			}
		}
	}

	.contest-top-pic {
		width: 100%;
		height: 300px;
		min-height: 300px;
		min-width: 800px;
		background-position: bottom center;
		background-repeat: no-repeat;
	}


	.userinfo-area {
		// margin-left: 10px;
		// margin-right: 10px;
		width: 100%;
		border-radius: 10px;
		// position: relative;

		.avatar_box {
			padding: 10px;
			height: 130px;
			width: 130px;
			box-shadow: 0 0 10px #ddd;
			border: 1px, solid #eee;
			border-radius: 50%;
			position: absolute;
			left: 50%;
			transform: translate(-50%, -80%);
			background-color: #fff;

			img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
				background-color: #eee;
			}
		}

		.userinfo-data {
			width: 100%;
			margin-top: 25px;

			.userinfo-data-row {
				width: 100%;
				font-size: 18px;
			}
		}

	}

	.competitioninfo-area {
		display: inline-flex;
		width: 100%;
		margin-top: 20px;
		margin-bottom: 20px;

		.cia-left {
			// height: 200px;
			width: 900px;
			padding-right: 10px;
			min-width: 800px;
		}

		.cia-right {
			padding-left: 10px;
			// height: 200px;
			width: 300px;
			min-width: 200px;
		}
	}
}
</style>