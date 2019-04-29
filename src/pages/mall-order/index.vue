<template>
    <div class="wrapper">
        <TopNav :isShowInput="false"/>
        <!-- 按钮框 -->
        <div class="btn-con">
            <span class="red-span">订单信息</span>
        </div>
        <div class="order-detail">
            <div class="content">
                <p>订单号: <span>{{orderNo}}</span></p>
                <p>收件人: <span>{{orderInfo.receiverName}}</span></p>
                <p>创建时间: <span>{{orderInfo.createTime}}</span></p>
                <p>订单状态: <span>{{orderInfo.statusDesc}}</span></p>
                <p>支付方式: <span>{{orderInfo.paymentTypeDesc}}</span></p>
            </div>
            <div class="order-box" v-if="orderList.length > 0">
                <div class="content">
                    <div class="product-box">
                        <div class="desc" v-for="(product, index) in orderList" :key="index">
                            <div class="img-box">
                                <img :src="imgHost + product.productImage" alt="">
                            </div>
                            <span>{{product.productName}}</span>
                        </div>
                        <div class="opera">
                            <span class="left-label">商品数量： {{orderList.length || 0}}</span>
                            <span class="right-label">总价：￥{{orderInfo.payment}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <i-button class="btn"
                v-if="orderInfo.statusDesc === '未支付'"
                type="ghost" 
                @click="submit">去支付</i-button>
            <i-button class="btn"
                v-if="orderInfo.statusDesc === '未支付'"
                type="ghost" @click="cancel">取消订单</i-button>
        </div>
        <i-toast id="toast"  @touchmove.stop="scrollStop" />
        <div class="mask" v-if="isShowMask" @touchmove.stop="scrollStop"></div>
    </div>
</template>

<script>
import _user from '@/services/user-service.js';
import _order from '@/services/order-service.js';
import { $Toast } from '../../../static/iView/base/index';
import TopNav from '@/components/mall/top-nav.vue';
export default {
    name: 'order',
    data() {
        return {
            orderList: [],
            orderInfo: {},
            addressList: [],
            orderNo: 1550998825364,
            isShowMask: false,
            imgHost: 'http://onlineshoppingmall.xin:8082/'
        };
    },
    components: {
        TopNav
    },
    methods: {
        init() {
            this.orderNo = this.$root.$mp.query.orderNo;
            if (!this.orderNo) {
                $Toast('订单参数错误！');
                return;
            }
            this.showLoading();
            _order.getOrderDetail(this.orderNo).then(res=> {
                this.orderInfo = res.data;
                this.orderList = res.data.orderItemVoList;
                $Toast.hide();
                this.isShowMask = false;
            });
        },
        showLoading () {
            $Toast({
                content: '加载中',
                type: 'loading',
                duration: 0
            });
            this.isShowMask = true;
        },
        scrollStop() {},
        submit() {
            _order.pay(this.orderNo).then(res=> {
                $Toast({
                    content: '支付成功'
                });
                this.orderInfo.statusDesc = '已付款';
            });
        },
        cancel() {
            _order.cancelOrder(this.orderNo).then(res=> {
                $Toast({
                    content: '取消成功'
                });
                wx.navigateBack({
                    delta: 1, // 回退前 delta(默认为1) 页面
                });
            });
        }
    },
    mounted() {
        this.init();
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
    .order-detail{
        padding-bottom: 0.3rem;
        background: #ffffff;
        .content{
            width: 100%;
            p{
                width: 90%;
                margin: 0 auto;
                margin-bottom: .1rem;
                padding-top: .05rem;
                font-size: .33rem;
                color: #b1acac;
                span{
                    width: 70%;
                    float: right;
                    color: #757575
                }
            }
            .btn {
                margin-bottom: .1rem;
            }
        }
        .order-box{
            margin-top: 0.3rem;
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
    }
    .mask{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #412d2d;
        opacity: .3;
        z-index: 50;
    }
}
</style>