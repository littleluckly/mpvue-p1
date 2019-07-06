# mpvue-p1

### 踩坑记录
常见的坑/注意事项|如何填坑|参考资料
---|:--:|---:
如何取消特定页面底部tabbar|根目录下app.json->tabBar->list不配置的页面都不会出现tabbar
如何跳转到没有tabbar的页面|navigateTo({url:'跳转页面对应url'})，与使用switchTab跳转tab页相比, navigateTo会在顶部自动生成回退上一页按钮，而switchTab没有。 
iview的输入框的数据绑定value="{{ value1 }}"报错|改用:value="value1"|
iview的输入框在模拟器中无法输入|设置maxLength属性|[CSDN](https://blog.csdn.net/qq_36761787/article/details/87265300#commentBox)
新增页面一定要在app.json中的pages属性中注册||
顶部的状态栏/导航条/标题等属性的配置，只有在app.json中才需要添加"window"||
