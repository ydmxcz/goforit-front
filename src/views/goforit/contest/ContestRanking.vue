<template>
    <!-- style="background-color: red;" -->
    <div style="width: 100%;">

        <Space direction="vertical" style="width: 100%;">
            <!-- <div style="width: 100%;">
                <Space style="padding-left: 30px;margin-top: 30px;margin-bottom: 30px;" align="center">
                    <Input v-model="searchKey" search enter-button placeholder="输入用户名进行搜索"
                        style="width: 300px;float: left;" @on-search="searchUserSubmit" />
                    <Checkbox style="margin-left: 30px;" v-model="checkboxFlag">只看我的提交</Checkbox>
                </Space>
            </div> -->

            <Row :wrap="false" style="width: 100%;">
                <Col flex="320px">
                <table cellspacing="0">
                    <thead>
                        <th class="table-cell-base info-cell-bgcolor" v-for="item in infoHeaderList">
                            <div class="elem-center">{{ item }}</div>
                        </th>
                    </thead>
                    <tbody>
                        <tr v-for="row in infoRowList">
                            <td class="table-cell-base info-cell-bgcolor" style="width: 40px;text-align: center;">
                                <div>{{ row.ranking }}</div>
                            </td>
                            <td class="table-cell-base info-cell-bgcolor td-wrap" style="width: 100px; text-align: center;">
                                <div>{{ row.username }}</div>
                            </td>
                            <td class="table-cell-base info-cell-bgcolor td-wrap" style="width: 100px; text-align: center;">
                                <div style="color: #32ca99;">{{ row.school }}</div>
                            </td>
                            <td class="table-cell-base info-cell-bgcolor"
                                style="width: 40px;position: relative;text-align: center;">
                                <Space direction="vertical" align="center" type="flex">
                                    <span>{{ row.accept }}</span>
                                    <span v-if="row.accept >= 9" class="plat-label">AK</span>
                                </Space>
                            </td>
                            <td class="table-cell-base info-cell-bgcolor" style="width: 40px;">
                                <div class="elem-center">{{ row.penalty }}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </Col>
                <Col flex="auto" style="overflow-x:hidden;">
                <table cellspacing="0" style="width: 100%;">
                    <thead>
                        <th class="table-cell-base table-cell-data info-cell-bgcolor" v-for="item in dataHeaderList">
                            <Space direction="vertical" :size="0">
                                {{ item.problemIndex }}
                                <div style="color: #32ca99;">{{ item.acceptedCount }}</div>
                                {{ item.submitCount }}
                            </Space>
                        </th>
                    </thead>
                    <tbody>
                        <tr v-for="row in dataRowList">
                            <td class="table-cell-base table-cell-data" v-for="cell in row"
                                :style="{ backgroundColor: getCellColor(cell) }">
                                <!-- <div v-if="cell.acceptTime == 0 && cell.errCount != 0" class="elem-center">
                                    (-{{ cell.errCount }})
                                </div>
                                <div v-else-if="cell.acceptTime != 0 && cell.errCount != 0" class="elem-center">
                                    {{ cell.acceptTime }}<br>
                                </div> -->
                                <div class="elem-center" v-if="cell.acceptTime != 0">{{ cell.acceptTime }}</div>
                                <div class="elem-center" v-if="cell.errCount != 0">(-{{ cell.errCount }})</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </Col>
            </Row>

        </Space>
    </div>
</template>

<script setup name="ContestRanking">
// 排名规则：经典ACM规则
// AC（通过题目）越多，排名越靠前。
// AC相同，总用时越少，排名越靠前。
// 总用时=∑(每一个题目的用时)
// 每一个题目的用时=比赛开始到提交被通过的时间+罚时
// 罚时=（通过前）错误代码提交次数*每次罚时（默认为20分钟）
// 不算罚时的情况：没有通过的题目、(系统)内部错误、编译错误

import { ref, onMounted, reactive } from 'vue';
import http from '../../../plugin/axios';
import BigNumber from '_bignumber.js@9.1.1@bignumber.js';
import msg from '../../../common/msg';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const store = useStore()
const router = useRouter()
const checkboxFlag = ref(false)
const searchKey = ref('')
const searchUserSubmit = () => {

}

const userAccess = async () => {
    const { data: res } = await http.post("/contest/access", {
        contestId: BigNumber(router.currentRoute.value.params.id),
        userId: BigNumber(store.getters.userInfo.id)
    })
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    return res.data.status
}

const getRank = async () => {
    const { data: res } = await http.post("/contest/rank", {
        contestId: BigNumber(router.currentRoute.value.params.id),
        currPage: 1,
        pageSize: 50
    })
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    // var points = [40, 100, 1, 5, 25, 10];
    res.data.problemData.sort(function (a, b) { return a.problemIndex - b.problemIndex });
    dataHeaderList.value = res.data.problemData
    // dataHeaderList.value.sort()
    let user = []
    let ddataRowList = []
    res.data.rankData.forEach((item, idx) => {
        user.push({ ranking: idx + 1, username: item.userId, school: '烟台南山学院', accept: item.acceptedCount, penalty: item.penaltyTime })
        let row = []
        item.submissionList.forEach((subitem, idx) => {
            row.push({ acceptTime: subitem.acceptedTime, errCount: subitem.failedCount || 0, first: subitem.firstBlood })
        })
        ddataRowList.push(row)
    });
    infoRowList.value = user
    dataRowList.value = ddataRowList
    // console.log(res);
}

onMounted(() => {
    if (!userAccess()) {
        msg.err('未报名参加比赛,禁止查询相关信息')
        return
    }
    getRank()
})

const infoHeaderList = ref([
    '名次', '参赛者', '学校', '通过', '罚时',
])

const dataHeaderList = ref([
    { problemIndex: 'A', submitCount: 10, acceptedCount: 1099 },
    { problemIndex: 'B', submitCount: 11, acceptedCount: 1099 },
    { problemIndex: 'C', submitCount: 12, acceptedCount: 1099 },
    { problemIndex: 'D', submitCount: 46, acceptedCount: 1099 },
    { problemIndex: 'E', submitCount: 78, acceptedCount: 1099 },
    { problemIndex: 'F', submitCount: 12, acceptedCount: 1099 },
    { problemIndex: 'G', submitCount: 32, acceptedCount: 1099 },
    { problemIndex: 'H', submitCount: 53, acceptedCount: 1099 },
    { problemIndex: 'I', submitCount: 22, acceptedCount: 1099 },
    { problemIndex: 'J', submitCount: 54, acceptedCount: 1099 },
])


const infoRowList = ref([
    { ranking: 1, username: 'abc', school: '麻省理工学院', accept: 99, penalty: 315 },
    { ranking: 1, username: 'asabc', school: '麻省理', accept: 19, penalty: 315 },
    { ranking: 1, username: 'aasdasbc', school: '麻省理工', accept: 9, penalty: 315 },
    { ranking: 1, username: 'abasdasaasdasdssd', school: '麻省理工理工学院', accept: 9, penalty: 315 },
    { ranking: 1, username: 'asdas', school: '麻省理工学院', accept: 9, penalty: 315 },
    { ranking: 1, username: 'abc', school: '麻省理工学院', accept: 8, penalty: 315 },
    { ranking: 1, username: 'abc', school: '麻省理工学院', accept: 8, penalty: 315 },
    { ranking: 1, username: 'abc', school: '麻省理工学院', accept: 8, penalty: 315 },
    { ranking: 1, username: 'abc', school: '麻省理工学院', accept: 8, penalty: 315 },
    { ranking: 1, username: 'abcasd', school: '麻省理工学院', accept: 8, penalty: 315 },
    { ranking: 1, username: 'abc', school: '麻省理工学院', accept: 8, penalty: 315 },
    { ranking: 1, username: 'abasdc', school: '麻省理工学院', accept: 8, penalty: 315 },
    { ranking: 1, username: 'abc', school: '麻省理工学院', accept: 8, penalty: 315 },
    { ranking: 1, username: 'abc', school: '麻省理工学院', accept: 8, penalty: 315 },
    { ranking: 1, username: 'abc', school: '麻省理工学院', accept: 8, penalty: 315 },
    { ranking: 1, username: 'asdasasd', school: '麻省理工学院', accept: 8, penalty: 315 },
    { ranking: 1, username: 'aasdasbc', school: '麻省理工学院', accept: 8, penalty: 315 },
    { ranking: 1, username: 'abc', school: '麻省理工学院', accept: 8, penalty: 315 },
    { ranking: 1, username: 'aasdbc', school: '麻省理工学院', accept: 8, penalty: 315 },
    { ranking: 1, username: 'abc', school: '麻省理工学院', accept: 8, penalty: 315 },
])

const dataRowList = ref([
    [{ acceptTime: 42, errCount: 2, first: true }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }],
    [{ acceptTime: 0, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }],
    [{ acceptTime: 42, errCount: 2, first: true }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }],
    [{ acceptTime: 42, errCount: 2, first: true }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }],
    [{ acceptTime: 42, errCount: 2, first: true }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }],
    [{ acceptTime: 42, errCount: 2, first: true }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }],
    [{ acceptTime: 42, errCount: 2, first: true }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }],
    [{ acceptTime: 42, errCount: 2, first: true }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }],
    [{ acceptTime: 42, errCount: 2, first: true }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }],
    [{ acceptTime: 42, errCount: 2, first: true }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }],
    [{ acceptTime: 42, errCount: 2, first: true }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }],
    [{ acceptTime: 42, errCount: 2, first: true }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }],
    [{ acceptTime: 42, errCount: 2, first: true }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }],
    [{ acceptTime: 42, errCount: 2, first: true }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }],
    [{ acceptTime: 42, errCount: 2, first: true }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }],
    [{ acceptTime: 42, errCount: 2, first: true }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }],
    [{ acceptTime: 42, errCount: 2, first: true }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }],
    [{ acceptTime: 42, errCount: 2, first: true }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }],
    [{ acceptTime: 42, errCount: 2, first: true }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }],
    [{ acceptTime: 42, errCount: 2, first: true }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 0, errCount: 0, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }, { acceptTime: 42, errCount: 2, first: false }],
])

const getCellColor = (cell) => {
    if (!cell.acceptTime) {
        return (cell.errCount) ? '#ffecec' : '#f4f4f4'
    } else {
        return cell.first ? '#bfe6de' : '#eff9f7'
    }
}
// onMounted(() => {
// })


</script>

<style scoped lang="less">
// 这里关于table的CSS不要乱动，很关键，
// 作用：令表格自适应父组件或页面的宽度
table {
    width: 100%;
    border-collapse: collapse;
    word-break: break-word;
    word-wrap: break-word;
    table-layout: fixed;
}


table td {
    border-bottom: 1px dashed #ddd;
}

.table-cell-base {
    height: 76px;
    font-size: 12px;
    padding: 3px;
}

.info-cell-bgcolor {
    background-color: #e8e8e8;
}

.elem-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.td-wrap {
    word-break: break-all;
    overflow: hidden;
    white-space: normal;
}

.table-cell-data {
    min-width: 91px;
}


.plat-label {
    position: absolute;
    white-space: nowrap;
    // top: 15px;
    left: 5px;
    -webkit-transform: scale(.8);
    -ms-transform: scale(.8);
    transform: scale(.8);
    background: #fb7e00;
    font-size: 12px;
    padding-left: 5px;
    height: 18px;
    line-height: 18px;
    color: #fff;
    width: 25px;
}

.plat-label:after {
    content: "";
    position: absolute;
    right: -10px;
    top: 0;
    border-style: solid;
    border-width: 9px 5px;
    border-color: #fb7e00 transparent #fb7e00 #fb7e00;
}

// .problem-title {
//     float: left;
//     height: 80px;
// }

// .problem-title:hover {
//     color: #2d8cf0;

// }
</style>