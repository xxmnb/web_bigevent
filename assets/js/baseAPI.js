$.ajaxPrefilter(function(options) {
    options.url = "http://www.liulongbin.top:3007" + options.url;
    if (options.url.indexOf("/my") !== -1) { //判断接口中是否有带/my的接口 
        options.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    };
    //统一挂载complete函数
    options.complete = function(res) {
        // console.log(res.responseJSON);  { status: 1, message: '身份认证失败！' }
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //强制清空token
            localStorage.removeItem("token");
            //强制退出到登录页面 
            location.href = "/login.html";
        }


    }

})