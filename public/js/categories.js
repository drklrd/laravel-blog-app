var docReady = setInterval(function(){
	if(document.readyState !== 'complete'){
		return;
	}
	clearInterval(docReady);

	var editSections = document.getElementsByClassName('edit');
	for(var i=0; i<editSections.length;i++){
		editSections[i].firstElementChild.firstElementChild.children[1].firstChild.addEventListener('click',startEdit);
	}

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

function startEdit(event){
	event.preventDefault();
	event.target.innerText='Save';
	var li = event.path[2].children[0];
	li.children[0].value = event.path[4].previousElementSibling.children[0].innerText;
	li.style.display = 'inline-block';
	setTimeout(function(){
		li.children[0].style.maxWidth = '120px';
	},1);
	event.target.removeEventListener('click',startEdit);
	event.target.addEventListener('click',saveEdit);

}

function saveEdit(event){
	event.preventDefault();
	var li = event.path[2].children[0];
	var categoryName = li.children[0].value;
	var categoryId = event.path[4].previousElementSibling.dataset['id'];
	if(categoryName.length === 0){
		alert('Enter');
		return;
	}
	ajax('POST','/admin/blog/categories/update','name='+categoryName+'&category_id='+categoryId,endEdit,[event]);
}

function endEdit(params,success,responseObj){
	var event = params[0];
	if(success){
		var newName = responseObj.new_name;
		var article = event.path[5];
		article.style.backgroundColor = '#afefac';
		setTimeout(function(){
			article.style.backgroundColor = "white";
		},300);
		article.firstElementChild.firstElementChild.innerHTML = newName;
	}
	event.target.innerText = "Edit";
	var li = event.path[2].children[0];
	li.children[0].style.maxWidth = "0px";
	setTimeout(function(){
		li.style.display="none";
	},310);
	event.target.removeEventListener('click',saveEdit);
	event.target.addEventListener('click',startEdit);


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
			if(http.status === 200){
				var obj = JSON.parse(http.responseText);
				cb(cbparams,true,obj);
			}else if(http.status === 400){
				alert('OOOPS');
				cb(cbparams,false);
			}else {
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