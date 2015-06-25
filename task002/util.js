function isArray(arr){
	if(arr instanceof Array){
		return true;
	}else{
		return false;
	}
}
function isFunction(fun){
	if(fun instanceof Function){
		return true;
	}else{
		return false;
	}
}
	//深度拷贝函数，其实就是值传递
function cloneObject(srcobj){
	var tarobj=new Object();
	for(var key in srcobj){//判断对象中是否继续为对象
		tarobj[key]=typeof srcobj[key]==='object'?cloneObject(srcobj[key]):srcobj[key];
	}
	return tarobj;
}
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
//第一种方法，遍历，将没有的插入临时数组
function uniqArray1(arr) {
    var n=[];
    for(var i=0;i<arr.length;i++){
    	//如果当前项已经保存到了临时数组，则跳过，否则加入
    	if(n.indexOf(arr[i])==-1){
    		n.push(arr[i]);
    	}
    }
    return n;
}
//第二种方法，使用哈希表
function uniqArray2(arr){
	var n={},//哈希表
		r=[];//零时数组
	for(var i=0;i<arr.length;i++){
		if(n[arr[i]]==null){//如果哈希表中没有，则添加到哈希表，且进入临时数组
			n[arr[i]]=true;
			r.push(arr[i]);
		}
	}
	return r;
}
//第三种方法，先排序，再比较邻接部分
function uniqArray3(arr){
	arr.sort();
	var r=[arr[0]];
	for(var i=1;i<arr.length;i++){
		if(arr[i]!=r[r.length-1]){//由于已经经过了排序，所以相邻的是相同的
			r.push(arr[i]);
		}
	}
	return r;
}
//自定义去除缩进函数
function trim(str){
	var reg=/^\s+|\s+&/g;
	var newstr=	str.replace(reg,"");
	return newstr;
}
//遍历数组，针对数组中每一个元素执行fn操作，并将数组索引和元素作为参数传递
function each(arr,fn){
	for(var i=0;i<arr.length;i++){
		if(fn.length==2){//根据函数参数的个数不同采取不同的执行
			fn(arr[i],i);
		}else if(fn.length==1){
			fn(arr[i]);
		}
	}
}
//获得一个对象里第一层元素的数量，返回一个整数
function getObjectLength(obj){
	var i=0;
	for(var key in obj){
		if(typeof obj[key]!=="object"){
			i++;
		}
	}
	return i;
}
//判断是否为邮箱地址
function isEmall(emailStr){
	var reg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g;
	if(emailStr.match(reg)){return true;}
	else {return false;}
}
//判断是否为手机号
function isMobilePhone(phone){
	var reg=/^1(35|36|37|56|82|89)\d{8}$/g;
	if(phone.match(reg)){return true;}
	else{return false;}
}
//
//
//DOM操作练习
//
//
// 为element增加一个样式名为newClassName的新样式
function addClass(element,newClassName){
	var list=[];//如果直接将list=element.classList的话，由于类型错误，不能使用indexOf方法
	for(var i=0;i<element.classList.length;i++){
		list.push(element.classList[i]);
	}
	if(list.indexOf(newClassName)==-1){
		element.classList.add(newClassName);
	}
}
// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
	var list=[];//如果直接将list=element.classList的话，由于类型错误，不能使用indexOf方法
	for(var i=0;i<element.classList.length;i++){
		list.push(element.classList[i]);
	}
	if(list.indexOf(oldClassName)!=-1){ 
 		element.classList.remove(oldClassName);
 	}
}
// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    if(element.parentNode===siblingNode.parentNode){
    	return true;
    }else{return false;}
}
// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
	var pos=element.getBoundingClientRect();//获取元素距离浏览器窗口的距离
    return({x:pos.left,y:pos.top});
}
// 实现一个简单的Query
function $findChilds(parentNode, text)
{
    //如果不传入父节点的话，默认为body
    if(parentNode == undefined)
        parentNode = document.body;
    var childNodes = parentNode.childNodes;
    var results = [];
    //子节点大于零才循环
    if(childNodes.length > 0)
    {
        var length = childNodes.length;
        //循环查找符合text的节点
        for(var i=0;i<length;++i)
        {
            //三种情况，className，id， tagName
            switch(text.substr(0, 1))
            {
            case '.':
                //这两种:parentNode.getElementsByClassName,parentNode.all
//都是后来加上的，如果浏览器这两种方法都不支持，那就只能暴力递归了
                if(parentNode.getElementsByClassName)
                    return parentNode.getElementsByClassName(text.substr(1));
                else if(parentNode.all)
                {
                    var finded = [];
                    var jlength = parentNode.all.length;
                    for(var j=0;j<jlength;++j)
                        if(parentNode.all[j].className == text.substr(1))
                            finded.push(parentNode.all[j]);
                    return finded;
                }
                //以上两种方法都不支持，直接判断
                if(childNodes[i].className == text.substr(1))
                    results.push(childNodes[i]);
                break;
            case '#':
                return [document.getElementById(text.substr(1))];
            default:
                return parentNode.getElementsByTagName(text);
            }
            //判断完后，把当前子元素的子元素传入$findChilds进行递归查找，返回的结果直接和现在的结果合并
            results = results.concat($findChilds(childNodes[i], text));
        }
    }
    return results;
}  

String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, '');
}  
//这里定义选择器方法
function $mini(text)
{

    //按照空格分割参数
    var values = text.trim().split(" ");
    var length = values.length;//需要查询的参数的个数
    //如果只有一个选择参数的话，就直接调用dom方法返回结果。
    if(length == 1)
        switch(values[0].substr(0, 1))
        {
        case "#":
            return document.getElementById(values[0].substr(1));
        case ".":
            if(document.getElementsByClassName)
                return document.getElementsByClassName(values[0].substr(1));
        default:
            return document.getElementsByTagName(values[0]);
        }
    //每次迭代都会产生许多符合参数的结果节点,这里结果节点的名称为parentNodes，第一次循环默认为body
    var parentNodes = [document.body];
    //外层循环为迭代每个传入的参数
    for(var i = 0; i < length; ++i)
    {
        var jlength = parentNodes.length;
        var results = [];
        //这里如果values的长度为零的话，
        //就说明是多出来的空格，
        //例如:$("      .content");这种情况不执行代码直接跳入下一循环
        var tmpValue = values[i].trim();
        if(tmpValue.length <= 0)
            continue;
        //内层循环为迭代每个结果节点，
        //在结果节点中查找符合选择条件的结果。当然第一次为body
        for(var j=0;j<jlength;++j)
        {
            //$findChilds就是上边的那个函数，就是选择某个节点的子节点的
            var result = $findChilds(parentNodes[j], values[i].trim());
            var rlength = result.length;
            //因为返回的有时候是html容器，无法直接和数组concat所以倒入数组，这里有优化空间，但暂不考虑性能先这么做
            for (var k = 0; k < rlength; ++k)
                results.push(result[k]);
        }
        //没有结果，立即返回undefined
        if(results == undefined || results.length <= 0)
            return undefined;
        //最后一次循环就直接返回结果数组，但是如果最后一个选择条件是选择id的话，那就不返回数组直接返回dom对象了
        if (i == length - 1)
        {
            if (values[i].substr(0, 1) == "#")
                return results[0];
            return results;
        }
        parentNodes = results;
    }
}

//返回对象
var $mi = function(text){
	var a=new $mini(text);
	return a;
}

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    var event=event||window.event;
    if(!document.all){
    	element.addEventListener(event,listener,false);
    }else{
    	element.attachEvent("on"+event,listener);
    }
}
//解除绑定
function removeEvent(element,event,listener){
	var event=event||window.event;
	if(!document.all){
		element.removeEventListener(event,listener,false);
	}else{
		element.detachEvent("on"+event,listener);
	}
}
// 实现对click事件的绑定
function addClickEvent(element, listener) {
	if(!document.all){
		element.addEventListener("click",listener,false);
	}else{
		element.attachEvent("onclick",listener);
	}
}
//事件代理
/**
    @para parentId 包裹容器的id
    @para selector 容器内元素的选择器，支持id和className
    @para fn 元素上要执行的函数
*/
    function delegate(parent, eventType, selector, fn)
    {
        //参数处理
        if(typeof parent === 'string')
        {
            var parent = document.getElementById(parent);
            !parent && alert('parent not found');
        }

        if(typeof selector !== 'string')
        {
            alert('selector is not string');
        }
        
        if(typeof fn !== 'function')
        {
             alert('fn is not function');
        }
        
        function handle(e){
            //获取event对象
            //标准DOM方法事件处理函数第一个参数是event对象
            //IE可以使用全局变量window.event
            var evt = window.event ? window.event : e;
        
            //获取触发事件的原始事件源
            //标准DOM方法是用target获取当前事件源
            //IE使用evt.srcElement获取事件源
            var target = evt.target || evt.srcElement;
        
            //获取当前正在处理的事件源
            //标准DOM方法是用currentTarget获取当前事件源
            //IE中的this指向当前处理的事件源
            var currentTarget= e ? e.currentTarget : this;
        
            //在IE 9下  window.event 与 e 不同 evt没有currentTarget属性,e才有currentTarg 
            alert("src id==="+target.id+"\n\ncurent target id=="+currentTarget.id);

            if(target.id === selector || target.className.indexOf(selector) != -1){
                fn.call(target);//将目标this转变
            }
        }
        
        parent[eventType]=handle;//为事件添加监听函数
    }
//BOM相关
// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var nowDate=new Date();
    nowDate.setDate(nowDate.getDate()+expiredays);
    document.cookie=cookieName+"="+escape(cookieValue)+
    ((expiredays==null)?"":";expires="+nowDate.toGMTString());
}

// 获取cookie值
function getCookie(cookieName) {
    if(document.cookie.length>0){
    	c_start=document.cookie.indexOf(cookieName+"=");
    	if(c_start!=-1){
    		c_start=c_start+cookieName.length+1;
    		c_end=document.cookie.indexOf(";",c_start);
    		if(c_end==-1){
    			c_end=document.cookie.length;
    		}
    		return unescape(document.cookie.substring(c_start,c_end));
    	}
    }
    return "";
}
//AJAX相关
function ajax(url, options) {
    var xmlHttp;
    if(window.XMLHttpRequest){
    	xmlHttp=new XMLHttpRequest();
    }else{
    	xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlHttp.onreadystatechange=function(){
		if(xmlHttp.readyState==4&&xmlHttp.status==200){//如果请求成功，执行以下函数
			options.onsuccess(xmlHttp.responseText,xmlHttp);
		}else{//如果请求失败
			options.onfail();			
		}
	}
    xmlHttp.open(options.type,url,true);
    xmlHttp.send();
    //alert(options.data.age);
}