<template>
    <div class="wrapper">
        <div class="box">
            <HTitle :headerText="productTitle"></HTitle>
            <div class="product-flow"  v-if="isShowProduct">
                <div class="product-column" v-for="(arr, fIndex) in waterflow" :key="fIndex">
                    <div class="item" v-for="(items, index) in productList" :key="index">
                        <div
                        v-if="index%2 === 0 && fIndex === 0"
                        class="item__content item__content--large"
                        @click="handleClickShowDetail(index)"
                        >
                            <div class="item-img"><img :src="items.imageHost + items.mainImage" alt=""></div>
                            <div class="price-con">
                                <span class="price">￥{{items.price}}</span>
                            </div>
                            <div class="content">
                                {{items.name}}
                            </div>
                        </div>
                        <div
                        v-else-if="index%2 !== 0 && fIndex === 1"
                        class="item__content item__content--medium"
                        @click="handleClickShowDetail(index)"
                        >
                            <div class="item-img"><img :src="items.imageHost + items.mainImage" alt=""></div>
                            <div class="price-con">
                                <span class="price">￥{{items.price}}</span>
                            </div>
                            <div class="content">
                                {{items.name}}
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="!isShowProduct" class="error-content">{{msg}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import HTitle from './header';
    import _product from '@/services/product-service.js';
    export default {
        data() {
            return {
                isShowProduct: false,
                msg: '加载中...',
                waterflow: ['', ''],
                productList: [],
                productTitle: '默认商品列表'
            }
        },
        props: ['atBottom', 'productTitle', 'productInfo'],
        components: { HTitle },
        methods: {
            async getProductList() {
                const res = await _product.getProductList(this.productInfo);

                if(res.data.list.length) {
                    this.productList = res.data.list;
                    this.isShowProduct = true;
                } else {
                    this.isShowProduct = false;
                    this.msg = '您所搜索的商品可能不存在哦...';
                }
                this.$emit('done', this.isShowProduct);
            },
            handleClickShowDetail(index) {
                wx.navigateTo({
                    url: '../mall-product-detail/main?id=' + this.productList[index].id
                });
            }
        },
        mounted() {
            this.getProductList();
        },
        onUnload() {
            console.log('onUnload');
        },
        beforeDestory() {
            console.log('beforeDestory');
        },
        // 订阅者模式
        watch: {
            // 到底部时触发接口添加商品item 相当于pc页面上的下一页接口按钮
            atBottom() {
                // this.productList.push({});
            },
            productInfo() {
                this.getProductList();
            }
        }
    }
</script>
<style lang="less" scoped>
    .wrapper {
        background: white;
        margin: .2rem auto;
        text-align: center;
        position: relative;
        border: 1px solid #eeeeee;
        border-radius: .08rem;
        box-shadow: 0rpx 1rpx 4rpx rgba(0,0,0,0.3),
            0 0 10rpx rgba(0,0,0,0.1) inset; 
    }

    .box {
        padding-top: .1rem;

        /* waterflow */
        .product-flow {
            display: flex;
            flex-direction: row;
            margin: 0 auto;
            margin-top: -.2rem;
            width: 100%;
        }

        .product-column {
            display: flex;
            flex-flow: column wrap;
            width: 50%;
            margin: .06rem;
        }

        .item {
            box-sizing: border-box;
            counter-increment: item-counter;
        }

        .item__content {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            font-size: 40rpx;
            background: #ffffff;
            border: 1px solid #ebecee;
            box-sizing: border-box;
            margin-top: 12rpx;
            margin-bottom:5rpx;
            color: #18314F;
            .item-img {
                background: no-repeat ghostwhite;
                background-size: cover;
                height: 75%;
                width: 100%;
                img {
                    height: 100%;
                    width: 100%;
                }
            }
            .price-con {
                height: 5%;
                width: 95%;
                margin-top: .15rem;
                text-align: left;
                line-height: .36rem;
                span {
                    font-size: .36rem;
                    color: #e7380d;
                }
            }
            .content {
                width: 95%;
                /* height: 17%; */
                color: #666;
                text-align: left;
                font-size: 22rpx;
                margin-bottom: 12rpx;
                /* display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3; */
                text-decoration: none;
            }
        }

        .item__content--medium {
            /* height: 5.05rem; */
            .item-img {
                height: 3.3rem;
            }
            .content {
                position: relative;
                top: .1rem;
            }
        }

        .item__content--large {
            /* height: 5.30rem; */
            .item-img {
                height: 3.3rem;
            }
            .content {
                position: relative;
                top: .1rem;
            }
        }

        .error-content{
            display: inline-block;
            margin: 20rpx auto;
        }
    }
</style>