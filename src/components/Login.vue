<template>
  <div class="container">
    <nav class="navbar bg-dark text-light">
      <a class="navbar-brand text-light" href="#">Barbearia
      </a>
    </nav>
    <form class="col-md-5">
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
        v-on:click.prevent="fetchLogin(name, password)"
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
      baseUrl: "http://localhost:8000/",
      name: null,
      password: null,
      incorrectLogin: false
    };
  },
  methods: {
    fetchLogin: function(name, password) {
      fetch(this.baseUrl + "api/auth/login", {
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
            console.log("Token encontrado");
            this.incorrectLogin = false;
          } else {
            this.incorrectLogin = true;
          }
        });
    }
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
