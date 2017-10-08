require.config({
	
	paths:{
		"mui":"../js/mui",
		"MarkInf":"MarkInf",
		"InfoWindow":"InfoWindow",
		"connect":"../js/connect",
		"LoadMyPublishInf":"LoadMyPublishInf",
		"spatialQuery":"../spatialQuery/spatialQuery",
		"jquery":"../js/jquery-3.2.1.min",
		"LoadInfByItem":"LoadInfByItem"
	}
	
});

require(["mui","MarkInf","InfoWindow","connect","LoadMyPublishInf","spatialQuery","jquery","LoadInfByItem"]
,function(mui,MarkInf,InfoWindow,connect,LoadMyPublishInf,spatialQuery,jquery,LoadInfByItem){
	var mui = mui.mui;
	var MarkInf = MarkInf.MarkInf;
	var connect = connect.connect;
	var InfoWindow = InfoWindow.InfoWindow;
	var LoadMyPublishInf = LoadMyPublishInf.LoadMyPublishInf;
	var Editor = spatialQuery.Editor;
	var $ = jquery;
	var LoadInfByItem = LoadInfByItem.LoadInfByItem;
	
	var map = null;//地图全局对象牛逼
	mui.init({
				swipeBack:true //启用右滑关闭功能
			});
			var menuWrapper = document.getElementById("menu-wrapper");
			var menu = document.getElementById("menu");
			var menuWrapperClassList = menuWrapper.classList;
			var backdrop = document.getElementById("menu-backdrop");
			var info = document.getElementById("info");
			
			backdrop.addEventListener('tap', toggleMenu);
//			document.getElementById("menu-btn").addEventListener('tap', toggleMenu);
			document.getElementById("icon-menu").addEventListener('tap',toggleMenu)
			//下沉菜单中的点击事件
			mui('#menu').on('tap', 'a', function() {
				toggleMenu();
				if(this.id==="hello"){
					map.clearMap();
					var loadMyPublishInf = new LoadMyPublishInf({
						map:map
					});
				}
				else if(this.id==="spatialQuery"){//
					map.clearMap();
					var editorCircle = new Editor({
						map:map,
						center:[112.927165,28.175154],
						startEditCircleNode:document.getElementById("start"),
//						endEditCircleNode:document.getElementById("end"),
						spatialQuery:document.getElementById("spatialQuery"),
						InfoWindow:InfoWindow
					});
				}
				else if(this.id==="amusement"){
					map.clearMap();
					var amusemet = new LoadInfByItem({
						map:map,
						type:"USER_LOADAMUSEMENT"
					});
				}
				else if(this.id==="news"){
					map.clearMap();
					var news = new LoadInfByItem({
						map:map,
						type:"USER_LOADNEWS"
                       
					});
				}
				else if(this.id==="schoolNotice"){
					map.clearMap();
					var schoolNotice = new LoadInfByItem({
						map:map,
						type:"USER_LOADASCHOOLNOTICE"
					});
				}
				else if(this.id==="hotEvent"){
					alert("hotEvent");
				}
			});
			var busying = false;

			function toggleMenu() {
				if (busying) {
					return;
				}
				busying = true;
				if (menuWrapperClassList.contains('mui-active')) {
					document.body.classList.remove('menu-open');
					menuWrapper.className = 'menu-wrapper fade-out-up animated';
					menu.className = 'menu bounce-out-up animated';
					setTimeout(function() {
						backdrop.style.opacity = 0;
						menuWrapper.classList.add('hidden');
					}, 500);
				} else {
					document.body.classList.add('menu-open');
					menuWrapper.className = 'menu-wrapper fade-in-down animated mui-active';
					menu.className = 'menu bounce-in-down animated';
					backdrop.style.opacity = 1;
				}
				setTimeout(function() {
					busying = false;
				}, 500);
			}
			
			mui('.mui-scroll-wrapper').scroll({
								deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
							});
	
//	地图秘钥d8f9934e867322676d97a422bf33c111
document.addEventListener('plusready', onPlusReady, false);
    map = new AMap.Map('map',{
            resizeEnable: true,
            zoom: 16,
            center: [112.927165,28.175154]
        });


// 扩展API加载完毕，现在可以正常调用扩展API
function onPlusReady(){

 EventHander();
}

function EventHander()
{
//	H5+定位
	var center = [];
    var marker1;
    
	document.getElementById("curr_position").addEventListener("click",function(){
	plus.geolocation.getCurrentPosition(function(p){
		center = [p.coords.longitude,p.coords.latitude];
		  map.setZoomAndCenter(18, center);
		  if(typeof marker ==="object")
		  {
		  	console.log("fdfd");
		    marker.hide();
		  }
		    marker1 = new AMap.Marker({
            map: map,
            position: center
        });
		//alert('Geolocation\nLatitude:' + p.coords.latitude + '\nLongitude:' + p.coords.longitude + '\nAltitude:' + p.coords.altitude);
	}, function(e){
		alert('Geolocation error: ' + e.message);
	},{
		enableHighAccuracy:true
	});	
	});
	
	document.getElementById("map_mark_box").addEventListener("click",function(){
		
		if(marker1)
		{
			marker1.hide();
		}
		var marker2 = new AMap.Marker({
        position: map.getCenter(),
        draggable: true,
        cursor: 'move',
        raiseOnDrag: true,
        icon: new AMap.Icon({            
            size: new AMap.Size(40, 50),  //图标大小
            image: "http://webapi.amap.com/theme/v1.3/images/newpc/way_btn2.png",
            imageOffset: new AMap.Pixel(0, -60)
        })        
             });
       marker2.setMap(map);
       
       marker2.on("touchend",function(){
       	//开启对话框
         var positionStr = marker2.getPosition().getLat()+","+marker2.getPosition().getLng();
       	var markInf = new MarkInf({
       		target:"MarInfDialog",
       		positionStr:positionStr,
       		hideMark2:function(){
       			marker2.hide();
       		}
       	});
       });
       
		
		
	});
	
	
	
}	

mui("#tableNav").on('tap',"#mine",function(){
 mui.openWindow("../Mine/Mine.html")
});

mui("#tableNav").on('tap',"#zhoubianchaxun",function(){
 mui.openWindow("../zhoubianchaxun/zhoubianchaxun.html")
});

mui("#tableNav").on('tap',"#dituliulan",function(){
 
});

}
);


