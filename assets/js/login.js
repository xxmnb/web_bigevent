$(function() {
    $("#link_login").on("click", function() {
        $(".reg-box").hide();
        $(".login-box").show()
    })
    $("#link_reg").on("click", function() {
        $(".login-box").hide();
        $(".reg-box").show()
    })

    //从layui上获取from对象
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        //自定义了一个pwd的效应规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'
        ],
        //校验两次密码是否相同的函数
        repwd: function(value) { //value 的值就是确认密码框的值
            //拿到密码框的值
            var pwd = $("#pwd01").val(); //确认密码的值
            if (pwd !== value) {
                return "两次输入密码不一致";
            }
        }
    });

    //监听注册表单的界面
    $("#form_reg").on("submit", function(event) {
        event.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post("/api/reguser", data, function(res) {
            if (res.status !== 0) {
                return layer.msg("注册失败！ " + res.message);
            } else {
                layer.msg('注册成功');
                $("#link_login").click();
            }
        })
    });


    $("#form_login").on("submit", function(event) {
        event.preventDefault();
        $.ajax({
            url: "/api/login",
            method: "POST",
            data: {
                username: $('#form_login [name=username]').val(),
                password: $('#form_login [name=password]').val()
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                } else {
                    layer.msg("登录成功")
                    console.log(res.token);
                    //将res.token的值保存到index.html中
                    localStorage.setItem("token", res.token);
                    //跳转到后台
                    location.href = "/index.html";
                }

            }

        })


    })

})