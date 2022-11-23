interface IAppOptionExt extends IAppOption {
    globalData: {
        userInfo?: WechatMiniprogram.UserInfo,
        logined: boolean,
        parse: {
            totalParse: number,
            remainParse: number,
        }
    }
    userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
    tokenThirdValid?: boolean
}