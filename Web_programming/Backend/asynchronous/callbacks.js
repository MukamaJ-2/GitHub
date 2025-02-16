export function fetchWithCallback(url, callback) {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(null, data))
        .catch(error => callback(error, null));
}

export function processCallbackData(error, data) {
    const outputDiv = document.getElementById('output');
    if (error) {
        outputDiv.innerHTML = `Error: ${error.message}`;
        return;
    }
    
    const result = Object.entries(data)
        .map(([key, value]) => `${key}: ${value}`)
        .join('<br>');
    
    outputDiv.innerHTML = `Callback Result:<br>${result}`;
}