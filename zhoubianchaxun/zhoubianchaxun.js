require.config({
	
	paths:{
		"connect":"../js/connect",
		"mui":"../js/mui",
		"jquery":"../js/jquery-3.2.1.min",
		"LoadZBInf":"LoadZBInf"
	}
	
});
define(["connect","mui","jquery","LoadZBInf"],function(connect,mui,jquery,LoadZBInf){
	var connect = connect.connect;
	var mui = mui.mui;//
	var LoadZBInf = LoadZBInf.LoadZBInf;
	mui.init();
	var $ = jquery;
	
	map = new AMap.Map('map',{
            resizeEnable: true,
            zoom: 10,
            center: [112.927165,28.175154]
        });
        
        //韩式料理及西餐
        $("#hanshiliaolijixican").on("click",function(){
        	map.clearMap();
        	new LoadZBInf({
	    	map:map,
	    	type:"POINOFINFSER_HANSHILIAOLIJIXICAN"
	    }); 
	});
	
	$("#tiandiancafei").on("click",function(){
        	map.clearMap();
        	new LoadZBInf({
	    	map:map,
	    	type:"POINOFINFSER_TIANDIANCAFEI"
	    }); 
	});
	
	
	$("#xiangcai").on("click",function(){
        	map.clearMap();
        	new LoadZBInf({
	    	map:map,
	    	type:"POINOFINFSER_XIANGCAI"
	    }); 
	});

    
    $("#xiaochikuaican").on("click",function(){
        	map.clearMap();
        	new LoadZBInf({
	    	map:map,
	    	type:"POINOFINFSER_XIAOCHIKUAICAN"
	    }); 
	});


$("#huoguo").on("click",function(){
        	map.clearMap();
        	new LoadZBInf({
	    	map:map,
	    	type:"POINOFINFSER_HUOGUO"
	    }); 
	});
	
	$("#shaokao").on("click",function(){
        	map.clearMap();
        	new LoadZBInf({
	    	map:map,
	    	type:"POINOFINFSER_SHAOKAO"
	    }); 
	});
	
	
	$("#haixian").on("click",function(){
        	map.clearMap();
        	new LoadZBInf({
	    	map:map,
	    	type:"POINOFINFSER_HAIXIAN"
	    }); 
	});

   

	

});


//
	




			