handleCloseNotificationBtn()


function handleCloseNotificationBtn(){
	btn = document.getElementsByClassName('notification_close_btn')[0]
	btn.onclick = function(){
		document.getElementsByClassName('notification_cnt')[0].classList.remove('active')
	}
}


function showNotificationCnt(message, status){
	cnt = document.getElementsByClassName('notification_cnt')[0]
	cnt.classList.remove('success')
	cnt.classList.remove('error')
	statusClassName = ''

	switch (status) {
	  case 'error': statusClassName = 'error'; break;
	  case 'success': statusClassName = 'success'; break;
	}

	cnt.classList.add(statusClassName)
	cnt.classList.add('active')

	document.querySelector('.notification_body span').innerText = message
	setTimeout(function(){
		cnt.classList.remove('active')
	}, 7000)
}
