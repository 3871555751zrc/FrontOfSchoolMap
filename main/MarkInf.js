require.config({
	paths:{
		"imagUpLoad":"imagUpLoad",
		"connect":"../js/connect",
		"mui":"../js/mui",
		"jquery":"../js/jquery-3.2.1.min"
	}
});


define(["imagUpLoad","connect","mui","jquery"],function(imagUpLoad,connect,mui,jquery){
	var imagUpLoad = imagUpLoad.imagUpLoad;
	var connect = connect.connect;
    var mui = mui.mui;
    var $ = jquery;
    
	var MarkInf = function(opts)
	{
		
		var me = this;
		me.opts = $.extend(true,opts);
		if(typeof opts.target ==="string")
		{
			me.el = document.getElementById(me.opts.target);
		}
		me.request = {
			type:"",
			data:{
				
			}
		};
		me._init();
		me.addDom();
		me.addEventHander();
	}
	MarkInf.prototype._init = function()
	{
		    var me = this;
		    me.el.style.display = "block";
		    me.imageFileName = "nohaving";
	}
	MarkInf.prototype.addDom = function()
	{
		var me = this;
		var html = 
		    '<div id="MarInfDialog_head" style="display:;">'+
				'<button>X</button>'+
			'</div>'+
			'<div class="MarInfDialog_body">'+
				'<div class="MarInfDialog_body_left_box">'+
					'<img id="imgUpload" src="imgs/fengjing.jpg"/>'+
				'</div>'+
				'<div class="MarInfDialog_body_right_box">'+
					'<select name="Item" id="selectItem">'+
						'<option value="0">请选择你的主题</option>'+
						'<option value="1">娱乐</option>'+
						'<option value="2">新闻</option>'+
						'<option value="3">校内公告</option>'+
					'</select>'+
				    '<input type="text" name="" id="title" value="" />'+
				'</div>'+
				'<div class="MarInfDialog_body_bottom_box">'+
					'<textarea id="content" rows="3" placeholder="多行文本框9"></textarea>'+
//              '<textarea id="content" rows="5" placeholder="多行文本框" class="mui-input-speech mui-input-clear"></textarea>'
				'</div>'+
			'</div>'+
			'<div class="MarInfDialog_foot">'+
				'<p><input type="button" name="" id="submit" value="提交" class="mui-btn mui-btn-primary mui-btn-block"/></p>'+
			'</div>';
	       me.el.innerHTML = html;
	       
		   document.getElementById("MarInfDialog").style.display = "block";
		
	}
	MarkInf.prototype.addEventHander = function()
	{
		var me = this;
		document.getElementById("MarInfDialog_head").addEventListener("click",function(){
			me.closeCurrDialog();
		});
		//获取主题
		document.getElementById("selectItem").addEventListener("change",function(e){
			me.request.data.itemtypeid = e.target.value;
		});
		document.getElementById("submit").addEventListener("click",function(){
			var title = document.getElementById("title").value;
			var content = document.getElementById("content").value;
			me.request.type = "USER_PUBLISHMARKINF";
			me.request.data.title = title;
			me.request.data.content = content;
			me.request.data.imagefilename = me.imgFileName;//获得图片文件名字
            me.request.data.positionStr =  me.opts.positionStr//位置，举例子：28.174773,112.927482
			connect(me.request,function(data){
				   me.opts.hideMark2();//因此mark2
				   mui.toast("上传成功");
                   me.closeCurrDialog();
                   
               },function(data){
                   console.log(data);
               });


   });
		
		document.getElementById("imgUpload").addEventListener("click",function(){
			             imagUpLoad.setImageFileName = function(imageFileName){
	                     	me.imgFileName = imageFileName;
	                    };//用于给函数给当前对象赋值的函数
	                     imagUpLoad.imgUp();
	                     
	                     
	     });
	     
	     

       
	     
		
	}
	MarkInf.prototype.closeCurrDialog = function(){
		document.getElementById("MarInfDialog").style.display = "none";
	}
	        
	
	
	return {
		MarkInf:MarkInf
	}
	
});



