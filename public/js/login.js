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

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);