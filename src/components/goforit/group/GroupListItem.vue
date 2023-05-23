<template>
    <div class="group-item">
        <Row :wrap="false" class="item-row">
            <Col flex="140px">
            <img class="row-pic" src="../../../assets/goforit-group.png" />
            </Col>
            <Col flex="auto">
            <Row class="group-info">
                <Col flex="auto">
                <h3 class="group-name" @click="router.push('/group/' + groupInfo.id)">{{ groupInfo.name }}</h3>
                </Col>
                <Col flex="70px">
                <!-- <Button v-if="groupInfo.status == 1" style="margin-right: 20px;" type="primary" ghost shape="circle"
                    @click="addGroup" icon="md-add">加入</Button>
                <Button v-else-if="groupInfo.status == 0" style="margin-right: 20px;" type="error" ghost shape="circle"
                    @click="addGroup" icon="md-add">申请加入</Button>
                <Button v-else style="margin-right: 20px;" disabled type="success" ghost shape="circle"
                    icon="md-add">加入</Button> -->
                </Col>
            </Row>
            <div class="group-detail">
                <Ellipsis :text="groupInfo.detail" :lines="2" tooltip />
            </div>
            <div class="group-data">
                <Space split class="group-left">
                    <span>
                        <Icon style="margin-right: 5px;" type="md-information-circle" size="20" />
                        <span>ID：{{ groupInfo.id }}</span>
                    </span>
                    <span>
                        <Icon style="margin-right: 5px;" type="ios-contacts" size="20" />
                        <span>人数：{{ groupInfo.number }}</span>
                    </span>
                    <span>
                        <Icon style="margin-right: 5px;" type="md-bonfire" size="20" />
                        <span>活跃度：{{ groupInfo.activation }}</span>
                    </span>
                </Space>
                <span class="group-right">
                    <Icon style="margin-right: 5px;" type="ios-clock-outline" size="20" />
                    <span>{{ groupInfo.createTime }}</span>
                </span>
            </div>
            </Col>
        </Row>
    </div>
</template>

<script setup name="GroupListItem">
import { ref, onMounted, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({

    status: {
        type: Number,
        default: 2,
    },
    name: {
        type: String,
        default: 'SFGO团队'
    }, detail: {
        type: String,
        default: '.......',
    }, id: {
        type: String,
        default: '0000000000001',
    }, number: {
        type: String,
        default: '0',
    }, activation: {
        type: String,
        default: '0',
    }, createTime: {
        type: String,
        default: '2006-01-02 15:04'
    }, pic: {
        type: String,
        default: '../../../assets/goforit-group.png'
    }
})

const emits = defineEmits(['add-group']);
const groupInfo = reactive(props)

// 1 子组件中绑定一个事件 toEmits
const addGroup = () => {
    //2 暴露给父组件的childFn方法并携带数据
    emits('add-group', groupInfo.id)
}
const getColor = (status) => {
    if (status == 2) {
        return '#dbdbdb'
    } else if (status == 0) {
        return '#fde2e2'
    } else {
        return '#dbedff'
    }
}

const bgColor = ref(getColor(groupInfo.status))

watch(() => groupInfo.status, (newValue, oldValue) => {
    bgColor.value = getColor(newValue)
})




const grouppic = ref(props.pic)

// onMounted(() => {
//     console.log(grouppic.value)
// })

</script>

<style scoped lang="less">
.bg-color {
    background-color: v-bind(bgColor);
}

.group-item {
    width: 100%;
    margin-bottom: 20px;
    border-radius: 15px;
    border: 2px solid v-bind(bgColor);

    .item-row {
        width: 100%;
        height: 140px;

        .row-pic {
            height: 100%;
            width: 100%;
            border-radius: 15px 0px 0px 15px;
        }

        .group-info {
            display: flex;
            align-items: center;
            height: 40px;

            background-color: v-bind(bgColor);
            border-radius: 0px 15px 0px 0px;

            .group-name {
                padding-left: 10px;
                width: 500px;
                height: 40px;
                display: flex;
                align-items: center;
                font-size: 20px;
            }
        }

        .group-detail {
            height: 60px;
            width: 100%;
            padding: 5px;
            border-bottom: 2px solid v-bind(bgColor);
        }

        .group-data {
            height: 40px;
            width: 100%;
            align-items: center;
            padding-left: 10px;

            .group-left {
                height: 100%;
                align-items: center;
            }

            .group-right {
                height: 100%;
                margin-right: 10px;
                float: right;
                display: flex;
                align-items: center;
            }
        }
    }
}
</style>