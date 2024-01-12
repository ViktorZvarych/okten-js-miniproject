const showUsers = async (): Promise<void> => {
    const usersURL: string = 'https://jsonplaceholder.typicode.com/users';
    const usersJson: Response = await fetch(usersURL);
    const users:[] = await usersJson.json();

    const usersContainer = document.getElementById('users');

    for (const user of users) {
        const {id, name} = user;
        const userBlock = document.createElement('article');
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
        userBlock.append(userInfoText, userInfoButton);
        usersContainer.appendChild(userBlock);
    }

    // document.body.appendChild(usersContainer);
    const loader: HTMLElement = document.getElementById('loader');
    loader.classList.add('hidden');
}

showUsers();