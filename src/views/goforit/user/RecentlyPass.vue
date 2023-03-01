<template>
	<div style="width: 100%;height: 56px;" v-for="(item, idx) in items">
		<div v-if="idx % 2 == 0" style="width: 100%;height: 56px;background-color: #f7f7f8;padding-left: 20px;padding-right: 20px;">
			<div style="float: left;height: 56px;display:flex;align-items:center">
				{{ item.title }}
			</div>
			<div style="float: right;height: 56px;display:flex;align-items:center">
				{{ item.time }}
			</div>
		</div>
		<div v-else style="width: 100%;height: 56px;background-color: #fff;padding-left: 20px;padding-right: 20px;">
			<div style="float: left;height: 56px;display:flex;align-items:center">
				{{ item.title }}
			</div>
			<div style="float: right;height: 56px;display:flex;align-items:center">
				{{ item.time }}
			</div>
		</div>
		<!-- <div style="height:100%;display:flex;align-items:center"></div> -->
	</div>
</template>
<script setup name="RecentlyPass">
import { ref } from 'vue';

const items = ref([
	{title:'1072. 按列翻转得到最大值等行数',time:'2 个月前'},
	{title:'2164. 对奇偶下标分别排序',time:'2 个月前'},
	{title:'961. 在长度 2N 的数组中找出重复 N 次的元素',time:'2 个月前'},
	{title:'88. 合并两个有序数组',time:'2 个月前'},
	{title:'2. 两数相加',time:'2 个月前'},
	{title:'263. 丑数',time:'2 个月前'},
	{title:'326. 3 的幂',time:'2 个月前'},
	{title:'1. 两数之和',time:'2 个月前'},
	{title:'面试题 10.01. 合并排序的数组',time:'2 个月前'},
])
</script>

<style scoped lang="less">

</style>