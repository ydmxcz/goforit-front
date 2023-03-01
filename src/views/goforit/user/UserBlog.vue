<template>
    <Timeline>
        <TimelineItem>
            <p class="time">1976年</p>
            <BlogListItem @click="router.push('/blog/article/123')" />
            <BlogListItem @click="router.push('/blog/article/123')" />
            <BlogListItem @click="router.push('/blog/article/123')" />
        </TimelineItem>
        <TimelineItem>
            <p class="time">1984年</p>
            <BlogListItem @click="router.push('/blog/article/123')" />

        </TimelineItem>
        <TimelineItem>
            <p class="time">2007年</p>
            <BlogListItem @click="router.push('/blog/article/123')" />

        </TimelineItem>
        <TimelineItem>
            <p class="time">2010年</p>
            <BlogListItem @click="router.push('/blog/article/123')" />

        </TimelineItem>
        <TimelineItem>
            <p class="time">2011年10月5日</p>
            <BlogListItem @click="router.push('/blog/article/123')" />
        </TimelineItem>
    </Timeline>
</template>
<script setup name='UserBlog'>
import { useRouter } from 'vue-router';
import BlogListItem from '../../../components/goforit/blog/BlogListItem.vue';
import { onMounted } from "vue"; // 主要
const router = useRouter()
onMounted(() => {
});






</script>
<style scoped lang='less'>
.time {

    padding: 10px 20px;
    background-color: #dbedff;
    font-size: 14px;
    // font-weight: bold;
    margin-bottom: 20px;
}

.content {
    padding-left: 5px;
}
</style>