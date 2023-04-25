<template>
    <Card style="border-radius: 10px;">
        <Space :wrap="true" :size="20" style="width: 100%;" direction="vertical">
            <Row v-for="item in topicList" style="width: 100%;height: 70px;cursor: pointer;" class="topic-item" @click="toTopic(item.id)">
                <Col flex="70px" style="padding: 10px;height: 70px;">
                <img :src="item.img" style="width: 100%;height: 100%;">
                </Col>
                <Col flex="auto" class="vertical-center" style="padding: 0 20px;">
                <div style="font-size: 16px;font-weight: bolder;margin: 0px 10px;">{{ item.topicName }}</div>
                </Col>
                <Col flex="70px" class="vertical-center">
                <Icon type="ios-bonfire" style="font-size: 18px;" /> {{ item.hot || 0 }}
                </Col>
            </Row>
        </Space>
    </Card>
</template>

<script setup name="BlogAllTopic">
import { ref, reactive, onMounted } from 'vue'
import http from '../../../plugin/axios';
import msg from '../../../common/msg';
import { useRouter } from 'vue-router';
const router = useRouter()

const topicList = ref([]);

const getAllTopicList = async () => {
    const { data: res } = await http.get('/blog/select/topic')
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    topicList.value = res.data.topicList
}

const toTopic = (id) => {
    router.push('/blog/topic/'+id)
}


onMounted(() => {
    getAllTopicList()
})


</script>

<style scoped lang="less">
.vertical-center {
    display: flex;
    align-items: center;
}

.topic-item:hover {
    background-color: #eee;
}
</style>