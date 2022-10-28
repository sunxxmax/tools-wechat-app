import Toast from "tdesign-miniprogram/toast/index";

// pages/video/video.ts
Page({

    /**
     * 页面的初始数据
     */
    data: {
        url: '',
        urlError: false,
        disable: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    parse() {
        if (!this.data.url) {
            Toast({
                context: this,
                selector: '#t-toast',
                message: '请提供有效的链接！',
                icon: 'check-circle',
            });
        }
    },
    onUrlInput(e: any) {
        const isUrl = /^https?:\/\/.+/.test(e.detail.value) && e.detail.value.length > 0;
        this.setData({
            urlError: !isUrl,
            disable: !isUrl,
            url: e.detail.value
        });
    }
})