<template>
    <Row :wrap="false" class="group-page">
        <Col flex="auto">
        </Col>
        <Col flex="1000px">
        <Space direction="vertical" class="main-area">
            <Card style="height: 100px;border-radius: 10px;">
                <Space direction="vertical">
                    <Space style="padding-left: 10px;">
                        <span style="font-size: 16px;">搜索小组：</span>
                        <Input search enter-button placeholder="输入小组ID / 小组名称" style="width: 300px;" />
                        <Button type="primary">
                            <Icon type="md-add" style="margin-right: 5px;" />创建小组
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
                    <Space style="padding-left: 10px;">
                        <span style="font-size: 16px;">小组类型：</span>
                        <Poptip trigger="hover" placement="bottom" content="全部小组">
                            <Tag :checkable="false" color="blue" >全部</Tag>
                        </Poptip>
                        <Poptip trigger="hover" placement="bottom" content="公开小组可以直接加入">
                            <Tag :checkable="false" color="green">公开</Tag>
                        </Poptip>
                        <Poptip trigger="hover" placement="bottom" content="加入私有小组需要向管理员申请">
                            <Tag :checkable="false" color="red">私有</Tag>
                        </Poptip>
                        <Poptip trigger="hover" placement="bottom" content="我参加的小组">
                            <Tag :checkable="false" color="orange">我参加的</Tag>
                        </Poptip>
                    </Space>
                </Space>
            </Card>
            <Card style="border-radius: 10px;">
                <GroupListItem v-for="item in groupInfo.glist" :status="item.status" :activation="item.activation"
                    :name="item.name" :detail="item.detail" :id="item.id" :number="item.number"
                    :createTime="item.createTime" :pic="item.pic" @add-group="addGroup"></GroupListItem>
                <!-- 使用Space可以非常简单的让分页栏居中 -->
                <Space direction="vertical" type="flex" align="center">
                    <Page :total="100" :page-size="10" show-elevator show-sizer show-total />
                </Space>
            </Card>
        </Space>
        </Col>
        <Col flex="auto">
        </Col>
    </Row>
</template>

<script setup name="Group">
import GroupListItem from '../../../components/goforit/group/GroupListItem.vue'
import { ref, reactive } from 'vue'
const detailText = ref('史蒂夫·乔布斯（英语：Steve Jobs），是一名美国企业家、营销家和发明家，苹果公司的联合创始人之一，曾任董事长及首席执行官职位，NeXT创办人及首席执行官，也是皮克斯动画的创办人并曾任首席执行官，2006年为华特迪士尼公司的董事会成员。2017年9月苹果发布会举行的地方，以他命名为 Steve Jobs Theater 。')

const groupInfo = reactive({
    glist: [
        { status: 1, name: '这是小组1', detail: detailText.value, id: '12345678912341', number: '9999', activation: '9999', createTime: '2006-01-02 15:04', pic: '../../../assets/goforit-group.png' },
        { status: 0, name: '这是小组2', detail: detailText.value, id: '12345678912342', number: '9999', activation: '9999', createTime: '2006-01-02 15:04', pic: '../../../assets/goforit-group.png' },
        { status: -1, name: '这是小组3', detail: 'xixixixi', id: '12345678912343', number: '9999', activation: '9999', createTime: '2006-01-02 15:04', pic: '../../../assets/goforit-group.png' },
        { status: 1, name: '这是小组4', detail: detailText.value, id: '12345678912344', number: '9999', activation: '9999', createTime: '2006-01-02 15:04', pic: '../../../assets/goforit-group.png' },
        { status: 1, name: '这是小组5', detail: detailText.value, id: '12345678912345', number: '9999', activation: '9999', createTime: '2006-01-02 15:04', pic: '../../../assets/goforit-group.png' },
        { status: 1, name: '这是小组6', detail: detailText.value, id: '12345678912346', number: '9999', activation: '9999', createTime: '2006-01-02 15:04', pic: '../../../assets/goforit-group.png' },
        { status: 1, name: '这是小组7', detail: detailText.value, id: '12345678912347', number: '9999', activation: '9999', createTime: '2006-01-02 15:04', pic: '../../../assets/goforit-group.png' },
        { status: 1, name: '这是小组8', detail: detailText.value, id: '12345678912348', number: '9999', activation: '9999', createTime: '2006-01-02 15:04', pic: '../../../assets/goforit-group.png' },
        { status: 1, name: '这是小组9', detail: detailText.value, id: '12345678912349', number: '9999', activation: '9999', createTime: '2006-01-02 15:04', pic: '../../../assets/goforit-group.png' },
        { status: 1, name: '这是小组10', detail: detailText.value, id: '12345678912340', number: '9999', activation: '9999', createTime: '2006-01-02 15:04', pic: '../../../assets/goforit-group.png' },
    ]
})

const addGroup = (groupId) => {
    console.log(groupId)
}
</script>

<style scoped lang="less">
.group-page {
    width: 100%;
    min-width: 1000px;

    .main-area {
        width: 100%;
        padding-top: 20px;
        padding-bottom: 20px;
    }
}

.active-detail:hover {
    color: #2d8cf0;
}
</style>