// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html, котра має детальну інфорацію про об'єкт на який клікнули
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
    const usersJson = yield fetch('https://jsonplaceholder.typicode.com/users');
    const users = yield usersJson.json();
    console.log(users);
    const usersContainer = document.getElementById('users');
    for (const user of users) {
        const { id, name } = user;
        const userBlock = document.createElement('article');
        const userInfoText = document.createElement('p');
        userInfoText.innerText = `
        id: ${id},
        name: ${name}
        `;
        const userInfoButton = document.createElement('button');
        userInfoButton.innerText = 'Details';
        userInfoButton.onclick = () => {
            window.location.href = `./pages/user-details.html?userinfo=${JSON.stringify(user)}`;
        };
        userBlock.append(userInfoText, userInfoButton);
        usersContainer.appendChild(userBlock);
    }
    // document.body.appendChild(usersContainer);
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
});
showUsers();
