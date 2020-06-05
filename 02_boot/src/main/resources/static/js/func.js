
// 登录

$(function(){
    let id = $.cookie("id");
    document.cookie = "email = hikarinoda@163.com;";
    if(typeof(id) == undefined){
        // 如果没有登录 
        $(".top_panel .right").css("visibility", "hidden");
    }
    else{
        // 如果已经登录
        $(".top_panel .right").css("visibility", "visible");
        $(".top_panel .right .tel span").text($.cookie("email"));
        $(".top_panel .right ._counter").text(6);
        $(".usermenu .js-popup-open:contains('登录')").css("display", "none");
        $(".usermenu .js-popup-open:contains('注册')").css("display", "none");
        $(".usermenu .js-popup-open:contains('忘记密码')").css("display", "none");
        $.ajax({
            type: 'get',
            url: '/user/collect',
            data: "{user_id: "+id+"}",
            dataType: 'json',
            success: function(d){ 
                if(d.status == 1){
                    $(".top_panel .right ._counter").val(d.num);
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
                    document.cookie = "id="+d.id+";";
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
                slide_text[i].innerText = sight[i].description;
                slide_img[i].style.backgroundImage = "url(img/"+sight[i].sight_name+".jpg)";
            }
            // most_hapiness 显示前五个
            for(let i=0;i<sight.length;i++){
                list_title[i].innerText = sight[i].sight_name;
                list_country[i].innerText = sight[i].country;
                list_cost[i].innerText = sight[i].happiness_index;
                rating_text[i].innerText = sight[i].views + " 点击";
                tour_items[i].style.backgroundImage = "url(img/"+sight[i].sight_name+".jpg)";
            }
        }
    });
})


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