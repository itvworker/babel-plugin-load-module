# babel-plugin-load-module
组件库安需加载



###使用 配置.babelrc文件
```javascript 1.8
{
    "presets": [
        ["@babel/preset-env", {
            "modules": false,
            "targets": {
                "browsers": ["> 1%", "last 10 versions", "not ie <= 8"]
            }
        }]
    ],
    "plugins": [
        ["babel-plugin-load-module", {
            "cssPath": "page/dist/{key}.css", //不是必须
            "jsPath": "page/dist/{key}", //不是必须
            "public": "page/dist/assets/style.css", //公用css,可不传
            "name": "page" //包名，必须
        }]
    ]
}

```
###上面配置将转换成以下
```javascript 1.8
   import { toast, loading} from 'page';
   //将转换为
   import 'page/dist/assets/style.css';
   import toast from 'page/dist/toast';
   import 'page/dist/toast.css'
   import loading from 'page/dist/loading';
   import 'page/dist/loading.css'
   
```


