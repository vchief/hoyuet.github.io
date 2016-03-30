/**
 * Created by Administrator on 2016/1/30.
 */

function baiduSearch(){
    var oT=document.getElementById('t1');
    var oUl=document.getElementById('ulsearch');
    var oAbtn=document.getElementById('abtn');
    var nowValue=null;
    var oInp=document.createElement('inp');

    oT.onkeyup=search;
    oT.value.change=search;



    function search()
    {
        var arr2=[];
        var URL='https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su';
        jsonp({
            url:URL,
            success:function(json){
                if(oT.value.length==0){
                    oUl.innerHTML='';
                }
                var aLi=oUl.children;
                arr2=json.s;
                if(aLi.length<10){
                    for(var i=0;i<arr2.length;i++){
                        var oLi=document.createElement('a');
                        oUl.appendChild(oLi);
                    }
                }


                for(var i=0;i<arr2.length;i++){
                    if(i>14){
                        aLi[i].removeChild(oUl);
                    }
                    aLi[i].innerHTML=arr2[i];
                    aLi[i].onmouseover=function(){
                        for(var i=0;i<aLi.length;i++){
                            aLi[i].style.background='#fff';
                        }
                        this.style.background='#ccc';
                    };
                    aLi[i].onclick=function(){
                        oT.value=this.innerHTML;
                        nowValue=oT.value;
                        //search();
                        oUl.innerHTML='';

                        var oA=document.createElement('a');
                        oA.innerHTML=nowValue;
                        oUl.appendChild(oA);
                        oA.style.display='none';
                        //alert(nowValue)
                        oAbtn.onclick=function() {
                            //https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd=
                            //var URl = 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd='
                            //alert(oA)
                            oAbtn.href='https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd='+nowValue;
                        }
                    };

                }

            },
            data:{wd:oT.value}
        });
    }
    function jsonp(options)
    {
        options=options||{};
        if(!options.url){
            return;
        }
        var url=options.url;
        var data=options.data||{};
        var cbName=options.cbName||'cb';
        var timeout=options.timeout||3000;

        var timer=setTimeout(function(){
            options.error&&options.error('网络超时');
            window[fnName]=null;
        },timeout);

        var fnName='jsonp_'+Math.random();
        fnName=fnName.replace('.','');

        window[fnName]=function(res){
            clearTimeout(timer);
            options.success&&options.success(res);
            oHead.removeChild(oS);
            window[fnName]=null;

        };

        var oS=document.createElement('script');
        data[cbName]=fnName;
        oS.src=url+'?'+json2url(data);
        var oHead=document.getElementsByTagName('head')[0];
        oHead.appendChild(oS);
    }
    function json2url(json)
    {
        var arr=[];
        for(var name in json){
            arr.push(name+'='+json[name]);
        }
        return arr.join('&');
    }

}
function photoList(){
    var aLi=document.getElementById('photoList').children;
    var oBtn=document.getElementById('btn');
    var aPos=[];
    for(var i=0;i<aLi.length;i++){
        aPos.push({
            left:aLi[i].offsetLeft,
            top:aLi[i].offsetTop
        });
    }
    for(var i=0;i<aLi.length;i++){
        aLi[i].style.position='absolute';
        aLi[i].style.left=aPos[i].left+'px';
        aLi[i].style.top=aPos[i].top+'px';
        aLi[i].style.margin=0;
    }
    oBtn.onclick=function(){
        var n=0;
        var timer=setInterval(function(){
            move(aLi[n],{
                left:0,
                top:0,
                width:0,
                height:0,
                opacity:0
            },{
                time:500,
                complete:function(){
                    if(n==aLi.length){
                        clearInterval(timer);
                        setTimeout(function(){end();},2000);

                    }
                }
            });
            n++;
        },300);
    };
    function end()
    {
        var n=aLi.length-1;
        var timer=setInterval(function(){
            move(aLi[n],{
                left:aPos[n].left,
                top:aPos[n].top,
                width:aLi[0].offsetWidth,
                height:aLi[0].offsetHeight,
                opacity:1
            },{
                duration:500,

            });
            n--;
            if(n==-1){
                clearInterval(timer);
            }
        },300);
    }

}
function fllow(){
    var oDiv=document.getElementById('fllow');
    var oSpan=oDiv.getElementsByTagName('span')[0];

    oDiv.onmousemove=function(ev){
        var oEvent=ev||event;
        var x=oEvent.clientX-oDiv.offsetLeft;
        var y=oEvent.clientY-oDiv.offsetTop;
        oSpan.style.display='block';
        oSpan.style.left=x+'px';
        oSpan.style.top=y+'px';

        var maxLeft=oDiv.offsetWidth;
        var maxTop=oDiv.offsetHeight;
        if(x>maxLeft){
            oSpan.style.display='none';
        }
        if(y>maxTop){
            oSpan.style.display='none';
        }
    };
    oDiv.onmouseout=function(){
        oSpan.style.display='none';
    };

}
function tabauto(){
    var oOl=document.getElementById('olauto');
    var oUl=document.getElementById('ulauto');
    var oDiv=document.getElementById('tabauto');
    var aUli=oUl.children;
    var aOli=oOl.children;
    var now=0;
    var timer=null;

    for(var i=0;i<aOli.length;i++)
    {
        (function(index){
            aOli[index].onclick=function(){

                for(var i=0;i<aOli.length;i++)
                {	now=index;
                    aOli[i].className='';
                    //aUli[i].className='';
                }
                aOli[index].className='on';
                //aUli[index].className='on';
                oUl.style.left=-now*640+'px';
            };
        })(i)
    }

    var oPrev=document.getElementById('forward');
    var oNext=document.getElementById('backward');
    oUl.onmouseover=oPrev.onmouseover=oNext.onmouseover=function(){

        oPrev.className='on';
        oNext.className='on'
    };
    oUl.onmouseout=oPrev.onmouseout=oNext.onmouseout=function(){
        oPrev.className='';
        oNext.className=''
    };


    oPrev.onclick=function(){
        now--;
        if(now==-1)now=aOli.length-1;
        for(var i=0;i<aOli.length;i++)
        {
            aOli[i].className='';
            aUli[i].className='on';
        }
        aOli[now].className='on';
        oUl.style.left=-now*640+'px';
    };


    oNext.onclick=function(){
        now++;
        if(now==aOli.length)now=0;
        for(var i=0;i<aOli.length;i++)
        {
            aOli[i].className='';
            aUli[i].className='on';
        }
        aOli[now].className='on';
        oUl.style.left=-now*640+'px';
    };


    autoPlay();
    oDiv.onmouseover=function(){
        clearInterval(timer);
    };
    oDiv.onmouseout=function(){
        autoPlay();
    };

    function autoPlay()
    {
        timer=setInterval(function(){
            now++;
            if(now==aOli.length)now=0;
            for(var i=0;i<aOli.length;i++)
            {
                aOli[i].className='';
                //aUli[i].className='on';
            }
            aOli[now].className='on';
            oUl.style.left=-now*640+'px';
        },1300);
    }
}
function calendar(){
    var oDiv=document.getElementById('calendar');
    var oUl=oDiv.getElementsByTagName('ul')[0];
    var now=0;
    create();

    // 下个月
    var oNext=oDiv.getElementsByClassName('next')[0];
    oNext.onclick=function (){
        now++;
        create();
    };

    // 上个月
    var oPrev=oDiv.getElementsByClassName('prev')[0];
    oPrev.onclick=function (){
        now--;
        create();
    };

    function create(){
        //改变span日期
        var oSpan=oDiv.getElementsByTagName('span')[0];
        var oDate=new Date();
        oDate.setMonth(oDate.getMonth()+now);
        var year=oDate.getFullYear();
        var month=oDate.getMonth();
        oSpan.innerHTML=year+'年'+(month+1)+'月';
        oUl.innerHTML='';
        //创建空格
        var oDate=new Date();
        oDate.setMonth(oDate.getMonth()+now);
        oDate.setDate(1);
        var week=oDate.getDay();
        (week==0)&&(week=7);
        for( var i=0;i<week-1;i++)
        {
            var oLi=document.createElement('li');
            oUl.appendChild(oLi);
        }
        //创建真正的日期
        var oDate=new Date();
        oDate.setMonth(oDate.getMonth()+now);
        oDate.setMonth(oDate.getMonth()+1,1);
        oDate.setDate(0);
        var total=oDate.getDate();
        for(var i=1;i<=total;i++)
        {
            var oLi=document.createElement('li');
            oLi.innerHTML=i;
            oUl.appendChild(oLi);
        }
        //周末
        var aLi=oUl.children;
        for(var i=0;i<aLi.length;i++)
        {
            if(i%7==5||i%7==6)
            {
                aLi[i].className='week';
            }
        }

        if(now==0)
        {
            //今天 以前
            var oDate=new Date();
            var today=oDate.getDate();
            for( var i=0;i<aLi.length;i++)
            {
                if(aLi[i].innerHTML<today)
                {
                    aLi[i].className='past';
                }
                else if(aLi[i].innerHTML==today)
                {
                    aLi[i].innerHTML='今天';
                    aLi[i].className='today';
                }
            }
        }
        else if(now<0)
        {
            for(var i=0;i<aLi.length;i++)
            {
                aLi[i].className='past';
            }
        }
    }
}
function lagou(){
    var oDiv=document.getElementById('lagou');
    var aDiv=oDiv.getElementsByTagName('div');
    for(var i=0;i<aDiv.length;i++)
    {
        aDiv[i].onmouseenter=function(ev){
            var oSpan=this.children[0];
            var oEvent=ev||event;
            var n=getN(oEvent,this);
            switch (n)
            {
                case 0://right
                    oSpan.style.left='150px';
                    oSpan.style.top='0';
                    move(oSpan,{left:0},{duration:300});
                    break;
                case 1://buttom
                    oSpan.style.left='0';
                    oSpan.style.top='150px';
                    move(oSpan,{top:0},{duration:300});
                    break;
                case 2://left
                    oSpan.style.left='-150px';
                    oSpan.style.top='0';
                    move(oSpan,{left:0},{duration:300});
                    break;
                case 3://top
                    oSpan.style.left='0';
                    oSpan.style.top='-150px';
                    move(oSpan,{top:0},{duration:300});
                    break;

            }
        };
        aDiv[i].onmouseleave=function(ev)
        {
            var oSpan=this.children[0];
            var oEvent=ev||event;
            var n=getN(oEvent,this);
            switch(n)
            {
                case 0:
                    move(oSpan,{left:150},{duration:300});
                    break;
                case 1:
                    move(oSpan,{top:150},{duration:300});
                    break;
                case 2:
                    move(oSpan,{left:-150},{duration:300});
                    break;
                case 3:
                    move(oSpan,{top:-150},{duration:300});
                    break;
            }
        }
    }


    function getN(ev,oDiv)
    {
        var y=oDiv.offsetHeight/2+oDiv.offsetTop-ev.clientY;
        var x=oDiv.offsetWidth/2+oDiv.offsetLeft-ev.clientX;
        var a=Math.atan2(y,x)*180/Math.PI;
        var n=Math.round((a+180)/90)%4;
        return n;
    }
}
function phoneshow(){
    function drag(obj)
    {
        obj.onmousedown=function(ev){
            var oEvent=ev||event;
            var disX=oEvent.clientX-obj.offsetLeft;
            var disY=oEvent.clientY-obj.offsetTop;
            obj.style.zIndex=zIndex++;
            var oNear=null;
            document.onmousemove=function(ev){
                var oEvent=ev||event;
                obj.style.left=oEvent.clientX-disX+'px';
                obj.style.top=oEvent.clientY-disY+'px';

                //找最近
                oNear=findNear(obj);
                if(oNear){
                    for(var i=0;i<aLi.length;i++){
                        aLi[i].className='';
                    }
                    oNear.className='active';
                }else{
                    for(var i=0;i<aLi.length;i++){
                        aLi[i].className='';
                    }
                }
            };
            document.onmouseup=function(){
                document.onmousemove=document.onmouseup=null;
                obj.releaseCapture&&obj.releaseCapture();

                //换位置
                if(oNear)
                {
                    var n=oNear.index;
                    var m=obj.index;
                    if(m>n){
                        for(var i=0; i<aLi.length; i++){
                            if(aLi[i].index>=n && aLi[i].index<m){
                                aLi[i].index++;
                            }
                            obj.index=n;
                        }
                        for(var i=0;i<aLi.length;i++){
                            move(aLi[i],aPos[aLi[i].index]);
                        }
                    }
                    if(m<n){
                        for(var i=0; i<aLi.length; i++){
                            if(aLi[i].index>m && aLi[i].index<=n){
                                aLi[i].index--;
                            }
                            obj.index=n;
                        }
                        for(var i=0;i<aLi.length;i++){
                            move(aLi[i],aPos[aLi[i].index]);
                        }
                    }

                }else{
                    move(obj,aPos[obj.index])
                }
                for(var i=0;i<aLi.length;i++){
                    aLi[i].className='';
                }
            };
            obj.setCapture&&obj.setCapture();

            oEvent.preventDefault&&oEvent.preventDefault();
        };
    }
    function findNear(obj)
    {
        var nMin=9999999;
        var nMinIndex=-1;
        for(var i=0;i<aLi.length;i++){
            if(obj==aLi[i]){
                continue;
            }
            if(crash(obj,aLi[i])){
                var dis=getDis(obj,aLi[i]);
                if(dis<nMin){
                    nMin=dis;
                    nMinIndex=i;
                }
            }
        }
        if (nMinIndex == -1)
        {
            return null;
        }
        else
        {
            return aLi[nMinIndex];
        }

    }
    //碰撞检测，碰上了返回true，否则false
    function crash(obj1,obj2)
    {
        var l1=obj1.offsetLeft;
        var r1=l1+obj1.offsetWidth;
        var t1=obj1.offsetTop;
        var b1=t1+obj1.offsetHeight;

        var l2=obj2.offsetLeft;
        var r2=l2+obj2.offsetWidth;
        var t2=obj2.offsetTop;
        var b2=t2+obj2.offsetHeight;


        if(l2>r1||r2<l1||t2>b1||b2<t1){
            return false;
        }else{
            return true;
        }
    }
    function getDis(obj1,obj2)
    {
        var a=obj1.offsetLeft+obj1.offsetWidth/2-(obj2.offsetLeft+obj2.offsetWidth/2);
        var b=obj1.offsetTop+obj1.offsetHeight/2-(obj2.offsetTop+obj2.offsetHeight/2);
        return Math.sqrt(a*a+b*b);
    }

    var oUl=document.getElementById('ulphoto');
    var aLi=oUl.children;
    var zIndex=1;

    //布局转换
    var aPos=[];
    for(var i=0;i<aLi.length;i++){
        aPos.push({
            left:aLi[i].offsetLeft,
            top:aLi[i].offsetTop
        });
    }
    for(var i=0;i<aLi.length;i++){
        aLi[i].style.position='absolute';
        aLi[i].style.left=aPos[i].left+'px';
        aLi[i].style.top=aPos[i].top+'px';
        aLi[i].style.margin=0+'px';
    }
    for(var i=0;i<aLi.length;i++){
        aLi[i].index=i;
        drag(aLi[i]);
    }

}
function fengqing(){
    var oUl=document.getElementById('ulfc');
    var aLi=oUl.children;
    var aSpan=oUl.getElementsByTagName('span');
    var nLiW=aLi[0].offsetWidth;
    var nSpanW=aSpan[0].offsetWidth;
    //默认
    for(var i=0;i<aLi.length;i++)
    {
        if(i>0)
        {
            aLi[i].style.left=nLiW+(i-1)*nSpanW+'px';

        }
    }
    //添加事件
    for(var i=0;i<aLi.length;i++)
    {
        (function(index){
            aLi[index].onmouseover=function(){
                for(var i=0;i<aLi.length;i++)
                {
                    if(i<=index)
                    {
                        var left=i*nSpanW;
                    }
                    else
                    {
                        var left=nLiW+(i-1)*nSpanW;
                    }
                    move(aLi[i],{left:left},{
                        duration:300,easing:Tween.Expo.easeInOut
                    });
                }
            };

        })(i);
    }


}
function showPic(){
    var oUl=document.getElementById('ulshow');
    var oDiv=document.getElementById('showpic');
    var aLi=oUl.children;
    var w=aLi[0].offsetWidth;
    oUl.style.width=w*(aLi.length+1)+'px';
    var nCenter=oDiv.offsetWidth/2;
    //放大
    var aImg=oUl.getElementsByTagName('img');
    //测试
   // var aSpan=oUl.getElementsByTagName('span');
    //定位左边
    var nMaxLeft=nCenter-w/2;
    //定位右边
    var nMinLeft=nCenter-(aLi.length-0.5)*w;
    //默认
    oUl.style.left=nCenter-(3-0.5)*w+'px';
    enlarge();
    oUl.onmousedown=function(ev){
        var oEvent=ev||event;
        var disX=oEvent.clientX-oUl.offsetLeft;
        document.onmousemove=function(ev){
            var	oEvent=ev||event;
            var left=oEvent.clientX-disX;
            if(left<nMinLeft)
            {
                left=nMinLeft;
            }
            else if(left>nMaxLeft)
            {
                left=nMaxLeft;
            }
            oUl.style.left=left+'px';
            enlarge();

        };
        document.onmouseup=function(){
            document.onmousemove=null;
            document.onmouseup=null;
        };
        return false;
        //不取消默认值 有时候会粘在一起
    };

    function enlarge()
    {
        for(var i=0;i<aLi.length;i++)
        {	//两中心线之间的距离
            var dis=Math.abs(aLi[i].offsetWidth/2+aLi[i].offsetLeft+oUl.offsetLeft-nCenter);
            var scale=1-dis/500;
            (scale<0.5)&&(scale=0.5);
           // aSpan[i].innerHTML=scale.toFixed(2);
            aImg[i].style.width=scale*800+'px';
            aImg[i].style.height=scale*600+'px';
            //调整图片的位置
            aImg[i].style.marginLeft=(400-aImg[i].offsetWidth)/2+'px';
            aImg[i].style.marginTop=(300-aImg[i].offsetHeight)/2+'px';
            //调整图层
            aLi[i].style.zIndex=scale*100;
        }
    }


}
function magnifying(){
    var oOuter=document.querySelector('.outer');
    var oInner=document.querySelector('.inner');
    var oBiger=document.querySelector('.biger');
    var oImgs=document.querySelector('.imgs');

    var n=false;
    var disX=0;
    var disY=0;

    //鼠标按下去
    oInner.onmousedown=function(ev) {
        var oEvent=ev||event;
        n=true;
        disX=oEvent.clientX-oOuter.offsetLeft-oInner.offsetLeft;
        disY=oEvent.clientY-oOuter.offsetTop-oInner.offsetTop;
        var maxLeft=oOuter.offsetWidth-oInner.offsetWidth;
        var maxTop=oOuter.clientHeight-oInner.clientHeight;
        //鼠标移动
        oOuter.onmousemove=function(ev){
            if(n=true){
                var oEvent=ev||event;
                var left=oEvent.clientX-oOuter.offsetLeft-disX;
                var top=oEvent.clientY-oOuter.offsetTop-disY;
                //限制inner和imgs的范围
                if(left<=0){
                    left=0;
                }
                if(top<=0){
                    top=0;
                }
                if(left>=maxLeft){
                    left=maxLeft;
                }
                if(top>=maxTop){
                    top=maxTop;
                }
                //inner
                oInner.style.left=left+'px';
                oInner.style.top=top+'px';
                //imgs
                oImgs.style.left=-6*left+'px';
                oImgs.style.top=-12*top+'px';
            }
        };
        //鼠标抬起
        oOuter.onmouseup=function()
        {
            n=false;
            oOuter.onmousemove=null;
            oOuter.onmouseup=null;
        };
        return false;
    };

}
function  photoWall(){
    function drag(obj)
    {
        obj.onmousedown=function(ev){
            var oEvent=ev||event;
            var disX=oEvent.clientX-obj.offsetLeft;
            var disY=oEvent.clientY-obj.offsetTop;
            obj.style.zIndex=zIndex++;
            var oNear=null;
            document.onmousemove=function(ev){
                var oEvent=ev||event;
                obj.style.left=oEvent.clientX-disX+'px';
                obj.style.top=oEvent.clientY-disY+'px';

                //找最近
                oNear=findNear(obj);
                if(oNear){
                    for(var i=0;i<aLi.length;i++){
                        aLi[i].className='';
                    }
                    oNear.className='active';
                }else{
                    for(var i=0;i<aLi.length;i++){
                        aLi[i].className='';
                    }
                }
            };
            document.onmouseup=function(){
                document.onmousemove=document.onmouseup=null;
                obj.releaseCapture&&obj.releaseCapture();

                //换位置
                if(oNear)
                {
                    move(obj,aPos[oNear.index]);
                    move(oNear,aPos[obj.index]);
                    var temp=null;
                    temp=obj.index;
                    obj.index=oNear.index;
                    oNear.index=temp;

                    for(var i=0;i<aLi.length;i++){
                        aLi[i].className='';
                    }
                }else{
                    move(obj,aPos[obj.index])
                }
            };
            obj.setCapture&&obj.setCapture();

            oEvent.preventDefault&&oEvent.preventDefault();
        };
    }
    function findNear(obj)
    {
        var nMin=9999999;
        var nMinIndex=-1;
        for(var i=0;i<aLi.length;i++){
            if(obj==aLi[i]){
                continue;
            }
            if(crash(obj,aLi[i])){
                var dis=getDis(obj,aLi[i]);
                if(dis<nMin){
                    nMin=dis;
                    nMinIndex=i;
                }
            }
        }
        if (nMinIndex == -1)
        {
            return null;
        }
        else
        {
            return aLi[nMinIndex];
        }

    }
    //碰撞检测，碰上了返回true，否则false
    function crash(obj1,obj2)
    {
        var l1=obj1.offsetLeft;
        var r1=l1+obj1.offsetWidth;
        var t1=obj1.offsetTop;
        var b1=t1+obj1.offsetHeight;

        var l2=obj2.offsetLeft;
        var r2=l2+obj2.offsetWidth;
        var t2=obj2.offsetTop;
        var b2=t2+obj2.offsetHeight;


        if(l2>r1||r2<l1||t2>b1||b2<t1){
            return false;
        }else{
            return true;
        }
    }
    function getDis(obj1,obj2)
    {
        var a=obj1.offsetLeft+obj1.offsetWidth/2-(obj2.offsetLeft+obj2.offsetWidth/2);
        var b=obj1.offsetTop+obj1.offsetHeight/2-(obj2.offsetTop+obj2.offsetHeight/2);
        return Math.sqrt(a*a+b*b);
    }

    var oUl=document.getElementById('ul_Wall');
    var aShow=document.getElementsByClassName('show');
    var aLi=oUl.children;
    var zIndex=1;
    //布局转换
    var aPos=[];
    for(var i=0;i<aLi.length;i++){
        aPos.push({
            left:aLi[i].offsetLeft,
            top:aLi[i].offsetTop
        });
    }
    for(var i=0;i<aLi.length;i++){
        aLi[i].style.position='absolute';
        aLi[i].style.left=aPos[i].left+'px';
        aLi[i].style.top=aPos[i].top+'px';
        aLi[i].style.margin=0+'px';
    }
    for(var i=0;i<aLi.length;i++){
        aLi[i].index=i;
        drag(aLi[i]);
        //aShow[i].onclick=function(){
        //    this.in
        //};
        var oClose=aShow[i].children[0];
        (function(index){
            oClose.onclick=function(){
                aShow[index].style.visibility='hidden';
            };
        })(i);

    }



}
function massage(){
    var oBtn=document.getElementById('sendBtn');
    var oUser=document.getElementById('userName');
    var oConBox=document.getElementById('conBox');
    var oUl=document.getElementById('ulList');
    var oMax=document.getElementById('maxNum');
    var timer=null;

    var aLi=oUl.children;
    oUser.onfocus=function(){
        oUser.value='';
        oUser.style.color='#000';
    };
    oConBox.onfocus=function(){
        timer=setInterval(function(){
            oMax.innerHTML=140-oConBox.value.length;
        },30);
        oConBox.style.color='#000'
        oConBox.innerHTML='';
        //oConBox.value='';
    };

    //timer=setInterval(function(){
    //    oMax.innerHTML=140-oConBox.value.length;
    //},30);


    oBtn.onclick=function(){
        clearInterval(timer);

        if(oUser.value!=''&&oConBox.value!=''&&!(oUser.value=='请填写姓名'||oConBox.innerHTML=='请留言'||oConBox.value=='请留言')){
            //发送
            var oLi=document.createElement('li');
            var oDate = new Date();
            oLi.innerHTML = "<div class=\"content\">\
                                 <div class=\"userName\"><a href=\"javascript:;\">" + oUser.value + "</a>:</div>\
                                 <div class=\"msgInfo\">" + oConBox.value.replace(/<[^>]*>|&nbsp;/ig, "") + "</div>\
                                 <div class=\"times\"><span>" + format(oDate.getMonth() + 1) + "\u6708" + format(oDate.getDate()) + "\u65e5 " + format(oDate.getHours()) + ":" + format(oDate.getMinutes()) + "</span><a class=\"del\" href=\"javascript:;\">\u5220\u9664</a></div>\
							 </div>";
            //插入元素
            aLi.length ? oUl.insertBefore(oLi, aLi[0]) : oUl.appendChild(oLi);
            oUser.value='请填写姓名';
            oConBox.value='请留言';
            oUser.style.color='#cccccc';
            oConBox.style.color='#cccccc';
            oConBox.onfocus=function(){
                oConBox.style.color='#000'
                oConBox.value='';
                //oConBox.value='';
            };
        }else{
            //失败
            alert('留言者或留言内容不能为空!请您充填...');
        }
        for(var i=0;i<aLi.length;i++){
            aLi[i].onmouseover=function(){

                var oA=this.children[0].children[2].children[1];
                oA.style.display='block';
                (function(index){
                    oA.onclick=function(){
                        oUl.removeChild(this.parentNode.parentNode.parentNode);
                    };
                })(i);

            };
            aLi[i].onmouseout=function(){
                var oA=this.children[0].children[2].children[1];
                oA.style.display='none';
                var oA=this.children[0].children[2].children[1];
                //oA.style.display='none';
            };
        }


    };
	for(var i=0;i<aLi.length;i++){
            aLi[i].onmouseover=function(){

                var oA=this.children[0].children[2].children[1];
                oA.style.display='block';
                (function(index){
                    oA.onclick=function(){
                        oUl.removeChild(this.parentNode.parentNode.parentNode);
                    };
                })(i);

            };
            aLi[i].onmouseout=function(){
                var oA=this.children[0].children[2].children[1];
                oA.style.display='none';
                var oA=this.children[0].children[2].children[1];
                //oA.style.display='none';
            };
        }

    function format(str)
    {
        return str.toString().replace(/^(\d)$/,"0$1")
    }
}
function works(){
    var oWorks=document.getElementById('m_works');
    var aDiv=oWorks.querySelectorAll('div');
    var aShow=document.getElementsByClassName('show');
    var oScrollTop=0;
    //window.onscroll=function(){
    //    oScrollTop=document.body.scrollTop;
    //};
    for(var i=0;i<aDiv.length;i++)
    {
        aDiv[i].style.backgroundImage='url(img/'+i+'.jpg)';
        aDiv[i].style.backgroundSize='cover';
        aDiv[i].index=i
        aDiv[i].onmouseenter=function(){
            var oSpan=this.children[0];
            oSpan.style.left='0';
            oSpan.style.top='249px';
            move(oSpan,{top:180},{duration:500});
        };
        aDiv[i].onmouseleave=function()
        {
            var oSpan=this.children[0];
            move(oSpan,{top:249},{duration:500});
        }
        aDiv[i].onclick=function(ev){
            //var dis=oBody.offsetHeight-oDown.offsetTop-oDown.offsetHeight;
            //var disTop=ev.clientHeight*dis/oBody.offsetHeight;

            //aShow[0].style.top=document.body.scrollTop+'px';
            //aShow[this.index].style.visibility='visible';
            //aShow[this.index].style.display='block';
            aShow[this.index].style.visibility='visible';
            aShow[this.index].style.position='fixed';
            aShow[this.index].style.top=0;
            aShow[this.index].style.left=0;

        };
        var oClose=aShow[i].children[0];
        (function(index){
            oClose.onclick=function(){
                aShow[index].style.visibility='hidden';
            };
        })(i);





    }
}
function scroll(){
    var oNav=document.getElementById('nav');
    var oFillNav=document.getElementById('fillNav');

    var top=oNav.offsetTop;
    window.onscroll=function (){
        var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
        if (top <= scrollTop)
        {
            // 吸顶

            oNav.style.position='fixed';
            oFillNav.style.display='block';
        }
        else
        {
            // 不吸
            oNav.style.position='';
            oFillNav.style.display='none';
        }
    };

}
function  photo(){
    var oPhoto=document.getElementById('m_photos');
    var oImg=oPhoto.getElementsByTagName('img')[0];
    var aPath=['10.jpg','11.jpg', '13.jpg', '14.jpg'];
    var Row=4;
    var Col=7;

    var W=1140/Col;
    var H=520/Row;
    // 创建span
    var aSpan=[];
    for (var r=0; r<Row; r++)
    {
        for (var c=0; c<Col; c++)
        {
            var oSpan=document.createElement('span');
            oSpan.style.width=W+'px';
            oSpan.style.height=H+'px';
            var top=r*H;
            var left=c*W;
            oSpan.style.top=top+'px';
            oSpan.style.left=left+'px';

            oSpan.style.backgroundPosition='-'+left+'px  -'+top+'px';

            oPhoto.appendChild(oSpan);
            aSpan.push(oSpan);
        }
    }

    // 点击
    var now=0; // 第几次单击
    var bFlag=true;
    document.onclick=function (){
        if(bFlag){
            bFlag=false;
            var n=0;
            now++; // 1
            for (var i=0; i<aSpan.length; i++)
            {
                aSpan[i].style.opacity=0;
                aSpan[i].style.backgroundImage=
                    'url(image/'+aPath[now%aPath.length]+')';
            }

            var timer=setInterval(function (){
                (function (index){
                    move(aSpan[n], {opacity:1}, {
                        complete:function (){
                            if (index == aSpan.length-1)
                            {
                                oImg.src='image/'+aPath[now%aPath.length];

                            }

                        }
                    });
                })(n);

                n++;

                if (n == aSpan.length)
                {
                    clearInterval(timer);
                    bFlag=true;
                }
            }, 100);
        }

    };
}
function profile(){
    var oPrev=document.getElementById('prev');
    var oNext=document.getElementById('next');
    var oProfiles=document.getElementById('m_profiles');
    var oUl=document.getElementById('ul1');
    var oLw=oUl.children[0].offsetWidth;
    var left=0;
    oProfiles.onmouseover=function(){
        oPrev.style.display='block';
        oNext.style.display='block';
        oPrev.onclick=function(){
            left+=oLw;
            if(left>0){
                left=-oLw*4;
            }
            move(oUl,{'left':left});
        };
        oNext.onclick=function(){
            left-=oLw;
            if(left<-oLw*4){
                left=0;
            }
            move(oUl,{'left':left});
        };
    };
    oProfiles.onmouseout=function(){
        oPrev.style.display='none';
        oNext.style.display='none';
    };
}

function time()
{
    var oTs=document.getElementById('time_show');
    showTime();
    setInterval(function(){
        showTime();
    },1000);

    function showTime()
    {
        var oDate=new Date();
        var y=oDate.getFullYear();
        var m=oDate.getMonth()+1;
        var d=oDate.getDate();
        var h=oDate.getHours();
        var mu=oDate.getMinutes();
        var s=oDate.getSeconds();
        oTs.innerHTML=y+'年'+m+'月'+d+'日'+h+'时'+mu+'分'+s+'秒';
    }

}



function back()
{
    var oBack=document.getElementById('back');
    var timer=null;
    var bFlag=false;

    window.onscroll=function() {
        if (bFlag) {
            clearInterval(timer);
        }
        bFlag = true;
    };
    oBack.onclick=function() {
        var start=document.documentElement.scrollTop||document.body.scrollTop;
        var dis=0-start;
        var count=Math.floor(1000/30);
        var n=0;
        clearInterval(timer);
        timer=setInterval(function(){
            n++;
            bFlag=false;
            var scrollTop=start+dis*n/count;
            document.documentElement.scrollTop=scrollTop;
            document.body.scrollTop=scrollTop;
            if(n==count){
                clearInterval(timer);
            }
        },30);
    }

};

