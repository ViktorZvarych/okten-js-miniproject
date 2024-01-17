var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const showPostInfo = () => __awaiter(this, void 0, void 0, function* () {
    const url = new URL(location.href);
    const userInfoJSON = url.searchParams.get('userinfo');
    const userInfo = JSON.parse(userInfoJSON);
    console.log(userInfo);
    const postInfoJSON = url.searchParams.get('post-details');
    const postInfo = JSON.parse(postInfoJSON);
    const postAuthorElement = document.getElementById('post-author');
    const postAuthorTitle = document.createElement('p');
    postAuthorTitle.innerText = 'Author: ';
    const postAuthorLink = document.createElement('a');
    postAuthorLink.href = `./user-details.html?userinfo=${userInfoJSON}`;
    postAuthorLink.innerText = userInfo.name;
    postAuthorElement.append(postAuthorTitle, postAuthorLink);
    const postTitleElement = document.getElementById('post-title');
    postTitleElement.innerText = 'Title: ' + postInfo.title[0].toUpperCase() + postInfo.title.slice(1);
    const postBodyElement = document.getElementById('post-body');
    postBodyElement.innerText = 'Post: ' + postInfo.body[0].toUpperCase() + postInfo.body.slice(1);
    const commentsRes = yield fetch(`https://jsonplaceholder.typicode.com/posts/${postInfo.id}/comments`);
    const comments = yield commentsRes.json();
    console.log(comments);
    const loader = document.body.querySelector('.loader');
    const postCommentsElement = document.getElementById('post-comments');
    setTimeout(() => {
        loader.remove();
        for (const comment of comments) {
            const { name, email, body } = comment;
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
});
showPostInfo();
