(function($){
    var toTop = ($('#sidebar').height() - $(window).height()) + 60;
    // Caption
    $('.article-entry').each(function(i) {
        $(this).find('img').filter(function (element) {
            return $(this).hasClass('');
        }).each(function() {
            if (this.alt) {
                $(this).after('<span class="caption">' + this.alt + '</span>');
            }
            $(this).wrap('<div align="center"></div>');
        });
    });

    // Profile card
    $(document).on('click', function () {
        $('#profile').removeClass('card');
    }).on('click', '#profile-anchor', function (e) {
        e.stopPropagation();
        $('#profile').toggleClass('card');
    }).on('click', '.profile-inner', function (e) {
        e.stopPropagation();
    });

    // To Top
    if ($('#sidebar').length) {
        $(document).on('scroll', function () {
            if ($(document).width() >= 800) {
                if(($(this).scrollTop() > toTop) && ($(this).scrollTop() > 0)) {
                    $('#toTop').fadeIn();
                    $('#toTop').css('left', $('#sidebar').offset().left);
                } else {
                    $('#toTop').fadeOut();
                }
            } else {
                $('#toTop').fadeIn();
                $('#toTop').css('right', 20);
            }
        }).on('click', '#toTop', function () {
            $('body, html').animate({ scrollTop: 0 }, 600);
        });
    }

})(jQuery);

function getMultiLine(f) {
    var lines = f.toString(); 
    return lines.substring(lines.indexOf("/*") + 3, lines.lastIndexOf("*/"));   
}

var console_text = function() {  
/* 
                              __      
                             /\ \__   
  ___   _ __   ____    __  __\ \  _\  
 / __ \/\  __\/\_   \ /\ \/\ \\ \ \/  
/\ \_\ \ \ \/ \/_/  /_\ \ \_\ \\ \ \_ 
\ \____/\ \_\   /\____\\/ ____ \\ \__\
 \/___/  \/_/   \/____/  /___/  \\/__/
                           /\___/     
                           \/__/      
       
%c stay hungry, stay foolish.
                    %c by Yangtao
*/  
}
console.log(getMultiLine(console_text),'color:#495a80;font-size:16px;font-style:italic','color:#495a80;font-size:16px;font-style:italic');

/*$(function() {
    $("#header").headroom({
        tolerance: 3,
        offset: 5,
        classes: {
            initial: "animated",
            pinned: "slideInDown",
            unpinned: "slideOutUp"
        }
    });
*/
/*    if (window.screen.width >= 1200) {
        $("#profile").headroom({
            tolerance: 3,
            offset: 150,
            classes: {
                initial: "animated",
                pinned: "slideInDown",
                unpinned: "slideOutUp"
            }
        });
        $("#sidebar").headroom({
            tolerance: 3,
            offset: 150,
            classes: {
                initial: "animated",
                pinned: "slideInDown",
                unpinned: "slideOutUp"
            }
        });
    }*/
//})


$(document).ready(function() 
    { 
        $("table").addClass("tablesorter");
        $("table").tablesorter(); 
    } 
); 


(function setInner() {
    var node = document.getElementsByClassName("gt-comment-username")[0];
    var timer = setTimeout(function() {
        if(!node) {
            setInner();
        } else {
            $("a.gt-comment-username").each(function(){
                if ($(this).html() == "orzyt") {
                    $(this).html("orzyt<span class=\"label label-info\" style=\"margin-left: 1%;\">博主</span>");
                }
            });
        }
    }, 100);
})(jQuery);

// var $itemHasChild = $("#toc .toc-item:has(> .toc-child)");
// var $titleHasChild = $itemHasChild.children(".toc-link");
// $itemHasChild.prepend("<i class='fa fa-caret-down'></i><i class='fa fa-caret-right'></i>");
// var $iconToFold = $(".toc-item > .fa-caret-down");
// $iconToFold.addClass("hide");

// var $x = $("#toc .toc-item > a");
// $x.siblings(".toc-child").toggle(false);

// var clickIcon = function(){
//     $("#toc .toc-item > i").click(function(){
//         $(this).siblings(".toc-child").slideToggle(100);
//         $(this).toggleClass("hide");
//         $(this).siblings("i").toggleClass("hide");
//     })
// }()


var $w = $(window);
// 修正响应不及时的问题
var HEADFIX = 30;

var $toclink = $('.toc-link'),
  $headerlink = $('.headerlink'),
  $tocchild = $('.toc-child');

// 用来获取 top 数组
var headerlinkTop = [];
headerlinkTop = $.map($headerlink, function(link) {
  return $(link.parentNode).offset().top - HEADFIX;
});

headerlinkTop[0] = -1;
headerlinkTop.push(Infinity);

var pos = 0;
var getActive = function(s_top){

  for(var i = 0; i < $toclink.length; i++) {
    var currentTop = headerlinkTop[i];
    var nextTop = headerlinkTop[i+1];

    if(s_top > currentTop && s_top <= nextTop){
      $toclink.removeClass('active');
      $toclink.siblings(".toc-child").toggle(false);
      pos = i;
      var nowlink = $toclink[i];
      $(nowlink).addClass('active');
      $(nowlink).siblings(".toc-child").toggle(true);
      
      while($(nowlink.parentNode.parentNode).hasClass('toc-child')){
        nowlink = nowlink.parentNode.parentNode;
        $(nowlink).toggle(true);
      }
      break;
    }
  }
}
getActive($w.scrollTop());

// 修复 image load bug
// 由于网页已经加载，而图片还未加载完成，导致数组的高度有偏差
var link_length = $headerlink.length;
var $link_last = link_length > 1 ? $($headerlink[$headerlink.length - 1].parentNode) : null;
var fixLoading = function(){
  if(link_length > 1){
    if(($link_last.offset().top - HEADFIX) - headerlinkTop[link_length - 1] != 0){
      headerlinkTop = $.map($headerlink, function(link) {
        return $(link.parentNode).offset().top - HEADFIX;
      });
      // 修正参数
      headerlinkTop[0] = -1;
      headerlinkTop.push(Infinity);
    }
  }
}

// callback
var cb = function(){
  var scrollTop = $w.scrollTop();
  fixLoading();
  if(scrollTop > headerlinkTop[pos + 1] || scrollTop <= headerlinkTop[pos]){
    getActive(scrollTop);
  }
}

if(!this.doScroll){
  this.doScroll = true;
  // 监听浏览器滚动
  $w.scroll(cb);
}
