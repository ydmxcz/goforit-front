<template>
    <Form :model="data.userInfo" :label-width="80">
        <FormItem label="用户ID">
            <span>{{ data.userInfo.id }}</span>
        </FormItem>
        <FormItem label="用户名">
            <Input v-model="data.userInfo.userName"></Input>
        </FormItem>
        <FormItem label="邮箱">
            <span>{{ data.userInfo.email }}</span>
        </FormItem>
        <FormItem label="创建时间">
            <Time :time="(data.userInfo.createTime / 1000) / 1000" type="datetime" />
        </FormItem>
        <FormItem label="年龄">
            <Row>
                <Col span="8">
                <Input v-model="data.userInfo.age"></Input>
                </Col>
                <Col span="4" style="text-align: center">性别</Col>
                <Col span="11">
                <Select v-model="data.userInfo.gender">
                    <Option value="男">男</Option>
                    <Option value="女">女</Option>
                </Select>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="真实姓名">
            <Input v-model="data.userInfo.realName"></Input>
        </FormItem>
        <FormItem label="学号">
            <Input v-model="data.userInfo.stuNumber"></Input>
        </FormItem>
        <FormItem label="学校">
            <Input v-model="data.userInfo.school"></Input>
        </FormItem>
        <FormItem label="年级">
            <Row>
                <Col span="8">
                <Input v-model="data.userInfo.grade"></Input>
                </Col>
                <Col span="4" style="text-align: center">专业</Col>
                <Col span="11">
                <Input v-model="data.userInfo.major"></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="个人介绍">
            <Input v-model="data.userInfo.instruction" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }"
                placeholder="Enter something..."></Input>
        </FormItem>
    </Form>
</template>
<script setup name='ProfileInfo'>
import { ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex';
import BigNumber from '_bignumber.js@9.1.1@bignumber.js';
import msg from '../../../common/msg';
import http from '../../../plugin/axios';
const store = useStore()
const data = reactive({
    userInfo: {}
})

const getUserDetial = async () => {
    const { data: res } = await http.post('/user/detial', { id: BigNumber(store.getters.userInfo.id) })
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    data.userInfo = res.data
}


onMounted(() => {
    getUserDetial()
})

</script>
<style scoped lang='less'></style>