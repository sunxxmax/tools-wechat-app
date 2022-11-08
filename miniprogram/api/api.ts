import { config } from '../config/config'

const request = (option: RequestOption) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${config.host}${option.url}`,
            method: option.method,
            data: option.data,
            header: option.header,
            success: (res: any) => {
                let response = res.data;
                if (response.success) {
                    resolve(res.data)
                } else {
                    reject({ code: response.code, message: response.message })
                }
            },
            fail: error => {
                reject({ code: error.errno, message: error.errMsg })
            }
        })
    })
}

export const get = (option: RequestOption) => {
    return request(Object.assign(option, { method: 'GET' }))
}

export const post = (option: RequestOption) => {
    return request(Object.assign(option, { method: 'POST' }))
}

export const put = (option: RequestOption) => {
    return request(Object.assign(option, { method: 'PUT' }))
}

// 不能声明DELETE（关键字）
export const remove = (option: RequestOption) => {
    return request(Object.assign(option, { method: 'DELETE' }))
}

export const uploadFile = (option: any) => {
    return new Promise((resolve, reject) => {
        wx.uploadFile({
            url: `${config.host}${option.url}`,
            filePath: option.filePath,
            name: option.name,
            header: { "Content-Type": "multipart/form-data" },
            formData: option.formData,
            success: (res: any) => {
                let response = JSON.parse(res.data);
                if (response.success) {
                    resolve(response)
                } else {
                    reject({ code: response.code, message: response.message })
                }
            },
            fail: (error: any) => {
                reject({ code: error.errno, message: error.errMsg })
            }
        })
    })
}

export const downloadFile = (url: string) => {
    return new Promise((resolve, reject) => {
        wx.downloadFile({
            url: url,
            success(downres) {
                resolve(downres)
            },
            fail(error: any) {
                reject({ code: error.errno, message: error.errMsg })
            }
        })
    })
}

type IAnyObject = Record<string, any>

interface RequestOption {
    /** 开发者服务器接口地址 */
    url: string
    /** 请求的参数 */
    data?: string | IAnyObject | ArrayBuffer
    /** 返回的数据格式
     *
     * 可选值：
     * - 'json': 返回的数据为 JSON，返回后会对返回的数据进行一次 JSON.parse;
     * - '其他': 不对返回的内容进行 JSON.parse; */
    dataType?: 'json' | '其他'

    header?: IAnyObject
    method?:
    | 'OPTIONS'
    | 'GET'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'TRACE'
    | 'CONNECT'
    /** 需要基础库： `2.10.0`
     *
     * 超时时间，单位为毫秒。默认值为 60000 */
    timeout?: number
}

module.exports = {
    get,
    post,
    put,
    remove,
    uploadFile,
    downloadFile
}