<template>
  <div class="container">
    <nav class="navbar">
      <div class="navbar-items">
        <div class="nav-item">
          <img src="../../img/logo.png" id="logo" />
        </div>
        <div class="nav-item">
          <a class="nav-link" v-on:click="function(){$router.push('/home')}">Serviços</a>
        </div>
        <div class="nav-item active">
          <a class="nav-link">Clientes</a>
        </div>
        <div class="nav-item quit">
          <a class="nav-link" v-on:click="logout()">Sair</a>
        </div>
      </div>
    </nav>
    <div class="title-div">CLIENTES</div>
    <div class="buttons-row">
      <button
        type="button"
        v-on:click="function(){$router.push('/Clientsnewform')}"
        id="updateClientButton"
        class="table-button"
      >Novo Cliente</button>
      <button
        type="button"
        v-on:click="function(){$router.push('/clientsupdateform')}"
        id="newClientButton"
        class="table-button"
      >Atualizar Cliente</button>
    </div>
    <div v-if="fail == true" class="error">Não é possivel deletar clientes com serviços registrados!</div>
    <div class="table-div">
      <table class="main-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Controles</th>
          </tr>
          <tr v-for="client in clients" :key="client.id" v-bind:id="client.id">
            <th>{{ client.id }}</th>
            <th>{{ client.name }}</th>
            <th>{{ client.phone }}</th>
            <th>{{ client.email }}</th>
            <th>
              <div class="table-controlers-div">
                <button
                  v-on:click.prevent="deleteClient(client.id)"
                  type="button"
                  class="table-controler"
                  style="margin-right: 10px"
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
  name: "Clients",
  data: function() {
    return {
      baseUrl: "http://localhost:8000/api/",
      clients: [],
      fail: false
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
    },
    deleteClient: async function(id) {
      await fetch(this.baseUrl + `client/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("Jwt")} ` }
      }).then(res => {
        if (res.status == 500) {
          this.fail = true;
        } else {
          this.fetchClients();
        }
      });
    }
  },
  mounted: function() {
    this.verifyToken();
    this.fetchClients();
  }
};
</script>

<style scoped>
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

.error {
  color: rgb(207, 89, 89);
  margin-bottom: 10px;
  font-family: "Poppins", sans-serif;
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

@media screen and (max-width: 768px) {
  .table-button {
    margin: 20px 5px;
  }

  .error {
    text-align: center;
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