// app.ts
export const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

App<IAppOptionExt>({
    globalData: {
        host: "http://localhost:8080/wechat",
        userInfo: undefined,
        logined: false
    },
    onLaunch() {
        // 展示本地存储能力
        // const logs = wx.getStorageSync('logs') || []
        // logs.unshift(Date.now())
        // wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                console.log("登录：" + res.code)
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            },
        })
    },
})