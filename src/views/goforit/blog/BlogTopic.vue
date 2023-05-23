<template>
    <!-- <div style="width: 100%;height: 150px;display: flex;justify-content: center;align-items: center;"> -->
    <Space direction="vertical" style="width: 100%;" align="center">
        <img :src="topicDetial.img" style="width: 100px;height: 100px;">
        <div style="font-size: 16px;font-weight: bolder;margin: 0px 10px;">{{ topicDetial.topicName }}</div>
        <span>
            <Icon type="ios-bonfire" /> {{ topicDetial.hot || 0 }}
        </span>
    </Space>
    <Card style="border-radius: 10px;margin-top: 20px;">
        <Space direction="vertical" style="width: 100%;">
            <BlogListItem v-for="item in blogList" :blog-id="item.id" :author-name="item.authorName"
                :avatar="item.authorAvatar" :create-time="new Date(Number((item.createTime / 1e6)))" :title="item.title"
                :tags="tagMap.get(item.id)" :abstract="item.abstract" :thumbs-up-num="item.thumbsUpNum || 0"
                :view-num="item.viewNum || 0" :comment-num="item.commentNum || 0" :collect-num="item.collectNum || 0"
                :is-collect="item.isCollect > 0" :is-thumbs-up="item.isThumbsUp > 0" @to-detial-page="toDetialPage"
                :user-id="BigNumber(store.getters.userInfo.id)" />
            <Space direction="vertical" type="flex" align="center">
                <Page :total="pageInfo.total" :page-size="pageInfo.pageSize" show-elevator show-sizer show-total
                    :page-size-opts="[10, 15, 20]" :model-value="pageInfo.currPage" @on-change="handlePageChange"
                    @on-page-size-change="handlePageSizeChange" />
            </Space>

        </Space>
    </Card>
    <!-- </div> -->
</template>
<script setup name='BlogTopic'>
import BigNumber from '_bignumber.js@9.1.1@bignumber.js';
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router';
import http from '../../../plugin/axios';
import msg from '../../../common/msg';
import BlogListItem from '../../../components/goforit/blog/BlogListItem.vue';
import { useStore } from 'vuex';
const store = useStore()

const router = useRouter()
const topicDetial = ref({});
const tagMap = new Map();
const blogList = ref([]);

const getTopicDetial = async () => {
    const { data: res } = await http.post('/blog/topic/detial', { topic: Number(router.currentRoute.value.params.id) })
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    topicDetial.value = res.data
}

const initFunc = () => {
    getTopicDetial()
    getBlogList()
}


onMounted(() => {
    initFunc()
})

// 动态设置编辑器高度
watch(() => router.currentRoute.value.params.id, (newValue, oldValue) => {
    if (newValue) {
        tagMap.clear()
        blogList.value = []
        initFunc()
    }
})


const pageInfo = reactive({
    total: 0,
    pageSize: 10,
    currPage: 1,
});

const handlePageSizeChange = () => {
    getBlogList()
}

const handlePageChange = (page) => {
    pageInfo.currPage = page
    getBlogList()
}

const handleCollectBlog = (blogId) => {
    console.log(blogId);
}

const handleThumbBlog = (blogId) => {
    console.log(blogId);
}


const toDetialPage = (blogId) => {
    router.push('/blog/article/' + String(blogId))
}



const getBlogList = async () => {
    const { data: res } = await http.post('/blog/select/by/topic', {
        currPage: pageInfo.currPage,
        pageSize: pageInfo.pageSize,
        userId: BigNumber(store.getters.userInfo.id),
        topic: Number(router.currentRoute.value.params.id)
    })
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    blogList.value = res.data.infos
    res.data.blogTags.forEach((item) => {
        if (!tagMap.has(item.blogId)) {
            tagMap.set(item.blogId, [item])
        } else {
            tagMap.get(item.blogId).push(item)
        }
    })
    console.log(tagMap);
    console.log(blogList);
}
</script>
<style scoped lang='less'></style>