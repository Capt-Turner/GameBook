const loginFormHandler = async (event) => {
    event.preventDefault();

    const email=document.querySelector('#email-login').value.trim();
    const pw=document.querySelector('#password-login').value.trim();

    if (email && pw) {
        const res= await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({email, pw}),
            headers: {'Content-Type': 'application/json'},
        });
        if (res.ok) {
            document.location.replace('/');
        } else {
            alert('Failure to login')
        }
    }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);