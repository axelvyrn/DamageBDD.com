(function(window, document, undefined) {

	// code that should be taken care of right away
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());

	gtag('config', 'G-5QG625RHB7');

	window.onload = init;

	function init(){
		// the code to be called when the dom has loaded
		// #document has its nodes


		var kycForm = document.getElementById('kycForm');
		if (kycForm){
			kycForm.addEventListener('submit', function(event) {
				event.preventDefault(); // Prevent default form submission

				const formData = new FormData(this);
				const jsonData = Object.fromEntries(formData.entries());

				fetch('/accounts/create', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						// Include CSRF Token if necessary
						'CSRF-Token': formData.get('csrf_token') 
					},
					body: JSON.stringify(jsonData)
				})
					.then(response => response.json())
					.then(data => {
						console.log('Success:', data);
					})
					.catch((error) => {
						console.error('Error:', error);
					});
			});
		}

	}
	document.addEventListener("DOMContentLoaded", function() {
		var menuItems = document.querySelectorAll("#mainmenu li");

		menuItems.forEach(function(item) {
			var link = item.querySelector("a");
			console.log("loc " , link.getAttribute("href")); 
			console.log("path " , window.location.pathname); 
			if (link.getAttribute("href") === window.location.pathname) {
				item.classList.add("active"); // Add the "active" class if the href matches the current URL path
			}
		});
	});

})(window, document, undefined);
