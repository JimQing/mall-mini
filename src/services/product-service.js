import {request} from '../utils/deliver.js'
const baseUrl = 'https://jimqing.xin';

const product = {
    //获取商品列表
    getProductList(listParam) {
        return request({
            url     : baseUrl + '/product/list.do',
            data    : listParam
        });
    },
    getProductDetail(productId) {
        return request({
            url     : baseUrl + '/product/detail.do',
            data    : {
                productId : productId
            }
        });
    },
    getCartList() {
        return request({
            url     : baseUrl + '/cart/list.do'
        });
    }
};

export default product;