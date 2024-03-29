const showPostInfo = async (): Promise<void> => {
    const url: URL = new URL(location.href);
    const userInfoJSON: string = url.searchParams.get('userinfo');
    const userInfo = JSON.parse(userInfoJSON);
    console.log(userInfo);
    const postInfoJSON: string = url.searchParams.get('post-details');
    const postInfo = JSON.parse(postInfoJSON);


    const postAuthorElement = document.getElementById('post-author') as HTMLDivElement;
    const postAuthorTitle = document.createElement('p');
    postAuthorTitle.innerText = 'Author: ';
    const postAuthorLink = document.createElement('a');
    postAuthorLink.href = `./user-details.html?userinfo=${userInfoJSON}`;
    postAuthorLink.innerText = userInfo.name;
    postAuthorElement.append(postAuthorTitle, postAuthorLink);


    const postTitleElement = document.getElementById('post-title') as HTMLHeadingElement;
    postTitleElement.innerText = 'Title: ' + postInfo.title[0].toUpperCase() + postInfo.title.slice(1);

    const postBodyElement = document.getElementById('post-body') as HTMLParagraphElement;
    postBodyElement.innerText = 'Post: ' + postInfo.body[0].toUpperCase() + postInfo.body.slice(1);

    const commentsRes: Response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postInfo.id}/comments`);
    const comments = await commentsRes.json();
    console.log(comments);

    const loader: HTMLElement = document.body.querySelector('.loader');

    const postCommentsElement = document.getElementById('post-comments') as HTMLElement;

    setTimeout(() => {
        loader.remove();

        for (const comment of comments) {
            const {name, email, body} = comment;
            const commentElement = document.createElement('div');
            commentElement.classList.add('card-element');
            const nameElement = document.createElement('p');
            nameElement.innerText = `Name: ${name}`;
            const emailElement = document.createElement('p');
            emailElement.style['word-break'] = 'break-word';
            emailElement.innerText = `Email: ${email}`;
            const bodyElement = document.createElement('p');
            bodyElement.classList.add('hidden-text');
            bodyElement.innerText = `Comment: ${body}`;
            const hr = document.createElement('hr');

            commentElement.append(nameElement, emailElement, hr, bodyElement);
            postCommentsElement.appendChild(commentElement);
        }
    }, 500);

}

showPostInfo();