const loginFormHandler = async (event) => {
    event.preventDefault();
    console.log("logging in");

    const email=document.querySelector('#email-login').value.trim();
    const pw=document.querySelector('#password-login').value.trim();

    if (email && pw) {
        console.log("posting");
        const response= await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({email, pw}),
            headers: {'Content-Type': 'application/json'},
        });
        if (response.ok) {
            console.log("responding");
            document.location.replace('/homepage');
        } else {
            alert('Failure to login')
        }
    }
};
const signupFormHandler = async (event) => {
    event.preventDefault();
    console.log("signing up");
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const pw = document.querySelector('#password-signup').value.trim();
  
    if (email && pw) {
      console.log("fetching");
        const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, pw }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        console.log("responding");
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  };

document.querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

document.querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler)  


  