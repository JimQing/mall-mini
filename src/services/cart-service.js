import {request} from '../utils/deliver.js'
const baseUrl = 'http://happymmall.com';

const Cart = {
    // 获取购物车列表
    getCartList() {
        return request({
            url     : baseUrl + '/cart/list.do'
        });
    },
    // 添加到购物车
    addToCart(productId) {
        return request({
            url     : baseUrl + '/cart/add.do?productId=' + productId + '&count=1'
        });
    },
    // 获取购物车数量
    getCartCount() {
        return request({
            url     : baseUrl + '/cart/get_cart_product_count.do'
        });
    },
    // 选中状态的处理
    selectProduct(productId) {
        return request({
            url     : baseUrl + '/cart/select.do?productId=' + productId
        });
    },
    // 取消选中状态的处理
    unSelectProduct(productId) {
        return request({
            url     : baseUrl + '/cart/un_select.do?productId=' + productId
        });
    },
    // 全选的处理
    selectAll() {
        return request({
            url     : baseUrl + '/cart/select_all.do'
        });
    },
    // 非全选
    unSelectAll() {
        return request({
            url     : baseUrl + '/cart/un_select_all.do'
        });
    },
    // 删除购物车商品
    delete(productIds) {
        return request({
            url     : baseUrl + '/cart/delete_product.do?productIds=' + productIds
        });
    },
    // 更新购物车数量
    update(productInfo) {
        return request({
            url     : baseUrl + '/cart/update.do?productId=' + productInfo.productId
                + '&count=' + productInfo.count
        });
    }
};

export default Cart;