$(document).ready(function(){

$("#ClearButton").click(clear());
	function clear(){
		$("#SearchInput").val("");
		$("#StartYear").val("");
		$("EndYear").val("");
	}

	$("#SearchButton").click(function() {
		var nyURL="";
		var start="";
		var end="";
    	var head = $("#SearchInput").val();
    	var start = $("#StartYear").val();
    	var end = $("#EndYear").val();
    	var limit = $("#Limit").val();
    	clear();
    	$("#TopSearch").html("");
    	console.log(start);
    	console.log(end);
    	if(start=="" && end==""){
    		nyURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + head + "&api-key=6161a8c862c0ede0057f4230432e6fe5:1:74629269";}
    	else if(start!="" && end==""){
    		nyURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + head + "&begin_date=" + start + "0101&api-key=6161a8c862c0ede0057f4230432e6fe5:1:74629269";}
    	else if(start!="" && end==""){
    		nyURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + head + "&end_date=" + end + "1231&api-key=6161a8c862c0ede0057f4230432e6fe5:1:74629269";}
    	else if(start!="" && end!=""){
			nyURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + head + "&begin_date=" + start + "0101&end_date=" + end + "1231&api-key=6161a8c862c0ede0057f4230432e6fe5:1:74629269";}
		$.ajax({url: nyURL, method: "GET"})
		.done(function(x){
		   console.log(x)
		    for(var i=0;i<x.response.docs.length&& i<limit; i++){
		    	$("#TopSearch").append("<div class='block"+i+"'></div>")
				$(".block"+i).append("<div class='articleNum'>"+(i+1)+"</div>");
			   $(".block"+i).append("<div class='headline'>"+x.response.docs[i].headline.main+"</div>");
			   if(x.response.docs[i].byline==null){}
			   else{
			   		$(".block"+i).append("<div class='author'>"+x.response.docs[i].byline.original+"</div>");}
			   $(".block"+i).append("<div class='section'>"+ x.response.docs[i].section_name+"</div>");
			   $(".block"+i).append("<div class='pubDate'>"+x.response.docs[i].pub_date+"</div>");
			   $(".block"+i).append("<div class='url'><a href='"+x.response.docs[i].web_url+"'>"+x.response.docs[i].web_url+"</div>");
			}
    	});
    });
   })