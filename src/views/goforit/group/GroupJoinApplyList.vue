<template>
    <!-- box-shadow: 0 5px 15px 0 rgb(0 0 0 / 8%); -->
    <div v-for="item in datalist"
        style="width:100%;height: 70px;    box-shadow: 0 5px 15px 0 rgb(0 0 0 / 8%);border-radius: 10px;margin-bottom: 25px;">
        <Row style="width: 100%;height:100%;">
            <Col flex="70px" class="elem-center"
                style="background-color: #fafafa;box-shadow: 0 5px 15px 0 rgb(0 0 0 / 8%);border-radius: 10px 0px 0px 10px;">
            <Space direction="vertical" style="width: 100%;" class="elem-center">
                <!-- <img src="../../../assets/coin.png" style="width: 90px;height:90px;"> -->
                <Avatar :src="item.avatar" style="width: 50px;height:50px;" />
            </Space>
            </Col>
            <Col flex="auto"
                style="display: flex;align-items: center;padding-left: 20px;background-color: #fff;border-radius: 0px 10px 10px 0px; ">
            <div style="width: 100%;">
                <Space style="float: left;">
                    <!-- <span style="font-size: 12px;color: #808080;">{{ item.classify }}</span> -->
                    <span style="font-size: 16px;color: #595959;cursor: pointer;">{{ item.userName }}</span>
                    <Tag color="red" v-if="String(item.userId) == String(groupCreator)">小组长</Tag>
                    <Tag color="gold" v-else-if="item.isAdmin">管理员</Tag>
                    <Tag color="blue" v-else>成员</Tag>
                </Space>

                <Poptip style="float: right;margin-right: 20px;" trigger="hover" content="点击处理申请信息">
                    <Space :wrap="false">
                        <Button shape="circle" type="primary" @click="processApply(item.id, 1)">
                            同意
                        </Button>
                        <Button shape="circle" type="error" @click="processApply(item.id, 2)">
                            拒绝
                        </Button>
                    </Space>
                </Poptip>
            </div>
            </Col>
        </Row>
    </div>
    <Space v-if="datalist.length != 0" direction="vertical" type="flex" align="center"
        style="margin-top: 30px;margin-bottom: 20px;">
        <Page :total="100" :page-size="10" show-elevator show-sizer show-total />
    </Space>
    <div v-if="datalist.length == 0" style="width: 100%;height:500px">
        <Space style="display: flex;align-items: center;justify-content: center;" direction="vertical" align="center">
            <img style="height: 200px;width: 200px;" src="https://file.iviewui.com/iview-pro/icon-500-color.svg" alt="">
            <span style="font-size: 20px;">暂无申请信息</span>
        </Space>
    </div>
</template>
<script setup name="GroupJoinApplyList">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import http from '../../../plugin/axios';
import msg from '../../../common/msg';
import BigNumber from '_bignumber.js@9.1.1@bignumber.js';

const router = useRouter()
const groupCreator = ref(BigNumber("1203535601064739007"));
const getMemberList = async () => {
    const { data: res } = await http.post('/group/join/apply/list', {
        groupId: BigNumber(router.currentRoute.value.params.id)
    })
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    if (res.data) {
        datalist.value = res.data.items
    } 
}

const processApply = async (id, operator) => {
    const { data: res } = await http.post('/group/join/apply/process', {
        operator: Number(operator),
        id: Number(id)
    })
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    msg.ok('处理成功')
    getMemberList()
    // console.log(res);
    // groupCreator.value = res.data.creator
    // datalist.value = res.data.numbers
}

onMounted(() => {
    getMemberList()
})

const datalist = ref([]);
// { avator: 'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar', userId: '66666666', userName: 'edmund', isAdmin: 1 },
// { avator: 'https://dev-file.iviewui.com/zhj85zgAfEjChCNIKT1LQENUIOyOYCaX/avatar', userId: '66666666', userName: 'alan', isAdmin: 2 },
// { avator: 'https://dev-file.iviewui.com/TkH54UozsINlex15TAMI00GElsfsKSiC/avatar', userId: '66666666', userName: 'alice', isAdmin: 2 },
// { avator: 'https://dev-file.iviewui.com/xrzbBR99F6tYsDJPLNrvwhllowbuL7Gw/avatar', userId: '66666666', userName: '李华', isAdmin: 3 },
// { avator: 'https://dev-file.iviewui.com/bgrngoUb9A6UQ2kAwBFtnSNzhrh2qj1O/avatar', userId: '66666666', userName: '李雷', isAdmin: 3 },

</script>
<style scoped lang='less'>
.elem-center {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>