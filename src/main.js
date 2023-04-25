import { computed, createApp } from 'vue'
import App from './App.vue'

import router from './router/index.js'
import './assets/css/global.css'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import store from './store'


//  导入vue-md-editor组件
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
// import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
// import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// import VueMarkdownEditor from '@kangc/v-md-editor';
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn';
// 表情插件
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';
// highlightjs
import hljs from 'highlight.js';

const katexPlugin = createKatexPlugin();

// VMdPreview配置 
VMdPreview
	//  支持主题和代码高亮
	.use(githubTheme, { Hljs: hljs, })
	// 使用解析katex公式（数学公式）的插件
	.use(katexPlugin);

import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor';
import '@kangc/v-md-editor/lib/style/codemirror-editor.css';
// import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
// import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
// import hljs from 'highlight.js';

// codemirror 编辑器的相关资源
import Codemirror from 'codemirror';
// mode
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/go/go';
import 'codemirror/mode/python/python';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/vue/vue';
import 'codemirror/mode/shell/shell';
// edit
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchbrackets';
// placeholder
import 'codemirror/addon/display/placeholder';
// active-line
import 'codemirror/addon/selection/active-line';
// scrollbar
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
// style
import 'codemirror/lib/codemirror.css';


// echarts
import echarts from './plugin/echarts';

VMdEditor.Codemirror = Codemirror;
VMdEditor.use(githubTheme, {
	Hljs: hljs,
}).use(katexPlugin).use(createEmojiPlugin());


const app = createApp(App)
// 挂载echarts
app.config.globalProperties.$echarts = echarts

app.use(router)
	.use(store)
	.use(ViewUIPlus)
	.use(VMdPreview)
	// .use(Codemirror)
	.use(VMdEditor)
	// .use(VueCalendarHeatmap)
	.mount('#app')
