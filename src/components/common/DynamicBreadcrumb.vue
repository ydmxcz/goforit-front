<template>

    <Breadcrumb :style="{ margin: '24px 0' }">
        <BreadcrumbItem v-for="item in breadlitst">{{ item }}</BreadcrumbItem>
    </Breadcrumb>
</template>

<script setup name="DynamicBreadcrumb">
import { reactive,  watch } from 'vue';

import { useRoute } from 'vue-router'
const router = useRoute()

const breadlitst = reactive([])
// 监听router.path的变化
watch(router, (router) => {
    breadlitst.length = 0
    router.matched.forEach((item, idx) => {
        breadlitst.push(item.meta.title)
    });
},
    { immediate: true }
);
</script>

<style scoped lang="less">

</style>