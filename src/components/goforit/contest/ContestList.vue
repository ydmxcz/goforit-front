<template>

    <div class="contest-item">
        <Row style="min-width: 700px;" :wrap="false">
            <Col class="element-center" flex="100px" style="height: 150px;width: 100px;">
            <img class="contest-item-pic" :src="props.avatar">
            </Col>
            <Col flex="auto" style="min-width: 470px; ">
            <Space class="middle-space" direction="vertical">
                <Space>
                    <span style="font: 16px bolder;">{{ props.name }}</span>
                    <Tag color="success" v-if="props.isOriginal">原创</Tag>
                    <span v-if="props.isRated" class="tag-rating" data-title="Rating赛奖品更加丰厚"
                        data-tips-index="1"><i>¥</i>&nbsp;<span>Rated</span></span>
                    <span v-if="props.status" class="match-status  match-signup">报名中</span>
                    <span v-else class="match-status  match-end-tag">比赛结束</span>
                </Space>
                <span>
                    <Icon type="md-time" /> 报名时间： {{ props.signUpStart }} 至 {{ props.signUpEnd }}
                </span>
                <span>
                    <Icon type="ios-alarm" /> 比赛时间： {{ props.contestStart }} 至 {{ props.contestEnd }} (时长:
                    {{ props.lengthTime }} 小时)
                </span>
                <Space>
                    <span>
                        <Icon type="md-flag" /> 主办方：{{ props.sponsor }}
                    </span>
                    <span>
                        <Icon type="md-contacts" /> 参与人数：{{ props.number }}
                    </span>
                </Space>
                <span v-if="props.maxRating != 0">
                    <Icon type="md-flash" /> 不计Rating的范围：Rating＞ {{ props.maxRating }}
                </span>

            </Space>
            </Col>
            <Col class="element-center" flex="200px" style="min-width: 100px;text-align: center;">
            <Space v-if="props.status" direction="vertical">
                <Button type="success" shape="circle" @click="handlesignUpClick">报名</Button>
                <!-- 动态倒计时 -->
                <div class="platform-countdown ">
                    距比赛<br>
                    <CountDown :target="props.contestStart" v-font="14" />
                    <!-- 8天22:29:25 -->
                </div>
            </Space>
            <Space v-else direction="vertical">
                <Button style="background-color:#bbb;color: #fff;" shape="circle">回顾比赛</Button>
                <!-- <Button style="background-color: #73cbde; color: #fff;" shape="circle">创建重现赛</Button> -->
            </Space>
            </Col>
        </Row>
    </div>


</template>

<script setup name="ContestList">
import { ref, onMounted, reactive } from 'vue';
const emits = defineEmits(['onSignUp']);

// const targetTime = ref(new Date().getTime() + ((3600 * 24 * 8) + (3600 * 6) + (1900)) * 1000);
const props = defineProps({
    contestId:{
        type:Number,
    },name: {
        type: String,
        default: '比赛名称',
    }, isOriginal: {
        type: Boolean,
        default: false,
    }, isRated: {
        type: Boolean,
        default: false,
    }, signUpStart: {
        type: String,
        default: '--',
    }, signUpEnd: {
        type: String,
        default: '--',
    }, lengthTime: {
        type: Number,
        default: 0,
    }, contestStart: {
        type: String,
        default: '--',
    }, contestEnd: {
        type: String,
        default: '--',
    }, sponsor: {
        type: String,
        default: '--',
    }, number: {
        type: Number,
        default: 0,
    }, status: {
        type: Boolean,
        default: false,
    }, maxRating: {
        type: Number,
        default: 0,
    },avatar:{
        type:String,
        default:'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar'
    }
})
const borderLeftColor = ref(props.status ? '#2d8cf0' : '#9b9b9b')

const handlesignUpClick = () => {
    console.log(props.contestId);
    emits('onSignUp',props.contestId)
}

// onMounted(() => {
//     console.log("xixix", props)
// })

// TODO：接受父组件的参数
</script>

<style scoped lang="less">
.contest-item {
    border: 1px solid #ddd;
    border-left: 4px solid v-bind(borderLeftColor);
    height: 150px;
    margin-bottom: 10px;
    min-width: 700px;

    .contest-item-pic {
        width: 90px;
        height: 90px;
        min-width: 100px;
        padding: 10px;
    }

    .middle-space {
        font-size: 10px;
        padding-top: 10px;
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

