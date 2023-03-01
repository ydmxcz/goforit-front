<template>
    <div v-if="datalist.length > 0" class="main-area">
        <Space class="item-space" direction="vertical" v-for="item in datalist">
            <div class="msg-time">{{ item.time }}</div>
            <Space direction="vertical" class="msg-content">
                <Row :wrap="false" style="width: 100%;min-height: 100px;padding: 20px ;">
                    <Col flex="50px">
                    <Avatar v-if="item.avatar == ''" icon="ios-person" size="large" />
                    <Avatar v-else :src="item.avatar" size="large" />
                    </Col>
                    <Col flex="auto">
                    <Space direction="vertical" style="width: 100%;">
                        <div style="width: 100%;">
                            <span style="font-size: 14px;color: #000;margin-right: 20px;">{{ item.username }}</span>
                        </div>
                        <div style="font-size: 14px;color: #9999aa;">{{ item.content }}</div>
                    </Space>
                    </Col>
                    <Col flex="150px">
                    <Space style="width: 100%;height:100%" class="elem-center">
                        <Button type="primary">回关</Button>
                        <Icon type="md-trash" style="margin-left: 20px;cursor: pointer;" />
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
<script setup name='MsgAttention'>
import { ref, reactive, onMounted } from 'vue'
const datalist = ref([
    {
        time: '2023-02-02 15:04', avatar: 'https://dev-file.iviewui.com/zhj85zgAfEjChCNIKT1LQENUIOyOYCaX/avatar', username: '孟成祯',
        operator: '回复了你的评论', content: '关注了你'
    }, {
        time: '2023-02-02 15:04', avatar: '', username: '孟成祯',
        operator: '回复了你的评论', content: '取消了对你的关注'
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
            min-height: 100px;
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