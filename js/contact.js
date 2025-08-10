document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('https://formspree.io/f/mgvozzay', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            document.getElementById('submit-button').style.display = 'none';
            document.getElementById('confirmation-message').style.display = 'block';
        } else {
            alert('Failed to send the message. Please try again.');
        }
    }).catch(error => alert('An error occurred: ' + error));
});
