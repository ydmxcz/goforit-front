<template>
    <div style="padding: 10px 30px;">
        <List item-layout="vertical">
            <ListItem v-for="item in solutionList" :key="item.title">
                <ListItemMeta :avatar="item.avatar" :title="item.title" :description="item.description"
                    @click="checkSolution(item)" >
                <template #title>
                    {{ item.title }}
                </template>
                
                </ListItemMeta>
                <template #action>
                    <!-- <li @click="clickStar">
                        <Icon type="ios-star-outline" /> 123
                    </li> -->
                    <li @click="clickThumbs">
                        <Icon type="ios-thumbs-up-outline" /> 234
                    </li>
                    <li >
                        <Icon type="ios-chatbubbles-outline" /> 345
                    </li>
                </template>
            </ListItem>
        </List>
    </div>
</template>
<script setup name='PracticeProblemSolutions'>
import { ref, reactive, onMounted } from 'vue'

const checkSolution = (item) => {
    console.log(item);
}


const solutionList = reactive([
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


</script>
<style scoped lang='less'></style>