<template>
    <div class="wrapper">
        <TopNav :isShowInput="false"/>
        <div class="top">
            <div class="top-img"></div>
            <div class="circle" :style="getAvatarUrl">
            </div>
            <div class="nick-name">{{userInfo.nickName}}</div>
        </div>
        <div class="user-info">
            <div class="form-circle" v-for="item in list" :key="item.export" @click="onRedirect(item.export)">
                <div class="item-img">
                    <img class="item-icon" :src="'../../../../../static/image/' + item.type +'.png'" alt="">
                </div>
                <span>{{item.word}}</span>
            </div>
            <i-toast id="toast" />
        </div>
        <div class="tip">
            <p>本小程序由 JimQing 开发实现</p>
            <p>仅作为自学作品展示使用!!</p>
        </div>
    </div>
</template>

<script>
import { $Toast } from '../../../static/iView/base/index';
import TopNav from '@/components/mall/top-nav.vue';
export default {
    name: 'user_center',
    data() {
        return {
            content: 'User-Center',
            list: [
                {
                    type: 'nav_cart',
                    word: '我的购物车',
                    export: 'mall-cart'
                },
                {
                    type: 'nav_order',
                    word: '我的订单',
                    export: 'mall-order-center'
                },
                {
                    type: 'address',
                    word: '我的地址',
                    export: 'mall-address'
                },
                {
                    type: 'me',
                    word: '关于我',
                    export: ''
                }
            ]
        };
    },
    components: {
        TopNav
    },
    computed: {
        getAvatarUrl() {
            if (this.userInfo) {
                return 'background-image: url(' + this.userInfo.avatarUrl + ')';
            }
        },
        userInfo() {
            return this.$store.state.userInfo
        }
    },
    methods: {
        onRedirect(path) {
            if(!path) {
                $Toast({
                    content: '多谢客官. --Jimqing'
                });
                return;
            }
            wx.navigateTo({
                url: '/pages/' + path + '/main'
            });
        }
    },
    mounted() {
        $Toast({
            content: '加载用户信息中...',
            type: 'loading',
            duration: 0
        });
        if (this.$store.state.isLogin) {
            $Toast.hide();
        } else {
            wx.navigateTo({
                url: '/pages/mall-login/main'
            });
            $Toast.hide();
        }
    }
};
</script>

<style lang='less' scoped>
.wrapper{
    width: 100%;
    background-color: #f3f3f3;
    .top{
        height: 4.2rem;
        width: 100%;
        margin-top: .02rem; 
        margin-bottom: 2.14rem;
        box-shadow: 0 .03rem .1rem 0 #dfdede;
        background: radial-gradient(ellipse at top left, #c87f69 0%,#d8b586 57%);
        .top-img{
            width: 100%;
            height: 100%;
        }
        .circle{
            position: absolute;
            top: 3.5rem;
            left: 50%;
            transform: translateX(-50%);
            width: 1.7rem;
            height: 1.7rem;
            background-color: #c7bfb6;
            background-repeat: no-repeat;
            background-size: cover;
            border-radius: 50%;
            box-shadow: .05rem .08rem .16rem 0 #868686;
            animation: flowdown .5s ease-in;
        }
        @keyframes flowdown {
            0%{
                top: 2.5rem;
            }
            100%{
                top: 3.5rem;
            }
        }
        .nick-name{
            text-align: center;
            margin-top: 1rem;
            padding-left: .4rem;
            line-height: 3.5;
        }
    }
    .user-info{
        display: flex;
        justify-content: center;
        flex-flow: wrap;
        width: 100%;
        margin: 0 auto;
        .form-circle{
            position: relative;
            display: inline-block;
            height: 1.6rem;
            width: 1.6rem;
            padding: .2rem;
            margin: .4rem;
            text-align: center;
            font-size: .3rem;
            background-color: #ffffff;
            border: 1rpx solid #c60023;
            border-radius: 50%;
            box-shadow: 0rpx 3rpx 6rpx rgba(0,0,0,0.3),
            0 0 10rpx rgba(0,0,0,0.1) inset; 
            animation: changeSize 1s ease-in;
            .item-img {
                position: absolute;
                top: 38%;
                left: 50%;
                transform: translate(-50%, -50%);
                margin-top: .06rem;
                margin-bottom: .04rem;
                margin: 0 auto;
                .item-icon{
                    width: .6rem;
                    height: .6rem;
                }
            }
            span{
                display: inline-block;
                position: absolute;
                top: 68%;
                left: 50%;
                transform: translate(-50%, -50%);
                max-width: 1.5rem;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
        }
    }
     @keyframes changeSize {
            0%{
                transform: scale(1.1);
            }
            50%{
                transform: scale(.9);
            }
            100%{
                transform: scale(1);
            }
        }
    .tip{
        text-align: center;
        font-size: .28rem;
        color: #353232;
        opacity: .7;
        padding: .2rem .05rem;
        p{
            padding: .02rem;
        }
    }
}
</style>