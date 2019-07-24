# mpvue小程序开发

### 踩坑记录
常见的坑/注意事项|如何填坑|参考资料
---|:--:|---:
如何取消特定页面底部tabbar|根目录下app.json->tabBar->list不配置的页面都不会出现tabbar
如何跳转到没有tabbar的页面|navigateTo({url:'跳转页面对应url'})，与使用switchTab跳转tab页相比, navigateTo会在顶部自动生成回退上一页按钮，而switchTab没有。 
iview-weapp的输入框的数据绑定`value="{{ value1 }}"`报错|改用`:value="value1"`,需要注意的是:value或者v-model=value这两种写法都不支持数据双向绑定，需要手动监听@change事件，通过`e.target.detail.value`拿到当前input框内容，再存入data()中|
iview的输入框在模拟器中无法输入|设置maxLength属性|[CSDN](https://blog.csdn.net/qq_36761787/article/details/87265300#commentBox) 
新增页面一定要在app.json中的pages属性中注册||
顶部的状态栏/导航条/标题等属性的配置，只有在app.json中才需要添加"window"|| 
使用flex布局实现左侧width固定（width:固定值），右侧width自适应（flex：1），如果右侧内容超长时，会压缩左侧的元素，导致左侧的width不起作用|在父元素上添加overflow:hidden| 
保存时markdown被自动格式化了！|没有合适的解决方案，只能先禁用eslint再保存markdown|
新增页面，重新`npm run dev`之后报错`Page is not constructed because it is not found.`|执行`npm run build`, 之后再执行`npm run dev`
如何本地调试|在微信开发者工具=>设置=>项目设置=>取消勾选【不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书】，就可以本地调试了，本地的koa后台开发参见[koa后台项目](https://github.com/littleluckly/wojushenzhen_backen_koa)
