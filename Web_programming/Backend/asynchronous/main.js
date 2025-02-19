const sample = {
    "fear": "quiet",
    "chest": -1477429467,
    "how": false,
    "graph": false,
    "camp": 929234312,
    "plural": "settle"
};

// Callback Approach
function fetchWithCallback(data, callback) {
    setTimeout(() => {
        try {
            callback(null, data);
        } catch (error) {
            callback(error, null);
        }
    }, 100);
}

function processCallbackData(error, data) {
    const callbackOutput = document.getElementById('callback-output');
    if (error) {
        callbackOutput.innerHTML = `Callback Error: ${error.message}`;
        return;
    }
    callbackOutput.innerHTML = Object.entries(data)
        .map(([key, value]) => `${key}: ${value}`)
        .join('<br>');
}

// Promise Approach
function fetchWithPromise(data) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(data), 100);
    });
}

function processPromiseData(data) {
    const promiseOutput = document.getElementById('promise-output');
    promiseOutput.innerHTML = Object.entries(data)
        .map(([key, value]) => `${key}: ${value}`)
        .join('<br>');
}

// Async/Await Approach
async function fetchWithAsyncAwait(data) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(data), 100);
    });
}

async function processAsyncAwaitData(data) {
    const asyncOutput = document.getElementById('async-output');
    asyncOutput.innerHTML = Object.entries(data)
        .map(([key, value]) => `${key}: ${value}`)
        .join('<br>');
}

// Execution
document.addEventListener('DOMContentLoaded', () => {
    // Callback Method
    fetchWithCallback(sample, processCallbackData);

    // Promise Method
    fetchWithPromise(sample)
        .then(processPromiseData)
        .catch(error => {
            const promiseOutput = document.getElementById('promise-output');
            promiseOutput.innerHTML = `Promise Error: ${error.message}`;
        });

    // Async/Await Method
    (async () => {
        try {
            const data = await fetchWithAsyncAwait(sample);
            await processAsyncAwaitData(data);
        } catch (error) {
            const asyncOutput = document.getElementById('async-output');
            asyncOutput.innerHTML = `Async/Await Error: ${error.message}`;
        }
    })();
});