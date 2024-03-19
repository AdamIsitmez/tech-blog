const postElements = document.querySelectorAll(".post");
const formEl = document.querySelector(".new-comment");

postElements.forEach(post => {
    const showCommentBtn = post.querySelector(".show-comments")
    showCommentBtn.addEventListener('click', function (event) {
        const commentEl = post.querySelector(".comments")

        const isHidden = commentEl.classList.contains("display-none");

        if (isHidden) {
            commentEl.classList.remove("display-none");
            showCommentBtn.textContent = "Hide comments";
        } else {
            commentEl.classList.add("display-none");
            showCommentBtn.textContent = "Show comments";

        }
    });
});

const submitButtons = document.querySelectorAll('.new-comment');

submitButtons.forEach(button => {
    button.addEventListener('submit', async (event) => {
        event.preventDefault();


        user_id = event.currentTarget.dataset.user;
        post_id = event.currentTarget.dataset.post;

        const commentInput = event.currentTarget.querySelector("#comment");
        const contents = commentInput.value;

        const commentsList = event.target.parentNode;

        const commentEl = document.createElement('div');
        commentEl.classList.add("comment")

        const contentsEl = document.createElement('div');
        contentsEl.textContent = contents;

        const username = await getUsername();

        const usernameEl = document.createElement('div');
        usernameEl.textContent = `-${username}`;


        if (contents) {
            const response = await fetch('/api/comments', {
                method: 'POST',
                body: JSON.stringify({ contents, user_id, post_id }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                commentsList.insertBefore(commentEl, event.target);
                commentEl.appendChild(contentsEl);
                commentEl.appendChild(usernameEl);
                console.log(response);
            } else {
                alert(response.statusText);
            }
        }

        commentInput.value = "";
    });
})

async function getUsername() {
    const id = formEl.dataset.user;
    const response = await fetch(`/api/users/username/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
        const username = await response.json();
        return (username);
    } else {
        console.error('Failed to fetch username:', response.statusText);
    }
}
