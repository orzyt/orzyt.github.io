(function($){
    var toTop = ($('#sidebar').height() - $(window).height()) + 60;
    // Caption
    
    $('.article-entry').each(function(i) {
        $(this).find('img').filter(function (element) {
            return $(this).hasClass('');
        }).each(function() {
            if (this.alt && !(!!$.prototype.justifiedGallery && $(this).parent('.justified-gallery').length)) {
                $(this).after('<span class="caption">' + this.alt + '</span>');
            }

            // 对于已经包含在链接内的图片不适用lightGallery
            if ($(this).parent().prop("tagName") !== 'A') {
                $(this).wrap('<a href="' + ($(this).attr("data-imgbig") ? $(this).attr("data-imgbig") : this.src) + '" title="' + this.alt + '" class="gallery-item"></a>');
            }
        });
    });
     
    if (typeof lightGallery != 'undefined') {
        var options = {
            selector: '.gallery-item'
        };
        $('.article-entry').each(function(i, entry) {
            lightGallery(entry, options);
        });
        lightGallery($('.article-gallery')[0], options);
    }
    if (!!$.prototype.justifiedGallery) {  // if justifiedGallery method is defined
        var options = {
            rowHeight: 140,
            margins: 4,
            lastRow: 'justify'
        };
        $('.justified-gallery').justifiedGallery(options);
    }

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

$(function() {
    $("#header").headroom({
        tolerance: 3,
        offset: 50,
        classes: {
            initial: "animated",
            pinned: "slideInDown",
            unpinned: "slideOutUp"
        }
    });
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
})


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

