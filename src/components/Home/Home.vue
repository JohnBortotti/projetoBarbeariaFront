<template>
  <div class="container">
    <nav class="navbar">
      <div class="navbar-items">
        <div class="nav-item">
          <img src="../../img/logo.png" id="logo" />
        </div>
        <div class="nav-item active">
          <a class="nav-link">Serviços</a>
        </div>
        <div class="nav-item">
          <a class="nav-link" v-on:click="function(){$router.push('/clients')}">Clientes</a>
        </div>
        <div class="nav-item quit">
          <a class="nav-link" v-on:click="logout()">Sair</a>
        </div>
      </div>
    </nav>
     <div v-if="enviado == true || concluido == true || deletado == true" id="overlay"></div>
    <div v-if="enviado == true" class="notification-alert">
      <span class="closebtn" v-on:click.prevent="enviado = false" onclick="this.parentElement.style.display='none';">&times;</span>
      Email de confirmação enviado com sucesso!
    </div>
    <div v-if="deletado == true" class="delete-alert">
      <span class="closebtn" v-on:click.prevent="deletado = false" onclick="this.parentElement.style.display='none';">&times;</span>
      Serviço deletado com sucesso
    </div>
    <div v-if="concluido == true" class="done-alert">
      <span class="closebtn" v-on:click.prevent="concluido = false" onclick="this.parentElement.style.display='none';">&times;</span>
      Status do serviço alterado para realizado
    </div>
    <div class="title-div">HOME PAGE</div>
    <div class="buttons-row">
      <button
        type="button"
        v-on:click="function(){$router.push('/servicesform')}"
        id="novoServicoButton"
        class="table-button"
      >Novo Serviço</button>
      <button
        type="button"
        v-on:click="function(){$router.push('/servicesupdateform')}"
        id="updateServicoButton"
        class="table-button"
      >Atualizar Serviço</button>
    </div>
    <!--- redireciona para o ServicosForm -->
    <div class="filters-row">
      <p class="filters-title">
        Filtrar
        <br />Serviços
      </p>
      <form class="filters-form" id="filterForm">
        <select class="filter-input" id="filter-input-options" v-model="filter">
          <option>Todos</option>
          <option value="clients.name">Cliente</option>
          <option value="users.name">Profissional</option>
          <option value="servico">Serviço</option>
          <option value="status">Status</option>
          <option value="data">Data</option>
          <option value="horario">Horario</option>
        </select>
        <input v-model="filterValue" class="filter-input" id="filter-input-value" />
        <button
          v-on:click.prevent="filterService(filter, filterValue)"
          type="button"
          class="filter-button"
        >Aplicar</button>
      </form>
    </div>
    <div class="services-counter">{{services.length}} SERVIÇOS</div>
    <div class="table-div">
      <table class="main-table">
        <thead>
          <tr>
            <th>Serviço ID</th>
            <th>Cliente</th>
            <th>Profissional</th>
            <th>Serviço</th>
            <th>Status</th>
            <th>Data</th>
            <th>Horário</th>
            <th>Controles</th>
          </tr>
        </thead>
        <tr v-for="service in services" :key="service.id" v-bind:id="service.id">
          <th>{{ service.id }}</th>
          <th>{{ service.client_name }}</th>
          <th>{{ service.user_name }}</th>
          <th>{{ service.servico }}</th>
          <th
            v-bind:class="{ realizado: service.status == 'realizado', agendado:  service.status == 'agendado'}"
          >{{ service.status }}</th>
          <th>{{ service.data}}</th>
          <th>{{service.horario}}</th>
          <th>
            <div class="table-controlers-div">
              <button
                class="table-controler"
                ref="myButton"
                v-on:click.prevent="notifyClient(service.id); enviado = true"
              >Notificar</button>
              <button class="table-controler" v-on:click.prevent="doneService(service.id); concluido = true">Concluido</button>
              <button class="table-controler" v-on:click.prevent="deleteService(service.id); deletado = true">Deletar</button>
            </div>
          </th>
        </tr>
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
      filter: null,
      filterValue: null,
      deletado: false,
      concluido: false,
      enviado: false
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
    },
    notifyClient: function(id) {
      fetch(this.baseUrl + `email/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Jwt")} `,
          "Content-Type": "application/json"
        }
      });
    },
    filterService: async function(filter, value) {
      if (this.filter == "Todos") {
        this.fetchServices();
      } else {
        await fetch(this.baseUrl + `service/search/${filter}/${value}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Jwt")} `,
            "Content-Type": "application/json"
          }
        })
          .then(res => res.json())
          .then(res => (this.services = res));
      }
    }
  },
  mounted: function() {
    this.verifyToken();
    this.fetchServices();
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Smythe&display=swap");

.container {
  display: flex;
  height: 100%;
  color: white;
  background: url("../../img/skull.png") rgb(17, 16, 16);
  background-position: start;
  background-repeat: no-repeat;
  background-blend-mode: multiply;
  background-size: 600px;
  flex-direction: column;
  align-items: center;
}

.navbar {
  display: flex;
  background-color: rgb(22, 22, 26);
  width: 100%;
  height: 8%;
}

#logo {
  width: 40px;
}

.navbar-items {
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  padding: 10px;
  display: flex;
  align-items: center;
  color: white;
}

.nav-item {
  margin: 0 10px;
}

.active {
  cursor: default;
  color: #7f5e35;
}
.quit {
  background-color: #a07541;
  padding: 0 25px;
  border-radius: 20px;
}

.title-div {
  font-family: "Smythe", cursive;
  display: flex;
  font-weight: 600;
  align-items: center;
  margin-bottom: 40px;
  width: 90%;
  height: 10%;
  font-size: 40px;
}
.buttons-row {
  display: flex;
  width: 100%;
  justify-content: center;
}

.table-button {
  transition: 0.3s;
  margin-right: 20px;
  margin-bottom: 50px;
  width: 160px;
  padding: 12px 18px;
  background-color: rgba(0, 0, 0, 0);
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 16px;
  color: #a07541;
  border: 2px solid #a07541;
  cursor: pointer;
}

.table-button:hover {
  background-color: #a07541;
  color: white;
}

.filters-row {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 160px;
  background-color: #bd9557;
  margin-bottom: 40px;
  background: url("../../img/overlayBackground.png");
  background-position: center;
  background-size: cover;
}

.filters-title {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 26px;
  color: rgb(255, 255, 255);
  font-weight: 700;
}

.filters-form {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  margin-left: 90px;
}

.filter-input {
  background-color: rgba(0, 0, 0, 0);
  border: 2px solid white;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: white;
  padding: 5px 30px;
  border-radius: 5px;
  margin-right: 15px;
}

.filter-button {
  cursor: pointer;
  transition: 0.3s;
  color: black;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: white;
  padding: 8px 40px;
  border-radius: 5px;
  border: none;
}

.filter-button:hover {
  background-color: rgb(228, 222, 222);
}

.services-counter {
  font-family: "Smythe", cursive;
  font-weight: 400;
  color: white;
  font-size: 30px;
  margin-bottom: 15px;
}

.table-div {
  border: 2px solid rgb(105, 85, 48);
  width: 80%;
  padding: 6px;
  overflow: scroll;
  margin-bottom: 20px;
}

.main-table {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  width: 100%;
  font-size: 17px;
  border-collapse: collapse;
  color: white;
}

thead {
  font-size: 18px;
}

th,
tr {
  border-bottom: 1px solid #ddd;
  height: 50px;
}

.realizado {
  background-color: rgb(73, 196, 83);
  color: rgb(13, 92, 13);
}

.agendado {
  background-color: rgb(210, 216, 211);
  color: rgb(22, 24, 22);
}

.enviado {
  color: rgb(73, 196, 83);
  font-family: sans-serif;
  margin: 15px 0;
}

.table-controlers-div {
  display: flex;
  justify-content: center;
}

.table-controler {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: rgba(0, 0, 0, 0);
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  cursor: pointer;
  color: white;
  border: 1px solid white;
  border: solid;
  width: 90px;
  height: 35px;
  margin: 0 6px;
  transition: 0.3s;
}

.table-controler:hover {
  background-color: rgb(129, 96, 35);
  color: black;
}

.notification-alert, .delete-alert, .done-alert {
  z-index: 3;
  position: absolute;
  font-family: sans-serif;
  top: 50%;
  padding: 30px;
  background-color: #18c259;
  color: white;
}

.delete-alert {
  background-color: rgb(218, 66, 66);
}

.closebtn {
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.closebtn:hover {
  color: rgb(179, 179, 179);
}

#overlay {
  position: fixed; /* Sit on top of the page content */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5); /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer; /* Add a pointer on hover */
}

@media screen and (max-width: 768px) {
  .table-button {
    margin: 20px 5px;
  }
  .filters-title {
    font-size: 18px;
  }
  #filter-input-value {
    width: 40%;
  }
  #filter-input-options {
    width: 80%;
  }

  .filters-form {
    margin-left: 30px;
  }
}

@media screen and (max-width: 400px) {
  .navbar {
    height: 20%;
  }
  .navbar-items {
    display: inline-block;
  }
}
</style>