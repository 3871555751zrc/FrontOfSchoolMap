require.config({
		baseUrl: "../js",
		paths: {
			"connect": "connect",
			"jquery":"jquery-3.2.1.min",
			"mui":"mui"
		},
		//waitSeconds: 15
	});
	require(["connect","jquery","mui"],
		function(connect,jquery,mui) {
			var mui = mui.mui;
			var connect = connect.connect;
			var $ = jquery;
			mui.init();
			
			mui('.mui-scroll-wrapper').scroll({
					deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
				});
			
			var DetailInfPage = function(opts){
				var me = this;
				me.opts = $.extend(true,opts);
				me._init();
			};
			DetailInfPage.prototype._init = function(){
				var me = this;
				var infId = me.opts.currWv.infId;
				var request = {
					type:"USER_QUERYINFBYID",
					data:{
						infId:infId
					}
				}
				me.opts.connect(request,function(json){
					me.renderDom(json.queryInfData);
					me.addEventHander();
				},function(json){
					
				})
			};
			DetailInfPage.prototype.renderDom = function(jsonObj){
				var me = this;
					var initInforObj = {
					title: jsonObj.title,
					imgurl: "http://176547or77.51mypc.cn/SchoolMapBackEnd/images/" + jsonObj.imagefilename,
					contentText: jsonObj.content,
					publishtime: jsonObj.pulishtime,
					infId: jsonObj.id
				};
				document.getElementById("title").innerHTML = initInforObj.title;
				document.getElementById("contentText").innerHTML = initInforObj.contentText;
				document.getElementById("headImage").src = initInforObj.imgurl;
				document.getElementById("publisTime").innerHTML=initInforObj.publishtime;
				document.getElementById("infId").innerHTML = initInforObj.infId;
				me.setLikeCount(function(count){
					document.getElementById("likeCount").innerHTML = count;
				});
			};
			
			
			DetailInfPage.prototype.setLikeCount = function(callback){
				var me = this;
				var infId = document.getElementById("infId").innerHTML;
			 		   var request = {
			 				type:"USER_LOADMARKINFLIKECOUNT",
			 				data:{
			 					infId:infId
			 				}
			 			};
			 			
			 			me.opts.connect(request,function(json){
			 		      callback(json.markinfcount);//渲染
			 			},function(json){
			 				mui.toast(json.message);
			 			});
				
			}
			
			
			
			DetailInfPage.prototype.addEventHander = function(){
				var me = this;
			    me.like();//喜欢的事件
			    me.comment();//评论的事件
			    $("#loadComment").on("click",function(){
			    	me.loadComment();//加载评论的事件
			    	
			    });
			}
			
			DetailInfPage.prototype.like = function(){
				var me = this;
			    document.getElementById("like").addEventListener("click",function(){
			 			var infId = document.getElementById("infId").innerHTML;
			 			var request = {
			 				type:"USER_LIKE",
			 				data:{
			 					infId:infId
			 				}
			 			};
			 			
			 			me.opts.connect(request,function(json){
			 				mui.toast("点赞成功");
			 			var currLikeCount = parseInt(document.getElementById("likeCount").innerText,10);
			    	    document.getElementById("likeCount").innerText = currLikeCount+1;	
			 			},function(json){
			 				mui.toast("点赞失败");
			 			});
			    	
//			    	alert("我喜1欢");
//			    	var currLikeCount = parseInt(document.getElementById("likeCount").innerText,10);
//			    	document.getElementById("likeCount").innerText = currLikeCount+1;
			    });
			}
			DetailInfPage.prototype.comment = function(){
				var me = this;
			 document.getElementById("comment").addEventListener("click",function(){
			 	mui.prompt("请输入评价",function(e){
			 		if(e.index===1){
			 			var commentText = e.value;
			 			var infId = document.getElementById("infId").innerHTML;
			 			var request = {
			 				type:"USER_COMMENT",
			 				data:{
			 					commentText:commentText,
			 					infId:infId
			 				}
			 			};
			 			
			 			me.opts.connect(request,function(json){
			 				mui.toast("评论1成功");
			 			},function(json){
			 				mui.toast("评论失败");
			 			});
			 		}
			 	},["取消","确认"]);
			 })
			
			        
			        
			        
			}
			DetailInfPage.prototype.loadComment = function(){
				var me = this;
			    
			    	   var infId = document.getElementById("infId").innerHTML;
			 		   var request = {
			 				type:"USER_LOADCOMMENT",
			 				data:{
			 					infId:infId
			 				}
			 			};
			 			
			 			me.opts.connect(request,function(json){
			 			var responseDataArr = json.responseDataArr;
			 			var commentLength = responseDataArr.length;//加载的长度
			 			
			 			var html = "";
			 			
			 			for(var i=0;i<commentLength;i++){
			 				html+='<li class="mui-table-view-cell">'+
					               '<a class="">'+
					                responseDataArr[i]["username"]+
					               '</a>'+
						            '<p>'+
						              responseDataArr[i]["commenttext"]+
						            '</p>'+
					                '</li>';
			 			}
			 			$("#commentUlBox").html(html);
			 		   
					        
			 			},function(json){
			 				mui.toast("评论失败");
			 			});
			    
			    
			}
		
				mui.plusReady(function(){
					var currWv = plus.webview.currentWebview();
				var detailInfPage = new DetailInfPage({
				currWv:currWv,
				connect:connect
			});
				});
		
			
			
			
			
		}
		
		
	);


                   

// var mui = mui.mui;
// var connect = connect.connect;
// mui.init();
//
//document.getElementById("readMore").addEventListener("click",function(){
//	
//});
//
//mui.plusReady(function(){
// var dtp = new detailInfPage();
// });
//
// 
// var detailInfPage = function(){
// 	var me = this;
// 	me._init();
// };
// detailInfPage.prototype._init = function(){
// 	var me = this;
// 	var currWV = plus.webview.currentWebview();//获取当前的窗口。
// 	var infId = currWV.infId;//从那边传过来的数据。
// 	console.log(connect);
// 	if(infId){
// 		var request = {
// 			type:"USER_QUERYINFBYID",
// 			data:{
// 				infId:infId
// 			}
// 		};
// 		connect(request,function(json){
// 			me.randerDom(json);//渲染数据
// 			me.handleEvent();//绑定事件
// 		},function(data){
// 			
// 		});
// 	}
// 	else{
// 		alert("数据加载出错");
// 	}
// }
// 
// detailInfPage.prototype.randerDom = function(json){
// 	var me = this;
// 	console.log(JSON.stringify(json));
//  
// }
// 
// 
// return {
// 	detailInfPage:detailInfPage
// }