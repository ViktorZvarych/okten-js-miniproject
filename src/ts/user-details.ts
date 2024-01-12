const showUserInfo = async (): Promise<void> => {
    // console.log(location.href);

    const url: URL = new URL(location.href);
    const userInfo = url.searchParams.get('userinfo');
    // console.log(userInfo);
    const userInfoObject = JSON.parse(userInfo);
    // console.log(userInfoObject);

    const userInfoList = document.getElementById('user-details-list') as HTMLUListElement;

    createUserInfoItemElement(userInfoObject);

    function createUserInfoItemElement(object: object): void {
        for (const [key, value] of Object.entries(object)) {
            const userInfoItem = document.createElement('li');

            if (typeof value !== 'object') {
                userInfoItem.innerText = `- ${key.toUpperCase()}: ${value}`;
                userInfoList.appendChild(userInfoItem);
                userInfoItem.classList.add('list-group-item', 'list-group-item-dark', 'p-2');
            } else {
                userInfoItem.innerText = `${key.toUpperCase()}:`;
                userInfoItem.classList.add('fw-bold', 'list-group-item', 'list-group-item-info', 'p-2');
                userInfoList.appendChild(userInfoItem);
                createUserInfoItemElement(value);
            }
        }
    }

    const showUserPostsButton = document.getElementById('show-user-posts-button');
    const userPostslist = document.getElementById('user-posts-list');
    showUserPostsButton.onclick = showUserPosts;

    async function showUserPosts(): Promise<void> {
        const userPostsJson = await fetch(`https://jsonplaceholder.typicode.com/users/${userInfoObject.id}/posts/`);
        const userPosts = await userPostsJson.json();
        console.log(userPosts);



        setTimeout(() => {
            userPostslist.innerHTML = '';
            for (const userPost of userPosts) {
                const {title, body} = userPost;
                const userPostCard = document.createElement('li');
                userPostCard.classList.add('card-element');
                const userPostTitle = document.createElement('h4');
                userPostTitle.innerText = title.slice(0, 1).toUpperCase() + title.slice(1, 25) + '...';
                const userPostText = document.createElement('p');
                userPostText.classList.add('hidden-text');
                userPostText.innerText = body.slice(0, 1).toUpperCase() + body.slice(1, 40) + '...';
                const userPostLink = document.createElement('a');
                userPostLink.innerText = 'More';
                const userPostURL = `./post-details.html?post-details=${JSON.stringify(userPost)}&userinfo=${userInfo}`;
                userPostLink.href = `${userPostURL}`;

                userPostCard.append(userPostTitle, userPostText, userPostLink);
                userPostslist.appendChild(userPostCard);
            }
        }, 500);
    }
}

showUserInfo()