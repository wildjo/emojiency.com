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
	
// On the page, the original file is shrunk down to 350px wide so it fits in the column
// But when the user clicks on an image, we show the full-sized image (up to about 90% of the window size, defined in the css)
// This is a toggle, based on a global variable. If it's shown, we close it. If it's not shown, we show it.
	
function showLargerImage(image) {

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
