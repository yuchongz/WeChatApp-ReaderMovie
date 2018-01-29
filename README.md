# <span style="color:#6395AE">WeChatApp-ReaderMovie</span>
### <span style="color:#6395AE">项目描述：</span>这是一个集阅读与电影于一体的微信小程序。

### <span style="color:#6395AE">开发环境：</span>[微信开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)<br />

### <span style="color:#6395AE">运行环境：</span>微信APP<br />

### <span style="color:#6395AE">项目状态：</span>开发中...

### <span style="color:#6395AE">项目结构：(更新中...) </span>        
- <span style="font-size:20px;">**pages**</span>`（页面文件夹）`
    - <span style="font-size:16px;">**welcome**</span>`（文件夹，页面初始页）`
        - welcome.wxml
        - welcome.wxss
        - welcome.js
- <span style="font-size:20px;">**images**</span>`（图片文件夹）`
- <span style="font-size:20px;">**app.js**</span>`（全局js文件）`
- <span style="font-size:20px;">**app.wxss**</span>`（全局css文件）`
- <span style="font-size:20px;">**app.json**</span>`（小程序的配置文件）`

### <span style="color:#6395AE">历史版本：</span>
      
#### <span style="color:#6395AE">2018.01.25</span> (`tag`：[initial-page](https://github.com/yuchongz/WeChatApp-ReaderMovie/tree/initial-page))：

##### 版本描述：小程序初始页的开发代码
##### 学习到的知识：
- 微信小程序的目录结构、文件类型（.wxml是编写页面结构的文件、.wxss是编写页面样式的文件、.js是编写页面逻辑的文件）；
- 微信自定义的View、Image、Text组件的应用；
- 弹性盒子布局（Flex布局）；
- 移动端分辨率及自适应单位rpx的运用.

#### <span style="color:#6395AE">2018.01.29</span> (`tag`：[post-page](https://github.com/yuchongz/WeChatApp-ReaderMovie/tree/post-page))：

##### 版本描述：新闻阅读列表页的开发代码
##### 学习到的知识：
- 微信定义的Swiper轮播图组件的使用；
- 数据绑定的知识：WXML 文件中的动态数据（使用{{}}包住数据变量名）均来自对应 js文件Page函数中的 data对象；微信的数据绑定不仅可以简单的引用数据，还可以在双大括号内进行数据的运算，并且组件的属性值也支持使用数据绑定；
- 列表渲染、条件渲染的使用；其中应注意的地方有：
	- 条件渲染：微信官方文档中说到“在框架中，使用 wx:if=‘{{condition}}’来判断是否需要渲染该代码块” ，而要注意的是，不能写成wx:if=‘false’，因为解析器会把‘false’解析成字符串，而这个字符串转换为boolean值就是true，所以要想不渲染代码块，那么就得写成wx:if=‘{{false}}’。
	- 列表渲染：如果要渲染包含多节点的结构块，需要用block包含这个结构快，并且wx:for属性用在block标签上。
- 微信的事件绑定：bind和catch绑定事件处理程序的区别是“bind事件绑定不会阻止冒泡事件向上冒泡，catch事件绑定可以阻止冒泡事件向上冒泡”。

		




