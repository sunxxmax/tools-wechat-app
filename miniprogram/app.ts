// app.ts
import * as api from "./api/api"
import uri = require('./api/uri')

export const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

App<IAppOptionExt>({
    globalData: {
        userInfo: undefined,
        logined: false,
        parse: {
            totalParse: 0,
            remainParse: 0,
        }
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
                api.get({
                    url: uri.session,
                    header: { "Content-Type": "application/x-www-form-urlencoded" },
                    data: {
                        token: res.code
                    },
                }).then((res: any) => {
                    console.info("成功：", res);
                    let data = res.data;
                    wx.setStorageSync('parse', {
                        totalParse: data.totalParse,
                        remainParse: data.remainParse,
                    })
                }).catch(error => {
                    console.error("异常：", error);
                })
            },
        })
    },
})