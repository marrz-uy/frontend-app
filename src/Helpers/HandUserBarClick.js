export const handleUserBar = ((userBar) => {
    var userbar = document.querySelector('.userbar-click')
    if (userBar) {
        userbar.style.display = 'unset';
    } else if (userbar === null) {
        // userbar.style.display = 'none';
    } else {
        userbar.style.display = 'none';
    }
})

