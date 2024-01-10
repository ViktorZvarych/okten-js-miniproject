// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
//     6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.

const showUserInfo = async (): Promise<void> => {
    // console.log(location.href);

    const url: URL = new URL(location.href);
    const userInfo = url.searchParams.get('userinfo');
    // console.log(userInfo);
    const userInfoObject = JSON.parse(userInfo);
    // console.log(userInfoObject);

    const userInfoArray: string[] = [];
    getUserInfo(userInfoObject, userInfoArray);
    // console.log(userInfoArray);

    const userInfoArticle = document.getElementById('user-details-article') as HTMLElement;
    const userInfoList = document.getElementById('user-details-list') as HTMLUListElement;

    userInfoArray.map(item => {
        const userInfoItem = document.createElement('li');
        userInfoItem.innerText = `${item}`;
        userInfoList.appendChild(userInfoItem);
    })

    const showUserPostButton = document.getElementById('show-user-posts-button');

    showUserPostButton.onclick = async (): Promise<void> => {
        loader.classList.toggle('hidden');

        const userPostsJson = await fetch(`https://jsonplaceholder.typicode.com/users/${userInfoObject.id}/posts/`);
        const userPosts = await userPostsJson.json();
        console.log(userPosts);

        const userPostslist = document.getElementById('user-posts-list');
        userPostslist.innerHTML = '';
        userPostslist.classList.add('user-posts-list');

        for (const userPost of userPosts) {
            const {title, body} = userPost;
            const userPostCard = document.createElement('li');
            userPostCard.classList.add('card');
            const userPostTitle = document.createElement('h4');
            userPostTitle.innerText = title.slice(0, 1).toUpperCase() + title.slice(1, 25) + '...';
            const userPostText = document.createElement('p');
            userPostText.classList.add('hidden-text');
            userPostText.innerText = body.slice(0, 1).toUpperCase() + body.slice(1, 40) + '...';
            const userPostLink = document.createElement('a');
            userPostLink.innerText = 'More';
            const userPostURL = `../pages/post-details.html?post-details=${JSON.stringify(userPost)}&userinfo=${userInfo}`;
            userPostLink.href = `${userPostURL}`;

            userPostCard.append(userPostTitle, userPostText, userPostLink);
            userPostslist.appendChild(userPostCard);
            showUserPostButton.remove();
        }

        loader.classList.toggle('hidden');
    }

    const loader: HTMLElement = document.getElementById('loader');
    loader.classList.add('hidden');
    // document.body.appendChild(userInfoList);


}

function getUserInfo(object, array) {
    for (const [key, value] of Object.entries(object)) {
        if (typeof value !== 'object') {
            array.push(`- ${key}: ${value}`);
        } else {
            array.push(`${key.toUpperCase()}:`)
            getUserInfo(value, array);
        }
    }
}

// setTimeout((() => showUserInfo()), 1200);
showUserInfo()