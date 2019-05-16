<template>
    <div class="wrapper">
        <!-- 按钮框 -->
        <div class="btn-con">
            <div class="content" @click="onBack">
                <i-icon type="return" class="btn-icon" size="26"/> 
                <span class="red-span">{{id ? '修改' : '新增'}}收货地址</span>
            </div>
        </div>
        <!-- 内容 -->
        <div class="config-box">
            <div class="panel-box">
                <span>收件人：</span>
                <input
                    class="p-input"
                    v-model="addressInfo.receiverName"
                    placeholder="请输入收件人姓名"
                />
            </div>
            <div class="panel-box">
                <span>所在省市：</span>
                <input
                    class="p-input"
                    v-model="addressInfo.receiverProvince"
                    placeholder="请正确输入省市"
                />
            </div>
            <div class="panel-box">
                <span>详细地址：</span>
                <input
                    class="p-input"
                    v-model="addressInfo.receiverAddress"
                    placeholder="精确到门牌号"
                />
            </div>
            <div class="panel-box">
                <span>手机号：</span>
                <input
                    class="p-input"
                    v-model="addressInfo.receiverPhone"
                    placeholder="请输入11位手机号"
                />
            </div>
            <div class="panel-box">
                <span>邮政编码：</span>
                <input
                    class="p-input"
                    type="number"
                    max="5"
                    v-model="addressInfo.receiverZip"
                    placeholder="如：10010"
                />
            </div>
            <div class="btn-bottom" @click="onSubmit">
                <span>{{id ? '保存' : '新增'}}收货地址</span>
            </div>
            <div class="btn-bottom" v-if="id" @click="isShowDelete = true">
                <span>删除收货地址</span>
            </div>
        </div>
        <i-modal title="删除确认"
            :visible="isShowDelete"
            @ok="onDelete"
            @cancel="isShowDelete = false">
            <div>确认要删除该地址吗？</div>
        </i-modal>
        <i-toast id="toast"  @touchmove.stop="scrollStop" />
    </div>
</template>

<script>
import _address from '@/services/address-service.js';
import BackBtn from '@/components/mall/to-top-btn.vue';
import { $Toast } from '../../../static/iView/base/index';
export default {
    name: 'address-config',
    data() {
        return {
            id: '',
            addressInfo: {
                receiverName: '',
                receiverProvince: '',
                receiverCity: ' ', // 默认还是要有的
                receiverAddress: '',
                receiverPhone: '',
                receiverZip: ''
            },
            isShowDelete: false
        };
    },
    components: {
        BackBtn
    },
    computed: {
        addressList() {
            return this.$store.state.addressList;
        }
    },
    methods: {
        init() {
            if (!this.$root.$mp.query.id) {
                this.addressInfo = {
                    receiverName: '',
                    receiverProvince: '',
                    receiverCity: ' ', // 默认还是要有的
                    receiverAddress: '',
                    receiverPhone: '',
                    receiverZip: ''
                };
                this.id = '';
                return;
            }
            const id = this.$root.$mp.query.id;

            this.id = this.addressList[id].id;
            this.addressInfo = Object.assign(this.addressInfo, this.addressList[id]);
        },
        onRedirect() {
            wx.navigateTo({
                url: '/pages/mall-address/main'
            });
        },
        onBack() {
            wx.navigateBack({delta: 1});
        },
        onSubmit() {
            const result = this.checkVaild();
            if (!result.status) {
                $Toast({
                    content: result.msg
                });
                return;
            }
            const address = {
                receiverName: this.addressInfo.receiverName,
                receiverProvince: this.addressInfo.receiverProvince,
                receiverCity: this.addressInfo.receiverCity,
                receiverAddress: this.addressInfo.receiverAddress,
                receiverPhone: this.addressInfo.receiverPhone,
                receiverZip: this.addressInfo.receiverZip
            }

            if (!!!this.id) {
                _address.save(address).then(res=> {
                    $Toast({
                        content: '新增地址成功！'
                    });
                    _address.getAddressList().then(res=> {
                        this.$store.commit('ADDRESS_LIST', res.data.list);
                        this.onBack();
                    });
                });
            } else {
                address.id = this.id;
                _address.update(address).then(res=> {
                    $Toast({
                        content: '保存地址成功！'
                    });
                    _address.getAddressList().then(res=> {
                        this.$store.commit('ADDRESS_LIST', res.data.list);
                        this.onBack();
                    });
                });
            }
        },
        onDelete() {
            _address.deleteAddress(this.id).then(res=> {
                _address.getAddressList().then(res=> {
                    this.$store.commit('ADDRESS_LIST', res.data.list);
                    this.isShowDelete = false;
                    this.onBack();
                });
            });
        },
        checkVaild() {
            let result = {
                status : false,
                msg : '',
            };

            if(!!!this.addressInfo.receiverName){
                result.msg = '用户名不能为空';
                return result;
            }
            if(!!!this.addressInfo.receiverProvince){
                result.msg = '省市不能为空';
                return result;
            }
            if(!!!this.addressInfo.receiverAddress){
                result.msg = '详细地址不能为空';
                return result;
            }
            if(!!!this.addressInfo.receiverPhone){
                result.msg = '手机号不能为空';
                return result;
            }
            if(!!!this.addressInfo.receiverZip){
                result.msg = '邮政编码不能为空';
                return result;
            }
            //通过验证，返回正确信息
            result.status   = true;
            result.msg      = '验证通过';
            return result;
        }
    },
    onShow() {
        this.init();
    },
    mounted() {
        this.init();
    }
};
</script>

<style lang='less' scoped>
.wrapper{
    width: 100%;
    background: #fcfcfc;
    overflow: hidden;
    .btn-con{
        position: fixed;
        top: 0;
        display: flex;
        align-items: center;
        height: 1.33rem;
        width: 100%;
        font-size: 0;
        padding-left: .1rem;
        background-color: #ffffff;
        .content{
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: .34rem;
            padding-top: .4rem;
        }
    }
    .config-box{
        margin: 0 .25rem;
        margin-top: 1.33rem;
        font-size: .28rem;
        .panel-box{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 1rem;
            border-bottom: 1rpx solid #dce7a7;
            .p-input{
                display: inline-block;
                width: 75%;
                vertical-align: middle;
                border: none;
            }
        }
        .btn-bottom{
            width: 6rem;
            text-align: center;
            margin: .3rem auto;
            padding: .2rem;
            font-size: .33rem;
            border: 1rpx solid #d0e961;
            border-radius: .08rem;
        }
    }
}
</style>