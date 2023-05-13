<template>
    <Card style="border-radius: 10px;margin-top: 20px;margin-bottom: 20px;">
        <Space type="flex" direction="vertical">
            
            <Space style="width: 100%;" :wrap="false">
                <Input style="width: 400px;" search enter-button placeholder="请输入比赛名称 / 比赛ID进行搜索" />
                <Button type="primary" icon="md-add">创建比赛</Button>
                <!-- <div v-if="cascaderList.length == 0" style="width: 100%;height: 120px;">
                    <Spin fix></Spin>
                </div>
                <Space v-else direction="vertical">
                    <CascaderTagSelect title-lv1="方向" title-lv2="分类" :data-list="cascaderList"
                        @on-lv2-change="handleLv2Change" @on-lv1-change="handleLv1Change">
                    </CascaderTagSelect>
                    <TagSelectSignle title="状态" :data-list="contestStatusTagList" @on-change="handleTagClick">
                    </TagSelectSignle>
                </Space> -->
            </Space>
            <ContestList v-for="item in contestList" :contest-id="item.id" :name="item.title" :is-original="true"
                :is-rated="item.ratingTop != -1" :sign-up-start="item.signUpStartTime" :sign-up-end="item.signUpEndTime"
                :contest-start="item.startTime" :contest-end="item.endTime"
                :length-time="(item.endTime - item.startTime) / 3600000" :sponsor="item.sponsorName"
                :number="item.signUpNum || 0" :max-rating="item.ratingTop" @on-sign-up="toContestDetialPage"
                @to-detial-page="toContestDetialPage" />

            <Space direction="vertical" type="flex" align="center">
                <Page :total="pageInfo.total" :page-size="pageInfo.pageSize" show-elevator show-sizer show-total
                    :page-size-opts="[10, 15, 20]" :model-value="pageInfo.currPage" @on-change="changePage"
                    @on-page-size-change="changePageSize" />
            </Space>
        </Space>
    </Card>
</template>

<script setup name="AllContest">
import { ref, reactive, onMounted } from 'vue'
import ContestList from '../../../components/goforit/contest/ContestList.vue'
import TagSelectSignle from '../../../components/common/TagSelectSignle.vue';
import CascaderTagSelect from '../../../components/common/CascaderTagSelect.vue';
import http from '../../../plugin/axios';
import msg from '../../../common/msg';
import { useRouter } from 'vue-router'


const router = useRouter()
const cascaderList = ref([])
const contestList = ref([])
const pageInfo = reactive({
    currPage: 1,
    pageSize: 15,
    total: 0
})
const queryContestStatus = ref(0)
const queryContestTagId = ref(0);

const contestStatusTagList = ref([
    { label: '全部', value: 0 },
    { label: '未开始', value: 1 },
    { label: '已结束', value: 2 },
    { label: '正在进行', value: 3 }
]);



const toContestDetialPage = (id) => {
    // loginDialogShow.value = true
    router.push("/contest/detail/" + id)
}


const getContestTags = async () => {
    const { data: res } = await http.get('/contest/tags')
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    cascaderList.value = [{
        id: 0, name: '全部', tags: [{ id: 0, name: '全部' }]
    }]
    res.data.tagList.forEach((item) => {
        item.tags.forEach((subItem) => {
            cascaderList.value[0].tags.push(subItem)
        })
        cascaderList.value.push(item)
    })
}


const changePage = (page) => {
    pageInfo.currPage = page
    getContestList()
}

const changePageSize = (psize) => {
    pageInfo.pageSize = psize
    getContestList()
}

const handleTagClick = (t) => {
    queryContestStatus.value = t
    getContestList()
}

const handleLv2Change = (t) => {
    getContestList()
}

const getContestList = async () => {
    let d = {
        currPage: pageInfo.currPage,
        pageSize: pageInfo.pageSize,
        tagId: queryContestTagId.value,
        status: queryContestStatus.value
    }
    const { data: res } = await http.post('/contest/all', d)
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    try {
        contestList.value = res.data.infos
        pageInfo.total = res.data.total
    } catch (e) {
        contestList.value = []
        pageInfo.total = 0
    }
}

const handleLv1Change = (t) => {
    // empty function
}



onMounted(() => {
    let s = router.currentRoute.value.params.status
    if (s == 'all') {
        queryContestStatus.value = 0
    } else if (s == 'not-started') {
        queryContestStatus.value = 1
    } else if (s == 'finished') {
        queryContestStatus.value = 2
    } else if (s == 'in-process') {
        queryContestStatus.value = 3
    }
    getContestList()
    getContestTags()
})

</script>

<style scoped lang="less"></style>

