<template>
    <swiper class="wrapper"
        indicator-dots="true"
        autoplay="true"
        interval="3400"
        :style="{height: bannerHeight, width: bannerWidth}"
        duration="1000">
        <block v-for="(item, index) in imgUrl" :key="index">
            <swiper-item>
                <img :src="item" class="banner-img" alt="" mode="aspectFill">
            </swiper-item>
        </block>
    </swiper>
</template>

<script>
    export default {
        props: {
            bannerHeight: {
                type: String,
                default: '300rpx'
            },
            bannerWidth: {
                type: String,
                default: '100%'
            },
            imgUrl: {
                type: Array,
                default: [
                    'http://jimqing.xin/image/banner1.png',
                    'http://jimqing.xin/image/banner3.png',
                    'http://jimqing.xin/image/banner4.png',
                    'http://jimqing.xin/image/banner5.png'
                ]
            }
        },
        methods: {
        },
        mounted() {
        }
    }

</script>

<style lang="less" scoped>
    .wrapper {
        margin: .2rem auto;
        text-align: center;
        position: relative;
        overflow: hidden;
        border-radius: .08rem;

        .box {
            height: 100%;
            box-shadow: 0rpx 1rpx 4rpx rgba(0, 0, 0, 0.3),
                0 0 10rpx rgba(0, 0, 0, 0.1) inset;

            .banner-img {
                color: white;
                background-repeat: no-repeat;
                background-size: contain;
                height: 100%;
                width: 100%;
                float: left;
            }
        }
    }
</style>
