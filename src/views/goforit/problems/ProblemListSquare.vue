<template>
    <Space direction="vertical" style="width: 100%;">
        <Space :wrap="false" style="width: 100%;">
            <span style="font-size: 16px;">搜索题单：</span>
            <Input search enter-button placeholder="输入题单ID / 题单名称" style="width: 300px;" />
            <Button type="primary">
                <Icon type="md-add" style="margin-right: 5px;" />创建题单
            </Button>
            <Poptip trigger="hover" placement="right" width="500" title="活跃度计算方式">
                <span class="active-detail">
                    <Icon type="ios-help-circle" />活跃度计算方式
                </span>
                <template #content>
                    <div>
                        1.举办一次比赛、发起一次训练任务、发起一个讨论：活跃度+10<br>
                        2.对于一场比赛：未开始的比赛的活跃度报名人数X1；当比赛开始后活跃度为实际参赛人数X1。<br>
                        3.对于一次训练任务：用户参与训练，每完成一道题活跃度+1。<br>
                        3.对于一次讨论：用户每一条评论以及回复，活跃度+1。<br>
                    </div>
                    <!-- <Space direction="vertical" style="display: flex;">
                                    </Space> -->
                </template>
            </Poptip>
        </Space>
        <ProblemListItem></ProblemListItem>
        <ProblemListItem></ProblemListItem>
        <ProblemListItem></ProblemListItem>
        <Space direction="vertical" type="flex" align="center">
            <Page :total="100" :page-size="10" show-elevator show-sizer show-total />
        </Space>
    </Space>
</template>

<script setup name="ProblemListSquare">
import { reactive } from 'vue';
import { useRouter } from 'vue-router'
import ProblemListItem from '../../../components/goforit/problem/ProblemListItem.vue';

const router = useRouter()


const problemList = reactive([1, 2, 3, 4])

const pushProblemListById = (problemId) => {
    router.push('/problemlist/' + problemId)
}
</script>

<style>

</style>