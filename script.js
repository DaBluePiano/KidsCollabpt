const stories = {
    fiction: [
        { id: 1, title: "The Magical Forest", content: "Once upon a time..." },
        // Add more fiction stories here
    ],
    nonfiction: [
        { id: 2, title: "Amazing Facts About Space", content: "Space is vast and mysterious..." },
        // Add more non-fiction stories here
    ]
};

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

document.addEventListener('DOMContentLoaded', () => {
    if (currentUser) {
        document.querySelector('#signin').style.display = 'none';
    }
});

function initPage(category) {
    const storyList = document.getElementById('story-list');
    if (stories[category]) {
        storyList.innerHTML = stories[category].map(story => `
            <div class="story">
                <h3>${story.title}</h3>
                <p>${story.content}</p>
                <button onclick="likeStory(${story.id})">Like</button>
                <button onclick="toggleFavorite(${story.id})">${isFavorite(story.id) ? '❤️' : '🤍'}</button>
            </div>
        `).join('');
    }
}

function likeStory(id) {
    console.log(`Liked story with ID: ${id}`);
}

function toggleFavorite(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(favId => favId !== id);
    } else {
        favorites.push(id);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
}

function isFavorite(id) {
    return favorites.includes(id);
}

function displayFavorites() {
    const favoriteList = document.getElementById('favorite-list');
    favoriteList.innerHTML = stories.fiction.concat(stories.nonfiction)
        .filter(story => favorites.includes(story.id))
        .map(story => `
            <div class="story">
                <h3>${story.title}</h3>
                <p>${story.content}</p>
            </div>
        `).join('');
}

function handleSignIn(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        currentUser = { username };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        window.location.href = 'index.html';
    } else {
        alert('Please enter both username and password.');
    }
}

