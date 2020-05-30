<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <a class="navbar-brand text-light" href="#">Barbearia</a>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" v-on:click="function(){$router.push('/home')}">Serviços</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link">Clientes</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" v-on:click="logout()">Sair</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Clients",
  data: function() {
    return {
      baseUrl: "http://localhost:8000/api/"
    };
  },
  methods: {
    verifyToken: function() {
      // verifica se existem um token, caso não exista redireciona para a página de login
      fetch(this.baseUrl + "auth/me", {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("Jwt")} ` }
      })
        .then(res => res.json())
        .then(res => {
          if (!res.id) {
            // verifica se há um id na resposta, se não houver, redireciona para o login
            this.$router.push("/");
          }
        });
    },
    logout: async function() {
      // Executa o post na rota logout
      await fetch(this.baseUrl + "auth/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("Jwt")} ` }
      }).then(this.verifyToken); // Executa uma nova verificação do token após a resolução da promise;
    }
  },
  mounted: function() {
    this.verifyToken();
  }
};
</script>

<style scoped>
a {
  cursor: pointer;
}
</style>