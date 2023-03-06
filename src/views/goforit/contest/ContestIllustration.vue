<template>
    <Card style="width: 100%;">
        <v-md-preview :text="competitionIllustrationText"></v-md-preview>
    </Card>
</template>

<script setup name="ContestIllustration">
// params:{userId:userId.val}}
// this.$router.params.userId,

import { ref,reactive,onMounted } from 'vue';
import { useRoute  } from 'vue-router';
const route = useRoute ()
const params = ref({})

onMounted(()=>{
    // params.value = 
    console.log(route.params.id)
})

const competitionIllustrationText = ref(`
# 这是比赛说明
### Acwing789.数的范围

给定一个按照升序排列的长度为 n 的整数数组，以及 q 个查询。

对于每个查询，返回一个元素 k 的起始位置和终止位置（位置从 0 开始计数）。problemMdTextproblemMdTextproblemMdTextproblemMdText

如果数组中不存在该元素，则返回 \`-1\`。

#### 输入格式

第一行包含整数 n 和 q，表示数组长度和询问个数。

第二行包含 n 个整数（均在 1∼10000 范围内），表示完整数组。

接下来 q 行，每行包含一个整数 k，表示一个询问元素。

#### 输出格式

共 q 行，每行包含两个整数，表示所求元素的起始位置和终止位置。

如果数组中不存在该元素，则返回 \`-1\`。

#### 数据范围

$1≤n≤100000$
$1≤q≤10000$
$1≤k≤10000$

#### 输入样例：

第二行包含 n 个整数（均在 1∼10000 范围内），表示完整数组。

接下来 q 行，每行包含一个整数 k，表示一个询问元素。

#### 输出格式

共 q 行，每行包含两个整数，表示所求元素的起始位置和终止位置。

如果数组中不存在该元素，则返回 \`-1\`。

#### 数据范围

$1≤n≤100000$
$1≤q≤10000$
$1≤k≤10000$

#### 输入样例：
#### 数据范围

$1≤n≤100000$
$1≤q≤10000$
$1≤k≤10000$

#### 输入样例：
`)
</script>

<style scoped lang="less">

</style>