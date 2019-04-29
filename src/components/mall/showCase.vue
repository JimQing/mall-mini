<template>
    <div class="wrapper">
        <div class="box shadow">
            <img src="../../../static/image/showCase1.jpg"
                class="banner-img"
                alt="">
        </div>
        <div class="box slip-banner">
            <img src="../../../static/image/showCase2.jpg"
                class="banner-img left-img" alt="">
            <img src="../../../static/image/showCase3.jpg"
                class="banner-img right-img" alt="">
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>

<style lang="less" scoped>
    .wrapper {
        margin: .2rem auto;
        text-align: center;
        position: relative;
        border-radius: .08rem;
        width: 100%;
        .box {
            width: 100%;
            height: 2.7rem;
            margin-bottom: .2rem;

            .banner-img {
                background-repeat: no-repeat;
                background-size: contain;
                height: 100%;
                width: 100%;
                float: left;
            }

            .left-img {
                width: 40%;
                margin-right: 2%;
                border-radius: .08rem;
            }
            .right-img {
                width: 58%;
                border-radius: .08rem;
            }
            &:nth-last-of-type(1) {
                margin-bottom: 0;
            }
        }
        .shadow{
            box-shadow: 0rpx 1rpx 4rpx rgba(0, 0, 0, 0.3),
                0 0 10rpx rgba(0, 0, 0, 0.1) inset;
        }
        .slip-banner{
            height: 2.2rem;
        }
    }
</style>
