
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
        url: '/sight/happinessOfTop5',
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
    let d;
    // let d = {"message":"成功","result":[{"country":"意大利","description":"花之圣母大教堂（Basilica di Santa Maria del Fiore），又名圣母百花大教堂，佛罗伦萨大教堂。是世界五大教堂之一。佛罗伦萨在意大利语中意味花之都。大诗人徐志摩把它译作“翡冷翠”，这个译名远远比另一个译名“佛罗伦萨”来的更富诗意，更多色彩，也更符合古城的气质。教堂位于意大利佛罗伦萨历史中心城区，教堂建筑群由大教堂、钟塔与洗礼堂构成，1982年作为佛罗伦萨历史中心的一部分被列入世界文化遗产。","happiness_index":50.34,"score":0.0,"sight_name":"圣母百花大教堂","views":0},{"country":"加拿大","description":"苏必利尔湖（Lake Superior）是世界上面积最大的淡水湖，1622年为法国殖民者所发现，湖名取自法语Supérieur（索菲莉尔），意为“上湖”。该湖为美国和加拿大共有，被加拿大的安大略省与美国的明尼苏达州、威斯康星州和密歇根州所环绕。","happiness_index":50.00,"score":0.0,"sight_name":"苏必利尔湖","views":0},{"country":"美国","description":"夏威夷州（夏威夷语：Moku?āina o Hawai?i，英语：State of Hawaii），是美国的州份之一，由夏威夷群岛组成，距离美国本土3,700公里，属于太平洋沿岸地区；所属的大洲则是大洋洲。在1778至1898年间，夏威夷也被称为“三明治群岛”（Sandwich Islands）。首府及最大都市为檀香山。","happiness_index":40.00,"score":0.0,"sight_name":"夏威夷","views":0},{"country":"意大利","description":"万神殿，又译潘提翁神殿，是至今完整保存的唯一一座罗马帝国时期建筑，始建于公元前27-25年，由罗马帝国首任皇帝屋大维的女婿阿格里帕建造，用以供奉奥林匹亚山上诸神，可谓奥古斯都时期的经典建筑。公元80年的火灾，使万神殿的大部分被毁，仅余一长方形的柱廊，有12.5米高的花岗岩石柱16根，这一部分被作为后来重建的万神殿的门廊，门廊顶上刻有初建时期的纪念性文字，从门廊正面的八根巨大圆柱仍可看出万神殿最初的建筑规模。","happiness_index":13.33,"score":0.0,"sight_name":"万神殿","views":0},{"country":"德国","description":"新天鹅城堡（德语：Schlo? Neuschwanstein,?发音：[n????va?n?ta?n][1]），又译新天鹅石城堡、新天鹅石宫，是19世纪晚期的建筑，位于今天的德国巴伐利亚西南方，邻近年代较早的高天鹅城堡（Schloss Hohenschwangau），距离菲森镇约4公里，离德国与奥地利边界不远。这座城堡是巴伐利亚国王路德维希二世的行宫之一。共有360个房间，其中只有14个房间依照设计完工，其他的346个房间则因为国王在1886年逝世而未完成，在他死后的七个星期，城堡向公众付费开放。是德国境内受拍照最多的建筑物[2]。也是最受欢迎的旅游景点之一。","happiness_index":12.50,"score":0.0,"sight_name":"新天鹅堡","views":0},{"country":"美国","description":"锡安国家公园（英文：Zion National Park），亦译为宰恩国家公园，是一个位于美国西南部犹他州斯普林代尔附近的国家公园。这个占地共229平方英里（593平方公里）的国家公园的首要景点是锡安峡谷，长15英里（24公里），并且有半英里（800米）深，其红色与黄褐色的纳瓦霍砂岩（Navajo Sandstone）被维琴河（Virgin River）北面支流所分割。其他著名特色有白色大宝座（Great White Throne）、棋盘山壁群、科罗布拱门（Kolob Arch）、三圣父与维琴河隘口（Virgin River Narrows）等。锡安与科罗布峡谷地带的地质包含了九个意味着由150,000,000年前的中生代沉积作用而成的岩层。在该段时间的不同时期，暖流、浅海、小河、池塘与湖泊、大量沙漠和干澡的近岸环境覆盖了此地区。与科罗拉多高原形成有关的隆起运动使得该地区由10,030,000年前开始逐渐隆起了10,000英尺（3,000米）。","happiness_index":11.24,"score":0.0,"sight_name":"锡安山国家公园","views":0},{"country":"美国","description":"著名沙漠公园，内部的地质奇观和极具特点的约书亚树吸引了许多露营者和徒步旅行者。","happiness_index":9.09,"score":0.0,"sight_name":"约书亚树公园","views":0},{"country":"希腊","description":"雅典卫城（Acropolis），是希腊最杰出的古建筑群，是综合性的公共建筑，为宗教政治的中心地。雅典卫城面积约有3公顷（3万平方米，其东西长约280米，南北最宽约130米，），位于雅典市中心的卫城山丘上，始建于公元前580年。卫城中最早的建筑是雅典娜神庙和其他宗教建筑。雅典卫城，也称为雅典的阿克罗波利斯，希腊语为“阿克罗波利斯”，原意为“高处的城市”或“高丘上的城邦”。","happiness_index":8.11,"score":0.0,"sight_name":"卫城","views":0},{"country":"巴西","description":"亚马孙河（葡萄牙语：Rio Amazonas；西班牙语：Río Amazonas；奇楚瓦语：Awqaq sipaskuna mayu；英语：Amazon River），是一条位于南美洲北部的河流，自西向东流动。其发源于位于秘鲁境内的安第斯山脉中的密斯米雪山，在巴西位于赤道附近的阿马帕州和帕拉州交界处注入大西洋。整体流经秘鲁、哥伦比亚和巴西。目前国际上广泛承认的亚马孙河全长是6437千米，亦有部分研究测绘出不同的长度，但还未获地理学界广泛认可[4]。据此，亚马孙河是世界上第二长的河流，位于最长的尼罗河（6650km）和第三长的长江（6300km）之间。","happiness_index":2.33,"score":0.0,"sight_name":"亚马逊河流域","views":0},{"country":"美国","description":"落成于 1886 年的标志性国家纪念碑，拥有博物馆和城市景观，提供导览服务。","happiness_index":-1.44,"score":0.0,"sight_name":"自由女神像","views":0},{"country":"坦桑尼亚","description":"恩戈罗恩戈罗自然保护区位于坦桑尼亚共和国北部。1979年被列入世界遗产名录。保护区是一片辽阔的高原火山区，西接塞伦盖蒂国家公园，东连马尼亚腊湖国家公园，占地80,944平方公里。该地区于1957年在行政上从塞伦盖蒂国家公园的范围内划出，成为独立的自然保护区。区内有闻名遐迩的恩戈罗恩戈罗火山口、奥杜瓦伊峡谷和已成深湖的恩帕卡艾火山口。","happiness_index":-2.04,"score":0.0,"sight_name":"恩戈罗恩戈罗","views":0},{"country":"坦桑尼亚","description":"这座标志性的大山有 3 座火山锥，是理想的登山之地，共有 7 条跋涉路线。它是全球登山者，科学家和地质学家的梦想之一。","happiness_index":-13.57,"score":0.0,"sight_name":"乞力马扎罗山脉","views":0},{"country":"英国","description":"泰晤士河，也称泰姆河（River Thames），英格兰西南部河流，为英国著名的“母亲”河，它发源于英格兰西南部的科茨沃尔德希尔斯，全长346千米，横贯英国首都伦敦与沿河的10多座城市，流域面积13000平方千米，在伦敦下游河面变宽，形成一个宽度为29公里的河口，注入北海。","happiness_index":-15.91,"score":0.0,"sight_name":"泰晤士河","views":0},{"country":"英国","description":"威斯敏斯特教堂（Westminster Abbey），通称威斯敏斯特修道院（Westminster Abbey，意译为西敏寺），坐落在伦敦泰晤士河北岸，原是一座天主教本笃会隐修院，始建于公元960 年，1045年进行了扩建，1065年建成，1220年至1517年进行了重建。威斯敏斯特教堂在1540年英王创建圣公会之前，它一直是天主教本笃会（天主教的隐修院修会之一）教堂。1540年之后，成为圣公会教堂。","happiness_index":-16.67,"score":0.0,"sight_name":"威斯敏斯特教堂","views":0},{"country":"英国","description":"圣保罗大教堂(St Paul's Cathedral)是世界著名的宗教圣地，世界第五大教堂，英国第一大教堂，教堂也是世界第二大圆顶教堂，位列世界五大教堂之列。圣保罗大教堂最早在604年建立，后经多次毁坏、重建，由英国著名设计大师和建筑家克里斯托弗·雷恩爵士（Sir Christopher Wren）在17世纪末完成这伦敦最伟大的教堂设计，整整花了35年的心血。圣保罗教堂另一个建筑特色，是少数设计、建筑分别仅由一人完成，而非历经多位设计、建筑师的教堂之一，教堂内还有一个雷恩的墓碑，上书“If you seek his monument, just look around”（如果你在寻觅他的纪念碑，只需要看看周围）。里面还有一所具有不凡地位的法学院，位于教堂区内的圣保罗十字学院是伦敦的首届“议会”所在地。圣保罗大教堂是伦敦的宗教中心，建筑为华丽的巴洛克风格，是世界第二大圆顶教堂，17世纪末建成。","happiness_index":-25.93,"score":0.0,"sight_name":"圣保罗教堂","views":0},{"country":"柬埔寨","description":"吴哥窟（Angkor Wat），又称吴哥寺，位于柬埔寨，被称作柬埔寨国宝，是世界上最大的庙宇类建筑，同时也是世界上最早的高棉式建筑。吴哥窟原始的名字是Vrah Vishnulok，意思为“毗湿奴的神殿”，中国佛学古籍称之为“桑香佛舍”。苏利耶跋摩二世（1113—1150年在位）时为供奉毗湿奴而建，三十多年才完工。吴哥窟是吴哥古迹最精华的部分，也是柬埔寨早期建筑风格的代表。?[1]","happiness_index":-45.23,"score":0.0,"sight_name":"吴哥窟","views":0},{"country":"阿根廷","description":"风景如画的壮观瀑布，周围小径环绕，有丰富的野生动植物群落并有火车穿越丛林。伊瓜苏瀑布与东非维多利亚瀑布及美加的尼加拉瀑布是世界三大瀑布。伊瓜苏瀑布实为一组瀑布群，由275股大小瀑布或急流组成，总宽度2.7公里，比尼亚加拉瀑布宽4倍，落差由平均60米至最高82米。年均流量1,750立方米/秒，雨季时瀑布最大流量为12,750立方米/秒，这时大小飞瀑也汇合成一个马蹄形大瀑布。","happiness_index":-50.00,"score":0.0,"sight_name":"伊瓜苏瀑布","views":0},{"country":"意大利","description":"威尼斯（Venice）是意大利东北部著名的旅游与工业城市，也是威尼托地区（威内托大区）的首府。威尼斯曾经是威尼斯共和国的中心，被称作“亚得里亚海明珠”，十字军进行十字军东征时也曾在这里集结，堪称世界最浪漫的城市之一。 威尼斯市区涵盖意大利东北部亚得里亚海沿岸的威尼斯潟湖的118个人工岛屿和邻近一个人工半岛，更有117条水道纵横交叉。这个咸水潟湖分布在波河与皮亚韦河之间的海岸线。","happiness_index":-59.91,"score":0.0,"sight_name":"威尼斯","views":0}],"status":1}
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
    //         "sight_name": "苏必利尔湖",
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
        //  需要加一个同步调用，不然ajax外部获取不到值
        async : false,
        success: function(el) {
            d = el;
        }
    })

    // after 同级元素
    var content = $('.travel-list.right-sidebar .left_content .posts');

    // append 子元素
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