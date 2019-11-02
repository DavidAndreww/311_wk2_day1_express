const { users } = require("../state");

function user(req, res) {
  return res.json(users);
}

function singleUser(req, res) {
  let user = users.find(user => user._id === parseInt(req.params.id));
  return res.json(user);
}

function userPost(req, res) {
  const newUser = {
    _id: req.body._id,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar
  };
  users.push(newUser);
  res.json(users);
}

function putUser(req, res) {
  const found = users.some(user => user._id === parseInt(req.params.id));

  if (found) {
    const updateUser = req.body;
    users.forEach(user => {
      if (user._id === parseInt(req.params.id)) {
        user.name = updateUser.name ? updateUser.name : user.name;
        user.occupation = updateUser.occupation
          ? updateUser.occupation
          : user.occupation;
        user.avatar = updateUser.avatar ? updateUser.avatar : user.avatar;

        res.json({ msg: "User updated successfully", user });
      }
    });
  }
}

function deleteUser(req, res) {
  const found = users.some(user => user._id === parseInt(req.params.id));

  if (found) {
    let user = users.find(user => user._id === parseInt(req.params.id));
    user.isActive = false;
    res.json({
      Message: "User Deleted",
      user
    });
  }
}

module.exports = { user, singleUser, userPost, putUser, deleteUser};