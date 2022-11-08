// pages/video/video.ts
import * as api from "../../api/api"
import uri = require('../../api/uri')

Page({
    /**
     * 页面的初始数据
     */
    data: {
        url: '',
        urlError: false,
        btnDisabled: true,
        video: {
            success: false,
            title: '',
            videoUrl: '',
            musicUrl: '',
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
    onUrlInput(e: any) {
        const isUrl = /^https?:\/\/.+/.test(e.detail.value) && e.detail.value.length > 0;
        this.setData({
            urlError: !isUrl,
            btnDisabled: !isUrl,
            url: e.detail.value
        });
    },
    parse() {
        api.post({
            url: uri.video,
            method: "POST",
            header: {
                "Content-Type": "application/json"
            },
            data: {
                link: this.data.url,
            },
        }).then((res: any) => {
            this.setData({
                video: { success: true, title: res.data.title, videoUrl: res.data.videoUrl, musicUrl: res.data.musicUrl }
            })
        }).catch(error => {
            console.error("异常：", error);
            wx.showToast({ icon: 'error', title: "错误：" + error.code })
        }).finally(() => {
            this.setData({ btnDisabled: false });
            wx.hideLoading();
        })
    },
    download() {
        let url = this.data.video.videoUrl;
        if (!url) {
            wx.showToast({ title: "文件获取失" });
            return;
        }
        const _this = this;
        wx.showLoading({ title: '加载中...', })
        wx.downloadFile({
            url: url,
            success(downres) {
                _this.saveVideo(downres);
            },
            fail(res: any) {
                wx.hideLoading();
                console.log("下载失败" + res.errMsg)
                wx.showToast({ title: "下载失败，请稍后再试！" });
            }
        })
    },
    saveVideo(downres: any) {
        let _this = this;
        console.log("开始保存")
        // 保存图片到相册
        wx.saveVideoToPhotosAlbum({
            filePath: downres.tempFilePath,
            success(res) {
                wx.hideLoading()
                wx.showToast({ title: "下载成功！" });
            },
            fail(err) {
                console.log("保存失败！" + err.errMsg)
                wx.hideLoading()
                if (err.errMsg === "saveVideoToPhotosAlbum:fail:auth denied"
                    || err.errMsg === "saveVideoToPhotosAlbum:fail auth deny"
                    || err.errMsg === "saveVideoToPhotosAlbum:fail authorize no response") {
                    // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
                    _this.showModal();
                }
            }
        })
    },
    showModal() {
        wx.showModal({
            title: '提示',
            content: '请授权保存到相册',
            showCancel: false,
            success() {
                wx.openSetting({
                    success(openres) {
                        console.log("openres", openres)
                        if (openres.authSetting['scope.writePhotosAlbum']) {
                            console.log('获取权限成功，再次点击图片即可保存')
                        } else {
                            console.log('获取权限失败，无法保存到相册哦~')
                        }
                    },
                    fail(failerr) {
                        console.log("failerr", failerr)
                    }
                })
            }
        })
    },
    inputclear() {
        this.setData({
            btnDisabled: true,
            video: Object.assign(this.data.video, { success: false })
        })
    }
})