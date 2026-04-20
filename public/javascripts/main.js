document.addEventListener("DOMContentLoaded", () => { // Source: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event

    const menuBtn = document.querySelector('.goToMenu');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            window.location.href = '/menu';
        });
    }

    const aboutBtn = document.querySelector('.goToAboutUs');
    if (aboutBtn) {
        aboutBtn.addEventListener('click', () => {
            window.location.href = '/about_us';
        });
    }

    const commentsBtn = document.querySelector('.goToCustomerComments');
    if (commentsBtn) {
        commentsBtn.addEventListener('click', () => {
            window.location.href = '/customer_comments';
        });
    }

    const landingBtn = document.querySelector('.goToLandingPage');
    if (landingBtn) {
        landingBtn.addEventListener('click', () => {
            window.location.href = '/landing_page';
        });
    }

});