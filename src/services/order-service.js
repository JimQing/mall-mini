import {request} from '../utils/deliver.js'
const baseUrl = 'https://jimqing.xin';

const order = {
    // 获取全部订单列表
    getList() {
        return request({
            url     : baseUrl + '/order/list.do'
        });
    },
    //获取商品列表
    getProductList() {
        return request({
            url     : baseUrl + '/order/get_order_cart_product.do'
        });
    },
    creatOrder(listParam) {
        return request({
            url     : baseUrl + '/order/create.do',
            data    : listParam
        });
    },
    getOrderDetail(orderNumber) {
        return request({
            url     : baseUrl + '/order/detail.do',
            data    : {
                orderNo : orderNumber
            }
        });
    },
    cancelOrder(orderNumber) {
        return request({
            url     : baseUrl + '/order/cancel.do',
            data    : {
                orderNo : orderNumber
            }
        });
    },
    pay(orderNumber) {
        return request({
            url     : baseUrl + '/order/pay_money.do',
            data    : {
                orderNo : orderNumber
            }
        });
    }
};

export default order;