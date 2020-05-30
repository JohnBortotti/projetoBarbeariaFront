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
    <h4 class="p-5 text-center text-secondary">Clientes</h4>
    <div class="row justify-content-md-center">
      <!--- button center wrapper -->
      <button
        type="button"
        v-on:click="function(){$router.push('/clientesnewform')}"
        id="novoServicoButton"
        class="btn btn-success col-2 mb-4 mr-2"
      >Novo Cliente</button>
      <button
        type="button"
        v-on:click="function(){$router.push('/clientsupdateform')}"
        id="novoServicoButton"
        class="btn btn-info col-2 mb-4"
      >Atualizar Cliente</button>
    </div>
    <div class="table-responsive-sm">
      <table class="table w-75 mx-auto table-dark">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Telefone</th>
            <th scope="col">Email</th>
          </tr>
          <tr v-for="client in clients" :key="client.id" v-bind:id="client.id">
            <th scope="col">{{ client.id }}</th>
            <th scope="col">{{ client.name }}</th>
            <th scope="col">{{ client.phone }}</th>
            <th scope="col">{{ client.email }}</th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Clients",
  data: function() {
    return {
      baseUrl: "http://localhost:8000/api/",
      clients: []
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
    },
    fetchClients: async function() {
      fetch(this.baseUrl + "client", {
        headers: { Authorization: `Bearer ${localStorage.getItem("Jwt")} ` }
      })
        .then(res => res.json())
        .then(res => (this.clients = res));
    }
  },
  mounted: function() {
    this.verifyToken();
    this.fetchClients();
  }
};
</script>

<style scoped>
div {
    max-width: 100%;
}
a {
  cursor: pointer;
}
</style>