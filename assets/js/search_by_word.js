previewSearchResults()
searchPageResults()

function searchPageResults(){
	if(window.location.href.includes('search')){
		q = getSearchQueryVariable('query')
		displaySearchResultForPage(searchPerform(q))
	}
}

function getSearchQueryVariable(variable){
  var query = window.location.search.substring(1)
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] === variable) { return decodeURIComponent(pair[1].replace(/\+/g, '%20')) }
  }
}

function previewSearchResults(){
	document.getElementById('search_input_field').addEventListener('keyup', function(){
		if(this.value.length){
			displaySearchResult(searchPerform(this.value), 5)
		} else {
			document.getElementById('search_results').innerHTML = ''
		}
	})
}

function searchPerform(search_word){
	var results = []

	for(var post in window.store){
		if(search_word !== '' && window.store[post].title.toLowerCase().includes(search_word.toLowerCase())){
			results.push({
				'url': window.store[post].url,
				'number': window.store[post].number,
				'title': window.store[post].title,
				'desc': window.store[post].desc,
				'date': window.store[post].date,
				'tags': window.store[post].tags
			})
		}
	}
	return results
}

function displaySearchResult(results, maxCount){
	var searchResults = document.getElementById('search_results')
	var appendString = ''
	if(results.length){
		for(var i = 0; i < results.length && i < maxCount; i++){
			appendString += '<li><a href = "' + results[i].url + '"><p>'+ results[i].title +'</p></a></li>'
		}
		searchResults.innerHTML = appendString
	} else {
		searchResults.innerHTML = '<b>Совпадений нет</b>'
	}
}

function displaySearchResultForPage(results){
	var searchResults = document.getElementById('result_search_el_list')
	var appendString = ''
	if(results.length){
		for(var i = 0; i < results.length; i++){
			result_el = 
   		[
   			'<a href = "' + results[i].url + '">',
   				'<li>',
   					'<img src = "./assets/img/posts/' + results[i].number + '/thumb.jpg" alt = "Some text">',
   					'<div class = "result_search_el_cnt">',
   	 					'<div class = "result_search_el_top">',
								'<div class = "result_search_el_date_cnt">',
									'<div class = "result_search_el_l_trngl"></div>',
									'<span>' + customDateFormat(results[i].date) + '</span>',								
									'<div class = "result_search_el_r_trngl"></div>',			   						
	   						'</div>',
   						'</div>',
   						'<div class = "result_search_el_bot">',
   							'<h3>' + results[i].title + '</h3>',
   							'<p>' + results[i].desc + '</p>',
   						'</div>',
   					'</div>',
   				'</li>',
    		'</a>'
   		].join('\n')

			appendString += result_el
		}
		searchResults.innerHTML = appendString
	} else {
		searchResults.innerHTML = '<b>Совпадений нет</b>'
	}
}


function customDateFormat(str){
	d = str.substring(9, 10)
	m = str.substring(6, 7)
	y = str.substring(0, 4)

	m = parseInt(m)

	switch (m) {
	  case 1: m = 'Января'; break;
	  case 2: m = 'Февраля'; break;
	  case 3: m = 'Марта'; break;
	  case 4: m = 'Апреля'; break;
	  case 5: m = 'Мая'; break;
	  case 6: m = 'Июня'; break;
	  case 7: m = 'Июля'; break;
	  case 8: m = 'Августа'; break;
	  case 9: m = 'Сентября'; break;
	  case 10: m = 'Октября'; break;
	  case 11: m = 'Ноября'; break;
	  case 12: m = 'Декабря'; break;
	}	

	result = d + ' ' + m + ' ' + y

	return result
}