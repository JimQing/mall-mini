<template>
    <div class="wrapper">
        <TopNav :isShowInput="false"/>
        <div class="title">
            <i-icon 
                type="addressbook_fill" 
                class="item-icon"
                size="32"
                color="#80848f"
            />
            <span>用户注册</span>
        </div>
        <i-panel class="panel-box">
            <span class="p-label">
                <i-icon 
                    type="mine"
                    class="item-icon"
                    size="32"
                    color="#80848f"
                />
            </span>
            <input
                class="p-input"
                v-model="username"
                placeholder="请输入用户名"
                @blur="checkOutUser"
                autofocus
            ></input>
        </i-panel>
        <i-panel class="panel-box">
            <span class="p-label">
                <i-icon
                    type="mail" 
                    class="item-icon"
                    size="32"
                    color="#80848f"
                />
            </span>
            <input
                class="p-input"
                v-model="email"
                placeholder="请输入邮箱"
            ></input>
        </i-panel>
        <i-panel class="panel-box">
            <span class="p-label">
                <i-icon 
                    type="mobilephone" 
                    class="item-icon"
                    size="32"
                    color="#80848f"
                />
            </span>
            <input
                class="p-input"
                v-model="phoneNum"
                placeholder="请输入手机号"
                type="number"
            ></input>
        </i-panel>
        <i-panel class="panel-box">
            <span class="p-label">
                <i-icon 
                    type="dynamic" 
                    class="item-icon"
                    size="32"
                    color="#80848f"
                />
            </span>
            <input 
                class="p-input code"
                v-model="code"
                placeholder="请输入验证码"
                type="number"
                maxlength="6"
            ></input>
            <i-button
                class="code-btn"
                type="success"
                size="small"
                :loading="loading"
                @click="getCode"
                >{{loading ? '获取中' : '获取验证码'}}
            </i-button>
        </i-panel>
        <div class="simple-btn register" @click="onSubmit">
            <span>注册</span>
        </div>
        <div class="desc">
        </div>
        <i-toast id="toast" />
    </div>
</template>

<script>
import { $Toast } from '../../../static/iView/base/index';
import _user from '@/services/user-service.js';
import TopNav from '@/components/mall/top-nav.vue';
export default {
    name: 'user_register',
    data() {
        return {
            username: '',
            phoneNum: '',
            email: '',
            code: '',
            loading: false,
            content: 'User-Register'
        };
    },
    computed: {
    },
    components: {
        TopNav
    },
    methods: {
        getCode() {
            this.loading = true;
            setTimeout(() => {
                this.code = '6666';
                this.loading = false;
            }, 2500);
        },
        checkVaild() {
            let result = {
                status : false,
                msg : '',
            };

            if(!!!this.username){
                result.msg = '用户名不能为空';
                return result;
            }
            if(!!!this.phoneNum){
                result.msg = '手机号不能为空';
                return result;
            }
            if(!/^1\d{10}$/.test(this.phoneNum)){
                result.msg = '手机格式不正确';
                return result;
            }
            if(!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)){
                result.msg = '邮箱格式不正确';
                return result;
            }
            //通过验证，返回正确信息
            result.status   = true;
            result.msg      = '验证通过';
            return result;
        },
        checkOutUser() {
            if (!this.username) {
                return;
            }
            // 检查用户名是否存在
        },
        onSubmit() {
            console.log('submit');
            const result = this.checkVaild();
            if (!result.status) {
                $Toast({
                    content: result.msg
                });
                return;
            }
            // 提交
            $Toast({
                content: '信息提交中...',
                duration: 0
            });
            _user.register({
                username: this.username,
                phoneNum: this.phoneNum,
                password: '',
                email: this.email,
                question: 'Not Supported',
                answer: 'Not Supported'
            }).then(res=> {
                $Toast.hide();
                $Toast({
                    content: '注册成功！'
                });
                wx.navigateBack();
            });
        }
    }
};
</script>

<style lang='less' scoped>
.wrapper{
    width: 100%;
}
.title{
    margin-top: 1.25rem;
    height: 1.3rem;
    text-align: center;
    color: #666;
    background: #f8f7f7;
    border-top: 1px solid #ddd;
    box-shadow: .05rem .04rem .2rem 0 #bdbdbd;
    span{
        line-height: 1.3rem;
    }
    .item-icon{
        position: relative;
        top: -.05rem;
        padding: .15rem;
    }
}
.panel-box{
    height: 1.3rem;
    border: 0.01rem solid #bdbdbd;
}
.p-label{
    display: inline-block;
    line-height: 1rem;
    text-align: center;
    width: 18%;
    background: #f3f3f3;
    border-right: 1px solid #bdbdbd;
}
.p-input{
    display: inline-block;
    padding-left: .2rem;
    width: 75%;
    font-size: .32rem;
    vertical-align: middle;
    background: #ffffff;
}
.code{
    width: 53%;
}
.code-btn{
    position: absolute;
    float: right;
    top: -.07rem;
    right: -.07rem;
    width: 33%;
    margin: 0;
}
.simple-btn{
    margin: .2rem;
    height: 1rem;
    font-size: .4rem;
    border: 1px solid #eeeeee;
    text-align: center;
    color: #ffffff;
    border-radius: .08rem;
    span{
        line-height: 1rem;
    }
}
.register{
    background: #a08865;
}
</style>