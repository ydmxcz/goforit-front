<template>
    <div v-if="datalist.length > 0" class="main-area">
        <Space class="item-space" direction="vertical" v-for="item in datalist">
            <div class="msg-time">{{ item.time }}</div>
            <Space direction="vertical" class="msg-content">
                <Row :wrap="false" style="width: 100%;min-height: 110px;padding: 20px ;">
                    <Col flex="50px">
                    <Avatar v-if="item.avatar == ''" icon="ios-person" size="large" />
                    <Avatar v-else :src="item.avatar" size="large" />
                    </Col>
                    <Col flex="auto">
                    <Space direction="vertical" style="width: 100%;">
                        <div style="width: 100%;">
                            <span style="font-size: 14px;color: #000;margin-right: 20px;">{{ item.username }}</span>
                            <span style="font-size: 14px;color: #9999aa;">{{ item.operator }}</span>
                            <Icon type="md-trash" style="margin-left: 20px;cursor: pointer;float: right;" />
                        </div>
                        <div style="font-size: 14px;font-weight: bolder;">{{ item.content }}</div>
                        <div style="font-size: 14px;color: #9999aa;">{{ item.article }}</div>
                    </Space>
                    </Col>
                </Row>
            </Space>
        </Space>
        <Space direction="vertical" type="flex" align="center" style="margin-top: 10px;margin-bottom: 30px;">
            <Page :total="100" :page-size="10" show-elevator show-sizer show-total />
        </Space>
    </div>
    <Exception v-else img-color title="空空如也" desc="快去分享博客吧">
        <template #actions>
            <!-- 空标记占位，目的是去除组件原有的按钮 -->
            <div></div>
        </template>
    </Exception>
</template>
<script setup name='MsgComment'>
import { ref, reactive, onMounted } from 'vue'
const datalist = ref([
    {
        time: '2023-02-02 15:04', avatar: 'https://dev-file.iviewui.com/zhj85zgAfEjChCNIKT1LQENUIOyOYCaX/avatar', username: '孟成祯',
        operator: '回复了你的评论', article: 'JS 实现替换字符串中所有指定字符总结', content: '亲爱的用户，您好！您的账号于2023-01-12 11:29:07在【山东省泰安市 移通】登录，登录IP为：【111.17.54.164】，若非本人操作，请立即修改密码。'
    }, {
        time: '2023-02-02 15:04', avatar: '', username: '孟成祯',
        operator: '回复了你的评论', article: 'JS 实现替换字符串中所有指定字符总结', content: '亲爱的用户，您好！您的账号于2023-01-12 11:29:07在【山东省泰安市 移通】登录，登录IP为：【111.17.54.164】，若非本人操作，请立即修改密码。'
    },
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


</style>