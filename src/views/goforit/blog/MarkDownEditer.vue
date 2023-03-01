<template>
	<div class="mdeditor-main">
		<Card class="mdeditor-card" :padding="0">
			<div class="md-preview-wrapper">
				<!-- 用js动态调整高度 -->
				<v-md-editor class="md-editor" v-model="problemMdText" ></v-md-editor>
			</div>
		</Card>
	</div>
</template>
<script setup name="MarkDownEditer">
import { onMounted, ref } from 'vue';
// import { useRouter } from 'vue-router';

// const $router = useRouter();
// const problemId = ref(0)

// const split = ref(0.5)


const problemMdText = ref(`
### Acwing888.数的范围

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

#### 输入样例：`)


</script>

<style lang="less" scoped >
.mdeditor-main {
	// width: calc(100vw);
	// height: calc(100vh - 50px);
	width: 100%;
	height: 100%;
	// 把Card向下顶
	padding-top: 20px;

	.mdeditor-card {
		// 把Card向左顶
		margin-left: 20px;
		height: calc(100vh - 90px);
		width: calc(100vw - 40px);
		padding: 10px;
		border-radius: 25px;
		min-width: 800px;
		// .md-editor{
		// 	height: 100px;
		// }

	}


}
</style>