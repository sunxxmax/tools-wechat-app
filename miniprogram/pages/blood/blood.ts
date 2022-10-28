// pages/blood/blood.ts
const bloodSwiperList = [
    {
        image: `https://www.masily.top/file/20220101/xue-01.png`,
    },
    {
        image: `https://www.masily.top/file/20220101/xue-02.png`,
    },
    {
        image: `https://www.masily.top/file/20220101/xue-03.png`,
    },
    {
        image: `https://www.masily.top/file/20220101/xue-04.png`,
    },
    {
        image: `https://www.masily.top/file/20220101/xue-05.png`,
    }
];
const bloodList = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'O', value: 'O' },
    { label: 'AB', value: 'AB' }
]
const result: any = {
    "AA": "A型、O型",
    "AB": "A型、B型、AB型、O型",
    "AO": "A型、O型",
    "AAB": "A型、B型、AB型",
    "BB": "B型、O型",
    "BO": "B型、O型",
    "BAB": "A型、B型、AB型",
    "OO": "O型",
    "OAB": "A型、B型",
    "ABAB": "A型、B型、AB型",
}
Page({
    /**
     * 页面的初始数据
     */
    data: {
        current: 1,
        autoplay: true,
        duration: 500,
        interval: 5000,
        bloodSwiperList,
        navigation: { type: 'dots-bar' },
        paginationPosition: 'right',
        bloodList: bloodList,
        father: "",
        fatherVisible: false,
        mother: "",
        motherVisible: false,
        baby: "",
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
    onClickPicker(e: any) {
        console.log(e)
        const { key } = e?.currentTarget?.dataset;
        console.log(key)
        this.setData({
            [`${key}Visible`]: true,
        });
    },
    onColumnChange(e: any) {
        console.log('picker pick:', e);
    },

    onPickerChange(e: any) {
        const { key } = e?.currentTarget?.dataset;
        console.log('picker change:', e.detail);
        this.setData({
            [`${key}Visible`]: false,
            [`${key}`]: e.detail.value
        });
        this.changeBaby()
    },
    onPickerCancel(e: any) {
        const { key } = e?.currentTarget?.dataset;

        this.setData({ [`${key}Visible`]: false });
    },
    changeBaby() {
        if (!this.data.father || !this.data.mother) {
            return;
        }

        let fam = this.data.father + this.data.mother;
        let babyBlood = result[fam];
        this.setData({ baby: babyBlood })
    }
})