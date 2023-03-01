<template>
	<div data-id="46812" class="platform-item ">
		<div class="platform-item-pic">
			<img src="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar">
		</div>
		<div class="platform-item-main">
			<div class="platform-item-cont">
				<h4>
					2023牛客寒假算法基础集训营4
					<Tag checkable color="success">原创</Tag>
					<!-- <span class="btn btn-primary btn-xxs">原创</span> -->
					<span class="tag-rating" data-title="Rating赛奖品更加丰厚"
						data-tips-index="1"><i>¥</i>&nbsp;<span>Rated</span></span>
					<span class="match-status  match-signup">报名中</span>
				</h4>
				<ul class="platform-info">
					<li class="time-icon">报名时间： 2022-11-10 10:00
						至 2023-01-30 18:00
					</li>
					<li class="match-time-icon">比赛时间： 2023-01-30 13:00
						至 2023-01-30 18:00
						(时长:5小时)</li>
					<!-- TODO:主办方名称最好不要太长，至于最长是多少，没有决定 -->
					<li class="user-icon">
						主办方：nowcoder.com
					</li>
					<li class="joins-icon">参与人数：6327</li>
					<li class="icon-nc-flash2">不计Rating的范围：Rating＞2199</li>
				</ul>
			</div>
			<div class="platform-item-btn match-btn-wrapper">
				<Button type="success">报名</Button>

				<!-- 要实现倒计时效果 -->
				<div class="platform-countdown ">距比赛<br>8天22:29:25</div>
			</div>
		</div>
	</div>


</template>

<script setup name="CompetitionListItem">

</script>

<style scoped>
.platform-item {
	padding-right: 5px;
	/* min-width: 750px; */
	display: flex;
}

.platform-item-cont {
	width: 515px
}

.platform-item-cont h4 .icon-lock {
	font-size: 22px;
	vertical-align: middle;
	margin-right: 5px
}

.platform-item-btn {
	width: 100px;
	float: right;
}

.platform-item-btn .btn {
	padding-top: 8px;
	padding-bottom: 8px
}

.platform-item-btn .btn+.btn {
	margin-right: 0;
	margin-top: 15px
}

.platform-item-list .platform-item {
	border: 1px solid #e1e1e1;
	padding: 20px 20px 10px;
	border-radius: 3px
}

.platform-item-list .platform-item:hover {
	box-shadow: 0 0 6px rgba(0, 0, 0, .15)
}

.platform-item-list .platform-item-main {
	margin-left: 0
}

.platform-item-list .platform-item-cont {
	width: 100%
}

.platform-item-list .platform-item-hd {
	border-bottom: 1px solid #ebebeb;
	margin-bottom: 15px;
	padding-bottom: 10px
}



.platform-item-main {
	margin-left: 0
}

.platform-item-cont {
	width: 713px
}

.platform-item-btn {
	text-align: right;
	display: inline-block;
	vertical-align: middle;
	/* width: 140px */
}

.platform-item-btn {
	border-radius: 6px;
	float: right
}

.platform-item-btn {
	margin-right: 10px
}

.platform-item-btn.match-btn-wrapper {
	text-align: center
}

.platform-item-btn.match-btn-wrapper {
	border-radius: 20px;
	float: none
}



.platform-item {
	border: 1px solid #ddd;
	border-left: 4px solid #2db7f5;
	padding: 15px;
	margin-bottom: 20px;
	background: #fff;
	position: relative
}

.platform-item.finish {
	border-left-color: #aab4bf
}

.platform-item:after {
	content: "";
	clear: both;
	display: block;
	height: 0;
	font-size: 0;
	overflow: hidden
}

.platform-item-pic {
	background: #f4f4f4;
	width: 100px;
	height: 100px;
	min-width: 100px;
	line-height: 130px;
	float: left;
	overflow: hidden;
	margin-right: 10px;
	margin-top: 10px;
}

.platform-item-pic img {
	width: 100%
}

.platform-item-main {
	/* margin-left: 120px; */
	/* float: right; */
	min-width: 650px;
	display: inline-block;
}

.platform-item-cont {
	width: 500px;
	display: inline-block;
	vertical-align: middle
}

.platform-item-cont h4 {
	font-size: 18px;
	color: #3c444d;
	margin-bottom: 15px
}

.platform-item-cont h4 a {
	vertical-align: middle
}

.platform-item-cont h4 .btn-decorate {
	vertical-align: middle
}

.card-count-box .btn {
	padding: 7px 0;
	width: 70px;
	font-weight: 400
}

.card-btn-box .btn {
	padding: 0 10px;
	line-height: 28px;
	height: 28px;
	width: auto;
	margin-left: 10px;
	font-weight: 400
}

.subject-oprt-wrap .btn {
	padding: 3px 15px;
	float: right
}

.side-task-list .list-name .btn {
	float: right;
	font-size: 12px;
	color: #fff
}

.platform-mod-hd .oprt .btn {
	float: right;
	width: auto;
	padding: 5px 8px;
	margin-left: 20px
}

.self-match-table td.oprt .btn-xs {
	width: auto;
	font-size: 12px;
	padding: 4px 8px
}

.tag-rating {
	font-size: 12px;
	color: #fff;
	background: #ff7f52;
	border-radius: 4px;
	padding: 1px 5px;
	display: inline-block;
	vertical-align: middle
}

.tag-rating i {
	display: inline-block;
	vertical-align: middle;
	font-style: normal;
	font-size: 12px;
	background: #fff;
	color: #ff7f52;
	width: 14px;
	height: 14px;
	line-height: 14px;
	border-radius: 50%;
	text-align: center
}


.match-status {
	position: relative;
	display: inline-block;
	vertical-align: middle;
	background: #25bb9b;
	border-color: #25bb9b;
	color: #fff;
	font-size: 12px;
	height: 20px;
	line-height: 20px;
	margin: 0 5px;
	padding: 0 5px;
	text-align: center
}

.match-status.match-status-sm {
	font-size: 12px;
	line-height: 20px;
	height: 20px;
	padding: 0 3px
}

.match-status.match-status-sm:after {
	border-width: 10px 5px;
	right: -7px
}

.match-status:after {
	border-style: solid;
	border-color: inherit;
	border-width: 10px 8px;
	position: absolute;
	content: "";
	bottom: 0;
	right: -10px;
	border-right-color: transparent
}

.match-signup {
	background: #4ea3fa;
	border-color: #4ea3fa
}

.match-signup-end {
	background: #628a9a;
	border-color: #628a9a
}


.platform-info li {
	display: inline-block;
	min-width: 100px;
	margin: 0 20px 10px 0;
	font-size: 10px;
	color: #86909b;
	padding-left: 30px;
	background: url(//static.nowcoder.com/acm/images-acm/img/platform/icons.png) no-repeat
}

.platform-info li:last-child {
	margin-right: 0
}

.platform-info li.icon-ok-sign {
	min-width: auto;
	background: 0 0;
	vertical-align: -1px
}

.platform-info li.icon-ok-sign:before {
	font-size: 16px;
	margin-right: 10px
}

.platform-info .icon-nc-flash2 {
	background: 0 0;
	padding-left: 0
}

.platform-info .icon-nc-flash2:before {
	margin-right: 5px
}

.platform-info .user-icon {
	background-position: 0 -455px
}

.platform-info .time-icon {
	display: block;
	background-position: 0 -282px
}

.platform-info .match-time-icon {
	display: block;
	background-position: 0 -398px
}

.platform-info .joins-icon {
	background-position: 0 -226px
}

.platform-info .duration-icon {
	background-position: 0 -340px
}

.platform-info .match-count-icon {
	background-position: 0 -513px
}

.platform-info .icon-nc-join {
	background: 0 0;
	padding-left: 0
}

.platform-info .icon-nc-join:before {
	margin-right: 5px
}

.platform-countdown {
	color: #888;
	font-size: 10px;
	margin-top: 10px
}
</style>

