<template>
    <div class="blog-item">
        <Row :wrap="false">
            <Col flex="auto">
            <!-- 纵向 Space -->
            <Space direction="vertical" align="start">
                <!-- 横向Space -->
                <Space split :size="5">
                    <span>{{ props.authorName }}</span>
                    <!-- <span>{{ props.createTime }}</span> -->
                    <Time :time="props.createTime" style="color: #8a919f;" />
                    <Space>
                        <span v-for="tag in tags" style="color: #8a919f;">{{ tag.name }}</span>
                    </Space>
                </Space>
                <!-- 主标题 -->
                <!-- <h3> -->
                <Ellipsis :text="props.title" :lines="1" style="font-size: 16px;font-weight: bolder;cursor: pointer;"
                    @click="handleToDetialPage" />
                <!-- </h3> -->
                <!-- 内容简介 -->
                <Ellipsis :text="props.abstract" :lines="2" />
                <!-- 浏览量、点赞、关注、收藏 -->
                <Space split>
                    <span style="color: #8a919f;">
                        <Icon type="md-eye" style="margin-right: 5px;" /> {{ props.viewNum }}
                    </span>
                    <span style="color: #8a919f;">
                        <Icon type="ios-thumbs-up" v-if="isThumbsUp" style="margin-right: 5px;color: #2d8cf0;"
                            @click="handleThumbBlog" />
                        <Icon type="ios-thumbs-up" v-else style="margin-right: 5px;" @click="handleThumbBlog" />
                        {{ thumbsUpNum }}
                    </span>

                    <span style="color: #8a919f;">
                        <Icon type="md-star" v-if="isCollect" style="margin-right: 5px;color: #ff9900;"
                            @click="handleCollectBlog" />
                        <Icon type="md-star" v-else style="margin-right: 5px;" @click="handleCollectBlog" />
                        {{ collectNum }}
                    </span>
                    <span style="color: #8a919f;">
                        <Icon type="ios-text" style="margin-right: 5px;" />{{ props.commentNum }}
                    </span>
                    <Poptip placement="bottom" style="cursor: pointer;">
                        <span style="font-size: 20px;color: #8a919f;"> ··· </span>
                        <template #content>
                            <div class="report-blog" @click="handelReport">
                                <span>举报</span>
                            </div>
                        </template>
                    </Poptip>
                </Space>
            </Space>

            </Col>
            <!-- 右侧图片 120+padding-left/right:20px; -->
            <Col flex="140px" v-if="props.cover"
                style="padding-left: 10px;padding-right: 10px;display: flex;align-items: center;justify-items: center;">
            <img :src="props.cover" alt="" style="width: 120px;height: auto;">
            </Col>
        </Row>
    </div>
</template>

<script setup name="BlogListItem">
import BigNumber from '_bignumber.js@9.1.1@bignumber.js';
import { ref, reactive, onMounted } from 'vue'
import http from '../../../plugin/axios';
import msg from '../../../common/msg';
const emits = defineEmits(['toDetialPage']);

const props = defineProps({
    blogId: {
        type: Number,
    },
    authorName: {
        type: String,
        default: '作者名',
    }, createTime: {
        type: Date,
        default: '2001-06-16',
    }, tags: {
        type: Array,
        default: [{ name: 'golang' }, { name: 'redis' }],
    }, title: {
        type: String,
        default: '文章标题',
    }, abstract: {
        type: String,
        default: '两千字Go编程规范，没有规矩不成方圆，团队开两千字Go编程规范，没有规矩不成方圆，团队开两千字Go编程规范，没有规矩不成方圆，团队开两千字Go编程规范，没有规矩不成方圆，团队开',
    }, thumbsUpNum: {
        type: Number,
        default: 0,
    }, viewNum: {
        type: Number,
        default: 0,
    }, collectNum: {
        type: Number,
        default: 0,
    }, commentNum: {
        type: Number,
        default: 0,
    }, cover: {
        type: String,
        default: ''
    }, avatar: {
        type: String,
        default: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar'
    }, isThumbsUp: {
        type: Boolean,
        default: false
    }, isCollect: {
        type: Boolean,
        default: false
    }, userId: {
        type: BigNumber,
    }, facoritesId: {
        type: Number,
        default: 0
    }
})
const isThumbsUp = ref(props.isThumbsUp);
const isCollect = ref(props.isCollect);
const collectNum = ref(props.collectNum);
const thumbsUpNum = ref(props.thumbsUpNum);

onMounted(() => {
    // console.log(props);
})




const handleToDetialPage = () => {
    emits('toDetialPage', props.blogId)
}

const handleThumbBlog = async () => {
    let param = {
        id: props.blogId,
        thumbed: isThumbsUp.value,
        userId: props.userId
    }
    console.log(param);
    const { data: res } = await http.post('/blog/thumbsup', param)
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    isThumbsUp.value = !isThumbsUp.value
    thumbsUpNum.value += (isThumbsUp.value ? 1 : -1)

    // emits('thumbsUp', props.blogId,props.isThumbsUp)
}



const handleCollectBlog = async () => {
    let param = {
        blogId: props.blogId,
        userId: props.userId,
        isCollect: isCollect.value
    }
    // console.log(param);
    const { data: res } = await http.post('/blog/collect', param)
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    isCollect.value = !isCollect.value
    collectNum.value += isCollect.value ? 1 : -1
}


const handelReport = () => {
    console.log(props.blogId);
}



const defaultCover = ref('/src/assets/article-test.jpeg');

// const articleTitle = ref('用go写一个简单的Redis客户端框架写用go写一个简单的Redis客户端框架写')
// const articleAbstract = ref('两千字Go编程规范，没有规矩不成方圆，团队开两千字Go编程规范，没有规矩不成方圆，团队开两千字Go编程规范，没有规矩不成方圆，团队开两千字Go编程规范，没有规矩不成方圆，团队开')
</script>

<style scoped lang="less">
.blog-item {
    padding-top: 10px;
    padding-bottom: 10px;
    // border-bottom:  1px solid #f3f4f5;
    border-bottom: 1px solid #e9eaeb;
}

.report-blog {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

// .report-blog:hover {
//     background-color: #eee;
// }
</style>