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
                            <span style="font-size: 30px;">2023 SFGO寒假算法基础集训营6</span>
                            <Tag checkable color="success">原创</Tag>
                            <span class="tag-rating" data-title="Rating赛奖品更加丰厚"
                                data-tips-index="1"><i>¥</i>&nbsp;<span>Rated</span></span>
                            <span class="match-status  match-signup">报名中</span>
                            <span class="match-status  match-end-tag">比赛结束</span>

                        </Space>
                        </Col>
                        <Col flex="100px"><span class="elem-vertical-center"
                            style="color: #fff;height: 100px;">分享比赛</span></Col>
                    </Row>
                    <span style="color: #fff;font-size: 14px;">
                        2023-02-03 13:00:00 至 2023-02-03 18:00:00
                    </span>
                    <span style="color: #fff;font-size: 14px;">
                        时长: 5小时
                    </span>
                    <span style="color: #fff;font-size: 14px;">
                        不计Rating的范围：Rating＞2199
                    </span>
                    <span style="color: #fff;font-size: 14px;">
                        已有6354人报名
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
                <Menu  mode="horizontal" active-name="比赛说明" @on-select="handleMenuItemSelect">
                    <MenuItem v-for="item in mentItemList" :name="item.name"> {{ item.name }} </MenuItem>
                </Menu>
                <div  v-if="competitionInfo.status != 0" class="count-down">
                    <Space align="center" direction="vertical" type="flex">
                        <span>距离比赛开始还有</span>
                        <Space :wrap="false">
                            <div class="count-down-card">
                                <span class="count-down-card-number elem-center">05</span>
                                <span class="count-down-card-unit elem-center">天</span>
                            </div>
                            <div class="count-down-card">
                                <span class="count-down-card-number elem-center">05</span>
                                <span class="count-down-card-unit elem-center">天</span>
                            </div>
                            <div class="count-down-card">
                                <span class="count-down-card-number elem-center">05</span>
                                <span class="count-down-card-unit elem-center">天</span>
                            </div>
                            <div class="count-down-card">
                                <span class="count-down-card-number elem-center">05</span>
                                <span class="count-down-card-unit elem-center">天</span>
                            </div>
                        </Space>
                        <Button type="success" class="sign-up-btn"
                            @click="competitionInfo.status = !competitionInfo.status">点此报名</Button>
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
import { useRouter, useRoute } from 'vue-router';
import { Message } from 'view-ui-plus'


const router = useRouter()
const route = useRoute()

const competitionInfo = reactive({
    // 0代表比赛未开始，1代表比赛正在进行，2代表比赛已结束
    status: 0,
    id: route.params.id,
})

const mentItemList = ref([
    { name: '比赛说明', path: '/illustration', },
    { name: '题目', path: '/problems', },
    { name: '提交', path: '/submit', },
    { name: '排名', path: '/ranking', },
])

const pushTo = (path) => {
    router.push('/contest/detail/' + route.params.id + path)
}

const handleMenuItemSelect = (name) => {
    if (name != mentItemList.value[0].name && competitionInfo.status == 0) {
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



onMounted(() => {
    console.log("xixixi", competitionInfo.id)
    // after init data
    if (competitionInfo.status) {
        pushTo(mentItemList.value[0].path)
    }
})

const competitionIllustrationText = ref(`
# 这是比赛说明
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

#### 输入样例：
`)
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