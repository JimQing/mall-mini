<template>
    <div class="wrapper">
        <div class="box">
            <TopNav :keyword='product.keyword'/>
            <!-- 内容  -->
            <div class="product-box">
                <div class="header-line"></div>
                <Product :atBottom="isBottom"
                    :productTitle="productTitle"
                    :productInfo="product"
                    @done="loadSucc"></Product>
            </div>
            <div class="back" v-show="isShowBack" @click.prevent="jumpToTop">
                <i-avatar class="back-avatar" shape="square" size="large">
                    <i-icon type="packup" class="back-icon" color="#ffffff" size="32"/>
                </i-avatar>
            </div>
            <i-toast id="toast"  @touchmove.stop="scrollStop" />
            <div class="mask" v-if="isShowMask" @touchmove.stop="scrollStop"></div>
        </div>
    </div>
</template>

<script>
    import Product from '@/components/mall/product.vue';
    import TopNav from '@/components/mall/top-nav.vue';
    import { $Toast } from '../../../static/iView/base/index';
    export default {
        data() {
            return {
                product: {},
                isShowBack: false,
                isShowMask: false,
                isBottom: false
            }
        },
        components: { Product, TopNav },
        // created钩子在query拿到之前，所以报undefined，所以在mounted里边拿到
        mounted() {
            this.product = {
                keyword: this.$root.$mp.query.content || '手机',
                orderBy: 'default',
                pageNum: 1,
                pageSize: 20
            };
            // 展示loadinga
            $Toast({
                content: '加载中',
                type: 'loading',
                duration: 0
            });
            this.isShowMask = true;
        },
        methods: {
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
                    });
                }
            },
            loadSucc(flag) {
                $Toast.hide();
                this.isShowMask = false;
                if (!flag) {
                    $Toast({
                        content: '您所搜索的商品可能不存在哦~'
                    });
                }
            },
            scrollStop() {}
        },
        // 上拉加载回调接口
        onReachBottom() {
            this.isBottom = !this.isBottom;
        },
        // 获取滚动条当前位置
        onPageScroll(e) {
            this.isShowBack = e.scrollTop > 250;
            this.scrollPos = e.scrollTop;
        },
        computed: {
            productTitle() {
                return this.product.keyword ? 'Mall - ' + this.product.keyword : 'Mall - 商品';
            }
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
        margin-top: 2rem;
        .header-line {
            position: relative;
            width: 75%;
            margin: .3rem auto;
        }
        .header-line::after {
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 1rpx;
            background-image: linear-gradient(0deg, transparent 50%, #605697 50%);
        }
        .back {
            position: fixed;
            bottom: .5rem;
            right: .3rem;
            z-index: 999;
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
</style>