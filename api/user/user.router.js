const { createUser, updateUser, getUsers, getUsersById, deleteUser, login} = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validate");

router.post('/', checkToken, createUser);
router.get('/', checkToken, getUsers);
router.get('/:id', checkToken, getUsersById);
router.patch('/', checkToken, updateUser);
router.delete('/:id', checkToken, deleteUser);
router.post('/login', login);

module.exports = router;