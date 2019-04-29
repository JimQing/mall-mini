<template>
    <div class="top-nav">
        <div class="return-btn" @click="toBack">
            <i-icon type="return" class="btn-icon" size="26"/>
        </div>
        <div class="home-btn" @click="toHome">
            <i-icon type="homepage_fill" class="btn-icon" size="26"/>
        </div>
        <div :class="isShowInput ? 'box-header normal' : 'box-header no-input'">Mall - mini</div>
        <!-- 搜索框 -->
        <div class="search-con" v-if="isShowInput">
            <input v-model="content" class="search-input" id="search-input" :placeholder="keyword || '请输入搜索关键字哦~~'"
                @confirm="onShow">
        </div>
    </div>
</template>
        
<script>
    export default {
        data() {
            return {
                content: ''
            };
        },
        props: {
            keyword: {
                type: String,
                default: null
            },
            isShowInput: {
                type: Boolean,
                default: true
            },
            isLoginPage: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            toBack() {
                if (this.isLoginPage) {
                    this.toHome();
                    return;
                }
                wx.navigateBack({
                    delta: 1, // 回退前 delta(默认为1) 页面
                });
            },
            toHome() {
                wx.reLaunch({
                    url: '/pages/mall/main'
                });
            },
            onShow() {
                wx.navigateTo({
                    url: '/pages/mall-product/main?content=' + this.content
                })
            }
        }
    };
</script>
    
<style lang="less" scoped>
    .top-nav{
        /* box-shadow: 0 .02rem .03rem 0 #eeeeee; */
        /* box-shadow: .05rem .04rem .2rem 0 #bdbdbd; */
    }
    .return-btn {
        position: fixed;
        top: .55rem;
        left: .2rem;
        display:inline-block;
        width: .65rem;
        font-size: .48rem;
        font-weight: 700;
        z-index: 999;
    }
    .home-btn {
        position: fixed;
        top: .55rem;
        left: 1rem;
        display: inline-block;
        width: .65rem;
        font-size: .48rem;
        font-weight: 700;
        z-index: 999;
    }
    .btn-icon {
        position: relative;
        top: -.02rem;
    }
    .box-header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: .68rem;
        background: #fcfcfc;
        font-size: .48rem;
        font-weight: 700;
        color: #c60023;
        text-align: center;
        text-decoration: none;
        /* border-bottom: 1px solid #edf2f7; */
        z-index: 20;
    }
    .normal {
        padding: .55rem 0 .8rem .25rem;
    }
    .no-input{
        padding-top: .55rem;
        padding-bottom: .05rem;
    }
    .search-con{
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
</style>