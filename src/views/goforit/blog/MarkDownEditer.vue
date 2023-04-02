<template>
	<Space class="mdeditor-main" direction="vertical" style="width: 100%;">
		<Row class="top-area" type="flex">
			<Col flex="100px" class="elem-center">
			<span>文章标题：</span>
			</Col>
			<Col flex="auto" class="elem-center">
			<Input v-model="data.blogTitle" show-word-limit maxlength="100" style="flex: 1;"></Input>
			</Col>
			<Col flex="100px" class="elem-center">
			<Button type="primary">发布</Button>
			</Col>
		</Row>
		<v-md-editor v-model="data.problemMdText" :height="data.windowHeight + 'px'"></v-md-editor>
	</Space>
</template>
<script setup name="MarkDownEditer">
import { onMounted, onUnmounted, ref, reactive } from 'vue';
// import { useRouter } from 'vue-router';

// const $router = useRouter();

const data = reactive({
	problemMdText: ``,
	blogTitle: '',
	windowHeight: window.innerHeight,
});

const updateHeight = function () {
	let h = window.innerHeight - 50 - 20 - 45
	if (h < 500) {
		data.windowHeight = 500
	} else {
		data.windowHeight = h
	}
}

onMounted(() => {
	updateHeight()
	window.addEventListener('resize', updateHeight)
})

onUnmounted(() => {
	window.removeEventListener('resize', updateHeight)
})

</script>

<style lang="less" scoped >
.mdeditor-main {

	width: 100%;
	height: 100%;
	min-width: 600px;

	.top-area {
		padding: 10px;
	}

	.mdeditor-card {
		// 把Card向左顶
		// margin-left: 20px;
		// padding: 10px;
		// border-radius: 25px;
		// min-width: 800px;
		// .md-editor{
		// 	height: 100px;
		// }

	}

	.elem-center {
		display: flex;
		align-items: center;
		justify-content: center;
	}

}
</style>