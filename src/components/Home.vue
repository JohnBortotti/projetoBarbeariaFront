<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <a class="navbar-brand text-light" href="#">Barbearia</a>
      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" href="#">Serviços</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Clientes</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" v-on:click="logout()">Sair</a>
        </li>
      </ul>
    </nav>
    <h4 class="p-5 text-center text-secondary">Serviços</h4>
    <div class="row justify-content-md-center">
      <!--- button center wrapper -->
      <button
        type="button"
        v-on:click="function(){$router.push('/servicesform')}"
        id="novoServicoButton"
        class="btn btn-primary col-2 mb-4"
      >Novo Serviço</button>
    </div>
    <!--- redireciona para o ServicosForm -->
    <div class="row justify-content-md-center spacearound mt-4 mb-3 align-items-baseline" id="filterRow">
      <p>Filtrar por:</p>
      <form class="form-inline col-md-5" id="filterForm">
        <select class="form-control mr-1 w-25 formInput">
          <option>Todos</option>
          <option>cliente</option>
          <option>profissional</option>
          <option>serviço</option>
          <option>status</option>
          <option>data</option>
          <option>horario</option>
        </select>
        <input class="form-control w-50 mr-2 formInput" />
        <button type="button" class="btn btn-dark formInput">Aplicar</button>
      </form>
    </div>
    <div class="table-responsive-sm">
      <table class="table w-75 mx-auto table-dark">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Cliente</th>
            <th scope="col">Profissional</th>
            <th scope="col">Serviço</th>
            <th scope="col">Status</th>
            <th scope="col">Data</th>
            <th scope="col">Horário</th>
            <th scope="col">Controles</th>
          </tr>
          <tr v-for="service in services" :key="service.id" v-bind:id="service.id">
            <th scope="col">{{ service.id }}</th>
            <th scope="col">{{ service.client_name }}</th>
            <th scope="col">{{ service.user_name }}</th>
            <th scope="col">{{ service.servico }}</th>
            <th scope="col">{{ service.status }}</th>
            <th scope="col">{{ service.data}}</th>
            <th scope="col">{{service.horario}}</th>
            <th scope="col">
              <div>
                <button
                  v-on:click.prevent="doneService(service.id)"
                  type="button"
                  class="btn btn-sm btn-success"
                  style="margin-right: 10px"
                >Concluido</button>
                <button
                  v-on:click.prevent="deleteService(service.id)"
                  type="button"
                  class="btn btn-sm btn-danger"
                >Deletar</button>
              </div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: function() {
    return {
      baseUrl: "http://localhost:8000/api/",
      services: [],
      filtro: null
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
    fetchServices: function() {
      // Busca todos os
      fetch(this.baseUrl + "service", {
        headers: { Authorization: `Bearer ${localStorage.getItem("Jwt")} ` }
      })
        .then(res => res.json())
        .then(res => (this.services = res)); // Adiciona o array da resosta como valor no services
    },
    deleteService: async function(id) {
      await fetch(this.baseUrl + `service/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("Jwt")} ` }
      }).then(this.fetchServices);
    },
    doneService: async function(id) {
      await fetch(this.baseUrl + `service/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Jwt")} `,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: "realizado"
        })
      }).then(this.fetchServices);
    }
  },
  mounted: function() {
    this.verifyToken();
    this.fetchServices();
  }
};
</script>

<style scoped>
div {
  max-width: 100%;
}
nav {
  width: 100%;
}

a {
  cursor: pointer;
}

@media screen and (max-width: 920px) {
  .row {
    margin: 0px;
  }
  #novoServicoButton {
    flex: none;
    max-width: 80%;
    margin: 0 auto;
  }
  #filterForm {
    flex-direction: column;
    align-items: flex-start;
  }
  .formInput {
    width: 100% !important;
    margin: 4px 0;
  }
}
</style>