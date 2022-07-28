async function fetchPosts() {
  const response = await fetch("data.json");
  return response.json();
}

let posts = [];
let displayedPosts = [];

async function initializePosts() {
  posts = await fetchPosts();

  for (let i = 0; i < posts.length; i++) {
    posts[i] = {
      ...posts[i],
      is_liked: false,
    };
  }

  loadPosts();
}

function loadPosts() {
  const fromIndex = displayedPosts.length;
  let loadCount = 4;
  const canLoadFour = posts.length >= fromIndex + loadCount;

  if (!canLoadFour) {
    loadCount = (fromIndex + loadCount) - posts.length;
  }

  const toIndex = fromIndex + loadCount;

  displayedPosts = posts.slice(0, toIndex);

  if (displayedPosts.length === posts.length) {
    let loadMoreButton = document.getElementById("load-posts-button");
    loadMoreButton.hidden = true;
  }

  displayPosts();
}

function likePost(index) {
  let post = displayedPosts[index];
  post.is_liked = !post.is_liked;
  post.is_liked ? post.likes++ : post.likes--;
  displayPosts();
}

function displayPosts() {
  // Find the post's container by id
  let postsContainer = document.getElementById("posts-container");

  // Clear all the previous posts
  postsContainer.innerHTML = "";

  // One by one add all the displayedPosts in the container
  displayedPosts.forEach((post, index) => {
    postsContainer.innerHTML += `<div class="post">
            <div class="post-header">
                <img class="post-header-image" src="${post.profile_image}" alt="avatar">
                <div class="post-header-info">
                    <span class="post-header-info-name">${post.name}</span>
                    <span class="post-header-info-date">${post.date}</span>
                </div>
                <img class="post-header-logo" src="logo.png" alt="instagram">
            </div>
            <div class="post-content">
                <img class="post-content-image" src="${post.image}" alt="content">
                <span class="post-content-description">${post.caption}</span>
                <hr class="post-content-hr" />
                <div class="post-content-like">
                    <img class="post-content-like-heart" onclick="likePost(${index})" src="${post.is_liked ? 'like.png' : 'dislike.png'}" alt="heart">
                    <span class="post-content-like-count">${post.likes}</span>
                </div>
            </div>
        </div>`
  });
}

initializePosts().then(() => console.log("Posts loaded successfully"));