require.config({
	paths:{
		"connect":"../js/connect",
		"mui":"../js/mui",
		"jquery":"../js/jquery-3.2.1.min"
	}
});

define(["connect","mui","jquery"],function(connect,mui,jquery){
	var mui = mui.mui;
	var $ = jquery;
	var ZBInfoWindow = {
		count:0,
		mui:null,
		map:null,
		title:null,
		content:null,
		infoWindow:[],
		setMui:function(mui){
			this.mui = mui;
		},
		setMap:function(map){
			this.map = map;
		},
		addMark:function(positionArr,infId) {
	    var me = this;
        var marker = new AMap.Marker({
            map: me.map,
            position: positionArr   // [116.481181, 39.989792]
        });
        marker.setExtData({
        	infId:infId,
        	positionArr:positionArr,
        	positionArrId:infId+"_postion",
        	mapNavId:infId+"_mapNavId"
        });
        marker.currIndex = ++me.count;//给当前按钮标识!
        //鼠标点击marker弹出自定义的信息窗体
        AMap.event.addListener(marker, 'click', function(e) {
            me.infoWindow[e.target.currIndex].open(me.map, marker.getPosition());
            var aimId = marker.getExtData().infId;
            var positionArrId = marker.getExtData().positionArrId;
            var mapNavId = marker.getExtData().mapNavId;
            setTimeout(function(){
            	document.getElementById(positionArrId).innerText = marker.getExtData().positionArr;
            	document.getElementById(mapNavId).onclick = function(){
            		var DestinationPositionArr = document.getElementById(positionArrId).innerText.split(",");
            		me.planARoute(DestinationPositionArr);
            	};
            },1000);
        });
        AMap.event.addListener(marker, 'dblclick', function(e) {
           me.map.setZoomAndCenter(14,marker.getPosition());
        });
  },
  openDetailInfPage:function(infId){
  mui.openWindow({
  	url:"../detailInfPage/detailInfPage.html",
  	id:"deatailInfPage",
  	extras:{
        infId:infId  //扩展参数
    }
  });
  },
  initInfoWindow:function(initInforObj){
  	var me = this;
  	  (function(initInforObj){
  	me.title = initInforObj.title+'<span style="font-size:11px;color:#F00;">价格:318</span>',
    me.content = [];
    me.content.push("<img src='http://image.zhms.cn/2017-05/59c42fe3e53548eea3c8b624a9775a25.jpg?x-oss-process=image/format,jpg/interlace,1/resize,m_fill,h_276,w_276/watermark,image_RGVmYXVsdC9iLnBuZw==,t_35,g_se,x_10,y_10' style='height:50px;width:auto;'>");
    me.content.push("<span>评分:"+initInforObj.scoreofwaiter+"</span>");
    me.content.push("<span>人均消费:"+initInforObj.pertakes+"</span>");
    var infId = initInforObj.detailInfUrl;
    var positionArrId = infId+"_postion";
    var mapNavId = infId+"_mapNavId";
    me.content.push("<span id="+positionArrId+">你妹的</span>");
    me.content.push("<button id="+mapNavId+">路径</button>");
    
    me.infoWindow[me.count] = new AMap.InfoWindow({
        isCustom: true,  //使用自定义窗体
        content: me.createInfoWindow(me.title, me.content.join("<br/>")),
        offset: new AMap.Pixel(16, -45)
    });
   
  	  	
//	  	<p id="23" onclick="openDeatilInfPage([object" object])="">详细信息</p>
  	  	
  	  	
  	  })(initInforObj)
  },
  closeInfoWindow:function(){
  	var me = this;
  	me.map.clearInfoWindow();
  },
  createInfoWindow:function(title,content){
  	var me = this;
  	var info = document.createElement("div");
        info.className = "info";

        //可以通过下面的方式修改自定义窗体的宽高
        //info.style.width = "400px";
        // 定义顶部标题
        var top = document.createElement("div");
        var titleD = document.createElement("div");
        var closeX = document.createElement("img");
        top.className = "info-top";
        titleD.innerHTML = title;
        closeX.src = "http://webapi.amap.com/images/close2.gif";
        closeX.onclick = function(){
        	me.closeInfoWindow();
        }

        top.appendChild(titleD);
        top.appendChild(closeX);
        info.appendChild(top);

        // 定义中部内容
        var middle = document.createElement("div");
        middle.className = "info-middle";
        middle.style.backgroundColor = 'white';
        middle.innerHTML = content;
        info.appendChild(middle);

        // 定义底部内容
        var bottom = document.createElement("div");
        bottom.className = "info-bottom";
        bottom.style.position = 'relative';
        bottom.style.top = '0px';
        bottom.style.margin = '0 auto';
        var sharp = document.createElement("img");
        sharp.src = "http://webapi.amap.com/images/sharp.png";
        bottom.appendChild(sharp);
        info.appendChild(bottom);
        return info;
  },
  planARoute:function(DestinationPositionArr){
  	var me = this;
    me.getCurrPosition(function(originPositionArr){
    	
    	var driving = new AMap.Driving({
        map: me.map,
        panel: "panel"
    }); 
    // 根据起终点经纬度规划驾车导航路线
    driving.search(new AMap.LngLat(originPositionArr[0],originPositionArr[1]), new AMap.LngLat(DestinationPositionArr[0],DestinationPositionArr[1]));
    });
  },
  getCurrPosition:function(callback){
  	var me = this;
  	plus.geolocation.getCurrentPosition(function(p){
		var originPositionArr = [p.coords.longitude,p.coords.latitude];
		callback(originPositionArr);
	}, function(e){
		alert('Geolocation error: ' + e.message);
	},{
		enableHighAccuracy:true
	});	
  }
	};
	ZBInfoWindow.setMui(mui);
	
	return {
		ZBInfoWindow:ZBInfoWindow
	}
});
