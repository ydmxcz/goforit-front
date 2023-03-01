<template>

    <Row :wrap="false" class="article-page">
        <Col flex="3">
        </Col>
        <Col flex="14" class="page-middle">
        <Row :wrap="false" class="middle-row">
            <Col flex="80px">
            <Space direction="vertical" :size="20" class="left-side">
                <div v-for="i in 6" class="elem-center circle-button">
                    <Badge>
                        <Icon type="ios-search" size="20" />
                        <template #count>
                            <span class="button-template">9</span>
                        </template>
                    </Badge>
                </div>

            </Space>
            </Col>
            <Col flex="auto" class="main-area">
            <Space direction="vertical" style="width: 100%;">
                <Card class="article-area">
                    <Space direction="vertical" style="width: 100%;">
                        <h1 class="article-title">if err != nil 太烦？Go 创始人教你如何对错误进行编程！</h1>
                        <div class="article-top-info">
                            <Row :wrap="false">
                                <Col flex="40px">
                                <Avatar icon="ios-person" size="large"
                                    src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                                </Col>
                                <Col flex="auto" style="padding-left: 20px;">
                                <Row style="width: 100%;" :wrap="false">
                                    <Space>
                                        <span style="font-size: 16px;color: #515767;">煎鱼eddycjy</span>
                                        <span>lv-5</span>
                                    </Space>
                                    <span></span>
                                </Row>
                                <Row :wrap="false">
                                    <Space style="font-size: 14px;color: #8a919f;">
                                        <span>2022年08月01日 12:04</span>
                                        <span>阅读 4101</span>
                                    </Space>
                                </Row>
                                </Col>
                            </Row>
                        </div>
                        <div style="width: 100%;">
                            <!-- articleText -->
                            <v-md-preview mode="preview" :text="articleText"></v-md-preview>
                        </div>
                        <div class="article-bottom-info">
                            <Space style="margin-right: 30px;">
                                <span>分类：</span>
                                <Tag size="medium">算法训练</Tag>
                            </Space>
                            <Space>
                                <span>标签：</span>
                                <Tag color="blue">算法训练</Tag>
                                <Tag color="blue">算法训练</Tag>
                                <Tag color="blue">算法训练</Tag>
                            </Space>
                        </div>
                    </Space>

                </Card>
                <Card class="comment-area">
                    <Space direction="vertical" style="width: 100%;">
                        <div class="comment-text-title">
                            <h3>评论</h3>
                        </div>
                        <Row class="user-action-area" :wrap="false">
                            <Col flex="70px" style="display: flex;justify-content: center;">
                            <Avatar icon="ios-person" class="user-avator"
                                src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                            </Col>
                            <Col flex="auto">
                            <Space direction="vertical" style="width: 100%;">
                                <!-- <Input v-model="value1" type="textarea" :autosize="{ minRows: 3, maxRows: 6 }"
                                    placeholder="输入你的评论....." /> -->
                                <v-md-editor class="md-editor" v-model="problemMdText" height="150px" mode="edit" placeholder="输入你的评论....."
                                    left-toolbar="undo redo clear | emoji h bold italic strikethrough quote | ul ol table hr | link image code "></v-md-editor>
                                <div style="width: 100%;">
                                    <Space style="float: left;">
                                        <Poptip placement="right-start" width="400">
                                            <Icon type="md-happy" size="30" class="emoji-icon" color="#ffc83d" />
                                            <template #content>
                                                <div style="height:200px">
                                                    <Row>
                                                        <div v-for="val in store.state.emojis"
                                                            @click="handleEmojiClick(val)" class="emoji-list-item">
                                                            {{ val }}
                                                        </div>
                                                    </Row>
                                                </div>
                                            </template>
                                        </Poptip>
                                    </Space>
                                    <Button style="float: right;" type="primary">发表评论</button>
                                </div>

                            </Space>
                            </Col>

                        </Row>
                        <div class="all-comment-text-title">
                            <h3>全部评论</h3>
                        </div>
                        <Row :wrap="false" style="width: 100%;">
                            <Col flex="60px" style="display: flex;justify-content: center;">
                            <Avatar icon="ios-person" class="all-comment-user-avator"
                                src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                            </Col>
                            <Col flex="auto">
                            <Space direction="vertical" style="width: 100%;">
                                <div style="width: 100%;">
                                    <Space>
                                        <span style="font-size:15px;">EdmundShelby</span>
                                        <!-- 以后可以在此插入用户标签 -->
                                        <span style="font-size:14px;color: #8a919f;">资深架构师</span>
                                    </Space>
                                    <span style="float: right;margin-right: 10px;">3个月前</span>
                                </div>
                                <!-- 用户评论的内容 -->
                                <div class="user-comment">
                                    <!-- <span style="font-size: 14px;"> {{ commentText }}</span> -->
                                    <v-md-preview mode="preview" :text="commentText"></v-md-preview>
                                </div>
                                <Space>
                                    <div style="font-size: 14px;">
                                        <Icon type="ios-thumbs-up" />点赞
                                    </div>
                                    <div style="font-size: 14px;">
                                        <Icon type="md-text" />评论
                                    </div>
                                </Space>
                                <div class="level-two-comment">
                                    <Row :wrap="false" style="width: 100%;">
                                        <Col flex="60px" style="display: flex;justify-content: center;">
                                        <Avatar icon="ios-person" class="level-two-avator"
                                            src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                                        </Col>
                                        <Col flex="auto">
                                        <Space direction="vertical" style="width: 100%;">
                                            <div style="width: 100%;">
                                                <Space>
                                                    <span style="font-size:15px;">EdmundShelby</span>
                                                    <!-- 以后可以在此插入用户标签 -->
                                                    <span style="font-size:14px;color: #8a919f;">资深架构师</span>
                                                </Space>
                                                <span style="float: right;margin-right: 10px;">3个月前</span>
                                            </div>
                                            <!-- 用户评论的内容 -->
                                            <div class="user-reply">
                                                <!-- <span style="font-size: 14px;"> {{ commentText }}</span> -->
                                                <v-md-preview mode="preview" :text="commentText"></v-md-preview>
                                            </div>
                                            <Space>
                                                <div style="font-size: 14px;">
                                                    <Icon type="ios-thumbs-up" />点赞
                                                </div>
                                                <div style="font-size: 14px;">
                                                    <Icon type="md-text" />评论
                                                </div>
                                            </Space>
                                        </Space>
                                        </Col>

                                    </Row>
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
                            <span style="font-size: 16px;color: #515767;">煎鱼eddycjy</span>
                            <span style="font-size: 12px;color: #515767;">前端技术布道</span>
                        </Space>
                        </Col>
                    </Row>
                    <Button style="width: 100%;" type="primary">
                        <Icon type="md-add" /><span style="margin-left: 5px;">关注</span>
                    </Button>
                    <Divider style="margin-top: 5px;margin-bottom: 5px;" />
                    <Space>
                        <div class="elem-center userinfo-card-icon">
                            <Icon type="ios-thumbs-up" color="#7bb9ff" />
                        </div>
                        <span>获得点赞</span>
                        <span>113</span>
                    </Space>
                    <Space>
                        <div class="elem-center userinfo-card-icon">
                            <Icon type="md-text" color="#7bb9ff" />
                        </div>
                        <span>文章被阅读</span>
                        <span>67,114</span>
                    </Space>

                </Space>
            </Card>
            <Card class="right-side-hot-article-card">
                <Space direction="vertical" style="width: 100%;">
                    <div class="card-title">
                        热门文章</div>
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
const store = useStore()

const problemMdText = ref('')
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

const value1 = ref('')
const handleEmojiClick = (e) => {
    value1.value += e
}
onMounted(() => {
})

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

                        :deep(div.vuepress-markdown-body) {
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

                            :deep(div.vuepress-markdown-body) {
                                padding: 0;
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