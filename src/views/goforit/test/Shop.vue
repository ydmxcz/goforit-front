<template>
	<Row class="shop-main">
		<Col flex="auto">
		</Col>
		<Col class="middle" flex="1110px" style="height: 100%;min-width: 1100px;">
		<Space direction="vertical" style="width: 100%;margin-top: 20px;">
			<Card style="width: 100%;border-radius: 10px;">
				<CascaderTagSelect title-lv1="方向" title-lv2="分类" :data-list="cascaderList"
					@on-lv2-change="handleLv2Change" @on-lv1-change="handleLv1Change"></CascaderTagSelect>
				<TagSelectSignle title="难度" :data-list="['全部', '入门', '提高', '进阶']" @on-change="handleMyTagClick">
				</TagSelectSignle>
			</Card>

			<div style="width: 100%;margin-bottom: 20px;min-width: 1120px;">
				<Space wrap>
					<Card v-for="i in 20" style="width: 270px;height: 278px;border-radius: 10px;" :padding="10">
						<Space direction="vertical" align="start" style="width:100%;">
							<img style="width: 100%;height:auto;border-radius: 10px 10px 0px 0px;"
								src="../../../assets/shop-demo-pic.png" />
							<h3 style="width: 100%;">
								<Ellipsis text="基于Flask实现番剧推荐系统基于Flask实现番剧推荐系统" :lines="2" tooltip />
							</h3>
							<Space>
								<Tag color="blue"> Python</Tag>
								<Tag color="blue"> Flask</Tag>
								<Tag color="blue"> MySQL</Tag>
							</Space>
						</Space>
						<div class="bottom">
							<Space><span>初级</span> <span>5088人学过</span></Space>
							<Tag style="float: right;" color="orange">
								<Numeral value="1000.234" format="0,0.00">
									<template #prefix>
										<strong>¥</strong>
									</template>
								</Numeral>
							</Tag>
						</div>
					</Card>
				</Space>
			</div>
			<Space direction="vertical" type="flex" align="center" style="margin-bottom: 20px;">
				<Page :total="100" :page-size="10" show-elevator show-sizer show-total />
			</Space>
		</Space>

		</Col>
		<Col flex="auto">
		</Col>
	</Row>
</template>
<script setup name="Shop">
import { ref, reactive, onMounted, nextTick } from 'vue';
import TagSelectSignle from '../../../components/common/TagSelectSignle.vue';
import CascaderTagSelect from '../../../components/common/CascaderTagSelect.vue';

// TagSelect----start
// const tagSelectStandardLineHeight = 40

const cascaderList = ref([
	{
		"name": "全部", checked: false,
		"tags": [
			"全部", "MongoDB", "Lua", "ThinkPHP", "Spring", "CEP", "Node.js",
			"TensorFlow", "JavaScript", "uniapp", "网络安全", "PHP", "基础入门", "PostgreSQL",
			"ROS", "数据分析", "PyTorch", "Kubernetes", "软件测试", "jQuery", "TypeScript", "Oracle", "Python",
			"Redis", "NoSQL", "OpenCV", "Nginx", "操作系统", "SpringBoot", "C", "入门实战", "Spark", "设计模式",
			"Pygame", "强化学习", "CSS", "HTML", "机器学习", "Linux", "区块链", "Flutter", "Jenkins", "Git",
			"Scala", "React", "计算机网络", "蓝桥杯", "Go", "Qt", "C++", "Flask", "数据结构", "Hadoop",
			"算法", "Element UI", "NLP", "SSM", "MySQL", "scikit-learn", "Java", "书籍配套实验", "Docker", "Shell",
			"Vue.js", "大学公开课", "自动驾驶", "爬虫", "渗透测试", "Django", "webpack",
			"Bootstrap", "Elasticsearch", "Web安全", "Kafka", "微信小程序", "系统安全", "百题大冲关", "Ansible", "SQL"
		]
	},
	{
		"name": "计算机专业课", checked: false,
		"tags": [
			"全部", "算法", "软件测试", "操作系统", "蓝桥杯",
			"书籍配套实验", "CEP", "ROS", "设计模式", "数据结构"
		]
	},
	{
		"name": "Linux运维", checked: false,
		"tags": [
			"全部", "Linux", "Nginx", "计算机网络", "Shell",
			"Ansible", "Git"
		]
	},
	{
		"name": "后端开发", checked: false,
		"tags": [
			"全部", "Go", "Qt", "Lua", "Django", "C++", "区块链",
			"Pygame", "Flask", "ThinkPHP", "PHP", "C", "爬虫", "Python"
		]
	},
	{
		"name": "云计算与大数据", checked: false,
		"tags": [
			"全部", "Kubernetes", "Docker", "Hadoop", "Scala", "Kafka", "Spark", "Jenkins"
		]
	},
	{
		"name": "数据库", checked: false,
		"tags": [
			"全部", "MongoDB", "NoSQL", "Oracle", "PostgreSQL", "MySQL", "SQL", "Redis"
		]
	},
	{
		"name": "人工智能", checked: false,
		"tags": [
			"全部", "TensorFlow", "PyTorch", "NLP", "OpenCV", "数据分析",
			"强化学习", "自动驾驶", "机器学习", "scikit-learn"
		]
	},
	{
		"name": "信息安全", checked: false,
		"tags": [
			"全部", "网络安全", "Web安全", "渗透测试", "系统安全"
		]
	},
	{
		"name": "Web前端开发", checked: false,
		"tags": [
			"全部", "JavaScript", "Element UI", "uniapp", "React", "webpack",
			"TypeScript", "Flutter", "jQuery", "微信小程序", "CSS", "HTML",
			"Bootstrap", "Node.js", "Vue.js"
		]
	},
	{
		"name": "Java后端开发", checked: false,
		"tags": [
			"全部",
			"Elasticsearch", "Java", "MyBatisPlus", "SpringBoot", "Spring"
		]
	}
])


const handleMyTagClick = (name) => {
	console.log("mtTag:", name)
}

const handleLv1Change = (name) => {
	console.log("lv1:", name)
}

const handleLv2Change = (name) => {
	console.log("lv2:", name)
}


// const forward = 'forward'
// const classify = 'classify'
// const difficult = 'difficult'
// const tagListOpen = '展开'
// const tagListClose = '收起'
// const tagNameSelect = reactive({
// 	'forward': '',
// 	'classify': '',
// 	'difficult': '',
// })

// const classifyTagSelectList = ref(forwardTagSelectList.value[0].tags)
// const difficultTagSelectList = ref(['全部', '入门', '提高', '进阶'])

// // 这里面的值只有在tagList改变的时候才能改
// const tagSelectOriginalHeight = reactive({
// 	'forward': 0,
// 	'classify': 0,
// 	'difficult': 0,
// })

// const tagSelectButtonText = reactive({
// 	'forward': tagListOpen,
// 	'classify': tagListOpen,
// 	'difficult': tagListOpen,
// })

// const forwardTagSelectDom = ref([])
// const classifyTagSelectDom = ref([])
// const difficultTagSelectDom = ref([])

// const handleForwardTagSelectChange = (idx) => {
// 	// 按照上面的逻辑处理DOM
// 	// console.log(idx, difficultTagSpace.value.offsetHeight)
// 	let name = forwardTagSelectList.value[idx].name
// 	forwardTagSelectDom.value.forEach((item, i) => {
// 		if (i == idx) {
// 			if (name != tagNameSelect[forward]) {
// 				// 清除样式
// 				classifyTagSpace.value.style.height = ''
// 				classifyTagSpace.value.style.overflowY = ''
// 				tagNameSelect[forward] = name
// 				item.id = 'active-item'
// 				// 更新二级菜单的list
// 				classifyTagSelectList.value = forwardTagSelectList.value[idx].tags
// 				// 清除其他选中,设置第一个为默认选中
// 				// handleClassifyTagSelectChange(0)
// 				handleCommonTagSelectChange(0, classifyTagSelectDom.value, classifyTagSelectList.value, classify)
// 				// 更新list更新后的DOM高度
// 				nextTick(() => {
// 					tagSelectOriginalHeight[classify] = classifyTagSpace.value.offsetHeight
// 					// console.log(tagSelectOriginalHeight[classify], classifyTagSpace.value.offsetHeight)
// 					if (tagSelectOriginalHeight[classify] > tagSelectStandardLineHeight) {
// 						classifyTagSpace.value.style.height = tagSelectStandardLineHeight + 'px' //行高40px
// 						classifyTagSpace.value.style.overflowY = 'hidden'
// 					}
// 				})
// 			}
// 		} else {
// 			item.id = ''
// 		}
// 	})
// }

// const foreardTagSpace = ref()
// const classifyTagSpace = ref()
// const difficultTagSpace = ref()

// const handleCommonTagSelectChange = (idx, tagSelectDom, list, name) => {
// 	// console.log(idx, difficultTagSpace.value.offsetHeight)
// 	let name = list[idx]
// 	tagSelectDom.forEach((item, i) => {
// 		if (i == idx) {
// 			// 防止重复点击
// 			if (name != tagNameSelect[name]) {
// 				tagNameSelect[name] = name
// 				item.id = 'active-item'
// 			}
// 		} else {
// 			item.id = ''
// 		}
// 	})
// }




// // 利用弱类型的特点，抽象出重复的基本逻辑
// const handleTagSelectOpen = (spaceDom, stdH, actH, name) => {
// 	if (spaceDom.style.height != '40px') {
// 		// 关闭
// 		spaceDom.style.height = stdH + 'px' //行高40px
// 		spaceDom.style.overflowY = 'hidden'
// 		tagSelectButtonText[name] = tagListOpen
// 	} else {
// 		spaceDom.style.height = ''//actH + 'px' //行高40px
// 		spaceDom.style.overflowY = ''
// 		tagSelectButtonText[name] = tagListClose
// 	}
// }

// const initTagSpace = (name, spaceDom) => {
// 	tagSelectOriginalHeight[name] = spaceDom.value.offsetHeight
// 	// 如果当前的行高大于标准行高则设置为收起
// 	if (tagSelectOriginalHeight[name] > tagSelectStandardLineHeight) {
// 		spaceDom.value.style.height = tagSelectStandardLineHeight + 'px' //行高40px
// 		spaceDom.value.style.overflowY = 'hidden'
// 	}
// }

// window.addEventListener('resize', () => {
// 	// 如果当前的行高大于标准行高则设置为收起
// 	if (tagSelectButtonText[forward] == tagListClose) {
// 		tagSelectOriginalHeight[forward] = foreardTagSpace.value.offsetHeight
// 	}
// 	if (tagSelectButtonText[classify] == tagListClose) {
// 		tagSelectOriginalHeight[classify] = classifyTagSpace.value.offsetHeight
// 	}
// 	if (tagSelectButtonText[difficult] == tagListClose) {
// 		tagSelectOriginalHeight[difficult] = difficultTagSpace.value.offsetHeight
// 	}
// })

// // TagSelect----end


// onMounted(() => {
// 	// console.log(tagSelectLevelTwoList.value)

// 	nextTick(() => {
// 		classifyTagSelectList.value = forwardTagSelectList.value[0].tags
// 		forwardTagSelectDom.value[0].id = 'active-item'
// 		classifyTagSelectDom.value[0].id = 'active-item'
// 		difficultTagSelectDom.value[0].id = 'active-item'
// 		tagSelectOriginalHeight[forward] = foreardTagSpace.value.offsetHeight
// 		tagSelectOriginalHeight[classify] = classifyTagSpace.value.offsetHeight
// 		tagSelectOriginalHeight[difficult] = difficultTagSpace.value.offsetHeight
// 		initTagSpace(forward, foreardTagSpace)
// 		initTagSpace(classify, classifyTagSpace)
// 		initTagSpace(difficult, difficultTagSpace)
// 	})
// })

</script>

<style scoped lang="less">
.shop-main {
	min-height: calc(100vh - 50px);
	width: 100%;
}

.tag-item {
	padding-left: 10px;
	padding-right: 10px;
	margin: 5px;
	height: 30px;
	font-size: 12px;
}

.tag-item:hover {
	color: #2e7eee;
}


.elem-center {
	display: flex;
	justify-content: center;
	align-items: center;
}

#active-item {
	color: #2e7eee;
	font-weight: 500;
	background: #eaf2fd;
	border-radius: 15px;
}

.bottom {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 22px;
	font-size: 14px;
	font-weight: 400;
	color: #999;
	line-height: 20px;
}
</style>