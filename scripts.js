const strapiURL = "https://cbd-strapi.herokuapp.com/";

function createDivIn($domLocation, $divId, $tag)
{
	div = document.createElement($tag); //on crée un nouveau div
	div.setAttribute("id", $divId); //On assigne l'ID au DIV nouvellement créé
	div = $domLocation.appendChild(div); //On crée le Div en tant qu'enfant de la section "getelementbyid div1"
	return div;
}

fetch("https://cbd-strapi.herokuapp.com/aw-books")  //appel de l'api
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

				postContainer = createDivIn(document.getElementById("blogContent"), currentpost, "div");
				postContainer.setAttribute("class", "bookgrid__element bookgrid__element--"+i);
				postTitle = createDivIn(postContainer, "title", "div");
				postTitle.setAttribute("class", "bookgrid__element__title");
				postPublisher = createDivIn(postContainer, "publisher", "div");
				postPublisher.setAttribute("class", "bookgrid__element__publisher");
				postReleaseDate = createDivIn(postContainer, "date", "div");
				postReleaseDate.setAttribute("class", "bookgrid__element__date");
				postImage = createDivIn(postContainer, "image", "img");
				postImage.setAttribute("class", "bookgrid__element__image");
				postContent = createDivIn(postContainer, "synopsis", "div");
				postContent.setAttribute("class", "bookgrid__element__synopsis");
				
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

	  
