<template>
    <div class="competition-item">
        <Row style="width: 100%;" :wrap="false">
            <Col flex="120px" style="width: 120px;">
            <img class="competition-item-pic" style="border-radius: 15px;width: 120px;" :src="props.avatar">
            </Col>
            <Col flex="auto">
            <Space class="middle-space" direction="vertical" style="width: 100%;">
                <div style="font: 16px bolder;" >
                    <span @click="toDetial" style="cursor: pointer;">{{ props.name }}</span>
                    <span style="font-size: 12px;margin-left: 10px; margin-right: 5px;">
                        <Icon type="md-information-circle" style="margin-right: 10px;" size="16" color="#2d8cf0" />
                        ID：{{ props.id }}
                    </span>
                </div>
                <Space>
                    <span style="font-size: 12px;margin-right: 10px;">
                        <Icon type="md-person" style="margin-right: 5px;" size="16" />
                        创建者：<a style="cursor: pointer;color: black;">{{ props.creator }}</a>
                    </span>
                    <span style="font-size: 12px;margin-right: 10px;">
                        <Icon type="md-list-box" style="margin-right: 5px;" size="16" />
                        题目数：{{ props.problemNum }}
                    </span>
                    <span style="font-size: 12px;margin-right: 10px;">
                        <Icon type="ios-clock" style="margin-right: 5px;" size="16" color="#19be6b" />
                        更新时间：{{ props.updateTime }}
                    </span>
                    <span style="font-size: 12px;margin-right: 10px;">
                        <Icon type="md-star" style="margin-right: 5px;" size="16" color="#ff9900" />
                        收藏数：{{ props.collectionNum }}
                    </span>
                    <span style="font-size: 12px;">
                        <Icon type="md-bonfire" style="margin-right: 5px;" size="16" color="#ed4014" />
                        活跃度：{{ props.activation }}
                    </span>
                </Space>

                <Ellipsis :text="props.instruction" :lines="2" tooltip />

                <Space wrap>
                    <Icon type="ios-pricetags" /><span>题目标签：</span>
                    <Tag color="blue" v-for="tagName in props.tagList"> {{ tagName }}</Tag>
                </Space>

            </Space>
            </Col>
        </Row>
    </div>
</template>

<script setup name="ProblemListItem">
// 题单名称、题单ID、题单创建者，题单收藏数，题单活跃度、题单介绍、我是否收藏

import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const targetTime = ref(new Date().getTime() + ((3600 * 24 * 8) + (3600 * 6) + (1900)) * 1000);
const props = defineProps({
    name: {
        type: String,
        default: 'GoForIt热题 HOT 100',
    }, id: {
        type: String,
        default: '12345678912341',
    }, creator: {
        type: String,
        default: 'edmund',
    }, collectionNum: {
        type: Number,
        default: 20,
    }, activation: {
        type: Number,
        default: 360,
    }, instruction: {
        type: String,
        default: '精选 100 道GoForIt上最热门的题目，适合初识算法与数据结构的新手和想要在短时间内高效提升的人，熟练掌握这 100 道题，你就已经具备了在代码世界通行的基本能力。',
    }, isCollection: {
        type: Boolean,
        default: true,
    }, tagList: {
        type: Array,
        default: ['二分查找', '排序', '高精度', '前缀和', '位运算',
            '离散化', '区间合并', '单链表', '双链表', '单调栈'],
    }, avatar: {
        type: String,
        default: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
    }, updateTime: {
        type: String,
        default: '2023-06-16 12:45'
    }, problemNum: {
        type: Number,
        default: 10,
    }
})
const borderLeftColor = ref(props.isCollection ? '#2d8cf0' : '#9b9b9b')

const toDetial = () => {
    router.push('/problemlist/' + props.id)
}


// onMounted(() => {
//     console.log("xixix", props)
// })

// TODO：接受父组件的参数
</script>

<style scoped lang="less">
.competition-item {
    border: 1px solid #ddd;
    border-left: 4px solid v-bind(borderLeftColor);
    // height: 150px;
    margin-bottom: 10px;
    padding: 10px 10px 10px 0px;
    // min-width: 700px;

    .competition-item-pic {
        // width: 90px;
        // height: 90px;
        min-width: 100px;
        padding: 10px;
    }

    .middle-space {
        font-size: 10px;
    }

    .tag-rating {
        font-size: 12px;
        color: #fff;
        background: #ff7f52;
        border-radius: 4px;
        padding: 1px 5px;
        display: inline-block;
        vertical-align: middle
    }

    .tag-rating i {
        display: inline-block;
        vertical-align: middle;
        font-style: normal;
        font-size: 12px;
        background: #fff;
        color: #ff7f52;
        width: 14px;
        height: 14px;
        line-height: 14px;
        border-radius: 50%;
        text-align: center
    }


    .match-status {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        background: #25bb9b;
        border-color: #25bb9b;
        color: #fff;
        font-size: 12px;
        height: 20px;
        line-height: 20px;
        margin: 0 5px;
        padding: 0 5px;
        text-align: center
    }

    .match-status.match-status-sm {
        font-size: 12px;
        line-height: 20px;
        height: 20px;
        padding: 0 3px
    }

    .match-status.match-status-sm:after {
        border-width: 10px 5px;
        right: -7px
    }

    .match-status:after {
        border-style: solid;
        border-color: inherit;
        border-width: 10px 8px;
        position: absolute;
        content: "";
        bottom: 0;
        right: -10px;
        border-right-color: transparent
    }

    .match-signup {
        background: #4ea3fa;
        border-color: #4ea3fa
    }

    .match-end-tag {
        background: #9b9b9b;
        border-color: #9b9b9b;
    }
}

.element-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

