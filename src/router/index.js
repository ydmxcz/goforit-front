import { createWebHistory, createRouter } from "vue-router";
import storage from "../common/storage";
// OJ Page
import GoForIt from '../views/goforit/GoForIt.vue'
import Home from "../views/goforit/home/Home.vue";
import Problems from '../views/goforit/problems/Problems.vue'
import AllProblems from '../views/goforit/problems/AllProblems.vue'
import ProblemListSquare from '../views/goforit/problems/ProblemListSquare.vue'
import ProblemListDetail from '../views/goforit/problems/ProblemListDetail.vue'
import MyProblemList from '../views/goforit/user/MyProblemList.vue'
import ProblemList from '../views/goforit/problems/Problemlist.vue'
import Problem from '../views/goforit/problems/Problem.vue'
import Practice from '../views/goforit/do/practice/Practice.vue'
import PracticeProblemContent from '../views/goforit/do/practice/PracticeProblemContent.vue'
import PracticeProblemSubmited from '../views/goforit/do/practice/PracticeProblemSubmited.vue'
import PracticeProblemSolutions from '../views/goforit/do/practice/PracticeProblemSolutions.vue'
import Blog from '../views/goforit/blog/Blogs.vue'
import AllBlogs from '../views/goforit/blog/AllBlogs.vue'
import SubscriptionBlogs from '../views/goforit/blog/SubscriptionBlogs.vue'
import HotBlogs from '../views/goforit/blog/HotBlogs.vue'
import BlogSearchResult from '../views/goforit/blog/BlogSearchResult.vue'
import BlogArticle from '../views/goforit/blog/BlogArticle.vue'
import BlogAllTopic from '../views/goforit/blog/BlogAllTopic.vue'
import BlogTopic from '../views/goforit/blog/BlogTopic.vue'
import BlogCollect from '../views/goforit/blog/BlogCollect.vue'
import Course from '../views/goforit/course/Course.vue'
import CourseDetial from '../views/goforit/course/CourseDetial.vue'
import CourseDetialInstruction from '../views/goforit/course/CourseDetialInstruction.vue'
import CourseDetialRanking from '../views/goforit/course/CourseDetialRanking.vue'
import CourseDetialLearn from '../views/goforit/course/CourseDetialLearn.vue'
import Contest from '../views/goforit/contest/Contest.vue'
import ContestDetail from '../views/goforit/contest/ContestDetail.vue'
import Ranking from '../views/goforit/contest/Ranking.vue'
import AllContest from '../views/goforit/contest/AllContest.vue'
import ContestIllustration from '../views/goforit/contest/ContestIllustration.vue'
import ContestProblems from '../views/goforit/contest/ContestProblems.vue'
import ContestSubmit from '../views/goforit/contest/ContestSubmit.vue'
import ContestRanking from '../views/goforit/contest/ContestRanking.vue'

import MarkDownEditer from '../views/goforit/blog/MarkDownEditer.vue'
import Login from '../views/goforit/test/Login.vue'
import User from '../views/goforit/user/User.vue'
import RecentlyPass from '../views/goforit/user/RecentlyPass.vue'
import UserContest from '../views/goforit/user/UserContest.vue'
import UserGroup from '../views/goforit/user/UserGroup.vue'
import UserSolution from '../views/goforit/user/UserSolution.vue'
import UserBlog from '../views/goforit/user/UserBlog.vue'
import Message from '../views/goforit/message/Message.vue'
import MsgSystem from '../views/goforit/message/MsgSystem.vue'
import MsgAttention from '../views/goforit/message/MsgAttention.vue'
import MsgComment from '../views/goforit/message/MsgComment.vue'
import MsgLike from '../views/goforit/message/MsgLike.vue'
import MsgCollection from '../views/goforit/message/MsgCollection.vue'
import Group from '../views/goforit/group/Group.vue'
import GroupTrain from '../views/goforit/group/GroupTrain.vue'
import GroupContest from '../views/goforit/group/GroupContest.vue'
import GroupNumbers from '../views/goforit/group/GroupNumbers.vue'
import GroupDiscussion from '../views/goforit/group/GroupDiscussion.vue'
import GroupDetail from '../views/goforit/group/GroupDetail.vue'
import GroupShareEditer from '../views/goforit/group/GroupShareEditer.vue'
import GroupDiscussionDetial from '../views/goforit/group/GroupDiscussionDetial.vue'

import Profile from '../views/goforit/profile/Profile.vue'
import ProfileCollection from '../views/goforit/profile/ProfileCollection.vue'
import ProfileSolution from '../views/goforit/profile/ProfileSolution.vue'
import ProfileBlog from '../views/goforit/profile/ProfileBlog.vue'
import ProfileProcess from '../views/goforit/profile/ProfileProcess.vue'
import ProfilePoints from '../views/goforit/profile/ProfilePoints.vue'
import ProfileCoupons from '../views/goforit/profile/ProfileCoupons.vue'
import ProfileOrder from '../views/goforit/profile/ProfileOrder.vue'
import ProfileInfo from '../views/goforit/profile/ProfileInfo.vue'
import ProfileAccount from '../views/goforit/profile/ProfileCollection.vue'


// Admin Page
import Admin from '../views/admin/Admin.vue'
import AdminHome from '../views/admin/home/Home.vue'
import AdminSubHome from '../views/admin/home/SubHome.vue'
import UserManage from '../views/admin/user/UserManage.vue'
import GroupManage from '../views/admin/group/GroupManage.vue'
import ContestManage from '../views/admin/contest/ContestManage.vue'
import ProblemLibManage from '../views/admin/problems/ProblemLibManage.vue'
import ProblemSolutionManage from '../views/admin/problems/ProblemSolutionManage.vue'
import ProblemCaseManage from '../views/admin/problems/ProblemCaseManage.vue'
import BlogManage from '../views/admin/blog/BlogManage.vue'
import AdminLogin from '../views/admin/AdminLogin/AdminLogin.vue'


const routes = [
	{
		path: "/", name: "GoForIt", component: GoForIt, redirect: "/home", meta: { title: '首页' },
		children: [
			{ path: "/home", name: "Home", component: Home, meta: { title: '首页' } },
			{
				path: "/problems", name: "Problems", component: Problems, redirect: { name: 'AllProblems' }, meta: { title: '题库' },
				children: [
					{ path: "all", name: "AllProblems", component: AllProblems, meta: { title: '全部题目' }, },
					{ path: "list", name: "ProblemList", component: ProblemList, meta: { title: '我的题单' }, },
					{ path: "listsquare", name: "ProblemListSquare", component: ProblemListSquare, meta: { title: '题单广场' }, },
				]
			},
			{ path: "/problemlist/:id", name: "ProblemListDetail", component: ProblemListDetail, meta: { title: '题单信息' } },
			{
				path: "/blog", name: "Blog", component: Blog, redirect: { name: 'AllBlogs' }, meta: { title: '博客' },
				children: [
					{ path: "all", name: "AllBlogs", component: AllBlogs, meta: { title: '最新' }, },
					{ path: "collect", name: "BlogCollect", component: BlogCollect, meta: { title: '收藏' }, },
					{ path: "subscription", name: "SubscriptionBlogs", component: SubscriptionBlogs, meta: { title: '关注' }, },
					{ path: "hot", name: "HotBlogs", component: HotBlogs, meta: { title: '热门' }, },
					{ path: "search/:key", name: "BlogSearchResult", component: BlogSearchResult, meta: { title: '搜索结果' }, },
					{ path: "all-topic", name: "BlogAllTopic", component: BlogAllTopic, meta: { title: '所有分区' }, },
					{ path: "topic/:id", name: "BlogTopic", component: BlogTopic, meta: { title: '分区' }, }
				]
			},
			{ path: "/blog/article/:id", name: "BlogArticle", component: BlogArticle, meta: { title: '文章内容' }, },
			{ path: "/courses", name: "Course", component: Course, },
			{
				path: "/course/:id", name: "CourseDetial", component: CourseDetial, meta: { title: '课程详情' }, redirect: { name: 'CourseDetialInstruction' },
				children: [
					{ path: "instruction", name: "CourseDetialInstruction", component: CourseDetialInstruction, meta: { title: '课程介绍' }, },
					{ path: "ranking", name: "CourseDetialRanking", component: CourseDetialRanking, meta: { title: '学习排行' }, },
					{ path: "learn", name: "CourseDetialLearn", component: CourseDetialLearn, meta: { title: '课程学习' }, },
				]
			},
			{
				path: "/contest", name: "Contest", component: Contest, meta: { title: '竞赛' },
				children: []
			},
			{
				path: "/contest/detail/:id", name: "ContestDetail", component: ContestDetail,
				redirect: { name: 'ContestIllustration' }, meta: { title: '比赛详情' },
				children: [
					{
						path: "illustration", name: "ContestIllustration",
						component: ContestIllustration, meta: { title: '比赛说明' },
					},
					{
						path: "problems", name: "ContestProblems",
						component: ContestProblems, meta: { title: '题目' },
					},
					{
						path: "submit", name: "ContestSubmit",
						component: ContestSubmit, meta: { title: '提交' },
					},
					{
						path: "ranking", name: "ContestRanking",
						component: ContestRanking, meta: { title: '排名' },
					},
				]
			},
			{ path: "/contest/ranking", name: "Ranking", component: Ranking, meta: { title: '排行榜' }, },
			{ path: "/contest/:status/list", name: "AllContest", component: AllContest, meta: { title: '所有比赛' }, },
			// 题目解答页面
			{ path: "/problem/:id", name: "Problem", component: Problem, meta: { title: '题目' } },
			// markdown编辑页面
			{ path: "/mdedit/:userid", name: "MarkDownEditer", component: MarkDownEditer },
			{ path: "/group-share/editer/:userid", name: "GroupShareEditer", component: GroupShareEditer },
			{ path: "/login", name: "Login", component: Login },
			{
				path: "/msg", name: "Message", component: Message, meta: { title: '消息中心' }, redirect: { name: "MsgSystem" },
				children: [
					{ path: "/msg/system", name: "MsgSystem", component: MsgSystem, meta: { title: '系统通知' } },
					{ path: "/msg/attention", name: "MsgAttention", component: MsgAttention, meta: { title: '新增关注' } },
					{ path: "/msg/comment", name: "MsgComment", component: MsgComment, meta: { title: '评论' } },
					{ path: "/msg/like", name: "MsgLike", component: MsgLike, meta: { title: '点赞' } },
					{ path: "/msg/collection", name: "MsgCollection", component: MsgCollection, meta: { title: '收藏' } },
				]
			},
			{ path: "/group", name: "Group", component: Group, meta: { title: '团队' } },
			{
				path: "/group/:id", name: "GroupDetail", component: GroupDetail, meta: { title: '团队详情' }, redirect: { name: 'GroupDiscussion' },
				children: [
					{ path: "train", name: "GroupTrain", component: GroupTrain, meta: { title: '训练' } },
					{ path: "contest", name: "GroupContest", component: GroupContest, meta: { title: '比赛' } },
					{ path: "numbers", name: "GroupNumbers", component: GroupNumbers, meta: { title: '成员' } },
					{ path: "discussion", name: "GroupDiscussion", component: GroupDiscussion, meta: { title: '成员' } },
					{ path: "discussion/:did", name: "GroupDiscussionDetial", component: GroupDiscussionDetial, meta: { title: '成员' } },

				]
			},
			{
				path: "/user/:id", name: "User", component: User, meta: { title: '用户信息' }, redirect: { name: 'RecentlyPass' },
				children: [
					{ path: "recentlyPass", name: "RecentlyPass", component: RecentlyPass, meta: { title: '最近通过' } },
					{ path: "contest", name: "UserContest", component: UserContest, meta: { title: '比赛' } },
					{ path: "problemList", name: "MyProblemList", component: MyProblemList, meta: { title: '题单' } },
					{ path: "group", name: "UserGroup", component: UserGroup, meta: { title: '我加入的' } },
					{ path: "solution", name: "UserSolution", component: UserSolution, meta: { title: '题解' } },
					{ path: "blog", name: "UserBlog", component: UserBlog, meta: { title: '博客' } },
				]
			},
			{
				path: "/profile", name: "Profile", component: Profile, meta: { title: '个人资料' }, redirect: { name: 'ProfileCollection' },
				children: [
					{ path: "collection", name: "ProfileCollection", component: ProfileCollection, meta: { title: '收藏夹' } },
					{ path: "solution", name: "ProfileSolution", component: ProfileSolution, meta: { title: '收藏夹' } },
					{ path: "blog", name: "ProfileBlog", component: ProfileBlog, meta: { title: '收藏夹' } },
					{ path: "process", name: "ProfileProcess", component: ProfileProcess, meta: { title: '收藏夹' } },
					{ path: "points", name: "ProfilePoints", component: ProfilePoints, meta: { title: '收藏夹' } },
					{ path: "coupons", name: "ProfileCoupons", component: ProfileCoupons, meta: { title: '收藏夹' } },
					{ path: "order", name: "ProfileOrder", component: ProfileOrder, meta: { title: '收藏夹' } },
					{ path: "info", name: "ProfileInfo", component: ProfileInfo, meta: { title: '收藏夹' } },
					{ path: "account", name: "ProfileAccount", component: ProfileAccount, meta: { title: '收藏夹' } },
				]
			},
		]
	},
	{
		path: "/practice/:id", name: "Practice", component: Practice, meta: { title: '题目练习' }, redirect: { name: 'PracticeProblemContent' },
		children: [
			{ path: "content", name: "PracticeProblemContent", component: PracticeProblemContent, meta: { title: '练习题目内容' } },
			{ path: "submited", name: "PracticeProblemSubmited", component: PracticeProblemSubmited, meta: { title: '练习提交记录' } },
			{ path: "solutions", name: "PracticeProblemSolutions", component: PracticeProblemSolutions, meta: { title: '练习题解' } },
		]
	},

	{
		path: "/admin/goforit", name: "Admin", component: Admin, redirect: { name: 'AdminHome' }, meta: { title: 'gofirit后台管理' },
		children: [
			{
				path: "home", name: "AdminHome", component: AdminHome, meta: { title: '后台首页' },
				children: [
					{ path: "subhome", name: "AdminSubHome", component: AdminSubHome, },
				]
			},
			{ path: "user", name: "UserManage", component: UserManage, meta: { title: '用户管理' } },
			{ path: "group", name: "GroupManage", component: GroupManage, meta: { title: '小组管理' } },
			{ path: "problem", name: "ProblemLibManage", component: ProblemLibManage, meta: { title: '题目列表' } },
			{ path: "problemSolution", name: "ProblemSolutionManage", component: ProblemSolutionManage, meta: { title: '题解管理' } },
			{ path: "contest", name: "ContestManage", component: ContestManage, meta: { title: '竞赛列表' } },
			{ path: "problemCase", name: "ProblemCaseManage", component: ProblemCaseManage, meta: { title: '题目样例' } },
			{ path: "blog", name: "BlogManage", component: BlogManage, meta: { title: '博客管理' } },
		]
	},
	{
		path: "/admin/login", name: "AdminLogin", component: AdminLogin, meta: { title: '登录gofirit后台管理' },
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

// 挂载路由导航守卫,to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作 next('/login')强制跳转login
// router.beforeEach((to, from, next) => {
// 	// 访问登录页，放行
// 	if (to.path.includes('admin')) {
// 		if (to.path === '/admin/login') return next()
// 		// 获取token
// 		const admintoken = storage.get('admintoken')
// 		// 没有token, 强制跳转到登录页
// 		if (!admintoken) return next('/admin/login')
// 		next()
// 	}
// })


export default router;