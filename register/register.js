require.config({
	paths:{
		"mui":"../js/mui",
		connect:"../js/connect",
		"jquery":"../js/jquery-3.2.1.min",
		"Storage":"../js/Storage"
	}
});//require 模块加载
require(["connect","mui","jquery","Storage"],function(connect,mui,jquery,Storage){//require 模块q加载完成 之后进行回调
	var connect = connect.connect;
	var mui = mui.mui;
	var Storage = Storage.Storage;
	var $ = jquery;
	
	//plus准备好之后，可以点击注册按钮！
	mui.plusReady(function(){ 
    
	});
	
	document.getElementById("registerBtn").addEventListener("click",function(){
	var request = null;
	request = getRequest();
	var isOk = false;
	isOk = checkIsOk(request);
	if(isOk){
		connect(request,success,failure);
	}
	else{
		waring();
	}
	});
	
	
	function getRequest(){
		var username = document.getElementById("username").value;
		var password = document.getElementById("password").value;
		var checkPassword = document.getElementById("checkpassword").value;
		var findPassQuAnw = document.getElementById("findPassQuAnw").value;
		var request = {
			type:"USER_REGISTER",
			data:{
				username:username,
				password:password,
				checkPassword:checkPassword,
				findPassQuAnw:findPassQuAnw
			}
		};
		return request;
	}
	function checkIsOk(request){
		var username = request.data.username;
		var password = request.data.password;
		var checkPassword = request.data.checkPassword;
		var findPassQuAnw = request.data.findPassQuAnw;
	    if(username !=="" && password !=="" && findPassQuAnw!=="" && password==checkPassword)
				{
					return true;
				}
				else{
					return false;
				}
	}
	function waring(){
		alert("有些内容没有填写或者密码两次输入不相同，请检查")
	}
	function success(data){
		console.log(data.message);
		mui.openWindow("../login/login.html");
	}
	function failure(data){
		
	}
	
	
//	已经有账号前去登录
$("#goToLogin").on("click",function(){
	mui.openWindow("../login/login.html");
});
	
	
});




		