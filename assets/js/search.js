// get search word

function getSearchQueryVariable(variable){
  var query = window.location.search.substring(1)
  var vars = query.split('&')

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] === variable) { return decodeURIComponent(pair[1].replace(/\+/g, '%20')) }
  }
}

function searchPerform(){
	var searchWord = getSearchQueryVariable('query')
	var results    = []

	if(searchWord){	document.getElementById('search_box').setAttribute('value', searchWord) }

	for(var post in window.store){
		if(searchWord !== '' && window.store[post].title.toLowerCase().includes(searchWord.toLowerCase())){
			results.push({
				'url': window.store[post].url,
				'title': window.store[post].title
			})
		}
	}

	return results
}

function displaySearchResult(results){
	var searchResults = document.getElementById('search_results')
	var  appendString = ''

	if(results.length){

		for(var i = 0; i < results.length; i++){
			appendString += '<li><a href = "' + results[i].url + '"><h4>'+ results[i].title +'</h4></a></li>'
		}

		searchResults.innerHTML = appendString

	} else {

		searchResults.innerHTML = '<p>No results found</p>'

	}
}

document.getElementById('search_form').addEventListener('submit', displaySearchResult(searchPerform()))
