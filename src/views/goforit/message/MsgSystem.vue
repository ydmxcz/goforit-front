<template>
    <div class="main-area">
        <Space class="item-space" direction="vertical" v-for="item in datalist">
            <div class="msg-time">{{ item.time }}</div>
            <Space direction="vertical" class="msg-content">
                <Row :wrap="false" style="width: 100%;display: block;height:40px;padding: 0px 20px;">
                    <span style="font-size: 16px;float: left;height: 40px;
                        display: flex;align-items: center; font-weight: bold;">
                        {{ item.title }}
                    </span>

                    <span style="font-size: 14px;float: right;height: 40px;
                            display: flex;align-items: center;">
                        <Icon type="md-trash" style="margin-left: 20px;cursor: pointer;" />
                    </span>
                </Row>

                <div style="padding: 10px 20px;width: 100%;font-size: 14px;">
                    <Text>{{ item.content }}</Text>
                </div>
            </Space>
        </Space>
        <Space direction="vertical" type="flex" align="center" style="margin-top: 10px;margin-bottom: 30px;">
            <Page :total="100" :page-size="10" show-elevator show-sizer show-total />
        </Space>
    </div>
</template>
<script setup name='MsgAttention'>
import { ref, reactive, onMounted } from 'vue'

const datalist = ref([
    { time: '2023-02-02 15:04', title: '账号异地登录通知', content: '  亲爱的用户，您好！\n您的账号于2023-01-12 11:29:07在【山东省泰安市 移通】登录，登录IP为：【111.17.54.164】，若非本人操作，请立即修改密码。' },
    { time: '2023-02-02 15:04', title: '账号异地登录通知', content: '亲爱的用户，您好！您的账号于2023-01-12 11:29:07在【山东省泰安市 移通】登录，登录IP为：【111.17.54.164】，若非本人操作，请立即修改密码。' },
    { time: '2023-02-02 15:04', title: '账号异地登录通知', content: '亲爱的用户，您好！您的账号于2023-01-12 11:29:07在【山东省泰安市 移通】登录，登录IP为：【111.17.54.164】，若非本人操作，请立即修改密码。' },
    { time: '2023-02-02 15:04', title: '账号异地登录通知', content: '亲爱的用户，您好！您的账号于2023-01-12 11:29:07在【山东省泰安市 移通】登录，登录IP为：【111.17.54.164】，若非本人操作，请立即修改密码。' },
    { time: '2023-02-02 15:04', title: '账号异地登录通知', content: '亲爱的用户，您好！您的账号于2023-01-12 11:29:07在【山东省泰安市 移通】登录，登录IP为：【111.17.54.164】，若非本人操作，请立即修改密码。' },
    { time: '2023-02-02 15:04', title: '账号异地登录通知', content: '亲爱的用户，您好！您的账号于2023-01-12 11:29:07在【山东省泰安市 移通】登录，登录IP为：【111.17.54.164】，若非本人操作，请立即修改密码。' },
    { time: '2023-02-02 15:04', title: '账号异地登录通知', content: '亲爱的用户，您好！您的账号于2023-01-12 11:29:07在【山东省泰安市 移通】登录，登录IP为：【111.17.54.164】，若非本人操作，请立即修改密码。' },
    { time: '2023-02-02 15:04', title: '账号异地登录通知', content: '亲爱的用户，您好！您的账号于2023-01-12 11:29:07在【山东省泰安市 移通】登录，登录IP为：【111.17.54.164】，若非本人操作，请立即修改密码。' },
    { time: '2023-02-02 15:04', title: '账号异地登录通知', content: '亲爱的用户，您好！您的账号于2023-01-12 11:29:07在【山东省泰安市 移通】登录，登录IP为：【111.17.54.164】，若非本人操作，请立即修改密码。' },
]);

</script>
<style scoped lang='less'>
.main-area {
    width: 100%;

    .item-space {
        width: 100%;
        margin-bottom: 20px;

        .msg-time {
            width: 100%;
            text-align: center;
            color: #979997;
        }

        .msg-content {
            width: 100%;
            min-height: 110px;
            box-shadow: 0 5px 15px 0 rgb(0 0 0 / 8%);
            border-radius: 10px;
            background-color: #fff;
        }
    }
}

.elem-center {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>