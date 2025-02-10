// Check if user is logged in
function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
    }
    return token;
}

// Load user profile
async function loadUserProfile() {
    const token = checkAuth();
    const username = localStorage.getItem('username');
    
    if (username) {
        const profileName = document.querySelector('.profile-name');
        if (profileName) {
            profileName.textContent = username;
        }
    } else {
        // If username is not in localStorage, fetch it from the token
        try {
            const response = await fetch('http://localhost:3000/api/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const userData = await response.json();
            if (userData.username) {
                localStorage.setItem('username', userData.username);
                const profileName = document.querySelector('.profile-name');
                if (profileName) {
                    profileName.textContent = userData.username;
                }
            }
        } catch (error) {
            console.error('Error loading profile:', error);
        }
    }
}

// Create a new post
async function createPost(content) {
    const token = checkAuth();
    try {
        const response = await fetch('http://localhost:3000/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ content })
        });

        if (response.ok) {
            loadPosts();
        } else {
            throw new Error('Failed to create post');
        }
    } catch (error) {
        console.error('Error creating post:', error);
        alert('Failed to create post. Please try again.');
    }
}

// Load all posts
async function loadPosts() {
    const token = checkAuth();
    try {
        const response = await fetch('http://localhost:3000/api/posts', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const posts = await response.json();
        displayPosts(posts);
    } catch (error) {
        console.error('Error loading posts:', error);
    }
}

// Load user's posts (for profile page)
async function loadUserPosts() {
    const token = checkAuth();
    try {
        const response = await fetch('http://localhost:3000/api/posts/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const posts = await response.json();
        displayUserPosts(posts);
    } catch (error) {
        console.error('Error loading user posts:', error);
    }
}

// Display posts in the feed
function displayPosts(posts) {
    const feed = document.querySelector('.feed');
    if (!feed) return;

    const createPostDiv = feed.querySelector('.create-post');
    feed.innerHTML = '';
    if (createPostDiv) {
        feed.appendChild(createPostDiv);
    }

    posts.forEach(post => {
        const postElement = createPostElement(post);
        feed.appendChild(postElement);
    });
}

// Display posts in the profile page
function displayUserPosts(posts) {
    const reviewsTab = document.getElementById('reviews-tab');
    if (!reviewsTab) return;

    reviewsTab.innerHTML = '<h2>Your Reviews</h2>';
    
    posts.forEach(post => {
        const postElement = createPostElement(post);
        reviewsTab.appendChild(postElement);
    });
}

// Create post HTML element
function createPostElement(post) {
    const article = document.createElement('article');
    article.className = 'post';
    
    // Fix the author comparison by converting to string
    const currentUserId = localStorage.getItem('userId');
    const isAuthor = post.author.toString() === currentUserId;
    
    article.innerHTML = `
        <div class="post-header">
            <div class="post-avatar"></div>
            <div class="post-meta">
                <div class="post-author">${post.authorName}</div>
                <div class="post-time">${new Date(post.createdAt).toLocaleDateString()}</div>
            </div>
            ${isAuthor ? '<button class="delete-post-btn">🗑️ Delete</button>' : ''}
        </div>
        <div class="post-content">${post.content}</div>
        <div class="post-actions">
            <button class="action-button">👍 Like</button>
            <button class="action-button">💭 Comment</button>
            <button class="action-button">↗️ Share</button>
        </div>
    `;

    // Add delete functionality if it's the author's post
    if (isAuthor) {
        const deleteBtn = article.querySelector('.delete-post-btn');
        deleteBtn.addEventListener('click', async (e) => {
            e.stopPropagation();
            if (confirm('Are you sure you want to delete this post?')) {
                try {
                    await deletePost(post._id);
                } catch (error) {
                    console.error('Failed to delete post:', error);
                    alert('Failed to delete post. Please try again.');
                }
            }
        });
    }

    return article;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadUserProfile();

    // Load appropriate content based on current page
    if (window.location.pathname.includes('profile.html')) {
        loadUserPosts();
    } else if (window.location.pathname.includes('home.html')) {
        loadPosts();
    }

    // Handle post creation
    const postButton = document.querySelector('.post-button');
    const postInput = document.querySelector('.post-input');
    if (postButton && postInput) {
        postButton.addEventListener('click', function() {
            const content = postInput.value.trim();
            if (content) {
                createPost(content);
                postInput.value = '';
            } else {
                alert('Please write something before posting.');
            }
        });
    }

    // Fix logout functionality
    const logoutLink = document.querySelector('#logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.clear(); // Clear all localStorage items
            window.location.href = 'index.html';
        });
    }
});



async function deletePost(postId) {
    const token = checkAuth();
    try {
        const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete post');
        }

        // Reload posts after successful deletion
        if (window.location.pathname.includes('profile.html')) {
            loadUserPosts();
        } else {
            loadPosts();
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error; // Re-throw to handle in the calling function
    }
}