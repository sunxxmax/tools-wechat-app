// pages/image/image.ts
import * as api from "../../api/api"
import uri = require('../../api/uri')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        one: {
            gridConfig: {
                column: 1,
                width: 200,
                height: 200,
            },
            btnDisabledOne: true,
            row: 1,
            column: 1,
            result: false,
            images: [
            ],
            files: [],
        },
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
    onTabsChange(event: any) {
        console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
    },

    onTabsClick(event: any) {
        console.log(`Click tab, tab-panel value is ${event.detail.value}.`);
    },

    handleSuccess(e: any) {
        const { files } = e.detail;
        let one = this.data.one;

        this.setData({
            one: Object.assign(one, { files: files, btnDisabledOne: false }),
        });
    },
    handleRemove(e: any) {
        const { index } = e.detail;
        const { files } = this.data.one;
        files.splice(index, 1);
        this.setData({
            one: Object.assign(this.data.one, { files: files }),
        });
    },
    rowChange(e: any) {
        const one = this.data.one;
        this.setData({ one: Object.assign(one, { row: e.detail.value, result: false }) })
    },
    columnChange(e: any) {
        const one = this.data.one;
        this.setData({ one: Object.assign(one, { column: e.detail.value, result: false }) })
    },

    btn() {
        wx.showLoading({ title: "loading" })
        const { one } = this.data;
        const images = this.data.one.files.map((value: any) => {
            return value.url;
        })
        if (one.row == 1 && one.column == 1) {
            this.setData({
                one: Object.assign(one, { result: true, images: images })
            })
            wx.hideLoading();
            return
        }

        api.uploadFile({
            url: uri.image,
            filePath: images[0],
            name: 'file',
            formData: { row: this.data.one.row, column: this.data.one.column },
        }).then((res: any) => {
            this.setData({ one: Object.assign(one, { result: true, images: res.data }) })
        }).catch(error => {
            console.error("异常：", error);
            wx.showToast({ icon: 'error', title: "错误：" + error.code })
        }).finally(() => {
            wx.hideLoading();
        })
    },

    download() {
        const { images } = this.data.one;
        if (images.length == 0) {
            wx.showToast({ title: "文件获取失败" });
            return;
        }
        const _this = this;

        // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.writePhotosAlbum" 这个 scope
        wx.getSetting({
            success: (res: any) => {
                if (!res.authSetting['scope.writePhotosAlbum']) {
                    wx.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success: (res: any) => {
                            //这里是用户同意授权后的回调
                            console.log("同意授权后的回调", res)
                            // 调用保存
                            _this.batchSaveImag()
                        },
                        fail: (error: any) => {
                            //这里是用户拒绝授权后的回调
                            console.log("拒绝授权后的回调", error)
                            wx.showModal({
                                title: '授权', content: '添加到相册', success: () => {
                                    wx.openSetting({
                                        success: (res: any) => { console.log("打开授权配置失败", res) },
                                        fail: (error: any) => { console.log("打开授权配置失败", error) },
                                    })
                                }
                            })
                        }
                    })
                } else {
                    // 调用保存
                    _this.batchSaveImag()
                }
            },
            fail: (error: any) => {
                console.log("获取配置失败", error)
                wx.showToast({ title: '获取配置失败' })
            },
        })
    },

    batchSaveImag() {
        const { images } = this.data.one;
        const _this = this;
        
        for (let i = 0; i < images.length; i++) {
            wx.showLoading({ title: '正在下载' + i + "/" + images.length, })
            console.log("图片url", images[i])
            api.downloadFile(images[i]).then((downres: any) => {
                _this.saveImage(downres);
            }).then((res: any) => {
                console.log("保存图片", res);
            }).catch((error: any) => {
                console.log("出现异常", error);
                wx.showToast({ icon: 'error', title: error.message })
            }).finally(() => {
                wx.hideLoading();
            })
        }
        wx.showLoading({title:'下载成功'})
    },

    saveImage(downres: any) {
        return new Promise((resolve, reject) => {
            // 保存图片到相册
            wx.saveImageToPhotosAlbum({
                filePath: downres.tempFilePath,
                success(res: any) {
                    resolve(res)
                },
                fail: (error: any) => {
                    reject({ code: error.errno, message: error.errMsg })
                }
            })

        })

    },
    showModal() {
        wx.showModal({
            title: '提示',
            content: '请授权相册权限',
            showCancel: false,
            success() {
                wx.openSetting({
                    success(openres) {
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
})