function validationsForCommentBody(){
	str = document.getElementsByName('comment_body')[0].value

	message = checkEmptyCommentBodyField(str) ? 'Комментарий не может быть пустым' :
						checkMaxLengthCommentBodyField(str) ? 'Максимальная длина комментария 1000 символов' : ''

	if(message){
		showNotificationCnt(message)
		return false
	}
	return true
}

function checkEmptyCommentBodyField(str){
	if(str.length !== 0){
		return false
	} else {
		return true
	}
}

function checkMaxLengthCommentBodyField(str){
	console.log(str.length)
	if(str.length < 1000){
		return false
	} else {
		return true
	}
}
