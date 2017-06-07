handleCloseNotificationBtn()

function handleCloseNotificationBtn(){
	btn = document.getElementsByClassName('notification_close_btn')[0]
	btn.onclick = function(){
		document.getElementsByClassName('notification_cnt')[0].classList.remove('active')
	}
}

function showNotificationCnt(message){
	cnt = document.getElementsByClassName('notification_cnt')[0]
	cnt.classList.add('active')
	document.querySelector('.notification_body span').innerText = message
	setTimeout(function(){
		cnt.classList.remove('active')
	}, 7000)
}
