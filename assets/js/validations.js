function validationsForUserForm(){
	name = document.getElementsByName('first_name')[0].value
	email = document.getElementsByName('email')[0].value
	password = document.getElementsByName('password')[0].value
	message = checkEmpty(name) ? 'Заполните пожалуйста поле Имя' :
						checkEmpty(email) ? 'Заполните пожалуйста поле Email' :
						checkEmailFormat(email) ? 'Поле Email заполнено неправильно' :
						checkEmpty(password) ? 'Заполните пожалуйста поле Пароль' :
						checkMaxLengthPassword(password) ? 'Длина пароля должна быть ни меньше 6 символов' : ''

	if(message){
		showNotificationCnt(message, 'error')
		return false
	}
	return true
}


function validationsForCommentBody(){
	comment_body = document.getElementsByName('comment_body')[0].value
	message = checkEmpty(comment_body) ? 'Комментарий не может быть пустым' :
						checkMaxLengthCommentBodyField(comment_body) ? 'Максимальная длина комментария 1000 символов' : ''

	if(message){
		showNotificationCnt(message, 'error')
		return false
	}
	return true
}


function checkEmpty(str){
	if(str.length !== 0){
		return false
	} else {
		return true
	}
}


function checkMaxLengthCommentBodyField(str){
	if(str.length < 1000){
		return false
	} else {
		return true
	}
}


function checkMaxLengthPassword(str){
	if(str.length >= 6){
		return false
	} else {
		return true
	}
}


function checkEmailFormat(str){
	pattern = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
	if(pattern.test(str)){
		return false
	} else {
		return true
	}
}