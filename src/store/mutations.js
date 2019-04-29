import {
    USER_INFO,
    USER_STATES,
    TIPS,
    SELECT_ADDRESS,
    ADDRESS_LIST,
    SET_COOKIES,
    OPEN_ID
} from './mutation-types.js';

export default {
    [USER_INFO] (state, v) {
        state.userInfo = v;
    },
    [USER_STATES] (state, v) {
        state.isLogin = v
    },
    [TIPS] (state, v) {
        state.isShowWindow = v;
    },
    [SET_COOKIES] (state, v) {
        state.cookie = v;
    },
    [SELECT_ADDRESS] (state, v) {
        state.addressId = v;
    },
    [ADDRESS_LIST] (state, v) {
        state.addressList = v;
    },
    [OPEN_ID] (state, v) {
        state.openId = v;
    }
}