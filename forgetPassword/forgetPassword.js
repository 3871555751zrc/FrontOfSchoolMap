require.config({
	
	paths:{
		"connect":"../js/connect",
		"mui":"../js/mui",
		"jquery":"../js/jquery-3.2.1.min"
	}
	
});
define(["connect","mui","jquery"],function(connect,mui,jquery){
	var connect = connect.connect;
	var mui = mui.mui;//
	mui.init();
	var $ = jquery;
	$("#submit").on("click",function(){
		var anwser = $("#anwser").val();//获取答案
		var username = $("#username").val();//获取用户名
		var request = {
			type:"USER_FORGETPASSWORD",
			data:{
				anwser:anwser,
				username:username
			}
		};
		
		connect(request,function(json){
			mui.prompt("请输入新密码","请认真输入新密码，这将作为下次登录的密码","修改密码",["确认","取消"],function(e){
				if(e.index === 0){
					//点击确定
					var newPassword = e.value;//
					var request = {
						type:"USER_CHANGEPASSWORD",
						data:{
							newPassword:newPassword,
							username:username
						}
					};
					connect(request,function(json){
					   alert(json["message"]);
					   mui.openWindow("../login/login.html");
					},function(json){
						
					});
				}
				else{
					//点击取消
				}
			});
		},function(json){
			alert("很抱歉的告诉你，找回密码失败，再想想，不然重新注册吧")
		});
		
	});
	
	
	
	
});