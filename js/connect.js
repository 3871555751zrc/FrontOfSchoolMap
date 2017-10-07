require.config({
	
	paths:{
		"mui":"mui",
		"jquery":"jquery-3.2.1.min"
	}
	
});
define(["mui","jquery"],function(mui,jquery) {
	var mui = mui.mui;
	mui.init();
	var $ = jquery;
     
     var connect = function(request, success, failure) {
		$.ajax({
			url: "http://176547or77.51mypc.cn/SchoolMapBackEnd/Service" + "?type=" + request.type,
			method: "post",
			data: {
				request: JSON.stringify(request.data)
			},
			success: function(data) {
				var json = JSON.parse(data);
				if(json["success"]) {
					if(success && typeof success === "function") {
						success(json);
					}
				} else {
					if(failure && typeof failure === "function") {
						failure(json);
					}
				}
			},
			error: function() {
                   console.log("dfd");
			}
		});
	};



	return {
		connect: connect
	}
});


		
		