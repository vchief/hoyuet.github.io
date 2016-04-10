/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-4-1
 * Time: 下午5:54
 * To change this template use File | Settings | File Templates.
 */
$(function(){
    //nav效果
    $("#nav li a").wrapInner( '<span class="out"></span>' );

    $("#nav li a").each(function() {
        $( '<span class="over">' +  $(this).text() + '</span>' ).appendTo( this );
    });

    $("#nav li a").hover(function() {
        $(".out",	this).stop().animate({'top':	'25px'},	300); // move down - hide
        $(".over",	this).stop().animate({'top':	'0px'},		300); // move down - show

    }, function() {
        $(".out",	this).stop().animate({'top':	'0px'},		300); // move up - show
        $(".over",	this).stop().animate({'top':	'-25px'},	300); // move up - hide
    });

    //nav 点击滚动跳转
    $('.nav ul li').each(function(i){
        $(this).click(function(){
            $("html,body").animate({scrollTop: $(".hash").eq(i).offset().top}, 1000);
        });
    });
    //nav固定
    var oNav=$('#nav');
    var oFillNav=$('#fillNav');
    var top=oNav.position().top;
    $(window).scroll(function(){
        var scrollTop=$(document).scrollTop();
        if(top<=scrollTop){
            oNav.css({
                'position':'fixed'
            });
            oFillNav.css({
                'display':'block'
            });
        }else{
            oNav.css({
                'position':''
            });
            oFillNav.css({
                'display':'none'
            });
        }
    });

    //首页展示
    $('.socials').mobilyblocks();
    $('.nature').mobilyblocks({
        trigger: 'hover',
        direction: 'counter',
        duration:500,
        zIndex:50,
        widthMultiplier:1.15
    });

    //首页幻灯片
    $(".picContent") .hover(function(){
        $(this) .children(".txt").stop() .animate({height:"200px"},200);
        $(this).parent().css({
            "background":"url(image/"+($('.picContent').index($(this))+9)+".jpg) no-repeat",
            "-webkit-transition":"all 0.8s ease 0.1s",
            "transition":"all 0.8s ease 0.1s"
        });
        $(this) .find(".txt h3").stop() .animate({paddingTop:"20"},550);
        $(this) .find(".txt p").stop() .show();
    },function(){
        $(this) .children(".txt").stop() .animate({height:"100px"},200);
        $(this) .find(".txt h3").stop().animate({paddingTop:"0px"},550);
        $(this) .find(".txt p").stop() .hide();
    });

    //简历展示
    var n=0;
    var nowIndex=0;
    $('#ul1').mouseenter(function(){
        $('.m_profiles a').mouseenter(function(){
            $('.m_profiles a').show();
        });
        $('#prev').show();
        $('#next').show();


    }).mouseleave(function(){
        $('#prev').hide();
        $('#next').hide();
    });
    $('#prev').click(function(){
        n++;
        if(n==1)n=-6;
        $('#ul1').animate({'left':$('.about').width()*n});
    });
    $('#next').click(function(){
        n--;
        if(n==-7)n=0;
        $('#ul1').animate({'left':$('.about').width()*n});
    });

    //照片查看
    var nClick=0;
    $('#m_photos ul li').each(function(i){
        $(this).children(i).click(function(){
            //xiabaio
            //alert(i);

            $(this).css({
                'transition':'1s all ease',
                'position': 'absolute',
                'transformOrigin': 'center center',
                'transform':'rotateY('+360+'deg) scale(1)',
                'left':0,
                'top':0,
                'zIndex':2
            });
            $(this).addClass('n');
            //alert(i)
            $('#m_photos span').animate({'opacity':1},3000).click(function(){
                $('#m_photos span').animate({'opacity':0},30);
                (function(i){
                    $('#m_photos ul li').children('.n').css({

                        'transition':'1s all ease',
                        'transformOrigin': 'center center',
                        'transform':'rotateY('+(-360)+'deg) scale(1)',

                        'borderRadius':'0px',
                        'position':'static',
                        'zIndex':1
                    });
                })(i);
            });
        });
    });

    //作品展示
    var timer=null;
    var nW=2;
    $('#m_works ul').html($('#m_works ul').html()+$('#m_works ul').html())
        .css({width:$('#m_works ul').width()*2});
    var left=$('#m_works ul').position().left;
    timer=setInterval(function(){
        left-=1;
        $('#m_works ul').animate({
//                left:-$('#m_works ul').width()/2
            left:left
        },1,'linear');
        if(Math.abs(left)%($('#m_works ul').width()/2)==0){
            left=0;
        }
    },30);
    $('#m_works ul').hover(function(){
        clearInterval(timer);
    },function(){
        timer=setInterval(function(){
            left-=1;
            $('#m_works ul').animate({
//                left:-$('#m_works ul').width()/2
                left:left
            },1,'linear');
            if(Math.abs(left)%($('#m_works ul').width()/2)==0){
                left=0;
            }
        },30);
    });
    $('#m_works ul li a').mouseenter(function(){
        $('span',this).animate({
            height:80,
            lineHeight:80,
            fontSize:30
        },500);
    }).mouseleave(function(){
        $('span',this).animate({
            height:0,
            lineHeight:0,
            fontSize:0
        },500);
        });

    //留言板
    var timer2=null;
    $('#userName').focus(function(){
        //alert(1)
        $(this).val('');
        $(this).css({color:'#000'});
    });
    $('#conBox').focus(function(){
        $(this).val('');
        timer2=setInterval(function(){
            $('#maxNum').html(140-$('#conBox').val().length);
        },30);
        $(this).css({color:'#000'}).html('');
    });
    $('#sendBtn').click(function(){
        clearInterval(timer2);
        $('#maxNum').html(140);
        if($('#userName').val()==''||($('#conBox').val()=='')||$('#userName').val()=='请填写姓名'||$('#conBox').val()=='请留言'){
            alert('姓名或者留言内容不能为空');
            //alert(($('#conBox').val()));
        }else{
            var oDate=new Date();
            var oLi=$('<li>' +
                '<div class="content">' +
                    '<div class="userName">' +
                        '<a href="javascript:;">' +$('#userName').val()+
                        '</a>:' +
                    '</div>' +
                    '<div class="msgInfo">' +$('#conBox').val().replace(/<[^>]*>|&nbsp;/ig, "")+
                    '<div class="times">' +
                        '<span>' + format(oDate.getMonth() + 1)+
                            '\u6708' +format(oDate.getDate())+
                            '\u65e5' + format(oDate.getHours()) +
                            ':'+format(oDate.getMinutes()) +
                        '</span> ' +
                        '<a class="del" href="javascript:;" >' +
                            '\u5220\u9664' +
                        '</a>' +
                '</div>' +
                    '</div> ' +
                '</div>' +
                '</li>');
            $('#ulList li').length? oLi.appendTo($('#ulList')):$('#ulList').prepend(oLi);
            $('#userName').val('请填写姓名').css({
                color:'#ccc'
            });
            $('#conBox').val('请留言').css({
                color:'#ccc'
            });
        }
        $('#ulList li').each(function(){
            $(this).hover(function(){
                var oA=$('.del',this);
                oA.css({
                    display:'block'
                }).click(function(){
                        $(this).parent().parent().parent().remove();
                    });
            },function(){
                var oA=$('.del',this);
                oA.css({
                    display:'none'
                });
            });
        });
    });
    $('#ulList li').each(function(){
        $(this).hover(function(){
            var oA=$('.del',this);
            oA.css({
                display:'block'
            }).click(function(){
                    $(this).parent().parent().parent().remove();
                });
        },function(){
            var oA=$('.del',this);
            oA.css({
                display:'none'
            });
        });
    });

    function format(str)
    {
        return str.toString().replace(/^(\d)$/,"0$1")
    }

    //百度搜索
    var arrSearch=[];
    var URL='https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su';
    //var URL='a.php';
    jsonp({
        url:URL,
        success:function(json){
            if($('#t1').val().length==0){
                $('#ulsearch').html('');
            }
            arrSearch=json.s;
            if($('#ulsearch li').length<10){
                $('#ulsearch li').each(function(){
                    $('<a></a>').appendTo($('#ulsearch'));
                });
            }
            $('#ulsearch').each(function(i){
                if(i>14){
                    $('#ulsearch li').eq(i).remove();
                }
                $('#ulsearch li').eq(i).html(arrSearch[i])
                    .click(function(){
                        $('#t1').val($(this).html());
                        var nowValue=$('#t1').val;
                        $('#ulsearch').html('');

                        var oA=$('<a></a>');
                        oA.html(nowValue).appendTo('#ulsearch').css({
                            display:'none'
                        });
                        $('#abtn').click(function(){
                           $(this).css({
                               href:'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd='+nowValue
                           });
                        });

                    });

            });
        },
        data:{wd:$('#t1').val()}
    });
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
            options.error&&options.error('缃戠粶瓒呮椂');
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



});