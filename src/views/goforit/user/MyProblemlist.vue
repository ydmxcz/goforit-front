<template>
	<List>
		<ListItem v-for="i in userProblemList">
			<ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
				title="This is title" description="This is description, this is description." />
			<template #action>
				<Button type="primary" shape="circle" @click="pushProblemListById(123)">
					<Icon type="md-arrow-forward" />
				</Button>
			</template>
		</ListItem>
	</List>
	<!-- 使用Space可以非常简单的让分页栏居中 -->
	<Space direction="vertical" type="flex" align="center">
		<Page :total="100" :page-size="10" show-elevator show-sizer show-total />
	</Space>
</template>

<script setup name="MyProblemList">
import { reactive, ref } from 'vue';
import { useRouter} from 'vue-router'
const router = useRouter()

const userProblemList = reactive([1, 2, 3, 4])

const pushProblemListById = (problemId) => {
    router.replace('detail/'+problemId)
}

</script>

<style>

</style>