<template>
    <div class="back" @click.prevent="jumpToTop">
        <i-avatar class="back-avatar" shape="square" size="large">
            <i-icon type="packup" class="back-icon" color="#ffffff" size="32" />
        </i-avatar>
    </div>
</template>
    
<script>
    export default {
        methods: {
            jumpToTop() {
                if (wx.pageScrollTo) {
                    wx.pageScrollTo({
                        scrollTop: 0
                    });
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
                    })
                }
            }
        }
    }
</script>
    
<style lang="less" scoped>
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
</style>