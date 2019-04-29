<template>
    <div class="wrapper">
        <div class="box">
            <div class="box-item" v-for="(item, index) in guider" :key="index" @click="JumpToProduct(item.content)">
                <div class="item-img">
                    <img class="item-icon" :src="'../../../../../static/image/' + item.icon + '.png'" alt="">
                </div>
                <span>{{item.content}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                guider: [
                    {
                        icon: 'phone',
                        content: '手机'
                    },
                    {
                        icon: 'shuma',
                        content: '数码'
                    },
                    {
                        icon: 'diannao',
                        content: '电脑'
                    },
                    {
                        icon: 'bangong',
                        content: '办公'
                    },
                    {
                        icon: 'dianshi',
                        content: '电视'
                    },
                    {
                        icon: 'zhubao',
                        content: '珠宝'
                    },
                    {
                        icon: 'books',
                        content: '图书'
                    },
                    {
                        icon: 'sofa',
                        content: '家装'
                    }
                ]
            }
        },
        methods: {
            JumpToProduct(content) {
                wx.navigateTo({
                    url: '../mall-product/main?content=' + content
                })
            }
        },
    }
</script>
<style lang="less" scoped>
    .wrapper {
        /* width: 7.125rem; */
        margin: 0 auto;
    }
    .box{
        background: #ffffff;
        border: 1rpx solid #eeeeee;
        border-radius: .08rem;
        box-shadow: 0rpx 1rpx 4rpx rgba(0,0,0,0.3),
            0 0 10rpx rgba(0,0,0,0.1) inset; 
        margin: 0;
        .box-item {
            text-align: center;
            display: inline-block;
            font-size: .26rem;
            background: #ffffff;
            padding: .22rem;
            margin-bottom: .03rem;
            .item-img {
                display: block;
                /* margin-top: .325rem; */
                margin-bottom: .04rem;
                width: 1.3rem;
                height: .6rem;
                .item-icon{
                    width: .6rem;
                    height: .6rem;
                }
            }
            &:nth-of-type(1), &:nth-of-type(2), &:nth-of-type(3), &:nth-of-type(4) {
                margin-top: .03rem;
                margin-bottom: 0;
                border-bottom: 1px solid #eeeeee;
            }
            &:nth-of-type(2), &:nth-of-type(6) {
                border-left: 1px solid #eeeeee;
            }
            &:nth-of-type(3), &:nth-of-type(7) {
                border-left: 1px solid #eeeeee;
                border-right: 1px solid #eeeeee;
            }
        }
    }
</style>
    