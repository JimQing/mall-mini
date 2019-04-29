const Promise = require('es6-promise').Promise;
import store from '../store';

// 之后将这个函数挂载到vue实例上，使用this,$request去调用
export function request(params) {
    return new Promise((resolve, reject)=> {
        wx.request({
            url: params.url,
            data: params.data,
            header: {
                "Content-Type": params.method ? "application/x-www-form-urlencoded" : "application/json",
                "Cookie": store.state.cookie || ''
            },
            method: params.method || 'get',
            success(res) {
                console.log('deliverSucc:', res);
                if (res.header && res.header['Set-Cookie']) {
                    store.commit('SET_COOKIES', res.header['Set-Cookie'].split(';')[0]);
                }
                if (res.data.status === 10) {
                    return;
                }
                resolve(res.data);
            },
            error(err) {
                console.log('deliverErr:', err);
                reject(err);
            }
        })
    });
}
