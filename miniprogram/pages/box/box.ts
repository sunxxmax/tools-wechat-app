import Toast from 'tdesign-miniprogram/toast/index';

// pages/box/box.ts
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // border: {
        //     // color: '#f6f6f6',
        //     // style:'dashed'
        // },
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
    more() {
        Toast({
            context: this,
            selector: '#t-toast',
            message: '更多功能开发中',
            icon: 'check-circle',
        });
    },
})