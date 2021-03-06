require.config({
	paths:{
		"connect":"../js/connect",
		"jquery":"../js/jquery-3.2.1.min",
		"InfoWindow":"InfoWindow"
	}
});

define(["connect","jquery","InfoWindow"],function(connect,jquery,InfoWindow){
		var connect = connect.connect;
	var $ = jquery;
	var InfoWindow = InfoWindow.InfoWindow;
	var LoadInfByItem = function(opts){
		var me = this;
		//me.opts = $.extend(true,opts);
		me.opts = opts;//复制可能会有问题哟
		me._init();
	}
	LoadInfByItem.prototype._init = function(){
		var me = this;
		me.getMyPublishInfFromEnd(function(data){
			        var responseDataArr = data.responseDataArr;//我发布的数据的数组
			        me.opts.map.setZoom(3);
					InfoWindow.setMap(me.opts.map);//设置当前地图
					for(var i=0;i<responseDataArr.length;i++){
					var positionArr = me.getPositionArr(responseDataArr[i]);
					var infId = responseDataArr[i].id;
				    InfoWindow.addMark(positionArr,infId);
				    var initInforObj = me.getInitInforObj(responseDataArr[i]);
					InfoWindow.initInfoWindow(initInforObj);
					}
		});
	}
	LoadInfByItem.prototype.getMyPublishInfFromEnd = function(callback){
		var me = this;
		var request = {
			type:me.opts.type,
			data:{
				userid:1
			}
		};
		connect(request,function(data){
			callback(data);
		},function(data){
			mui.toast("你还没有发布过任何的东西");
		});
	}
	LoadInfByItem.prototype.getPositionArr = function(jsonObj){
		var me = this;
	    var positionArr = jsonObj.positionstr.split(",").reverse();
	    return positionArr;
	}
	LoadInfByItem.prototype.getInitInforObj = function(jsonObj){
		var me = this;
		var initInforObj = {
			title:jsonObj.title,
			imgurl:"http://176547or77.51mypc.cn/SchoolMapBackEnd/images/"+jsonObj.imagefilename,
			contentText:jsonObj.content,
			publishtime:jsonObj.pulishtime,
			detailInfUrl:jsonObj.id
		};
		return initInforObj;
		
	}
	return {
		LoadInfByItem:LoadInfByItem
	}
	
	
	
});


                   