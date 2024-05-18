(function(window, document, undefined) {

	// code that should be taken care of right away
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());

	gtag('config', 'G-5QG625RHB7');

	const toasts = new Toasts({
		offsetX: 20, // 20px
		offsetY: 20, // 20px
		gap: 20, // The gap size in pixels between toasts
		width: 300, // 300px
		timing: 'ease', // See list of available CSS transition timings
		duration: '.5s', // Transition duration
		dimOld: true, // Dim old notifications while the newest notification stays highlighted
		position: 'top-center' // top-left | top-center | top-right | bottom-left | bottom-center | bottom-right
	});

	document.addEventListener("DOMContentLoaded", function() {
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
						toasts.push({
							title: 'Success',
							content: data.message,
							style: 'success'
						});
					})
					.catch((error) => {
						toasts.push({
							title: 'Request Failed',
							content: error.message,
							style: 'error'
						});
					});
			});
		}
		var menuItems = document.querySelectorAll("#mainmenu li");

		menuItems.forEach(function(item) {
			var link = item.querySelector("a");
			console.log("loc " , link.getAttribute("href")); 
			console.log("path " , window.location.pathname); 
			if (link.getAttribute("href") === window.location.pathname) {
				item.classList.add("active"); // Add the "active" class if the href matches the current URL path
			}
		});
		hljs.highlightAll();
		VANTA.GLOBE({
			el: "#preamble",
			mouseControls: true,
			touchControls: true,
			gyroControls: false,
			minHeight: 200.00,
			minWidth: 200.00,
			scale: 1.00,
			size: 1.50,
			scaleMobile: 1.00,
			color: 0x2b04,
			color2: 0x2d6e45,
			backgroundColor: 0xffffff
		})
		codeInput.registerTemplate(
			"syntax-highlighted",
			codeInput.templates.hljs(
				hljs,
				[
					new codeInput.plugins.Autodetect(),
					new codeInput.plugins.Indent(true, 2) // 2 spaces indentation
				]
			)
		);

	});

})(window, document, undefined);
