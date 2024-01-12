const showUsers = async (): Promise<void> => {
    const usersURL: string = 'https://jsonplaceholder.typicode.com/users';
    const usersJson: Response = await fetch(usersURL);
    const users: [] = await usersJson.json();

    const usersContainer = document.getElementById('users');
    const userElements = document.createElement('div');
    userElements.classList.add('users-container');

    for (const user of users) {
        const {id, name} = user;
        const userElement = document.createElement('article');
        const userInfoText = document.createElement('p');
        userInfoText.innerText = `
        Id: ${id}
        Name: ${name}
        `

        const userInfoButton = document.createElement('button');
        userInfoButton.innerText = 'Details';
        userInfoButton.onclick = () => {
            window.location.href = `./src/pages/user-details.html?userinfo=${JSON.stringify(user)}`;
        }
        userElement.append(userInfoText, userInfoButton);
        userElements.appendChild(userElement);
    }

    const loader: HTMLElement = document.body.querySelector('.loader');

    setTimeout(() => {
        loader.remove();
        usersContainer.appendChild(userElements);
    }, 500);
}

showUsers();