<template>
    <div class="wrapper">
        <TopNav :isShowInput="false" :isShowBtn="true"/>
        <!-- 按钮框 -->
        <div class="btn-con">
            <span @click="onAllCheck">{{isAllCheck ? '取消全选' : '全选商品'}}</span>
            <span class="red-span">Cart</span>
            <span @click="onShowDeleteModal">删除商品</span>
        </div>
        <div class="cart-box" v-if="cartList.length > 0">
            <div class="content" v-for="(product, index) in cartList" :key="index">
                <div class="product-box" :id='product.productId'>
                    <div class="desc">
                        <div class="img-box">
                            <img :src="imgHost + product.productMainImage" alt="">
                        </div>
                        <span>{{product.productName}}</span>
                        <span>{{'￥' + product.productTotalPrice}}</span>
                    </div>
                    <div class="opera" slot="content">
                        <div class="price-box">
                            <input type="checkbox" class="cart-select"
                                :checked="isAllCheck || product.productChecked === 1"
                                @click="onTapCheck(product.productId, product.productChecked === 1)"/>
                            <span class="left-label">单价：￥{{product.productPrice}}</span>
                        </div>
                        <div class="opera-box">
                            <span class="count-btn minus" @click="onChangeNum(product, 'minus')">-</span>
                            <input class="count-input" :value="product.quantity" :data-max="product.productStock">
                            <span class="count-btn plus" @click="onChangeNum(product, 'plus')">+</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="center-word" v-else>您的购物车空空如也。。</div>
        <div class="total-box">
            <div class="total">
                <span>{{'总价：￥' + cartTotalPrice}}</span>
            </div>
            <div class="buy" @click="onRedirect('mall-buy')"><span>立即下单</span></div>
        </div>
        <BackBtn v-if="isShowBack"/>
        <i-modal title="删除确认"
            :visible="isShowDelete"
            @ok="onDelete"
            @cancel="isShowDelete = false">
            <div>确认要删除所选中的商品？</div>
        </i-modal>
        <i-toast id="toast"  @touchmove.stop="scrollStop" />
    </div>
</template>

<script>
import TopNav from '@/components/mall/top-nav.vue';
import BackBtn from '@/components/mall/to-top-btn.vue';
import _cart from '@/services/cart-service.js';
import { $Toast } from '../../../static/iView/base/index';
export default {
    name: 'user_center',
    data() {
        return {
            userInfo: {},
            cartList: [],
            cartTotalPrice: 0,
            imgHost: 'http://onlineshoppingmall.xin:8082/',
            isAllCheck: false,
            isShowDelete: false,
            isShowBack: false,
            checkedIds: []
        };
    },
    components: {
        TopNav,
        BackBtn
    },
    computed: {
    },
    methods: {
        onCheckCtrol() {
            if (this.isAllCheck) {
                this.isAllCheck = false;
                return;
            }
        },
        onTapCheck(id, isChecked) {
            if (isChecked) {
                _cart.unSelectProduct(id).then(res=> {
                    this.cartList = res.data.cartProductVoList;
                    this.isAllCheck = res.data.allChecked;
                    this.cartTotalPrice = res.data.cartTotalPrice;
                    const index = this.checkedIds.indexOf(id);

                    if (index > -1) {
                        this.checkedIds.splice(index, 1);
                    }
                });
            } else {
                _cart.selectProduct(id).then(res=> {
                    this.cartList = res.data.cartProductVoList;
                    this.isAllCheck = res.data.allChecked;
                    this.cartTotalPrice = res.data.cartTotalPrice;
                    this.checkedIds.push(id);
                });
            }
        },
        onAllCheck() {
            if (this.cartList.length <= 0) {
                return;
            }
            if (this.isAllCheck) {
                _cart.unSelectAll().then(res=> {
                    this.cartList = res.data.cartProductVoList;
                    this.isAllCheck = res.data.allChecked;
                    this.cartTotalPrice = res.data.cartTotalPrice;
                    this.checkedIds = [];
                });
            } else {
                _cart.selectAll().then(res=> {
                    this.cartList = res.data.cartProductVoList;
                    this.isAllCheck = res.data.allChecked;
                    this.cartTotalPrice = res.data.cartTotalPrice;
                    this.cartList.forEach(element=> {
                        if(element.productChecked === 1) {
                            this.checkedIds.push(element.productId);
                        }
                    });
                });
            }
        },
        onShowDeleteModal() {
            if (this.checkedIds.length > 0){
                this.isShowDelete = true;
            } else {
                $Toast({
                    content: '未选中任何商品'
                });
            }
        },
        onDelete() {
            if (this.checkedIds.length > 0){
                _cart.delete(this.checkedIds.join(',')).then(res=> {
                    this.cartList = res.data.cartProductVoList;
                    this.isAllCheck = res.data.allChecked;
                    this.cartTotalPrice = res.data.cartTotalPrice;
                    this.checkedIds = [];
                });
                this.isShowDelete = false;
            } else {
                $Toast({
                    content: '未选中任何商品，请选择商品后重试'
                });
            }
        },
        onChangeNum(product, type) {
            if (type === 'plus') {
                if (product.quantity >= product.productStock) {
                    $Toast({
                        content: '该商品数量已达到上限'
                    });
                    return;
                }
                product.quantity++;
            } else if (type === 'minus') {
                if (product.quantity <= 1) {
                    return;
                }
                product.quantity--;
            }
            _cart.update({
                productId: product.productId,
                count: product.quantity
            }).then(res=> {
                this.cartList = res.data.cartProductVoList;
                this.cartTotalPrice = res.data.cartTotalPrice;
            });
        },
        onRedirect(path) {
            if (this.checkedIds.length > 0){
                wx.navigateTo({
                    url: '/pages/' + path + '/main'
                });
            } else {
                $Toast({
                    content: '未选中任何商品，请选择商品后重试'
                });
            }
        },
        getCartList() {
            _cart.getCartList().then(res=> {
                if (res.data.cartProductVoList && res.data.cartProductVoList.length > 0) {
                    this.cartList = res.data.cartProductVoList;
                    this.isAllCheck = res.data.allChecked;
                    this.cartTotalPrice = res.data.cartTotalPrice;
                    this.cartList.forEach(element=> {
                        if(element.productChecked === 1) {
                            this.checkedIds.push(element.productId);
                        }
                    });
                } else {
                    this.cartList = [];
                    this.isAllCheck = false;
                    this.cartTotalPrice = 0;
                    this.checkedIds = [];
                }
            });
        }
    },
    mounted() {
        this.getCartList();
    },
    onShow() {
        console.log('onshow');
        this.getCartList();
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
                .price-box{
                    color: #b1acac;
                    font-size: .33rem;
                    vertical-align: middle;
                    .cart-select{
                        position: relative;
                        top: -.05rem;
                    }
                }
                .opera-box{
                    .left-label{
                        line-height: 56rpx;
                        color: #333;
                        margin-left: .4rem;
                    }
                    .count-input{
                        display: inline-block;
                        width: 120rpx;
                        height: 56rpx;
                        line-height: 56rpx;
                        border: 1rpx solid #ddd;
                        margin: 0 .2rem;
                        text-align: center;
                        vertical-align: middle;
                        outline: none;
                        color: #333;
                    }
                    .count-btn{
                        display: inline-block;
                        width: 65rpx;
                        height: 56rpx;
                        line-height: 53rpx;
                        border: 1rpx solid #ddd;
                        vertical-align: middle;
                        text-align: center;
                        cursor: pointer;
                        background: #fff;
                        -moz-user-select: none;
                        -webkit-user-select: none;
                        -ms-user-select: none;
                        user-select: none;
                    }
                }
            }
        }
    }
    .cart-box{
        margin-top: .3rem;
        margin-bottom: 1.3rem;
    }
    .btn-con{
        display: flex;
        width: 100%;
        margin-top: 1.2rem;
        background: #fcfcfc;
        justify-content: space-between;
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
    .center-word{
        padding: .2rem;
        text-align: center;
        opacity: .6;
    }
}
</style>