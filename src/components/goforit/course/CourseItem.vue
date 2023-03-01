<template>
    <Row :wrap="false" style="width: 100%; ">
        <Col flex="120px" style="padding: 10px;background-color: #fff;">
        <img :src="itemInfo.pic" style="width: 100px;height: auto;">
        </Col>
        <Col flex="auto">
        <Space direction="vertical" style="width: 100%;padding-left: 10px; ">
            <Row style="width: 100%;display: block;height: 30px;" :wrap="false">
                <Space style="float: left;display: flex;align-items: center;">
                    <Tag v-if="itemInfo.tag == 1" color="error" style="font-size: 12px;">新品</Tag>
                    <span style="font-size: 20px;cursor: pointer;" @click="router.push('/course/' + itemInfo.id)">{{
                        itemInfo.title
                    }}</span>
                </Space>
                <!-- <div style="height: 30px;float: right;display: flex;align-items: center;">
                    <Icon type="ios-more" />
                </div> -->
            </Row>
            <Ellipsis :text="itemInfo.instruction" :lines="1" tooltip />
            <Space style="width: 100%;display: flex;align-items: center;">
                <div style="height: 20px;">
                    <img :src="itemInfo.authorAvatar" style="width: 20px;height: 20px;border-radius: 25px;">
                </div>
                <span style="font-size: 14px;">{{ itemInfo.autherName }}</span>
                <div>
                    <span style="font-size: 14px;">{{ itemInfo.position }}</span>
                    <span style="font-size: 14px;">@{{ itemInfo.company }}</span>
                </div>
            </Space>
            <Row style="width: 100%;display: block;margin-top: 16px;" :wrap="false">
                <Space style="float: left;display: flex;align-items: center;" split>
                    <Numeral style="font-size: 20px;color: red;font-weight: bolder;" :value="itemInfo.priece"
                        format="0,0.00">
                        <template #prefix>
                            <span>¥</span>
                        </template>
                    </Numeral>
                    <!-- <span style="">9.9</span> -->
                    <span v-if="itemInfo.status == 1" style="font-size: 12px;">已完结 {{ itemInfo.problems }}题</span>
                    <span v-else style="font-size: 12px;">未完结 {{ itemInfo.problems }}题</span>
                    <span style="font-size: 12px;">{{ itemInfo.buyers }} 人已购买</span>
                    <span style="font-size: 12px;">
                        <Icon type="ios-thumbs-up" />{{ itemInfo.up }}
                    </span>
                    <span style="font-size: 12px;">
                        <Icon type="ios-thumbs-down" />{{ itemInfo.down }}
                    </span>

                </Space>
                <Rate show-text allow-half disabled v-model="itemInfo.rate" style="float: right;">
                    <span style="color: #f5a623">{{ itemInfo.rate }}</span>
                </Rate>
            </Row>

        </Space>
        </Col>
    </Row>
</template>
<script setup name='CourseItem'>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()

const props = defineProps({
    itemInfo: {
        type: Object,
        default: {
            id: '223345566766',
            pic: '../../../assets/course1.png',
            title: 'Flutter 实战：正则匹配应用',
            instruction: '从思想分析到应用实践， Flutter 全平台玩转正则表达式 ~',
            tag: 1,
            authorAvatar: 'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar',
            autherName: '孟成祯',
            priece: 9.9,
            buyers: 20,
            status: 1,
            problems: 20,
            rate: 4.5,
            like: 66,
            up: 23,
            down: 3,
            position: '资深架构师',
            company: '字节跳动'
        },
    },
})

const itemInfo = reactive(props.itemInfo);
</script>
<style scoped lang='less'>

</style>