<template>
    <!-- box-shadow: 0 5px 15px 0 rgb(0 0 0 / 8%); -->
    <div v-for="item in datalist"
        style="width:100%;height: 70px;    box-shadow: 0 5px 15px 0 rgb(0 0 0 / 8%);border-radius: 10px;margin-bottom: 25px;">
        <Row style="width: 100%;height:100%;">
            <Col flex="70px" class="elem-center"
                style="background-color: #fafafa;box-shadow: 0 5px 15px 0 rgb(0 0 0 / 8%);border-radius: 10px 0px 0px 10px;">
            <Space direction="vertical" style="width: 100%;" class="elem-center">
                <!-- <img src="../../../assets/coin.png" style="width: 90px;height:90px;"> -->
                <Avatar :src="item.avator" style="width: 50px;height:50px;" />
            </Space>
            </Col>
            <Col flex="auto"
                style="display: flex;align-items: center;padding-left: 20px;background-color: #fff;border-radius: 0px 10px 10px 0px; ">
            <div style="width: 100%;">
                <Space style="float: left;">
                    <!-- <span style="font-size: 12px;color: #808080;">{{ item.classify }}</span> -->
                    <span style="font-size: 16px;color: #595959;cursor: pointer;">{{ item.username }}</span>
                    <Tag color="gold">管理员</Tag>
                </Space>
                <Poptip style="float: right;margin-right: 20px;" trigger="hover" content="点击进入个人主页">
                    <Button shape="circle" type="primary">
                        <Icon type="md-arrow-forward" />
                    </Button>
                </Poptip>
            </div>
            </Col>
        </Row>
    </div>
    <Space direction="vertical" type="flex" align="center" style="margin-top: 30px;margin-bottom: 20px;">
        <Page :total="100" :page-size="10" show-elevator show-sizer show-total />
    </Space>
</template>
<script setup name='GroupNumbers'>
import { ref, reactive, onMounted } from 'vue'

const datalist = ref([
    { avator: 'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar', id: '66666666', username: 'edmund', status: 1 },
    { avator: 'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar', id: '66666666', username: 'edmund', status: 1 },
    { avator: 'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar', id: '66666666', username: 'edmund', status: 2 },
    { avator: 'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar', id: '66666666', username: 'edmund', status: 3 },
    { avator: 'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar', id: '66666666', username: 'edmund', status: 4 },
    { avator: 'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar', id: '66666666', username: 'edmund', status: 5 },
    { avator: 'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar', id: '66666666', username: 'edmund', status: 6 },
]);

</script>
<style scoped lang='less'>
.elem-center {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>