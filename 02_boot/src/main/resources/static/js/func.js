// 登录

$(function () {
    $("#login_submit").click(function () {
        let data = $("#login_form").serialize();
        console.log("ok");
        console.log($("#login_form").serialize());
        $.ajax({
            type: 'POST',
            url: '/user/login',
            data: data,
            dataType: 'json',
            success: function (response) {
                if (response.status === 1) {
                    location.href = 'index.html';
                } else {
                    alert("登录失败");
                }
            }
        })
    })
});