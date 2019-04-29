<template>
    <div class="wrapper">
        <TopNav :isShowInput="false" :isLoginPage="true"/>
        <div class="title">
            <i-icon 
                type="addressbook_fill" 
                class="item-icon"
                size="32"
                color="#80848f"
            />
            <span>用户登录</span>
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
            />
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
                type="password"
                v-model="password"
                placeholder="请输入密码"
            />
        </i-panel>
        <div class="simple-btn login" @click="onSubmit">
            <span>登录</span>
        </div>
        <div class="simple-btn register" @click="onRedirect('mall-register')">
            <span>没有账户？去注册~</span>
        </div>
        <div class="desc">
        </div>
        <i-toast id="toast" />
    </div>
</template>

<script>
import { $Toast } from '../../../static/iView/base/index';
import TopNav from '@/components/mall/top-nav.vue';
import _user from '@/services/user-service.js';
export default {
    name: 'user_login',
    data() {
        return {
            username: '', // 测试号 jimqing 123456
            password: '',
            loading: false,
            content: 'User-Login'
        };
    },
    computed: {
    },
    components: {
        TopNav
    },
    methods: {
        checkVaild() {
            let result = {
                status : false,
                msg : '',
            };

            if(!!!this.username){
                result.msg = '用户名不能为空';
                return result;
            }
            if(!!!this.password){
                result.msg = '密码不能为空';
                return result;
            }
            //通过验证，返回正确信息
            result.status   = true;
            result.msg      = '验证通过';
            return result;
        },
        onRedirect(path) {
            // 页面跳转
            wx.navigateTo({
                url: '/pages/' + path + '/main'
            });
        },
        onSubmit() {
            const result = this.checkVaild();
            if (!result.status) {
                $Toast({
                    content: result.msg
                });
                return;
            }
            // 提交
            _user.login({
                username: this.username,
                password: this.password
            }).then(res=> {
                if (res.status === 0) {
                    setTimeout(() => {
                        $Toast.hide();
                        $Toast({
                            content: '登录成功'
                        });
                        this.$store.commit('USER_INFO', res.data);
                        this.$store.commit('USER_STATES', true);
                        wx.navigateBack();
                    }, 2000);
                } else {
                    $Toast.hide();
                    $Toast({
                        content: res.msg
                    });
                }
            });
            $Toast({
                content: '登录中...',
                duration: 0
            });
        }
    },
    mounted() {
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
    border: 1rpx solid #bdbdbd;
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
    background: #fcfcfc;
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
.login{
    background: #19BE6B;
}
.register{
    background: #22be70
}
</style>