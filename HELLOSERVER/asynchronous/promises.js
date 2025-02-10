export function fetchWithPromise(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        });
}

export function processPromiseData(data) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = `Promise Result:<br>
        Fear: ${data.fear}<br>
        Chest: ${data.chest}<br>
        How: ${data.how}<br>
        Graph: ${data.graph}<br>
        Camp: ${data.camp}<br>
        Plural: ${data.plural}`;
}