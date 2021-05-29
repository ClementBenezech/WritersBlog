const strapiURL = 'https://cbd-strapi.herokuapp.com/';
let postContainer = new Array(20);
let i = 0;

/* to create a div with based on parameters:
				Parent div
				Id of the div to create
				type of div to create
				css class for the div
				*/

function createDivIn($domLocation, $divId, $tag, $class)
		{
			div = document.createElement($tag); //on crée un nouveau div
			div.setAttribute("id", $divId); //On assigne l'ID au DIV nouvellement créé
			div.setAttribute("class", $class); //On assigne sa classe au DIV nouvellement créé
			div = $domLocation.appendChild(div); //On crée le Div en tant qu'enfant de la section "getelementbyid div1"
			return div;
		}

// To clear main content before reloading requested content.

function deleteMainContent() {
	previousContent = document.getElementById("main-content");
	previousContent.textContent = "";
}



function getBlogPost($id) {
	window.scrollTo(0,0);
	console.log("t'as cliqué mon buddy"+$id);
	console.log(strapiURL+"aw-blogposts/"+$id);
	fetch(strapiURL+"aw-blogposts/"+$id)  //appel de l'api
		.then (response => response.json())// Si on reçoit une réponse
		.then (response => //Donc, on refait un then
			{

				deleteMainContent();
				createTitle("Blog", "<i class='fas fa-feather-alt'></i>");
				
				data = response; //Dans une variable data, on met l'enregistrement renvoyé par l'api
				console.log(data);
				postContainer = createDivIn(document.getElementById("main-content"), "post", "div", "blog__element");

				postDateTag = createDivIn(postContainer, "date_tag", "div", "blog__element__date");
				postImage = createDivIn(postContainer, "image", "img", "blog__element__image");
				postTitle = createDivIn(postContainer, "title", "div", "blog__element__title");
				postContent = createDivIn(postContainer, "text", "div", "blog__element__synopsis");
				
				//On insère le src de la balise image
				postImage.src = data['images'][0]['url'];
				

				/*On insère le contenu renvoyé par l'api dans les divs apropriés.*/
				postTitle.textContent = data['title'];
				console.log(data['text'].substring(0,10));
				postContent.textContent = (data['text'])+" ...";
				postDateTag.textContent = data['tag']+" / "+data['published_at'].substring(0,10);
				console.log(data['published_at'].substring(0,10));


				
			})
	

}

function aboutContent (){
	fadeContentOutIn ();
	setTimeout(function() {generateAboutContent()}, 500);
}

function generateAboutContent (){

			deleteMainContent();
			createTitle("L'auteur", "<i class='fas fa-fingerprint'></i>");

					postContainer = createDivIn(document.getElementById("main-content"), "authorContainer", "div", "author__container");
					postContainer.innerHTML= "<img src='public/images/AW_profile.jpg'><p>Anne Waddington, auteure prolifique, partage son temps entre Toulouse et les Monts de Lacaune. </p><p> Elle aime revisiter l'Histoire et mettre en lumière, tant dans ses romans que dans ses thrillers, des éléments du passé dont les manuels évitent de parler . </p><p>Son style enlevé, la justesse de ses personnages et sa façon de distiller le suspens vous emportent jusqu'à des dénouements saisissants et inattendus. </p><p>Anciennement psychologue et thérapeute familial, la retraite lui permet de se consacrer à l'écriture et au théâtre.</p>";
}


function getBookList()
{
		fetch(strapiURL+"aw-books?_sort=release_date:ASC")  //appel de l'api
		.then (response =>  // Si on reçoit une réponse
			{
				response.json() //On la transforme en json mais c'est toujours une promise j'ai pas compris pourquoi
				.then (response => //Donc, on refait un then
					{
					/*console.log("contenu de response: "+response);*/
					fadeContentOutIn ();
					setTimeout(function() {generateBookItems(response)}, 500);
					
				})
			})

}

function generateBookItems ($response){

					
					deleteMainContent();
					createTitle("Bibliographie", "<i class='fas fa-book'></i>");
					booksContainer = createDivIn(document.getElementById("main-content"), "book__books-container", "div", "book__books-container");

					for (i = 0; i < Object.keys($response).length; i++)
					{
						data = $response[i]; //Dans une variable data, on met le Ième enregistrement renvoyé par l'API
						currentpost = "post"+i; //on définit la classe à donner à l'élément pour son positionnement dans la grid.
		
						
						
						postContainer = createDivIn(booksContainer, currentpost, "div", "book__element");
						postImage = createDivIn(postContainer, "image", "img", "book__element__image");
						postTexts = createDivIn(postContainer, "text-container", "div", "book__element__text-container")
						postTitle = createDivIn(postTexts, "title", "div", "book__element__title");
						postPublisher = createDivIn(postTexts, "publisher", "div", "book__element__publisher");
						postReleaseDate = createDivIn(postTexts, "date", "div", "book__element__date");					
						postContent = createDivIn(postTexts, "synopsis", "div", "book__element__synopsis");
						
						//On insère le src de la balise image
						postImage.src = data['images'][0]['url'];
						
		
						/*On insère le contenu renvoyé par l'api dans les divs apropriés.*/
						postTitle.textContent = data['title'];
						postContent.innerHTML = data['synopsis'];
						postPublisher.textContent = data['publisher'];
						postReleaseDate.textContent = data['release_date'].substring(0, 4);
						console.log(toString(data['release_date']));
					};

}

function getPostList($tag = "") {

	
	if ($tag != "")
		{
			filter =  "aw-blogposts/?tag="+$tag;
			console.log(filter);
		}
	else {
			filter =  "aw-blogposts";
		};

		fetch(strapiURL+filter)  //appel de l'api
		.then (response =>  // Si on reçoit une réponse
			{
				response.json() //On la transforme en json mais c'est toujours une promise j'ai pas compris pourquoi
				.then (response => //Donc, on refait un then
					{

						fadeContentOutIn ();
						setTimeout(function() {generateBlogPosts (response)}, 500);

						
				})
			})
}

function fadeContentOutIn (){
						
						var childrenOfMainMenu = [].slice.call(document.getElementById("main-content").children);
						childrenOfMainMenu.forEach(element => element.animate([{opacity: '1'}, {opacity: '0'}, {opacity :'0'}], 1000));
						document.getElementsByClassName("main-menu")[0].animate([{opacity: '0'}, {opacity: '0'}, {opacity :'1'}],1);
}



function generateBlogPosts ($response) {

						deleteMainContent();
						createTitle("Blog", "<i class='fas fa-feather-alt'></i>");
						getBlogPostCategories();
						postsContainer = createDivIn(document.getElementById("main-content"), "blog__posts-container", "div", "blog__posts-container");

							for (i = 0; i < Object.keys($response).length; i++)
							{
								const data = $response[i]; //Dans une variable data, on met le Ième enregistrement renvoyé par l'API
								/*currentpost = "post"+i; //on définit la classe à donner à l'élément pour son positionnement dans la grid.*/
								
								postContainer = createDivIn(postsContainer, data['id'], "div", "blog__element blog__element--"+i);

								postDateTag = createDivIn(postContainer, "date_tag", "div", "blog__element__date");
								postImage = createDivIn(postContainer, "image", "img", "blog__element__image");
								postTitle = createDivIn(postContainer, "title", "div", "blog__element__title");
								postContent = createDivIn(postContainer, "text", "div", "blog__element__synopsis");

								
								
								//On insère le src de la balise image
								postImage.src = data['images'][0]['url'];
								/*On insère le contenu renvoyé par l'api dans les divs apropriés.*/
								postTitle.textContent = data['title'];
								postContent.textContent = (data['text'].substring(0,500))+" ...";
								postDateTag.textContent = data['tag']+" / "+data['published_at'].substring(0,10);

								console.log(postContainer.id)
								
								/*postContainer.onclick = function() {;};*/

								postContainer.addEventListener("click", function() {
									/*getBlogPost(this.id)*/
									window.open('/public/pages/blogpost.html', '_self');
								});

								};


}


function getBlogPostCategories (){
	fetch(strapiURL+"aw-blogposts")  //appel de l'api
		.then (response =>  // Si on reçoit une réponse
			{
				response.json() //On la transforme en json mais c'est toujours une promise j'ai pas compris pourquoi
				.then (response => //Donc, on refait un then
					{
						
						const data = response.map($this => $this.tag); 						
						const distinctCategories = new Set(data);

						const icons = new Array();

						var obj = {tagName: 'Nouvelles', icon: "<i class='fas fa-feather-alt'></i>"};
						icons.push(obj);

						var obj = {tagName: 'Episodes', icon: "<i class='fas fa-pen-fancy'></i>"};
						icons.push(obj);

						var obj = {tagName: 'Signatures', icon: "<i class='fas fa-signature'></i>"};
						icons.push(obj);
					

						icons.forEach(element => createSideMenuItem(element));
						icons.forEach(element => createSideMenuEventListener(element));
					})

})
}



// creates one side-menu items

function createSideMenuItem ($element) {



	$currentItem = createDivIn(document.getElementById("main-content__side-menu"), "main-content__side-menu__item--"+$element['tagName'], "div", "main-content__side-menu__item main-content__side-menu__item--"+$element['tagName']);
	
	$currentItem.innerHTML = $element['icon']+"<p>"+$element['tagName']+"</p>";
}

//Create the event listener for a filter_item

function createSideMenuEventListener ($element) {

		document.getElementById("main-content__side-menu__item--"+$element['tagName']).addEventListener("click", function() {getPostList($element['tagName'])});

}

//Creates the side menu, building the containers for utltérior filling

function createTitle($contentType, $icon) {
	sectionTitle = createDivIn(document.getElementById("main-content"), "title", "div", "main-content__title-container"); // on créée le conteneur de titre
	sectionSideMEnu = createDivIn(document.getElementById("main-content"), "main-content__side-menu", "div", "main-content__side-menu");
	sectionTitle.innerHTML = "<div id ='main-content__title-container__title' class = 'main-content__title-container__title'>" // le titre
	+$icon//le logo
	+"<h2>"
	+$contentType
	+"</h2>"
	
	console.log('done creating title');
	/*<i class='fas fa-book'></i> <i class='fab fa-hotjar'></i> <i class='fas fa-signature'></i>*/

}

function scrollFunction() {

	if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) 
	{
		  document.getElementById('scrolltotop').style.display = "block";
	} else 
	{
		document.getElementById('scrolltotop').style.display = "none";
	}
}


window.onload = function(){
		scrolltotop = document.getElementById("scrolltotop");
		// When the user scrolls down 20px from the top of the document, show the button
		window.onscroll = function() {scrollFunction()};
		/*getPostList();*/

        const queryString = window.location.search;

        const urlParams = new URLSearchParams(queryString);

        const blogpostId = urlParams.get('post');

        console.log(blogpostId);

        getBlogPost (blogpostId);
			
}

// When the user clicks on the button, scroll to the top of the document

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 





document.getElementById('blog-posts').onclick = function () {
	getPostList();
    window.open('/index.html', '_self');
	document.getElementById('main-menu').classList.remove('main-menu--show');
	document.getElementById('main-menu').classList.add('main-menu--hide');
	document.getElementById('nav-expand').removeEventListener("click", hideMenu, false);
	document.getElementById('nav-expand').addEventListener("click", showMenu, false);

};

document.getElementById('book-list').onclick = function () {
	window.open('/index.html', '_self');
    getBookList();
	document.getElementById('main-menu').classList.remove('main-menu--show');
	document.getElementById('main-menu').classList.add('main-menu--hide');
	document.getElementById('nav-expand').removeEventListener("click", hideMenu, false);
	document.getElementById('nav-expand').addEventListener("click", showMenu, false);
};

document.getElementById('author').onclick = function () {
	window.open('/index.html', '_self');
    aboutContent();
	document.getElementById('main-menu').classList.remove('main-menu--show');
	document.getElementById('main-menu').classList.add('main-menu--hide');
	document.getElementById('nav-expand').removeEventListener("click", hideMenu, false);
	document.getElementById('nav-expand').addEventListener("click", showMenu, false);
	
};

function hideMenu() {
	
	document.getElementById('main-menu').classList.remove('main-menu--show');
	document.getElementById('main-menu').classList.add('main-menu--hide');
	document.getElementById('nav-expand').removeEventListener("click", hideMenu, false);
	document.getElementById('nav-expand').addEventListener("click", showMenu, false);
	
	console.log("hideMenu");
}

function showMenu() {
	
	document.getElementById('main-menu').classList.remove('main-menu--hide');
	document.getElementById('main-menu').classList.add('main-menu--show');
	document.getElementById('nav-expand').removeEventListener("click", showMenu, false);
	document.getElementById('nav-expand').addEventListener("click", hideMenu, false);

	console.log("showMenu");
}

document.getElementById('nav-expand').addEventListener("click", showMenu, false);
	  
