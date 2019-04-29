<template>
    <div class="wrapper">
        <i-toast id="toast" />
        <div class="box">
            <div class="box-header">Mall - mini</div>
            <div class="search-con">
                <input v-model="content" class="search-input" id="search-input" placeholder="请输入您想要搜索的商品！" @confirm="onShow">
            </div>
            <BackBtn v-if="isShowBack"/>
            <Banner></Banner>
            <Guide></Guide>
            <showCase></showCase>
            <Product :atBottom="isBottom" :productTitle="productTitle" :productInfo="product"></Product>
            <BottomNav></BottomNav>
        <i-button class="more-btn" type="ghost" @click="handleText">不能再往下了哦。</i-button>
        </div>
        <div class="window" v-if="isShowWindow" @touchmove.stop="scrollStop">
            <p>注意</p>
            <p>本小程序商城仅用于个人自学作品的演示！所有商品均为虚拟商品，且不会有真实交易产生！</p>
            <i-button class="more-btn" 
                hover-class="more-btn-hover"
                type="ghost" 
                open-type="getUserInfo" 
                @getuserinfo="getLoginInfo">了解并使用</i-button>
        </div>
        <div class="mask" v-if="isShowWindow" @touchmove.stop="scrollStop"></div>
    </div>
</template>

<script>
    import Banner from '@/components/mall/banner.vue';
    import showCase from '@/components/mall/showCase.vue';
    import BackBtn from '@/components/mall/to-top-btn.vue';
    import BottomNav from '@/components/mall/bottom-nav.vue';
    import Guide from '@/components/mall/guide.vue';
    import Product from '@/components/mall/product.vue';
    import _user from '@/services/user-service.js';
    import _storage from '@/utils/storage.js';
    import {
        $Toast
    } from '../../../static/iView/base/index';
    export default {
        data() {
            return {
                userData: {},
                content: '',
                isBottom: false,
                isShowBack: false,
                productTitle: '花样生活',
                product: {
                    keyword: 'A',
                    orderBy: 'default',
                    pageNum: 1,
                    pageSize: 20
                }
            }
        },
        computed: {
            isShowWindow() {
                return this.$store.state.isShowWindow;
            }
        },
        components: {
            Banner,
            Guide,
            Product,
            BottomNav,
            BackBtn,
            showCase
        },
        methods: {
            checkLogin() {
                let openid = _storage.getStorageSync('openid');
                let _this = this;

                if (!openid) {
                    wx.login({
                        success: function(res) {
                            _user.getOpenId(res.code).then(res=> {
                                console.log('获取新openid:' + res.openid);
                                _storage.setStorageSync('openid', res.openid);
                                _this.$store.commit('OPEN_ID', openid);
                            });
                        }
                    });
                } else {
                    this.$store.commit('OPEN_ID', openid);
                    console.log('存储了老的openid', openid);
                }
            },
            onShow() {
                wx.navigateTo({
                    url: '../mall-product/main?content=' + this.content
                })
            },
            getLoginInfo(e) {
                const userInfo = JSON.parse(e.mp.detail.rawData);

                for (let key in userInfo) {
                    this.userData[key] = userInfo[key];
                }
                this.$store.commit('USER_INFO', this.userData);
                this.$store.commit('TIPS', false);
            },
            scrollStop() {}
        },
        // 获取滚动条当前位置
        onPageScroll(e) {
            setTimeout(() => {
                this.isShowBack = e.scrollTop > 250;
            }, 100);
        },
        // 上拉加载回调接口
        onReachBottom() {
            this.isBottom = !this.isBottom;
        },
        created() {
            this.checkLogin();
            // 后门 getLoginInfo函数独立，切记
            if (!this.$store.state.isLogin) {
                _user.register({
                    username: this.$store.state.openId + '_wx',
                    phoneNum: '11111111111',
                    password: '123456',
                    email: this.$store.state.openId + '@email.com',
                    question: 'Not Supported',
                    answer: 'Not Supported'
                }).then(res=> {
                    _user.login({
                        username: this.$store.state.openId + '_wx',
                        password: '123456'
                    }).then(res=> {
                        if (res.status === 0) {
                            this.userData = res.data;
                            this.$store.commit('USER_INFO', res.data);
                            this.$store.commit('USER_STATES', true);
                        }
                    });
                });
            }
        }
    }

</script>

<style lang="less" scoped>
    .wrapper {
        background: ghostwhite;
        background-size: contain;
        width: 7.5rem;
        text-align: center;
    }

    .box {
        display: flex;
        flex-flow: column nowrap;
        width: 95%;
        margin: 0 auto;
        margin-top: 2rem;

        .box-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            padding: 55rpx 0 80rpx 25rpx;
            height: .68rem;
            background: #fcfcfc;
            font-size: .48rem;
            font-weight: 700;
            color: #c60023;
            text-align: left;
            text-decoration: none;
            border-bottom: 1px solid #edf2f7;
            z-index: 20;
        }

        .search-con {
            position: fixed;
            top: 1.39rem;
            width: 95%;
            z-index: 20;

            .search-input {
                margin: 0 auto;
                height: .5rem;
                line-height: .4rem;
                font-size: .3rem;
                border: 1px solid #c60023;
                border-radius: 7px;
                background: #ffffff;
                outline: none;
            }
        }

        .back {
            position: fixed;
            bottom: 1.3rem;
            right: .3rem;
            z-index: 999;

            .back-icon {
                position: relative;
                top: -.05rem;
            }
        }

        .more-btn {
            margin-bottom: 1rem;
        }
        .more-btn-hover{
            position: relative;
            top: 3rpx;
            left: 3rpx;
            margin-bottom: 1rem;
            box-shadow:0 0 16rpx rgba(0, 0, 0, .1) inset;
        }
    }
    .window{
        position: absolute;
        top: 50%;
        left: 50%;
        color: #495060;
        font-size: .28rem;
        font-weight: bold;
        background: white;
        width: 6rem;
        margin: .2rem auto;
        padding: .3rem .35rem;
        padding-bottom: .15rem;
        text-align: center;
        transform: translate(-50%, -50%);
        border: 1px solid #eeeeee;
        border-radius: .08rem;
        z-index: 51;
        p {
            &:nth-of-type(1) {
                font-size: .44rem;
                color: #c60023;
                padding-bottom: .1rem;
            }
            margin-top: .15rem;
            padding-bottom: .2rem;
        }
    }
        
    .auth-page {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        text-align: center;
        background: #fcfcfc;
        z-index: 999;
        p {
            margin-top: 2rem;
            .auth-btn{
                width: 80%;
                margin: 0 auto;
                margin-top: 2rem;
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

</style>
