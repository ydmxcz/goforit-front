
import { Message } from 'view-ui-plus'


export default {
    ok(content){
        Message.success({ background: true, content: content,duration:3 });
    },

    err(content){
        Message.error({ background: true, content: content,duration:3 });
    }
}
