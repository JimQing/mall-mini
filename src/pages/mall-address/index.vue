<template>
    <div class="wrapper">
        <TopNav :isShowInput="false" :isShowBtn="true"/>
        <!-- 按钮框 -->
        <div class="btn-con">
            <span class="red-span">我的收货地址</span>
        </div>
        <div class="address-item" v-for="(item, index) in addressList" :key="index">
            <div class="left" @click="onChangeAddress(index)">
                <p>{{item.receiverAddress}}&ensp;{{item.receiverCity}}&ensp;{{item.receiverProvince}}</p>
                <span>{{item.receiverName}} </span><span>{{item.receiverPhone}}</span>
            </div>
            <div class="right" @click="onRedirect('mall-address-config', index)">
                <i-icon type="editor" size="26"/>
            </div>
        </div>
        <div class="btn-bottom" @click="onRedirect('mall-address-config')">
            <span>+ 新增收货地址</span>
        </div>
        <BackBtn v-if="isShowBack"/>
        <i-toast id="toast"  @touchmove.stop="scrollStop" />
    </div>
</template>

<script>
import _user from '@/services/user-service.js';
import _address from '@/services/address-service.js';
import TopNav from '@/components/mall/top-nav.vue';
import BackBtn from '@/components/mall/to-top-btn.vue';
import _cart from '@/services/cart-service.js';
import { $Toast } from '../../../static/iView/base/index';
export default {
    name: 'address',
    data() {
        return {
            addressList: []
        }
    },
    components: {
        TopNav,
        BackBtn
    },
    methods: {
        onRedirect(path, id = '') {
            const url = id !== '' ? '/pages/' + path + '/main?id=' + id : '/pages/' + path + '/main';

            wx.navigateTo({
                url: url
            });
        },
        onChangeAddress(id) {
            const pages = getCurrentPages();
            const previousPage = pages[pages.length - 2];

            if (previousPage.__route__ === 'pages/mall-user-center/main') {
                return;
            }
            this.$store.commit('SELECT_ADDRESS', id);
            wx.navigateBack({delta: 1});
        },
        getAddressList() {
            if(this.$store.state.addressList.length > 0) {
                this.addressList = this.$store.state.addressList;
                return;
            } else {
                _address.getAddressList().then(res=> {
                    this.addressList = res.data.list;
                    this.$store.commit('ADDRESS_LIST', this.addressList);
                });
            }
        }
    },
    // 获取滚动条当前位置
    onPageScroll(e) {
        setTimeout(() => {
            this.isShowBack = e.scrollTop > 250;
        }, 100);
    },
    onShow() {
        this.getAddressList();
    }
};
</script>

<style lang='less' scoped>
.wrapper{
    width: 100%;
    .btn-con{
        display: flex;
        width: 100%;
        margin-top: 1.2rem;
        background: #fcfcfc;
        justify-content: center;
        border-bottom: 1rpx solid #eeeeee;
        span {
            color: #333;
            font-size: .34rem;
            padding: .25rem .2rem;
        }
        .red-span{
            font-weight: 700;
            color: #c60023;
        }
    }
    .btn-bottom{
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1rem;
        width: 100%;
        z-index: 50;
        border-top: 1rpx solid #eeeeee;
        span{
            display: block;
        }
    }
    .address-item{
        display: flex;
        justify-content: space-around;
        padding: .25rem;
        font-size: .33rem;
        color: #9b9292;
        background: #fcfcfc;
        border-bottom: 1rpx solid #eeeeee;
        p{
            margin-bottom: .1rem;
        }
        .left{
            width: 83%;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            span:nth-of-type(2) {
                margin: 0 .2rem;
            }
        }
        .right{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 16%;
        }
    }
}
</style>