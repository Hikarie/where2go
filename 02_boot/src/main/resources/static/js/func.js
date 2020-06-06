
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
            type: 'get',
            url: '/user/collect',
            data: "{user_id: "+email+"}",
            dataType: 'json',
            success: function(d){ 
                if(d.status == 1){
                    $("#top_panel .right ._counter").val(d.num);
                    $("#top_panel .inversion .right ._counter").val(d.num);
                }
            }
        })
    }
    $("#login_submit").click(function(){
        let data = $("#login_form").serializeArray();
        console.log(JSON.stringify(data));
        $.ajax({
            type: 'post',
            url: '/user/login',
            data: JSON.stringify(data),
            dataType: 'json',
            success: function(d){ 
                if(d.status == 1){
                    location.href = 'index.html';
                    // document.cookie = "id="+d.id+";";
                    document.cookie = "email="+data.email+";";
                    console.log(d.message)
                }
                else{
                    alert("登录失败");
                }
            }
        })
    })
})

var sleep = function(time) {
    var startTime = new Date().getTime() + parseInt(time, 10);
    while(new Date().getTime() < startTime) {}
};

// 注册
$(function(){
    $(".popup-body .form .submit").click(function(){
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
                    // 直接转向登录状态
                    alert("收藏成功");
                    console.log(d.message)
                }
                else{
                    alert("收藏失败");
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
                    // 直接转向登录状态
                    alert("收藏成功");
                    console.log(d.message)
                }
                else{
                    alert("收藏失败");
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

    $.ajax({
        type: 'get',
        url: '/leaderboard/happinessOfTop5',
        dataType: 'json',
        success: function(d) {
            let sight = d.result;
            // slide上显示前三个
            for(let i=0;i<3;i++){
                slide_title[i].innerText = sight[i].sight_name;
                slide_country[i].innerText = sight[i].country;
                next_title[i].innerText = sight[(i+1)%3].sight_name;
                if(sight[i].description.length < 100)
                    slide_text[i].innerText = sight[i].description;
                else
                    slide_text[i].innerText = sight[i].description.substring(0, 100)+"...";
                slide_img[i].style.backgroundImage = "url(img/tour/"+sight[i].sight_name+".jpg)";
            }
            // most_hapiness 显示前五个
            for(let i=0;i<sight.length;i++){
                list_title[i].innerText = sight[i].sight_name;
                list_country[i].innerText = sight[i].country;
                list_cost[i].innerText = sight[i].happiness_index;
                rating_text[i].innerText = sight[i].views + " 点击";
                tour_items[i].style.backgroundImage = "url(img/tour/"+sight[i].sight_name+".jpg)";
            }
            // 轮换动效
            for(let i=0;i<sight.length-1;i++){
                list_title[i+5].innerText = sight[i].sight_name;
                list_country[i+5].innerText = sight[i].country;
                list_cost[i+5].innerText = sight[i].happiness_index;
                rating_text[i+5].innerText = sight[i].views + " 点击";
                tour_items[i+5].style.backgroundImage = "url(img/tour/"+sight[i].sight_name+".jpg)";
            }
        }
    });
})

// 搜索栏
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

// page_body现实主要幸福指数排行榜
$(function(){
    let d = {};
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

    $.ajax({
        type: 'get',
        url: '/sight/happinessRanking',
        dataType: 'json',
        success: function(el) {
            d = el;
        }
    })

    // append 子元素
    // after 同级元素
    var content = $('.travel-list.right-sidebar .left_content .posts');
    let len = d.result.length;
    let count = 5;  // 一页里item的总量
    let page_num = Math.round(len/count);
    let page_list = $('.travel-list.right-sidebar .left_content .pagination ul');
    for(let i=0;i<page_num;i++){
        page_list.append("<li><a href='#'>"+(i+1)+"</a></li>");
    }
    let curr_page = 1;
    $(".travel-list.right-sidebar .left_content .pagination ul li a:contains('"+curr_page+"')").addClass("active");
    
    var generate_html = function(curr_page, d){
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

    generate_html(1, d);
    $(".pagination .arrow.next").on("click",function(e){
        let prev_page = curr_page;
        curr_page++;
        console.log(curr_page);
        $(".travel-list.right-sidebar .left_content .pagination ul li a:contains('"+curr_page+"')").addClass("active");
        $(".travel-list.right-sidebar .left_content .pagination ul li a:contains('"+prev_page+"')").removeClass("active");
        generate_html(curr_page, d);
    })
    $(".pagination .arrow.prev").on("click",function(e){
        let prev_page = curr_page;
        curr_page--;
        console.log(curr_page);
        generate_html(curr_page, d);
        $(".travel-list.right-sidebar .left_content .pagination ul li a:contains('"+curr_page+"')").addClass("active");
        $(".travel-list.right-sidebar .left_content .pagination ul li a:contains('"+prev_page+"')").removeClass("active");
    })

    $(".travel-list.right-sidebar .left_content .pagination ul li a").on("click",function(e){
        let prev_page = curr_page;
        curr_page = this.textContent;
        console.log(curr_page);
        generate_html(curr_page, d);
        $(".travel-list.right-sidebar .left_content .pagination ul li a:contains('"+curr_page+"')").addClass("active");
        $(".travel-list.right-sidebar .left_content .pagination ul li a:contains('"+prev_page+"')").removeClass("active");
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
    //     title[i].innerText = sight[i].sight_name;
    //     popular[i].innerText = sight[i].views;
    //     img[i].style.backgroundImage = "url(img/tour/"+sight[i].sight_name+".jpg)";
    // }
    
    $.ajax({
        type: 'get',
        url: '/sight/sidebar/popularityOfTop5',
        dataType: 'json',
        success: function(d) {
            let sight = d.result;
            for(let i=0;i<5;i++){
                title[i].innerText = sight[i].sight_name;
                popular[i].innerText = sight[i].views;
                img[i].style.backgroundImage = "url(img/tour/"+sight[i].sight_name+".jpg)";
            }
        }
    })
})


/*----------------------------------------------------------------------------------
3. 收藏
-----------------------------------------------------------------------------------*/
// $(function(){
//     $.ajax({
//         type: 'get',
//         url: '/leaderboard/happinessOfTop5',
//         dataType: 'json',
//         success: function(d) {
//         }
//     })
// })