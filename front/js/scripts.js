$(document).ready(function(){
    "use sctict";
    
    //OS check========================/
    function getOS() {
      var userAgent = window.navigator.userAgent,
          platform = window.navigator.platform,
          macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
          windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
          iosPlatforms = ['iPhone', 'iPad', 'iPod'],
          os = null;

      if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS';
      } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
      } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
      } else if (/Android/.test(userAgent)) {
        os = 'Android';
      } else if (!os && /Linux/.test(platform)) {
        os = 'Linux';
      }

      return os;
    }
    
    if (getOS() == "Windows") {
        $("body").addClass("os-windows");
    }
    
    if (getOS() == "iOS") {
        $("body").addClass("os-ios");
    }
    
    if (navigator.userAgent.search("Chrome") >= 0) {
        $("body").addClass("chrome-browser");
    }
    else if (navigator.userAgent.search("Firefox") >= 0) {
        $("body").addClass("firefox-browser");
        $("head").append("<style>.body-margin {margin-right:"+scrollbarWidth()+"px}</style>");  
    }
    else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
        $("body").addClass("safari-browser");
    }
    else if (navigator.userAgent.search("Opera") >= 0) {
        $("body").addClass("opera-browser");
    }
    
    
    
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    if (/IEMobile|Windows Phone/i.test(navigator.userAgent)) {
        var windowsPhone = true;
    }
    //OS check========================/
    
    
    
    
    

    //Scrollbar width========================/
    function scrollbarWidth() {
        var block = $('<div>').css({'height':'50px','width':'50px'}),
            indicator = $('<div>').css({'height':'200px'});

        $('body').append(block.append(indicator));
        var w1 = $('div', block).innerWidth();    
        block.css('overflow-y', 'scroll');
        var w2 = $('div', block).innerWidth();
        $(block).remove();
        return (w1 - w2);
    }
    //Scrollbar width========================/
    
    
    //Browser check========================/
    if (navigator.userAgent.search("Chrome") >= 0) {
        $("body").addClass("chrome-browser");
    }
    else if (navigator.userAgent.search("Firefox") >= 0) {
        $("body").addClass("firefox-browser");
    }
    else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
        $("body").addClass("safari-browser");
    }
    else if (navigator.userAgent.search("Opera") >= 0) {
        $("body").addClass("opera-browser");
    }
    //Browser check========================/
    
    
    //Mainpage slider========================/
    if ($("#main_slider_wrap").length) {
        $('#main_slider_wrap').slick({
            arrows: true,
            dots: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            swipe: true,
            fade: true,
            cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
            touchThreshold: 100,
            pauseOnHover: false,
            touchMove: true,
            draggable: true,
            autoplay: true,
            pauseOnHover: true,
            speed: 500,
            autoplaySpeed: 8000,
            prevArrow: $('.main_slider .arrow.prev'),
            nextArrow: $('.main_slider .arrow.next, .next_title')
        });
    }
    //Mainpage slider========================/
    
    
    
    //LightGallery========================/
    
    
    $('.lightgallery').lightGallery({
        mode: 'lg-slide-circular',
        counter: false
    });
//    $('.lightgallery').on('onBeforeOpen.lg',function(event){
//        $("body").css("margin-right", scrollbarWidth());
//    });
//    $('.lightgallery').on('onBeforeClose.lg',function(event){
//        $("body").css("margin-right", "0");
//    });
    //LightGallery========================/
    
    
    //Blog Gallery========================/
    if ($("#blog-slider").length) {
        $('#blog-slider .slider_top').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            dots: false,
            fade: false,
            variableWidth: true,
            infinite: true,
            asNavFor: '#blog-slider .slider_bottom',
            prevArrow: $('#blog-slider .arrow.prev'),
            nextArrow: $('#blog-slider .arrow.next'),
            responsive: [
                {
                  breakpoint: 1000,
                  settings: {
                      variableWidth: false,
                      slidesToShow: 1
                  }
                }
              ]
        });
        $('#blog-slider .slider_bottom').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            asNavFor: '#blog-slider .slider_top',
            dots: false,
            variableWidth: true,
            centerMode: false,
            infinite: true,
            focusOnSelect: true,
            responsive: [
                {
                  breakpoint: 1200,
                  settings: {
                      slidesToShow: 3
                  }
                },
                {
                  breakpoint: 1000,
                  settings: {
                      variableWidth: false,
                      slidesToShow: 3
                  }
                },
                {
                  breakpoint: 640,
                  settings: {
                      variableWidth: false,
                      slidesToShow: 2
                  }
                }
              ]
        });
    }
    //Blog Gallery========================/
    
    
    //Programm accordeon========================/
    if ($("#programm-days").length) {
        $("#programm-days .day_item .day_item-head").on("click", function(){
            var thisHead = $(this),
                thisBody = thisHead.next();
            
            thisHead.toggleClass("active");
            thisBody.slideToggle();
        });
    }
    //Programm accordeon========================/
    
    
    //Stories slider========================/
    if ($("#stories-slider").length) {
        $('#stories-slider').slick({
            arrows: true,
            dots: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            swipe: true,
            fade: true,
            pauseOnHover: false,
            touchMove: true,
            draggable: true,
            autoplay: true,
            pauseOnHover: true,
            speed: 800,
            autoplaySpeed: 8000,
            prevArrow: $('.stories .arrow.prev'),
            nextArrow: $('.stories .arrow.next')
        });
    }
    //Stories slider========================/
    
    
    //Team slider========================/
    if (($("#team_slider").length) && (screen.width > 1040)) {
        $('#team_slider').slick({
            arrows: true,
            dots: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            swipe: true,
            fade: false,
            pauseOnHover: false,
            touchMove: true,
            draggable: true,
            autoplay: true,
            pauseOnHover: true,
            variableWidth: true,
            speed: 800,
            autoplaySpeed: 8000,
            prevArrow: $('#team_arrows .arrow.prev'),
            nextArrow: $('#team_arrows .arrow.next')
        });
    }
    //Team slider========================/
    
    
    //Office slider========================/
    if ($("#office_slider").length) {
        $('#office_slider').slick({
            arrows: true,
            dots: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            swipe: true,
            fade: false,
            pauseOnHover: false,
            touchMove: true,
            draggable: true,
            autoplay: true,
            pauseOnHover: true,
            speed: 800,
            autoplaySpeed: 8000,
            prevArrow: $('#office_arrows .arrow.prev'),
            nextArrow: $('#office_arrows .arrow.next')
        });
    }
    //Office slider========================/
    
    //Tour page Fallery slider========================/
    if (($("#tour-head-slider").length) && (screen.width > 1040)) {
        $('#tour-head-slider').slick({
            arrows: true,
            dots: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
            swipe: true,
            fade: false,
            pauseOnHover: false,
            touchMove: true,
            draggable: true,
            autoplay: false,
            variableWidth: true,
            pauseOnHover: true,
            speed: 800,
            autoplaySpeed: 8000,
            prevArrow: $('#tour-head-slider-arrows .arrow.prev'),
            nextArrow: $('#tour-head-slider-arrows .arrow.next')
        });
    }
    //Tour page Fallery slider========================/
    
    
    //Tour slider========================/
    if (($("#tour-slider").length) && (screen.width > 1040)) {
        $('#tour-slider').slick({
            arrows: true,
            dots: false,
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            swipe: true,
            fade: false,
            variableWidth: true,
            pauseOnHover: true,
            touchMove: true,
            draggable: true,
            autoplay: true,
            speed: 600,
            autoplaySpeed: 8000,
            prevArrow: $('.most_popular .arrow.prev'),
            nextArrow: $('.most_popular .arrow.next'),
            responsive: [
                {
                  breakpoint: 640,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                      variableWidth: false
                      //arrows: false
                  }
                }
              ]
        });
    }
    //Tour slider========================/
    
    
    //stories slider========================/
    if (($("#stries_slider").length) && (screen.width > 1040)) {
        $('#stries_slider').slick({
            arrows: true,
            dots: false,
            slidesToShow: 5,
            slidesToScroll: 1,
            infinite: true,
            swipe: true,
            fade: false,
            variableWidth: true,
            pauseOnHover: true,
            touchMove: true,
            draggable: true,
            autoplay: true,
            speed: 500,
            autoplaySpeed: 8000,
            prevArrow: $('.stories .arrow.prev'),
            nextArrow: $('.stories .arrow.next'),
        });
    }
    //stories slider========================/
    
    
    //Add to favourites button========================/
    $('.fav-button').on("click", function(e){
        e.preventDefault();
        $(this).toggleClass('added');
        
        if ($(".add-to-favorites").length) {
            $(".add-to-favorites .fav-button").toggleClass('added');
        }
    });
    
    $(".add-to-favorites .fav-button").on("click", function(e){
        e.preventDefault();
        $(this).toggleClass('added');
        
        if ($(".add-to-favorites").length) {
            $(".tour_page_head .fav-button").toggleClass('added');
        }
    });
    //Add to favourites button========================/
    
    
    //Beautiful shadow========================/
    $(".js-shadow").each(function(){
        var thisShadow = $(this),
            thisParent = $(this).parent(),
            thisStyle = thisParent.attr("style");
        
        thisShadow.attr("style", thisStyle);
    });
    //Beautiful shadow========================/
    

    //Popup fix========================/
    function popupFunction(){  
        if((iOS == true) || (windowsPhone == true)) {
            var scrollTop = $(window).scrollTop();
            var windowH = $(window).innerHeight();

            $("body").addClass("pop-up-open");
            $("body").attr("data-top", scrollTop);
            if (windowsPhone == true) {
                $("body").css("top", scrollTop);
            }
            $("body").css({
                "top": "-" + scrollTop + "px"
            });
        } 
    }

    function popupCloseFunction(){
        if((iOS == true) || (windowsPhone == true)) {
            var scTop = $("body").attr("data-top");
            if (windowsPhone == true) {
                var scTop = $("body").css("top");
            }
            var suffix = scTop.match(/\d+/);
            $("body").removeClass("pop-up-open");
            $("body").removeAttr("style");

            $("html, body").scrollTop(parseInt(suffix));
        }
    }
    //Popup fix========================/
    
    
    //if IE========================/
    function msieversion() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))
        {
            //alert("IE");
            $("body").addClass("ie-browser");
        }
        else 
        {
            // not IE
        }
        return false;
    }
    msieversion();
    //if IE========================/
    
    
    //Calendar========================/
    $(".js_calendar").datepicker({
      dateFormat: "d MM yy",
        dayNamesMin: [ "S", "M", "T", "W", "T", "F", "S" ],
        monthNames: [ "January", "February", "March", "April", "May", "June", "Jule", "August", "September", "Oktober", "November", "December" ],
        setDate: "today",
        firstDay: 0
    });
    
    $(".js_calendar").datepicker().datepicker("setDate", new Date());
    //Calendar========================/
    
    
    //Input number only========================/
    $('.js_num').on('keydown', function(e){
      if(e.key.length == 1 && e.key.match(/[^0-9'".]/)){
        return false;
      };
    });
    
    $(".num_wrap .js_num").on("keypress", function(evt) {
      if (this.value.length==2) {
        return false;
      }
    });
    //Input number only========================/
    
    
    //Calendar Date change========================/
    $(".js_calendar").on("change", function(){
        var thisParent = $(this).parent();
        var thisVal = $(this).val();
        var date = thisVal.split(' ');
        
        var day = date[0];
        var month = date[1];
        var year = date[2];
        
        var thisDayDiv = thisParent.children(".day");
        var thisMonthDiv = thisParent.children(".date_div_right").find(".month");
        var thisYearDiv = thisParent.children(".date_div_right").find(".year");
        
        thisDayDiv.text(day);
        thisMonthDiv.text(month);
        thisYearDiv.text(year);
    });
    
    $(window).on("load", function(){
        $(".js_calendar").each(function(){
            var thisInput = $(this);
            
            var thisParent = thisInput.parent();
            var thisVal = thisInput.val();
            var date = thisVal.split(' ');

            var day = date[0];
            var month = date[1];
            var year = date[2];

            var thisDayDiv = thisParent.children(".day");
            var thisMonthDiv = thisParent.children(".date_div_right").find(".month");
            var thisYearDiv = thisParent.children(".date_div_right").find(".year");

            thisDayDiv.text(day);
            thisMonthDiv.text(month);
            thisYearDiv.text(year);
        });
        
    });
    
    var months = [
                "January", "February", "March", "April", "May", "June", "Jule", "August", "September", "Oktober", "November", "December"
            ]
    
    if (screen.width <= 1040) {
        
        $("body").addClass("mobile");
        
        $(".date_div .mobile-input").on("change", function(){
            var thisParent = $(this).parent();
            var thisVal = $(this).val();
            var date = thisVal.split('-');



            var day = date[2];
            var day = day.replace(/^0+/, '');
            var month = date[1];
            var month = months[+month-1];
            var year = date[0];

                $(this).prev().datepicker().datepicker("setDate", (day + " " + month + " " + year));

            var thisDayDiv = thisParent.children(".day");
            var thisMonthDiv = thisParent.children(".date_div_right").find(".month");
            var thisYearDiv = thisParent.children(".date_div_right").find(".year");

            thisDayDiv.text(day);
            thisMonthDiv.text(month);
            thisYearDiv.text(year);
        });
        
        $("body").append("<div id='setHeight' style='position:fixed; top:0; bottom:0;left:0;right:0;z-index:-10'></div>")
             var activeHeight = $("#setHeight").innerHeight();
             $("#setHeight").remove();
             $(".js_height").innerHeight(activeHeight);
    }
    //Calendar Date change========================/
    
    
    
    //Plus minus buttons ========================/
    (function quantityProducts() {
        var $quantityArrowMinus = $(".minus");
        var $quantityArrowPlus = $(".plus");


        $quantityArrowMinus.click(quantityMinus);
        $quantityArrowPlus.click(quantityPlus);

        function quantityMinus() {
          var $quantityNum = $(this).parent().next("input");
            
            if ($quantityNum.val() == 1) {
            $quantityNum.addClass("zero");
          }

          if ($quantityNum.val() > 0) {
            $quantityNum.val(+$quantityNum.val() - 1);
          }
        }

        function quantityPlus() {
            var $quantityNum = $(this).parent().next("input");
            if ($quantityNum.val() == 0) {
                $quantityNum.removeClass("zero");
              }
            
            if ($quantityNum.val() < 99) {
                $quantityNum.val(+$quantityNum.val() + 1);
              }

        }
    })();
    //Plus minus buttons ========================/
    
    
    //Select change ========================/
    $(".select_wrap select").on("change", function(){
        $(this).addClass("selected");
    });
    //Select change ========================/
    
    
    //Search Popup ========================/
    // $(".search_btn").on("click", function(e){
    //     e.preventDefault();
        
    //     $("#modal_search").fadeIn();
    //     $("html, body").addClass("locked");
    //     popupFunction();
    // });
    
    $("#modal_search .close").on("click", function(e){
        e.preventDefault();
        
        $("#modal_search").fadeOut();
        $("html, body").removeClass("locked");
        popupCloseFunction();
    });
    //Search Popup ========================/
    
    
    
    //Footer transform ========================/
    $(window).on('resize',function() {
        if( window.innerWidth <= 1000 ){
              $(".m_title").addClass("js-column_title");
         }
        
        if( window.innerWidth > 1000 ){
              $(".m_title").removeClass("js-column_title");
         }
        
    });
    
    if (screen.width <= 1000) {
        $(".m_title").addClass("js-column_title");
    }
    
    $( ".m_title" ).on( "click", function(){
        var this_title = $(this),
            thisUl = this_title.next();
        
        if (this_title.hasClass("js-column_title")) {
            this_title.toggleClass("active");
            thisUl.slideToggle();
        }
    });
    
    $(window).trigger('resize');
    //Footer transform ========================/
    
    
    
    //Story Single ========================/
    if ($("#stories_page").length) {
        $("#stories_box .item.active").next().addClass("next");
        var storiesCount = $("#stories_box .item").length;
        $("#stories-counter .all").text(storiesCount-1);
        
        $("#stories_box .item").each(function(){
            var thisImg = $(this).attr("data-blur-bg");
            $("#stories_bg").append("<img src='"+thisImg+"'>");
            $("#stories_box .dots ul").append("<li></li>");
        });
        
        $("#stories_box .item:last-child").addClass("active");
        $("#stories_box .dots ul li:first-child").addClass("active");
        
        function storiesTurn() {
            
            var thisArrow = $(this),
                activeStory = $("#stories_box .item.active"),
                nextStory = activeStory.prev(),
                nextStoryBg = nextStory.attr("data-blur-bg"),
                prevStory = activeStory.next(),
                prevStoryBg = prevStory.attr("data-blur-bg"),
                count = +($("#stories-counter .this").text());



            if (thisArrow.hasClass("next")) {


                if (!activeStory.is(":first-child")) {
                    $("#stories_bg img[src='"+nextStoryBg+"']").fadeIn();
                    $("#stories_bg img[src!='"+nextStoryBg+"']").fadeOut();
                    prevStory.removeClass("prev");
                    activeStory.addClass("seen");
                    activeStory.addClass("prev");
                    activeStory.removeClass("active");
                    nextStory.removeClass("next");
                    nextStory.addClass("active");
                    nextStory.prev().addClass("next");

                    $("#stories-counter .this").text(count+1);
                    $("#stories_box .dots ul li").removeClass("active");
                    $("#stories_box .dots ul li").eq(count).addClass("active");
                }

                if ($("#stories_box .arrow.prev").hasClass("disabled")) {
                    $("#stories_box .arrow.prev").removeClass("disabled");
                    $("#stories_box .arrow.prev").show();
                }

                if (nextStory.is(":first-child")) {
                    $("#stories_box .arrow.next").addClass("disabled");
                    $("#stories_box .arrow.next").hide();
                    $("#stories-counter").hide();
                }
            }

            if (thisArrow.hasClass("prev")) {


                if (!activeStory.is(":last-child")) {
                    $("#stories_bg img[src='"+prevStoryBg+"']").fadeIn();
                    $("#stories_bg img[src!='"+prevStoryBg+"']").fadeOut();

                    activeStory.removeClass("active");
                    nextStory.removeClass("next");
                    activeStory.addClass("next");
                    prevStory.removeClass("seen");
                    prevStory.removeClass("prev");
                    prevStory.next().addClass("prev");
                    prevStory.addClass("active");

                    $("#stories-counter .this").text(count-1);
                    $("#stories_box .dots ul li").removeClass("active");
                    $("#stories_box .dots ul li").eq(count-2).addClass("active");
                }

                if ($("#stories_box .arrow.next").hasClass("disabled")) {
                    $("#stories_box .arrow.next").removeClass("disabled");
                    $("#stories_box .arrow.next").show();
                    $("#stories-counter").show();
                }

                if (prevStory.is(":last-child")) {
                    $("#stories_box .arrow.prev").addClass("disabled");
                    $("#stories_box .arrow.prev").hide();
                }
            }
        }

        $("#stories_box .arrow").on("click", storiesTurn);
        
        var myElement = document.getElementById('stories_items');
        var mc = new Hammer(myElement);
        
        mc.on("swipeleft swiperight", function(ev) {
            var activeStory = $("#stories_box .item.active"),
                nextStory = activeStory.prev(),
                nextStoryBg = nextStory.attr("data-blur-bg"),
                prevStory = activeStory.next(),
                prevStoryBg = prevStory.attr("data-blur-bg"),
                count = +($("#stories-counter .this").text());
            
            if (ev.type == "swiperight") {
                if (!activeStory.is(":last-child")) {
                        $("#stories_bg img[src='"+prevStoryBg+"']").fadeIn();
                        $("#stories_bg img[src!='"+prevStoryBg+"']").fadeOut();
                    
                        activeStory.removeClass("active");
                        nextStory.removeClass("next");
                        activeStory.addClass("next");
                        prevStory.removeClass("seen");
                        prevStory.removeClass("prev");
                        prevStory.next().addClass("prev");
                        prevStory.addClass("active");
                    
                        $("#stories-counter .this").text(count-1);
                        $("#stories_box .dots ul li").removeClass("active");
                        $("#stories_box .dots ul li").eq(count-2).addClass("active");
                    }
                
                    if ($("#stories_box .arrow.next").hasClass("disabled")) {
                        $("#stories_box .arrow.next").removeClass("disabled");
                        $("#stories_box .arrow.next").show();
                        $("#stories-counter").show();
                    }
                
                    if (prevStory.is(":last-child")) {
                        $("#stories_box .arrow.prev").addClass("disabled");
                        $("#stories_box .arrow.prev").hide();
                    }
            }
            
            if (ev.type == "swipeleft") {
                if (!activeStory.is(":first-child")) {
                        $("#stories_bg img[src='"+nextStoryBg+"']").fadeIn();
                        $("#stories_bg img[src!='"+nextStoryBg+"']").fadeOut();
                        prevStory.removeClass("prev");
                        activeStory.addClass("seen");
                        activeStory.addClass("prev");
                        activeStory.removeClass("active");
                        nextStory.removeClass("next");
                        nextStory.addClass("active");
                        nextStory.prev().addClass("next");
                    
                        $("#stories-counter .this").text(count+1);
                        $("#stories_box .dots ul li").removeClass("active");
                        $("#stories_box .dots ul li").eq(count).addClass("active");
                    }
                
                    if ($("#stories_box .arrow.prev").hasClass("disabled")) {
                        $("#stories_box .arrow.prev").removeClass("disabled");
                        $("#stories_box .arrow.prev").show();
                    }
                
                    if (nextStory.is(":first-child")) {
                        $("#stories_box .arrow.next").addClass("disabled");
                        $("#stories_box .arrow.next").hide();
                        $("#stories-counter").hide();
                    }
            }
        });
    }
    //Story Single ========================/
    
    
    
    //Dropdown menu========================/
    if (screen.width > 1200) {
        if (window.innerWidth > 1200) {
            $(".dropdown_li").on({
                mouseenter: function () {
                    var thisLi = $(this),
                       thisA = thisLi.children("a"),
                       thisMenu = thisLi.children("ul");

                    if (window.innerWidth > 1200) {
                        thisMenu.stop( true, true ).fadeIn(120);
                    }

                    if (window.innerWidth <= 1200) {
                        thisMenu.stop( true, true ).slideDown();
                    }
                        thisA.addClass("hover");
                },
                mouseleave: function () {
                    var thisLi = $(this),
                   thisA = thisLi.children("a"),
                   thisMenu = thisLi.children("ul");

                    if (window.innerWidth > 1200) {
                        thisMenu.stop( true, true ).fadeOut(120);
                    }

                    if (window.innerWidth <= 1200) {
                        thisMenu.stop( true, true ).slideUp();
                    }
                  thisA.removeClass("hover");
                }
            });
        }
        
        if (window.innerWidth <= 1200) {
            $(".dropdown_li > a").on("click", function(e){
                e.preventDefault();
                var thisA = $(this),
                   thisLi = thisA.parent(),
                   thisMenu = thisA.next("ul");
                    thisMenu.stop( true, true ).slideToggle();
                  thisA.toggleClass("hover");
            });
        }
        
    }
    
    if (screen.width <= 1200) {
        $(".dropdown_li > a").on("click", function(e){
            e.preventDefault();
            var thisA = $(this),
               thisLi = thisA.parent(),
               thisMenu = thisA.next("ul");
                thisMenu.stop( true, true ).slideToggle();
              thisA.toggleClass("hover");
        });
    }
    //Dropdown menu========================/
    
    
    
    //Mobile menu ========================/
    $("#mobile_btn").on("click", function(){
        var thisBtn = $(this),
            menu = $("#menu_wrap").fadeIn();
        
        $("html, body").addClass("locked");
        $("#menu-close, #mobile_btn").addClass("opened");
        popupFunction();
    });
    
    $("#menu-close").on("click", function(){
        
        $("html, body").removeClass("locked");
        $("#menu-close, #mobile_btn").removeClass("opened");
        $("#menu_wrap").fadeOut();
        popupCloseFunction();
    });
    //Mobile menu ========================/
    
    
    
    
    //User rating========================/
    $(".user-rating .star").on({
        mouseenter: function () {
            var thisStar = $(this),
               thisParent = thisStar.parent(".stars"),
               thisStarNum = thisStar.index();
              thisParent.children(".star").removeClass("filled");
              thisParent.children(".star").slice(0,thisStarNum+1).addClass("filled");
        },
        mouseleave: function () {
            var thisStar = $(this),
               thisParent = thisStar.parent(".stars"),
               thisStarNum = thisStar.index();
              thisParent.children(".star").removeClass("filled");
        }
    });

    $(".user-rating .star").on("click", function(e){
        e.preventDefault();
        var thisStar = $(this),
           thisParent = thisStar.parent(".stars"),
           thisStarNum = thisStar.index();

          thisParent.children(".star").slice(0,thisStarNum+1).addClass("selected");
    });
    //User rating========================/
    
    
    
    //Tour Page Single Sidebar ========================/
   var sections = $('.js-section')
  , nav = $('#sidebar-navigation')
  , nav_height = nav.outerHeight();

    $(window).on('scroll', function () {
      var cur_pos = $(this).scrollTop();

      sections.each(function() {
        var top = $(this).offset().top,
            bottom = top + $(this).outerHeight();

        if (cur_pos >= top && cur_pos <= bottom) {
          nav.find('a').removeClass('active');
          sections.removeClass('active');

          $(this).addClass('active');
          nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
        }
      });
    });

    nav.find('a').on('click', function () {
      var $el = $(this)
        , id = $el.attr('href');

      $('html, body').animate({
        scrollTop: $(id).offset().top
      }, 500);

      return false;
    });

    
    $(window).on("resize", function(){
        if ($(".tour_page").length) {
            var sidebarOffset = $(".sidebar").offset().top;
                
                var page_content_top = $(".tour_page_body .wrap_float").offset().top;
                

            $(window).on("scroll", function(){
                var sidebarHeight = $(".sidebar").outerHeight();
                var page_content_Height = $(".tour_page_body .wrap_float").outerHeight();

                var w_top = $(window).scrollTop();
                if((w_top>sidebarOffset) && (!$(".sidebar").hasClass("fixed"))) {
                    $(".sidebar").addClass("fixed");
                  }

                if(w_top<=sidebarOffset) {
                    $(".sidebar").removeClass("fixed");
                  }

                if(w_top>((page_content_top + page_content_Height)-sidebarHeight) ) {
                    $(".sidebar").addClass("bottom");
                  }

                if(w_top<=((page_content_top + page_content_Height)-sidebarHeight) ) {
                    $(".sidebar").removeClass("bottom");
                  }
            });
        }
        
        if (window.innerWidth <= 1200) {
            $("body").addClass("desctop-min");
        }
    });
    
    $(window).trigger('resize');
    //Tour Page Single Sidebar ========================/
    
    
    
    //Animation images on Gallery page ========================/
    if (screen.width > 1040) {
        var scroll_text;
        $(".gallery-item").on({
            mouseenter: function () {
                var $elmt = $(this);
                scroll_text = setInterval(function(){scrollText($elmt);}, 20);
            },
            mouseleave: function () {
                clearInterval(scroll_text);
            }
        });
    }
    
    

        var scrollText = function($elmt){
            var scrollDiv = $elmt.find('div.images .scroll'),
                scrollDivWidth = scrollDiv.width(),
                imagesDiv = $elmt.find('div.images'),
                imagesDivWidth = imagesDiv.width(),
                difference = scrollDivWidth - imagesDivWidth;
            
            var left = scrollDiv.position().left - 1;
            //left = -left > difference ? $elmt.find('div.images .scroll').width() : left;
            if (left <= -(difference)) {
                scrollDiv.css({
                    left: -(difference)
                });
            } else {
               scrollDiv.css({
                    left: left
                }); 
            }
            
        };
    //Animation images on Gallery page ========================/
    
    
    //Usermenu ========================/
    $("#userlink").on("click", function(e){
        e.preventDefault();
        
        var thisLink = $(this),
            usermenu = $("#usermenu");
        
        usermenu.fadeToggle(100);
    });
    
    $(document).on("mouseup", function (e){
        var div = $("#userblock");
        if (!div.is(e.target)
            && div.has(e.target).length === 0) { 
                $("#usermenu").fadeOut(100);
        }
    });
    //Usermenu ========================/
    
    
    
    //Popup open ========================/
    $(".js-popup-open").on("click", function(e){
        e.preventDefault();
        var thisHref = $(this).attr("data-href"),
            popup = $(thisHref);
        
        $(".popup").not(popup).removeClass("opened");
        popup.addClass("opened");
        $("#overlay").fadeIn(100);
        $("html, body").addClass("locked");
        $("body").addClass("body-margin");
    });
    
    $(".popup .close").on("click", function(){
        var thisParent = $(this).parent(".popup");
        
        thisParent.removeClass("opened");
        
        $("#overlay").fadeOut(100);
        $("html, body").removeClass("locked");
        $("body").removeClass("body-margin");
    });
    
    $("#overlay").on("click", function(){
        
        $(".popup").removeClass("opened");
        $("#overlay").fadeOut(100);
        $("html, body").removeClass("locked");
        $("body").removeClass("body-margin");
    });
    //Popup open ========================/
    
    
    //404 page effect ========================/
    if ($(".page_404").length) {
        var torch = document.querySelectorAll('.cover')[0];
        var room = document.querySelectorAll('.room')[0];

        var background = 'radial-gradient(circle at %%, rgba(255,255,255, .8) 0%, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0.85) 100%)';

        function handleMouseover(e) {
          room.addEventListener('mousemove', handleMousemove);
        }

        function handleMouseout(e) {
          torch.style.background = 'rgba(0,0,0,0.85)';
          room.removeEventListener('mousemove');
        }

        function handleMousemove(e) {
          var style = background.replace('%%', e.offsetX + 'px ' + e.offsetY + 'px');
          torch.style.background = style;
        }

        room.addEventListener('mousemove', handleMouseover);
        room.addEventListener('mouseleave', handleMouseout);
    }
    //404 page effect ========================/
    
    
    //Success form ========================/
    // $(".js-submit").on("click", function(e){
    //     e.preventDefault();
    //     $(".popup").removeClass("opened");
    //     $("#contact-us-success").addClass("opened");
    // });
    //Success form ========================/
    
});