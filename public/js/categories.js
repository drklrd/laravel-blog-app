var docReady = setInterval(function(){
	if(document.readyState !== 'complete'){
		return;
	}
	clearInterval(docReady);

	document.getElementsByClassName('btn')[0].addEventListener('click',createNewCategory);
},100);

function createNewCategory(e){
	e.preventDefault();
	var name = e.target.previousElementSibling.value;
	if(name.length === 0){
		 alert('Enter !');
		 return;
	}

	ajax('POST','/admin/blog/category/create',"name="+name,newCategoryCreated, [name] )

}

function ajax(method,url,params,cb,cbparams){

	var http;

	if(window.XMLHttpRequest){
		http = new XMLHttpRequest();
	}else{
		http = new ActiveXObject('Microsoft.XMLHTTP');
	}

	http.onreadystatechange = function(){
		if(http.readyState === XMLHttpRequest.DONE){
			console.log('@@',http)
			if(http.status === 200){
				var obj = JSON.parse(http.responseText);
				cb(cbparams,true,obj);
			}else if(http.status === 400){
				alert('OOOPS');
				cb(cbparams,false);
			}else {
				console.log('###',http.status,'$$$',url)
				var obj = JSON.parse(http.responseText);
				if(obj.message){
					alert(obj.message);
				}else{
					alert('There was an error !');
				}
			}
		}
	}
	http.open(method,'http://127.0.0.1:8000' + url,true);
	http.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	http.setRequestHeader('X-Requested-With','XMLHttpRequest');
	http.send(params + '&_token=' + token);

}

function newCategoryCreated(params, success, responseObj){

	location.reload();

}