require.config({
		baseUrl: "../js",
		paths: {
			"connect": "connect",
			"jquery":"jquery-3.2.1.min",
			"mui":"mui"
		},
		//waitSeconds: 15
	});
	define(["connect","jquery","mui"],
		function(connect,jquery,mui) {
			var mui = mui.mui;
			var connect = connect.connect;
			var $ = jquery;
			mui.init();

			var Editor = function(opts){
				var me = this;
				me.opts = $.extend(true,opts);
				me._init();
			};
			Editor.prototype.connect = connect;
			Editor.prototype._init = function(){
				var me = this;
				me.circle = me.getCircle();
				me.circleEditor = me.getCircleEditor(me.opts.map,me.circle);
				me.handleEvent(me.circleEditor);
				
				
			};
			Editor.prototype.getCircle = function(){
				var me = this;
				var circle = (function(map,center){
				var circle = new AMap.Circle({
            center: center,// 圆心位置
            radius: 100, //半径
            strokeColor: "#F33", //线颜色
            strokeOpacity: 1, //线透明度
            strokeWeight: 3, //线粗细度
            fillColor: "#ee2200", //填充颜色
            fillOpacity: 0.35//填充透明度
		        });
		        circle.setMap(map);
		        return circle;	
				})(me.opts.map,me.opts.center);
				return circle;
			};
			
			Editor.prototype.getCircleEditor = function(map,circle){
				var me = this;
				var circleEditor= new AMap.CircleEditor(map,circle);
				return circleEditor;
			};
			Editor.prototype.handleEvent = function(circleEditor){
				var me = this;
				me.opts.startEditCircleNode.addEventListener("click",function(){
				 circleEditor.open();
				});
//				me.opts.endEditCircleNode.addEventListener("click",function(){
//					circleEditor.close();
//					
//				});
				me.opts.spatialQuery.addEventListener("click",function(){
					me.queryData(function(usedDataArr){
						
			            me.showMark(usedDataArr);
					});
				});
				me.circleEditor.on("end",function(type,target){
					me.circle = target;
				})
			};
			Editor.prototype.queryData = function(callback){
				var me = this;
				var request = {
					type:"USER_SPATIALQUE",
					data:{
						
					}
				};
				me.connect(request,function(json){
					var usedDataArr = me.getUsedDataArr(json);//获得需要的数据
				    if(usedDataArr){
				    	callback(usedDataArr);
				    }
				    else{
				    	alert("你所查询的位置没有需要的东西");
				    }
                    
				},function(json){
					alert("系统出错");
				});
			};
			Editor.prototype.getUsedDataArr = function(json){
				var me = this;
				var usedDataArr = [];
				var responseDataArr = json.responseDataArr;//返回回来的数据数组
				for(var i=0,max=responseDataArr.length;i<max;i++){
				    var isContained = false;
					var lnglat = responseDataArr[i].positionstr.split(",").reverse();
					isContained = me.circle.contains(lnglat);
					if(isContained){
						usedDataArr.push(responseDataArr[i]);//如果包含在里面就加入数组里面
					}
				}
				return usedDataArr;
			};
			Editor.prototype.showMark = function(usedDataArr){
				
				   
				    var me = this;
//			        me.opts.map.setZoom(3);
			         me.opts.map.clearMap();
					me.opts.InfoWindow.setMap(me.opts.map);//设置当前地图
				for(var i=0,max=usedDataArr.length;i<max;i++){
					var positionArr = usedDataArr[i].positionstr.split(",").reverse();
					var infId = usedDataArr[i].id;
					me.opts.InfoWindow.addMark(positionArr,infId);
					var initInforObj = me.getInitInforObj(usedDataArr[i]);
					me.opts.InfoWindow.initInfoWindow(initInforObj);
					
				}
			};
			Editor.prototype.getInitInforObj = function(jsonObj){
				var me = this;
				var initInforObj = {
					title:jsonObj.title,
					imgurl:"http://176547or77.51mypc.cn/SchoolMapBackEnd/images/"+jsonObj.imagefilename,
					contentText:jsonObj.content,
					publishtime:jsonObj.pulishtime,
					detailInfUrl:jsonObj.id//
				};
		return initInforObj;
			};
			return {
			   Editor:Editor
			}
		}
		
		
	);


                   

