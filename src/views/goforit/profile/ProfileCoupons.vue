<template>
    <Space align="start" style="width: 100%;margin-bottom: 20px;">
        <div ref="topBtnsDom" class="elem-center topbtn-base" v-for="(item, idx) in topBtnsNameList"
            @click="handleTopBtnsClick(idx)">
            {{ item }}
        </div>
    </Space>
    <Space style="width: 100%;margin-bottom: 20px ;" direction="vertical" v-for="item in datalist">
        <div style="width: 100%;text-align: center;color: #979997;">{{ item.time }}</div>
        <div style="width:100%;height: 110px;    box-shadow: 0 5px 15px 0 rgb(0 0 0 / 8%);border-radius: 10px;">
            <Row style="width: 100%;height:100%;">
                <Col flex="110px" class="elem-center"
                    style="background-color: #fafafa;box-shadow: 0 5px 15px 0 rgb(0 0 0 / 8%);border-radius: 10px 0px 0px 10px;">
                <Space direction="vertical" style="width: 100%;" class="elem-center">
                    <img src="../../../assets/coin.png" style="width: 40px;height:40px;">
                    <span style="font-size: 16px;color: #fea116;">抵扣：{{ item.num }}元</span>
                </Space>
                </Col>
                <Col flex="auto"
                    style="display: flex;align-items: center;padding-left: 20px;background-color: #fff;border-radius: 0px 10px 10px 0px; ">
                <Space direction="vertical" style="width: 100%;">
                    <span style="font-size: 12px;color: #808080;">{{ item.classify }}</span>
                    <div style="width: 100%;">
                        <span style="margin-right: 20px;font-size: 16px;color: #595959;">{{ item.reason }} </span>
                        <Tag v-if="item.status == '+'" color="green" style="float: right;margin-right: 20px;">未使用</Tag>
                        <Tag v-else-if="item.status == '-'" color="red" style="float: right;margin-right: 20px;">已使用
                        </Tag>
                        <Tag v-else-if="item.status == 'x'" color="error" style="float: right;margin-right: 20px;">已失效
                        </Tag>
                    </div>

                </Space>
                </Col>
            </Row>
        </div>
    </Space>
    <Space direction="vertical" type="flex" align="center" style="margin-top: 10px;margin-bottom: 10px;">
        <Page :total="100" :page-size="10" show-elevator show-sizer show-total />
    </Space>
</template>
<script setup name='ProfileCoupons'>
import { ref, reactive, onMounted } from 'vue'

const topBtnsDom = ref([])

const topBtnsNameList = ref(['全部', '未使用', '已失效', '已支付']);

const datalist = ref([
    { time: '2023-02-02 15:04', status: '+', num: 1, classify: '任务奖励', reason: '每日登录' },
    { time: '2023-02-02 15:04', status: '-', num: 1, classify: '任务奖励', reason: '每日登录' },
    { time: '2023-02-02 15:04', status: 'x', num: 1, classify: '任务奖励', reason: '每日登录' },
    { time: '2023-02-02 15:04', status: '+', num: 1, classify: '任务奖励', reason: '每日登录' },
    { time: '2023-02-02 15:04', status: '+', num: 1, classify: '任务奖励', reason: '每日登录' },
    { time: '2023-02-02 15:04', status: '+', num: 1, classify: '任务奖励', reason: '每日登录' },
    { time: '2023-02-02 15:04', status: '+', num: 1, classify: '任务奖励', reason: '每日登录' },
    { time: '2023-02-02 15:04', status: '+', num: 1, classify: '任务奖励', reason: '每日登录' },
    { time: '2023-02-02 15:04', status: '+', num: 1, classify: '任务奖励', reason: '每日登录' },
    { time: '2023-02-02 15:04', status: '+', num: 1, classify: '任务奖励', reason: '每日登录' },
]);

const handleTopBtnsClick = (idx) => {
    topBtnsDom.value.forEach((item, i) => {
        item.id = (i == idx) ? 'active-topbtn' : 'default-topbtn';
    })
    // http requests here
}


onMounted(() => {
    handleTopBtnsClick(0)
})

</script>
<style scoped lang='less'>
.elem-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.topbtn-base {
    font-size: 14px;
    line-height: 30px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 50px;
    cursor: pointer;
}

#default-topbtn {
    color: #575758;
    background: #eaecef;

}

#active-topbtn {
    color: #fff;
    background: #262626;
}
</style>