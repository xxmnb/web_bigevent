$(function() {
    getuser();

    $("#btnLoginout").on("click", function() {
        var layer = layui.layer;

        layer.confirm('是否要退出?', { icon: 3, title: '提示' }, function(index) {
            //清空本地存储的token
            localStorage.removeItem("token");

            //返回到登录页面
            location.href = "/login.html";

            layer.close(index);
        });
    })






    //渲染用户头像函数
}); //定义获取用户函数
function getuser() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg("获取用户失败");
            } else {

                renderAvatar(res.data);
            }

        },
        //不管是否请求成功都会执行这个函数
        // complete: function(res) {

        //     console.log(res.responseJSON); //{status: 1, message: '身份认证失败！'}
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //强制清空token
        //         localStorage.removeItem("token");

        //         location.href = "/login.html";
        //         //强制退出到登录页面


        //     }
        // }
    })
};
//渲染用户头像函数
function renderAvatar(user) {
    //获取用户头像
    var name = user.username || user.nickname;

    $("#welcome").html("欢迎  " + name);

    if (user.user_pic !== null) {
        //如果有这个头像 直接渲染图片头像 隐藏文字头像
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        //没有则渲染文字头像 隐藏图片头像
        $(".layui-nav-img").hide();
        $(".text-avatar").html(name[0].toUpperCase()).show()
    }


};