<template>
    <Card style="border-radius: 15px;">
        <Space direction="vertical" style="width: 100%;">
        <BlogListItem v-for="item in 15" @click="router.push('/blog/article/123')"/>
        <Space direction="vertical" type="flex" align="center">
            <Page :total="100" :page-size="10" show-elevator show-sizer show-total />
        </Space>

    </Space>
    </Card>
</template>

<script setup name="AllBlogs">

import { useRouter } from 'vue-router';
import BlogListItem from '../../../components/goforit/blog/BlogListItem.vue';
const router = useRouter()
</script>

<style scoped lang="less">
</style>