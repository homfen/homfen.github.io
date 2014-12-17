---
layout: post
title:  "Polymer Demo:Google Map"
date:   2014-10-22 10:18:00
categories: Polymer
---

<img src="http://homfen.flynotions.com/typecho/usr/uploads/2014/10/3178265018.png"/>

最近在学习Polymer，感觉还挺有意思的。主要涉及的是Web Components方面的知识，将所需的组件封装起来，并保存到单独的html文件中，使用的时候只要将这个html文件通过link标签导入进来（像css样式一样），在适当的位置编写相应的自定义标签，就可以了，非常的方便。

先讲一下Polymer创建自定义元素的方法，

    <polymer-element name="my-counter" attributes="counter">
      <template>
        <style> /*...*/ </style>
        <div id="label"><content></content></div>
        Value: <span id="counterVal">{{counter}}</span><br>
        <button on-tap="{{increment}}">Increment</button>
      </template>
      <script>
        Polymer({
          counter: 0, // Default value
          counterChanged: function() {
            this.$.counterVal.classList.add('highlight');
          },
          increment: function() {
            this.counter++;
          }
        });
      </script>
    </polymer-element>

格式就是这样，最外面是polymer-element标签，name属性指定的就是自定义标签的名字，attributes指定的是这个自定义标签的属性。template里面有style标签，和其他一些元素，style中为元素的样式。接下来是script标签，里面就一个函数Polymer，参数是一个对象，用于初始化这个标签，counter对应标签的counter属性，并给它赋值，上面template中可以通过{{counter}}访问这个counter值，类似，{{increment}}就是这里的increment方法，那前面的“on-tap”的意思就是当这个button被按下时执行increment方法。

下面是一个小Demo，谷歌地图，通过输入经纬度来显示。

     <template>
         <style>
         #map{
             border:1px solid black;
         }
         </style>
         <paper-input id="longtitude" label="Enter longtitude"></paper-input>
         <paper-input id="latitude" label="Enter latitude"></paper-input>
         <paper-button id="getmap" on-tap="{{showMap}}" raisedbutton="" class="colored" label="go" role="button" tabindex="0" aria-label="go"></paper-button>
         <div id="map" style='width:{{width}}px;height:{{height}}px;'></div>
     </template>

模版很简单，两个paper-input，一个paper-button，一个div用于展示地图。这里用到的paper-input、paper-button，要通过link标签导入进来。

      Polymer({
          width: 500, 
          height:500,
          showMap: function() {
              var lon = this.$.longtitude.value;
              var lat = this.$.latitude.value;
              var map = this.$.map;
              var mapOptions = {
                  zoom: 8,
                  center: new google.maps.LatLng(lat, lon)
              };
              new google.maps.Map(map,mapOptions);
          }
      });

width和height指定地图的长宽，通过this.$.[id]来取得模版中的元素，获取了输入的经纬度就可以调用谷歌的方法，在id为map的div中展示地图了。

在首页，我们需要做的就是把刚刚写的html文件通过link标签import进来，不过在此之前别忘了把platform.js导入进来，这样自定义标签才能正常工作。编写一个刚刚创建的标签，

    <my-gmap width="415" height="415"></my-gmap>

这里设置了width和height属性，就是地图区域的长宽。看一下最终的效果：
![F0480E23-78B9-4229-948F-C074F8FB0DEA.png][2]
![543A2BD1-CF65-4954-8132-5A78E0138062.png][3]

源码地址：https://github.com/homfen/polymer-demo-google-map<br/>
Polymer中文社区：http://polymerchina.org


  [1]: http://homfen.flynotions.com/typecho/usr/uploads/2014/10/3178265018.png
  [2]: http://homfen.flynotions.com/typecho/usr/uploads/2014/10/1217217468.png
  [3]: http://homfen.flynotions.com/typecho/usr/uploads/2014/10/1757598925.png