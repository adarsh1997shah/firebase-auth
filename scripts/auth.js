const signupForm = document.getElementById( 'signup-form' );
const preloader = document.querySelector( '.preloader-background' );
const logout = document.getElementById( 'logout' );
const loginForm = document.getElementById( 'login-form' );
const addGuide = document.getElementById( 'create-form' );


// Sign-up callback.
function signupSubmit( e ) {
	e.preventDefault();

	// Get user info.
	const signupEmail = this.signupemail.value;
	const signupPassword = this.signuppassword.value;
	const signupBio = this.signupbio.value;

	// Activate preloader.
	preloader.classList.add( 'active' );

	// Sign up the user.
	auth.createUserWithEmailAndPassword( signupEmail, signupPassword ).then( credential => {

		// Adding bio in firestore with same user id and document id.
		return db.collection( 'users' ).doc( credential.user.uid ).set( {
			bio: signupBio,
		} );

	} ).then( () => {

		// Closing preloader.
		preloader.classList.remove( 'active' );

		// Closing the modal after singing up.
		const modal = document.getElementById( 'modal-signup' );
		M.Modal.getInstance( modal ).close();

		// Reset the form value.
		signupForm.reset();

	} ).catch( err => {
		// Closing preloader.
		preloader.classList.remove( 'active' );

		// Reset the form value.
		signupForm.reset();

		console.log( 'Opps you got an error!', err.message );
	} );
}


// Logout callback.
function handleLogout( e ) {
	e.preventDefault();

	// Activate preloader.
	preloader.classList.add( 'active' );

	auth.signOut().then( () => {

		// Closing preloader.
		preloader.classList.remove( 'active' );

	} ).catch( err => {
		console.log( 'Error message' + err.message );
	} );
}


// Login callback.
function loginSubmit( e ) {
	e.preventDefault();

	// Get user info.
	const loginEmail = this.loginemail.value;
	const loginPassword = this.loginpassword.value;


	// Activate preloader.
	preloader.classList.add( 'active' );


	// log in the user.
	auth.signInWithEmailAndPassword( loginEmail, loginPassword ).then( credential => {

		// Closing preloader.
		preloader.classList.remove( 'active' );

		// Closing the modal after login up.
		const modal = document.getElementById( 'modal-login' );
		M.Modal.getInstance( modal ).close();

		// Reset the form value.
		loginForm.reset();

	} ).catch( err => {
		// Closing preloader.
		preloader.classList.remove( 'active' );

		// Reset the form value.
		loginForm.reset();

		console.log( 'Opps you got an error!', err.message );
	} );
}


// Listen for auth status.
auth.onAuthStateChanged( user => {

	if( user ) {
		console.log( 'user has logged in', user );

		// Activate preloader.
		preloader.classList.add( 'active' );

		renderLinks( user );

		// Getting data from firestore.
		db.collection( 'guides' ).onSnapshot( ( snapshot ) => {

			// Closing preloader.
			preloader.classList.remove( 'active' );

			renderGuide( snapshot.docs );

		}, ( err ) => {
			console.log( 'Opps you have an error: ' + err.message );
		} );
	} else {

		// Closing preloader.
		preloader.classList.remove( 'active' );

		renderGuide();
		renderLinks();
		console.log( 'user logged out' );
	}
} );


// Create guide callback function.
function createGuide( e ) {
	e.preventDefault();

	// Getting form data.
	const guidetitle = this.guidetitle.value;
	const guidecontent = this.guidecontent.value;

	// Making sure form is not empty.
	if( guidetitle != '' && guidecontent != '' ) {

		// Activate preloader.
		preloader.classList.add( 'active' );

		db.collection( 'guides' ).add( {
			title: guidetitle,
			content: guidecontent,

		} ).then( () => {
			// Closing preloader.
			preloader.classList.remove( 'active' );

			// Closing the modal after login up.
			const modal = document.getElementById( 'modal-create' );
			M.Modal.getInstance( modal ).close();

			// Reset the form value.
			addGuide.reset();

		} ).catch( err => {
			console.log( 'Opps you have an error: ' + err.message );
		} );
	} else {
		alert( 'Either of the two forms is empty!' );
	}
}



// Listen for sign-up form submit.
signupForm.addEventListener( 'submit', signupSubmit );

// Listen for logout button.
logout.addEventListener( 'click', handleLogout );

// Listen for log-in form submit.
loginForm.addEventListener( 'submit', loginSubmit );

// Add guide in db.
addGuide.addEventListener( 'submit', createGuide );