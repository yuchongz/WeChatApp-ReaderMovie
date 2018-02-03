# <span style="color:#6395AE">WeChatApp-ReaderMovie</span>
### <span style="color:#6395AE">项目描述：</span>这是一个集阅读与电影于一体的微信小程序。

### <span style="color:#6395AE">开发环境：</span>[微信开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)<br />

### <span style="color:#6395AE">运行环境：</span>微信APP<br />

### <span style="color:#6395AE">项目状态：</span>开发中...

### <span style="color:#6395AE">项目结构：(更新中...) </span>        
- <span style="font-size:20px;">**pages**</span>`（页面文件夹）`
    - <span style="font-size:16px;">**welcome**</span>`（文件夹，页面初始页）`
    -  <span style="font-size:16px;">**posts**</span>`（文件夹，新闻阅读列表页）`
    	-  <span style="font-size:12px;">**posts-detail**</span>`（文件夹，文章详情页）`
- <span style="font-size:20px;">**images**</span>`（图片文件夹）`
- <span style="font-size:20px;">**app.js**</span>`（全局js文件）`
- <span style="font-size:20px;">**app.wxss**</span>`（全局css文件）`
- <span style="font-size:20px;">**app.json**</span>`（小程序的配置文件）`

### <span style="color:#6395AE">历史版本：</span>
      
#### <span style="color:#6395AE">**2018.01.25**</span> (`tag`：[initial-page](https://github.com/yuchongz/WeChatApp-ReaderMovie/tree/initial-page))：

<strong>版本描述：</strong>小程序初始页的开发代码<br />

<strong>学习到的知识：</strong><br />

- 微信小程序的目录结构、文件类型（.wxml是编写页面结构的文件、.wxss是编写页面样式的文件、.js是编写页面逻辑的文件）；
- 微信自定义的View、Image、Text组件的应用；
- 弹性盒子布局（Flex布局）；
- 移动端分辨率及自适应单位rpx的运用.

#### <span style="color:#6395AE">**2018.01.29**</span> (`tag`：[post-page](https://github.com/yuchongz/WeChatApp-ReaderMovie/tree/post-page))：

<strong>版本描述：</strong>新闻阅读列表页的开发代码<br />

<strong>学习到的知识：</strong><br />

- 微信定义的Swiper轮播图组件的使用；
- 数据绑定的知识：WXML 文件中的动态数据（使用{{}}包住数据变量名）均来自对应 js文件Page函数参数对象中的 data对象；微信的数据绑定不仅可以简单的引用数据，还可以在双大括号内进行数据的运算，并且组件的属性值也支持使用数据绑定；
- 列表渲染、条件渲染的使用；其中应注意的地方有：
	- 条件渲染：微信官方文档中说到“在框架中，使用 wx:if=‘{{condition}}’来判断是否需要渲染该代码块” ，而要注意的是，不能写成wx:if=‘false’，因为解析器会把‘false’解析成字符串，而这个字符串转换为boolean值就是true，所以要想不渲染代码块，那么就得写成wx:if=‘{{false}}’。
	- 列表渲染：如果要渲染包含多节点的结构块，需要用block包含这个结构快，并且把wx:for属性用在block标签上。
- 微信的事件绑定：bind和catch绑定事件处理程序的区别是“bind事件绑定不会阻止冒泡事件向上冒泡，catch事件绑定可以阻止冒泡事件向上冒泡”。

#### <span style="color:#6395AE">**2018.02.03**</span> (`tag`：[post-detail-page](https://github.com/yuchongz/WeChatApp-ReaderMovie/tree/post-detail-page))：

<strong>版本描述：</strong>文章详情页的开发代码<br />

<strong>学习到的知识：</strong><br />

- template的使用；
- 微信缓存的使用，我们可以在缓存中存入一些信息，以便调取使用而不必向服务器发送请求，但需要注意的是，不应把重要的信息存入缓存中，以防用户换设备导致重要信息丢失，并且微信缓存是用户隔离的，意思是同一设备不同用户缓存信息并不会共享；
- 数据绑定补充知识：setData 函数用于将数据从逻辑层发送到视图层（异步），同时改变对应的 this.data 的值（同步），所以使用setData能动态地更新数据并且能够马上反映到对应的视图层中，实现无需dom操作也能动态改变视图层；
- button组件和onShareAppMessage 函数的使用；
- 音乐播放API的使用；
- 小程序注册函数APP的使用，可向App()的参数对象中的globalData对象放入全局数据，可供全局使用；到目前为止我已习惯了注册页面的Page函数，而页面的生命周期是进入到该页面到离开该页面，因此当生命周期完结，该页面的所有数据将会被清除，但若遇上像本例中的音乐播放情景，在音乐播放过程中离开页面，音乐不会停止而是继续播放，但再次进入该页面，播放按钮并不会变成暂停按钮，因为上次的数据已被清除，页面无法从上次数据中获得有关音乐播放的信息，但若在globalData对象存入有关音乐播放的信息，再次进入页面时还是可以获取到这些信息，因为全局数据是要在退出小程序时才会被清除。

#### <span style="color:#6395AE">**2018.02.03**</span> ：

<strong>版本描述：</strong>处理文章详情页的bug<br />

<strong>bug描述：</strong>点击进入一个文章详情页，点击播放音乐，接着离开这个页面，此时音乐仍在播放，但该页面已卸载，该页面的数据都已清除，而接着再次进入同一个页面，操作音乐播放器的暂停按钮，发现页面上的音乐图案并没有变化，仍是播放状态。<br />

<strong>原因：</strong>经查，发现我把有关音乐播放的几个事件处理函数wx.onBackgroundAudioPlay、wx.onBackgroundAudioStop、wx.onBackgroundAudioPause写在了页面操作音乐播放按钮的事件处理函数musicPlay中，导致只有点击那个按钮有关音乐播放的三个事件才会被绑定上我写的事件处理函数。

<strong>解决办法：</strong>把wx.onBackgroundAudioPlay、wx.onBackgroundAudioStop、wx.onBackgroundAudioPause这三个事件处理函数单独拎出来放在函数bindMusicEvent里，再在onLoad函数中调用这个函数。
