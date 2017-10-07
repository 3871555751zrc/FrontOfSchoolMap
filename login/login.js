require.config({
	
	paths:{
		"connect":"../js/connect",
		"mui":"../js/mui",
		"jquery":"../js/jquery-3.2.1.min",
		"Storage":"../js/Storage"
	}
	
});
define(["connect","mui","jquery","Storage"],function(connect,mui,jquery,Storage){
	var connect = connect.connect;
	var mui = mui.mui;//
	var Storage = Storage.Storage;
	mui.init();
	var $ = jquery;
	
	mui.plusReady(function(){
		document.getElementById("forgetPassword").addEventListener("click",function(){
		  mui.openWindow({
		  	       url:"../forgetPassword/forgetPassword.html",
		           id:"forgetPassword"
  });
			//忘记密码就到注册页面去
		});
	});
	
	
//	如果记住了密码,那么就直接登录就可以了
     
   (function(){
   	var username = Storage.storageGetter("username");
   	var password = Storage.storageGetter("password");
    if(username!=="null" && password !=="null"){
    	login(username,password);
    }
   })()
	
	
	
	
    
	document.getElementById("loginBtn").addEventListener("click",function(){
		
			var username = $("#username").val();
	        var password = $("#password").val();
	       
	        if(username && password){
		    login(username,password);
									}
});
	
	
	function login(username,password){
		  
		  var request = {
				type:"USER_LOGIN",
				data:{
					username:username,
					password:password
				}
			};
			connect(request,success,failure);
			function success(data){
				
			mui.openWindow({
					url:"../main/index.html",
					show:{
						duration:800
					}
			})
				

			}
			function failure(data){
				console.log(JSON.stringify(data));
			}

			
		};
		
		//记住密码
	var  myCheckBox = document.getElementById("rememberPassword");
			myCheckBox.addEventListener("click",function(e){
				var username = $("#username").val();
	            var password = $("#password").val();
	            if(!username || !password){
	            	alert("请完善用户名和密码");
	            	return;
	            }
				if(myCheckBox.checked){
					//如果要记住用户名和密码就保存用户名和密码
					Storage.storageSetter("username",username);
					Storage.storageSetter("password",password);
				}
				else {
					//否则就清空用户名和密码
					Storage.storageSetter("username",null);
					Storage.storageSetter("password",null);
				}
			});	
	
	$("#test").on("click",function(){
		console.log(Storage.storageGetter("username")+","+
		Storage.storageGetter("password"));
	});
	
		
});






			