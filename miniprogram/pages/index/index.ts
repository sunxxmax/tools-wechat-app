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
        content: "更多内容开发中，请敬请期待！",
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
    }
})
