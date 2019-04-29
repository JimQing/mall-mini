<template>
    <div class="bar-bottom">
        <div class="item"
            v-for="(item, index) in iconImg"
            :key="index"
            @click="onRedirect(item.address)">
            <img class="item-icon"
                :src="'../../../../../static/image/' + item.icon + '.png'"
                alt="">
            <p>{{item.word}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            iconImg: {
                type: Array,
                default: [
                    {
                        address: 'mall',
                        icon: 'nav_home',
                        word: '首页'
                    },
                    {
                        address: 'mall-cart',
                        icon: 'nav_cart',
                        word: '购物车'
                    },
                    {
                        address: 'mall-order-center',
                        icon: 'nav_order',
                        word: '订单'
                    },
                    {
                        address: 'mall-user-center',
                        icon: 'nav_user',
                        word: '用户中心'
                    }
                ]
            }
        },
        computed: {
            currPage() {
                const currPage = getCurrentPages();

                return currPage[currPage.length - 1].route.split('/')[1];
            }
        },
        methods: {
            onRedirect(path) {
                if (path === this.currPage) {
                    return;
                }
                wx.navigateTo({
                    url: '/pages/' + path + '/main'
                });
            }
        }
    }
</script>

<style lang="less" scoped>
.bar-bottom{
    display: flex;
    justify-content: center;
    align-content: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1rem;
    width: 100%;
    background: #ffffff;
    border-top: 1rpx solid #eeeeee;
    font-size: .26rem;
    color: #333333;
    z-index: 20;
    .item{
        width: 33.33%;
        padding-top: .1rem;
        .item-icon {
            width: .48rem;
            height: .48rem;
        }
    }
}
</style>
