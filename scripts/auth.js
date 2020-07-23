// Sign-up.
const signupForm = document.getElementById( 'signup-form' );
const preloader = document.querySelector( '.preloader-background' );


// Sign-up callback.
function signupSubmit( e ) {
	e.preventDefault();

	// Get user info.
	const signupEmail = this.signupemail.value;
	const signupPassword = this.signuppassword.value;

	// Activate preloader.
	preloader.classList.add( 'active' );

	// Sign up the user.
	auth.createUserWithEmailAndPassword( signupEmail, signupPassword ).then( credential => {
		
		// Closing preloader.
		preloader.classList.remove( 'active' );

		// Closing the modal after singing up.
		const modal = document.getElementById( 'modal-signup' );
		M.Modal.getInstance( modal ).close();

		// Reset the form value.
		signupForm.reset();
	} ).catch( err => {
		console.log( 'Opps you got an error!', err.message );
	} );
}

// Listen for form submit.
signupForm.addEventListener( 'submit', signupSubmit );