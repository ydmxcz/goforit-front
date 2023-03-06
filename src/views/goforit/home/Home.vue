<template>
    <Row :wrap="false" style="width:100%;">
        <Col flex="auto">
        </Col>
        <Col flex="1200px">
        <Row :wrap="false" style="width:100%">
            <Col flex="950px" style="padding-right: 20px;">
            <Space direction="vertical" style="width: 100%;">
                <Card class="content-card" style="width:100%;margin-top: 20px;">
                    <h3 class="ptb-10">训练任务</h3>
                    <List size="large">
                        <ListItem>
                            <!-- Optins:avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" -->
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
                </Card>

                <Card class="content-card" style="width:100%;">
                    <Space direction="vertical" style="width: 100%;">
                        <h3 class="ptb-10">最近比赛</h3>

                        <ContestList v-for="item in competitionItem" :name="item.name"
                            :is-original="item.isOriginal" :is-rated="item.isRated" :sign-up-start="item.signUpStart"
                            :sign-up-end="item.competitionEnd" :contest-start="item.competitionStart"
                            :contest-end="item.competitionEnd" :length-time="item.lengthTime"
                            :sponsor="item.sponsor" :number="item.number" :status="item.status"
                            :max-rating="item.maxRating" />
                    </Space>
                </Card>

                <Card class="content-card" style="width:100%;" :padding="20">
                    <Space direction="vertical" style="width: 100%;">
                        <h3 class="ptb-10">热门博客</h3>
                        <BlogListItem v-for="item in 5" @click="router.push('/blog/article/123')" />
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
                        <Circle :size="circleCfg.size" :trail-width="7" :stroke-width="7"
                            :percent="data.circleData.simple" stroke-linecap="square" stroke-color="#19be6b">
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
                        <Progress :percent="data.problemData.simplePercent" :stroke-width="20" status="active"
                            text-inside stroke-color="#19be6b" />
                        <span> 中等 :<span style="color: #ff9900;">360</span> / 5000</span>
                        <Progress :percent="data.problemData.middlePercent" :stroke-width="20" status="active"
                            text-inside stroke-color="#ff9900" />
                        <span> 困难 :<span style="color: ##ed4014;">60</span> / 200</span>
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
import ContestListItem from '../../../components/goforit/contest/ContestListItem.vue'
import ContestList from '../../../components/goforit/contest/ContestList.vue'
import RatingList from '../../../components/goforit/common/RatingList.vue';
import BlogListItem from '../../../components/goforit/blog/BlogListItem.vue';
import { useRouter } from 'vue-router';
const router = useRouter()

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


onMounted(() => {
    // 模拟延时
    setTimeout(() => {
        data.problemData = {
            simple: 320,
            simpleTotal: 500,
            middle: 200,
            middleTotal: 240,
            difficult: 50,
            difficultTotal: 60,
            total: 800,
            simplePercent: 0,
            middlePercent: 0,
            difficultPercent: 0,
        };

        data.problemData.simplePercent = Math.round(((data.problemData.simple / data.problemData.simpleTotal) * 100) * 100) / 100
        data.problemData.middlePercent = Math.round(((data.problemData.middle / data.problemData.middleTotal) * 100) * 100) / 100
        data.problemData.difficultPercent = Math.round(((data.problemData.difficult / data.problemData.difficultTotal) * 100) * 100) / 100
        data.circleData.difficult = data.problemData.difficult / data.problemData.total
        data.circleData.middle = data.problemData.middle / data.problemData.total + data.circleData.difficult
        data.circleData.simple = data.problemData.simple / data.problemData.total + data.circleData.middle
        data.circleData.difficult = Math.round((data.circleData.difficult * 100) * 100) / 100
        data.circleData.middle = Math.round((data.circleData.middle * 100) * 100) / 100
        data.circleData.simple = Math.round((data.circleData.simple * 100) * 100) / 100

    }, 1000);
})


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


const competitionItem = reactive([{
    name: '2023牛客寒假算法基础集训营1',
    isOriginal: true,
    isRated: true,
    signUpStart: '2022-11-10 10:00',
    signUpEnd: '2023-01-30 18:00',
    competitionStart: '2023-02-01 13:00',
    competitionEnd: '2023-02-01 18:00',
    lengthTime: 666,
    sponsor: 'nowcoder.com',
    number: 999999,
    status: true,
    // maxRating:2199,
}, {
    name: '2023牛客寒假算法基础集训营2',
    isOriginal: true,
    isRated: true,
    signUpStart: '2022-11-10 10:00',
    signUpEnd: '2023-01-30 18:00',
    competitionStart: '2023-02-01 13:00',
    competitionEnd: '2023-02-01 18:00',
    lengthTime: 5,
    sponsor: 'nowcoder.com',
    number: 999999,
    status: true,
    maxRating: 2199,
}, {
    name: '2023牛客寒假算法基础集训营3',
    isOriginal: true,
    isRated: true,
    signUpStart: '2022-11-10 10:00',
    signUpEnd: '2023-01-30 18:00',
    competitionStart: '2023-02-01 13:00',
    competitionEnd: '2023-02-01 18:00',
    lengthTime: 5,
    sponsor: 'nowcoder.com',
    number: 999999,
    status: true,
    maxRating: 2199,
}])


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