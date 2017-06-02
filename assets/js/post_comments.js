
var serverAddress = 'https://shrouded-ravine-70922.herokuapp.com/'
initCommentData()
queryGetPostComments()
handleCommentBtn()

function dateFormatForComment(date){
	d = date.substring(8, 10)
	m = date.substring(5, 7)
	y = date.substring(0, 4)

	switch (m) {
	  case '01': m = 'Января'; break;
	  case '02': m = 'Февраля'; break;
	  case '03': m = 'Марта'; break;
	  case '04': m = 'Апреля'; break;
	  case '05': m = 'Мая'; break;
	  case '06': m = 'Июня'; break;
	  case '07': m = 'Июля'; break;
	  case '08': m = 'Августа'; break;
	  case '09': m = 'Сентября'; break;
	  case '10': m = 'Октября'; break;
	  case '11': m = 'Ноября'; break;
	  case '12': m = 'Декабря'; break;
	}		

	res = d + ' ' + m + ' ' + y
	return res
}

function initCommentData(){
	if(localStorage.localUserId !== undefined){
		document.getElementsByName('user_id')[0].setAttribute('value', localStorage.localUserId)
	}
}

function queryGetPostComments(){
	var xhrObject = new XMLHttpRequest()
	postId = document.getElementsByName('post_id')[0].value

	xhrObject.open('GET', serverAddress + 'post_comments.json?post_id=' + postId, true)
	xhrObject.send()

	xhrObject.onload = function(){
		displayPostComments(xhrObject.responseText)
	}
	xhrObject.onerror = function(){
		console.log('Error: ' + this.status + 'method queryGetPostComments failed')
	}
}

function displayPostComments(inputCommentsString){
	comments = JSON.parse(inputCommentsString)
	if(!comments.length){return}
	console.log(comments.length)
	commentsCnt = document.getElementById('post_comments')
	res = []
	for(var i = 0; i < comments.length; i++){
		res += [
			"<li>",
				"<img src = '" + comments[i].picture_url + "'>",
				"<div class = 'comment_cnt'>",
					"<div class = 'comment_head'>",
						"<div class = 'author_name'>" + comments[i].first_name + "</div>",
						"<div class = 'comment_date'>" + dateFormatForComment(comments[i].created_at) + "</div>",
					"</div>",
					"<div class = 'comment_body'>" + comments[i].body + "</div>",
				"</div>",
			"</li>"
		].join('')
	}
	commentsCnt.innerHTML = res
}

function handleCommentBtn(){
	btn = document.getElementById('send_comment_btn')	
	btn.onclick = function(e){
		e.preventDefault()
		if (checkUserRegistration()){
			queryAddComment()
		}
	}
}

function queryAddComment(){
	var xhrObject = new XMLHttpRequest()

	xhrObject.open('POST', serverAddress + 'create_comment.json', true)
	// xhrObject.setRequestHeader('X-CSRF-Token', document.querySelector('meta[name="csrf-token"]').getAttribute('content'))

	var formData = new FormData(document.forms.comment_form)
	xhrObject.send(formData)

	xhrObject.onload = function(){
		commentsCnt = document.getElementById('post_comments')
		comment = JSON.parse(xhrObject.responseText)

		str = [
			"<li>",
				"<img src = '" + comment.picture_url + "'>",
				"<div class = 'comment_cnt'>",
					"<div class = 'comment_head'>",
						"<div class = 'author_name'>" + comment.user_id + "</div>",
						"<div class = 'comment_date'>" + dateFormatForComment(comment.created_at) + "</div>",
					"</div>",
					"<div class = 'comment_body'>" + comment.body + "</div>",
				"</div>",
			"</li>"
		].join('')

		commentsCnt.innerHTML += str
	}

	xhrObject.onerror = function(){
		console.log('Error: ' + this.status + 'method queryAddComment failed')
	}
}