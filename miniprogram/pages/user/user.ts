// pages/user/user.ts
import { defaultAvatarUrl } from '../../app'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        defaultAvatarUrl: defaultAvatarUrl,
        userInfo: {},
        hasUserInfo: false,
        parse: {
            totalParse: 0,
            remainParse: 0,
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        const userInfo = wx.getStorageSync('userInfo');
        this.setData({ userInfo: userInfo, hasUserInfo: wx.getStorageSync('logined') })

        const parse = wx.getStorageSync('parse');
        this.setData({ parse: parse })

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
    developing() {
        wx.showToast({ icon: 'none', title: '开发中···' })
    },
    toLogin() {
        wx.navigateTo({ url: '/pages/login/login' })
    }
})