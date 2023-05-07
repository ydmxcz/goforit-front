<template>
    <Row :wrap="false" class="article-page">
        <Col flex="3">
        </Col>
        <Col flex="14" class="page-middle">
        <Row :wrap="false" class="middle-row">
            <Col flex="80px">
            <Space direction="vertical" :size="20" class="left-side">
                <div class="elem-center circle-button">
                    <Badge>
                        <Icon type="md-thumbs-up" size="25" style="color:#8a919f" />
                        <template #count>
                            <span class="button-template" style="color: #fff;">{{ blogInfo.infos.thumbsNum || 0 }}</span>
                        </template>
                    </Badge>
                </div>
                <div class="elem-center circle-button">
                    <Badge>
                        <a href="#comment" style="color:#8a919f">
                            <Icon type="md-text" size="25" />
                        </a>
                        <template #count>
                            <span class="button-template" style="color: #fff;">{{ blogInfo.infos.commentNum || 0 }}</span>
                        </template>
                    </Badge>
                </div>
                <div class="elem-center circle-button">
                    <Badge>
                        <Icon type="md-star" size="25" style="color:#8a919f" />
                        <template #count>
                            <span class="button-template" style="color: #fff;">{{ blogInfo.infos.collectNum || 0 }}</span>
                        </template>
                    </Badge>
                </div>
                <div class="elem-center circle-button">
                    <Icon type="md-share-alt" size="25" style="color:#8a919f" />
                </div>
                <div class="elem-center circle-button">
                    <Icon type="ios-warning" size="25" style="color:#8a919f" />
                </div>

            </Space>
            </Col>
            <Col flex="auto" class="main-area">
            <Space direction="vertical" style="width: 100%;">
                <Card class="article-area">
                    <Space direction="vertical" style="width: 100%;">
                        <h1 class="article-title">{{ blogInfo.infos.title }}</h1>
                        <div class="article-top-info">
                            <Row :wrap="false">
                                <Col flex="40px">
                                <Avatar icon="ios-person" size="large"
                                    src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                                </Col>
                                <Col flex="auto" style="padding-left: 20px;">
                                <Row style="width: 100%;" :wrap="false">
                                    <Space>
                                        <span style="font-size: 18px;color: #515767;">{{ blogInfo.infos.authorName }}</span>
                                        <!-- <span>lv-5</span> -->
                                    </Space>
                                    <span></span>
                                </Row>
                                <Row :wrap="false">
                                    <Space style="font-size: 14px;color: #8a919f;">
                                        <span>{{ utils.formatDate(new Date((blogInfo.infos.createTime / 1e6))) }}</span>
                                        <span>阅读 {{ blogInfo.infos.viewNum }}</span>
                                    </Space>
                                </Row>
                                </Col>
                            </Row>
                        </div>
                        <div style="width: 100%;">
                            <!-- articleText -->
                            <v-md-preview mode="preview" :text="blogInfo.infos.content"></v-md-preview>
                        </div>
                        <div class="article-bottom-info">
                            <Space style="margin-right: 30px;">
                                <span>分类：</span>
                                <Tag size="medium">{{ topicInfo.topicName }}</Tag>
                            </Space>
                            <Space>
                                <span>标签：</span>
                                <Tag color="blue" v-for="item in blogInfo.blogTags">{{ item.name }}</Tag>
                            </Space>
                        </div>
                    </Space>

                </Card>
                <Card class="comment-area">
                    <Space direction="vertical" style="width: 100%;">
                        <span id="comment"
                            style="font-size: 18px;color: #252933;font-weight: bolder;padding-left: 10px;">评论</span>
                        <Row class="user-action-area" :wrap="false">
                            <Col flex="70px" style="display: flex;justify-content: center;">
                            <Avatar icon="ios-person" class="user-avator"
                                src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                            </Col>
                            <Col flex="auto">
                            <Space direction="vertical" style="width: 100%;">
                                <v-md-editor class="md-editor" v-model="commentMdText" height="150px" mode="edit"
                                    placeholder="输入你的评论....."
                                    left-toolbar="undo redo clear | emoji h bold italic strikethrough quote | ul ol table hr | link image code "></v-md-editor>
                                <div style="width: 100%;">
                                    <Space style="float: left;">
                                        <Poptip placement="right-start" width="400">
                                            <Icon type="md-happy" size="30" class="emoji-icon" color="#ffc83d" />
                                            <template #content>
                                                <div style="height:200px">
                                                    <Row>
                                                        <div v-for="val in store.state.emojis" @click="commentMdText += val"
                                                            class="emoji-list-item">
                                                            {{ val }}
                                                        </div>
                                                    </Row>
                                                </div>
                                            </template>
                                        </Poptip>
                                    </Space>
                                    <Button style="float: right;" type="primary" @click="makeComment">发表评论</button>
                                </div>
                            </Space>
                            </Col>
                        </Row>
                        <div style="height: 40px;">
                            <span id="comment"
                                style="font-size: 18px;color: #252933;font-weight: bolder;padding-left: 10px;">全部评论</span>
                        </div>
                        <Row :wrap="false" style="width: 100%;" v-for="item in commentInfo">
                            <Col flex="60px" style="display: flex;justify-content: center;">
                            <Avatar icon="ios-person" class="all-comment-user-avator" :src="item.avatar" />
                            </Col>
                            <Col flex="auto">
                            <Space direction="vertical" style="width: 100%;">
                                <div style="width: 100%;">
                                    <Space>
                                        <span style="font-size:15px;">{{ item.userName }}</span>
                                        <!-- 以后可以在此插入用户标签 -->
                                        <span style="font-size:14px;color: #8a919f;">资深架构师</span>
                                    </Space>
                                    <!-- <Time style="float: right;margin-right: 10px;"
                                        :time="new Date(item.createTime / 1e6)" /> -->
                                    <!-- <span style="float: right;margin-right: 10px;">3个月前</span> -->
                                </div>
                                <!-- 用户评论的内容 -->
                                <div class="user-comment">
                                    <!-- <span style="font-size: 14px;"> {{ commentText }}</span> -->
                                    <v-md-preview mode="preview" :text="item.content"></v-md-preview>
                                </div>
                                <Space :size="20">
                                    <Time :time="new Date(item.createTime / 1e6)" />
                                    <div style="font-size: 14px;">
                                        <Icon type="ios-thumbs-up" />{{ item.thumbNum || 0 }}
                                    </div>
                                    <div style="font-size: 14px;">
                                        <Icon type="ios-thumbs-down" />{{ item.thumbNum || 0 }}
                                    </div>
                                    <div style="font-size: 14px;">
                                        <Icon type="md-text" />{{ item.children.length || 0 }}
                                    </div>
                                    <div style="font-size: 14px;">
                                        <span @click="handleShowCommentInput(item)">回复</span>
                                    </div>
                                </Space>
                                <Row class="user-action-area" :wrap="false" v-if="item.showComment">
                                    <Col flex="70px" style="display: flex;justify-content: center;">
                                    <Avatar icon="ios-person" class="user-avator"
                                        src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                                    </Col>
                                    <Col flex="auto">
                                    <Space direction="vertical" style="width: 100%;">
                                        <!-- <Input v-model="value1" type="textarea" :autosize="{ minRows: 3, maxRows: 6 }"
                                    placeholder="输入你的评论....." /> -->
                                        <v-md-editor class="md-editor" v-model="replyMdText" height="150px" mode="edit"
                                            :placeholder="commentPlaceholder"
                                            left-toolbar="undo redo clear | emoji h bold italic strikethrough quote | ul ol table hr | link image code "></v-md-editor>
                                        <div style="width: 100%;">
                                            <Space style="float: left;">
                                                <Poptip placement="right-start" width="400">
                                                    <Icon type="md-happy" size="30" class="emoji-icon" color="#ffc83d" />
                                                    <template #content>
                                                        <div style="height:200px">
                                                            <Row>
                                                                <div v-for="val in store.state.emojis"
                                                                    @click="replyMdText += val" class="emoji-list-item">
                                                                    {{ val }}
                                                                </div>
                                                            </Row>
                                                        </div>
                                                    </template>
                                                </Poptip>
                                            </Space>
                                            <Button style="float: right;" type="primary"
                                                @click="makeReply(item.id, item)">发表评论</button>
                                        </div>
                                    </Space>
                                    </Col>
                                </Row>
                                <div class="level-two-comment" v-if="item.children.length > 0">
                                    <div style="margin-bottom: 20px;" v-for="subItem in item.children">
                                        <Row :wrap="false" style="width: 100%;">
                                            <Col flex="60px" style="display: flex;justify-content: center;">
                                            <Avatar icon="ios-person" class="level-two-avator" :src="subItem.avatar" />
                                            </Col>
                                            <Col flex="auto">
                                            <Space direction="vertical" style="width: 100%;">
                                                <div style="width: 100%;">
                                                    <Space>
                                                        <span style="font-size:15px;">{{ subItem.userName }}</span>
                                                        <span v-if="subItem.parent != subItem.id">回复</span>
                                                        <!-- 以后可以在此插入用户标签 -->
                                                        <span style="font-size:15px;" v-if="subItem.parent != subItem.id">{{
                                                            commentMap.get(subItem.parent).userName }}</span>
                                                    </Space>

                                                </div>
                                                <!-- 用户评论的内容 -->
                                                <div class="user-reply">
                                                    <!-- <span style="font-size: 14px;"> {{ commentText }}</span> -->
                                                    <v-md-preview mode="preview" :text="subItem.content"></v-md-preview>
                                                </div>
                                                <Space :size="20">
                                                    <Time :time="new Date(subItem.createTime / 1e6)" />
                                                    <div style="font-size: 14px;">
                                                        <Icon type="ios-thumbs-up" />{{ subItem.thumbNum || 0 }}
                                                    </div>
                                                    <div style="font-size: 14px;">
                                                        <Icon type="ios-thumbs-down" />{{ subItem.thumbNum || 0 }}
                                                    </div>
                                                    <div style="font-size: 14px;">
                                                        <span @click="handleShowCommentInput(subItem)">回复</span>
                                                    </div>
                                                </Space>
                                            </Space>
                                            </Col>
                                        </Row>
                                        <Row class="user-action-area" :wrap="false" v-if="subItem.showComment">
                                            <Col flex="70px" style="display: flex;justify-content: center;">
                                            <Avatar icon="ios-person" class="user-avator"
                                                src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                                            </Col>
                                            <Col flex="auto">
                                            <Space direction="vertical" style="width: 100%;">
                                                <!-- <Input v-model="value1" type="textarea" :autosize="{ minRows: 3, maxRows: 6 }"
                                    placeholder="输入你的评论....." /> -->
                                                <v-md-editor class="md-editor" v-model="replyMdText" height="150px"
                                                    mode="edit" :placeholder="commentPlaceholder"
                                                    left-toolbar="undo redo clear | emoji h bold italic strikethrough quote | ul ol table hr | link image code "></v-md-editor>
                                                <div style="width: 100%;">
                                                    <Space style="float: left;">
                                                        <Poptip placement="right-start" width="400">
                                                            <Icon type="md-happy" size="30" class="emoji-icon"
                                                                color="#ffc83d" />
                                                            <template #content>
                                                                <div style="height:200px">
                                                                    <Row>
                                                                        <div v-for="val in store.state.emojis"
                                                                            @click="replyMdText += val"
                                                                            class="emoji-list-item">
                                                                            {{ val }}
                                                                        </div>
                                                                    </Row>
                                                                </div>
                                                            </template>
                                                        </Poptip>
                                                    </Space>
                                                    <Button style="float: right;" type="primary"
                                                        @click="makeReply(item.id, subItem)">发表评论</button>
                                                </div>
                                            </Space>
                                            </Col>
                                        </Row>
                                    </div>

                                </div>
                            </Space>
                            </Col>

                        </Row>
                    </Space>
                </Card>

            </Space>
            </Col>
            <Col flex="250px" class="right-side">
            <Card class="right-side-userinfo-cacrd">
                <Space direction="vertical" style="width: 100%;">
                    <Row :wrap="false">
                        <Col flex="40px">
                        <Avatar icon="ios-person" size="large" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                        </Col>
                        <Col flex="auto" style="padding-left: 10px;">
                        <Space direction="vertical">
                            <span style="font-size: 16px;color: #515767;">{{ blogInfo.infos.authorName }}</span>
                            <span style="font-size: 12px;color: #515767;">{{ authorSimplyInfo.instruction }}</span>
                        </Space>
                        </Col>
                    </Row>
                    <Button style="width: 100%;" type="primary" v-if="!authorSimplyInfo.followTime" @click="followAuthor">
                        <Icon type="md-add" /><span style="margin-left: 5px;">关注</span>
                    </Button>
                    <Button style="width: 100%;background-color: #5cadff;color: #fff;" v-else @click="followAuthor">
                        <Icon type="md-checkmark" /><span style="margin-left: 5px;">已关注</span>
                    </Button>
                    <Divider style="margin-top: 5px;margin-bottom: 5px;" />
                    <Space>
                        <div class="elem-center userinfo-card-icon">
                            <Icon type="ios-thumbs-up" color="#7bb9ff" />
                        </div>
                        <span>获得点赞</span>
                        <span>{{ authorSimplyInfo.thumbsUpTotalNum || 0 }}</span>
                    </Space>
                    <Space>
                        <div class="elem-center userinfo-card-icon">
                            <Icon type="md-text" color="#7bb9ff" />
                        </div>
                        <span>文章被阅读</span>
                        <span>{{ authorSimplyInfo.viewTotalNum || 0 }}</span>
                    </Space>
                </Space>
            </Card>
            <Card class="right-side-hot-article-card">
                <Space direction="vertical" style="width: 100%;">
                    <div class="card-title">
                        相关文章</div>
                    <div v-for="item in ['深入了解现代网络浏览器（第 1 部分）', '3Ds MAX 软件介绍', 'AE软件介绍', 'TKinter美化库——tkkbootstrap', '超详细anaconda安装教程（Mac，Windows，Linux版本）']"
                        class="hot-article-list-item">
                        <!-- 后期加hover伪类 border-bottom: 1px solid  #ddd; -->
                        <span>
                            {{ item }}
                            <Icon type="ios-eye" /> 11049
                        </span>
                    </div>

                </Space>
            </Card>
            </Col>
        </Row>
        </Col>
        <Col flex="3">
        </Col>
    </Row>
</template>

<script setup name="BlogArticle">
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex';
import http from '../../../plugin/axios';
import { useRouter } from 'vue-router';
import msg from '../../../common/msg';
import BigNumber from '_bignumber.js@9.1.1@bignumber.js';
import utils from '../../../common/utils';


const router = useRouter()
const blogId = router.currentRoute.value.params.id
const store = useStore()
const blogInfo = ref({
    infos: {
        title: '',
        authorName: '',
        thumbsNum: 0,
        commentNum: 0,
        collectNum: 0
    }
});
const commentInfo = ref([]);
const authorInfo = ref({});
const topicInfo = ref({
    topicName: ''
});
onMounted(() => {
    getBlogDetial()
})

const getBlogDetial = async () => {
    if (!blogId) {
        msg.err("无法加载博客,ID错误,", blogId)
        return
    }
    const { data: res } = await http.post('/blog/detial', { blogId: BigNumber(blogId) })
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    blogInfo.value = res.data
    console.log(blogInfo.value);
    getBlogCommentInfo(blogId)
    getBlogTopicDetial(blogInfo.value.infos.topic)
    getAuthorBlogInfo(blogInfo.value.infos.author)
}


const followAuthor = async () => {
    let p = {
        userId: BigNumber(store.getters.userInfo.id),
        followed: BigNumber(blogInfo.value.infos.author),
        isFollowed: (authorSimplyInfo.value.followTime || 0) > 0
    }
    const { data: res } = await http.post('/user/follow', p)
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    console.log(res);
    authorSimplyInfo.value.followTime = authorSimplyInfo.value.followTime > 0 ? 0 : 1
}

const getBlogTopicDetial = async (topicId) => {
    if (!topicId) {
        msg.err("文章分类ID错误：", topicId)
        return
    }
    const { data: res } = await http.post('/blog/topic/detial', { topic: Number(topicId) })
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    topicInfo.value = res.data
    // console.log(topicInfo.value);
}

// 
const authorSimplyInfo = ref({
    instruction: "你好hhhhhhh",
    thumbsUpTotalNum: 1,
    userName: "edmund",
    viewTotalNum: 429,
    followTime: 0
});

const getAuthorBlogInfo = async (authorId) => {
    const { data: res } = await http.post('/blog/author/simply/info', {
        userId: BigNumber(store.getters.userInfo.id),
        author: BigNumber(authorId)
    })
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    authorSimplyInfo.value = res.data
    console.log(authorSimplyInfo.value);
}

const commentMap = new Map()
const commentPlaceholder = ref('');
const commentMdText = ref('')
const replyMdText = ref('')
const LastShowedCommentInput = ref(0);
const handleShowCommentInput = (commentItem) => {

    commentMap.forEach((item, key) => {
        if (key == commentItem.id) {
            if (key != LastShowedCommentInput.value) {
                replyMdText.value = ''
            }
            LastShowedCommentInput.value = commentItem.id
            commentItem.showComment = !commentItem.showComment
            commentPlaceholder.value = '回复 @' + commentItem.userName
        } else {
            item.showComment = false
        }
    })
}


const getBlogCommentInfo = async (id) => {
    const { data: res } = await http.post('/blog/comment/select', { blogId: BigNumber(id) })
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    // console.log('comment',res);
    if (!res.data.comments) {
        return
    }
    res.data.comments.forEach((item) => {
        item.showComment = false
        commentMap.set(item.id || 0, item)
        if (!item.root) {
            item.children = []
            commentInfo.value.push(item)
        }
    })
    res.data.comments.forEach((item) => {
        if (item.root) {
            commentMap.get(item.root).children.push(item)
        }
    })
}


const makeComment = async () => {
    if (createBlogComment(commentMdText.value, 0, 0)) {
        commentMdText.value = ''
    }
}


const makeReply = async (root, parentItem) => {
    if (createBlogComment(replyMdText.value, root, parentItem.id)) {
        replyMdText.value = ''
        handleShowCommentInput(parentItem)
    }
}

const createBlogComment = async (content, root, parent) => {
    if (content.length == 0) {
        msg.err('请输入评论内容')
        return
    }
    let p = {
        blogId: BigNumber(blogId),
        userId: BigNumber(store.getters.userInfo.id),
        content: content,
        root: root,
        parent: parent
    }
    console.log(p);
    const { data: res } = await http.post('/blog/comment/create', p)
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    console.log(res);
    msg.ok('评论成功')
    return true
}




const commentText = ref('这是普通的评论这是普通的评论这是普通的评论这是普通的评论这是普通的评论这是普通的评论这是普通的评论这是普通的评论这是普通的评论这是普通的评论这是普通的评论这是普通的评论这是普通的评论这是普通的评论这是普通的评论这是普通的评论这是普通的评论这是普通的评论这是普通的评论这是普通的评论这是普通的评论这是普通的评论这是普通的评论这是普通的评论')
const articleText = ref(`# 这是用户文章
### Acwing789.数的范围

给定一个按照升序排列的长度为 n 的整数数组，以及 q 个查询。

对于每个查询，返回一个元素 k 的起始位置和终止位置（位置从 0 开始计数）。problemMdTextproblemMdTextproblemMdTextproblemMdText

如果数组中不存在该元素，则返回 \`-1\`。

#### 输入格式

第一行包含整数 n 和 q，表示数组长度和询问个数。

第二行包含 n 个整数（均在 1∼10000 范围内），表示完整数组。

接下来 q 行，每行包含一个整数 k，表示一个询问元素。

#### 输出格式

共 q 行，每行包含两个整数，表示所求元素的起始位置和终止位置。

如果数组中不存在该元素，则返回 \`-1\`。

#### 数据范围

$1≤n≤100000$
$1≤q≤10000$
$1≤k≤10000$

#### 输入样例：

第二行包含 n 个整数（均在 1∼10000 范围内），表示完整数组。

接下来 q 行，每行包含一个整数 k，表示一个询问元素。

#### 输出格式

共 q 行，每行包含两个整数，表示所求元素的起始位置和终止位置。

如果数组中不存在该元素，则返回 \`-1\`。

#### 数据范围

$1≤n≤100000$
$1≤q≤10000$
$1≤k≤10000$

#### 输入样例：
#### 数据范围

$1≤n≤100000$
$1≤q≤10000$
$1≤k≤10000$

#### 输入样例：`)

// const value1 = ref('')
const handleEmojiClick = (content, e) => {
    content += e
    // value1.value += e
}

</script>

<style scoped lang="less">
.article-page {
    width: 100%;

    .page-middle {
        min-width: 1000px;

        .middle-row {
            padding-top: 30px;

            .left-side {
                width: 50px;
                margin-right: 30px;
                padding-top: 10px;

                .circle-button {
                    background-color: #fff;
                    width: 48px;
                    height: 48px;
                    border-radius: 50px;
                    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 4%);

                    .button-template {
                        background-color: #c2c8d1;
                        border-radius: 50px;
                        padding: 3px;
                        margin-left: 30px;
                        font-size: 6px;
                        float: left;
                        min-width: 24px;
                    }
                }
            }

            .main-area {
                min-width: 670px;
                padding: 10px;

                .article-area {
                    width: 100%;

                    .article-title {
                        font-size: 32px;
                        padding: 20px;
                    }

                    .article-top-info {
                        width: 100%;
                        height: 40px;
                    }

                    .article-bottom-info {
                        width: 100%;
                        min-height: 40px;
                        display: flex;
                        align-items: center;
                        padding: 10px 10px 10px 20px;
                    }
                }

                .comment-area {
                    width: 100%;

                    .comment-text-title {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        background-color: #dbedff;
                        border-left: 4px solid #2d8cf0;
                        padding: 10px 0px 10px 20px;
                        margin-bottom: 10px;
                    }

                    .user-action-area {
                        width: 100%;
                        margin-top: 20px;

                        .user-avator {
                            width: 50px;
                            height: 50px;
                            margin-right: 20px;
                        }

                        .emoji-icon {
                            width: 30px;
                            height: 30px;

                            .emoji-list-item {
                                width: 30px;
                                height: 30px;
                                margin: 5px;
                                font-size: 24px;
                                text-align: center;
                            }
                        }

                    }


                    .all-comment-text-title {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        border-left: 4px solid #2d8cf0;
                        padding: 10px 0px 10px 20px;
                        background-color: #dbedff;
                        margin-top: 10px;
                        margin-bottom: 10px;

                    }

                    .all-comment-user-avator {
                        width: 40px;
                        height: 40px;
                        margin-right: 20px;
                    }

                    .user-comment {
                        width: 100%;

                        :deep(div.github-markdown-body) {
                            padding: 0;
                        }
                    }

                    .level-two-comment {
                        width: 100%;
                        background-color: #f9fafb;
                        padding: 20px;

                        .level-two-avator {
                            width: 40px;
                            height: 40px;
                            margin-right: 20px;
                        }

                        .user-reply {
                            width: 100%;

                            :deep(div.github-markdown-body) {
                                padding: 0;
                                background-color: #f9fafb;
                            }
                        }
                    }
                }
            }

            .right-side {
                padding-top: 10px;

                .right-side-userinfo-card {
                    width: 100%;

                    .userinfo-card-icon {
                        width: 30px;
                        height: 30px;
                        background-color: #E1EFFF;
                        border-radius: 50px;
                    }
                }

                .right-side-hot-article-card {
                    width: 100%;
                    margin-top: 20px;

                    .card-title {
                        width: 100%;
                        padding-left: 10px;
                        border-left: 3px solid #2d8cf0;
                        height: 30px;
                        font-size: 16px;
                        display: flex;
                        align-items: center;
                    }

                    .hot-article-list-item {
                        width: 100%;
                        min-height: 24px;
                        font-size: 14px;
                        display: flex;
                        align-items: center;
                        margin-top: 5px;
                        margin-bottom: 5px;
                    }

                    .hot-article-list-item:hover {
                        background-color: #e4e4e4;
                    }
                }

            }

        }


    }
}

.elem-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>