const guides = document.querySelector( '.guides' );
const loggedInLinks = document.querySelectorAll( '.logged-in' );
const loggedOutLinks = document.querySelectorAll( '.logged-out' );


// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

	var modals = document.querySelectorAll('.modal');
	M.Modal.init(modals);
  
	var items = document.querySelectorAll('.collapsible');
	M.Collapsible.init(items);

	// Activate preloader.
	preloader.classList.add( 'active' );
  
});

// Rendering the guides.
function renderGuide( snapshot ) {

	guides.innerHTML = '';

	if( snapshot ) {

		snapshot.docChanges().forEach( change => {

			if( change.type === 'added' ) {
				let guide = change.doc.data();

				guides.innerHTML += 
					`<li>
						<div class="collapsible-header grey lighten-4">${guide.title}</div>
						<div class="collapsible-body white">${guide.content}</div>
					</li>`;
			}
		} );
	} else {
		guides.innerHTML = `<li><h4 class="center">Login to view Guides<h4></li>`;
	}
}



// Setting up links render on login and logout.
function renderLinks( user ) {

	// If user is logged in.
	if( user ) {

		loggedInLinks.forEach( link => link.style.display = 'block' );
		loggedOutLinks.forEach( link => link.style.display = 'none' );

	} else {

		loggedInLinks.forEach( link => link.style.display = 'none' );
		loggedOutLinks.forEach( link => link.style.display = 'block' );
	}
}