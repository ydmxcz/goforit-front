<template>
    <div class="contest-detail" style="">
        <div class="header">
            <Row>
                <Col flex="3">
                </Col>
                <Col flex="14" style="min-width: 1000px;height: 300px;">
                <Space direction="vertical" style="width: 100%;margin-top: 20px;">
                    <Row>
                        <Col flex="auto" class="elem-vertical-center" style="color: #fff;height: 100px;">
                        <Space>
                            <span style="font-size: 30px;">{{ data.info.title }}</span>
                            <Tag color="success">原创</Tag>
                            <span class="tag-rating" data-title="Rating赛奖品更加丰厚"
                                data-tips-index="1"><i>¥</i>&nbsp;<span>Rated</span></span>
                            <span class="match-status  match-signup">报名中</span>
                            <span class="match-status  match-end-tag">比赛结束</span>

                        </Space>
                        </Col>
                        <Col flex="100px"><span class="elem-vertical-center" style="color: #fff;height: 100px;">分享比赛</span>
                        </Col>
                    </Row>
                    <span style="color: #fff;font-size: 14px;">
                        主办方：{{ data.info.sponsorName }} ( id: {{ data.info.sponsorId }} )
                    </span>
                    <span style="color: #fff;font-size: 14px;">
                        报名时间：{{ time.formatDate(new Date(data.info.signUpStartTime)) }} 至 {{ time.formatDate(new
                            Date(data.info.signUpEndTime)) }}
                    </span>
                    <span style="color: #fff;font-size: 14px;">
                        比赛时间：{{ time.formatDate(new Date(data.info.startTime)) }} 至 {{ time.formatDate(new
                            Date(data.info.endTime)) }} &nbsp;&nbsp;时长: {{ (data.info.endTime - data.info.startTime) / 3600000
    }}小时
                    </span>
                    <span style="color: #fff;font-size: 14px;">
                        不计Rating的范围：Rating＞{{ data.info.ratingTop }}
                    </span>
                    <span style="color: #fff;font-size: 14px;">
                        已有{{ data.info.signUpNum || 0 }}人报名
                    </span>
                </Space>
                </Col>
                <Col flex="3">
                </Col>
            </Row>
        </div>
        <Row>
            <Col flex="3">
            </Col>
            <Col flex="14" style="min-width: 1000px;">
            <Space direction="vertical" style="width: 100%;margin-bottom: 20px;">
                <Menu v-if="data.status == 1" mode="horizontal" active-name="比赛说明" @on-select="handleMenuItemSelect">
                    <MenuItem v-for="item in mentItemList" :name="item.name"> {{ item.name }} </MenuItem>
                </Menu>
                <!-- v-if="data.status != 0" -->
                <div class="count-down" v-else-if="data.status == 0">
                    <Space align="center" direction="vertical" type="flex">
                        <span>距离比赛开始还有</span>
                        <Space :wrap="false">
                            <div class="count-down-card">
                                <span class="count-down-card-number elem-center">{{ tow(dateInfo.day) }}</span>
                                <span class="count-down-card-unit elem-center">天</span>
                            </div>
                            <div class="count-down-card">
                                <span class="count-down-card-number elem-center">{{ tow(dateInfo.hour) }}</span>
                                <span class="count-down-card-unit elem-center">小时</span>
                            </div>
                            <div class="count-down-card">
                                <span class="count-down-card-number elem-center">{{ tow(dateInfo.minute) }}</span>
                                <span class="count-down-card-unit elem-center">分钟</span>
                            </div>
                            <div class="count-down-card">
                                <span class="count-down-card-number elem-center">{{ tow(dateInfo.second) }}</span>
                                <span class="count-down-card-unit elem-center">秒</span>
                            </div>
                        </Space>
                        <Button type="success" class="sign-up-btn">点此报名</Button>
                    </Space>
                </div>
                <RouterView />
            </Space>
            </Col>
            <Col flex="3">
            </Col>
        </Row>

    </div>
</template>

<script setup name="ContestDetail">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Message } from 'view-ui-plus'
import http from '../../../plugin/axios';
import msg from '../../../common/msg';
import time from '../../../common/time';

const router = useRouter()
// const route = useRoute()

const data = reactive({
    // 0代表比赛未开始，1代表比赛正在进行，2代表比赛已结束
    status: 0,
    id: router.currentRoute.value.params.id,
    info: {}
})

const mentItemList = ref([
    { name: '比赛说明', path: '/illustration', },
    { name: '题目', path: '/problems', },
    { name: '提交', path: '/submit', },
    { name: '排名', path: '/ranking', },
])

const pushTo = (path) => {
    router.push('/contest/detail/' + data.id + path)
}

const handleMenuItemSelect = (name) => {
    if (name != mentItemList.value[0].name && data.status == 0) {
        Message.error({
            background: true,
            content: '请等待比赛开始'
        });
        return
    }
    mentItemList.value.forEach((item) => {
        if (name == item.name) {
            pushTo(item.path)
        }
    })
}

const getContestDetialAndCheckRouter = async () => {
    const { data: res } = await http.post('/contest/detial', { id: Number(data.id) })
    console.log(res);
    if (res.code != 200) {
        msg.err('比赛信息请求失败')
        return
    }
    data.info = res.data.contest
    dateInfo.tarTime = new Date(res.data.contest.startTime).getTime()
    if (dateInfo.tarTime - (new Date().getTime()) > 0) {
        data.status = 0
        if (!router.currentRoute.value.fullPath.includes('illustration')) {
            msg.err("比赛还未开始,不能访问其他页面")
            router.push('/contest/detail/' + data.id + '/illustration')
        }
        setInterval(() => { computeTime() }, 1000)
    } else {
        data.status = 1
    }
    // console.log();
}

const dateInfo = reactive({
    tarTime: 0,
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
})

function tow(n) {
    return n >= 0 && n < 10 ? '0' + n : '' + n;
}

const computeTime = () => {
    var oldTime = new Date().getTime();
    var newTime = dateInfo.tarTime;
    dateInfo.second = Math.floor((newTime - oldTime) / 1000);
    dateInfo.day = Math.floor(dateInfo.second / 86400);
    dateInfo.second = dateInfo.second % 86400;
    dateInfo.hour = Math.floor(dateInfo.second / 3600);
    dateInfo.second %= 3600;
    dateInfo.minute = Math.floor(dateInfo.second / 60);
    dateInfo.second %= 60;
}


onMounted(() => {
    // printTime()
    getContestDetialAndCheckRouter()
    // after init data
    // if (data.status) {
    //     pushTo(mentItemList.value[0].path)
    // }
})


</script>

<style scoped lang="less">
.contest-detail {
    width: 100%;
    min-width: 1000px;

    .header {
        width: 100%;
        height: 300px;
        background: url('//uploadfiles.nowcoder.com/images/20170717/56_1500258024335_B16F33991AAD19B106ACB5FC96798E75');
        background-color: rgb(7, 10, 15);
        background-position: bottom center;
        background-repeat: no-repeat;

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

    .count-down {
        width: 100%;
        margin-top: 50px;
        margin-bottom: 50px;

        .count-down-card {
            background-color: #C6C6C6;
            border-radius: 5px;
            color: #fff;
            height: 120px;
            width: 100px;

            .count-down-card-number {
                width: 100px;
                font-size: 60px;
                height: 80px;

            }

            .count-down-card-unit {
                width: 100px;
                // background-color: #4ea3fa;
                text-align: center;
                font-size: 20px;
                height: 30px;
            }

        }

        .sign-up-btn {
            width: 430px;
            margin-top: 20px;
            background-color: #25bb9b;
            color: #fff;
        }
    }
}

.elem-vertical-center {
    display: flex;
    align-items: center;
    // justify-content: center;
}

.elem-center {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>