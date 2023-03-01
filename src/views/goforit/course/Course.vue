<template>
    <div>
        <Row :wrap="false" class="course-area">
            <Col flex="auto">
            </Col>
            <Col flex="1000px" style="min-width: 1000px;">
            <Row :wrap="false" style="width: 100%;">
                <!-- <Col flex="200px" style="margin-top: 20px;">
                <Card style="width: 100%;" :padding="10">
                    <Space direction="vertical" style="margin-bottom: 20px;" :size="20">
                        <div>
                            <span style="font-size: 16px;">搜索课程：</span>
                            <Input search enter-button placeholder="输入课程" />
                        </div>
                        <Button type="primary" style="width: 100%;">
                            <Icon type="md-add" style="margin-right: 5px;" />创建课程
                        </Button>
                        <Button type="primary" style="width: 100%;">
                            <Icon type="md-add" style="margin-right: 5px;" />我的课程
                        </Button>

                    </Space>
                </Card>
                </Col>
                <Col flex="auto" style="padding-left: 20px;"> -->
                <Space direction="vertical" style="width: 100%;margin-top: 20px;">
                    <Card style="width: 100%;border-radius: 10px;">
                        <Space style="padding-left: 10px; margin-bottom: 20px;">
                            <span style="font-size: 16px;">搜索团队：</span>
                            <Input search enter-button placeholder="输入团队ID / 团队名称" style="width: 300px;" />
                            <Button type="primary">
                                <Icon type="md-book" style="margin-right: 5px;" />我的课程
                            </Button>
                        </Space>
                        <CascaderTagSelect title-lv1="方向" title-lv2="分类" :data-list="cascaderList"
                            @on-lv2-change="handleLv2Change" @on-lv1-change="handleLv1Change"></CascaderTagSelect>
                        <TagSelectSignle title="难度" :data-list="['全部', '入门', '提高', '进阶']" @on-change="handleMyTagClick">
                        </TagSelectSignle>
                    </Card>
                    <Card style="width: 100%;border-radius: 10px;">
                        <CourseItem v-for="item in courseList" :item-info="item" />
                    </Card>
                    <Space direction="vertical" type="flex" align="center" style="margin-bottom: 20px;">
                        <Page :total="100" :page-size="10" show-elevator show-sizer show-total />
                    </Space>
                </Space>
                <!-- </Col> -->
            </Row>
            </Col>
            <Col flex="auto">
            </Col>
        </Row>
    </div>
</template>
<script setup name="Course">
import { ref } from 'vue';

import TagSelectSignle from '../../../components/common/TagSelectSignle.vue';
import CascaderTagSelect from '../../../components/common/CascaderTagSelect.vue';
import CourseItem from '../../../components/goforit/course/CourseItem.vue';

const courseList = ref([
    {
        id: '223345566766',
        pic: 'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89f477c9e756448892dbbf1d1b2739c4~tplv-k3u1fbpfcp-no-mark:420:420:300:420.awebp?',
        title: 'Flutter 实战：正则匹配应用',
        instruction: '从思想分析到应用实践， Flutter 全平台玩转正则表达式 ~',
        tag: 1,
        authorAvatar: 'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar',
        autherName: '孟成祯',
        priece: 9.9,
        buyers: 20,
        status: 1,
        problems: 20,
        rate: 4.5,
        like: 66,
        up: 23,
        down: 3,
        position: '资深架构师',
        company: '字节跳动'
    },
    {
        id: '223345566766',
        pic: 'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/695f1aaa7ef14680bc0103b8564caca9~tplv-k3u1fbpfcp-no-mark:420:420:300:420.awebp?',
        title: '从零开发企业级 Go 应用',
        instruction: '从设计、开发、测试到部署，带你从零实现高质量的 Go 应用',
        tag: 1,
        authorAvatar: 'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar',
        autherName: '孟成祯',
        priece: 9.9,
        buyers: 20,
        status: 1,
        problems: 20,
        rate: 4.5,
        like: 66,
        up: 23,
        down: 3,
        position: '资深架构师',
        company: '字节跳动'
    }, {
        id: '223345566766',
        pic: 'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a636770752f04951a6f1b8ad6e33af98~tplv-k3u1fbpfcp-no-mark:420:420:300:420.awebp?',
        title: 'Vue 3 技术揭秘',
        instruction: '从思想分析到应用实践， Flutter 全平台玩转正则表达式 ~',
        tag: 1,
        authorAvatar: 'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar',
        autherName: '孟成祯',
        priece: 9.9,
        buyers: 20,
        status: 1,
        problems: 20,
        rate: 4.5,
        like: 66,
        up: 23,
        down: 3,
        position: '资深架构师',
        company: '字节跳动'
    }, {
        id: '223345566766',
        pic: 'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9315f988e994c07b1f1a03e54db3206~tplv-k3u1fbpfcp-no-mark:420:420:300:420.awebp?',
        title: 'JavaScript 函数式编程实践指南',
        instruction: '升维的编程“套路”学，用接地气的姿势理解函数式思想，在实际场景中内化函数式编程的”道“与”术“。学会驾驭代码，而非asdasdsadasdsa被其奴役。',
        tag: 1,
        authorAvatar: 'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar',
        autherName: '孟成祯',
        priece: 9.9,
        buyers: 20,
        status: 1,
        problems: 20,
        rate: 4.5,
        like: 66,
        up: 23,
        down: 3,
        position: '资深架构师',
        company: '字节跳动'
    }, {
        id: '223345566766',
        pic: 'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc1bcb9137fd4831a75ab6ee78a44c42~tplv-k3u1fbpfcp-no-mark:420:420:300:420.awebp?',
        title: 'RocketMQ 核心原理解析',
        instruction: '生活场景驱动，由浅入深带你搞懂 RocketMQ',
        tag: 1,
        authorAvatar: 'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar',
        autherName: '孟成祯',
        priece: 9.9,
        buyers: 20,
        status: 1,
        problems: 20,
        rate: 4.5,
        like: 66,
        up: 23,
        down: 3,
        position: '资深架构师',
        company: '字节跳动'
    },
]);


const cascaderList = ref([
    {
        "name": "全部", checked: false,
        "tags": [
            "全部", "MongoDB", "Lua", "ThinkPHP", "Spring", "CEP", "Node.js",
            "TensorFlow", "JavaScript", "uniapp", "网络安全", "PHP", "基础入门", "PostgreSQL",
            "ROS", "数据分析", "PyTorch", "Kubernetes", "软件测试", "jQuery", "TypeScript", "Oracle", "Python",
            "Redis", "NoSQL", "OpenCV", "Nginx", "操作系统", "SpringBoot", "C", "入门实战", "Spark", "设计模式",
            "Pygame", "强化学习", "CSS", "HTML", "机器学习", "Linux", "区块链", "Flutter", "Jenkins", "Git",
            "Scala", "React", "计算机网络", "蓝桥杯", "Go", "Qt", "C++", "Flask", "数据结构", "Hadoop",
            "算法", "Element UI", "NLP", "SSM", "MySQL", "scikit-learn", "Java", "书籍配套实验", "Docker", "Shell",
            "Vue.js", "大学公开课", "自动驾驶", "爬虫", "渗透测试", "Django", "webpack",
            "Bootstrap", "Elasticsearch", "Web安全", "Kafka", "微信小程序", "系统安全", "百题大冲关", "Ansible", "SQL"
        ]
    },
    {
        "name": "计算机专业课", checked: false,
        "tags": [
            "全部", "算法", "软件测试", "操作系统", "蓝桥杯",
            "书籍配套实验", "CEP", "ROS", "设计模式", "数据结构"
        ]
    },
    {
        "name": "Linux运维", checked: false,
        "tags": [
            "全部", "Linux", "Nginx", "计算机网络", "Shell",
            "Ansible", "Git"
        ]
    },
    {
        "name": "后端开发", checked: false,
        "tags": [
            "全部", "Go", "Qt", "Lua", "Django", "C++", "区块链",
            "Pygame", "Flask", "ThinkPHP", "PHP", "C", "爬虫", "Python"
        ]
    },
    {
        "name": "云计算与大数据", checked: false,
        "tags": [
            "全部", "Kubernetes", "Docker", "Hadoop", "Scala", "Kafka", "Spark", "Jenkins"
        ]
    },
    {
        "name": "数据库", checked: false,
        "tags": [
            "全部", "MongoDB", "NoSQL", "Oracle", "PostgreSQL", "MySQL", "SQL", "Redis"
        ]
    },
    {
        "name": "人工智能", checked: false,
        "tags": [
            "全部", "TensorFlow", "PyTorch", "NLP", "OpenCV", "数据分析",
            "强化学习", "自动驾驶", "机器学习", "scikit-learn"
        ]
    },
    {
        "name": "信息安全", checked: false,
        "tags": [
            "全部", "网络安全", "Web安全", "渗透测试", "系统安全"
        ]
    },
    {
        "name": "Web前端开发", checked: false,
        "tags": [
            "全部", "JavaScript", "Element UI", "uniapp", "React", "webpack",
            "TypeScript", "Flutter", "jQuery", "微信小程序", "CSS", "HTML",
            "Bootstrap", "Node.js", "Vue.js"
        ]
    },
    {
        "name": "Java后端开发", checked: false,
        "tags": [
            "全部",
            "Elasticsearch", "Java", "MyBatisPlus", "SpringBoot", "Spring"
        ]
    }
])


const handleMyTagClick = (name) => {
    console.log("mtTag:", name)
}

const handleLv1Change = (name) => {
    console.log("lv1:", name)
}

const handleLv2Change = (name) => {
    console.log("lv2:", name)
}
</script>
<style scoped lang='less'>
.course-area {
    width: 100%;
    min-height: calc(100vh - 172px);
}
</style>