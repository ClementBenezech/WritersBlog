function createDivIn($domLocation, $divId, $tag, $class)
		{
			div = document.createElement($tag); //on crée un nouveau div
			div.setAttribute("id", $divId); //On assigne l'ID au DIV nouvellement créé
			div.setAttribute("class", $class); //On assigne sa classe au DIV nouvellement créé
			div = $domLocation.appendChild(div); //On crée le Div en tant qu'enfant de la section "getelementbyid div1"
			return div;
		}


function getBookList()
{

	previousContent = document.getElementById("main-content");
	previousContent.textContent = "";
	sectionTitle = createDivIn(document.getElementById("main-content"), "title", "div", "main-content__title");
	sectionTitle.innerHTML = "<h2>Bibliographie</h2>";

		fetch("https://cbd-strapi.herokuapp.com/aw-books?_sort=release_date:ASC")  //appel de l'api
		.then (response =>  // Si on reçoit une réponse
			{
				response.json() //On la transforme en json mais c'est toujours une promise j'ai pas compris pourquoi
				.then (response => //Donc, on refait un then
					{
					/*console.log("contenu de response: "+response);*/
		
					for (i = 0; i < Object.keys(response).length; i++)
					{
						data = response[i]; //Dans une variable data, on met le Ième enregistrement renvoyé par l'API
						currentpost = "post"+i; //on définit la classe à donner à l'élément pour son positionnement dans la grid.
		
						postContainer = createDivIn(document.getElementById("main-content"), currentpost, "div", "book__element book__element--"+i);
						postImage = createDivIn(postContainer, "image", "img", "book__element__image");
						postTexts = createDivIn(postContainer, "text-container", "div", "book__element__text-container")
						/*postLinks = createDivIn(postContainer, "link-container", "div", "book__element__link-container")*/
						postTitle = createDivIn(postTexts, "title", "div", "book__element__title");
						postPublisher = createDivIn(postTexts, "publisher", "div", "book__element__publisher");
						postReleaseDate = createDivIn(postTexts, "date", "div", "book__element__date");
						
						postContent = createDivIn(postTexts, "synopsis", "div", "book__element__synopsis");
						
						//On insère le src de la balise image
						postImage.src = data['images'][0]['url'];
						
		
						/*On insère le contenu renvoyé par l'api dans les divs apropriés.*/
						postTitle.textContent = data['title'];
						postContent.textContent = data['synopsis'];
						postPublisher.textContent = data['publisher'];
						postReleaseDate.textContent = data['release_date'].substring(0, 4);
						console.log(toString(data['release_date']));
					};
				})
			})

}

function getPostList() {
	previousContent = document.getElementById("main-content");
		previousContent.textContent = "";
		sectionTitle = createDivIn(document.getElementById("main-content"), "title", "div", "main-content__title");
		sectionTitle.innerHTML = "<h2>Blog</h2>";
		
		

						fetch("https://cbd-strapi.herokuapp.com/aw-blogposts")  //appel de l'api
						.then (response =>  // Si on reçoit une réponse
							{
								response.json() //On la transforme en json mais c'est toujours une promise j'ai pas compris pourquoi
								.then (response => //Donc, on refait un then
									{

										
									/*console.log("contenu de response: "+response);*/
									for (i = 0; i < Object.keys(response).length; i++)
									{
										data = response[i]; //Dans une variable data, on met le Ième enregistrement renvoyé par l'API
										currentpost = "post"+i; //on définit la classe à donner à l'élément pour son positionnement dans la grid.
										console.log(data);
										postContainer = createDivIn(document.getElementById("main-content"), currentpost, "div", "blog__element blog__element--"+i);
										postDateTag = createDivIn(postContainer, "date_tag", "div", "blog__element__date");
										postImage = createDivIn(postContainer, "image", "img", "blog__element__image");
										/*postTexts = createDivIn(postContainer, "text-container", "div", "blog__element__text-container")*/
										/*postLinks = createDivIn(postContainer, "link-container", "div", "blog__element__link-container")*/
										postTitle = createDivIn(postContainer, "title", "div", "blog__element__title");
										/*postPublisher = createDivIn(postContainer, "tag", "div", "blog__element__publisher");*/
										/*postReleaseDate = createDivIn(postContainer, "date", "div", "blog__element__date");*/
										
										postContent = createDivIn(postContainer, "text", "div", "blog__element__synopsis");
										
										//On insère le src de la balise image
										postImage.src = data['images'][0]['url'];
										

										/*On insère le contenu renvoyé par l'api dans les divs apropriés.*/
										postTitle.textContent = data['title'];
										console.log(data['text'].substring(0,10));
										postContent.textContent = (data['text'].substring(0,500))+" ...";
										/*postPublisher.textContent = data['tag'];*/
										postDateTag.textContent = data['tag']+" / "+data['published_at'].substring(0,10);
										console.log(data['published_at'].substring(0,10));
									};
								})
							})
}

function aboutContent (){
		previousContent = document.getElementById("main-content");
		previousContent.textContent = "";
		sectionTitle = createDivIn(document.getElementById("main-content"), "title", "div", "main-content__title");
		sectionTitle.innerHTML = "<h2>A propos de l'auteure</h2>";

		postContainer = createDivIn(document.getElementById("main-content"), "authorContainer", "div", "author__container");
		postContainer.innerHTML= "<img src='public/images/AW_profile.jpg'><p>Anne Waddington, auteure prolifique, partage son temps entre Toulouse et les Monts de Lacaune. Elle aime revisiter l'Histoire et mettre en lumière, tant dans ses romans que dans ses thrillers, des éléments du passé dont les manuels évitent de parler . Son style enlevé, la justesse de ses personnages et sa façon de distiller le suspens vous emportent jusqu'à des dénouements saisissants et inattendus. Anciennement psychologue et thérapeute familial, la retraite lui permet de se consacrer à l'écriture et au théâtre.</p>";
}


const strapiURL = "https://cbd-strapi.herokuapp.com/";

window.onload = function(){
	getPostList();
}

document.getElementById('blog-posts').onclick = function () {
	getPostList();
};

document.getElementById('book-list').onclick = function () {
	getBookList();
};

document.getElementById('author').onclick = function () {
	aboutContent();
}
	  
