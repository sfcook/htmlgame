var TAG_LIST=["a","abbr","acronym","address","area","b","base","bdo","big","blockquote","body","br","button","caption","cite","code","col","colgroup","dd","del","dfn","div","dl","dt","em","fieldset","form","h1","h2","h3","h4","h5","h6","head","html","hr","i","img","input","ins","kbd","label","legend","li","link","map","meta","noscript","object","ol","optgroup","option","p","param","pre","q","samp","script","select","small","span","strong","style","sub","sup","table","tbody","td","textarea","tfoot","th","thead","title","tr","tt","ul","var"]

function tagTimer(newTagDelay){
	window.setTimeout(newTag,newTagDelay,newTagDelay);
}

function randTag(){
	return TAG_LIST[Math.floor(Math.random()*TAG_LIST.length)];
}
function newTag(newTagDelay){
	if($(".item").length<=40){
		newTagDelay-=1;
		$("<div class='item'></div>").appendTo("#list").text("\<"+randTag()+"\>");
		;
		tagTimer(newTagDelay);
	}
	else {
		$("#close_tag").prop("disabled",true);
		$("#close_tag").val("Game Over");
	}
}

function addScore(num){
	var score=parseInt($("#score").text());
	if(isNaN(score)){
		score=0;
	}
	score+=num;
	$("#score").text(score);
}

function checkMatch(){
	val=$("#close_tag").val();
	if(!$("#clear").prop("checked")) {
		$("#close_tag").val("");
	}
	var items=$(".item").get();
	for (i=0;i<items.length;i++){
		var content=$(items[i]).text();
		content=content.replace("<","</");
		if(content==val){
			$(items[i]).remove();
			$("#close_tag").val("");
			addScore(1);
			break;
		}
	};
}

$(document).ready(function(){
	/*
	//remove invaild tag?
	$(document).on('click','.item',function(){
        $(this).remove();
    });*/
	
	$(document).keypress(function(e){

		//enter key pressed
		if(e.which==13 && !$("#enter").prop("checked")) {
			checkMatch();
		}
	});

	$("#start").click(function(){
		$(this).remove();
		$("#close_tag").focus();
		tagTimer(2000);
	});

	$("#close_tag").on('input',function(){
		val=$("#close_tag").val();
		if(val[val.length-1]=='>' && $("#enter").prop("checked")){
			checkMatch();
		}
	})
});