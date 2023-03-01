import axios from 'axios';
import storage from '../common/storage';

import JSONbig from 'json-bigint'

// 创建一个自定义的Axios对象
const http = axios.create({
	withCredentials: true, 
    baseURL: '/goforit',
    timeout: 3000,
    transformRequest:[data => {
        return JSONbig.stringify(data)
    }],
    transformResponse:[ data => {
        return JSONbig.parse(data)
        // 为了解决前端解析带有后端19位长整型字段的时候数字损失精度
        // return JSON.parse(data.replace(/:s*([0-9]{15,})s*(,?)/g, ': "$1" $2'));
    }],
});

http.interceptors.request.use(req => {
    // 请求拦截处理
    req.headers.Authorization = storage.get('token')
    // console.log('这里是请求拦截器，我拦截了请求', req);
    return req; 
}, err => {
    console.log('在发送请求时发生错误，错误为', err);
    //这里不能直接放回err,需要按照官方说明返回一个Promise
    return Promise.reject(err);
})

// http.interceptors.response.use(res => {
//         // 响应拦截处理
//         let s = res.replace(/:s*([0-9]{15,})s*(,?)/g, ': "$1" $2')
//         console.log('响应拦截 ', s);
//         return res;
//     }, error => {
//         const err = error.toString();
// 		//按照实际的响应包进行解析，通过关键字匹配的方式
//         switch (true) {
//             case err.indexOf('Network') !== -1:
//                 console.log('后端服务器无响应或者URL错误', err);
//                 break;
//             case err.indexOf('timeout') !== -1:
//                 console.log('请求后端服务器超时！', err);
//                 break;
//         }
//         return Promise.reject(error);
//     })

//暴露Axios实例化对象，允许所有文件调用Axios
export default http;
