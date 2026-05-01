// Source: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
// Wait for the DOM to fully load before running any script
document.addEventListener("DOMContentLoaded", () => { 

    // Select the form and submit buttons
    const form = document.querySelector('form');
    const submitBtn = document.querySelector('#submit_button');

    // Prevent double submissions by disabling the buttons after the first click
    if (form && submitBtn) {
        form.addEventListener('submit', () => {
            submitBtn.disabled = true;
            submitBtn.textContent = "Submitting...";
        });
    }

});