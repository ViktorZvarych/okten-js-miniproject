// На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)
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
    console.log(postInfo);
    const postAuthorLink = document.getElementById('post-author-link');
    postAuthorLink.href = `./user-details.html?userinfo=${userInfoJSON}`;
    const postAuthorElement = document.getElementById('post-author');
    postAuthorElement.innerText = 'Post author: ' + userInfo.name;
    const postTitleElement = document.getElementById('post-title');
    postTitleElement.innerText = 'Post title: ' + postInfo.title;
    const postBodyElement = document.getElementById('post-body');
    postBodyElement.innerText = 'Post text: ' + postInfo.body;
    const commentsRes = yield fetch(`https://jsonplaceholder.typicode.com/posts/${postInfo.id}/comments`);
    const comments = yield commentsRes.json();
    console.log(comments);
    const postCommentsElement = document.getElementById('post-comments');
    for (const comment of comments) {
        const { name, email, body } = comment;
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
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
});
showPostInfo();
