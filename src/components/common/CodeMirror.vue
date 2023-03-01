<template>
    <div class="in-coder-panel">
        <textarea style="height: 100% !important;" ref="textarea" v-model="code"></textarea>
    </div>
</template>

<script>
import {
    reactive, defineComponent,
    toRefs, getCurrentInstance,
    onMounted, onBeforeUnmount, watch, ref
} from 'vue'


// 引入全局实例
import _CodeMirror from 'codemirror/lib/codemirror'

// 核心样式
import 'codemirror/lib/codemirror.css';

// 主题样式
import 'codemirror/theme/darcula.css'
import 'codemirror/theme/idea.css'
import 'codemirror/theme/eclipse.css'
import 'codemirror/theme/xq-light.css'
import 'codemirror/theme/solarized.css'


// codemirror 官方其实支持通过 /addon/mode/loadmode.js 和 /mode/meta.js 来实现动态加载对应语法高亮库
// 但 vue 貌似没有无法在实例初始化后再动态加载对应 JS ，所以此处才把对应的 JS 提前引入
// import 'codemirror/mode/clike/clike.js'
// import 'codemirror/mode/r/r.js'
// mode
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/go/go';
import 'codemirror/mode/python/python';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/vue/vue';
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

import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/javascript-hint'
import 'codemirror/addon/hint/xml-hint'
import 'codemirror/addon/hint/sql-hint'
import 'codemirror/addon/hint/anyword-hint'


// 尝试获取全局实例
const CodeMirror = window.CodeMirror || _CodeMirror
let coder = null // 编辑器实例

export default defineComponent({
    name: 'CodeMirror',
    props: {
        value: {
            type: String,
            default: ''
        },
        heightSize: {
            type: Number,
            default: 500
        },
        scene: {
            type: String,
            default: 'edit' // add: 新增； edit: 编辑； look: 查看
        },
        eventType: {
            type: String,
            default: 'blur' // 可用事件'change', 'blur'等等；具体参考codemirror文档
        },
        theme: {
            type: String,
            default: 'darcula' // 编辑器主题色
        },
        language: {
            type: String,
            default: 'text/x-go' // 编辑器主题色
        }
    },
    setup(props, { emit }) {
        const { proxy } = getCurrentInstance();

        // 动态设置编辑器高度
        watch(() => proxy.heightSize, (newValue, oldValue) => {
            coder.setSize('auto', newValue + 'px')
        })

        watch(() => props.language, (newValue, oldValue) => {
            coder.setOption('mode', newValue)
        })

        watch(() => props.theme, (newValue, oldValue) => {
            coder.setOption('theme', newValue)
        })
        // console.log(props.language,props.theme);

        const data = reactive({
            code: props.value, // 内部真实的内容

            options: {
                theme: props.theme,//'solarized',
                mode: props.language,
                readOnly: false,
                tabSize: 4, // 制表符
                indentUnit: 4, // 缩进位数
                lineNumbers: true,
                ineWiseCopyCut: true,
                viewportMargin: 1000,
                autofocus: true,
                autocorrect: true,
                spellcheck: true,
                specialCharPlaceholder: function (ch) {
                    let token = document.createElement("span");
                    let content = ".";
                    token.className = "cm-invalidchar";
                    if (typeof content == "string") {
                        token.appendChild(document.createTextNode(content));
                    }
                    token.title = /* "\u" +*/ ch.charCodeAt(0).toString(16);
                    token.setAttribute("aria-label", token.title);
                    return token
                },
                extraKeys: {
                    Tab: (cm) => {
                        if (cm.somethingSelected()) {      // 存在文本选择
                            cm.indentSelection('add');    // 正向缩进文本
                        } else {                    // 无文本选择
                            cm.replaceSelection(Array(cm.getOption("indentUnit") + 1).join(" "), "end", "+input");  // 光标处插入 indentUnit 个空格
                        }
                    },
                },
                lint: false,
                // 代码折叠
                gutters: [
                    "CodeMirror-lint-markers",
                    "CodeMirror-linenumbers",
                    "CodeMirror-foldgutter"
                ],
                lineWrapping: false,
                foldGutter: true, // 启用行槽中的代码折叠
                autoCloseBrackets: true, // 自动闭合符号
                autoCloseTags: true,
                matchTags: { bothTags: true },
                matchBrackets: true, // 在光标点击紧挨{、]括号左、右侧时，自动突出显示匹配的括号 }、]
                styleSelectedText: true,
                styleActiveLine: true,
                autoRefresh: true,
                highlightSelectionMatches: {
                    minChars: 2,
                    trim: true,
                    style: "matchhighlight",
                    showToken: false
                },
                hintOptions: {
                    completeSingle: false
                }
            },
            // 初始化
            initializeCodeMirror: () => {
                // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
                coder = CodeMirror.fromTextArea(proxy.$refs.textarea, data.options)
                // const h = 
                coder.setSize('auto', props.heightSize + 'px')

                // 此处也可使用'change'事件，不过每次书写的过程中都会触发，为了提高性能，故默认使用'blur'
                coder.on(props.eventType, coder => {
                    emit('update:value', coder.getValue())
                })

                // 简单的代码补全代码补全 
                coder.on("inputRead", (cm, obj) => {
                    if (obj.text && obj.text.length > 0) {
                        let c = obj.text[0].charAt(obj.text[0].length - 1)
                        if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
                            cm.showHint({ completeSingle: false })
                        }
                    }
                })
            },

        })
        onMounted(() => {
            data.initializeCodeMirror()
        })
        onBeforeUnmount(() => {
            coder.off(props.eventType)
        })
        return {
            ...toRefs(data),
        }
    }
})
</script>

<!-- 不要添加scoped标签，也不要删除.CodeMirror -->
<style >
.in-coder-panel {
    flex-grow: 1;
    display: flex;
    position: relative;
}

.in-coder-panel .CodeMirror {
    flex-grow: 1;
    text-align: left !important;
    z-index: 1;
}

.in-coder-panel .CodeMirror .CodeMirror-code {
    line-height: 20px;
}
</style>