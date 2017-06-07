createLocalUser()

function checkUserRegistration(){
	if( localStorage.localUserId === undefined ){
		popup = document.getElementById('popup')
		popup.style.display = 'block'
		handleClosePopupBtn(popup)
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

function createLocalUser(){
	if(window.location.href.includes('auth') && localStorage.localUserId === undefined){
		url = new URLSearchParams(window.location.search)
		localStorage.localUserId = url.get('user_id')
		localStorage.localUserEmail = url.get('email')
		localStorage.localUserPictureUrl = url.get('picture_url')
		localStorage.localUserFirstName = url.get('first_name')
		localStorage.localUserSecondName = url.get('second_name')
	}
}
