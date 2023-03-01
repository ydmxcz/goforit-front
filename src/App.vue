<template>
	<div id="app">
		<router-view />
	</div>
</template>
<script setup name="app">
import * as echarts from "echarts";
import { provide } from "vue";
// provide echarts 组件
provide("echarts", echarts);
</script>
