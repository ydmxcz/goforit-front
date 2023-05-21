<template>
    <Space type="flex" direction="vertical">
        <Row :wrap="false" v-for="(row, idx) in ratingData" style="width: 100%;height: 50px;">
            <div class="vertical-center" style="width: 50px;height: 100%">
                <img v-if="idx == 0" style="width:30px;height: 30px;" src="../../../assets/contest/1-persion.png" />
                <img v-else-if="idx == 1" style="width:30px;height: 30px;" src="../../../assets/contest/2-persion.png" />
                <img v-else-if="idx == 2" style="width:30px;height: 30px;" src="../../../assets/contest/3-persion.png" />
                <strong v-else style="text-align: center;width: 30px;">{{ idx }}</strong>
            </div>
            <div class="vertical-center" style="text-align: left; width: 100%;height: 100%;">
                <strong v-if="idx <= 3" style="color: red;margin-left: 10px;">
                    <Ellipsis :text="row.userName" :length="10" />
                </strong>
                <strong v-else style="margin-left: 10px;">
                    <Ellipsis :text="row.userName" :length="10" />
                </strong>
            </div>
            <div class="vertical-center" style="text-align: center; width: 50px;height: 100%;">
                <strong v-if="idx <= 3" style="color: red;">{{ row.rating }}</strong>
                <strong v-else>{{ row.rating }}</strong>
            </div>
        </Row>
    </Space>
</template>

<script setup>
import http from '../../../plugin/axios';
import msg from '../../../common/msg';

import { ref, reactive, onMounted } from 'vue'
const ratingData = ref([])

onMounted(() => {
    getRatingTop()
})
const getRatingTop = async () => {
    const { data: res } = await http.post('/contest/rating/top', {})
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    console.log(res);
    ratingData.value = res.data.item
}


</script>

<style scoped lang="less">
.vertical-center {
    display: flex;
    align-items: center;
}
</style>