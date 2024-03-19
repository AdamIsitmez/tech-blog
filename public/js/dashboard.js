const postList = document.getElementById("post-list");
const editButtons = document.querySelectorAll(".edit-button");
const postForm = document.getElementById("post-form");
const postFormTitle = document.getElementById("form-title");
const submitButton = document.getElementById("post-submit");
const postTitleInput = document.getElementById("post-title");
const postContentInput = document.getElementById("post-contents");
const userTitle = document.getElementById("user");
const newPostButton = document.getElementById("new-post");

editButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        const post = event.target.parentNode;

        const postTitle = post.querySelector(".title").textContent;
        const postId = post.querySelector(".title").dataset.post;
        const postContents = post.querySelector(".contents").textContent;

        submitButton.textContent = "Save";
        postFormTitle.textContent = "Edit your post:"
        postForm.classList.remove("display-none");
        postList.classList.add("display-none");
        newPostButton.classList.add("display-none");

        postTitleInput.value = postTitle.trim();
        postContentInput.value = postContents.trim();

        submitButton.addEventListener("click", async (event) => {
            event.preventDefault();

            const title = postTitleInput.value.trim();
            const contents = postContentInput.value.trim();
            const user_id = user.dataset.user;


            const response = await fetch(`api/posts/${postId}`, {
                method: 'PUT',
                body: JSON.stringify({ title, contents, user_id }),
                headers: { 'Content-Type': 'application/json' },
            })

            if (response.ok) {
                document.location.reload();
            } else {
                alert(response.statusText);
            }
        })
    });
});

newPostButton.addEventListener("click", async (event) => {
    postList.classList.add("display-none");
    postForm.classList.remove("display-none");
    event.target.classList.add("display-none");

    submitButton.addEventListener("click", async (event) => {
        event.preventDefault();
        const title = postTitleInput.value.trim();
        const contents = postContentInput.value.trim();
        const user_id = user.dataset.user;

        if (title && contents) {
            const response = await fetch(`api/posts/`, {
                method: 'POST',
                body: JSON.stringify({ title, contents, user_id }),
                headers: { 'Content-Type': 'application/json' },
            })

            if (response.ok) {
                document.location.reload();
            } else {
                alert(response.statusText);
            }
        }

    })

})