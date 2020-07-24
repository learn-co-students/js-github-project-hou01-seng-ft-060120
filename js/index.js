

document.addEventListener('DOMContentLoaded', () => {

searchUser()
})

function getData(username) {
    fetch(`https://api.github.com/users/${username}`, {
        method: 'GET',
        headers: {
            Accept: 'application/vnd.github.v3+json'
        },
    })
    .then(res => res.json())
    .then(username => {
        return username,
        displayUser(username)
    })
}

function searchUser() {
    document.getElementById('github-form').addEventListener('submit', event => {
        event.preventDefault();
        const username = document.getElementById('search').value
        getData(username)
    })

}

function getRepos(username) {
    document.getElementById(username.id).addEventListener('click', event => {
        event.preventDefault();
    
    fetch(`https://api.github.com/users/${username.login}/repos`, {
        method: 'GET',
        headers: {
            Accept: 'application/vnd.github.v3+json'
        },
    })
    .then(res => res.json())
    .then(repos => {
        return repos,
        console.log(repos),
        displayRepos(repos)
    });
    
})
}

function displayUser(username) {
    const userDiv = document.getElementById('github-container');
    const userList = document.getElementById('user-list');
    userList.innerHTML = `<li><strong><a href= ${username.html_url} >Username: ${username.login}</a></strong></li>
    <br>
    <li>About: ${username.bio}</li>
    <li>Email: ${username.email}</li>
    <li>Company: ${username.company}</li>
    <li id=${username.id} style="color:#2E64FE" > Repositories </li>`

    getRepos(username)
}

function displayRepos(repos) {
    console.log(repos)
    const repoList = document.getElementById('repos-list')
    repos.forEach( repo => {
    let a = document.createElement('a')
    let li = document.createElement('li')
    a.setAttribute("href", `${repo.html_url}`)
    a.innerText = repo.name
    repoList.appendChild(li)
    li.appendChild(a)
    })

}