interface IAppOptionExt extends IAppOption {
    globalData: {
        host: string,
        userInfo?: WechatMiniprogram.UserInfo,
        logined: boolean,
    }
    userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
    tokenThirdValid?: boolean
}