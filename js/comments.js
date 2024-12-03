// document.addEventListener("DOMContentLoaded", () => {
//     //comment carousel
//     let currentIndex = 0;
//     const comments = document.querySelectorAll("#commentList li");
//     const prevBtn = document.getElementById("prevBtn");
//     const nextBtn = document.getElementById("nextBtn");

//     function updateDisplay() {
//         comments.forEach((comment, index) => {
//             const commentId = `comment-${index}`;
//             const commentElement = document.getElementById(commentId);
//             if (commentElement) {
//                 commentElement.style.display = index === currentIndex ? "block" : "none";
//             }
//         });

//         prevBtn.disabled = currentIndex === 0;
//         nextBtn.disabled = currentIndex === comments.length - 1;
//     }

//     prevBtn.addEventListener("click", () => {
//         if (currentIndex > 0) {
//             currentIndex--;
//             updateDisplay();
//         }
//     });

//     nextBtn.addEventListener("click", () => {
//         if (currentIndex < comments.length - 1) {
//             currentIndex++;
//             updateDisplay();
//         }
//     });

//     updateDisplay();
// });

//無限繰り返しver
document.addEventListener("DOMContentLoaded", () => {
    const commentList = document.getElementById("commentList");
    const comments = document.querySelectorAll("#commentList li");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    let currentIndex = 0;

    commentList.style.display = "block";

    function updateDisplay() {
        comments.forEach((comment, index) => {
            comment.style.display = index === currentIndex ? "block" : "none";
        });
    }

    prevBtn.addEventListener("click", () => {
        // Nếu là bình luận đầu tiên, chuyển đến bình luận cuối cùng
        currentIndex = (currentIndex === 0) ? comments.length - 1 : currentIndex - 1;
        updateDisplay();
    });

    nextBtn.addEventListener("click", () => {
        // Nếu là bình luận cuối cùng, quay lại bình luận đầu tiên
        currentIndex = (currentIndex === comments.length - 1) ? 0 : currentIndex + 1;
        updateDisplay();
    });

    updateDisplay();
});



document.getElementById("commentForm").addEventListener("submit", postComment);

function postComment(event) {
    event.preventDefault();

    const storyId = document.getElementById("commentForm").dataset.storyId;
    const author = document.getElementById("author").value;
    const content = document.getElementById("content").value;

    console.log(storyId, author, content);

    fetch("story-api.php?id=" + storyId, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `storyId=${storyId}&author=${encodeURIComponent(author)}&content=${encodeURIComponent(content)}`
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Parse JSON from response body
        })
        .then(newComment => {
            if (newComment && newComment.comment_id) {

                console.log("Comment ID saved to LocalStorage:", newComment.comment_id);

                // Reset form
                document.getElementById("author").value = '';
                document.getElementById("content").value = '';
            } else {
                console.error("Invalid response from server:", newComment);
            }
        })
        .catch(error => {
            console.error("Error during fetch:", error);
        });
}