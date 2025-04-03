// Loading code

window.onload = navigate('home');


// Global variables

var currentlyselected="home";

var enlargedImageShown=false;


// this could be refactored to remove all the duplicated code inside the switch statement

function navigate(where) {
		
	if (where == currentlyselected) {
		where = "none";
		}
	
	//scroll to the top
    document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

	switch (where) {
		case "home":
			//hide everything but "default" content
			
			document.getElementById("homenav").className = "nav-text-clicked";
			document.getElementById("graphicsnav").className = "nav-text";
			document.getElementById("codenav").className = "nav-text";
			document.getElementById("layoutnav").className = "nav-text";
			document.getElementById("writingnav").className = "nav-text";
			document.getElementById("audionav").className = "nav-text";
			document.getElementById("motionnav").className = "nav-text";

			document.getElementById("default-content").className = "content";
			document.getElementById("graphics-content").className = "content-hidden";
			document.getElementById("code-content").className = "content-hidden";
			document.getElementById("layout-content").className = "content-hidden";
			document.getElementById("writing-content").className = "content-hidden";
			document.getElementById("audio-content").className = "content-hidden";
			document.getElementById("motion-content").className = "content-hidden";
			
			currentlyselected = "none";
			
			break;
			
		case "graphics":
			//hide everything but "graphics" page, adjust buttons

			document.getElementById("homenav").className = "nav-text";
			document.getElementById("graphicsnav").className = "nav-text-clicked";
			document.getElementById("codenav").className = "nav-text";
			document.getElementById("layoutnav").className = "nav-text";
			document.getElementById("writingnav").className = "nav-text";
			document.getElementById("audionav").className = "nav-text";
			document.getElementById("motionnav").className = "nav-text";
			
			document.getElementById("default-content").className = "content-hidden";
			document.getElementById("graphics-content").className = "content";
			document.getElementById("code-content").className = "content-hidden";
			document.getElementById("layout-content").className = "content-hidden";
			document.getElementById("writing-content").className = "content-hidden";
			document.getElementById("audio-content").className = "content-hidden";
			document.getElementById("motion-content").className = "content-hidden";
			
			currentlyselected = "graphics";

			break;
			
		case "code":
			//hide everything but show "code-content" page, adjust buttons

			document.getElementById("homenav").className = "nav-text";
			document.getElementById("graphicsnav").className = "nav-text";
			document.getElementById("codenav").className = "nav-text-clicked";
			document.getElementById("layoutnav").className = "nav-text";
			document.getElementById("writingnav").className = "nav-text";
			document.getElementById("audionav").className = "nav-text";
			document.getElementById("motionnav").className = "nav-text";

			document.getElementById("default-content").className = "content-hidden";
			document.getElementById("graphics-content").className = "content-hidden";
			document.getElementById("code-content").className = "content";
			document.getElementById("layout-content").className = "content-hidden";
			document.getElementById("writing-content").className = "content-hidden";
			document.getElementById("audio-content").className = "content-hidden";
			document.getElementById("motion-content").className = "content-hidden";
			
			currentlyselected = "code";
			
			break;
			
		case "layout":
			//hide everything but show "layout-content" page
			
			document.getElementById("homenav").className = "nav-text";
			document.getElementById("graphicsnav").className = "nav-text";
			document.getElementById("codenav").className = "nav-text";
			document.getElementById("layoutnav").className = "nav-text-clicked";
			document.getElementById("writingnav").className = "nav-text";
			document.getElementById("audionav").className = "nav-text";
			document.getElementById("motionnav").className = "nav-text";

			document.getElementById("default-content").className = "content-hidden";
			document.getElementById("graphics-content").className = "content-hidden";
			document.getElementById("code-content").className = "content-hidden";
			document.getElementById("layout-content").className = "content";
			document.getElementById("writing-content").className = "content-hidden";
			document.getElementById("audio-content").className = "content-hidden";
			document.getElementById("motion-content").className = "content-hidden";
			
			currentlyselected = "layout";

			break;

		case "writing":
			//hide everything but show "writing-content" page, adjust buttons

			document.getElementById("homenav").className = "nav-text";
			document.getElementById("graphicsnav").className = "nav-text";
			document.getElementById("codenav").className = "nav-text";
			document.getElementById("layoutnav").className = "nav-text";
			document.getElementById("writingnav").className = "nav-text-clicked";
			document.getElementById("audionav").className = "nav-text";
			document.getElementById("motionnav").className = "nav-text";

			document.getElementById("default-content").className = "content-hidden";
			document.getElementById("graphics-content").className = "content-hidden";
			document.getElementById("code-content").className = "content-hidden";
			document.getElementById("layout-content").className = "content-hidden";
			document.getElementById("writing-content").className = "content";
			document.getElementById("audio-content").className = "content-hidden";
			document.getElementById("motion-content").className = "content-hidden";
			
			currentlyselected = "writing";

			break;

		case "audio":
			//hide everything but show "audio-content" page, adjust buttons

			document.getElementById("homenav").className = "nav-text";
			document.getElementById("graphicsnav").className = "nav-text";
			document.getElementById("codenav").className = "nav-text";
			document.getElementById("layoutnav").className = "nav-text";
			document.getElementById("writingnav").className = "nav-text";
			document.getElementById("audionav").className = "nav-text-clicked";
			document.getElementById("motionnav").className = "nav-text";
			
			document.getElementById("default-content").className = "content-hidden";
			document.getElementById("graphics-content").className = "content-hidden";
			document.getElementById("code-content").className = "content-hidden";
			document.getElementById("layout-content").className = "content-hidden";
			document.getElementById("writing-content").className = "content-hidden";
			document.getElementById("audio-content").className = "content";
			document.getElementById("motion-content").className = "content-hidden";
			
			currentlyselected = "audio";

			break;

		case "motion":
			//hide everything but show "motion-content" page, adjust buttons

			document.getElementById("homenav").className = "nav-text";
			document.getElementById("graphicsnav").className = "nav-text";
			document.getElementById("codenav").className = "nav-text";
			document.getElementById("layoutnav").className = "nav-text";
			document.getElementById("writingnav").className = "nav-text";
			document.getElementById("audionav").className = "nav-text";
			document.getElementById("motionnav").className = "nav-text-clicked";
			
			document.getElementById("default-content").className = "content-hidden";
			document.getElementById("graphics-content").className = "content-hidden";
			document.getElementById("code-content").className = "content-hidden";
			document.getElementById("layout-content").className = "content-hidden";
			document.getElementById("writing-content").className = "content-hidden";
			document.getElementById("audio-content").className = "content-hidden";
			document.getElementById("motion-content").className = "content";
			
			currentlyselected = "motion";

			break;
		}
	
	}
	
	
	
// Two functions for showing a full-window image when it's clicked on
// adds a close box to indicate clicking on the close box will close it
// clicking anywhere in the image closes it.
// we capture clicks to the image and the closebox separately, but they all go here
	
function closeImage() {
	if (enlargedImageShown == true) {
		document.getElementById("paneClose").style.display = "none";
		document.getElementById("pane").style.display = "none";
		enlargedImageShown = false;
		}
	}


// Hello, this is Bing. I can help you with rewriting your javascript code.😊
// Here is a possible way to rewrite your function to show a full-screen image that can be either square or rectangular, landscape or portrait, and have a close box in the upper right corner with some margin:

function initModal() {
  // Get the modal container
  var modalContainer = document.getElementById("myModal");

  // Get the images and insert them inside the modal
  var img = document.querySelectorAll('#pane');
  var modalImg = document.createElement("img");
  var captionText = document.createElement("alt");
  modalImg.className = "modal-content";
  captionText.className = "modal-caption";

  for (var i = 0; i < img.length; i++) {
	img[i].onclick = function () {
	  modalContainer.style.display = "block";
	  modalImg.src = this.getAttribute("src") || "default-image.jpg";
	  captionText.innerHTML = this.getAttribute("alt");
	  modalContainer.appendChild(modalImg);
	  modalContainer.appendChild(captionText);
	};
  }

  // Get the close button
  var closeButton = document.createElement("span");
  closeButton.className = "close";
  closeButton.innerHTML = "&times;";
  closeButton.onclick = function () {
	modalContainer.style.display = "none";
	modalContainer.removeChild(modalImg);
	modalContainer.removeChild(captionText);
  };
  modalContainer.appendChild(closeButton);
}

// Call the initModal function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initModal);


function showLargerImageDUD(image) {
}

function showLargerImageDUD(image) {
  var myImage = document.getElementById("pane");
  var paneClose = document.getElementById("paneClose");
  var imgFrame = document.getElementById("imgFrame");

  myImage.src = image;

  function setCenter(whichDiv) {
	var newX = (window.innerWidth - whichDiv.clientWidth) / 2;
	var newY = (window.innerHeight - whichDiv.clientHeight) / 2;
	whichDiv.style.left = newX + "px";
	whichDiv.style.top = newY + "px";
  }

  if (enlargedImageShown) {
	myImage.style.display = "none";
	myImage.style.zIndex = "-10";
	paneClose.style.display = "none";
	paneClose.style.zIndex = "-10";
	imgFrame.style.display = "none";
	imgFrame.style.zIndex = "-10";
	enlargedImageShown = false;
  } else {
	myImage.style.display = "block";
	myImage.style.zIndex = "10";
	imgFrame.style.display = "block";
	imgFrame.style.zIndex = "10";
	paneClose.style.display = "block";
	paneClose.style.zIndex = "10";
	setCenter(imgFrame);

	// Add an event listener to update the position of the imgFrame when the window is resized
	window.addEventListener('resize', function() {
	  setCenter(imgFrame);
	});

	enlargedImageShown = true;
  }
}



// On the page, the original file is shrunk down to 350px wide so it fits in the column
// But when the user clicks on an image, we show the full-sized image (up to about 90% of the window size, defined in the css)
// This is a toggle, based on a global variable. If it's shown, we close it. If it's not shown, we show it.
	
function showLargerImageOLD(image) {

	myImage = document.getElementById("pane");
		
	myImage.src = image;

	if (enlargedImageShown) {
		myImage.style.display = "none";
		myImage.style.zIndex = "-10";
		document.getElementById("paneClose").style.display = "none";
		document.getElementById("paneClose").style.zIndex = "-10";
		document.getElementById("pane").style.display = "none";
		document.getElementById("pane").style.zIndex = "-10";
		document.getElementById("imgFrame").style.display = "none";
		document.getElementById("imgFrame").style.zIndex = "-10";
		enlargedImageShown = false;
		} else {
			myImage.style.display = "block";
			myImage.style.zIndex = "10";
			document.getElementById("pane").style.display = "block";
			document.getElementById("pane").style.zIndex = "10";
			document.getElementById("paneClose").style.display = "block";
			document.getElementById("paneClose").style.zIndex = "10";
			document.getElementById("imgFrame").style.display = "block";
			document.getElementById("imgFrame").style.zIndex = "10";
			enlargedImageShown = true;
		}
	}
