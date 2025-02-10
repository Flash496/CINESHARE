
async function handleLogin(email, password) {
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            // Store both token and username
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            localStorage.setItem('userId', data.userId);
            window.location.href = 'home.html';
        } else {
            displayError('login-form', data.message);
        }
    } catch (error) {
        displayError('login-form', 'Server error. Please try again.');
    }
}

async function handleSignup(username, email, password) {
    try {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();
        if (response.ok) {

            window.location.href = 'index.html';
        } else {
            displayError('signup-form', data.message);
        }
    } catch (error) {
        displayError('signup-form', 'Server error. Please try again.');
    }
}

// Handle Login Form Validation
document.getElementById('login-form')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    let valid = true;

    document.querySelectorAll('.input-error').forEach((error) => {
        error.remove();
    });

    if (!email || !password) {
        valid = false;
        displayError('login-form', 'Please fill out all fields.');
    }

    if (valid) {
        handleLogin(email, password);
    }
});

// Handle Signup Form Validation
document.getElementById('signup-form')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    let valid = true;

    document.querySelectorAll('.input-error').forEach((error) => {
        error.remove();
    });

    if (!username || !email || !password || !confirmPassword) {
        valid = false;
        displayError('signup-form', 'Please fill out all fields.');
    }

    if (password !== confirmPassword) {
        valid = false;
        displayError('signup-form', 'Passwords do not match.');
    }

    if (valid) {
        handleSignup(username, email, password);
    }
});

function displayError(formId, message) {
    const form = document.getElementById(formId);
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('input-error');
    errorDiv.textContent = message;
    form.insertBefore(errorDiv, form.firstChild);
}