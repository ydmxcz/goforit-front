<template>

	<Row class="blog-main">
		<Col flex="3" style="background-color: gray;">
		</Col>
		<Col class="middle" flex="14" style="height: 100%;">
		<Row style="height: 100%;">
			<Col flex="200px" style="background-color: red;">
				
			</Col>
			<Col flex="auto" style="background-color: blue;">
			</Col>
			<Col flex="200px" style="background-color: green;">
			</Col>
		</Row>

		</Col>
		<Col flex="3" style="background-color: aqua;">
		</Col>
	</Row>
</template>

<script setup name="Blog">
</script>

<style scoped lang="less">
.blog-main {
	height: calc(100vh - 50px);
	width: 100%;
	display: flex;

	.middle {
		min-width: 1000px;
	}
}
</style>