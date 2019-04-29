<template>
    <div class="wrapper">
        <TopNav :isShowInput="false"/>
        <!-- 按钮框 -->
        <div class="btn-con">
            <span class="red-span">订单确认</span>
        </div>
        <div class="address-box" @click="onRedirect('mall-address')">
            <div class="address-item">
                <div class="address-title"> 收货地址 </div>
                <div class="address-detail" v-if="addressList.length > 0">
                    <div class="header">{{!!!addressList[selectId].receiverCity ? addressList[selectId].receiverCity : ''}} {{addressList[selectId].receiverProvince}} ({{addressList[selectId].receiverName}}收)</div>
                    <div class="detail">{{addressList[selectId].receiverAddress}} {{addressList[selectId].receiverPhone}}</div>
                    <span>点击变更地址</span>
                </div>
                <div class="address-detail" v-else>
                    <div class="header">暂无地址</div>
                    <div class="detail">点击添加地址信息</div>
                </div>
            </div>
        </div>
        <div class="order-box">
            <div class="content" v-for="(product, index) in orderList" :key="index">
                <div class="product-box" :id='product.productId'>
                    <div class="desc">
                        <div class="img-box">
                            <img :src="imgHost + product.productImage" alt="">
                        </div>
                        <span>{{product.productName}}</span>
                    </div>
                    <div class="opera">
                        <span class="left-label">数量： {{product.quantity}}</span>
                        <span class="right-label">总价：￥{{product.totalPrice}}</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 确认订单 -->
        <i-modal title="订单确认"
            :visible="isShowDelect"
            @ok="submit"
            @cancel="isShowDelect = false">
            <div>确认订单？</div>
        </i-modal>
        <!-- 底部按钮bar -->
        <div class="total-box">
            <div class="total">
                <span>{{'总价：￥' + cartTotalPrice}}</span>
            </div>
            <div class="buy" @click="isShowDelect = true"><span>提交订单</span></div>
        </div>
        <i-toast id="toast"  @touchmove.stop="scrollStop" />
    </div>
</template>

<script>
import _user from '@/services/user-service.js';
import _order from '@/services/order-service.js';
import _address from '@/services/address-service.js';
import { $Toast } from '../../../static/iView/base/index';
import TopNav from '@/components/mall/top-nav.vue';
export default {
    name: 'buy',
    data() {
        return {
            orderList: [],
            addressList: [],
            isShowDelect: false,
            cartTotalPrice: 0,
            imgHost: 'http://onlineshoppingmall.xin:8082/'
        };
    },
    components: {
        TopNav
    },
    computed: {
        selectId() {
            return this.$store.state.addressId;
        }
    },
    methods: {
        init() {
            _order.getProductList().then(res=> {
                this.orderList = res.data.orderItemVoList;
                this.cartTotalPrice = res.data.productTotalPrice;
            });
            _address.getAddressList().then(res=> {
                this.addressList = res.data.list;
                this.$store.commit('ADDRESS_LIST', this.addressList);
            });
        },
        submit() {
            _order.creatOrder({
                shippingId : this.addressList[this.selectId].id
            }).then(res=> {
                wx.redirectTo({
                    url: '/pages/mall-order/main?orderNo=' + res.data.orderNo
                });
            });
        },
        onRedirect(path) {
            wx.navigateTo({
                url: '/pages/' + path + '/main'
            });
        }
    },
    onShow() {
        this.addressList = this.$store.state.addressList;
    },
    mounted() {
        this.init();
        // if (!this.$store.state.isLogin) {
        //     _user.login({
        //         username: 'jimqing',
        //         password: '123456'
        //     }).then(res=> {
        //         if (res.status === 0) {
        //             this.$store.commit('USER_INFO', Object.assign(res.data, this.$store.state.userInfo));
        //             this.$store.commit('USER_STATES', true);
        //             this.init();
        //         }
        //     });
        // }
    }
};
</script>

<style lang='less' scoped>
.wrapper{
    .btn-con{
        display: flex;
        width: 100%;
        margin-top: 1.2rem;
        background: #fcfcfc;
        justify-content: center;
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
    .order-box{
        margin-top: 0.3rem;
        margin-bottom: 1.3rem;
        .content{
            width: 100%;
            .product-box{
                width: 95%;
                margin: 0 auto;
                margin-bottom: .2rem;
                text-align: center;
                background: #ffffff;
                border: 1px solid #eeeeee;
                border-radius: 0.08rem;
                .desc{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 95%;
                    margin: .35rem auto;
                    letter-spacing: 1rpx;
                    padding-bottom: .35rem;
                    border-bottom: 1px solid #eeeeee;
                    .img-box{
                        height: 120rpx;
                        min-width: 120rpx;
                        margin: 0 .1rem;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    span:nth-of-type(1) {
                        font-size: .3rem;
                        text-align: left;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 3;
                        overflow: hidden;
                    }
                    span:nth-of-type(2) {
                        width: 1.3rem;
                        margin-right: .2rem;
                        color: #b1acac;
                    }
                }
                .opera{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 93%;
                    margin: .25rem auto;
                    color: #b1acac;
                    font-size: .33rem;
                    vertical-align: middle;
                }
            }
        }
    }
    .address-box{
        margin-top: 0.3rem;
        margin-bottom: 0.3rem;
        .address-item {
            width: 88%;
            margin: 0 auto;
            margin-bottom: .2rem;
            text-align: center;
            background: #ffffff;
            padding: 0.10rem 0.16rem;
            border: 0.06rem dashed #be5c6e;
            .address-title {
                font-size: .34rem;
                color: #666;
                height: .6rem;
                line-height: .6rem;
                overflow: hidden;
                margin-bottom: .2rem;
                border-bottom: 1rpx solid #eeeeee;
            }
            .address-detail {
                position: relative;
                font-size: .33rem;
                text-align: left;
                margin: .15rem;
                color: #666;
                .header{
                    letter-spacing: 1rpx;
                    height: .57rem;
                }
                .detail{
                    padding-bottom: .3rem;
                }
                span {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    font-size: .25rem;
                }
            }
        }
    }
    .total-box {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1.1rem;
        width: 100%;
        background: #eeeeee;
        z-index: 50;
        .total {
            display: table;
            text-align: left;
            font-size: .4rem;
            width: 60%;
            color: #adaaaa;
            height: 100%;
            border-right: 1px solid #d6c0c0;
            background: #ffffff;
            span{
                padding-left: .1rem;
            }
        }
        .buy {
            display: table;
            text-align: center;
            font-size: .45rem;
            width: 40%;
            height: 100%;
            color: #ffffff;
            background: #b9374f;
        }
        span {
            display: table-cell;
            vertical-align: middle;
        }
    }
}
</style>