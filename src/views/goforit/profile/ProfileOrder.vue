<template>
    <div>
        <Table :columns="columns" :data="data" style="box-shadow: 0 5px 15px 0 rgb(0 0 0 / 8%);">
            <template #orderId="{ row }">
                <Ellipsis :text="row.orderId" :lines="1" tooltip />
                <!-- <span>{{ row.orderId }}</span> -->
            </template>
            <template #name="{ row }">
                <span>{{ row.name }}</span>
            </template>
            <template #createTime="{ row }">
                <Ellipsis :text="row.createTime" :lines="1" tooltip />
            </template>
            <template #payTime="{ row }">
                <Ellipsis :text="row.createTime" :lines="1" tooltip />
            </template>
            <template #status="{ row }">
                <span v-if="row.status == 1" style="color: #5ab726;">已支付</span>
                <span v-else style="color: red;">已取消</span>
            </template>
            <template #operator="{ row }">
                <Button type="primary" @click="checkOrderDetail(row)">查看详情</Button>
            </template>

        </Table>
    </div>
    <Modal v-model="modal1" width="600">
        <template #header>
            <p style="color:#2b8cf0;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>订单详情</span>
            </p>
        </template>
        <Row :wrap="false" style="height: 300px;width: 100%;">
            <Col flex="200px" class="elem-center">
            <img src="../../../assets/Question-Medium.jpeg" style="width: 150px;height: auto;">
            </Col>
            <Col flex="auto" class="elem-center">
            <table style="width: 100%;height: 250px;">
                <tr>
                    <td class="table-left">订单号：</td>
                <Ellipsis text="1e718e00-bf4f-4c22-a822-89d4b63cc5c0" :lines="1" tooltip />

                    <!-- <td>1e718e00-bf4f-4c22-a822-89d4b63cc5c0</td> -->
                </tr>
                <tr>
                    <td class="table-left">订单状态：</td>
                    <td><span class="css-190qirn-OrderState e1ponmmj18">已支付</span></td>
                </tr>
                <tr>
                    <td class="table-left">发起时间：</td>
                    <td>2021/10/26 22:48</td>
                </tr>
                <tr>
                    <td class="table-left">支付时间：</td>
                    <td>2021/10/26 22:48</td>
                </tr>
                <tr>
                    <td class="table-left">支付方式：</td>
                    <td>- -</td>
                </tr>
                <tr>
                    <td class="table-left">商品名称：</td>
                    <td>中级算法</td>
                </tr>
                <tr>
                    <td class="table-left">商品金额：</td>
                    <td>0.00 元</td>
                </tr>
                <tr>
                    <td class="table-left">支付金额：</td>
                    <td>0.00 元</td>
                </tr>
            </table>

            </Col>
        </Row>
        <template #footer>
            <div></div>
            <!-- <Button type="error" size="large" long :loading="modal_loading" @click="del">Delete</Button> -->
        </template>
    </Modal>
</template>
<script setup name='ProfileOrder'>
import { ref, reactive, onMounted } from 'vue'


const modal1 = ref(false);

const checkOrderDetail = (row) => {
    console.log(row);
    modal1.value = !modal1.value
}

const columns = ref([
    {
        title: '订单号',
        key: 'orderId',
        slot: 'orderId',
    },
    {
        title: '商品名称',
        key: 'name',
        slot: 'name',
    },
    {
        title: '订单发起时间',
        key: 'createTime',
        slot: 'createTime',
    },
    {
        title: '订单支付时间',
        key: 'payTime',
        slot: 'payTime',
    },
    {
        title: '订单状态',
        key: 'status',
        slot: 'status',
    },
    {
        title: '操作',
        key: 'operator',
        slot: 'operator',
    }
])
const data = ref([
    { orderId: '1e718e00-bf4f-4c22-a822-89d4b63cc5c0', name: '中级算法', createTime: '2021-10-26 22:48', payTime: '2021/10/26 22:48', status: 1, operator: true },
    { orderId: '1e718e00-bf4f-4c22-a822-89d4b63cc5c0', name: '中级算法', createTime: '2021-10-26 22:48', payTime: '2021/10/26 22:48', status: 0, operator: true },
    { orderId: '1e718e00-bf4f-4c22-a822-89d4b63cc5c0', name: '中级算法', createTime: '2021-10-26 22:48', payTime: '2021/10/26 22:48', status: 1, operator: true },
    { orderId: '1e718e00-bf4f-4c22-a822-89d4b63cc5c0', name: '中级算法', createTime: '2021-10-26 22:48', payTime: '2021/10/26 22:48', status: 1, operator: true },
    { orderId: '1e718e00-bf4f-4c22-a822-89d4b63cc5c0', name: '中级算法', createTime: '2021-10-26 22:48', payTime: '2021/10/26 22:48', status: 1, operator: true },
])


</script>
<style scoped lang='less'>
.table-left{
    width: 80px;
    padding-right: 10px;
    text-align: right;
    line-height: 15px;
}

.table-right{
    text-align: right;
}


.elem-center {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>