// pages/bmi/bmi.ts
Page({

    /**
     * 页面的初始数据
     */
    data: {
        height: 0.00,
        weight: 0.00,
        heightError: false,
        weightError: false,
        btnDisabled: true,
        bmi: '',
        level: 0
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
    onHeightInput(e: any) {
        const isNumber = /^\d+(\.\d+)?$/.test(e.detail.value) && e.detail.value > 0;
        this.setData({
            heightError: !isNumber,
            height: e.detail.value,
            btnDisabled: !(isNumber && /^\d+(\.\d+)?$/.test(this.data.weight.toString()) && this.data.weight > 0)
        });
    },
    onWeightInput(e: any) {
        const isNumber = /^\d+(\.\d+)?$/.test(e.detail.value) && e.detail.value > 0;
        this.setData({
            weightError: !isNumber,
            weight: e.detail.value,
            btnDisabled: !(isNumber && /^\d+(\.\d+)?$/.test(this.data.height.toString()) && this.data.height > 0)
        });
    },
    clac() {
        if (this.data.heightError || this.data.weightError) {
            return;
        }
        let result = this.data.weight / ((this.data.height / 100) * (this.data.height / 100));
        this.level(result);
        this.setData({
            bmi: result.toFixed(1)
        })
    },

    // 分类 BMI（kg/m2）
    // 肥胖 BMI≥28.0
    // 超重 24.0≤BMI＜28.0
    // 正常 18.5≤BMI＜24.0
    // 消瘦 BMI<18.5
    level(result: number) {
        if (result < 18.5) {
            this.setData({
                level: 1
            })
            return
        }
        if (result >= 18.5 && result < 24) {
            this.setData({
                level: 2
            })
            return
        }
        if (result >= 24 && result < 28) {
            this.setData({
                level: 3
            })
            return
        }
        if (result > 28) {
            this.setData({
                level: 4
            })
            return
        }
        this.setData({
            level: 0
        })
    }
})