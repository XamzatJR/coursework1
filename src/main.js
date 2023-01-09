const usersList = document.querySelector('.users');
const searchBar = document.querySelector('#search-bar');
const main = document.querySelector('main');

let timerID = null;
document.addEventListener('DOMContentLoaded', async () => {
  let users = await fetchUsers();
  addUsers(users, usersList);
  searchBar.addEventListener('input', async ($event) => {
    clearTimeout(timerID);
    if ($event.target.value === '') {
      removeNodes(usersList);
      users = await fetchUsers();
      addUsers(users, usersList);
      return;
    }
    timerID = setTimeout(() => {
      fetch(`https://dummyjson.com/users/search?q=${$event.target.value}`)
        .then((data) => data.json())
        .then((value) => {
          removeNodes(usersList);
          users = value.users;
          addUsers(users, usersList);
        })
        .catch(() => {
          removeNodes(main);
          let err = document.createElement('h2');
          err.textContent = 'No users found';
          main.append(err);
        });
    }, 350);
  });
});
function addUser(el, usersList) {
  let userItem = document.createElement('li');
  userItem.innerHTML = `
  <img class="user__img" src="${el.image}" alt="">
  <div class="user-content">
    <div class="user__title">
    ${el.firstName} ${el.lastName}  
    </div>
    <div class="user__subtitle">
    ${el.address.city}, ${el.address.address.replace(/^[^\s]+/, '')}
    </div>
    <div class="user__subtitle">
    ${el.university}
    </div>  
  </div>
  `;
  userItem.id = el.id;
  userItem.className = 'user';
  userItem.addEventListener('click', () => addUserPage(el));
  usersList.append(userItem);
}

function fetchUsers() {
  return fetch('https://dummyjson.com/users')
    .then((data) => data.json())
    .then((users) => users.users);
}
function addUsers(users, usersList) {
  users.forEach((el) => addUser(el, usersList));
}
function removeNodes(parent) {
  let childNodes = parent.childNodes;
  for (let child of childNodes) {
    child.remove();
  }
}
function addUserPage(el) {
  let userPage = document.createElement('section');
  userPage.className = 'userpage';
  userPage.innerHTML = `
  <h1 class="title">${el.firstName} ${el.lastName}</h1>
  <div class="subtitle">email: ${el.email}</div>
  <div class="subtitle">phone number: ${el.phone}</div>
  <div class="subtitle">Birth date: ${el.birthDate}</div>
  <div class="subtitle">Address: ${el.address.city}, ${el.address.address}</div>
  <div class="subtitle">Study in ${el.university}</div>
  <div class="subtitle">Work in ${el.company.name} as <em>${el.company.title}</em> in ${el.company.department} department.</div>
  `;
  document.querySelector('main').remove();
  document.body.append(userPage);
  window.history.pushState(el.id, `${el.firstName} ${el.lastName}`, `/user/${el.username}`);
}
window.onpopstate = (event) => {
  if (event.state === null) {
    document.querySelector('section').remove();
    const usersList = mainPage();
    fetchUsers().then((users) => addUsers(users, usersList));
  }
};
function mainPage() {
  const usersList = document.createElement('ul');
  const main = document.createElement('main');
  const title = document.createElement('h1');
  title.textContent = 'Users';
  title.className = 'title';
  title.style.marginBottom = '26px';
  usersList.className = 'users';

  main.append(title, usersList);
  document.querySelector('.container').append(main);
  return usersList;
}
