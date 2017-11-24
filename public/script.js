function submitRegisterForm(e) {
  e.preventDefault();

  var form = document.getElementById('registerForm');
  var formData = new FormData(form);

  fetch('/register', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: formData.get('name'),
      password: formData.get('password')
    })
  })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function submitLoginForm(e) {
  e.preventDefault();

  var form = document.getElementById('loginForm');
  var formData = new FormData(form);

  fetch('/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: formData.get('name'),
      password: formData.get('password')
    })
  })
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(token) {
      console.log(token);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function getUsers() {
  fetch('/users', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(users) {
      console.log(users);
    });
}
