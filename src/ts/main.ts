// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html, котра має детальну інфорацію про об'єкт на який клікнули



const showUsers = async (): Promise<void> => {

    const usersJson: Response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users:[] = await usersJson.json();
    console.log(users);
    const usersContainer = document.getElementById('users');

    for (const user of users) {
        const {id, name} = user;
        const userBlock = document.createElement('article');
        const userInfoText = document.createElement('p');
        userInfoText.innerText = `
        id: ${id},
        name: ${name}
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