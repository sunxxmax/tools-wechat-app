//环境文件
import { envs } from './env'

// 基础共同的配置
let base = {
    // 小程序appid
    appid: '……',
    // 环境
    env: 'prod'
}
console.log(envs)

// 合并配置
let config = envs.prod

// 导出配置
export {
    config
} 