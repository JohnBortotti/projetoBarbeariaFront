<template>
  <div class="content">
    <div class="login-div">
      <img src="../../img/logo.png" class="logo" />
      <form class="login-form" @submit.prevent="fetchLogin(name, password)">
        <input v-model="name" type="text" class="form-input" placeholder="Nome" required />
        <input v-model="password" type="password" class="form-input" placeholder="Senha" required />
        <button class="form-button">Logar</button>
        <div
          v-if="incorrectLogin == true"
          class="incorrect-login"
        >Login Incorreto</div>
      </form>
    </div>
    <div class="right-div"></div>
  </div>
</template>


<script>
export default {
  name: "Login",
  data: function() {
    return {
      baseUrl: "http://localhost:8000/api/",
      name: null,
      password: null,
      incorrectLogin: false
    };
  },
  methods: {
    verifyToken: function() {
      // verifica se existem um token, caso exista redireciona para a home
      fetch(this.baseUrl + "auth/me", {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("Jwt")} ` }
      })
        .then(res => res.json())
        .then(res => {
          if (res.id) {
            // verifica se há um id na resposta, se houver, redireciona para a home
            this.$router.push("/home");
          }
        });
    },
    fetchLogin: function(name, password) {
      fetch(this.baseUrl + "auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          password: password
        })
      })
        .then(res => res.json())
        .then(res => {
          if (res.access_token) {
            this.incorrectLogin = false;
            localStorage.setItem("Jwt", res.access_token);
            this.$router.push("/home");
          } else {
            this.incorrectLogin = true;
          }
        });
    }
  },
  mounted: function() {
    this.verifyToken();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');

.content {
  display: flex;
  width: 100%;
  height: 100%;
}

.login-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  background-color: rgb(22, 22, 26);
}

.logo {
  width: 50%;
}

.login-form {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
}

.login-title {
  color: white;
  font-size: 1.2em;
}

.form-input {
  padding: 8px 10px;
  width: 86%;
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.137);
  border: none;
  border-radius: 5px;
  color: white;
  border: solid 2px rgba(34, 34, 32, 0.616);
  transition: 0.3s;
}
.form-input:focus {
  width: 90%;
}

.form-button {
  font-family: sans-serif;
  border: none;
  border-radius: 10px;
  padding: 10px;
  width: 60%;
  color: black;
  margin-top: 20px;
  margin-bottom: 40px;
  background-color: white;
  transition: 0.3s;
  cursor: pointer;
}

.form-button:hover {
  background-color: rgb(218, 218, 218);
}

.incorrect-login {
  font-family: 'Poppins', sans-serif;
  color: rgb(240, 78, 78);
}

.right-div {
  width: 80%;
  background: url("../../img/loginBackground.jpg") rgba(0, 0, 0, 0.884);
  background-blend-mode: multiply;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

@media screen and (max-width: 768px) {
  .login-div {
    width: 100%;
  }
  .right-div {
    display: none;
  }
}
</style>
