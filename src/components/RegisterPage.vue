<template>
  <div class="image"></div>
  <div class="d-grid container-fluid bt-3 mt-3">
    <div class="row d-grid align-content-center justify-content-center">
      <div>
        <router-link to="../" class="text text-decoration-none">
          <h1 class="naslov fw-bold">Meally</h1>
        </router-link>
      </div>
      <form @submit.prevent="register">
        <div>
          <input v-model="username" type="text" class="mb-3 form-select-lg " id="username" placeholder="Username">
        </div>
        <div>
          <input v-model="email" type="text" class="mb-3 form-select-lg " id="e-mail" placeholder="e-mail">
        </div>
        <div>
          <input v-model="password" type="password" class="mb-3 form-select-lg text-bg-" id="password"
            placeholder="Password">
        </div>
        <div>
          <button type="submit" class="mb-3 btn fw-bold btn-lg gumb">Register</button>
        </div>
      </form>
    </div>
    <div class="row">
      <div>
        <h3 class="text-center">Already have an account? <router-link to="/login" class="text text-decoration-none">Log
            in.</router-link></h3>
      </div>
      <div>
        <h3 class="text-center">Back to <router-link to="/" class="text text-decoration-none">main page.</router-link>
        </h3>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async register() {
      let json = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      await fetch(`https://meally-backend.onrender.com/user/register`, {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error(data.message);
          });
        }
      })
      .then((data) => {
        console.log(data);
        this.$router.push('/login');
      })
      .catch((error) => {
        console.error("Error:", error.message);
        alert(error.message);
      });
    }
  }
};
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
