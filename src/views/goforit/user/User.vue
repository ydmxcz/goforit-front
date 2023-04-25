<template>
	<Row :wrap="false" class="userinfo-page">
		<Col flex="auto">
		</Col>
		<Col flex="1200px" class="middle-area">
		<Space direction="vertical" style="width: 100%;">
			<div class="page-header">
				<Row :wrap="false">
					<Col flex="120px">
					<Avatar shape="square" icon="ios-person" size="80" />
					</Col>
					<Col flex="auto">
					<Space direction="vertical" style="width: 100%;">
						<Space :wrap="false" class="user-base-top" split>
							<span style="font-size:20px;height: 20px;">{{ userInfo.username }}</span>
							<span style="font-size:14px;">ID:{{ userInfo.id }}</span>
						</Space>
						<div class="user-info-bot">
							<div style="float: left;font-size: 16px;">全站排名：9999</div>
							<Button style="float: right;" shape="circle" type="primary" icon="md-add">关注</Button>
						</div>
					</Space>
					</Col>
				</Row>
			</div>
			<Row :wrap="false">
				<Col flex="250px" class="middle-left">
				<Card style="width: 100%;border-radius: 15px;">
					<Space direction="vertical" style="width:100%;">
						<Row :wrap="false" style="text-align: center;font-size: 16px;">
							<Col flex="12">关注了</Col><span style="color: #abacaf;">|</span>
							<Col flex="12">关注着</Col>
						</Row>
						<Row :wrap="false" style="text-align: center;font-size: 12px;">
							<Col flex="12">9</Col>
							<Col flex="12">6</Col>
						</Row>
						<div style="padding-left: 5px;border-left: 3px solid #2d8cf0;margin-bottom: 10px;">
							<h3>个人介绍</h3>
						</div>
						<div style="width: 100%;">
							<Ellipsis :text="userInfo.instruction" :lines="2" tooltip />
						</div>
						<Divider style="margin-top: 5px;margin-bottom: 5px;" />
						<div style="padding-left: 5px; border-left: 3px solid #2d8cf0;margin-bottom: 10px;">
							<h3>成就贡献</h3>
						</div>
						<Space direction="vertical" :size="20">
							<Space direction="vertical" :size="2">
								<span style="font-size: 14px;">
									<Icon type="md-eye" style="margin-right: 5px;" color="#2d8cf0" :size="18" />阅读总数：0
								</span>
								<span style="padding: 30px;font-size:12px;">昨日：0</span>
							</Space>
							<Space direction="vertical" :size="3">
								<span style="font-size: 14px;">
									<Icon type="md-thumbs-up" style="margin-right: 5px;" color="#19be6b" :size="18" />
									获得点赞：0
								</span>
								<span style="padding: 30px;font-size:12px;">昨日：0</span>
							</Space>
							<Space direction="vertical" :size="3">
								<span style="font-size: 14px;">
									<Icon type="md-star" style="margin-right: 5px;" color="#ff9900" :size="18" />获得收藏：0
								</span>
								<span style="padding: 30px;font-size:12px;">昨日：0</span>
							</Space>
						</Space>
						<Divider style="margin-top: 5px;margin-bottom: 5px;" />
						<div style="padding-left: 5px; border-left: 3px solid #2d8cf0;margin-bottom: 10px;">
							<h3>语言 - top5</h3>
						</div>
						<div class="user-top-lang-item">
							<div class="user-top-lang-left">Go</div>
							<span class="user-top-lang-right">解题：66</span>
						</div>
						<div class="user-top-lang-item">
							<div class="user-top-lang-left">C++</div>
							<span class="user-top-lang-right">解题：50</span>
						</div>
						<div class="user-top-lang-item">
							<div class="user-top-lang-left">Java</div>
							<span class="user-top-lang-right">解题：30</span>
						</div>
						<div class="user-top-lang-item">
							<div class="user-top-lang-left">Python3</div>
							<span class="user-top-lang-right">解题：20</span>
						</div>
						<div class="user-top-lang-item">
							<div class="user-top-lang-left">Rust</div>
							<span class="user-top-lang-right">解题：10</span>
						</div>
					</Space>
				</Card>

				</Col>
				<Col flex="auto">
				<Space direction="vertical" style="width: 100%;">

					<Row :wrap="false" style="width: 100%;height: 250px;">
						<Col flex="420px" style="padding-right:5px;">
						<Card style="width: 100%;red;height: 100%;border-radius: 10px;">
							<Row :wrap="false">
								<Col flex="200px">
								<Circle :size="200" :trail-width="4" :stroke-width="5" :percent="((303 / 900) * 100).toFixed(2)" stroke-linecap="square"
									stroke-color="#43a3fb">
									<div class="demo-Circle-custom">
										<h1>303</h1>
										<p>完成题目数量</p>
										<span>
											占总数
											<i>{{ ((303 / 900) * 100).toFixed(2) }}%</i>
										</span>
									</div>
								</Circle>

								</Col>
								<Col flex="200px"
									style="padding-left: 20px;display: flex;align-items: center;justify-content: center;">
								<Space direction="vertical" style="width: 100%;">
									<Space :wrap="false">
										<span style="font-size: 12px;color: #b3b3b6;">简单</span>
										<span>
											<span style="font-size: 16px;">203</span>
											<span style="font-size: 12px;color: #b3b3b6;">500</span>
										</span>
										<span style="font-size: 12px;color: #b3b3b6;margin-left: 20px;">已完成 {{
											((203 / 500) * 100).toFixed(2) }}%</span>
									</Space>
									<Progress style="width: 200px;" :percent="((203 / 500) * 100).toFixed(2)"
										stroke-color="#19be6b" :stroke-width="20" text-inside status="active" />
									<Space :wrap="false">
										<span style="font-size: 12px;color: #b3b3b6;">简单</span>
										<span>
											<span style="font-size: 16px;">50</span>
											<span style="font-size: 12px;color: #b3b3b6;">200</span>
										</span>
										<span style="font-size: 12px;color: #b3b3b6;margin-left: 20px;">已完成 {{
											((50 / 200) * 100).toFixed(2) }}%</span>
									</Space>
									<Progress style="width: 200px;" :percent="((50 / 200) * 100).toFixed(2)"
										stroke-color="#ff9900" :stroke-width="20" text-inside status="active" />
									<Space :wrap="false">
										<span style="font-size: 12px;color: #b3b3b6;">简单</span>
										<span>
											<span style="font-size: 16px;">50</span>
											<span style="font-size: 12px;color: #b3b3b6;">200</span>
										</span>
										<span style="font-size: 12px;color: #b3b3b6;margin-left: 20px;">已完成 {{
											((50 / 200) * 100).toFixed(2) }}%</span>
									</Space>
									<Progress style="width: 200px;" :percent="((50 / 200) * 100).toFixed(2)"
										stroke-color="#ed4014" :stroke-width="20" text-inside status="active" />
								</Space>
								</Col>
							</Row>
						</Card>
						</Col>
						<Col flex="auto" style="padding-left:5px;">
						<!-- <Poptip style="width: 100%;" trigger="hover" content="用户Rating分数变化趋势"> -->
						<Card style="width: 100%;red;border-radius: 10px;">
							<span style="position: absolute;">Rating分数</span>
							<div style="width: 100%;height: 215px" ref="ratingChart"></div>
						</Card>
						<!-- </Poptip> -->
						</Col>
					</Row>
					<Card class="middle-right">
						<div style="padding-left: 5px; width: 100%;padding: 10px;height: 50px;">
							<span style="font-size:18px;float: left;height: 100%;align-items: center;display: flex;">过去一年做过
								5 道题</span>
							<span
								style="font-size:12px;float: right;height: 100%;align-items: center;display: flex;">累计提交天数:10
								连续提交:2</span>
						</div>
						<div style="width: 100%;">
							<calendar-heatmap end-date="2023-02-02" :values="timeValue" :locale="calendarHeatLocale"
								:max="6" :range-color="['#ebedf0', '#c0ddf9', '#73b3f3', '#3886e1', '#17459e']" />
						</div>
					</Card>
					<Card class="middle-right">
						<Space style="width: 100%;">
							<div ref="mentListDom" v-for="(item, idx) in menuListData" @click="handleUserInfoPageClick(idx)"
								style="display: flex;align-items: center;justify-content: center;padding: 10px 20px;font-size: 14px;color: #262626;">
								<Icon :type="item.icon" style="margin-right: 3px;" />{{ item.name }}
							</div>
						</Space>
						<div style="width: 100%;margin-top: 20px;">
							<transition name="fade">
								<RouterView></RouterView>
							</transition>
						</div>
					</Card>
				</Space>
				</Col>
			</Row>
		</Space>
		</Col>
		<Col flex="auto">
		</Col>
	</Row>
</template>
<script setup name="User">
// 热力图插件	
import { ref, reactive, onMounted, watch, nextTick, inject } from 'vue';
import { useRouter } from 'vue-router';

import { CalendarHeatmap } from "vue3-calendar-heatmap";

let echarts = inject("echarts"); // 主要

const router = useRouter()

const userInfo = reactive({
	username: 'EdmundShelby',
	instruction: '你好hhhhhhhhhhh',
	id: '1234567891123'
})


const mentListDom = ref([])
const menuListData = ref([
	{ name: '最近通过', path: '/user/' + userInfo.id + '/recentlyPass', icon: 'md-calendar' },
	{ name: '比赛', path: '/user/' + userInfo.id + '/contest', icon: 'ios-podium' },
	{ name: '题单', path: '/user/' + userInfo.id + '/problemList', icon: 'md-paper' },
	{ name: '团队', path: '/user/' + userInfo.id + '/group', icon: 'md-contacts' },
	{ name: '题解', path: '/user/' + userInfo.id + '/solution', icon: 'md-school' },
	{ name: '博客', path: '/user/' + userInfo.id + '/blog', icon: 'md-book' },
])

const handleUserInfoPageClick = (idx) => {
	if (mentListDom.value[idx].id == 'menu-item-active') {
		return
	}
	mentListDom.value.forEach((item, i) => {
		item.id = (i == idx) ? 'menu-item-active' : '';
	})
	router.push(menuListData.value[idx].path)
}

const updateByPath = (path) => {
	menuListData.value.forEach((item, i) => {
		mentListDom.value[i].id = (item.path == path) ? 'menu-item-active' : '';
	})
}

const ratingChart = ref()

// 折线图
const changetype = () => {
	// 获取组件实例
	const machart = echarts.init(ratingChart.value);
	// 设置配置项
	const option = {
		xAxis: {
			type: 'category',
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				data: [150, 230, 224, 218, 135, 147, 260],
				type: 'line'
			}
		]
	}
	// 复制
	machart.setOption(option);
	// 根据页面大小自动响应图表大小
	window.addEventListener("resize", function () {
		machart.resize();
	});
};



watch(
	// 监听router.path的变化
	() => router.currentRoute.value.fullPath,
	(newPath) => {
		if (newPath == undefined) {
			return
		}
		// store.commit('updateCurrPath', newPath)
		updateByPath(newPath)
	},
	{ immediate: false }
);

onMounted(() => {
	nextTick(() => {
		updateByPath(router.currentRoute.value.fullPath)
	})
	// 绘制折线图
	changetype()
})

const timeValue = ref([
	{ date: "2022-08-02", count: 1 },
	{ date: "2022-08-03", count: 2 },
	{ date: "2022-08-04", count: 3 },
	{ date: "2022-08-05", count: 2 },
	{ date: "2022-08-06", count: 3 },
	{ date: "2022-08-07", count: 2 },
	{ date: "2022-08-08", count: 5 },
	{ date: "2022-08-15", count: 4 },
	{ date: "2022-08-22", count: 3 },
	{ date: "2022-08-29", count: 2 },
	{ date: "2022-09-05", count: 1 },
	{ date: "2022-09-28", count: 2 },
	{ date: "2022-09-22", count: 2 },
	{ date: "2022-09-23", count: 2 },
	{ date: "2022-09-24", count: 2 },
	{ date: "2022-10-04", count: 2 },
	{ date: "2022-10-02", count: 2 },
	{ date: "2022-10-10", count: 2 },
	{ date: "2022-10-11", count: 2 },
	{ date: "2022-10-17", count: 2 },
	{ date: "2022-10-19", count: 2 },
	{ date: "2022-10-23", count: 2 },
	{ date: "2022-10-27", count: 2 },
	{ date: "2022-10-28", count: 2 },
	{ date: "2022-10-29", count: 2 },
	{ date: "2022-11-22", count: 2 },
	{ date: "2022-11-30", count: 2 },
	{ date: "2022-12-08", count: 2 },
	{ date: "2022-12-14", count: 2 },
	{ date: "2022-12-24", count: 2 },
	{ date: "2023-01-01", count: 2 },
	{ date: "2023-01-09", count: 2 },
	{ date: "2023-01-14", count: 2 },
	{ date: "2023-01-22", count: 2 },
	{ date: "2023-01-28", count: 2 },
	{ date: "2022-02-03", count: 2 },
	{ date: "2022-02-09", count: 2 },
	{ date: "2022-02-15", count: 2 },
	{ date: "2022-02-21", count: 2 },
	{ date: "2022-03-21", count: 2 },
	{ date: "2022-03-22", count: 2 },
	{ date: "2022-03-23", count: 2 },
	{ date: "2022-03-24", count: 2 },
	{ date: "2022-03-25", count: 2 },
	{ date: "2022-03-26", count: 2 },
	{ date: "2022-03-27", count: 2 },
	{ date: "2022-03-28", count: 2 },
	{ date: "2022-03-31", count: 2 },
	{ date: "2022-04-03", count: 2 },
	{ date: "2022-04-07", count: 2 },
	{ date: "2022-04-04", count: 2 },
	{ date: "2022-04-10", count: 2 },
	{ date: "2022-04-11", count: 2 },
	{ date: "2022-04-14", count: 2 },
	{ date: "2022-04-17", count: 2 },
	{ date: "2022-04-18", count: 2 },
	{ date: "2022-04-21", count: 2 },
	{ date: "2022-04-24", count: 2 },
	{ date: "2022-04-25", count: 2 },
	{ date: "2022-04-28", count: 2 },
	{ date: "2022-05-01", count: 2 },
	{ date: "2022-05-02", count: 2 },
	{ date: "2022-05-05", count: 2 },
	{ date: "2022-05-08", count: 2 },
	{ date: "2022-05-09", count: 2 },
	{ date: "2022-05-12", count: 2 },
	{ date: "2022-05-15", count: 2 },
])

const calendarHeatLocale = ref({
	months: [
		'一月',
		'二月',
		'三月',
		'四月',
		'五月',
		'六月',
		'七月',
		'八月',
		'九月',
		'十月',
		'十一月',
		'十二月',
	],
	days: [
		'周日',
		'周一',
		'周二',
		'周三',
		'周四',
		'周五',
		'周六'
	],
	on: '在',
	less: '较少',
	more: '较多'
})
</script>

<style scoped lang="less">
.userinfo-page {
	width: 100%;


	.middle-area {
		min-width: 1200px;
		margin-bottom: 20px;


		.page-header {
			// background-color: green;
			width: 100%;
			margin-top: 40px;
			padding: 10px;

			.user-base-top {
				display: flex;
				align-items: center;
			}

			.user-info-bot {
				width: 100%;
				margin-top: 16px;
			}
		}

		.middle-left {
			padding: 0px 10px 0px 0px;

			.user-top-lang-item {
				width: 100%;
				padding: 5px;

				.user-top-lang-left {
					font-size: 12px;
					background-color: #f2f3f4;
					border-radius: 10px;
					float: left;
					padding-left: 6px;
					padding-right: 6px;
					color: #abacaf;
				}

				.user-top-lang-right {
					float: right;
					font-size: 12px;
				}
			}


		}

		.middle-right {
			width: 100%;
			border-radius: 15px;
		}

	}
}


#menu-item-active {
	background-color: #f2f3f4;
	border-radius: 10px;
}

.demo-Circle-custom h1 {
	color: #3f414d;
	font-size: 24px;
	font-weight: normal;
}

.demo-Circle-custom p {
	color: #657180;
	font-size: 10px;
	margin: 10px 0 15px;
}

.demo-Circle-custom span {
	display: block;
	padding-top: 15px;
	color: #657180;
	font-size: 10px;
}

.demo-Circle-custom span:before {
	content: '';
	display: block;
	width: 50px;
	height: 1px;
	margin: 0 auto;
	background: #e0e3e6;
	position: relative;
	top: -15px;
}

.demo-Circle-custom span i {
	font-style: normal;
	color: #3f414d;
}

// 以下CSS不要动，是为了调整热力图插件中的样式，
:deep(.vch__day__square) {
	cursor: pointer !important;
	transition: all .2s ease-in-out !important;
}

:deep(.vch__day__square:hover) {
	height: 11px !important;
	width: 11px !important;
}

:deep(svg.vch__wrapper rect.vch__day__square:hover) {
	stroke: rgb(115, 179, 243) !important;
}

:deep(svg.vch__wrapper .vch__months__labels__wrapper text.vch__month__label) {
	font-size: 0.5rem !important;
	font-weight: 400 !important;
}

:deep(svg.vch__wrapper .vch__days__labels__wrapper text.vch__day__label) {
	font-size: 0.5rem !important;
	font-weight: 400 !important;
}

:deep(svg.vch__wrapper .vch__legend__wrapper text) {
	font-size: 0.5rem !important;
	font-weight: 400 !important;
	font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif;
	line-height: 10px;
}

:deep(.vch__legend div) {
	display: flex;
	margin-right: 5px;
	margin-left: 5px;
	font-size: 12px;
	font-size: 0.5rem !important;
	font-weight: 400 !important;
	line-height: 10px;
}

:deep(.vch__external-legend-wrapper div) {
	margin-right: 5px;
}

// :deep(rect) {
// 	rx: 2;
// 	ry: 2;
// }
</style>