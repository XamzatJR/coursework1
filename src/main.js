const usersList = document.querySelector('.users');
const searchBar = document.querySelector('#search-bar');
let timerID = null;
document.addEventListener('DOMContentLoaded', async () => {
  let users = await fetchUsers();
  addUsers(users);
});
function addUser(el) {
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
  usersList.append(userItem);
}

function fetchUsers() {
  return fetch('https://dummyjson.com/users')
    .then((data) => data.json())
    .then((users) => users.users);
}
function addUsers(users) {
  users.forEach((el) => addUser(el));
}
function removeUsers(parent) {
  let childNodes = parent.childNodes;
  for (let child of childNodes) {
    child.remove();
  }
}
