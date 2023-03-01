

<template>


	<!-- 圣杯布局 -->
	<div class="problems-main">
		<Row :wrap="false" style="width:100%">
			<Col flex="auto">
			</Col>
			<Col flex="1200px">
			<Row :wrap="false" class="middle">
				<Col class="problems-main-left" flex="200px">
				<Card title="题库分类" icon="ios-options" :padding="0" shadow style="width: 100%;">
					<CellGroup @on-click="clickCell">
						<Cell :title="item.title" :name="item.title" :label="item.label" :to="item.to"
							v-for="item in cellList" />
					</CellGroup>
				</Card>
				</Col>

				<Col class="problems-main-right" flex="auto">
				<!-- 封装动态面包屑组件 -->
				<DynamicBreadcrumb />
				<Card style="width: 100%;margin-bottom: 20px;">
					<!-- 注释掉的这种方式，我真的很想用，但效果是真的真的真的拉跨 -->
					<!-- <router-view v-slot="{ Component }">
						<transition name="fade">
							<component :is="Component" />
						</transition>
					</router-view> -->
					<transition name="fade">
					<RouterView />
					</transition>
				</Card>
				</Col>
			</Row>
			</Col>
			<Col flex="auto">
			</Col>
		</Row>
	</div>
</template>
<script setup name="Problems">
import { reactive, ref, watch } from 'vue';
import DynamicBreadcrumb from '../../../components/common/DynamicBreadcrumb.vue';
// import { useRouter, useRoute } from 'vue-router'
// const router = useRouter()
// const router = useRoute()

const cellList = reactive([
	{ title: '全部题目', label: 'all problems', to: '/problems/all' },
	{ title: '题单广场', label: 'problem list', to: '/problems/listsquare' },
	{ title: '我的题单', label: 'my problem list', to: '/problems/list' },
])

const breadcrumbItem = ref('全部题目')

const clickCell = (title) => {
	breadcrumbItem.value = title
}

</script>
<style lang="less" scoped>
.problems-main {
	min-height: calc(100vh - 172px);
	width: 100%;


	.middle {
		min-width: 1200px;

		.problems-main-left {
			padding: 10px;
		}

		.problems-main-right {
			min-width: 1000px;
		}

	}



}
</style>


