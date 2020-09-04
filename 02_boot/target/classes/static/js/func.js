/*----------------------------------------------------------------------------------
0. 用户操作
-----------------------------------------------------------------------------------*/
// 弹窗
// 提醒用户系统状态
var success_attention = function(){
    $(".popup-body .subtitle").text("立即回到主页……");
    $(".popup").removeClass("opened");
    $("#contact-us-success").addClass("opened");
    setTimeout("location.href='index.html';", 1000);
};

var failed_attention = function(){
    $(".popup").removeClass("opened");
    $("#contact-us-failed").addClass("opened");
};

var login = function(){
    $(".popup").removeClass("opened");
    $("#login").addClass("opened");
};

var login_attention = function(){

    $(".popup.failed-popup .popup-head .title").text("请先登录！");
    $(".popup-body .subtitle").text("立即转到登录……");
    $(".popup").removeClass("opened");
    $("#contact-us-failed").addClass("opened");
    setTimeout("login()", 1000);

};

var send = function(sight_name, email) {
    $.ajax({
        type: 'post',
        url: '/sight/information',
        dataType: 'json',
        data: JSON.stringify({
            "sightName": sight_name,
            "email": email
        }),
        contentType: "application/json",
        success: function (d) {
            if (d.status == 1) {
                window.localStorage.setItem('d',JSON.stringify(d));
                location.href = 'tour.html';
            }
        }
    })
};

// 登录
// 检测登录状态，根据状态发送请求、展示页面
$(function(){
    let email = $.cookie("email");
    if(typeof(email) == "undefined"){
        // 如果没有登录
        $("#top_panel .right").css("visibility", "hidden");
        $(".usermenu .js-popup-open:contains('设置')").css("display", "none");
        $(".usermenu .js-popup-open:contains('退出登录')").css("display", "none");
    }
    else{
        // 如果已经登录
        $("#top_panel .right").css("visibility", "visible");
        $("#top_panel .right .tel span").text(email);
        // $(".top_panel .right ._counter").text(6);
        $(".usermenu .js-popup-open:contains('登录')").css("display", "none");
        $(".usermenu .js-popup-open:contains('注册')").css("display", "none");
        $(".usermenu .js-popup-open:contains('退出登录')").css("display", "inline");

        let data = {email: email};
        $.ajax({
            type: 'post',
            url: '/user/collectionNum',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: "application/json",
            success: function(d){
                if(d.status == 1){
                    $(".top_panel .right .favorites-count ._counter").text(d.result);
                    // $("#top_panel .inversion .right ._counter").val(d.result);
                }
            }
        })
    }
    $("#login_submit").on("click", function(e){
        // let data = $("#login_form").serializeArray();
        let email = $("input[name='email']").val();
        let password = $("input[name='password']").val();
        let data= {
            "email":email,
            "password":password
        };
        console.log(data);
        // e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/user/login',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: "application/json",
            success: function(d){ 
                if(d.status == 1){
                    document.cookie = "email="+data.email+";";
                    console.log(d.message);
                    e.preventDefault();
                    success_attention();
                    // location.href = 'index.html';
                }
                else{
                    // alert("登录失败");
                    e.preventDefault();
                    failed_attention();
                }
            }
        })
    });

    $("#exit_btn").on("click", function(e){
        $.cookie('email', '', { expires: -1 });
        if(typeof($.cookie("email")) == "undefined") {
            success_attention();
        }
    })
});

// 注册
$(function(){
    $("#reg_button").on("click", function(e){
        let data = {
            userName:$(".popup-body .form .input[name='userName']").val(),
            name:$(".popup-body .form .input[name='name']").val(),
            email:$(".popup-body .form .input[name='reg_email']").val(),
            password:$(".popup-body .form .input[name='reg_password']").val()
        };
        
        $.ajax({
            type: 'post',
            url: '/user/register',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: "application/json",
            success: function(d){ 
                if(d.status == 1){
                    // 直接转向登录状态
                    document.cookie = "email="+data.email+";";
                    console.log(d.message);
                    e.preventDefault();
                    success_attention();
                }
                else{
                    alert("注册失败");
                    e.preventDefault();
                    failed_attention();
                }
            }
        })
    })
});

// 收藏
$(function(){

    // slide
    let btn = $(".main_slider .buttons .link span");
    let sight1 = $(".main_slider .slide_content .slide_title");

    // tour-item
    let bookmark = $(".tour_item .add_bookmark");
    let sight2 = $(".tour_item ._title");

    // tour-page
    let tour_btn = $(".tour_page_head .top-info .controls");
    let sight3 = $(".tour_page_head .top-info .tour_title");

    btn.on("click", function(e){
        let email = $.cookie("email");
        if(typeof(email) == "undefined"){
            login_attention();
        }
        else {
            let i = btn.index(this);
            let data1 = {
                "email": email,
                "sightName": sight1[i].textContent
            };
            $.ajax({
                type: 'post',
                url: '/user/collection',
                data: JSON.stringify(data1),
                dataType: 'json',
                contentType: "application/json",
                success: function (d) {
                    if (d.status == 1) {
                        e.preventDefault();
                        $(".popup-body .subtitle").text("已添加到收藏夹");
                        $(".popup").removeClass("opened");
                        $("#contact-us-success").addClass("opened");
                        console.log(d.message)
                    } else {
                        e.preventDefault();
                        $(".popup").removeClass("opened");
                        $("#contact-us-failed").addClass("opened");
                    }
                }
            })
        }
    });

    bookmark.on("click", function(e){
        let email = $.cookie("email");
        if(typeof(email) == "undefined"){
            login_attention();
        }
        else {
            let i = bookmark.index(this);
            let data2 = {
                "email": email,
                "sightName": sight2[i].textContent
            };
            $.ajax({
                type: 'post',
                url: '/user/collection',
                data: JSON.stringify(data2),
                dataType: 'json',
                contentType: "application/json",
                success: function (d) {
                    if (d.status == 1) {
                        e.preventDefault();
                        $(".popup-body .subtitle").text("已添加到收藏夹");
                        $(".popup").removeClass("opened");
                        $("#contact-us-success").addClass("opened");
                        console.log(d.message)
                    } else {
                        e.preventDefault();
                        $(".popup").removeClass("opened");
                        $("#contact-us-failed").addClass("opened");
                    }
                }
            })
        }
    });

    tour_btn.on("click", function(e){
        let email = $.cookie("email");
        if(typeof(email) == "undefined"){
            login_attention();
        }
        else {
            let data3 = {
                "email": email,
                "sightName": sight3[0].textContent
            };
            $.ajax({
                type: 'post',
                url: '/user/collection',
                data: JSON.stringify(data3),
                dataType: 'json',
                contentType: "application/json",
                success: function (d) {
                    if (d.status == 1) {
                        e.preventDefault();
                        $(".popup-body .subtitle").text("已添加到收藏夹");
                        $(".popup").removeClass("opened");
                        $("#contact-us-success").addClass("opened");
                        console.log(d.message)
                    } else {
                        e.preventDefault();
                        $(".popup").removeClass("opened");
                        $("#contact-us-failed").addClass("opened");
                    }
                }
            })
        }
    })
});

// 点击景点
// 进入景点详情页面“tour.html”
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
        send(sight_name, email);
    });

    // 幸福排行
    // let hapiness_item = $(".travel-list .posts .item");
    // let sidebar_item = $(".sidebar ._block .popular .item");
    // hapiness_item.on("click", function(e){
    //     let name = $(".travel-list .posts .item_right .item_title");
    //     sight_name = name[slide_button.index(this)].textContent;
    //     console.log(sight_name);
    //     send(sight_name, email);
    // })
    // sidebar_item.on("click", function(e){
    //     let name = $(".sidebar ._block .popular .item_top ._title")
    //     sight_name = name[sidebar_item.index(this)].textContent;
    //     console.log(sight_name);
    //     send(sight_name, email);
    // })

    // tour_item
    let tour_item = $(".tour_item");
    tour_item.on("click", function(e){
        let name = $(".tour_item_bottom ._title");
        sight_name = name[tour_item.index(this)].textContent;
        console.log(sight_name);
        send(sight_name, email);
    })
});

// top-panel搜索栏

function search(){
    let search_input = $("input[type='search']")[0];
    if(search_input.value === ""){  // 如果没有输入关键词
        $("#modal_search").fadeIn();
        $("html, body").addClass("locked");
        // popupFunction();
    }
    else{
        location.href = "browse.html?key="+search_input.value;
    }
}
$(function(){
    $(".search_btn").on("click", search);
    $("input[type='search']").on("keyup", function(event) {
        if (event.keyCode == "13") {
            //回车执行查询
            search();
        }
    });

});

// // 搜索栏
// $(function(){
//     $(".submit button[type='search']").on("click", function(e){
//         let search_input = $("input[type='email']");
//         if(search_input.val() === ""){
//
//         }
//         else{
//             location.href = 'browse.html';
//         }
//     })
// });

/*----------------------------------------------------------------------------------
1. 首页
-----------------------------------------------------------------------------------*/

// 首页
$(function(){
    if(location.href.match("index.html")) {
        let country = $("p:contains('所在地')");  // 前三个是slide上的，后边是most_hapiness
        let slide_country = country.slice(0, 3);

        let slide_title = $(".slide_title");
        let next_title = $(".next_title");
        let slide_text = $(".text");
        let slide_img = $(".bg-img");
        // most_hapiness
        let list_country = country.slice(3, 12);
        let list_title = $("._title:contains('景点')");
        let list_cost = $(".cost");
        let rating_text = $(".rating-text");
        let tour_items = $(".tour_item");

        $.ajax({
            type: 'get',
            url: '/sight/happinessOfTop5',
            dataType: 'json',
            contentType: "application/json",
            success: function (d) {
                let sight = d.result;
                // slide上显示前三个
                for (let i = 0; i < 3; i++) {
                    slide_title[i].textContent = sight[i].sight_name;
                    slide_country[i].textContent = sight[i].country;
                    next_title[i].textContent = sight[(i + 1) % 3].sight_name;
                    if (sight[i].description.length < 100)
                        slide_text[i].textContent = sight[i].description;
                    else
                        slide_text[i].textContent = sight[i].description.substring(0, 100) + "...";
                    slide_img[i].style.backgroundImage = "url(img/tour/" + sight[i].sight_name + ".jpg)";
                }
                // most_hapiness 显示前五个
                for (let i = 0; i < sight.length; i++) {
                    list_title[i].textContent = sight[i].sight_name;
                    list_country[i].textContent = sight[i].country;
                    list_cost[i].textContent = sight[i].happiness_index;
                    rating_text[i].textContent = sight[i].views + " 点击";
                    tour_items[i].style.backgroundImage = "url(img/tour/" + sight[i].sight_name + ".jpg)";
                }
                // 轮换动效
                for (let i = 0; i < sight.length - 1; i++) {
                    list_title[i + 5].textContent = sight[i].sight_name;
                    list_country[i + 5].textContent = sight[i].country;
                    list_cost[i + 5].textContent = sight[i].happiness_index;
                    rating_text[i + 5].textContent = sight[i].views + " 点击";
                    tour_items[i + 5].style.backgroundImage = "url(img/tour/" + sight[i].sight_name + ".jpg)";
                }
            }
        });

        $(".destinations_item .sq_parent .sq_wrap .sq_content").on("click", function (e) {
            let key = $(".destinations_item ._content ._title")[$(".destinations_item .sq_parent .sq_wrap .sq_content").index(this)].textContent;
            location.href = "browse.html?key="+key;
        })

        $(".story_item").on("click", function (e) {
            let key = $(".story_item ._content .country")[$(".story_item").index(this)].textContent;
            location.href = "browse.html?key="+key;
        })
    }
});


/*----------------------------------------------------------------------------------
2. 幸福指数排行
-----------------------------------------------------------------------------------*/
// html生成器

// <div class='rating-stars'>
//     <div class='star filled'></div>
//     <div class='star filled'></div>
//     <div class='star filled'></div>
//     <div class='star'></div>
//     <div class='star'></div>
//     </div>

var generate_html = function(curr_page, d, content, count){
    content.empty();
    let curr_num = (curr_page-1)*count;
    let t = d.result.length-curr_num;
    let len = t < count ? curr_num+t:curr_num+count;
    for(let i= curr_num; i<len;i++){
        content.append(
            "<a class='item'>\
            <div class='item_left'>\
                <div class='image' style='background-image: url(img/tour/"+d.result[i].sight_name+".jpg)'>\
                    <div class='shadow js-shadow'></div>\
                </div>\
            </div>\
            <div class='item_right'>\
                <p class='country'>"+d.result[i].country+"</p>\
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
    let hapiness_item = $(".travel-list .posts .item");
    hapiness_item.on("click", function(e){
        let name = $(".travel-list .posts .item_right .item_title");
        sight_name = name[hapiness_item.index(this)].textContent;
        console.log(sight_name);
        let email = $.cookie("email");
        send(sight_name, email);
    })
};
// page_body现实主要幸福指数排行榜
$(function(){
    if(location.href.match("happiness.html")) {
        var content = $('.travel-list.right-sidebar .left_content .posts');
        var page_list = $('#happiness_page ul');
        var count = 5;  // 一页里item的总量
        let curr_page = 1;
        let res = undefined;
        $.ajax({
            type: 'get',
            url: '/sight/happinessRanking',
            dataType: 'json',
            contentType: "application/json",
            success: function (d) {
                if (d.status == 1) {
                    // let count = 5;  // 一页里item的总量
                    res = d;
                    let len = d.result.length;
                    let page_num = Math.ceil(len / count);
                    for (let i = 0; i < page_num; i++) {
                        page_list.append("<li><a href='#'>" + (i + 1) + "</a></li>");
                    }

                    let page = $(".travel-list.right-sidebar .left_content #happiness_page ul li a");
                    page[curr_page-1].className = "active";
                    generate_html(1, d, content, count);

                    $("#happiness_page ul li a").on("click", function (e) {
                        let prev_page = curr_page;
                        curr_page = this.textContent;
                        console.log(curr_page);
                        page[curr_page-1].className = "active";
                        // $(".travel-list.right-sidebar .left_content #happiness_page ul li a:contains('" + curr_page + "')").addClass("active");
                        $(".travel-list.right-sidebar .left_content #happiness_page ul li a:contains('" + prev_page + "')").removeClass("active");
                        generate_html(curr_page, res, content, count);
                    })
                }
            }
        });

        // 翻页
        $("#happiness_page .arrow.next").on("click", function (e) {
            let prev_page = curr_page;
            curr_page++;
            console.log(curr_page);
            $(".travel-list.right-sidebar .left_content #happiness_page ul li a:contains('" + curr_page + "')").addClass("active");
            $(".travel-list.right-sidebar .left_content #happiness_page ul li a:contains('" + prev_page + "')").removeClass("active");
            generate_html(curr_page, res, content, count);
        });
        $("#happiness_page .arrow.prev").on("click", function (e) {
            let prev_page = curr_page;
            curr_page--;
            console.log(curr_page);
            $(".travel-list.right-sidebar .left_content #happiness_page ul li a:contains('" + curr_page + "')").addClass("active");
            $(".travel-list.right-sidebar .left_content #happiness_page ul li a:contains('" + prev_page + "')").removeClass("active");
            generate_html(curr_page, res, content, count);
        })

        $(".sidebar ._block .stories .items .item").on("click", function (e) {
            let key = $(".sidebar ._block .stories .items .item ._title")[$(".sidebar ._block .stories .items .item").index(this)].textContent;
            location.href = "browse.html?key="+key;
        })
    }
});

// 侧栏的人气预览
$(function(){
    if(location.href.match("happiness.html")) {
        let img = $(".sidebar ._block .popular .item_top .img");
        let title = $(".sidebar ._block .popular .item_top ._title");
        let popular = $(".sidebar ._block .popular .item_bottom .cost");

        $.ajax({
            type: 'get',
            url: '/sight/popularityOfTop5',
            dataType: 'json',
            contentType: "application/json",
            success: function (d) {
                let sight = d.result;
                for (let i = 0; i < 5; i++) {
                    title[i].textContent = sight[i].sight_name;
                    popular[i].textContent = sight[i].views;
                    img[i].style.backgroundImage = "url(img/tour/" + sight[i].sight_name + ".jpg)";
                }
                let sidebar_item = $(".sidebar ._block .popular .item");
                sidebar_item.on("click", function(e){
                    let name = $(".sidebar ._block .popular .item_top ._title");
                    sight_name = name[sidebar_item.index(this)].textContent;
                    console.log(sight_name);
                    let email = $.cookie("email");
                    send(sight_name, email);
                })
            }
        })
    }
});

/*----------------------------------------------------------------------------------
3. 人气排行
-----------------------------------------------------------------------------------*/

// <div class='rating-stars'>
//     <div class='star filled'></div>
//     <div class='star filled'></div>
//     <div class='star filled'></div>
//     <div class='star'></div>
//     <div class='star'></div>
//     </div>

var generate_tour_item = function(curr_page, d, content, count){
    content.empty();
    let curr_num = (curr_page-1)*count;
    let t = d.result.length-curr_num;
    let len = t < count ? curr_num+t:curr_num+count;
    for(let i=curr_num; i<len; i++){
        content.append("\
        <a class='tour_item' style='background-image: url(img/tour/"+d.result[i].sight_name+".jpg)'>\
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
                    <div class='rating-text'>"+d.result[i].views+"点击</div>\
                </div>\
            </div>\
        </div>\
        <div class='shadow js-shadow'></div>\
    </a>\
        ");
    }
    let tour_item = $(".tour_item");
    tour_item.on("click", function(e){
        let name = $(".tour_item_bottom ._title");
        sight_name = name[tour_item.index(this)].textContent;
        console.log(sight_name);
        let email = $.cookie("email");
        send(sight_name, email);
    })
};

$(function(){
    if(location.href.match("popular.html")) {
        let content = $("#popular_content");
        var page_list = $(".travel-list.full-width #popular_page ul");
        let count = 10;  // 每页显示10个
        let curr_page = 1;

        let res = undefined;

        $.ajax({
            type: 'get',
            url: '/sight/popularityRanking',
            dataType: 'json',
            contentType: "application/json",
            success: function (d) {
                if (d.status == 1) {
                    res = d;
                    let len = d.result.length;
                    let page_num = Math.ceil(len / count);
                    for (let i = 0; i < page_num; i++) {
                        page_list.append("<li><a href='#'>" + (i + 1) + "</a></li>");
                    }
                    $("#popular_page ul li a:contains('" + curr_page + "')").addClass("active");
                    generate_tour_item(1, d, content, count);

                    $("#popular_page ul li a").on("click", function (e){
                        let prev_page = curr_page;
                        curr_page = this.textContent;
                        console.log(curr_page);
                        $("#popular_page ul li a:contains('" + curr_page + "')").addClass("active");
                        $("#popular_page ul li a:contains('" + prev_page + "')").removeClass("active");
                        generate_tour_item(curr_page, res, content, count);
                    })
                }
            }
        });

        $("#popular_page .arrow.next").on("click", function (e) {
            let prev_page = curr_page;
            curr_page++;
            console.log(curr_page);
            $("#popular_page ul li a:contains('" + curr_page + "')").addClass("active");
            $("#popular_page ul li a:contains('" + prev_page + "')").removeClass("active");
            generate_tour_item(curr_page, res, content, count);
        });
        $("#popular_page .arrow.prev").on("click", function (e) {
            let prev_page = curr_page;
            curr_page--;
            console.log(curr_page);
            $("#popular_page ul li a:contains('" + curr_page + "')").addClass("active");
            $("#popular_page ul li a:contains('" + prev_page + "')").removeClass("active");
            generate_tour_item(curr_page, res, content, count);
        })

    }
});

/*----------------------------------------------------------------------------------
4. 收藏
-----------------------------------------------------------------------------------*/
$(function(){
    if(location.href.match("favourites.html")) {
        let email = $.cookie("email");
        let content = $("#favour_content");
        var page_list = $("#favour_page ul");
        let count = 6;  // 每页显示6个
        $("#favour_page .arrow.next").on("click", function (e) {
            let prev_page = curr_page;
            curr_page++;
            console.log(curr_page);
            $("#favour_page ul li a:contains('" + curr_page + "')").addClass("active");
            $("#favour_page ul li a:contains('" + prev_page + "')").removeClass("active");
            generate_tour_item(curr_page, d, content, count);
        });
        $("#favour_page .arrow.prev").on("click", function (e) {
            let prev_page = curr_page;
            curr_page--;
            console.log(curr_page);
            $("#favour_page ul li a:contains('" + curr_page + "')").addClass("active");
            $("#favour_page ul li a:contains('" + prev_page + "')").removeClass("active");
            generate_tour_item(curr_page, d, content, count);
        });

        $.ajax({
            type: 'post',
            url: '/user/collectionPage',
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify({
                "email": email
            }),
            success: function (d) {
                $(".page.favourites-list .page_head .title span").text(d.result.length);
                let len = d.result.length;
                let page_num = Math.ceil(len / count);
                for (let i = 0; i < page_num; i++) {
                    page_list.append("<li><a href='#'>" + (i + 1) + "</a></li>");
                }
                let curr_page = 1;
                $("#favour_page ul li a:contains('" + curr_page + "')").addClass("active");
                generate_tour_item(1, d, content, count);
                // let tour_item = $(".tour_item");
                // tour_item.on("click", function(e){
                //     let name = $(".tour_item_bottom ._title");
                //     sight_name = name[tour_item.index(this)].textContent;
                //     console.log(sight_name);
                //     let email = $.cookie("email");
                //     send(sight_name, email);
                // })
                $("#favour_page ul li a").on("click", function (e) {
                    let prev_page = curr_page;
                    curr_page = this.textContent;
                    console.log(curr_page);
                    $("#favour_page ul li a:contains('" + curr_page + "')").addClass("active");
                    $("#favour_page ul li a:contains('" + prev_page + "')").removeClass("active");
                    generate_tour_item(curr_page, d, content, count);
                })
            }
        })
    }
});

/*----------------------------------------------------------------------------------
5. 景点详情页面
-----------------------------------------------------------------------------------*/
$(function () {
    if(location.href.match("tour.html")) {
        let obj = localStorage.getItem("d");//获取键为allJson的字符串
        let d = JSON.parse(obj);//将字符串抓换成对象
        let pagebg = $(".tour_page_head");
        pagebg[0].style.backgroundImage = "url(img/tour/" + d.result.sight_name + ".jpg)";
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
            labels: ["Angry", "Depress", "Fear", "Happy", "Sad", "Surprise", "Neutral"],
            datasets: [{
                // data: [16.08, 0, 16.62, 20.04, 25.55, 0.88, 20.93],
                data: [d.result.angry, d.result.depress, d.result.fear, d.result.happy, d.result.sad, d.result.surprise, d.result.neutral],
                backgroundColor: ["#FFFF99", "#99CC99", "#666600", "#996633", "#663300", "#CC9966", "#FFFFCC"],
                hoverBackgroundColor: ["#FFFF99", "#99CC99", "#666600", "#996633", "#663300", "#CC9966", "#FFFFCC"]
            }]
        };
        var ct = document.getElementById("myChart").getContext("2d");
        var myBarChart = new Chart(ct, {
            type: 'pie',
            data: data,
            // options: options
        });

    }
});

$(function () {
    if(location.href.match("tour.html")) {
        let email = $.cookie("email");
        if(typeof(email) == "undefined")
            $(".sidebar ._block").css("display", "none");
        else {
            $.ajax({
                type: 'post',
                url: '/sight/sidebar/personalizedSight',
                dataType: 'json',
                contentType: "application/json",
                data: JSON.stringify({
                    "email": email
                }),
                success: function (d) {
                    let img = $(".sidebar ._block .popular .item_top .img");
                    let title = $(".sidebar ._block .popular .item_top ._title");
                    for (let i = 0; i < 3; i++) {
                        img[i].style.backgroundImage = "url(img/tour/" + d.result[i].sight_name + ".jpg)";
                        title[i].textContent = d.result[i].sight_name;
                        // window.localStorage.removeItem("d");
                    }
                    img.on("click", function(e){
                        let sight_name = title[img.index(this)].textContent;
                        console.log(sight_name);
                        let email = $.cookie("email");
                        send(sight_name, email);
                    });
                    title.on("click", function(e){
                        let sight_name = this.textContent;
                        console.log(sight_name);
                        let email = $.cookie("email");
                        send(sight_name, email);
                    })
                }
            })
        }
    }
});

$(function(){
    if(location.href.match("browse.html")){
        let key = window.location.search.split("=")[1];
        console.log(key);
        if(key!==undefined) {
            $(".name")[0].textContent = decodeURI(key);
            $(".title")[0].textContent = "的搜索结果如下";
            $(".subtitle")[0].textContent = "";
            $("#browse_page").append("                    <a class=\"arrow prev\"></a>\n" +
            "                    <ul>\n" +
            "                    </ul>\n" +
            "                    <a class=\"arrow next\"></a>")
            let curr_page = 1;
            let res = undefined;
            let page_list = $("#browse_page ul");
            let count = 5;  // 一页里item的总量
            let content = $('.travel-list .posts');
            $.ajax({
                type: 'get',
                url: '/sight/search?key=' + key,
                success: function (d) {
                    res = JSON.parse(d);
                    if (res.message == "成功") {
                        let len = res.result.length;
                        let page_num = Math.ceil(len / count);
                        for (let i = 0; i < page_num; i++) {
                            page_list.append("<li><a href='#'>" + (i + 1) + "</a></li>");
                        }
                        let page = $("#browse_page ul li a");
                        let curr_page = 1;
                        page[curr_page - 1].className = "active";
                        generate_html(1, res, content, count);

                        page.on("click", function (e) {
                            let prev_page = curr_page;
                            curr_page = this.textContent;
                            console.log(curr_page);
                            page[curr_page - 1].className = "active";
                            // $(".travel-list.right-sidebar .left_content #happiness_page ul li a:contains('" + curr_page + "')").addClass("active");
                            $("#browse_page ul li a:contains('" + prev_page + "')").removeClass("active");
                            generate_html(curr_page, res, content, count);
                        })
                    }
                    // 翻页
                    $("#browse_page .arrow.next").on("click", function (e) {
                        let prev_page = curr_page;
                        curr_page++;
                        console.log(curr_page);
                        $("#browse_page ul li a:contains('" + curr_page + "')").addClass("active");
                        $("#browse_page ul li a:contains('" + prev_page + "')").removeClass("active");
                        generate_html(curr_page, res, content, count);
                    });
                    $("#browse_page .arrow.prev").on("click", function (e) {
                        let prev_page = curr_page;
                        curr_page--;
                        console.log(curr_page);
                        $("#browse_page ul li a:contains('" + curr_page + "')").addClass("active");
                        $("#browse_page ul li a:contains('" + prev_page + "')").removeClass("active");
                        generate_html(curr_page, res, content, count);
                    })
                }
            });
        }else{
            $(".title")[0].textContent = "搜索";
            $(".subtitle")[0].textContent = "搜索你所感兴趣的";
        }
    }
})
