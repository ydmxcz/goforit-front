<template>
    <Form :model="data.userInfo" :label-width="80">
        <FormItem label="输入旧密码">
            <Input v-model="data.userInfo.oldPwd"></Input>
        </FormItem>
        <FormItem label="输入新密码">
            <Input v-model="data.userInfo.newPwd"></Input>
        </FormItem>
        <FormItem label="确认密码">
            <Input v-model="data.userInfo.comfirmPwd"></Input>
        </FormItem>
        
    </Form>
    <div style="width: 100%;">
        <Button type="primary" style="float: right;" @click="updateMySelfInfo">提交更改</Button>
    </div>
</template>
<script setup name='ProfileInfo'>
import { ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex';
import BigNumber from '_bignumber.js@9.1.1@bignumber.js';
import msg from '../../../common/msg';
import http from '../../../plugin/axios';
const store = useStore()
const data = reactive({
    userInfo: {
        comfirmPwd:'',
        newPwd:'',
        oldPwd:''
    }
})

// const getUserDetial = async () => {
//     const { data: res } = await http.post('/user/detial', { id: BigNumber(store.getters.userInfo.id) })
//     if (res.code != 200) {
//         msg.err(res.msg)
//         return
//     }
//     data.userInfo = res.data
//     console.log(data.userInfo);
// }
const updateMySelfInfo = async () => {
    if (data.userInfo.comfirmPwd != data.userInfo.newPwd) {
        msg.err('两次密码不一致')
        return
    }
    let d = {
        id:BigNumber(store.getters.userInfo.id),
        newPassword:data.userInfo.comfirmPwd,
        code:data.userInfo.oldPwd
    }
    console.log(d);
    const { data: res } = await http.post('/user/update/pwd/simple', d)
    if (res.code != 200) {
        msg.err(res.msg)
        return
    } else {
        msg.ok('修改成功')
        // getUserDetial()
    }
}



onMounted(() => {
    // getUserDetial()
})

</script>
<style scoped lang='less'></style>