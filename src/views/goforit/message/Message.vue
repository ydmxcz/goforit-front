<template>
	<Row :wrap="false" style="width:100%;min-height: calc(100vh - 172px);">
		<Col flex="auto">
		</Col>
		<Col flex="1000px">
		<Row :wrap="false">
			<Col flex="200px" style="padding:70px 20px 40px;">
			<div ref="mentListDom" v-for="(item, idx) in menuListData" @click="handleUserInfoPageClick(idx)"
				class="top-btn">
				<Icon :type="item.icon" style="margin-right: 3px;" />{{ item.name }}
			</div>
			</Col>
			<Col flex="auto">
			<DynamicBreadcrumb></DynamicBreadcrumb>
			<transition name="move-right">
				<RouterView></RouterView>
			</transition>
			<!-- 
				官方给的warning中的效果不好，还是使用原来的写法
				<router-view v-slot="{ Component }">
					<transition name="fade">	
						<component :is="Component" />
					</transition>
				
				</router-view>
			 -->
			</Col>
		</Row>
		</Col>
		<Col flex="auto">
		</Col>
	</Row>
</template>
<script setup name='UserMessage'>

import { ref, reactive, onMounted, watch, nextTick, inject } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import DynamicBreadcrumb from '../../../components/common/DynamicBreadcrumb.vue';
const router = useRouter()

const mentListDom = ref([])
const menuListData = ref([
	{ name: '系统通知', path: '/msg/system', icon: 'ios-podium' },
	{ name: '新增粉丝', path: '/msg/attention', icon: 'ios-podium' },
	{ name: '评论', path: '/msg/comment', icon: 'md-paper' },
	{ name: '点赞', path: '/msg/like', icon: 'md-book' },
	{ name: '收藏', path: '/msg/collection', icon: 'md-book' },
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
})
</script>
<style scoped lang='less'>
.top-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10px 20px;
	font-size: 14px;
	color: #262626;
	background-color: #f2f3f4;
	border-radius: 25px;
	margin-bottom: 20px;
}

#menu-item-active {
	color: #fff;
	background: #515a6e;
}
</style>