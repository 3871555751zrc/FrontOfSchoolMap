require.config({

	paths: {
		"mui": "../js/mui",
		"connect": "../js/connect",
		"jquery":"../js/jquery-3.2.1.min"
	}

});

define(["mui","connect","jquery"], function(mui,connect,jquery) {
	var mui = mui.mui;
	var connect = connect.connect;
	var $ = jquery;
	imagUpLoad = {
		imgUp: function() {
			var m = this;
			plus.nativeUI.actionSheet({
				cancel: "取消",
				buttons: [{
					title: "拍照"
				}, {
					title: "从相册中选择"
				}]
			}, function(e) {
				switch(e.index) {
					case 1:
						appendByCamera();
						break;
					case 2:
						appendByGallery();
						break;
				
				}
			});
		},
		setImageFileName:{}
		
	};

	function appendByCamera() {
		plus.camera.getCamera().captureImage(function(e) {
			plus.io.resolveLocalFileSystemURL(e, function(entry) {
				var path = entry.toLocalURL();//图片的url
				var filename = entry.name;//文件的名字
				var fullPath = entry.fullPath;//文件的完整路径

//				document.getElementById("imgUpload").src = path;
                  //压缩和上传图片
                  compressAndUpload(fullPath,filename);
               
        	
				
			}, function(e) {
				mui.toast("读取拍照文件错误" + e.message);
			});
		});
	}


   function appendByGallery(){
                plus.gallery.pick(function(path){
                	var fullPath = path;
                	var fileName = fullPath.slice(fullPath.lastIndexOf("\/")+1);
                	
                    compressAndUpload(fullPath,fileName);
                   

                });
            }
   
   //压缩和上传图片
function compressAndUpload(fullPath,filename){
	
	 //图片压缩
	            var WaitingVw = plus.nativeUI.showWaiting( "等待中..." );
                plus.zip.compressImage({
        		src: fullPath,
        		dst: fullPath,
        		overwrite:true,
        		quality: 10
        	},
        	function() {
        		createUpload(fullPath,filename,WaitingVw);//上传图片
        	},
        	function(error) {
        		alert("Compress error!");
        	});
}
   
//上传图片
   function createUpload(fullPath,filename,WaitingVw) {
	var task = plus.uploader.createUpload( "http://176547or77.51mypc.cn//SchoolMapBackEnd/ImageHandler", 
		{ method:"POST",priority:100,timeout:10 },
		function ( t, status ) {
			// 上传完成
			if ( status == 200 ) {
				//上传完成之后设置当前图片的名字，以及显示当前的图片
                if(typeof imagUpLoad.setImageFileName ==="function"){
                	imagUpLoad.setImageFileName(filename);
                }
                document.getElementById("imgUpload").src = fullPath;
				WaitingVw.close();//关闭等待框
//					
			} else {
				alert( "Upload failed: " + status );
			}
		}
	);
	task.addFile(fullPath,{key:filename});
	task.addData( "filename",filename);
	task.addData("hello","hello");
	//task.addEventListener( "statechanged", onStateChanged, false );
	task.start();
}
   
//	返回接口
	return {
		imagUpLoad:imagUpLoad
	}

});