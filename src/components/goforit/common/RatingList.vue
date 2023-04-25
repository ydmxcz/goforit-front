<template>
    <Space type="flex" direction="vertical">
        <Row :wrap="false" v-for="row in rratingData" style="width: 100%;height: 50px;">
            <div class="vertical-center" style="width: 50px;height: 100%">
                <img v-if="row.idx == 1" style="width:30px;height: 30px;"
                    src="../../../assets/contest/1-persion.png" />
                <img v-else-if="row.idx == 2" style="width:30px;height: 30px;"
                    src="../../../assets/contest/2-persion.png" />
                <img v-else-if="row.idx == 3" style="width:30px;height: 30px;"
                    src="../../../assets/contest/3-persion.png" />
                <strong v-else style="text-align: center;width: 30px;">{{ row.idx }}</strong>
            </div>
            <div class="vertical-center" style="text-align: left; width: 100%;height: 100%;">
                <strong v-if="row.idx <= 3" style="color: red;margin-left: 10px;">{{ row.username }}</strong>
                <strong v-else style="margin-left: 10px;">{{ row.username }}</strong>
            </div>
            <div class="vertical-center" style="text-align: center; width: 50px;height: 100%;">
                <strong v-if="row.idx <= 3" style="color: red;">{{ row.rating }}</strong>
                <strong v-else>{{ row.rating }}</strong>
            </div>
        </Row>
    </Space>

</template>

<script setup>
import { reactive } from 'vue'
const rratingData = reactive([
    { idx: 1, username: 'edmund', rating: 1999 },
    { idx: 2, username: 'asdasd', rating: 1899 },
    { idx: 3, username: 'frgrr', rating: 1799 },
    { idx: 4, username: 'vfdvdc', rating: 1699 },
    { idx: 5, username: 'eftrg', rating: 1599 },
    { idx: 6, username: 'qwdsg', rating: 1499 },
    { idx: 7, username: 'xvxmkmg', rating: 1399 },
    { idx: 8, username: 'efdk', rating: 1299 },
    { idx: 9, username: 'okwef', rating: 1199 },
])

</script>

<style scoped lang="less">
.vertical-center {
    display: flex;
    align-items: center;
}
</style>