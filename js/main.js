const userLists = document.querySelector(".user-lists");
const postLists = document.querySelector(".post-lists");
const commetLists = document.querySelector(".commet-lists");

// ___Users Posts Comments -> Template___  
const userInfoTemp = document.querySelector("#user-info").content;
const userPostTemp = document.querySelector("#user-post").content;
const userCommetTemp = document.querySelector("#user-commet").content;

// Rendering users from the server
fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
        renderUsers(data);
    });

// Render posts when clicked
userLists.addEventListener("click", (evt) => {
    const clickName = evt.target.dataset.name_id;

    fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((dataa) => {
            const filteredPosts = dataa.filter((element) => {
                return element.userId == clickName;
            });
            renderPosts(filteredPosts);
        });
});

// Render comments when clicked
postLists.addEventListener("click", (evt) => {
    clickedPostTitle = evt.target.dataset.post_id;

    fetch("https://jsonplaceholder.typicode.com/comments")
        .then((response) => response.json())
        .then((dataaa) => {
            const filteredCommet = dataaa.filter((element) => {
                return element.postId == clickedPostTitle;
            });
            renderCommets(filteredCommet);
        });
});

// A simple function that render users in the form of an array that comes to the argument
function renderUsers(data) {
    data.forEach((element) => {
        const newUserInfo = userInfoTemp.cloneNode(true);

        newUserInfo.querySelector(".user-name").textContent = element.name;
        newUserInfo.querySelector(".user-name").dataset.name_id = element.id;
        newUserInfo.querySelector(".user-name_2").textContent = element.username;
        newUserInfo.querySelector(".user-email").textContent = element.email;
        newUserInfo.querySelector(".user-address").textContent =
            element.address.street +
            " " +
            element.address.suite +
            " " +
            element.address.city +
            " " +
            element.address.zipcode;
        newUserInfo
            .querySelector(".link")
            .setAttribute(
                "href",
                "https://www.google.com/maps/place/" +
                element.address.geo.lat +
                element.address.geo.lng
            );
        newUserInfo.querySelector(".user-phone").textContent = element.phone;
        newUserInfo.querySelector(".user-website").textContent = element.website;
        newUserInfo
            .querySelector(".user-website")
            .setAttribute("href", "https://www." + element.website);
        newUserInfo.querySelector(".company").textContent =
            element.company.name +
            " " +
            element.company.catchPhrase +
            " " +
            element.company.bs;

        userLists.appendChild(newUserInfo);
    });
}

// Function that render posts
function renderPosts(data) {
    postLists.innerHTML = null;
    const nameBox = document.createElement("h3");
    nameBox.textContent = "POSTS";
    postLists.appendChild(nameBox);

    data.forEach((element) => {
        const newUserPost = userPostTemp.cloneNode(true);
        const postTitle = newUserPost.querySelector(".post-title");
        postTitle.textContent = element.title;
        postTitle.dataset.post_id = element.id;
        newUserPost.querySelector(".body").textContent = element.body;
        postLists.appendChild(newUserPost);
    });
}

// Function that render comments
function renderCommets(data) {
    commetLists.innerHTML = null;
    const nameBox = document.createElement("h3");
    nameBox.textContent = "COMMENTS";
    commetLists.appendChild(nameBox);

    data.forEach((element) => {
        const newUserCommet = userCommetTemp.cloneNode(true);
        newUserCommet.querySelector(".commet-name").textContent = element.name;
        newUserCommet.querySelector(".emails").textContent = element.email;
        newUserCommet.querySelector(".body").textContent = element.body;
        commetLists.appendChild(newUserCommet);
    });
}



