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
import TagBlog from '../views/goforit/blog/TagBlog.vue'
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
import GroupDetail from '../views/goforit/group/GroupDetail.vue'
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
import AdminLogin from '../views/admin/AdminLogin/AdminLogin.vue'


const routes = [
	{
		path: "/", name: "GoForIt", component: GoForIt, redirect: "/home", meta: { title: '??????' },
		children: [
			{ path: "/home", name: "Home", component: Home, meta: { title: '??????' } },
			{
				path: "/problems", name: "Problems", component: Problems, redirect: { name: 'AllProblems' }, meta: { title: '??????' },
				children: [
					{ path: "all", name: "AllProblems", component: AllProblems, meta: { title: '????????????' }, },
					{ path: "list", name: "ProblemList", component: ProblemList, meta: { title: '????????????' }, },
					{ path: "listsquare", name: "ProblemListSquare", component: ProblemListSquare, meta: { title: '????????????' }, },
				]
			},
			{ path: "/problemlist/:id", name: "ProblemListDetail", component: ProblemListDetail, meta: { title: '????????????' } },
			{
				path: "/blog", name: "Blog", component: Blog, redirect: { name: 'AllBlogs' }, meta: { title: '??????' },
				children: [
					{ path: "all", name: "AllBlogs", component: AllBlogs, meta: { title: '??????' }, },
					{ path: "subscription", name: "SubscriptionBlogs", component: SubscriptionBlogs, meta: { title: '??????' }, },
					{ path: "hot", name: "HotBlogs", component: HotBlogs, meta: { title: '??????' }, },
					{ path: "search/:key", name: "BlogSearchResult", component: BlogSearchResult, meta: { title: '????????????' }, },
					{ path: "tag/:id", name: "TagBlog", component: TagBlog, meta: { title: '????????????' }, }
				]
			},
			{ path: "/blog/article/:id", name: "BlogArticle", component: BlogArticle, meta: { title: '????????????' }, },
			{ path: "/courses", name: "Course", component: Course, },
			{
				path: "/course/:id", name: "CourseDetial", component: CourseDetial, meta: { title: '????????????' }, redirect: { name: 'CourseDetialInstruction' },
				children: [
					{ path: "instruction", name: "CourseDetialInstruction", component: CourseDetialInstruction, meta: { title: '????????????' }, },
					{ path: "ranking", name: "CourseDetialRanking", component: CourseDetialRanking, meta: { title: '????????????' }, },
					{ path: "learn", name: "CourseDetialLearn", component: CourseDetialLearn, meta: { title: '????????????' }, },
				]
			},
			{
				path: "/contest", name: "Contest", component: Contest, meta: { title: '??????' },
				children: []
			},
			{
				path: "/contest/detail/:id", name: "ContestDetail", component: ContestDetail,
				redirect: { name: 'ContestIllustration' }, meta: { title: '????????????' },
				children: [
					{
						path: "illustration", name: "ContestIllustration",
						component: ContestIllustration, meta: { title: '????????????' },
					},
					{
						path: "problems", name: "ContestProblems",
						component: ContestProblems, meta: { title: '??????' },
					},
					{
						path: "submit", name: "ContestSubmit",
						component: ContestSubmit, meta: { title: '??????' },
					},
					{
						path: "ranking", name: "ContestRanking",
						component: ContestRanking, meta: { title: '??????' },
					},
				]
			},
			{ path: "/contest/ranking", name: "Ranking", component: Ranking, meta: { title: '?????????' }, },
			{ path: "/contest/:status/list", name: "AllContest", component: AllContest, meta: { title: '????????????' }, },
			// ??????????????????
			{ path: "/problem/:id", name: "Problem", component: Problem, meta: { title: '??????' } },
			// markdown????????????
			{ path: "/mdedit/:userid", name: "MarkDownEditer", component: MarkDownEditer },
			{ path: "/login", name: "Login", component: Login },
			{
				path: "/msg", name: "Message", component: Message, meta: { title: '????????????' }, redirect: { name: "MsgSystem" },
				children: [
					{ path: "/msg/system", name: "MsgSystem", component: MsgSystem, meta: { title: '????????????' } },
					{ path: "/msg/attention", name: "MsgAttention", component: MsgAttention, meta: { title: '????????????' } },
					{ path: "/msg/comment", name: "MsgComment", component: MsgComment, meta: { title: '??????' } },
					{ path: "/msg/like", name: "MsgLike", component: MsgLike, meta: { title: '??????' } },
					{ path: "/msg/collection", name: "MsgCollection", component: MsgCollection, meta: { title: '??????' } },
				]
			},
			{ path: "/group", name: "Group", component: Group, meta: { title: '??????' } },
			{
				path: "/group/:id", name: "GroupDetail", component: GroupDetail, meta: { title: '????????????' }, redirect: { name: 'GroupTrain' },
				children: [
					{ path: "train", name: "GroupTrain", component: GroupTrain, meta: { title: '??????' } },
					{ path: "contest", name: "GroupContest", component: GroupContest, meta: { title: '??????' } },
					{ path: "numbers", name: "GroupNumbers", component: GroupNumbers, meta: { title: '??????' } },

				]
			},
			{
				path: "/user/:id", name: "User", component: User, meta: { title: '????????????' }, redirect: { name: 'RecentlyPass' },
				children: [
					{ path: "recentlyPass", name: "RecentlyPass", component: RecentlyPass, meta: { title: '????????????' } },
					{ path: "contest", name: "UserContest", component: UserContest, meta: { title: '??????' } },
					{ path: "problemList", name: "MyProblemList", component: MyProblemList, meta: { title: '??????' } },
					{ path: "group", name: "UserGroup", component: UserGroup, meta: { title: '????????????' } },
					{ path: "solution", name: "UserSolution", component: UserSolution, meta: { title: '??????' } },
					{ path: "blog", name: "UserBlog", component: UserBlog, meta: { title: '??????' } },
				]
			},
			{
				path: "/profile", name: "Profile", component: Profile, meta: { title: '????????????' }, redirect: { name: 'ProfileCollection' },
				children: [
					{ path: "collection", name: "ProfileCollection", component: ProfileCollection, meta: { title: '?????????' } },
					{ path: "solution", name: "ProfileSolution", component: ProfileSolution, meta: { title: '?????????' } },
					{ path: "blog", name: "ProfileBlog", component: ProfileBlog, meta: { title: '?????????' } },
					{ path: "process", name: "ProfileProcess", component: ProfileProcess, meta: { title: '?????????' } },
					{ path: "points", name: "ProfilePoints", component: ProfilePoints, meta: { title: '?????????' } },
					{ path: "coupons", name: "ProfileCoupons", component: ProfileCoupons, meta: { title: '?????????' } },
					{ path: "order", name: "ProfileOrder", component: ProfileOrder, meta: { title: '?????????' } },
					{ path: "info", name: "ProfileInfo", component: ProfileInfo, meta: { title: '?????????' } },
					{ path: "account", name: "ProfileAccount", component: ProfileAccount, meta: { title: '?????????' } },
				]
			},
		]
	},
	{
		path: "/practice/:id", name: "Practice", component: Practice, meta: { title: '????????????' }, redirect: { name: 'PracticeProblemContent' },
		children: [
			{ path: "content", name: "PracticeProblemContent", component: PracticeProblemContent, meta: { title: '??????????????????' } },
			{ path: "submited", name: "PracticeProblemSubmited", component: PracticeProblemSubmited, meta: { title: '??????????????????' } },
			{ path: "solutions", name: "PracticeProblemSolutions", component: PracticeProblemSolutions, meta: { title: '????????????' } },
		]
	},

	{
		path: "/admin/goforit", name: "Admin", component: Admin, redirect: { name: 'AdminHome' }, meta: { title: 'gofirit????????????' },
		children: [
			{
				path: "home", name: "AdminHome", component: AdminHome, meta: { title: '????????????' },
				children: [
					{ path: "subhome", name: "AdminSubHome", component: AdminSubHome, },
				]
			},
			{ path: "user", name: "UserManage", component: UserManage, meta: { title: '????????????' } },
			{ path: "group", name: "GroupManage", component: GroupManage, meta: { title: '????????????' } },
			{ path: "problem", name: "ProblemLibManage", component: ProblemLibManage, meta: { title: '????????????' } },
			{ path: "problemSolution", name: "ProblemSolutionManage", component: ProblemSolutionManage, meta: { title: '????????????' } },
			{ path: "contest", name: "ContestManage", component: ContestManage, meta: { title: '????????????' } },
			{ path: "problemCase", name: "ProblemCaseManage", component: ProblemCaseManage, meta: { title: '????????????' } },
		]
	},
	{
		path: "/admin/login", name: "AdminLogin", component: AdminLogin, meta: { title: '??????gofirit????????????' },
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

// ????????????????????????,to??????????????????????????????from?????????????????????next??????????????????????????? next('/login')????????????login
// router.beforeEach((to, from, next) => {
// 	// ????????????????????????
// 	if (to.path.includes('admin')) {
// 		if (to.path === '/admin/login') return next()
// 		// ??????token
// 		const admintoken = storage.get('admintoken')
// 		// ??????token, ????????????????????????
// 		if (!admintoken) return next('/admin/login')
// 		next()
// 	}
// })


export default router;