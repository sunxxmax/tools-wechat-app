// pages/qrcode/qrcode.ts
import * as api from "../../api/api"
import uri = require('../../api/uri')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        textValue: '',
        btnDisabled: true,
        qrcode: {
            success: false,
            image: ''
        }
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
    textareChange(e: any) {
        this.setData({
            textValue: e.detail.value,
            btnDisabled: e.detail.value.length == 0,
            qrcode: Object.assign(this.data.qrcode, { success: false })
        })
    },
    btn() {
        wx.showLoading({ title: '加载中...', })
        this.setData({ btnDisabled: true });

        if (this.data.textValue.length <= 0) {
            wx.hideLoading();
            this.setData({ btnDisabled: false });
            wx.showToast({ title: "内容不能为空" });
            return
        }

        api.post({
            url: uri.qrcode,
            header: { "Content-Type": "application/json" },
            data: {
                context: this.data.textValue,
            },
        }).then((res: any) => {
            this.setData({
                qrcode: {
                    success: true,
                    image: res.data
                }
            })
        }).catch(error => {
            console.error("异常：", error);
            wx.showToast({ icon: 'error', title: "错误：" + error.code })
        }).finally(() => {
            this.setData({ btnDisabled: false });
            wx.hideLoading();
        })
    },

})