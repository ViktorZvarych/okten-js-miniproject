var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const showUsers = () => __awaiter(this, void 0, void 0, function* () {
    const usersURL = 'https://jsonplaceholder.typicode.com/users';
    const usersJson = yield fetch(usersURL);
    const users = yield usersJson.json();
    const usersContainer = document.getElementById('users');
    const userElements = document.createElement('div');
    userElements.classList.add('users-container');
    for (const user of users) {
        const { id, name } = user;
        const userElement = document.createElement('article');
        const userInfoText = document.createElement('p');
        userInfoText.innerText = `
        Id: ${id}
        Name: ${name}
        `;
        const userInfoButton = document.createElement('button');
        userInfoButton.innerText = 'Details';
        userInfoButton.onclick = () => {
            window.location.href = `./src/pages/user-details.html?userinfo=${JSON.stringify(user)}`;
        };
        userElement.append(userInfoText, userInfoButton);
        userElements.appendChild(userElement);
    }
    const loader = document.body.querySelector('.loader');
    setTimeout(() => {
        loader.remove();
        usersContainer.appendChild(userElements);
    }, 500);
});
showUsers();
