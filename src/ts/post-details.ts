// На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)

const showPostInfo = async (): Promise<void> => {
    const url: URL = new URL(location.href);
    const userInfoJSON: string = url.searchParams.get('userinfo');
    const userInfo = JSON.parse(userInfoJSON);
    console.log(userInfo);
    const postInfoJSON: string = url.searchParams.get('post-details');
    const postInfo = JSON.parse(postInfoJSON);
    console.log(postInfo);

    const postAuthorLink = document.getElementById('post-author-link') as HTMLLinkElement;
    postAuthorLink.href = `./user-details.html?userinfo=${userInfoJSON}`;

    const postAuthorElement = document.getElementById('post-author') as HTMLParagraphElement;
    postAuthorElement.innerText = 'Post author: ' + userInfo.name;

    const postTitleElement = document.getElementById('post-title') as HTMLHeadingElement;
    postTitleElement.innerText = 'Post title: ' + postInfo.title;

    const postBodyElement = document.getElementById('post-body') as HTMLParagraphElement;
    postBodyElement.innerText = 'Post text: ' + postInfo.body;

    const commentsRes:Response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postInfo.id}/comments`);
    const comments = await commentsRes.json();
    console.log(comments);

    const postCommentsElement = document.getElementById('post-comments') as HTMLElement;

    for (const comment of comments) {
        const {name, email, body} = comment;
        const commentElement = document.createElement('div');
        commentElement.classList.add('card');
        const nameElement = document.createElement('p');
        nameElement.innerText = `
        Name: ${name}`;
        const emailElement = document.createElement('p');
        emailElement.innerText = `
        Email: ${email}`;
        const bodyElement = document.createElement('p');
        bodyElement.classList.add('hidden-text');
        bodyElement.innerText = `
        Comment: ${body}`;

        commentElement.append(nameElement, emailElement, bodyElement);
        postCommentsElement.appendChild(commentElement);
    }


    const loader: HTMLElement = document.getElementById('loader');
    loader.classList.add('hidden');
}

showPostInfo();