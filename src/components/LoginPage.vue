<template>
  <div class="image"></div>
  <div class="d-grid container-fluid">
    <div class="row">
      <div class="col d-grid justify-content-center align-content-center">
        <router-link to="../main" class="text text-decoration-none">
          <h1 class="naslov fw-bold">Meally</h1>
        </router-link>
      </div>
      <div class="col d-grid justify-content-start align-content-center">
        <div class="row-cols-auto">
          <form @submit.prevent="login">
            <div class="col-auto">
              <input v-model="email" type="text" class="mb-3 form-select-lg " id="e-mail" placeholder="e-mail">
            </div>
            <div class="col">
              <input v-model="password" type="password" class="mb-2 form-select-lg text-bg-" id="password"
                placeholder="Password">
            </div>
            <div class="col">
              <button type="submit" class="btn fw-bold btn-lg gumb">Log in</button>
              <h2>Dont have an account? <router-link to="/register"
                  class="text text-decoration-none">Register.</router-link></h2>
              <h3 class="text-center">Back to <router-link to="/main" class="text text-decoration-none">main
                  page.</router-link></h3>
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
        const response = await fetch('https://meally-backend.onrender.com/user/login', {
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
          alert("Wrong email or password")
          console.error('Error logging in', await response.text());
        }
      } catch (error) {
        console.error('Network error', error);
      }
    }


  }
}
</script>
  
<style scoped>
.container-fluid {
  min-height: 600px;
}

.image {
  background-image: url(../assets/1.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.naslov {
  font-size: 100px;
  font-weight: 100;
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
  color: #ff6f00;
  font-family: 'Brush Script MT';
}

.text {
  color: #a34700;
}

.text:hover {
  color: #ff7b169e;
  transition: 0.7s;
}

.gumb {
  border-radius: 40px;
  background-color: #ff6f00;
  border-color: black;
  box-shadow: 0px 0px 2px 2px black;
}

.gumb:hover {
  background-color: #ff7b169e;
  transition: 0.7s;
}
</style>