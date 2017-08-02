var addedCategoriesText;
var addedCategoriesIds;

var docReady = setInterval(function(){
	if(document.readyState !== 'complete'){
		return;
	}
	clearInterval(docReady);

	var addCategoryBtn = document.getElementsByClassName('btn')[0];
	addedCategoriesIds = document.getElementById('categories');
	addCategoryBtn.addEventListener('click',addCategoryToPost);
	addedCategoriesText = document.getElementsByClassName('added-categories')[0];

	for(var i = 0; i < addedCategoriesText.firstElementChild.children.length; i++){
		addedCategoriesText.firstElementChild.children[i].firstElementChild.addEventListener('click',removeCategoryFromPost);
	}

},100);


function addCategoryToPost(event){
	event.preventDefault();
	var select = document.getElementById('category_select');
	var selectedCategoryId = select.options[select.selectedIndex].value;
	var selectedCategoryName = select.options[select.selectedIndex].text;
	if (addedCategoriesIds.value.split(',').indexOf(selectedCategoryId) != -1){
		return;
	}
	if(addedCategoriesIds.value.length > 0){
		addedCategoriesIds.value = addedCategoriesIds.value + "," + selectedCategoryId;
	}else{
		addedCategoriesIds.value = selectedCategoryId;
	}

	var newCategoryLi = document.createElement('li');
	var newCategoryLiink = document.createElement('a');
	newCategoryLiink.href = "#";
	newCategoryLiink.innerText = selectedCategoryName;
	newCategoryLiink.dataset['category_id'] = selectedCategoryId;
	newCategoryLiink.addEventListener('click',removeCategoryFromPost);
	newCategoryLi.appendChild(newCategoryLiink);
	addedCategoriesText.firstElementChild.appendChild(newCategoryLi);

}

function removeCategoryFromPost(event){
	event.preventDefault();
	event.target.removeEventListener('click',removeCategoryFromPost);
	var categoryId = event.target.dataset['category_id'];
	var categoryIDArray = addedCategoriesIds.value.split(',');
	var index = categoryIDArray.indexOf(categoryId);
	categoryIDArray.splice(index,1);
	var newCategoriesIDs = categoryIDArray.join(',');
	addedCategoriesIds.value = newCategoriesIDs;
	event.target.parentElement.remove();

}