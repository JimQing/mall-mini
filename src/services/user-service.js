import {request} from '../utils/deliver.js'
const baseUrl = 'https://jimqing.xin';

const User = {
    // 获取用户信息
    onRegister(listParam) {
        return request({
            url     : baseUrl + '/user/register.do',
            data    : listParam
        });
    },
    //获取用户信息
    getUserInfo(listParam){
        return request({
            url     : baseUrl + '/user/get_information.do',
            data    : listParam
        });
    },
    //用户登录
    login(userInfo){
        return request({
            url     : baseUrl + '/user/login.do',
            data    : userInfo,
            method  : 'post'
        });
    },
    //检查登录状态
    checkLogin(){
        return request({
            url     : baseUrl + '/user/get_user_info.do',
            method  : 'post'
        });
    },
    //注册
    register(userInfo){
        return request({
            url     : baseUrl + '/user/register.do',
            data    : userInfo,
            method  : 'post'
        });
    },
    //校验用户信息
    checkUsername(listParam){
        return request({
            url     : baseUrl + '/user/check_valid.do',
            data    : listParam
        });
    },
    getOpenId(code) {
        return request({
            url     : 'https://api.weixin.qq.com/sns/jscode2session?appid=wx77efe284d65afa68&secret=ebb01139b00841f6f2e3ae3a17475a77&js_code='
                + code +'&grant_type=authorization_code'
        });
    }
}
export default User;
