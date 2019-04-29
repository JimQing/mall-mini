<template>
    <div class="wrapper">
        <div class="box">
            <TopNav :keyword='content' :isShowInput="false"/>
            <!-- 内容  -->
            <div class="product-box">
                <Banner :bannerHeight="bannerHeight" :imgUrl="ImgUrl"></Banner>
                <div class="content">
                    <div class="product-name">{{productDetail.name}}</div>
                    <div class="product-price">
                        Price: 
                        <span class="price">￥{{productDetail.price}}</span>
                    </div>
                    <div class="product-store">
                        Store: 
                        <span class="store">{{productDetail.stock}}</span>
                    </div>
                </div>
                <div class="content">
                    <div class="product-detail">
                        <span class="detail-title">商品详情: </span>
                        <div class="detail-box">
                            <p>{{productDetail.subtitle}}</p>
                            <div class="picture" v-for="(item, index) in ImgUrl" :key="index">
                                <img :src="item" alt="图片丢失了" srcset="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content Tips">注意：本小程序商城仅用于个人自学作品的演示！所有商品均为虚拟商品，且不会有真实交易产生！</div>
            </div>
            <div class="back" v-show="isShowBack" @click.prevent="jumpToTop">
                <i-avatar class="back-avatar" shape="square" size="large">
                    <i-icon type="packup" class="back-icon" color="#ffffff" size="32"/>
                </i-avatar>
            </div>
            <div class="product-bottom">
                <div class="collect" @click="onCollect">
                    <img src="../../../static/image/cart.png" alt="">
                </div>
                <div class="buy" @click="onBuy"><span>立即购买</span></div>
            </div>
            <i-button type="ghost" @click="handleText">这里是地板</i-button>
            <i-toast id="toast"  @touchmove.stop="scrollStop" />
        </div>
        <div class="mask" v-if="isShowMask" @touchmove.stop="scrollStop"></div>
    </div>
</template>

<script>
    import Banner from '@/components/mall/banner.vue';
    import TopNav from '@/components/mall/top-nav.vue';
    import _product from '@/services/product-service.js';
    import { $Toast } from '../../../static/iView/base/index';
    import _cart from '@/services/cart-service.js';
    import { fail } from 'assert';
    export default {
        data() {
            return {
                id: '',
                productDetail: {},
                ImgUrl: [],
                productName: '[测试学习用]Apple iPhone 7  (A1661) 128G 玫瑰金色 移动联通电信4G手机',
                content: '',
                isShowMask: false,
                isBottom: false,
                isShowBack: false,
                isCollect: false,
                bannerHeight: '650rpx'
            };
        },
        // created钩子在query拿到之前，所以报undefined，所以在mounted里边拿到
        mounted() {
            this.content = this.$root.$mp.query.content || 'null';
            this.id = this.$root.$mp.query.id || 73;
            this.getProductDetail(this.id);
            this.productDetail = {};
            this.showLoading();
        },
        onShow() {
            console.log('onShow');
        },
        components: { Banner, TopNav },
        methods: {
            showLoading () {
                $Toast({
                    content: '加载中',
                    type: 'loading',
                    duration: 0
                });
                this.isShowMask = true;
            },
            jumpToTop() {
                if (wx.pageScrollTo) {
                    wx.pageScrollTo({
                        scrollTop: 0
                    });
                    this.isShowBack = false;
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
                    })
                }
            },
            scrollStop() {},
            async getProductDetail(id) {
                const res = await _product.getProductDetail(id);

                this.productDetail = res.data;
                this.ImgUrl = this.productDetail.subImages.split(',').map(item => {
                    item = this.productDetail.imageHost + item;
                    return item;
                });
                $Toast.hide();
                this.isShowMask = false;
            },
            onBuy() {
                if (!this.isCollect) {
                    _cart.addToCart(this.id).then(res=> {
                        this.isCollect = true;
                        wx.navigateTo({
                            url: '/pages/mall-cart/main'
                        })
                    });
                } else {
                    wx.navigateTo({
                        url: '/pages/mall-cart/main'
                    });
                }
            },
            onCollect() {
                _cart.addToCart(this.id).then(res=> {
                    $Toast({
                        content: '您的商品已成功添加到购物车~'
                    });
                    this.isCollect = true;
                });
            }
        },
        // 获取滚动条当前位置
        onPageScroll(e) {
            this.isShowBack = e.scrollTop > 250;
            this.scrollPos = e.scrollTop;
        },
        // 上拉加载回调接口
        onReachBottom() {
            this.isBottom = !this.isBottom;
        }
    }
</script>

<style lang="less" scoped>
    .wrapper{
        background: ghostwhite;
        background-size: contain;
        width: 100%;
        text-align: center;
    }

    .box {
        margin: 0 auto;
        display: flex;
        flex-flow: column nowrap;
        width: 95%;
        .product-box{
            margin-top: 1.32rem;
        }
        .return-btn {
            position: absolute;
            top: .55rem;
            left: .2rem;
            display: inline-block;
            width: .65rem;
            font-size: .48rem;
            font-weight: 700;
        }
        .home-btn {
            position: absolute;
            top: .55rem;
            left: 1rem;
            display: inline-block;
            width: .65rem;
            font-size: .48rem;
            font-weight: 700;
        }
        .box-header {
            background: ghostwhite;
            margin-top: .55rem;
            margin-bottom: .25rem;
            font-size: .48rem;
            font-weight: 700;
            color: #c60023;
            text-decoration: none;
        }
        .btn-icon {
            position: relative;
            top: -.02rem;
        }
        .search-input {
            width: 95%;
            margin: 0 auto;
            height: .5rem;
            line-height: .4rem;
            font-size: .3rem;
            border: 1px solid #c60023;
            border-radius: 7px;
            background: #ffffff;
            outline: none;
        }
        .content {
            background: white;
            width: 100%;
            margin: .2rem auto;
            text-align: center;
            position: relative;
            overflow: hidden;
            box-shadow: 0 0.02rem 0.04rem 0
                rgba(0, 0, 0, .12),
                0 0.02rem 0.04rem 0 rgba(0, 0, 0, .08);
            .product-price, .product-store{
                height: .5rem;
                width: 95%;
                text-align: right;
                line-height: .5rem;
                margin: .15rem auto;
                .price {
                    font-size: .5rem;
                    color: #e7380d;
                }
                .store {
                    font-size: .33rem;
                    color: #e7380d;
                }
            }
            .product-name {
                width: 95%;
                font-size: .35rem;
                text-align: left;
                margin: .15rem auto;
                color: #c60023;
                font-weight: bold;
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
            }
            .line {
                position: relative;
                width: 95%;
                margin: 0 auto;
            }
            .line::after {
                content: " ";
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 1rpx;
                background-image: linear-gradient(0deg, transparent 50%, #eeeeee 50%);
            }
            .product-detail {
                width: 95%;
                text-align: left;
                margin: .3rem auto;
                .detail-title {
                    font-size: .36rem;
                    color: #c60023;
                    font-weight: bold;
                }
                .detail-box {
                    margin: .15rem auto;
                    font-size: .33rem;
                    .picture {
                        margin: .1rem 0;
                        img{
                            height: 625rpx;
                            width: 100%;
                        }
                    }
                    .detail-message {
                        width: 100%!important;
                    }
                }
            }
        }
        .Tips{
            width: 87%;
            font-size: .3rem;
            padding: .2rem 3%;
            color: #495060;
            font-weight: bold;
        }
        .product-bottom {
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
            border-top: 1px solid #d6c0c0;
            z-index: 50;
            .collect {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                justify-content: center;
                font-size: .6rem;
                width: 25%;
                color: #38413d;
                height: 100%;
                border-right: 1px solid #d6c0c0;
                background: #ffffff;
                img {
                    height: .65rem;
                    width: .7rem;
                }
            }
            .buy {
                display: table;
                font-size: .4rem;
                width: 75%;
                height: 100%;
                color: #b9374f;
                background: #ffffff;
            }
            span {
                display: table-cell;
                vertical-align: middle;
            }
        }
        .back {
            position: fixed;
            bottom: 1.3rem;
            right: .2rem;
            z-index: 51;
            .back-icon {
                position: relative;
                top: -.05rem;
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
    .hidden{
        overflow: hidden;
    }
</style>