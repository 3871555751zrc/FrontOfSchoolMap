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
	//退出登录
	$("#cancleLogin").on("click",function(){
		Storage.storageSetter("username",null);
		Storage.storageSetter("password",null);
		alert("退出登录成功");
	});
});






			