<template>
    <Card style="border-radius: 15px;">
        <Space :wrap="false" style="width: 100%;">
            <span style="font-size: 16px;">搜索分享或讨论：</span>
            <Input search enter-button style="width: 300px;" />
            <Button type="primary" @click="createDiscussion">
                <Icon type="md-add" style="margin-right: 5px;" />创建分享&讨论
            </Button>

        </Space>
        <Space v-if="blogList.length != 0" direction="vertical" style="width: 100%;">
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
        <div v-else style="width: 100%;height:300px;margin-top: 20px;">
            <Space style="display: flex;align-items: center;justify-content: center;" direction="vertical" align="center">
                <img style="height: 200px;width: 200px;" src="https://file.iviewui.com/iview-pro/icon-500-color.svg" alt="">
                <span style="font-size: 20px;">暂无小组讨论</span>
            </Space>
        </div>
    </Card>
</template>

<script setup name="GroupDiscussion">
import BigNumber from '_bignumber.js@9.1.1@bignumber.js';
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import BlogListItem from '../../../components/goforit/blog/BlogListItem.vue';
import http from '../../../plugin/axios';
import msg from '../../../common/msg';
import { useStore } from 'vuex';
import { formToJSON } from 'axios';

const router = useRouter()
const store = useStore()

const pageInfo = reactive({
    total: 0,
    pageSize: 10,
    currPage: 1,
});

const tagMap = new Map();
const blogList = ref([]);

const handlePageSizeChange = () => {
    getBlogList()
}

const handlePageChange = (page) => {
    pageInfo.currPage = page
    getBlogList()
}

const isJoin = async () => {
    const { data: res } = await http.post('/group/is/join', {
        groupId: BigNumber(router.currentRoute.value.params.id),
        userId: BigNumber(store.getters.userInfo.id)
    })
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }

    if (!res.data) {
        return false
    }
    console.log('aaa', res.data.status);
    return res.data.status
}


const createDiscussion = () => {
    let o = isJoin()
    console.log('ssss',o);
    if (o) {
        router.push('/group-share/'+ store.getters.userInfo.id+'/editer/'+router.currentRoute.value.params.id )
    } else {
        msg.err('您未加入小组，不能组内分享')
    }

}


const handleCollectBlog = (blogId) => {
    console.log(blogId);
}

const handleThumbBlog = async (blogId, isThumbsUp) => {
    console.log(blogId, isThumbsUp);
    const { data: res } = await http.post('/blog/thumbsup', {
        id: blogId,
        thumbed: isThumbsUp,
        userId: BigNumber(store.getters.userInfo.id)
    })
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    for (let index = 0; index < blogList.value.length; index++) {
        const element = blogList.value[index];
        if (element.id == blogId) {
            element.isThumbsUp = isThumbsUp ? 0 : blogId
            if (!element.thumbsUpNum) {
                element.thumbsUpNum = 0
            }
            element.thumbsUpNum = (isThumbsUp ? element.thumbsUpNum - 1 : element.thumbsUpNum + 1)
            break;
        }
    }

}


const toDetialPage = (blogId) => {
    router.push('/blog/article/' + String(blogId))
}

onMounted(() => {
    getBlogList()
})


const getBlogList = async () => {
    const { data: res } = await http.post('/group/discussion/select', {
        currPage: pageInfo.currPage,
        pageSize: pageInfo.pageSize,
        groupId: BigNumber(router.currentRoute.value.params.id),
        userId: BigNumber(store.getters.userInfo.id)
    })
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    // console.log('as',res);
    blogList.value = res.data.discussionList
    // res.data.blogTags.forEach((item) => {
    //     if (!tagMap.has(item.id)) {
    //         tagMap.set(item.id, [item])
    //     } else {
    //         tagMap.get(item.id).push(item)
    //     }
    // })
}

</script>

<style scoped lang="less"></style>