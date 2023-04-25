<template>
    <div class="contest-item">
        <Row style="min-width: 700px;" :wrap="false">
            <Col class="element-center" flex="100px" style="height: 150px;width: 150px;">
            <img class="contest-item-pic" :src="props.avatar">
            </Col>
            <Col flex="auto" style="min-width: 470px; ">
            <Space class="middle-space" direction="vertical">
                <Space>
                    <div style="font: 18px bolder;color: #333333;cursor: pointer;" @click="toDetialPage">{{ props.name }}</div>
                    <Tag color="success" v-if="props.isOriginal">原创</Tag>
                    <span v-if="props.isRated" class="tag-rating" data-title="Rating赛奖品更加丰厚"
                        data-tips-index="1"><i>¥</i>&nbsp;<span>Rated</span></span>
                    <span v-if="contestStatus == 1" class="match-status  match-signup">报名中</span>
                    <span v-else-if="contestStatus == 2" class="match-status  match-doing">进行中...</span>
                    <span v-else class="match-status  match-end-tag">比赛结束</span>
                </Space>
                <span>

                    <Icon type="md-time" /> 报名时间： {{ time.formatDate(new Date(props.signUpStart)) }} 至 {{
                        time.formatDate(new Date(props.signUpEnd)) }}
                </span>
                <span>
                    <Icon type="ios-alarm" /> 比赛时间： {{ time.formatDate(new Date(props.contestStart)) }} 至 {{
                        time.formatDate(new Date(props.contestEnd)) }} (时长:
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
            <Space v-if="contestStatus == 1" direction="vertical">
                <Button type="primary" shape="circle" @click="handlesignUpClick">报名</Button>
                <!-- 动态倒计时 -->
                <div class="platform-countdown ">
                    距比赛开始<br>
                    <CountDown :target="(props.contestStart)" v-font="14" @on-end="" />
                    <!-- 8天22:29:25 -->
                </div>
            </Space>
            <Space v-else-if="contestStatus == 2" direction="vertical">
                距离比赛结束
                <CountDown :target="(props.contestEnd)" v-font="14" @on-end="" />

            </Space>
            <Space v-else-if="contestStatus == 3" direction="vertical">
                <Button style="background-color:#bbb;color: #fff;" shape="circle">查看比赛</Button>
            </Space>
            </Col>
        </Row>
    </div>
</template>

<script setup name="ContestList">
import { ref, onMounted, reactive ,watch} from 'vue';
import time from '../../../common/utils';
const emits = defineEmits(['onSignUp','toDetialPage']);


const props = defineProps({
    contestId: {
        type: Number,
    }, name: {
        type: String,
        default: '比赛名称',
    }, isOriginal: {
        type: Boolean,
        default: false,
    }, isRated: {
        type: Boolean,
        default: false,
    }, signUpStart: {
        type: Number,
        default: 0,
    }, signUpEnd: {
        type: Number,
        default: 0,
    }, lengthTime: {
        type: Number,
        default: 0,
    }, contestStart: {
        type: Number,
        default: '--',
    }, contestEnd: {
        type: Number,
        default: '--',
    }, sponsor: {
        type: String,
        default: '--',
    }, number: {
        type: Number,
        default: 0,
    }, maxRating: {
        type: Number,
        default: 0,
    }, avatar: {
        type: String,
        default: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar'
    }
})

const borderLeftColor = ref('#9b9b9b')

const handlesignUpClick = () => {
    emits('onSignUp', props.contestId)
}

const toDetialPage = () => {
    emits('toDetialPage', props.contestId)
}
watch(() => props.contestStart, (newValue, oldValue) => {
    updateContestStatus()
})

const updateContestStatus = () => {
    let now = new Date().getTime()
    if (now - new Date(props.contestStart).getTime() >= 0) {
        if (now - (new Date(props.contestEnd).getTime()) <= 0) {
            // console.log(props.contestId, '正在进行');
            borderLeftColor.value = '#ed4014'
            contestStatus.value = 2
        } else {
            // console.log(props.contestId, '已结束');
            borderLeftColor.value = '#9b9b9b'
            contestStatus.value = 3
        }
    } else {
        borderLeftColor.value = '#4ea3fa'
        contestStatus.value = 1
        // console.log(props.contestId, '未开始');
    }
}


const contestStatus = ref(1)
onMounted(() => {
    updateContestStatus()
})

// TODO：接受父组件的参数
</script>

<style scoped lang="less">
.contest-item {
    border: 1px solid #ddd;
    border-left: 4px solid v-bind(borderLeftColor);
    // height: 150px;
    margin-bottom: 10px;
    min-width: 700px;

    .contest-item-pic {
        width: 120px;
        height: 120px;
        min-width: 100px;
        padding: 10px;
    }

    .middle-space {
        // font-size: 10px;
        color: #89609b;
        padding: 15px;
        // padding-bottom: 10px;
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

    .match-doing {
        background: #ed4014;
        border-color: #ed4014
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

