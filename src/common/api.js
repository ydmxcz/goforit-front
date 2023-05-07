import http from '../plugin/axios';
import msg from './msg';
import BigNumber from '_bignumber.js@9.1.1@bignumber.js';
import store from '/src/store/index.js'


const handleThumbBlog = async (blogId, isThumbsUp) => {
    const { data: res } = await http.post('/blog/thumbsup', {
        id: blogId,
        thumbed: isThumbsUp,
        userId: BigNumber(store.getters.userInfo.id)
    })
    if (res.code != 200) {
        msg.err(res.msg)
        return
    }
    for (let index = 0; index < blogList.value.length; index++) {
        const element = blogList.value[index];
        if (element.id == blogId) {
            element.isThumbsUp = isThumbsUp ? 0 : blogId
            if (!element.thumbsUpNum) {
                element.thumbsUpNum = 0
            }
            element.thumbsUpNum = (isThumbsUp ? element.thumbsUpNum - 1 : element.thumbsUpNum + 1)
            break;
        }
    }

}

const hello = () => {
    console.log(store);
    console.log('fuck you!');
}


export default {
    handleThumbBlog,
    hello
}