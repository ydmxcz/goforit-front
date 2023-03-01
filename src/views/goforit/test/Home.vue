

<template>
    <!-- 圣杯布局 -->
    <div class="home-main">
        <!-- 圣杯布局--左侧占位 -->
        <div class="left"></div>
        <div class="middle">
            <!-- 使用Row和Col分为左右大小两栏 -->
            <Row>
                <Col class="home-main-left">
                <Card class="content-card" shadow style="width:100%;max-width:100%;margin-bottom: 10px;" :padding="0">
                    <div class="area-title">
                        <h4>我的任务</h4>
                    </div>
                    <div style="padding: 0px 30px 30px 30px;">
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
                    </div>
                </Card>
                <Card class="content-card" shadow style="width:100%;max-width:100%;margin-bottom: 10px;" :padding="0">
                    <div class="area-title">
                        <h4>最近比赛</h4>
                    </div>
                    <div style="padding: 10px;">
                        <CompetitionList v-for="item in competitionItem" :name="item.name"
                            :is-original="item.isOriginal" :is-rated="item.isRated" :sign-up-start="item.signUpStart"
                            :sign-up-end="item.competitionEnd" :competition-start="item.competitionStart"
                            :competition-end="item.competitionEnd" :length-time="item.lengthTime"
                            :sponsor="item.sponsor" :number="item.number" :status="item.status"
                            :max-rating="item.maxRating" />
                    </div>
                </Card>
                <Card class="content-card" shadow style="width:100%;max-width:100%;margin-bottom: 10px;" :padding="0">
                    <div class="area-title">
                        <h4>热门博客</h4>
                    </div>
                    <div style="padding: 20px;">
                        <List item-layout="vertical">
                            <ListItem v-for="item in listData" :key="item.title">
                                <ListItemMeta :avatar="item.avatar" :title="item.title"
                                    :description="item.description" />
                                {{ item.content }}
                                <template #action>
                                    <li>
                                        <Icon type="ios-star-outline" /> 123
                                    </li>
                                    <li>
                                        <Icon type="ios-thumbs-up-outline" /> 234
                                    </li>
                                    <li>
                                        <Icon type="ios-chatbubbles-outline" /> 345
                                    </li>
                                </template>
                                <template #extra>
                                    <img src="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large"
                                        style="width: 280px">
                                </template>
                            </ListItem>
                        </List>
                    </div>
                </Card>

                </Col>

                <Col class="home-main-right">
                <Card class="content-card" shadow style="width:100%;margin-bottom: 10px;" :padding="0">
                    <div class="area-title">
                        <h4>刷题统计</h4>
                    </div>
                    <div style="display: flex;">
                        <div class="problem-statistics-circle" style="padding: 10px;">
                            <!-- 简单 -->
                            <Circle :size="circleConfig.size" :trail-width="4" :stroke-width="5" :percent="60"
                                stroke-linecap="square" stroke-color="#19be6b">
                                <!-- 中等 -->
                                <Circle :size="circleConfig.size" :trail-width="4" :stroke-width="6" :percent="20"
                                    stroke-linecap="square" stroke-color="#f90" trail-color="none">
                                    <!-- 困难 -->
                                    <Circle :size="circleConfig.size" :trail-width="4" :stroke-width="7" :percent="12"
                                        stroke-linecap="square" stroke-color="#ed4014" trail-color="none">
                                        <div class="demo-circle-custom">
                                            <p>已完成</p>
                                            <h1>100/99999</h1>
                                            <span>
                                                通过率
                                                <i>99.9%</i>
                                            </span>
                                        </div>
                                    </Circle>
                                </Circle>
                            </Circle>


                        </div>
                        <div class="problem-statistics" style="float: right;padding: 10px;">
                            <Row style="margin-bottom: 15px;">
                                <Tag color="success">简单:100/666</Tag>
                            </Row>
                            <Row style="margin-bottom: 15px;">
                                <Tag color="warning">中等:100/666</Tag>
                            </Row>
                            <Row>
                                <Tag color="error">困难:100/666</Tag>
                            </Row>
                        </div>
                    </div>
                </Card>
                <Card class="content-card" shadow style="width:100%;margin-bottom: 10px;" >
                    <h4>Rating排行</h4>
                    <RatingList/>
                </Card>
                </Col>
            </Row>
        </div>
        <div class="right"></div>
    </div>
</template>
<script setup name="Home">
import { reactive } from 'vue';
import CompetitionListItem from '../../../components/goforit/competition/CompetitionListItem.vue'
import CompetitionList from '../../../components/goforit/competition/CompetitionList.vue'
import RatingList from '../../../components/goforit/common/RatingList.vue';


const circleConfig = reactive({
    size: 120
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
<style lang="less" scoped>
.home-main {
    width: 100%;
    display: flex;

    .left {
        flex: calc(15vw) 0 0;
        order: 1;
    }

    .middle {
        display: inline;
        flex: auto 1 0;
        order: 2;
        min-width: 1010px;

        .home-main-left {
            width: 70%;
            padding: 10px;


        }

        .home-main-right {
            width: 30%;
            padding: 10px;
        }

    }

    .content-card {
        border-radius: 20px;

        .area-title {
            padding: 15px;

        }

        .content-card-datalist {
            display: flex;
            width: 100%;
            // background-color: red;
        }
    }

    .right {
        // background-color: darkred;
        flex: calc(15vw) 0 0;
        order: 3;
    }

}

.demo-circle-custom h1 {
    color: #3f414d;
    font-size: 14px;
    font-weight: normal;
}

.demo-circle-custom p {
    color: #657180;
    font-size: 4px;
    margin: 0px 0 5px;
}

.demo-circle-custom span {
    display: block;
    padding-top: 5px;
    color: #657180;
    font-size: 4px;
}

.demo-circle-custom span:before {
    content: '';
    display: block;
    width: 60px;
    height: 1px;
    margin: 0 auto;
    background: #aeaeaf;
    position: relative;
    top: -5px;
}

.demo-circle-custom span i {
    font-style: normal;
    color: #3f414d;
}
</style>


