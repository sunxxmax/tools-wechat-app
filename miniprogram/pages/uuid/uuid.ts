// pages/uuid/uuid.ts
import * as api from "../../api/api"
import uri = require('../../api/uri')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        btnDisabled: false,
        count: 1,
        uuids: []
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
    stepperChange(e: any) {
        this.setData({
            count: e.detail.value
        })
    },
    generate() {
        wx.showLoading({ title: '加载中...', })
        this.setData({ btnDisabled: true });
        api.post({
            url: uri.uuid,
            method: "POST",
            header: { "Content-Type": "application/json" },
            data: {
                count: this.data.count,
            },
        }).then((res: any) => {
            this.setData({
                uuids: res.data,
            })
        }).catch(error => {
            console.error("异常：", error)
            wx.showToast({ icon: 'error', title: "错误：" + error.code })
        }).finally(() => {
            this.setData({ btnDisabled: false });
            wx.hideLoading();
        })
    },
    onIconTap(e: any) {
        var value = e.currentTarget.dataset
        wx.setClipboardData({
            data: value.item
        })
    },
})