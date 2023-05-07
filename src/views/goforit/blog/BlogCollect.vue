<template>
    <Card style="border-radius: 15px;">
        <Space direction="vertical" style="width: 100%;">
            <Space direction="vertical" style="width: 100%;">
                <BlogListItem v-for="item in blogList" :blog-id="item.id" :author-name="item.authorName"
                    :avatar="item.authorAvatar" :create-time="new Date(Number((item.createTime / 1e6)))" :title="item.title"
                    :tags="tagMap.get(item.id)" :abstract="item.abstract" :thumbs-up-num="item.thumbsUpNum || 0"
                    :view-num="item.viewNum || 0" :comment-num="item.commentNum || 0" :collect-num="item.collectNum || 0"
                    :is-collect="item.isCollect > 0" :is-thumbs-up="item.isThumbsUp > 0"
                    @to-detial-page="toDetialPage" :user-id="userId" />
                <Space direction="vertical" type="flex" align="center">
                    <Page :total="pageInfo.total" :page-size="pageInfo.pageSize" show-elevator show-sizer show-total
                        :page-size-opts="[10, 15, 20]" :model-value="pageInfo.currPage" @on-change="handlePageChange"
                        @on-page-size-change="handlePageSizeChange" />
                </Space>

            </Space>
        </Space>
    </Card>
</template>

<script setup name="BlogCollect">
import { ref, reactive, onMounted } from 'vue'
import BigNumber from '_bignumber.js@9.1.1@bignumber.js';
import BlogListItem from '../../../components/goforit/blog/BlogListItem.vue';
import http from '../../../plugin/axios';
import msg from '../../../common/msg';
import api from '../../../common/api'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const router = useRouter()
const store = useStore()
const pageInfo = reactive({
    pageSize: 10,
    currPage: 1,
    total: 0
});

const userFacorites = ref([]);
const userId = ref(BigNumber(store.getters.userInfo.id))

const selectedUserFacorites = ref(0);


const getUserFacorites = async () => {
    const { data: res } = await http.post('/blog/user/facorites', {
        userId: BigNumber(store.getters.userInfo.id)
    })
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    userFacorites.value = res.data.facorites
    selectedUserFacorites.value = userFacorites.value.at(0).id 
    console.log("fa", selectedUserFacorites);
}

const handleUserFacoritesId = (v) => {
    console.log('hello', v, selectedUserFacorites.value);
}


const tagMap = new Map();
const blogList = ref([]);

const handleUserCancleCollect = () => {
    tagMap.clear()
    blogList.value = []
    getUserCollects(selectedUserFacorites.value)
}

const getUserCollects = async () => {
    const { data: res } = await http.post('/blog/collect/select', {
        userId: BigNumber(store.getters.userInfo.id),
        currPage: pageInfo.currPage,
        pageSize: pageInfo.pageSize,
    })
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    // console.log("collects", res);
    blogList.value = res.data.infos
    res.data.blogTags.forEach((item) => {
        if (!tagMap.has(item.blogId)) {
            tagMap.set(item.blogId, [item])
        } else {
            tagMap.get(item.blogId).push(item)
        }
    })
}

onMounted(() => {
    getUserCollects(0)
    getUserFacorites()
})

const handlePageSizeChange = () => {
    // getBlogList()
}

const handlePageChange = (page) => {
    pageInfo.currPage = page
    // getBlogList()
}

const handleCollectBlog = (blogId) => {
    console.log(blogId);
}

const toDetialPage = (blogId) => {
    router.push('/blog/article/' + String(blogId))
}

</script>

<style scoped lang="less"></style>