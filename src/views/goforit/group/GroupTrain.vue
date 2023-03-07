<template>
    <div>
        <Row :wrap="false">
            <Col flex="100px" style="padding: 0px 20px;">
            <div v-for="i in data.dataList.length" class="data-list-item" style="justify-content: center;">{{ String.fromCodePoint(64 + i) }}</div>
            </Col>
            <Col flex="auto">
            <div @dragover="dragover($event)" style="width: 100%;">
                <transition-group>
                    <div v-for="(item) in data.dataList" :key='item.id' :draggable="true" class="sort-move data-list-item"
                        @dragstart="dragstart(item)" @dragenter="dragenter(item, $event)" @dragend="dragend(item, $event)"
                        @dragover="dragover($event)">
                        {{ item.label }}
                        <Button type="primary" @click="printItem(item)">详情</Button>

                    </div>
                </transition-group>
            </div>
            </Col>
        </Row>
        <Button type="primary" @click="printList">打印列表信息</Button>
        <Button type="primary" @click="addItem">添加一条</Button>
    </div>
</template>
<script setup name='GroupTrain'>
import { ref, reactive, onMounted, watch } from 'vue'

const data = reactive({
    oldData: null, // 开始排序时按住的旧数据
    newData: null, // 拖拽过程的数据
    // 列表数据
    dataList: []
})


const dragstart = (value) => {
    data.oldData = value
}

// 记录移动过程中信息
const dragenter = (value, e) => {
    data.newData = value
    e.preventDefault()
}

// 拖拽最终操作
const dragend = (value, e) => {
    if (data.oldData !== data.newData) {
        let oldIndex = data.dataList.indexOf(data.oldData)
        let newIndex = data.dataList.indexOf(data.newData)
        let newItems = [...data.dataList]
        // 删除老的节点
        newItems.splice(oldIndex, 1)
        // 在列表中目标位置增加新的节点
        newItems.splice(newIndex, 0, data.oldData)
        data.dataList = [...newItems]
    }
}

// 拖动事件（主要是为了拖动时鼠标光标不变为禁止）
const dragover = (e) => {
    e.preventDefault()
}

onMounted(() => {
    for (let i = 0; i < 5; i++) {
        data.dataList.push({ id: i + 1, label: '测试' + (i + 1) + '号' })
    }
})

const printList = () => {
    console.log(data.dataList);
}

const printItem = (item) => {
    console.log(item);
}

const addItem = () => {
    let i = data.dataList.length
    data.dataList.push({ id: i + 1, label: '测试' + (i + 1) + '号' })

}




</script>
<style scoped lang='less'>
.sort-move {
    transition: transform 0.3s;
}

.data-list-item {
    width: 100%;
    height: 50px;
    background-color: #fff;
    margin-bottom: 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
}
</style>