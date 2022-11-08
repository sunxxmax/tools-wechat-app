// pages/base64/base64.ts
import * as api from "../../api/api"
import uri = require('../../api/uri')

Page({
    /**
     * 页面的初始数据
     */
    data: {
        inputValue: '',
        checkedValue: 0,
        base64: false,
        result: ''
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
    radioChange(e: any) {
        this.setData({
            base64: false,
            result: '',
            checkedValue: e.detail.value[0]
        })
    },
    inputChange(e: any) {
        const isEmpty = e.detail.value == 0;
        this.setData({ inputError: isEmpty, inputValue: e.detail.value });
    },
    inputclear() {
        this.setData({ inputValue: '' })
    },
    btn() {
        wx.showLoading({ title: "loading" })
        api.post({
            url: uri.base64,
            header: { "Content-Type": "application/json" },
            data: { type: this.data.checkedValue, context: this.data.inputValue },
        }).then((res: any) => {
            this.setData({base64: true,result: res.data,})
        }).catch(error => {
            console.error("异常：", error);
            wx.showToast({ icon: 'error', title: "错误：" + error.code })
        }).finally(() => {
            wx.hideLoading();
        });
    },
})