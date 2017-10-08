require.config({
	paths:{
		"connect":"../js/connect",
		"jquery":"../js/jquery-3.2.1.min",
		"ZBInfoWindow":"ZBInfoWindow"
	}
});

define(["connect","jquery","ZBInfoWindow"],function(connect,jquery,ZBInfoWindow){
	var connect = connect.connect;
	var $ = jquery;
	var ZBInfoWindow = ZBInfoWindow.ZBInfoWindow;
	LoadZBInf = function(opts){
		var me = this;
		me.opts = opts;
		me._init();
	}
	LoadZBInf.prototype._init = function(){
		var me = this;
		me.getMyPublishInfFromEnd(function(data){
			        var responseDataArr = data.responseDataArr;//我发布的数据的数组
			        me.opts.map.setZoom(3);
					ZBInfoWindow.setMap(me.opts.map);//设置当前地图
					for(var i=0;i<responseDataArr.length;i++){
					var positionArr = me.getPositionArr(responseDataArr[i]);
					var infId = responseDataArr[i].id;
				    ZBInfoWindow.addMark(positionArr,infId);
				    var initInforObj = me.getInitInforObj(responseDataArr[i]);
					ZBInfoWindow.initInfoWindow(initInforObj);
					}
		});
	}
	LoadZBInf.prototype.getMyPublishInfFromEnd = function(callback){
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
	LoadZBInf.prototype.getPositionArr = function(jsonObj){
		var me = this;
	    var positionArr = [jsonObj.lng,jsonObj.lat];
	    return positionArr;
	}
	LoadZBInf.prototype.getInitInforObj = function(jsonObj){
		var me = this;
		var initInforObj = {
			title:jsonObj.title,
			scoreofwaiter:jsonObj.scoreofwaiter,
			pertakes:jsonObj.pertakes,
			detailInfUrl:jsonObj.id
		};
		return initInforObj;
		
	}
	return {
		LoadZBInf:LoadZBInf
	}
});


                   