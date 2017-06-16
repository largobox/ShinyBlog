var serverAddress = 'https://shrouded-ravine-70922.herokuapp.com/'

activeHeaderMenuElement()
sendPostsIdsForCurrentPage()


function activeHeaderMenuElement(){

	currentUrl = window.location.pathname
	console.log(currentUrl)
	if (currentUrl === '/'){ document.getElementById('blog_root').className += 'active'}
	if (currentUrl === '/about'){ document.getElementById('about_root').className += 'active'}
}


function sendPostsIdsForCurrentPage(){
	posts = document.querySelectorAll('[data-post-id]')
	postsIds = []

	for(var i = 0 ; i < posts.length ; i++){
		postsIds.push(posts[i].dataset.postId)
	}

	queryPostDataForCurrentPage(postsIds)
}


function queryPostDataForCurrentPage(postsIds){
	var xhrObject = new XMLHttpRequest()
	xhrObject.open('POST', serverAddress + 'posts_info.json', true)

	arr = postsIds
	res = JSON.stringify(arr)

	var formData = new FormData()
	formData.append('posts_ids', res)
	xhrObject.send(formData)

	xhrObject.onload = function(){
		handlePostDataForCurrentPage(postsIds, JSON.parse(xhrObject.responseText))
	}

	xhrObject.onerror = function(){
		console.log('Error: ' + this.status + ' method getPostsInfo failed')
	}
}


function handlePostDataForCurrentPage(postsIds, postsDataFromServer){
	res = []
	existIds = postsDataFromServer.map(function(item){
		return item['uid']
	})

	for(var i = 0 ; i < postsIds.length ; i++){
		if(existIds.includes(postsIds[i])){

			post = postsDataFromServer.filter(function(item){ 
				return item['uid'] === postsIds[i] 
			})[0]

			viewsCount = post.views_count
			commetsCount = post.comments_count

			res.push({
				id: postsIds[i],
				viewCount: viewsCount,
				commentCount: commetsCount
			})
		} else {
			res.push({
				id: postsIds[i],
				viewCount: 0,
				commentCount: 0
			})
		}
	}
	displayPostDataForCurrentPage(res)
}


function displayPostDataForCurrentPage(finalPostArr){
	posts = document.querySelectorAll('[data-post-id]')

	for(var i = 0 ; i < posts.length ; i++){
		postId = posts[i].dataset.postId
		post = finalPostArr.filter(function(obj){ return obj.id === postId })[0]

		pairCommentView = posts[i].querySelectorAll('.posts_el_info_cnt li')
		commentCnt = pairCommentView[0].querySelector('span').innerText = post.commentCount
		viewCnt = pairCommentView[1].querySelector('span').innerText = post.viewCount
	}
}