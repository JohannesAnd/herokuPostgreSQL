const { Router } = require('express');
const { mainController, authController } = require('./controllers');

module.exports = () => {
  const router = Router();

  router.get('/', mainController.getIndex);

  router.post('/register', authController.registerUser);
  router.post('/login', authController.loginUser);
  router.get('/users', authController.getUsers);

  return router;
};
