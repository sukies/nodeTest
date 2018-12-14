## 图片压缩
本地上传图片的时候，可先使用这个插件压缩图片，支持压缩的图片格式：image/jpeg、image/jpg、image/png、image/webp,
其他格式文件返回原文件内容

## 基础使用方法

```js
import imageCompress from '../imageCompress/index'
imageCompress({files: Files}, (res) => {
    console.log(res)
})
```

## imageCompress传入参数
imageCompress(config,function)

| type                  | 类型                | 说明          | 是否必传      |备注                     |
|:--------------------- |:-------------------:|:-------------:|:-------------:|:-----------------------:|
| config                | Object              | 配置内容      |是             |                         |
| --files               | File、Array         | 文件内容      |否             |                         |
| --options             | Number              | 文件压缩程度  |否             |0-1，大于1为0.92,默认0.85|
| --type                | String              | 转换后文件类型|否             | 可选值：jpg、jpeg、png、webp  |
| --format              | String              | 返回文件类型  |否             | 可选值：data64          |
| function              | Function            | 回调函数      |是             | 返回值res               |

```js
      imageCompress({files: dropFiles, options: 0.75,'jpg','data64'}, (res) => {
        console.log(res)
      })
```

## function(res){} 返回内容
| type                  | 类型                |备注                           |
|:--------------------- |:-------------------:|:-----------------------------:|
| data                  | File、Array         | 压缩后内容，格式同config>files|
| code                  | Number              | 1为成功，0为失败              |
| message               | Array               | 信息                          |

```js
{
    data:...,
    code:1,
    message:['图片压缩成功']
}
```











