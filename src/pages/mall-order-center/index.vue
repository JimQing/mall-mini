<template>
    <div class="wrapper">
        <!-- 按钮框 -->
        <div class="btn-con">
            <div class="content" @click="onBack">
                <i-icon type="return" class="btn-icon" size="26"/> 
                <span class="red-span">我的订单</span>
            </div>
        </div>
        <!-- 订单 -->
        <div class="order-detail">
            <div class="order-box" v-if="orderList.length > 0">
                <div class="content">
                    <p class="content-title" v-if="noPaidOrder.length > 0">>>未支付</p>
                    <div class="order-box"
                        v-for="order in noPaidOrder"
                        :key="order.orderNo"
                        @click="onRedirect('mall-order', order.orderNo)">
                        <!-- title部分 -->
                        <div class="title">
                            <span class="left-label">收件人： {{order.receiverName}}</span>
                            <span class="right-label">日期： {{order.createTime}}</span>
                        </div>
                        <div class="desc" v-for="(product, id) in order.orderItemVoList" :key="id">
                            <div class="img-box">
                                <img :src="imgHost + product.productImage" alt="">
                            </div>
                            <span>{{product.productName}}</span>
                        </div>
                        <div class="bottom">
                            <span class="left-label">订单号： {{order.orderNo}}</span>
                            <span class="right-label">总价：￥{{order.payment}}</span>
                        </div>
                    </div>
                </div>
                <div class="content">
                    <p class="content-title" v-if="paidOrder.length > 0">>>已付款</p>
                    <div class="order-box"
                        v-for="order in paidOrder"
                        :key="order.orderNo"
                        @click="onRedirect('mall-order', order.orderNo)">
                        <!-- title部分 -->
                        <div class="title">
                            <span class="left-label">收件人： {{order.receiverName}}</span>
                            <span class="right-label">日期： {{order.createTime}}</span>
                        </div>
                        <div class="desc" v-for="(product, id) in order.orderItemVoList" :key="id">
                            <div class="img-box">
                                <img :src="imgHost + product.productImage" alt="">
                            </div>
                            <span>{{product.productName}}</span>
                        </div>
                        <div class="bottom">
                            <span class="left-label">订单号： {{order.orderNo}}</span>
                            <span class="right-label">总价：￥{{order.payment}}</span>
                        </div>
                    </div>
                </div>
                <div class="content">
                    <p class="content-title" v-if="cancelOrder.length > 0">>>已取消</p>
                    <div class="order-box"
                        v-for="order in cancelOrder"
                        :key="order.orderNo"
                        @click="onRedirect('mall-order', order.orderNo)">
                        <!-- title部分 -->
                        <div class="title">
                            <span class="left-label">收件人： {{order.receiverName}}</span>
                            <span class="right-label">日期： {{order.createTime}}</span>
                        </div>
                        <div class="desc" v-for="(product, id) in order.orderItemVoList" :key="id">
                            <div class="img-box">
                                <img :src="imgHost + product.productImage" alt="">
                            </div>
                            <span>{{product.productName}}</span>
                        </div>
                        <div class="bottom">
                            <span class="left-label">订单号： {{order.orderNo}}</span>
                            <span class="right-label">总价：￥{{order.payment}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="center-word" v-else>暂无订单</div>
        </div>
        <BackBtn v-if="isShowBack"/>
        <i-toast id="toast"  @touchmove.stop="scrollStop" />
    </div>
</template>

<script>
import BackBtn from '@/components/mall/to-top-btn.vue';
import _order from '@/services/order-service.js';
import { $Toast } from '../../../static/iView/base/index';
export default {
    name: 'order_center',
    data() {
        return {
            orderList: [],
            imgHost: 'http://onlineshoppingmall.xin:8082/'
        };
    },
    components: {
        BackBtn
    },
    computed: {
        paidOrder() {
            return this.orderList.filter(order=> order.statusDesc === '已付款' || order.statusDesc === '已发货');
        },
        noPaidOrder() {
            return this.orderList.filter(order=> order.statusDesc === '未支付');
        },
        cancelOrder() {
            return this.orderList.filter(order=> order.statusDesc === '已取消');
        }
    },
    methods: {
        init() {
            _order.getList().then(res=> {
                this.orderList = res.data.list; 
            });
        },
        onRedirect(path, id = '') {
            const url = id !== '' ? '/pages/' + path + '/main?orderNo=' + id : '/pages/' + path + '/main';

            wx.navigateTo({
                url: url
            });
        },
        onBack() {
            wx.navigateBack({delta: 1});
        }
    },
    mounted() {
        this.init();
    },
    onShow() {
        this.init();
    },
    // 获取滚动条当前位置
    onPageScroll(e) {
        setTimeout(() => {
            this.isShowBack = e.scrollTop > 250;
        }, 100);
    }
};
</script>

<style lang='less' scoped>
.wrapper{
    width: 100%;
    background: #fcfcfc;
    overflow: hidden;
    .btn-con{
        position: fixed;
        top: 0;
        display: flex;
        align-items: center;
        height: 1.34rem;
        width: 100%;
        font-size: 0;
        padding-left: .1rem;
        background-color: #ffffff;
        .content{
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: .34rem;
            padding-top: .4rem;
        }
    }
    .order-detail{
        margin-top: 1.33rem;
        padding-bottom: 0.3rem;
        background: #ffffff;
        .content{
            width: 100%;
            .content-title{
                padding-bottom: .15rem;
                opacity: .9;
            }
            p{
                width: 90%;
                margin: 0 auto;
                margin-bottom: .1rem;
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
                .order-box{
                    width: 95%;
                    margin: 0 auto;
                    margin-bottom: .2rem;
                    text-align: center;
                    background: #ffffff;
                    border: 1rpx solid #eeeeee;
                    border-radius: 0.08rem;
                    box-shadow: 0 0.02rem 0.04rem 0
                        rgba(0, 0, 0, .12),
                        0 0.02rem 0.04rem 0 rgba(0, 0, 0, .08);
                    .desc{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        width: 95%;
                        margin: .35rem auto;
                        letter-spacing: 1rpx;
                        padding-bottom: .35rem;
                        border-bottom: 1rpx solid #eeeeee;
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
                    .title, .bottom{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        width: 93%;
                        margin: .25rem auto;
                        color: #b1acac;
                        font-size: .3rem;
                        vertical-align: middle;
                    }
                    .title{
                        padding-bottom: .2rem;
                        border-bottom: 1rpx solid #eeeeee;
                    }
                }
            }
        }
    }
    .center-word{
        text-align: center;
        opacity: .6;
    }
}
</style>