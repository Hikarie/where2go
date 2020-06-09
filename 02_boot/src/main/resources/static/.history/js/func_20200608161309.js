/*----------------------------------------------------------------------------------
0. 用户操作
-----------------------------------------------------------------------------------*/

var sleep = function(time) {
    var startTime = new Date().getTime() + parseInt(time, 10);
    while(new Date().getTime() < startTime) {}
};

// 登录
// 检测登录状态，根据状态发送请求、展示页面

$(function(){
    // document.cookie = "email = hikarinoda@163.com;"; // 这句用来调试的时候模拟登录状态
    let email = $.cookie("email");
    if(typeof(email) == "undefined"){
        // 如果没有登录 
        $("#top_panel .right").css("visibility", "hidden");
        $(".usermenu .js-popup-open:contains('设置')").css("display", "none");
    }
    else{
        // 如果已经登录
        $("#top_panel .right").css("visibility", "visible");
        $("#top_panel .right .tel span").text(email);
        // $(".top_panel .right ._counter").text(6);
        $(".usermenu .js-popup-open:contains('登录')").css("display", "none");
        $(".usermenu .js-popup-open:contains('注册')").css("display", "none");
        $(".usermenu .js-popup-open:contains('忘记密码')").css("display", "none");
        $.ajax({
            type: 'post',
            url: '/user/collect',
            data: "{user_id: "+email+"}",
            dataType: 'json',
            contentType: "application/json",
            success: function(d){ 
                if(d.status == 1){
                    $("#top_panel .right ._counter").val(d.num);
                    $("#top_panel .inversion .right ._counter").val(d.num);
                }
            }
        })
    }
    $("#login_submit").on("click", function(e){
        // let data = $("#login_form").serializeArray();
        let data= {
            "email":$("input[name='email']").val(),
            "password":$("input[name='password']").val()
        };
        console.log(data);
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/user/login',
            data: data,
            dataType: 'json',
            success: function(d){ 
                if(d.status == 1){
                    document.cookie = "email="+data.email+";";
                    console.log(d.message)
                    e.preventDefault();
                    $(".popup").removeClass("opened");
                    $("#contact-us-success").addClass("opened");
                    sleep(1000); 
                    location.href = 'index.html';
                }
                else{
                    // alert("登录失败");
                    e.preventDefault();
                    $(".popup").removeClass("opened");
                    $("#contact-us-failed").addClass("opened");
                }
            }
        })
    })
})

// 注册
$(function(){
    $(".popup-body .form .submit").on("click", function(e){
        let data = {
            userName:$(".popup-body .form .input[name='userName']").val(),
            name:$(".popup-body .form .input[name='name']").val(),
            email:$(".popup-body .form .input[name='reg_email']").val(),
            password:$(".popup-body .form .input[name='reg_password']").val()
        }
        
        $.ajax({
            type: 'post',
            url: '/user/register',
            data: data,
            dataType: 'json',
            success: function(d){ 
                if(d.status == 1){
                    // 直接转向登录状态
                    document.cookie = "email="+data.email+";";
                    console.log(d.message)
                    e.preventDefault();
                    $(".popup").removeClass("opened");
                    $("#contact-us-success").addClass("opened");
                    sleep(1000); 
                    location.href = 'index.html';
                }
                else{
                    alert("注册失败");
                    e.preventDefault();
                    $(".popup").removeClass("opened");
                    $("#contact-us-failed").addClass("opened");
                }
            }
        })
    })
})

// 收藏
$(function(){
    let btn = $(".main_slider .buttons .link span");
    let sight1 = $(".main_slider .slide_content .slide_title");

    let bookmark = $(".tour_item .add_bookmark");
    let sight2 = $(".tour_item ._title");

    let tour_btn = $(".tour_page_head .top-info .controls");
    let sight3 = $(".tour_page_head .top-info .tour_title");

    btn.on("click", function(e){
        let email = $.cookie("email");
        let i = btn.index(this);
        let data1 = {
            "email":email,
            "sightName":sight1[i].textContent
        };
        $.ajax({
            type: 'post',
            url: '/user/collection',
            data: data1,
            dataType: 'json',
            success: function(d){ 
                if(d.status == 1){
                    e.preventDefault();
                    $(".popup").removeClass("opened");
                    $("#contact-us-success").addClass("opened");
                    console.log(d.message)
                }
                else{
                    e.preventDefault();
                    $(".popup").removeClass("opened");
                    $("#contact-us-failed").addClass("opened");
                }
            }
        })
    })

    bookmark.on("click", function(e){
        let email = $.cookie("email");
        let i = bookmark.index(this);
        let data2 = {
            "email":email,
            "sightName":sight2[i].textContent
        };
        $.ajax({
            type: 'post',
            url: '/user/collection',
            data: data2,
            dataType: 'json',
            success: function(d){ 
                if(d.status == 1){
                    e.preventDefault();
                    $(".popup").removeClass("opened");
                    $("#contact-us-success").addClass("opened");
                    console.log(d.message)
                }
                else{
                    e.preventDefault();
                    $(".popup").removeClass("opened");
                    $("#contact-us-failed").addClass("opened");
                }
            }
        })
    })

    tour_btn.on("click", function(e){
        let email = $.cookie("email");
        let i = bookmark.index(this);
        let data2 = {
            "email":email,
            "sightName":sight3[0].textContent
        };
        $.ajax({
            type: 'post',
            url: '/user/collection',
            data: data2,
            dataType: 'json',
            success: function(d){ 
                if(d.status == 1){
                    e.preventDefault();
                    $(".popup").removeClass("opened");
                    $("#contact-us-success").addClass("opened");
                    console.log(d.message)
                }
                else{
                    e.preventDefault();
                    $(".popup").removeClass("opened");
                    $("#contact-us-failed").addClass("opened");
                }
            }
        })
    })
})

/*----------------------------------------------------------------------------------
1. 首页
-----------------------------------------------------------------------------------*/

// 首页
$(function(){
    let country = $("p:contains('所在地')");  // 前三个是slide上的，后边是most_hapiness
    let slide_country = country.slice(0,3);

    let slide_title = $(".slide_title");
    let next_title = $(".next_title");
    let slide_text = $(".text");
    let slide_img = $(".bg-img")
    // most_hapiness
    let list_country = country.slice(4,12);
    let list_title = $("._title:contains('景点')");
    let list_cost = $(".cost");
    let rating_text = $(".rating-text");
    let tour_items = $(".tour_item");
    // slide_img[0].style.backgroundImage = "url(img/tour-item-8.jpg)";

    //     let d =      {
    //     "status":1,
    //     "message":"成功",
    //     "result": [
    //       {
    //         "country": "country1",
    //         "happiness_index": 60.00,
    //         "score": 5.0,
    //         "sight_name": "圣母百花大教堂",
    //         "views": 500,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //       {
    //         "country": "country1",
    //         "happiness_index": 50.00,
    //         "score": 5.0,
    //         "sight_name": "苏比利尔湖",
    //         "views": 200,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //       {
    //         "country": "country1",
    //         "happiness_index": 60.00,
    //         "score": 5.0,
    //         "sight_name": "恩戈罗恩戈罗",
    //         "views": 500,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //       {
    //         "country": "country1",
    //         "happiness_index": 50.00,
    //         "score": 5.0,
    //         "sight_name": "乞力马扎罗山",
    //         "views": 200,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //       {
    //         "country": "country1",
    //         "happiness_index": 60.00,
    //         "score": 5.0,
    //         "sight_name": "泰晤士河",
    //         "views": 500,
    //         "description":"xxxxxxxxxxxx"
    //       }
    //     ]
    //   }
    //   let sight = d.result;
    //   // slide上显示前三个
    //   for(let i=0;i<3;i++){
    //       slide_title[i].textContent = sight[i].sight_name;
    //       slide_country[i].textContent = sight[i].country;
    //       next_title[i].textContent = sight[(i+1)%3].sight_name;
    //       if(sight[i].description.length < 100)
    //           slide_text[i].textContent = sight[i].description;
    //       else
    //           slide_text[i].textContent = sight[i].description.substring(0, 100)+"...";
    //       slide_img[i].style.backgroundImage = "url(img/tour/"+sight[i].sight_name+".jpg)";
    //   }
    //   // most_hapiness 显示前五个
    //   for(let i=0;i<sight.length;i++){
    //       list_title[i].textContent = sight[i].sight_name;
    //       list_country[i].textContent = sight[i].country;
    //       list_cost[i].textContent = sight[i].happiness_index;
    //       rating_text[i].textContent = sight[i].views + " 点击";
    //       tour_items[i].style.backgroundImage = "url(img/tour/"+sight[i].sight_name+".jpg)";
    //   }
    //   // 轮换动效
    //   for(let i=0;i<sight.length-1;i++){
    //       list_title[i+5].textContent = sight[i].sight_name;
    //       list_country[i+5].textContent = sight[i].country;
    //       list_cost[i+5].textContent = sight[i].happiness_index;
    //       rating_text[i+5].textContent = sight[i].views + " 点击";
    //       tour_items[i+5].style.backgroundImage = "url(img/tour/"+sight[i].sight_name+".jpg)";
    //   }
    $.ajax({
        type: 'get',
        url: '/sight/happinessOfTop5',
        dataType: 'json',
        success: function(d) {
            let sight = d.result;
            // slide上显示前三个
            for(let i=0;i<3;i++){
                slide_title[i].textContent = sight[i].sight_name;
                slide_country[i].textContent = sight[i].country;
                next_title[i].textContent = sight[(i+1)%3].sight_name;
                if(sight[i].description.length < 100)
                    slide_text[i].textContent = sight[i].description;
                else
                    slide_text[i].textContent = sight[i].description.substring(0, 100)+"...";
                slide_img[i].style.backgroundImage = "url(img/tour/"+sight[i].sight_name+".jpg)";
            }
            // most_hapiness 显示前五个
            for(let i=0;i<sight.length;i++){
                list_title[i].textContent = sight[i].sight_name;
                list_country[i].textContent = sight[i].country;
                list_cost[i].textContent = sight[i].happiness_index;
                rating_text[i].textContent = sight[i].views + " 点击";
                tour_items[i].style.backgroundImage = "url(img/tour/"+sight[i].sight_name+".jpg)";
            }
            // 轮换动效
            for(let i=0;i<sight.length-1;i++){
                list_title[i+5].textContent = sight[i].sight_name;
                list_country[i+5].textContent = sight[i].country;
                list_cost[i+5].textContent = sight[i].happiness_index;
                rating_text[i+5].textContent = sight[i].views + " 点击";
                tour_items[i+5].style.backgroundImage = "url(img/tour/"+sight[i].sight_name+".jpg)";
            }
        }
    });
})

// top-panel搜索栏
$(function(){
    $(".search_btn").on("click", function(e){
        let search_input = $("input[type='search']")
        if(search_input.val() === ""){
            e.preventDefault();
            $("#modal_search").fadeIn();
            $("html, body").addClass("locked");
            popupFunction();
        }
        else{
            location.href = 'browse.html';
        }
    })

})

// 搜索栏
$(function(){
    $(".submit button[type='search']").on("click", function(e){
        let search_input = $("input[type='email']")
        if(search_input.val() === ""){

        }
        else{
            location.href = 'browse.html';
        }
    })
})


/*----------------------------------------------------------------------------------
2. 幸福指数排行
-----------------------------------------------------------------------------------*/
// html生成器
var generate_html = function(curr_page, d, content, count){
    content.empty();
    let curr_num = (curr_page-1)*count;
    for(let i= curr_num; i<curr_num+count;i++){
        $('.travel-list.right-sidebar .left_content .posts').append(
            "<a href='tour.html' class='item'>\
            <div class='item_left'>\
                <div class='image' style='background-image: url(img/tour/"+d.result[i].sight_name+".jpg)'>\
                    <div class='shadow js-shadow'></div>\
                </div>\
            </div>\
            <div class='item_right'>\
                <p class='country'>"+d.result[i].country+"</p>\
                <div class='rating-stars'>\
                <div class='star filled'></div>\
                <div class='star filled'></div>\
                <div class='star filled'></div>\
                <div class='star'></div>\
                <div class='star'></div>\
                </div>\
                <h3 class='item_title'>"+d.result[i].sight_name+"</h3>\
                <p class='item_text'>"+d.result[i].description+"</p>\
                <div class='info'>\
                    <div class='days'>幸福指数 |</div>\
                <div class='cost'>"+d.result[i].happiness_index+"</div>\
                <p class='rating-text'>"+d.result[i].views +"点击</p>\
                </div>\
                <div class='add_bookmark fav-button'>\
                <i class='is-added bouncy'></i>\
                <i class='not-added bouncy'></i>\
                <span class='fav-overlay'></span>\
            </div>\
            </div>\
        </a>");
    }
}
// page_body现实主要幸福指数排行榜
$(function(){
    
    var content = $('.travel-list.right-sidebar .left_content .posts');
    var page_list = $('#happiness_page ul');
    var count = 5;  // 一页里item的总量

    


    // let d = {
    //     "status":1,
    //     "message":"成功",
    //     "result": [
    //       {
    //         "country": "country1",
    //         "happiness_index": 60.00,
    //         "score": 5.0,
    //         "sight_name": "圣母百花大教堂",
    //         "views": 500,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //       {
    //         "country": "country1",
    //         "happiness_index": 50.00,
    //         "score": 5.0,
    //         "sight_name": "苏比利尔湖",
    //         "views": 200,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //       {
    //         "country": "country1",
    //         "happiness_index": 60.00,
    //         "score": 5.0,
    //         "sight_name": "恩戈罗恩戈罗",
    //         "views": 500,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //       {
    //         "country": "country1",
    //         "happiness_index": 50.00,
    //         "score": 5.0,
    //         "sight_name": "乞力马扎罗山",
    //         "views": 200,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //       {
    //         "country": "country1",
    //         "happiness_index": 60.00,
    //         "score": 5.0,
    //         "sight_name": "泰晤士河",
    //         "views": 500,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //       {
    //         "country": "country1",
    //         "happiness_index": 50.00,
    //         "score": 5.0,
    //         "sight_name": "万神殿",
    //         "views": 200,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //       {
    //         "country": "country1",
    //         "happiness_index": 60.00,
    //         "score": 5.0,
    //         "sight_name": "卫城",
    //         "views": 500,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //       {
    //         "country": "country1",
    //         "happiness_index": 50.00,
    //         "score": 5.0,
    //         "sight_name": "吴哥窟",
    //         "views": 200,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //       {
    //         "country": "country1",
    //         "happiness_index": 60.00,
    //         "score": 5.0,
    //         "sight_name": "夏威夷",
    //         "views": 500,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //       {
    //         "country": "country1",
    //         "happiness_index": 50.00,
    //         "score": 5.0,
    //         "sight_name": "新天鹅堡",
    //         "views": 200,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //     ]
    //   }


    // let len = d.result.length;
    // let page_num = Math.round(len/count);
    // for(let i=0;i<page_num;i++){
    //     page_list.append("<li><a href='#'>"+(i+1)+"</a></li>");
    // }
    // let curr_page = 1;
    // $(".travel-list.right-sidebar .left_content #happiness_page ul li a:contains('"+curr_page+"')").addClass("active");
    // generate_html(curr_page, d, content, count);


    $.ajax({
        type: 'get',
        url: '/sight/happinessRanking',
        dataType: 'json',
        success: function(d) {
            if(d.status == 1){
                // let count = 5;  // 一页里item的总量
                let len = d.result.length;
                let page_num = Math.round(len/count);
                for(let i=0;i<page_num;i++){
                    page_list.append("<li><a href='#'>"+(i+1)+"</a></li>");
                }
                let curr_page = 1;
                $(".travel-list.right-sidebar .left_content #happiness_page ul li a:contains('"+curr_page+"')").addClass("active");
                generate_html(1, d, content, count);
            }
        }
    })

    // 翻页
    $("#happiness_page .arrow.next").on("click",function(e){
        let prev_page = curr_page;
        curr_page++;
        console.log(curr_page);
        $(".travel-list.right-sidebar .left_content #happiness_page ul li a:contains('"+curr_page+"')").addClass("active");
        $(".travel-list.right-sidebar .left_content #happiness_page ul li a:contains('"+prev_page+"')").removeClass("active");
        generate_html(curr_page, d, content, count);
    })
    $("#happiness_page .arrow.prev").on("click",function(e){
        let prev_page = curr_page;
        curr_page--;
        console.log(curr_page);
        $(".travel-list.right-sidebar .left_content #happiness_page ul li a:contains('"+curr_page+"')").addClass("active");
        $(".travel-list.right-sidebar .left_content #happiness_page ul li a:contains('"+prev_page+"')").removeClass("active");
        generate_html(curr_page, d, content, count);
    })

    $(".travel-list.right-sidebar .left_content #happiness_page ul li a").on("click",function(e){
        let prev_page = curr_page;
        curr_page = this.textContent;
        console.log(curr_page);
        $(".travel-list.right-sidebar .left_content #happiness_page ul li a:contains('"+curr_page+"')").addClass("active");
        $(".travel-list.right-sidebar .left_content #happiness_page ul li a:contains('"+prev_page+"')").removeClass("active");
        generate_html(curr_page, d, content, count);
    })
})

// 侧栏的人气预览
$(function(){
    let img = $(".sidebar ._block .popular .item_top .img");
    let title = $(".sidebar ._block .popular .item_top ._title");
    let popular = $(".sidebar ._block .popular .item_bottom .cost");

    // d = {
    //     "status":1,
    //     "message":"成功",
    //     "result": [
    //       {
    //         "sight_name": "自由女神像",
    //         "views": 500,
    //       },
    //       {
    //         "sight_name": "恩戈罗恩戈罗",
    //         "views": 200
    //       },
    //       {
    //         "sight_name": "夏威夷",
    //         "views": 400
    //       },
    //       {
    //         "sight_name": "苏比利尔湖",
    //         "views": 300
    //       },
    //       {
    //         "sight_name": "锡安山国家公园",
    //         "views": 100
    //       }
    //     ]
    //   }
    // let sight = d.result;
    // for(let i=0;i<5;i++){
    //     title[i].textContent = sight[i].sight_name;
    //     popular[i].textContent = sight[i].views;
    //     img[i].style.backgroundImage = "url(img/tour/"+sight[i].sight_name+".jpg)";
    // }
    
    $.ajax({
        type: 'get',
        url: '/sight/sidebar/popularityOfTop5',
        dataType: 'json',
        success: function(d) {
            let sight = d.result;
            for(let i=0;i<5;i++){
                title[i].textContent = sight[i].sight_name;
                popular[i].textContent = sight[i].views;
                img[i].style.backgroundImage = "url(img/tour/"+sight[i].sight_name+".jpg)";
            }
        }
    })
})

/*----------------------------------------------------------------------------------
3. 人气排行
-----------------------------------------------------------------------------------*/

var generate_tour_item = function(curr_page, d, content, count){
    content.empty();
    let curr_num = (curr_page-1)*count;
    for(let i=curr_num; i<curr_num+count; i++){
        content.append("\
        <a href='tour.html' class='tour_item' style='background-image: url(img/tour/"+d.result[i].sight_name+".jpg)'>\
        <div class='tour_item_top'>\
            <p class='country'>\
                <span>"+d.result[i].country+"</span>\
            </p>\
            <div class= 'add_bookmark fav-button added'>\
                <i class='is-added bouncy'></i>\
                <i class='not-added bouncy'></i>\
                <span class='fav-overlay'></span>\
            </div>\
        </div>\
        <div class='tour_item_bottom'>\
            <h3 class='_title'>"+d.result[i].sight_name+"</h3>\
            <div class='_info'>\
                <div class='_info_left'>\
                    <div class='days'>幸福指数 |</div>\
                    <div class='cost'>"+d.result[i].happiness_index+"</div>\
                </div>\
                <div class='_info_right'>\
                    <div class='rating-stars'>\
                        <div class='star filled'></div>\
                        <div class='star filled'></div>\
                        <div class='star filled'></div>\
                        <div class='star'></div>\
                        <div class='star'></div>\
                    </div>\
                    <div class='rating-text'>"+d.result[i].views+"点击</div>\
                </div>\
            </div>\
        </div>\
        <div class='shadow js-shadow'></div>\
    </a>\
        ");
    }
}

$(function(){
    let email = $.cookie("email");
    let content = $("#popular_content");
    var page_list = $(".travel-list.full-width #popular_page ul")
    let count = 10;  // 每页显示10个

    // let d =      {
    //     "status":1,
    //     "message":"成功",
    //     "result": [
    //       {
    //         "country": "country1",
    //         "happiness_index": 60.00,
    //         "score": 5.0,
    //         "sight_name": "圣母百花大教堂",
    //         "views": 500,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //       {
    //         "country": "country1",
    //         "happiness_index": 50.00,
    //         "score": 5.0,
    //         "sight_name": "苏比利尔湖",
    //         "views": 200,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //       {
    //         "country": "country1",
    //         "happiness_index": 60.00,
    //         "score": 5.0,
    //         "sight_name": "恩戈罗恩戈罗",
    //         "views": 500,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //       {
    //         "country": "country1",
    //         "happiness_index": 50.00,
    //         "score": 5.0,
    //         "sight_name": "乞力马扎罗山",
    //         "views": 200,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //       {
    //         "country": "country1",
    //         "happiness_index": 60.00,
    //         "score": 5.0,
    //         "sight_name": "泰晤士河",
    //         "views": 500,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //       {
    //         "country": "country1",
    //         "happiness_index": 50.00,
    //         "score": 5.0,
    //         "sight_name": "万神殿",
    //         "views": 200,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //       {
    //         "country": "country1",
    //         "happiness_index": 60.00,
    //         "score": 5.0,
    //         "sight_name": "卫城",
    //         "views": 500,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //       {
    //         "country": "country1",
    //         "happiness_index": 50.00,
    //         "score": 5.0,
    //         "sight_name": "吴哥窟",
    //         "views": 200,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //       {
    //         "country": "country1",
    //         "happiness_index": 60.00,
    //         "score": 5.0,
    //         "sight_name": "夏威夷",
    //         "views": 500,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //       {
    //         "country": "country1",
    //         "happiness_index": 50.00,
    //         "score": 5.0,
    //         "sight_name": "新天鹅堡",
    //         "views": 200,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //     ]
    //   }

    // let len = d.result.length;
    // let page_num = Math.round(len/count);
    // for(let i=0;i<page_num;i++){
    //     page_list.append("<li><a href='#'>"+(i+1)+"</a></li>");
    // }
    // let curr_page = 1;
    // $(".travel-list.full-width #popular_page ul li a:contains('"+curr_page+"')").addClass("active");
    // generate_tour_item(curr_page, d, content, count);

    $("#popular_page .arrow.next").on("click",function(e){
        let prev_page = curr_page;
        curr_page++;
        console.log(curr_page);
        $("#popular_page ul li a:contains('"+curr_page+"')").addClass("active");
        $("#popular_page ul li a:contains('"+prev_page+"')").removeClass("active");
        generate_tour_item(curr_page, d, content, count);
    })
    $("#popular_page .arrow.prev").on("click",function(e){
        let prev_page = curr_page;
        curr_page--;
        console.log(curr_page);
        $("#popular_page ul li a:contains('"+curr_page+"')").addClass("active");
        $("#popular_page ul li a:contains('"+prev_page+"')").removeClass("active");
        generate_tour_item(curr_page, d, content, count);
    })

    $("#popular_page ul li a").on("click",function(e){
        let prev_page = curr_page;
        curr_page = this.textContent;
        console.log(curr_page);
        $("#popular_page ul li a:contains('"+curr_page+"')").addClass("active");
        $("#popular_page ul li a:contains('"+prev_page+"')").removeClass("active");
        generate_tour_item(curr_page, d, content, count);
    })

    $.ajax({
        type: 'get',
        url: '/sight/happinessOfTop5',
        dataType: 'json',
        data:{
            "email":email
        },
        success: function(d) {
            if(d.status == 1){
                let len = d.result.length;
                let page_num = Math.round(len/count);
                for(let i=0;i<page_num;i++){
                    page_list.append("<li><a href='#'>"+(i+1)+"</a></li>");
                }
                let curr_page = 1;
                $("#popular_page ul li a:contains('"+curr_page+"')").addClass("active");
                generate_html(1, d, content, count);
            }
        }
    })
})

/*----------------------------------------------------------------------------------
4. 收藏
-----------------------------------------------------------------------------------*/
$(function(){
    let email = $.cookie("email");
    let content = $("#favour_content");
    var page_list = $("#favour_page ul")
    let count = 6;  // 每页显示6个
    // let d =      {
    //     "status":1,
    //     "message":"成功", 
    //     "result": [
    //       {
    //         "country": "country1",
    //         "happiness_index": 60.00,
    //         "score": 5.0,
    //         "sight_name": "圣母百花大教堂",
    //         "views": 500,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //       {
    //         "country": "country1",
    //         "happiness_index": 50.00,
    //         "score": 5.0,
    //         "sight_name": "苏比利尔湖",
    //         "views": 200,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //       {
    //         "country": "country1",
    //         "happiness_index": 60.00,
    //         "score": 5.0,
    //         "sight_name": "恩戈罗恩戈罗",
    //         "views": 500,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //       {
    //         "country": "country1",
    //         "happiness_index": 50.00,
    //         "score": 5.0,
    //         "sight_name": "乞力马扎罗山",
    //         "views": 200,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //       {
    //         "country": "country1",
    //         "happiness_index": 60.00,
    //         "score": 5.0,
    //         "sight_name": "泰晤士河",
    //         "views": 500,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //       {
    //         "country": "country1",
    //         "happiness_index": 50.00,
    //         "score": 5.0,
    //         "sight_name": "万神殿",
    //         "views": 200,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //       {
    //         "country": "country1",
    //         "happiness_index": 60.00,
    //         "score": 5.0,
    //         "sight_name": "卫城",
    //         "views": 500,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //       {
    //         "country": "country1",
    //         "happiness_index": 50.00,
    //         "score": 5.0,
    //         "sight_name": "吴哥窟",
    //         "views": 200,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //       {
    //         "country": "country1",
    //         "happiness_index": 60.00,
    //         "score": 5.0,
    //         "sight_name": "夏威夷",
    //         "views": 500,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //       {
    //         "country": "country1",
    //         "happiness_index": 50.00,
    //         "score": 5.0,
    //         "sight_name": "新天鹅堡",
    //         "views": 200,
    //         "description":"xxxxxxxxxxxx"
    //       },
    //     ]
    //   }

    //   $(".page.favourites-list .page_head .title span").text(d.result.length);

    //   let len = d.result.length;
    //   let page_num = Math.round(len/count);
    //   for(let i=0;i<page_num;i++){
    //       page_list.append("<li><a href='#'>"+(i+1)+"</a></li>");
    //   }
    //   let curr_page = 1;
    //   $("#favour_page ul li a:contains('"+curr_page+"')").addClass("active");
    //   generate_tour_item(curr_page, d, content, count);


      $("#favour_page .arrow.next").on("click",function(e){
        let prev_page = curr_page;
        curr_page++;
        console.log(curr_page);
        $("#favour_page ul li a:contains('"+curr_page+"')").addClass("active");
        $("#favour_page ul li a:contains('"+prev_page+"')").removeClass("active");
        generate_tour_item(curr_page, d, content, count);
    })
    $("#favour_page .arrow.prev").on("click",function(e){
        let prev_page = curr_page;
        curr_page--;
        console.log(curr_page);
        $("#favour_page ul li a:contains('"+curr_page+"')").addClass("active");
        $("#favour_page ul li a:contains('"+prev_page+"')").removeClass("active");
        generate_tour_item(curr_page, d, content, count);
    })

    $("#favour_page ul li a").on("click",function(e){
        let prev_page = curr_page;
        curr_page = this.textContent;
        console.log(curr_page);
        $("#favour_page ul li a:contains('"+curr_page+"')").addClass("active");
        $("#favour_page ul li a:contains('"+prev_page+"')").removeClass("active");
        generate_tour_item(curr_page, d, content, count);
    })
      
    $.ajax({
        type: 'get',
        url: '/sight/happinessOfTop5',
        dataType: 'json',
        data:{
            "email":email
        },
        success: function(d) {
            $(".page.favourites-list .page_head .title span").text(d.result.length);
            let len = d.result.length;
            let page_num = Math.round(len/count);
            for(let i=0;i<page_num;i++){
                page_list.append("<li><a href='#'>"+(i+1)+"</a></li>");
            }
            let curr_page = 1;
            $("#favour_page ul li a:contains('"+curr_page+"')").addClass("active");
            generate_tour_item(curr_page, d, content, count);
        }
    })
    
})

/*----------------------------------------------------------------------------------
5. 景点详情页面
-----------------------------------------------------------------------------------*/
$(function(){
    /* 各种页面的tour-item都会指向这个页面
     * 列出所有可能会指向这里的元素
     */
    var sight_name = "";
    let email = $.cookie("email");

    // 首页
    let slide_button = $(".main_slider .slider_wrap .slide .slide_content .buttons .btn");

    slide_button.on("click", function(e){
        let name = $(".main_slider .slider_wrap .slide .slide_content .title_wrap .slide_title");
        sight_name = name[slide_button.index(this)].textContent;
        console.log(sight_name);
    })


    // 幸福排行
    let hapiness_item = $(".travel-list .posts .item");
    let sidebar_item = $(".sidebar ._block .popular .item");
    hapiness_item.on("click", function(e){
        let name = $(".travel-list .posts .item_right .item_title");
        sight_name = name[slide_button.index(this)].textContent;
        console.log(sight_name);
    })
    sidebar_item.on("click", function(e){
        let name = (".sidebar ._block .popular .item_top ._title")
        sight_name = name[tour_item.index(this)].textContent;
        console.log(sight_name);
    })


    // tour_item
    let tour_item = $(".tour_item");
    tour_item.on("click", function(e){
        let name = $(".tour_item_bottom ._title");
        sight_name = name[tour_item.index(this)].textContent;
        console.log(sight_name);
    })


    //    d = {
    //     "status":1,
    //     "message":"成功",
    //     "result":{
    //         sight_name : "圣母百花大教堂",
    //         sight_type : "地区",
    //         state : "欧洲",
    //         country : "意大利",
    //         city : "威尼斯",
    //         score : 5.0,
    //         views : 100,
    //         description : "威尼斯（Venice）是意大利东北部著名的旅游与工业城市，也是威尼托地区（威内托大区）的首府。威尼斯曾经是威尼斯共和国的中心，被称作“亚得里亚海明珠”，十字军进行十字军东征时也曾在这里集结，堪称世界最浪漫的城市之一。 威尼斯市区涵盖意大利东北部亚得里亚海沿岸的威尼斯潟湖的118个人工岛屿和邻近一个人工半岛，更有117条水道纵横交叉。这个咸水潟湖分布在波河与皮亚韦河之间的海岸线。",
    //         happiness_index : -59.91,
    //         angry: 16.08,
    //         depress : 0,
    //         fear:16.62,
    //         happy:20.04,
    //         sad:25.55,
    //         surprise:0.88,
    //         neutral:20.93,
    //         happiness_ranking:30,
    //         popular_ranking:2
    //     }
    // }

    // if(d.status == 1){
    //     // location.href = 'tour.html';
    //     let pagebg = $(".tour_page_head");
    //     pagebg[0].style.backgroundImage = "url(img/tour/"+d.result.sight_name+".jpg)";
    //     $("#litte_name").text(d.result.sight_name);
    //     $(".tour_page_head .top-info .country").text(d.result.country);
    //     $(".tour_page_head .top-info .tour_title").text(d.result.sight_name);
    //     $(".tour_page_body .left_content .description").text(d.result.description);
    //     let li = $(".tour_page_body .left_content .included ul li .li_title");
    //     li[0].textContent = d.result.sight_type;
    //     li[1].textContent = d.result.state;
    //     li[2].textContent = d.result.happiness_index;
    //     li[3].textContent = d.result.views;
    //     // 设置参数
    //     let data = {
    //         labels: ["Angry", "Depress","Fear","Happy","Sad","Surprise","Neutral"],
    //         datasets: [
    //             {
    //                 // data: [16.08, 0, 16.62, 20.04, 25.55, 0.88, 20.93],
    //                 data: [d.result.angry, d.result.depress, d.result.fear, d.result.happy, d.result.sad, d.result.surprise, d.result.neutral],
    //                 backgroundColor: ["#FFFF99","#99CC99","#666600","#996633","#663300","#CC9966","#FFFFCC"],
    //                 hoverBackgroundColor: ["#FFFF99","#99CC99","#666600","#996633","#663300","#CC9966","#FFFFCC"]
    //             }]
    //     };
    //     var ct = document.getElementById("myChart").getContext("2d");
    //     var myBarChart = new Chart(ct, {
    //                                         type: 'pie',
    //                                         data: data,
    //                                         // options: options
    //                                 });
    // }

    $.ajax({
        type: 'get',
        url: '/sight/information',
        dataType: 'json',
        data:{
            "sightName":sight_name,
            "email":email
        },
        success: function(d) {
            if(d.status == 1){
                location.href = 'tour.html';
                let pagebg = $(".tour_page_head");
                pagebg[0].style.backgroundImage = "url(img/tour/"+d.result.sight_name+".jpg)";
                $("#litte_name").text(d.result.sight_name);
                $(".tour_page_head .top-info .country").text(d.result.country);
                $(".tour_page_head .top-info .tour_title").text(d.result.sight_name);
                $(".tour_page_body .left_content .description").text(d.result.description);
                let li = $(".tour_page_body .left_content .included ul li .li_title");
                li[0].textContent = d.result.sight_type;
                li[1].textContent = d.result.state;
                li[2].textContent = d.result.happiness_index;
                li[3].textContent = d.result.views;
                // 设置参数
                var data = {
                    labels: ["Angry", "Depress","Fear","Happy","Sad","Surprise","Neutral"],
                    datasets: [{
                            // data: [16.08, 0, 16.62, 20.04, 25.55, 0.88, 20.93],
                            data: [d.result.angry, d.result.depress, d.result.fear, d.result.happy, d.result.sad, d.result.surprise, d.result.neutral],
                            backgroundColor: ["#FFFF99","#99CC99","#666600","#996633","#663300","#CC9966","#FFFFCC"],
                            hoverBackgroundColor: ["#FFFF99","#99CC99","#666600","#996633","#663300","#CC9966","#FFFFCC"]
                        }]
                };
                var ct = document.getElementById("myChart").getContext("2d");
                var myBarChart = new Chart(ct, {
                                                    type: 'pie',
                                                    data: data,
                                                    // options: options
                                            });
            }
        }
    })
})