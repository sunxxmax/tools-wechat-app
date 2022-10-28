interface IAppOptionExt extends IAppOption {
    globalData: {
        userInfo?: WechatMiniprogram.UserInfo,
        is_login: false,
    }
    userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
    tokenThirdValid?: boolean
}