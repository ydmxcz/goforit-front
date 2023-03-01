<template>
	<div class="competirion-page">
		<!-- 页面顶部图片以及标题 -->
		<Row>
			<div class="competition-header-title">
				<div class="title-detail">
					<img src="../../../assets/goforit-white-2-1.png">
					<span>竞赛</span>
				</div>
			</div>
			<img class="competition-top-pic" src="../../../assets/competition-bg.png">
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
					<img src="../../../assets/E2.png" alt="" />
				</div>
				<Space type="flex" direction="vertical" class="userinfo-data" align="center">
					<span style="font-size: 30px;">EdmundShelby</span>
					<span style="font-size: 16px;">清华大学</span>
					<Row class="userinfo-data-row">
						<div style="margin-right: 20px;">总分:--</div>
						<div style="margin-right: 20px;">全国排名: -- </div>
						<div style="margin-right: 20px;">山东省排名: -- </div>
						<div style="margin-right: 20px;">校内排名: --</div>
					</Row>
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
								<Space direction="vertical">
									<CascaderTagSelect title-lv1="方向" title-lv2="分类" :data-list="cascaderList"
										@on-lv2-change="handleLv2Change" @on-lv1-change="handleLv1Change">
									</CascaderTagSelect>
									<TagSelectSignle title="状态" :data-list="['全部', '未开始', '已结束', '进阶']"
										@on-change="handleMyTagClick">
									</TagSelectSignle>
								</Space>
							</div>

							<div style="width: 100%; border-left: 5px solid #25bb9b;padding: 10px;">
								<span style="font-size: 20px;">全部比赛</span>
							</div>
							<CompetitionList v-for="item in competitionItem" :name="item.name"
								:is-original="item.isOriginal" :is-rated="item.isRated"
								:sign-up-start="item.signUpStart" :sign-up-end="item.competitionEnd"
								:competition-start="item.competitionStart" :competition-end="item.competitionEnd"
								:length-time="item.lengthTime" :sponsor="item.sponsor" :number="item.number"
								:status="item.status" :max-rating="item.maxRating" @on-sign-up="handleOnSignUp"/>
							<Space direction="vertical" type="flex" align="center">
								<Page :total="100" :page-size="10" show-elevator show-sizer show-total />
							</Space>
						</Space>
					</Card>
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
	<LoginDialog :flag="loginDialogShow" @on-login="onSuccessLogin"></LoginDialog>

</template>

<script setup name="Competition">
import { ref, reactive } from 'vue';
import CompetitionList from '../../../components/goforit/competition/CompetitionList.vue'
import RatingList from '../../../components/goforit/common/RatingList.vue';
import TagSelectSignle from '../../../components/common/TagSelectSignle.vue';
import CascaderTagSelect from '../../../components/common/CascaderTagSelect.vue';
import LoginDialog from '../../../components/goforit/login/LoginDialog.vue';
const loginDialogShow = ref(false)
const onSuccessLogin = (flag) => {
	console.log("AAA");
	loginDialogShow.value = flag
}

const handleOnSignUp = () => {
	loginDialogShow.value = true	
}


const cascaderList = ref([
	{
		"name": "全部", checked: false,
		"tags": [
			'算法基础训练', 'ACM提高组', 'ICPC模拟赛', 'OI-普及组', 'OI-提高组', '蓝桥杯模拟赛'
		]
	}, {
		"name": "ACM赛制", checked: false,
		"tags": [
			'算法基础训练', 'ACM提高组', 'ICPC模拟赛'
		]
	}, {
		"name": "OI赛制", checked: false,
		"tags": [
			'OI-普及组', 'OI-提高组', '蓝桥杯模拟赛'
		]
	},

])

const handleMyTagClick = (name) => {
	console.log("mtTag:", name)
}

const handleLv1Change = (name) => {
	console.log("lv1:", name)
}

const handleLv2Change = (name) => {
	console.log("lv2:", name)
}

const competitionItem = reactive([{
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

	.competition-header-title {
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

	.competition-top-pic {
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