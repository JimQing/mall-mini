<template>
    <div class="wrapper">
       body
    </div>
</template>
<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // 调用登录接口
    // wx.login({
    //     success: (res) => {
    //         console.log('login', res);
    //         wx.getUserInfo({
    //             success: (res) => {
    //                 this.$root.userInfo = res.userInfo;
    //                 console.log('userInfo', res);
    //             }
    //         })
    //     }
    // })

    // console.log('app created and cache logs by setStorageSync')
  }
}
</script>

<style>
page{
    background-color: #f8f8f8;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
