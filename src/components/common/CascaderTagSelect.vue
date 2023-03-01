<template>
    <div style="width: 100%;">
        <Space align="start" style="align-items: center;display: flex;">
            <div class="elem-center" style="width: 70px;height: 30px;margin: 5px;">
                <strong>{{ titleLv1 }}：</strong>
            </div>
            <div ref="lv1TagSpaceDom">
                <Space wrap>
                    <div ref="lv1TagSelectDom" class="elem-center tag-item" v-for="(item, idx) in lv1TagSelectList"
                        @click="handleLv1TagSelectChange(idx)">
                        {{ item.name }}</div>
                </Space>
            </div>
            <Button v-show="tagSelectOriginalHeight.titleLv1 > stdHeight" type="text" @click="handleTagSelectOpenLv1">
                {{ tagSelectButtonText.titleLv1 }}</Button>
        </Space>
        <Space align="start" style="align-items: center;display: flex">
            <div class="elem-center" style="width: 70px;height: 30px;margin: 5px;">
                <strong>{{ titleLv2 }}：</strong>
            </div>
            <div ref="lv2TagSpaceDom">
                <Space wrap>
                    <div ref="lv2TagSelectDom" class="elem-center tag-item" v-for="(item, idx) in lv2TagSelectList"
                        @click="handleLv2TagSelectChange(idx, lv2TagSelectList)">
                        {{ item }}
                    </div>

                </Space>
            </div>
            <Button v-if="tagSelectOriginalHeight.titleLv2 > stdHeight" type="text" @click="handleTagSelectOpenLv2">
                {{ tagSelectButtonText.titleLv2 }}
            </Button>
        </Space>
    </div>

</template>

<script setup name="CascaderTagSelect">
import { ref, onMounted, onUnmounted, nextTick, reactive } from 'vue';


const props = defineProps({
    titleLv1: {
        type: String
    },
    titleLv2: {
        type: String
    },
    dataList: {
        type: Array
    },
    stdLineHeight: {
        type: Number,
        default: 40
    },
    openText: {
        type: String,
        default: '展开'
    },
    closeText: {
        type: String,
        default: '收缩'
    }
})

const emits = defineEmits(['onLv1Change', 'onLv2Change']);

const titleLv1 = ref(props.titleLv1)
const titleLv2 = ref(props.titleLv2)


const tagNameSelect = reactive({
    titleLv1: '',
    titleLv2: '',
})



// 这里面的值只有在tagList改变的时候才能改
const tagSelectOriginalHeight = reactive({
    titleLv1: 0,
    titleLv2: 0,
})

const tagSelectButtonText = reactive({
    titleLv1: props.openText,
    titleLv2: props.openText,
})


const stdHeight = props.stdLineHeight

const lv1TagSelectDom = ref([])
const lv1TagSpaceDom = ref()

const lv2TagSelectDom = ref([])
const lv2TagSpaceDom = ref()

const lv1TagSelectList = ref(props.dataList)
const lv2TagSelectList = ref()


const handleLv1TagSelectChange = (idx) => {
    // 按照上面的逻辑处理DOM
    let name = lv1TagSelectList.value[idx].name
    lv1TagSelectDom.value.forEach((item, i) => {
        if (i == idx) {
            if (name != tagNameSelect.titleLv1) {
                // 清除样式
                lv2TagSpaceDom.value.style.height = ''
                lv2TagSpaceDom.value.style.overflowY = ''
                tagNameSelect.titleLv1 = name
                item.id = 'active-item'
                // 更新二级菜单的list
                lv2TagSelectList.value = lv1TagSelectList.value[idx].tags
                // 清除其他选中,设置第一个为默认选中
                emits('onLv1Change', name)
                handleLv2TagSelectChange(0, lv1TagSelectList.value)
                if(tagSelectButtonText.titleLv2 == props.closeText) {
                    tagSelectButtonText.titleLv2 = props.openText
                }
                // 更新list更新后的DOM高度
                nextTick(() => {
                    tagSelectOriginalHeight.titleLv2 = lv2TagSpaceDom.value.offsetHeight
                    if (tagSelectOriginalHeight.titleLv2 > stdHeight) {
                        lv2TagSpaceDom.value.style.height = stdHeight + 'px' //行高40px
                        lv2TagSpaceDom.value.style.overflowY = 'hidden'
                    }
                })

            }
        } else {
            item.id = ''
        }
    })
}


const handleLv2TagSelectChange = (idx, list) => {
    let name = list[idx]
    console.log("mk", name)
    lv2TagSelectDom.value.forEach((item, i) => {
        if (i == idx) {
            // 防止重复点击
            if (name != tagNameSelect.titleLv2) {
                tagNameSelect.titleLv2 = name
                item.id = 'active-item'
                emits('onLv2Change', name)
            }
        } else {
            item.id = ''
        }
    })
}




// 利用弱类型的特点，抽象出重复的基本逻辑
const handleTagSelectOpenLv1 = () => {
    if (lv1TagSpaceDom.value.style.height != '40px') {
        // 关闭
        lv1TagSpaceDom.value.style.height = stdHeight + 'px' //行高40px
        lv1TagSpaceDom.value.style.overflowY = 'hidden'
        tagSelectButtonText.titleLv1 = props.openText
    } else {
        lv1TagSpaceDom.value.style.height = ''//actH + 'px' //行高40px
        lv1TagSpaceDom.value.style.overflowY = ''
        tagSelectButtonText.titleLv1 = props.closeText
    }
}

// 利用弱类型的特点，抽象出重复的基本逻辑
const handleTagSelectOpenLv2 = () => {
    if (lv2TagSpaceDom.value.style.height != '40px') {
        // 关闭
        lv2TagSpaceDom.value.style.height = stdHeight + 'px' //行高40px
        lv2TagSpaceDom.value.style.overflowY = 'hidden'
        tagSelectButtonText.titleLv2 = props.openText
    } else {
        lv2TagSpaceDom.value.style.height = ''//actH + 'px' //行高40px
        lv2TagSpaceDom.value.style.overflowY = ''
        tagSelectButtonText.titleLv2 = props.closeText
    }
}

const initTagSpace = () => {
    tagSelectOriginalHeight.titleLv1 = lv1TagSpaceDom.value.offsetHeight
    // 如果当前的行高大于标准行高则设置为收起
    if (tagSelectOriginalHeight.titleLv1 > stdHeight) {
        lv1TagSpaceDom.value.style.height = stdHeight + 'px' //行高40px
        lv1TagSpaceDom.value.style.overflowY = 'hidden'
    }
    tagSelectOriginalHeight.titleLv2 = lv2TagSpaceDom.value.offsetHeight
    // 如果当前的行高大于标准行高则设置为收起
    if (tagSelectOriginalHeight.titleLv2 > stdHeight) {
        lv2TagSpaceDom.value.style.height = stdHeight + 'px' //行高40px
        lv2TagSpaceDom.value.style.overflowY = 'hidden'
    }
}
const eventListener = () => {
    // 如果当前的行高大于标准行高则设置为收起
    if (tagSelectButtonText.titleLv1 == props.closeText) {
        tagSelectOriginalHeight.titleLv1 = lv1TagSpaceDom.value.offsetHeight
    }
    if (tagSelectButtonText.titleLv2 == props.closeText) {
        tagSelectOriginalHeight.titleLv2 = lv2TagSpaceDom.value.offsetHeight
    }
}



// TagSelect----end


onMounted(() => {
    // console.log(tagSelectLevelTwoList.value)
    window.addEventListener('resize', eventListener)
    lv2TagSelectList.value = lv1TagSelectList.value[0].tags
    // console.log(lv2TagSelectList.value)
    nextTick(() => {
        lv1TagSelectDom.value[0].id = 'active-item'
        lv2TagSelectDom.value[0].id = 'active-item'
        tagSelectOriginalHeight.titleLv1 = lv1TagSpaceDom.value.offsetHeight
        tagSelectOriginalHeight.titleLv2 = lv2TagSpaceDom.value.offsetHeight
        initTagSpace()
    })
})

// TagSelect----end


onUnmounted(() => {
    window.removeEventListener('resize', eventListener)
})

</script>

<style scoped lang="less">
.tag-item {
    padding-left: 10px;
    padding-right: 10px;
    margin: 5px;
    height: 30px;
    font-size: 12px;
}

.tag-item:hover {
    color: #2e7eee;
}


.elem-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

#active-item {
    color: #2e7eee;
    font-weight: 500;
    background: #eaf2fd;
    border-radius: 15px;
}
</style>