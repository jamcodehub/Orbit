const API_URL = 'http://localhost:8000/api/anchor';
const anchorDisplay = document.getElementById('current-anchor');
const anchorInput = document.getElementById('anchor-input');
const updateBtn = document.getElementById('update-btn');
const statusMsg = document.getElementById('status-message');

async function fetchAnchor() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Server error');
        const data = await response.json();
        anchorDisplay.textContent = data.anchor || 'No anchor set';
    } catch (err) {
        anchorDisplay.textContent = 'Offline';
        statusMsg.textContent = 'Unable to connect to Orbit server.';
    }
}

async function setAnchor() {
    const text = anchorInput.value.trim();
    if (!text) return;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ anchor: text })
        });
        if (!response.ok) throw new Error('Failed to update');

        statusMsg.textContent = 'Anchor updated successfully!';
        anchorInput.value = '';
        await fetchAnchor();
    } catch (err) {
        statusMsg.textContent = 'Error updating anchor. Please try again.';
    }
}

updateBtn.addEventListener('click', setAnchor);
window.addEventListener('load', fetchAnchor);
