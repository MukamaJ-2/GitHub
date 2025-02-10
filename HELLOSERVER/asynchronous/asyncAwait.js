export async function fetchWithAsyncAwait(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        const outputDiv = document.getElementById('output');
        outputDiv.innerHTML = `Async/Await Error: ${error.message}`;
        throw error;
    }
}

export function processAsyncAwaitData(data) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = `Async/Await Result:<br>
        Fear: ${data.fear}<br>
        Chest: ${data.chest}<br>
        How: ${data.how}<br>
        Graph: ${data.graph}<br>
        Camp: ${data.camp}<br>
        Plural: ${data.plural}`;
}