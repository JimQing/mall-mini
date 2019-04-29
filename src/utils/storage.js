export default {
    setStorage(data) {
        wx.setStorage({
            key: data.key,
            data: data.data,
            success: function(res){
                console.log(key + ':ok');
                return typeof data.success === 'function' ? data.success(res) : '';
            },
            fail: function(err) {
                console.log(key + '(err):' + err);
            }
        })
    },
    setStorageSync(key, data) {
        return wx.setStorageSync(key, data);
    },
    getStorage(data) {
        wx.getStorage({
            key: data.key,
            success: function(res){
                return typeof data.success === 'function' ? data.success(res) : '';
            },
            fail: function(err) {
                console.log(key + '(err):' + err);
            }
        })
    },
    getStorageSync(key) {
        return wx.getStorageSync(key);
    }
}