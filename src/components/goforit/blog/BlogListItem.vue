<template>
    <div class="blog-item">
        <Row :wrap="false">
            <Col flex="auto">
            <!-- 纵向 Space -->
            <Space direction="vertical" align="start">
                <!-- 横向Space -->
                <Space split :size="5">
                    <span>用户名</span>
                    <span>时间</span>
                    <Space>
                        <!-- articletags -->
                        <span>Go</span>
                        <span>Redis</span>
                    </Space>
                </Space>
                <!-- 主标题 -->
                <h3>
                    <Ellipsis :text="articleTitle" :length="30" />
                </h3>
                <!-- 内容简介 -->
                <Ellipsis :text="articleAbstract" :length="50" />
                <!-- 浏览量、点赞、关注、收藏 -->
                <Space split>
                    <span>
                        <Icon type="md-eye" style="margin-right: 5px;" />6666
                    </span>
                    <span>
                        <Icon type="ios-thumbs-up" style="margin-right: 5px;"/>888
                    </span>
                    <span>
                        <Icon type="md-star" style="margin-right: 5px;"/>77
                    </span>
                    <span>
                        <Icon type="ios-text" style="margin-right: 5px;"/>9
                    </span>
                    <span style="font-size: 20px;"> ··· </span>
                </Space>
            </Space>

            </Col>
            <!-- 右侧图片 120+padding-left/right:20px; -->
            <Col flex="140px" style="padding-left: 10px;padding-right: 10px;display: flex;align-items: center;justify-items: center;">
            <img src="../../../assets/article-test.jpeg" alt="" style="width: 120px;height: auto;">
            </Col>
        </Row>
    </div>
</template>

<script setup name="BlogListItem">
import { ref } from 'vue';

const articleTitle = ref('用go写一个简单的Redis客户端框架写用go写一个简单的Redis客户端框架写')

const articleAbstract = ref('两千字Go编程规范，没有规矩不成方圆，团队开两千字Go编程规范，没有规矩不成方圆，团队开两千字Go编程规范，没有规矩不成方圆，团队开两千字Go编程规范，没有规矩不成方圆，团队开')
</script>

<style scoped lang="less">
.blog-item {
    padding-top: 10px;
    padding-bottom: 10px;
    // border-bottom:  1px solid #f3f4f5;
    border-bottom:  1px solid #e9eaeb;
}
</style>