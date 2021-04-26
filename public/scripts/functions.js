function createDivIn($domLocation, $divId, $tag, $class)
{
	div = document.createElement($tag); //on crée un nouveau div
	div.setAttribute("id", $divId); //On assigne l'ID au DIV nouvellement créé
	div.setAttribute("class", $class); //On assigne sa classe au DIV nouvellement créé
	div = $domLocation.appendChild(div); //On crée le Div en tant qu'enfant de la section "getelementbyid div1"
	return div;
}