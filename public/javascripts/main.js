document.addEventListener("DOMContentLoaded", () => { // Source: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event

    // No double click
    const form = document.querySelector('form');
    const submitBtn = document.querySelector('#submit_button');

    if (form && submitBtn) {
        form.addEventListener('submit', () => {
            submitBtn.disabled = true;
            submitBtn.textContent = "Submitting...";
        });
    }

});