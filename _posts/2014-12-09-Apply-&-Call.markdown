---
layout: post
title:  "Apply & Call"
date:   2014-12-09 23:18:00
categories: Javascript
---

每个Function对象都有apply和call方法，所以可以直接在函数名之后通过“.apply()”或者“.call()”的方式来调用，功能就是在指定的作用域下执行函数。

apply和call的参数有所不同。apply接受2个参数，第一个参数为要在其作用域中执行函数的对象（object），我们也可以说，将原函数绑定为object的方法(f)，不过这个方法不会一直存在，apply执行结束就会消失，所以不能通过object.f()来调用。第二个参数为一个数组，数组中的元素都是原函数的参数。
<!--more-->
<pre>
<code>
    function f(a,b,c){//假设f有三个形参a,b,c
        ...
    }
    //通过这种形式在context的作用域下调用f，a、b、c为参数
    f.apply(context,[a,b,c]);
</code>
</pre>
call的参数没有数量限制，第一个参数和apply一样，从第二个开始往后的所有参数，都作为原函数的参数。
<pre>
<code>
    function f(a,b,c){//假设f有三个形参a,b,c
        ...
    }
    //通过这种形式在context的作用域下调用f，a、b、c为参数
    f.call(context,a,b,c);
</code>
</pre>
再来说说第一个参数，函数讲在这个对象的作用域下执行。
<pre>
<code>
    function f(a){
        this.value = a;//在正常情况下调用，this指向window对象
    }
    var o = {};
    f.call(o,"a");//这种情况下，this指向对象o，所以会为o添加一个值为"a"的value属性。
</code>
</pre>

来看一个复杂点的例子，这个例子来自《编写高质量的代码：改善Javascript程序的188个建议》。
<pre>
<code>
    function r(x){
        return x;
    }
    function f(x){
        x[0] = x[0]+">";
        return x;
    }
    function o(){
        var temp = r;
        r = function(){
            return temp.apply(this,f(arguments));
        }
    }
    function a(){
        o();
        console.log(r("="));
    }
    for(var i=0;i<10;i++){
        a();
    }
</code>
</pre>
这段代码的执行结果如下图：
<img src="http://homfen.github.io/assets/images/article/3793065623.png"/>

第一遍看的时候可能有点晕，没关系，来分析下。首先，关键的一点，这里用到了闭包，在函数o内部，r是一个全局变量，temp是一个局部变量，把temp指向r指向的函数，之后把r指向另一个新建的函数，在这个函数内部又调用了temp。所以，只要这个r没有被删除，局部变量temp就会一直留在内存中。明白了这一点，接下去理解起来就轻松多了。
<pre>
<code>
    //第一次执行o
    temp = function(x){//temp1
        return x;
    }
    r = function(){
        //相当于return f(arguments);
        return temp1.apply(this,f(arguments));
    }
    //第二次执行o
    temp = function(){//temp2
        return temp1.apply(this,f(arguments));
    }
    r = function(){
        //相当于return f(f(arguments));
        return temp2.apply(this,f(arguments));
    }
    ...
    //第十次就是 f(f(f(f(f(f(f(f(f(f("=")))))))))) 
</code>
</pre>