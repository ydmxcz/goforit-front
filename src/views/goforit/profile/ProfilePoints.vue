<template>
    <!-- <div style="width: 100%;"></div> -->
    <Space align="center" style="width: 100%;height: 100px;" direction="vertical">
        <span style="font-size: 36px;color: #595959;">我的积分</span>
        <span>剩余： <img src="../../../assets/coin.png" style="width: 14px;height:14px;margin-right: 3px;" />520</span>
    </Space>
    <Space style="width: 100%;margin-bottom: 20px ;" direction="vertical" v-for="item in datalist">
        <div style="width: 100%;text-align: center;color: #979997;">{{ item.time }}</div>
        <div style="width:100%;height: 110px;    box-shadow: 0 5px 15px 0 rgb(0 0 0 / 8%);border-radius: 10px;">
            <Row style="width: 100%;height:100%;">
                <Col flex="110px" class="elem-center"
                    style="background-color: #fafafa;box-shadow: 0 5px 15px 0 rgb(0 0 0 / 8%);border-radius: 10px 0px 0px 10px;">
                <Space direction="vertical" style="width: 100%;" class="elem-center">
                    <img src="../../../assets/coin.png" style="width: 40px;height:40px;">
                    <span style="font-size: 16px;color: #fea116;">{{ item.status }}{{ item.num }}</span>
                </Space>
                </Col>
                <Col flex="auto"
                    style="display: flex;align-items: center;padding-left: 20px;background-color: #fff;border-radius: 0px 10px 10px 0px; ">
                <Space direction="vertical" align="start">
                    <span style="font-size: 12px;color: #808080;">{{ item.classify }}</span>
                    <span style="font-size: 16px;color: #595959;">{{ item.reason }}</span>
                </Space>
                </Col>
            </Row>
        </div>
    </Space>
    <Space direction="vertical" type="flex" align="center" style="margin-top: 10px;margin-bottom: 10px;">
        <Page :total="100" :page-size="10" show-elevator show-sizer show-total />
    </Space>


</template>
<script setup name='ProfilePoints'>
import { ref, reactive, onMounted } from 'vue'

const datalist = ref([
    { time: '2023-02-02 15:04', status: '+', num: 1, classify: '任务奖励', reason: '每日登录' },
    { time: '2023-02-02 15:04', status: '+', num: 1, classify: '任务奖励', reason: '每日登录' },
    { time: '2023-02-02 15:04', status: '+', num: 1, classify: '任务奖励', reason: '每日登录' },
    { time: '2023-02-02 15:04', status: '+', num: 1, classify: '任务奖励', reason: '每日登录' },
    { time: '2023-02-02 15:04', status: '+', num: 1, classify: '任务奖励', reason: '每日登录' },
    { time: '2023-02-02 15:04', status: '+', num: 1, classify: '任务奖励', reason: '每日登录' },
    { time: '2023-02-02 15:04', status: '+', num: 1, classify: '任务奖励', reason: '每日登录' },
    { time: '2023-02-02 15:04', status: '+', num: 1, classify: '任务奖励', reason: '每日登录' },
    { time: '2023-02-02 15:04', status: '+', num: 1, classify: '任务奖励', reason: '每日登录' },
    { time: '2023-02-02 15:04', status: '+', num: 1, classify: '任务奖励', reason: '每日登录' },
]);

</script>
<style scoped lang='less'>
.elem-center {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>