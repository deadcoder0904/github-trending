function handleData(day, data) {
	var arr = [];
	var json = JSON.parse(data);
	var c = 0;
	var trending = $('#trending');
	
	arr.push("<h1 class='blue bg-black-40 dib pa4'> <i class='em em-alien'></i> " + day.slice(0,-5) + " <i class='em em-skull'></i></h1>");
  for(var i = 0; i < json.length; i++) {
		if(c % 2 == 0) {
			arr.push("<div class='dt dt--fixed'>");
  		arr.push("<div class='dt-row'>");
  	}
		 
		arr.push("<div class='dtc tc pv4 bg-black-40'>");
		arr.push("<a class='f3 link b hover-orange no-underline dark-green dib ph2 pv1 ba b--purple-20' href='" + json[i].url + "' target='_blank'>" + json[i].name + "</a>");
		arr.push("<p class='f3 lh-copy tc'>" + json[i].description + "</p>");
	  arr.push("</div>");
  
		if((c + 1) % 2 == 0) {
  		arr.push("</div>");
			arr.push("</div>");	
  	}
  	c++;
  }
	trending.append(arr.join(""));
}

$(document).ready(function() {
	
	$('body').flowtype({ 
	 minimum : 300, 
	 maximum : 1200 
	});

	let trendsDate = [];
	
	$.ajax({
	  	url: "https://api.github.com/repos/deadcoder0904/github-trending-json-api/git/trees/master?recursive=1"
		}).done(function(res) {
			   		$.ajax({
					  	url: res.tree[9].url
						}).done(function(res1) {
			   		let i;
			   		for(i = 0; i < res1.tree.length; i++) {
			   			trendsDate.push(res1.tree[i].path);
						}
			   		for (i = trendsDate.length - 1; i >= 0; i--) {
		   				let date = trendsDate[i];
			   			$.getJSON({
								  	url: 'https://raw.githubusercontent.com/deadcoder0904/github-trending-json-api/master/json/' + date 
									}).done(function(res2) {
						   			handleData(date,JSON.stringify(res2));
							}).catch(function(err2) {
									console.log(err2);
							});
		   			}	
				}).catch(function(err1) {
						console.log(err1);
				});
	}).catch(function(err) {
			console.log(err);
	});

});