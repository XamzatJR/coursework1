const usersList = document.querySelector('.users');
document.addEventListener('DOMContentLoaded', async () => {
  let users = await fetch('https://dummyjson.com/users')
    .then((data) => data.json())
    .then((users) => users.users);
  users.map((el) => addUser(el));
});
function addUser(el) {
  let userItem = document.createElement('li');
  userItem.textContent = `${el.firstName} ${el.lastName}`;
  userItem.id = el.id;
  usersList.append(userItem);
}
