import { formatTime2 } from "../../utils/util";

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

            month: 1,
            monthText: '无数据',
            monthPercentage: 0,

            year: 1970,
            yearText: '无数据',
            yearPercentage: 0
        },
        time: '',
        countDown: 0
    },
    /**
   * 生命周期函数--监听页面加载
   */
    onLoad() {
        this.dataLoad()
        let countDown = this.remainTime4Year(this.data.date.now);
        this.setData({ countDown: countDown, })

    },

    dataLoad() {
        let now = new Date();
        let date = {
            now: now,

            day: now.getDate(),
            dayText: now.getHours() + ":" + now.getMinutes() + "~" + "23:59",
            dayPercentage: Math.round(now.getHours() / 24 * 100),

            month: now.getMonth() + 1,
            monthText: now.getDate() + "日" + '~' + "31日",
            monthPercentage: Math.round(now.getDate() / new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate() * 100),

            year: now.getFullYear(),
            yearText: this.day4Year(now) + "天" + '~' + this.days4Year(now) + "天",
            yearPercentage: Math.round(this.day4Year(now) / this.days4Year(now) * 100),
        }
        this.setData({ date: date, time: formatTime2(now) })
    },

    week4Year(date: Date) {
        let fisrtDay = new Date(date.getFullYear(), 0, 1);
        let d = Math.round((date.valueOf() - fisrtDay.valueOf()) / 86400000);
        return Math.ceil((d + ((fisrtDay.getDay() + 1) - 1)) / 7);
    },

    days4Year(date: Date) {
        let year = date.getFullYear();
        let isLeap = (0 === year % 4) && (0 === year % 100) || (0 === year % 400);
        let days = isLeap ? 366 : 365;
        return days;
    },
    // 获取今天是一年中的第几天
    day4Year(date: Date) {
        const currentYear = date.getFullYear().toString();
        // 今天减今年的第一天（xxxx年01月01日）
        const hasTimestamp = date.getTime() - new Date(currentYear).getTime();
        // 86400000 = 24 * 60 * 60 * 1000
        let hasDays = Math.ceil(hasTimestamp / 86400000);
        return hasDays;
    },
    remainTime4Year(now: Date) {
        let lastDay = new Date(now);
        lastDay.setFullYear(lastDay.getFullYear() + 1);
        lastDay.setDate(0);
        lastDay.setMonth(-1);
        lastDay.setHours(23);
        lastDay.setMinutes(59);
        lastDay.setSeconds(59);
        return lastDay.getTime() - now.getTime();
    },
    countDownChange(time: any) {
        this.dataLoad()
    }
})
