// app.ts
App<IAppOptionExt>({
    globalData: {
        userInfo: undefined,
        is_login: false
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