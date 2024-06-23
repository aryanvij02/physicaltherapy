export function saveTrainingData(trainingData: string) {
    // Define the URL of the Flask endpoint
    const url = 'http://localhost:5001/save';

    // Use the fetch API to send a POST request
    fetch(url, {
        method: 'POST', // Specify the method
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // Set the Content-Type header
        },
        body: `text=${encodeURIComponent(trainingData)}` // Send the trainingData as form data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}