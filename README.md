# tools-wechat-app

- npm install

- project.config.json

```text
"setting": {
    ...
        "packNpmManually": true,
        "packNpmRelationList": [
            {
                "packageJsonPath": "./package.json",
                "miniprogramNpmDistDir": "./miniprogram/"
            }
        ]
    ...
}
```

-  npm i tdesign-miniprogram -S --production

- 工具 -> 构建 npm

- tsconfig.json

```
  "paths": {
      "tdesign-miniprogram/*":["./miniprogram/miniprogram_npm/tdesign-miniprogram/*"]
    }
```



