<template>
  <div class="container">
    <nav class="navbar bg-dark text-light">
      <a class="navbar-brand text-light" href="#">Barbearia
      </a>
    </nav>
    <form class="col-md-5" @submit.prevent="fetchLogin(name, password)">
      <p class="h4 mb-4 text-center">Login</p>
      <input
        v-model="name"
        type="text"
        class="form-control form-control-sm mb-2"
        placeholder="Nome"
        required
      />
      <input
        v-model="password"
        type="password"
        class="form-control form-control-sm mb-2"
        placeholder="Senha"
        required
      />
      <button
        class="btn btn-info btn-block my-4 btn-dark"
        >Logar</button>
      <div v-if="incorrectLogin == true" class="alert alert-danger text-center" role="alert">Login Incorreto</div>
    </form>
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
            localStorage.setItem('Jwt', res.access_token);
            this.$router.push('/home');
          } else {
            this.incorrectLogin = true;
          }
        });
    }
  },
  mounted: function() {
    this.verifyToken()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
}

nav {
  position: absolute;
  top: 0;
  width: 100%;
}

@media screen and (max-height: 400px) { /* Oculta a Navbar caso a altura diminua mto, para não quebrar com o form do login */
  nav { 
    display: none;
  }
}
</style>
