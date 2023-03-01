<template>
    <Space align="start" style="width: 100%;align-items: center;display: flex;">
        <div class="elem-center" style="width: 70px;height: 30px;margin: 5px;">
            <strong>{{ title }}：</strong>
        </div>
        <div ref="tagSpaceDom">
            <Space wrap>
                <div ref="tagSelectDom" class="elem-center tag-item" v-for="(item, idx) in tagSelectList"
                    @click="handleTagSelectChange(idx, tagSelectDom)">
                    {{ item }}
                </div>
            </Space>
        </div>

        <Button v-if="tagSelectOriginalHeight > stdHeight" type="text" @click="handleTagSelectOpen(tagSpaceDom)">
            {{ tagSelectButtonText }}
        </Button>
    </Space>

</template>

<script setup name="TagSelectSignle">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';


const props = defineProps({
    title: {
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
        default: '收缩'
    },
    closeText: {
        type: String,
        default: '收缩'
    }
})

const emits = defineEmits(['onChange']);

const title = ref(props.title)
const tagSelectOriginalHeight = ref(0)
const tagSelectButtonText = ref('')
const lastSelect = ref('')

const stdHeight = props.stdLineHeight

const tagSelectDom = ref([])
const tagSpaceDom = ref()

const tagSelectList = ref(props.dataList)

const handleTagSelectChange = (idx, tagSelectDom) => {
    // console.log(idx, TagSpace.value.offsetHeight)
    let name = tagSelectList.value[idx]
    tagSelectDom.forEach((item, i) => {
        if (i == idx) {
            // 防止重复点击
            if (name != lastSelect) {
                lastSelect.value = name
                item.id = 'active-item'
                emits('onChange', name)
            }
        } else {
            item.id = ''
        }
    })
}

// 利用弱类型的特点，抽象出重复的基本逻辑
const handleTagSelectOpen = (spaceDom) => {
    if (spaceDom.style.height != '40px') {
        // 关闭
        spaceDom.style.height = stdHeight + 'px' //行高40px
        spaceDom.style.overflowY = 'hidden'
        tagSelectButtonText.value = props.openText
    } else {
        spaceDom.style.height = ''//actH + 'px' //行高40px
        spaceDom.style.overflowY = ''
        tagSelectButtonText.value = props.closeText
    }
}


const initTagSpace = (spaceDom) => {
    tagSelectOriginalHeight.value = spaceDom.value.offsetHeight
    // 如果当前的行高大于标准行高则设置为收起
    if (tagSelectOriginalHeight.value > stdHeight) {
        spaceDom.value.style.height = stdHeight + 'px' //行高40px
        spaceDom.value.style.overflowY = 'hidden'
    }
}


// TagSelect----end
const eventListener = () => {
    // 如果当前的行高大于标准行高则设置为收起
    if (tagSelectButtonText.value == props.closeText) {
        tagSelectOriginalHeight.value = foreardTagSpace.value.offsetHeight
    }

}

onMounted(() => {
    window.addEventListener('resize', eventListener)

    nextTick(() => {
        tagSelectDom.value[0].id = 'active-item'
        tagSelectOriginalHeight.value = tagSpaceDom.value.offsetHeight
        initTagSpace(tagSpaceDom)
    })
})

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
