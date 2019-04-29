import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex)
const state = {
    userInfo: {},
    isLogin: false,
    isShowWindow: true,
    cookie: '',
    openId: '',
    addressList: [],
    addressId: 0
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});