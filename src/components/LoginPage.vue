<template>
    <div class="d-grid container-fluid">
      <div class="row">
        <div class="col d-grid justify-content-center align-content-center">
          <a href="../main" class="text text-decoration-none">
            <h1 class="naslov fw-bold">Meally</h1>
          </a>
        </div>
        <div class="col d-grid justify-content-start align-content-center">
          <div class="row-cols-auto">
            <form @submit.prevent="login">
              <div class="col-auto">
                <input v-model="email" type="text" class="mb-3 form-select-lg " id="e-mail" placeholder="e-mail">
              </div>
              <div class="col">
                <input v-model="password" type="password" class="mb-2 form-select-lg text-bg-" id="password" placeholder="Password">
              </div>
              <div class="col">
                <button type="submit" class="btn fw-bold btn-lg gumb">Log in</button>
                <h2>Dont have an account? <a href="../Register" class="text text-decoration-none">Register.</a></h2>
                <h3 class="text-center">Back to <a href="../main" class="text text-decoration-none">main page.</a></h3>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: "",
        password: ""
      }
    },
    methods: {
      async login() {
  try {
    const response = await fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: this.email, password: this.password }),
      credentials: 'include'
    });
    if (response.ok) {
      console.log('Login successful');

      const loginToken = document.cookie.split('; ').find(row => row.startsWith('loginToken')).split('=')[1];
      const username = document.cookie.split('; ').find(row => row.startsWith('username')).split('=')[1];
      const userId = document.cookie.split('; ').find(row => row.startsWith('userId')).split('=')[1];

      localStorage.setItem('username', username);
      localStorage.setItem('loginToken', loginToken);
      localStorage.setItem('userId', userId); 

      this.$router.push('/main');
    } else {
      console.error('Error logging in', await response.text());
    }
  } catch (error) {
    console.error('Network error', error);
  }
}


}
}
  </script>
  
  <style>
  </style>
