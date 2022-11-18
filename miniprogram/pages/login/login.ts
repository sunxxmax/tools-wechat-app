// pages/login/login.ts
import { defaultAvatarUrl } from '../../app'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        nickname: '',
        avatarUrl: defaultAvatarUrl,
        theme: wx.getSystemInfoSync().theme,
        btnDisabled: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        wx.onThemeChange((result) => {
            this.setData({
                theme: result.theme
            })
        })
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
    onChooseAvatar(e: any) {
        const { avatarUrl } = e.detail
        this.setData({ avatarUrl, })
    },
    inputChange(e: any) {
        let btnShow = e.detail.value && e.detail.value.length > 0;
        this.setData({ nickname: e.detail.value, btnDisabled: !btnShow })
    },
    btn() {
        wx.setStorageSync('userInfo', {
            avatarUrl: this.data.avatarUrl,
            nickName: this.data.nickname
        })
        wx.switchTab({
            url: "/pages/user/user", success: (res: any) => {
                var page = getCurrentPages().pop();
                if (page == undefined || page == null) return;
                page.onLoad();
            }
        });
    }
})