<template>
    <div class="box">
        <div class="header-line"></div>
        <div class="header-title">
            <i-icon type="like_fill" size="28" color="#c60023" />
            <span>{{headerText}}</span>
        </div>
    </div>
</template>
    
<script>
    export default {
        data() {
            return {
                headerText: ''
            };
        },
        props: ['headerText']
    }
</script>
    
<style lang="less" scoped>
    .box{
    }

    .header-line {
        position: relative;
        width: 75%;
        margin: .4rem auto;
    }

    .header-line::after {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(0deg, transparent 50%, #605697 50%);
    }

    .header-title {
        position: relative;
        top: -.28rem;
        display: inline-block;
        width: 2.8rem;
        background: #ffffff;

        span {
            margin-right: .14rem;
            position: relative;
            top: 5rpx;
        }
    }
</style>