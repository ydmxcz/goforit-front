<template>
    <div style="width: 100%;">
        <Table :columns="columns" :data="data"></Table>
    </div>
</template>
<script setup name='CourseDetialRanking'>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const columns = ref([
    {
        title: 'Name',
        key: 'name'
    },
    {
        title: 'Age',
        key: 'age'
    },
    {
        title: 'Address',
        key: 'address'
    }
])

const data = ref([
    {
        name: 'John Brown',
        age: 18,
        address: 'New York No. 1 Lake Park',
        date: '2016-10-03'
    },
    {
        name: 'Jim Green',
        age: 24,
        address: 'London No. 1 Lake Park',
        date: '2016-10-01'
    },
    {
        name: 'Joe Black',
        age: 30,
        address: 'Sydney No. 1 Lake Park',
        date: '2016-10-02'
    },
    {
        name: 'Jon Snow',
        age: 26,
        address: 'Ottawa No. 2 Lake Park',
        date: '2016-10-04'
    }
])


onMounted(() => {
    console.log(route.params.id);
})
</script>
<style scoped lang='less'>

</style>