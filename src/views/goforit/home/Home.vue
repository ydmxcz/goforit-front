<template>
    <Row :wrap="false" style="width:100%;">
        <Col flex="auto">
        </Col>
        <Col flex="1200px">
        <Row :wrap="false" style="width:100%">
            <Col flex="950px" style="padding-right: 20px;">
            <Space direction="vertical" style="width: 100%;">
                <!-- <Card class="content-card" style="width:100%;margin-top: 20px;">
                    <h3 class="ptb-10">训练任务</h3>
                    <List size="large">
                        <ListItem>
                            <ListItemMeta title="This is title"
                                description="This is description, this is description." />
                            <template #action>
                                <Button type="primary" shape="circle">
                                    <Icon type="md-arrow-forward" />
                                </Button>
                            </template>
                        </ListItem>
                        <ListItem>
                            <ListItemMeta title="This is title"
                                description="This is description, this is description." />
                            <template #action>
                                <Button type="primary" shape="circle">
                                    <Icon type="md-arrow-forward" />
                                </Button>
                            </template>
                        </ListItem>
                        <ListItem>
                            <ListItemMeta title="This is title"
                                description="This is description, this is description." />
                            <template #action>
                                <Button type="primary" shape="circle">
                                    <Icon type="md-arrow-forward" />
                                </Button>
                            </template>
                        </ListItem>
                    </List>
                </Card> -->

                <Card class="content-card" style="width:100%;margin-top: 20px;">
                    <Space direction="vertical" style="width: 100%;">
                        <h3 class="ptb-10">最近比赛</h3>
                        <ContestList v-for="item in competitionItem" :contest-id="item.id" :name="item.title"
								:is-original="true" :is-rated="item.ratingTop != -1" :sign-up-start="item.signUpStartTime"
								:sign-up-end="item.signUpEndTime" :contest-start="item.startTime"
								:contest-end="item.endTime" :length-time="(item.endTime - item.startTime) / 3600000"
								:sponsor="item.sponsorName" :number="item.signUpNum || 0" :max-rating="item.ratingTop"
								@on-sign-up="handleOnSignUp" @to-detial-page="handleOnSignUp" />
                        <!-- <ContestList v-for="item in competitionItem" :name="item.name" :is-original="item.isOriginal"
                            :is-rated="item.isRated" :sign-up-start="item.signUpStart" :sign-up-end="item.competitionEnd"
                            :contest-start="item.competitionStart" :contest-end="item.competitionEnd"
                            :length-time="item.lengthTime" :sponsor="item.sponsor" :number="item.number"
                            :status="item.status" :max-rating="item.maxRating" /> -->
                    </Space>
                </Card>

                <Card class="content-card" style="width:100%;" :padding="20">
                    <Space direction="vertical" style="width: 100%;">
                        <h3 class="ptb-10">最新博客</h3>
                        <BlogListItem v-for="item in blogList" :blog-id="item.id" :author-name="item.authorName"
                :avatar="item.authorAvatar" :create-time="new Date(Number((item.createTime / 1e6)))" :title="item.title"
                :tags="tagMap.get(item.id)" :abstract="item.abstract" :thumbs-up-num="item.thumbsUpNum || 0"
                :view-num="item.viewNum || 0" :comment-num="item.commentNum || 0" :collect-num="item.collectNum || 0"
                :is-collect="item.isCollect > 0" :is-thumbs-up="item.isThumbsUp > 0" @to-detial-page="toDetialPage" :user-id="BigNumber(store.getters.userInfo.id)"/>
                    </Space>
                </Card>
            </Space>
            </Col>
            <Col flex="250px">
            <Card style="width: 100%;margin-top: 20px;">
                <Space direction="vertical" style="width: 100%;">
                    <h3 class="ptb-10">刷题统计</h3>
                    <Row style="width: 100%;display: flex;align-items: center;justify-content: center;" :wrap="false">
                        <!-- <Col flex="100px"> -->
                        <!-- 简单 -->
                        <Circle :size="circleCfg.size" :trail-width="7" :stroke-width="7" :percent="data.circleData.simple"
                            stroke-linecap="square" stroke-color="#19be6b">
                            <!-- 中等 -->
                            <Circle :size="circleCfg.size" :trail-width="7" :stroke-width="8"
                                :percent="data.circleData.middle" stroke-linecap="square" stroke-color="#f90"
                                trail-color="none">
                                <!-- 困难 -->
                                <Circle :size="circleCfg.size" :trail-width="7" :stroke-width="8"
                                    :percent="data.circleData.difficult" stroke-linecap="square" stroke-color="#ed4014"
                                    trail-color="none">
                                    <div>
                                        <p
                                            :style="{ color: '#657180', fontSize: circleCfg.frontSize + 'px', margin: '0px 0px 5px' }">
                                            已完成</p>
                                        <h1
                                            :style="{ color: '#657180', fontSize: circleCfg.frontSize + 'px', fontWeight: 'normal' }">
                                            {{
                                                data.problemData.simple + data.problemData.middle +
                                                data.problemData.difficult
                                            }}/ {{ data.problemData.total }}</h1>
                                    </div>
                                </Circle>
                            </Circle>
                        </Circle>
                    </Row>
                    <Space direction="vertical" style="width: 100%;">
                        <span> 简单 : <span style="color: #19be6b;">{{ data.problemData.simple }}</span> / {{
                            data.problemData.simpleTotal
                        }}</span>
                        <Progress :percent="data.problemData.simplePercent" :stroke-width="20" status="active" text-inside
                            stroke-color="#19be6b" />
                        <span> 中等 :<span style="color: #ff9900;">{{ data.problemData.middle }}</span> / {{ data.problemData.middleTotal }}</span>
                        <Progress :percent="data.problemData.middlePercent" :stroke-width="20" status="active" text-inside
                            stroke-color="#ff9900" />
                        <span> 困难 :<span style="color: ##ed4014;">{{ data.problemData.difficult }}</span> / {{ data.problemData.difficultTotal }}</span>
                        <Progress :percent="data.problemData.difficultPercent" :stroke-width="20" status="active"
                            text-inside stroke-color="#ed4014" />

                    </Space>
                </Space>
            </Card>
            </Col>
        </Row>
        </Col>
        <Col flex="auto">
        </Col>
    </Row>
</template>
<script setup name='Home'>
import { ref, reactive, onMounted } from 'vue';
import ContestList from '../../../components/goforit/contest/ContestList.vue'
import RatingList from '../../../components/goforit/common/RatingList.vue';
import BigNumber from '_bignumber.js@9.1.1@bignumber.js';
import { useRouter } from 'vue-router';
import http from '../../../plugin/axios';
import msg from '../../../common/msg';
import { useStore } from 'vuex';
import BlogListItem from '../../../components/goforit/blog/BlogListItem.vue';

const router = useRouter()
const store = useStore()
const circleCfg = reactive({
    size: 150,
    frontSize: 16,
})

const data = reactive({
    problemData: {
        simple: 0,
        simpleTotal: 0,
        simplePercent: 0,
        middle: 0,
        middleTotal: 0,
        middlePercent: 0,
        difficult: 0,
        difficultTotal: 0,
        difficultPercent: 0,
        total: 0,
    },
    circleData: {
        simple: 0,
        middle: 0,
        difficult: 0
    }
})

const tagMap = new Map();
const blogList = ref([]);
onMounted(() => {
    getPraticeData()
    getContestList()
    getBlogList()
})

const toDetialPage = (blogId) => {
    router.push('/blog/article/' + String(blogId))
}

const competitionItem = ref([])
const pageInfo = reactive({
    total: 0,
    pageSize: 10,
    currPage: 1,
});


const getBlogList = async () => {
    const { data: res } = await http.post('/blog/select', {
        currPage: pageInfo.currPage,
        pageSize: pageInfo.pageSize,
        userId: BigNumber(store.getters.userInfo.id)
    })
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    blogList.value = res.data.infos
    res.data.blogTags.forEach((item) => {
        if (!tagMap.has(item.blogId)) {
            tagMap.set(item.blogId, [item])
        } else {
            tagMap.get(item.blogId).push(item)
        }
    })
    blogList.value.length = 5
}

const handleThumbBlog = async (blogId, isThumbsUp) => {
    console.log(blogId, isThumbsUp);
    const { data: res } = await http.post('/blog/thumbsup', {
        id: blogId,
        thumbed: isThumbsUp,
        userId: BigNumber(store.getters.userInfo.id)
    })
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    for (let index = 0; index < blogList.value.length; index++) {
        const element = blogList.value[index];
        if (element.id == blogId) {
            element.isThumbsUp = isThumbsUp ? 0 : blogId
            if(!element.thumbsUpNum) {
                element.thumbsUpNum = 0
            }
            element.thumbsUpNum = (isThumbsUp?element.thumbsUpNum-1:element.thumbsUpNum+1)
            break;
        }
    }

}
const getContestList = async () => {
	let d = {
		tagId: 0,
		status: 0
	}
	console.log(d);
	const { data: res } = await http.post('/contest/with/status', d)
	if (res.code != 200) {
		msg.err(res.msg)
		return
	}
	try {
        res.data.finished.forEach((item=>{
            competitionItem.value.push(item)
        }))

	} catch (e) {
	}
	// try {
    //     res.data.inProcess.forEach((item=>{
    //         competitionItem.value.push(item)
    //     }))
    //     // competitionItem.value.push(res.data.inProcess)


	// } catch (e) {
	// }
	// try {
    //     res.data.notStarted.forEach((item=>{
    //         competitionItem.value.push(item)
    //     }))
    //     // competitionItem.value.push(res.data.notStarted)
	// } catch (e) {
	// }
    competitionItem.value.length = 5
    // console.log(competitionItem.value);
}

const getPraticeData = async () => {
    const { data: res } = await http.post('/problem/user/finish/count', { userId: BigNumber(store.getters.userInfo.id) })
    if (res.code != 200) {
        msg.err(res.msg)
        return
    } 
    console.log(res);
    data.problemData.simple = res.data.finishEasy || 0
    data.problemData.middle = res.data.finishMedium || 0
    data.problemData.hard = res.data.finishHard || 0
    data.problemData.simpleTotal = res.data.totalEasy || 0
    data.problemData.middleTotal = res.data.totalMedium || 0
    data.problemData.difficultTotal = res.data.totalHard || 0
    data.problemData.total = res.data.totalEasy + res.data.totalMedium + res.data.totalHard
    data.problemData.simplePercent = Math.round(((data.problemData.simple / data.problemData.simpleTotal) * 100) * 100) / 100
    data.problemData.middlePercent = Math.round(((data.problemData.middle / data.problemData.middleTotal) * 100) * 100) / 100
    data.problemData.difficultPercent = Math.round(((data.problemData.difficult / data.problemData.difficultTotal) * 100) * 100) / 100
    data.circleData.difficult = data.problemData.difficult / data.problemData.total
    data.circleData.middle = data.problemData.middle / data.problemData.total + data.circleData.difficult
    data.circleData.simple = data.problemData.simple / data.problemData.total + data.circleData.middle
    data.circleData.difficult = Math.round((data.circleData.difficult * 100) * 100) / 100
    data.circleData.middle = Math.round((data.circleData.middle * 100) * 100) / 100
    data.circleData.simple = Math.round((data.circleData.simple * 100) * 100) / 100

}


const listData = reactive([
    {
        title: 'This is title 1',
        description: 'This is description, this is description, this is description.',
        avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
        content: 'This is the content, this is the content, this is the content, this is the content.'
    },
    {
        title: 'This is title 2',
        description: 'This is description, this is description, this is description.',
        avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
        content: 'This is the content, this is the content, this is the content, this is the content.'
    },
    {
        title: 'This is title 3',
        description: 'This is description, this is description, this is description.',
        avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
        content: 'This is the content, this is the content, this is the content, this is the content.'
    }
])



// it is sorted list
const contentCardDatalist = reactive([
    { username: "AAAA", rating: 10000 },
    { username: "BBBB", rating: 9999 },
    { username: "CCCC", rating: 8888 },
    { username: "DDDD", rating: 7777 },
    { username: "EEEE", rating: 6666 },
    { username: "FFFF", rating: 5555 },
    { username: "GGGG", rating: 4444 },
    { username: "HHHH", rating: 3333 },
    { username: "IIII", rating: 2222 },
    { username: "JJJJ", rating: 1111 },
])
</script>
<style scoped lang='less'>
.content-card {
    border-radius: 10px;
    margin-bottom: 20px;

}

.ptb-10 {
    padding-top: 10px;
    padding-bottom: 10px;
}
</style>