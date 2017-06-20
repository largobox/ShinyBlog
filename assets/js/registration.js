createLocalUserBySocials()

function checkUserRegistration(){
	if( localStorage.localUserId === undefined ){
		popup = document.getElementById('popup')
		popup.style.display = 'block'
		generateSocialLinks()
		handleClosePopupBtn(popup)
		handleUserFormSendingBtn()
	} else {
		return true
	}
}


function handleClosePopupBtn(popup){
	btn = document.getElementById('close_popup_btn')
	btn.onclick = function(){
		popup.style.display = 'none'
	}
}


function handleUserFormSendingBtn(){
	btn = document.getElementById('send_user_form_btn')	
	btn.onclick = function(e){
		e.preventDefault()
		if(validationsForUserForm()){
			queryCreateUser()
		}
	}
}


function queryCreateUser(){
	var xhrObject = new XMLHttpRequest()
	xhrObject.open('POST', serverAddress + 'standart_auth.json', true)
	xhrObject.setRequestHeader('X-CSRF-Token', '')

	var formData = new FormData(document.forms.registration_form)
	xhrObject.send(formData)

	xhrObject.onload = function(){
		user = JSON.parse(xhrObject.responseText)
		createLocalUser(user)
	}

	xhrObject.onerror = function(){
		console.log('Error: ' + this.status + 'method queryCreateUser failed')
	}	
}


function createLocalUser(user){
	localStorage.localUserId = user.id
	localStorage.localUserEmail = user.email
	localStorage.localUserPictureUrl = user.picture_url
	localStorage.localUserFirstName = user.first_name

	popup = document.getElementById('popup')
	popup.style.display = 'none'

	initCommentData()
	showNotificationCnt('Вы были зарегистрированы', 'success')
}


// SOCIALS


function generateSocialLinks(){
	socialsLinks = document.querySelectorAll('#social_links_cnt a')
	returnUrl = socialsLinks[0].baseURI
	for(var i = 0 ; i < socialsLinks.length ; i++){
		socialsLinks[i].href += '?return_url=' + returnUrl
	}
}


function createLocalUserBySocials(){
	if(window.location.href.includes('auth') && localStorage.localUserId === undefined){
		url = new URLSearchParams(window.location.search)
		localStorage.localUserId = url.get('user_id')
		localStorage.localUserEmail = url.get('email')
		localStorage.localUserPictureUrl = url.get('picture_url')
		localStorage.localUserFirstName = url.get('first_name')
		localStorage.localUserSecondName = url.get('second_name')

		initCommentData()
		showNotificationCnt('Вы были зарегистрированы', 'success')
	}
}