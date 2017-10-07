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
	
	var Storage = {
		storageSetter:function(key,val){
			localStorage.setItem(key, val);
		},
		storageGetter:function(key){
			return localStorage.getItem(key);
		}
	};
	
	return {
		Storage:Storage
	}
	
});






			