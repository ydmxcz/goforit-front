<template>
    <Card style="border-radius: 15px;">
        <h1>搜索关键词：{{ searchKey }}</h1>
        <Space direction="vertical" style="width: 100%;">
        <BlogListItem />
        <BlogListItem />
        <BlogListItem />
        <Space direction="vertical" type="flex" align="center">
            <Page :total="100" :page-size="10" show-elevator show-sizer show-total />
        </Space>

    </Space>
    </Card>
</template>

<script setup name="BlogSearchResult">

import BlogListItem from '../../../components/goforit/blog/BlogListItem.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const router = useRouter();
const searchKey = ref(router.currentRoute.value.params.key)
</script>

<style scoped lang="less">
</style>