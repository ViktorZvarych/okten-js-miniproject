// ------Theme toggle----
const themeToggle = () => {
    const htmlElement = document.querySelector('html');
    const themeToggleInput = document.getElementById('switchThemeInput') as HTMLInputElement;
    const themeToggleLabel = document.getElementById('switchThemeLabel');

    const theme = localStorage.getItem('theme') || 'dark';

    if (theme === 'dark') {
        htmlElement.setAttribute('data-bs-theme', 'dark');
        themeToggleLabel.innerText = 'Turn ON the lights';
        themeToggleInput.checked = false;
    } else {
        htmlElement.setAttribute('data-bs-theme', 'light');
        themeToggleLabel.innerText = 'Turn OFF the lights';
        themeToggleInput.checked = true;
    }

    themeToggleInput.onclick = () => {
        if (themeToggleInput.checked) {
            localStorage.setItem('theme', 'light');
            htmlElement.setAttribute('data-bs-theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
            htmlElement.setAttribute('data-bs-theme', 'dark');
        }

        themeToggleLabel.innerText = !themeToggleInput.checked
            ? 'Turn ON the lights'
            : 'Turn OFF the lights';
    };
};

themeToggle();