// index.ts
const swiperList = [
    {
        image: `https://www.masily.top/file/20220101/01.webp`,
    },
    {
        image: `https://www.masily.top/file/20220101/02.webp`,
    },
    {
        image: `https://www.masily.top/file/20220101/03.webp`,
    },
    {
        image: `https://www.masily.top/file/20220101/04.webp`,
    }
];

Page({
    data: {
        content: "🌈 蚁巢欢迎您，更多内容敬请期待！",
        visible: true,
        marquee: {
            speed: 40,
            loop: -1,
            delay: 0,
        },
        current: 1,
        autoplay: true,
        duration: 500,
        interval: 5000,
        swiperList,
        navigation: { type: 'dots-bar' },
        paginationPosition: 'bottom',

        date: {
            now: new Date(),

            day: 1,
            dayText: '无数据',
            dayPercentage: 0,

            week: 1,
            weekTexgt: '无数据',
            weekPercentage: 0,

            month: 1,
            monthText: '无数据',
            monthPercentage: 0,

            year: 1970,
            yearText: '无数据',
            yearPercentage: 0
        }
    },
    /**
   * 生命周期函数--监听页面加载
   */
    onLoad() {
        this.dataLoad()
    },

    dataLoad() {
        let now = new Date();
        let date = {
            now: now,

            day: now.getDate(),
            dayText: '12/24',
            dayPercentage: 0,

            week: this.week4Year(now),
            weekTexgt: '无数据',
            weekPercentage: 0,

            month: now.getMonth() + 1,
            monthText: now.getDate() + '/' + 31,
            monthPercentage: 0,

            year: now.getFullYear(),
            yearText: now.getMonth() + '/' + now.getDay(),
            yearPercentage: 0
        }
        this.setData({ date: date })
    },

    week4Year(date: Date) {
        let fisrtDay = new Date(date.getFullYear(), 0, 1);
        let d = Math.round((date.valueOf() - fisrtDay.valueOf()) / 86400000);
        return Math.ceil((d + ((fisrtDay.getDay() + 1) - 1)) / 7);
    }
})
