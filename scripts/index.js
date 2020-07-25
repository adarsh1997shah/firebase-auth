const guides = document.querySelector( '.guides' );
const loggedInLinks = document.querySelectorAll( '.logged-in' );
const loggedOutLinks = document.querySelectorAll( '.logged-out' );
const accountDetails = document.querySelector( '.account-details' );


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

		snapshot.forEach( doc => {

			let guide = doc.data();

			guides.innerHTML += 
				`<li>
					<div class="collapsible-header grey lighten-4">${guide.title}</div>
					<div class="collapsible-body white">${guide.content}</div>
				</li>`;
		} );
	} else {
		guides.innerHTML = `<li><h4 class="center">Login to view Guides<h4></li>`;
	}
}



// Setting up links render on login and logout.
function renderLinks( user ) {

	// If user is logged in.
	if( user ) {

		db.collection( 'users' ).doc( user.uid ).get().then( ( doc ) => {

			// Showing account details.
			accountDetails.innerHTML = `
				<h5>Logged in as ${user.email}.</h5>
				<h6>${doc.data().bio}<h6>
			`;
		} );

		loggedInLinks.forEach( link => link.style.display = 'block' );
		loggedOutLinks.forEach( link => link.style.display = 'none' );

	} else {

		// Hiding account details.
		accountDetails.innerHTML = '';

		loggedInLinks.forEach( link => link.style.display = 'none' );
		loggedOutLinks.forEach( link => link.style.display = 'block' );
	}
}