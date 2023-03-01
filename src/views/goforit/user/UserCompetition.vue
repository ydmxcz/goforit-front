<template>
	<Space direction="vertical" style="width: 100%;">
		<div style="display: flex;align-items: center;padding-left: 20px;height:50px;width: 100%;font-size: 18px;border-left: 4px solid #2d8cf0;">
			比赛信息
		</div>
		<Row :wrap="false" style="height:60px">
			<Col flex="4">
			<Space direction="vertical" align="center" class="elem-center">
				<div style="font-size: 24px;">暂无</div>
				<div style="font-size: 14px;color: #ABABAB;">Rating</div>
			</Space>

			</Col>
			<Col flex="4">
			<Space direction="vertical" align="center" class="elem-center">
				<div style="font-size: 24px;">暂无</div>
				<div style="font-size: 14px;col">Rating排名</div>
			</Space>

			</Col>
			<Col flex="4">
			<Space direction="vertical" align="center" class="elem-center">
				<div style="font-size: 24px;">暂无</div>
				<div style="font-size: 14px;color: #ABABAB;">rating</div>
			</Space>

			</Col>
			<Col flex="4">
			<Space direction="vertical" align="center" class="elem-center">
				<div style="font-size: 24px;">暂无</div>
				<div style="font-size: 14px;color: #ABABAB;">rating</div>
			</Space>
			</Col>
		</Row>
		<div style="display: flex;align-items: center;padding-left: 20px;height:50px;width: 100%;font-size: 16px;border-left: 4px solid #2d8cf0;">
			<h4>比赛详情</h4>
		</div>
		<div style="width: 100%;background-color: #f4f4f4;padding:10px 20px">
			<TagSelectSignle title="关于我的" :data-list="['全部','我参加的', '我缺席的', '我创建的']" @on-change="handleMyTagClick"></TagSelectSignle>	
			<TagSelectSignle title="比赛状态" :data-list="['全部','未开始', '已结束']" @on-change="handleStatusClick"></TagSelectSignle>	
		</div>
		<div style="width: 100%;">
			<CompetitionList v-for="item in competitionItem" :name="item.name"
								:is-original="item.isOriginal" :is-rated="item.isRated"
								:sign-up-start="item.signUpStart" :sign-up-end="item.competitionEnd"
								:competition-start="item.competitionStart" :competition-end="item.competitionEnd"
								:length-time="item.lengthTime" :sponsor="item.sponsor" :number="item.number"
								:status="item.status" :max-rating="item.maxRating" />
		</div>
	</Space>
</template>
<script setup name="UserCompetition">

import {ref,reactive} from 'vue'
import TagSelectSignle from '../../../components/common/TagSelectSignle.vue';
import CompetitionList from '../../../components/goforit/competition/CompetitionList.vue'

const handleStatusClick = (name) => {
	console.log("status:",name)
}

const handleMyTagClick = (name) => {
	console.log("mtTag:",name)
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


.elem-center {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>