// vue3中创建store实例对象的方法createStore()按需引入
import { createStore } from 'vuex'
import storage from '../common/storage'


export default createStore({
	state: {
		userInfo: storage.get("userInfo"),
		currPath: '/home',
		shopCourseObj: [
			{
				"name": "全部",
				"tags": [
					"全部", "MongoDB", "Lua", "ThinkPHP", "Spring", "CEP", "Node.js",
					"TensorFlow", "JavaScript", "uniapp", "网络安全", "PHP", "基础入门", "PostgreSQL",
					"ROS", "数据分析", "PyTorch", "Kubernetes", "软件测试", "jQuery", "TypeScript", "Oracle", "Python",
					"Redis", "NoSQL", "OpenCV", "Nginx", "操作系统", "SpringBoot", "C", "入门实战", "Spark", "设计模式",
					"Pygame", "强化学习", "CSS", "HTML", "机器学习", "Linux", "区块链", "Flutter", "Jenkins", "Git",
					"Scala", "React", "计算机网络", "蓝桥杯", "Go", "Qt", "C++", "Flask", "数据结构", "Hadoop",
					"算法", "Element UI", "NLP", "MyBatisPlus", "MySQL", "scikit-learn", "Java", "书籍配套实验", "Docker", "Shell",
					"Vue.js", "大学公开课", "自动驾驶", "爬虫", "渗透测试", "Django", "webpack",
					"Bootstrap", "Elasticsearch", "Web安全", "Kafka", "微信小程序", "系统安全", "百题大冲关", "Ansible", "SQL"
				]
			},
			{
				"name": "计算机专业课",
				"tags": [
					"算法", "软件测试", "操作系统", "蓝桥杯", "书籍配套实验",
					"CEP", "ROS", "设计模式", "数据结构"
				]
			},
			{
				"name": "Linux运维",
				"tags": [
					"全部", "Linux", "Nginx", "计算机网络", "Shell",
					"Ansible", "Git"
				]
			},
			{
				"name": "后端开发",
				"tags": [
					"全部", "Go", "Qt", "Lua", "Django", "C++", "区块链",
					"Pygame", "Flask", "ThinkPHP", "PHP", "C", "爬虫", "Python"
				]
			},
			{
				"name": "云计算与大数据",
				"tags": [
					"全部", "Kubernetes", "Docker", "Hadoop", "Scala", "Kafka", "Spark", "Jenkins"
				]
			},
			{
				"name": "数据库",
				"tags": [
					"全部", "MongoDB", "NoSQL", "Oracle", "PostgreSQL", "MySQL", "SQL", "Redis"
				]
			},
			{
				"name": "人工智能",
				"tags": [
					"全部", "TensorFlow", "PyTorch", "NLP", "OpenCV", "数据分析",
					"强化学习", "自动驾驶", "机器学习", "scikit-learn"
				]
			},
			{
				"name": "信息安全",
				"tags": [
					"全部", "网络安全", "Web安全", "渗透测试", "系统安全"
				]
			},
			{
				"name": "Web 前端开发",
				"tags": [
					"全部", "JavaScript", "Element UI", "uniapp", "React", "webpack",
					"TypeScript", "Flutter", "jQuery", "微信小程序", "CSS", "HTML",
					"Bootstrap", "Node.js", "Vue.js"
				]
			},
			{
				"name": "Java 后端开发",
				"tags": [
					"全部",
					"Elasticsearch", "Java", "MyBatisPlus", "SpringBoot", "Spring"
				]
			}],
		emojis: {
			"grinning": "😀",
			"smiley": "😃",
			"smile": "😄",
			"grin": "😁",
			"laughing": "😆",
			"satisfied": "😆",
			"sweat_smile": "😅",
			"joy": "😂",
			"blush": "😊",
			"innocent": "😇",
			"wink": "😉",
			"relieved": "😌",
			"heart_eyes": "😍",
			"kissing_heart": "😘",
			"kissing": "😗",
			"kissing_smiling_eyes": "😙",
			"kissing_closed_eyes": "😚",
			"yum": "😋",
			"stuck_out_tongue_winking_eye": "😜",
			"stuck_out_tongue_closed_eyes": "😝",
			"stuck_out_tongue": "😛",
			"sunglasses": "😎",
			"smirk": "😏",
			"unamused": "😒",
			"disappointed": "😞",
			"pensive": "😔",
			"worried": "😟",
			"confused": "😕",
			"persevere": "😣",
			"confounded": "😖",
			"tired_face": "😫",
			"weary": "😩",
			"angry": "😠",
			"rage": "😡",
			"pout": "😡",
			"no_mouth": "😶",
			"neutral_face": "😐",
			"expressionless": "😑",
			"hushed": "😯",
			"frowning": "😦",
			"anguished": "😧",
			"open_mouth": "😮",
			"astonished": "😲",
			"dizzy_face": "😵",
			"flushed": "😳",
			"scream": "😱",
			"fearful": "😨",
			"cold_sweat": "😰",
			"cry": "😢",
			"disappointed_relieved": "😥",
			"sob": "😭",
			"sweat": "😓",
			"sleepy": "😪",
			"sleeping": "😴",
			"mask": "😷",
			"smiling_imp": "😈",
			"smiley_cat": "😺",
			"smile_cat": "😸",
			"joy_cat": "😹",
			"heart_eyes_cat": "😻",
			"smirk_cat": "😼",
			"kissing_cat": "😽",
			"scream_cat": "🙀",
			"crying_cat_face": "😿",
			"pouting_cat": "😾",
			"fist_raised": "✊",
			"fist": "✊",
			"v": "✌️",
			"point_up": "☝️",
			"hand": "✋",
			"raised_hand": "✋",
			"cat": "🐱",
			"mouse": "🐭",
			"cow": "🐮",
			"monkey_face": "🐵",
			"star": "⭐️",
			"sparkles": "✨",
			"zap": "⚡️",
			"sunny": "☀️",
			"cloud": "☁️",
			"snowflake": "❄️",
			"umbrella": "☔️",
			"coffee": "☕️",
			"airplane": "✈️",
			"anchor": "⚓️",
			"watch": "⌚️",
			"phone": "☎️",
			"telephone": "☎️",
			"hourglass": "⌛️",
			"email": "✉️",
			"envelope": "✉️",
			"scissors": "✂️",
			"black_nib": "✒️",
			"pencil2": "✏️",
			"heart": "❤️",
			"aries": "♈️",
			"taurus": "♉️",
			"gemini": "♊️",
			"cancer": "♋️",
			"leo": "♌️",
			"virgo": "♍️",
			"libra": "♎️",
			"scorpius": "♏️",
			"sagittarius": "♐️",
			"capricorn": "♑️",
			"aquarius": "♒️",
			"pisces": "♓️",
			"eight_pointed_black_star": "✴️",
			"x": "❌",
			"hotsprings": "♨️",
			"exclamation": "❗️",
			"heavy_exclamation_mark": "❗️",
			"grey_exclamation": "❕",
			"question": "❓",
			"grey_question": "❔",
			"bangbang": "‼️",
			"interrobang": "⁉️",
			"part_alternation_mark": "〽️",
			"warning": "⚠️",
			"recycle": "♻️",
			"white_check_mark": "✅",
			"sparkle": "❇️",
			"eight_spoked_asterisk": "✳️",
			"negative_squared_cross_mark": "❎",
			"m": "Ⓜ️",
			"wheelchair": "♿️",
			"information_source": "ℹ️",
			"heavy_plus_sign": "➕",
			"heavy_minus_sign": "➖",
			"heavy_division_sign": "➗",
			"heavy_multiplication_x": "✖️",
			"tm": "™️",
			"copyright": "©️",
			"registered": "®️",
			"wavy_dash": "〰️",
			"curly_loop": "➰",
			"loop": "➿",
			"heavy_check_mark": "✔️",
			"ballot_box_with_check": "☑️",
			"white_circle": "⚪️",
			"black_circle": "⚫️",
			"black_small_square": "▪️",
			"white_small_square": "▫️",
			"black_medium_small_square": "◾️",
			"white_medium_small_square": "◽️",
			"black_medium_square": "◼️",
			"white_medium_square": "◻️",
			"black_large_square": "⬛️",
			"white_large_square": "⬜️",
			"black_joker": "🃏",
			"mahjong": "🀄️"
		}
	},
	mutations: {
		// 存储当前path不受刷新影响
		updateCurrPath(state, path) {
			state.currPath = path
		},
		userLoginSuccess(state, userInfo) {
			state.userInfo = {
				id: userInfo.id || -1,
				userStatus: userInfo.userStatus || 0,
				age: userInfo.age || 0,
				grade: userInfo.grade || 0,
				stuNumber: userInfo.stuNumber || 0,
				createTime: userInfo.createTime || 0,
				gender: userInfo.gender || 0,
				userName: userInfo.userName || '',
				avatar: userInfo.avatar || '',
				real_name: userInfo.real_name || '',
				school: userInfo.school || '',
				major: userInfo.major || '',
				instruction: userInfo.instruction || '',
				email: userInfo.email || '',
				roleId:userInfo.roleId || -1,
			}
			storage.set('userInfo', state.userInfo)
			storage.set('token', userInfo.token)
			if(userInfo.roleId != -1) {
				storage.set('admintoken', userInfo.token)
			}
			
		},
		userLogout(state, admin) {
			if (admin === true) {
				storage.remove('admintoken')
				return 
			}
			state.userInfo = {
				id: -1,
				userStatus: 0,
				age: 0,
				grade: 0,
				stuNumber: 0,
				createTime: 0,
				gender: 0,
				userName: '',
				avatar: '',
				real_name: '',
				school: '',
				major: '',
				instruction: '',
				email: '',
				roleId:-1
			}
			storage.remove('userInfo', state.userInfo)
		},
	},
	actions: {
	},
	getters: {
		userInfo: state => state.userInfo || {
			id: -1,
			userStatus: 0,
			age: 0,
			grade: 0,
			stuNumber: 0,
			createTime: 0,
			gender: 0,
			userName: '',
			avatar: '',
			real_name: '',
			school: '',
			major: '',
			instruction: '',
			email: '',
		},
	},
	modules: {
	}
})

