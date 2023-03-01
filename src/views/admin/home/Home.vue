<template>
	<div>

		<h1 @click="router.push('/goforit/admin/home/subhome')">Admin-Home Page</h1>
		<router-view/>
	</div>


</template>
<script>
export default {
	name: "AdminHome",
};
</script>
<script setup>

import {useRouter} from 'vue-router'
const router = useRouter();

</script>

<style scoped lang="less">
</style>