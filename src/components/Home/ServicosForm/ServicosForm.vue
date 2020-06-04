<template>
  <div class="container">
    <button type="button" class="back-button" v-on:click="function(){$router.push('/home')}">Voltar</button>
    <h3 class="title">Novo Serviço</h3>
    <div class="form-div">
      <form class="form" @submit.prevent="postServico(client_id, servico, status, data, horario)">
        <div class="form-input">
          <label>Cliente ID</label>
          <input
            class="form-input input"
            type="number"
            v-model="client_id"
            placeholder="insira o id do cliente"
            required
          />
        </div>
        <div class="form-input">
          <label>Serviço</label>
          <input class="form-input input" v-model="servico" placeholder="insira o serviço" required />
        </div>
        <div class="form-input">
          <label>Status</label>
          <select class="form-input input" v-model="status" placeholder="agendado ou realizado">
            <option>agendado</option>
            <option>realizado</option>
          </select>
        </div>
        <div class="form-input">
          <label>Data</label>
          <input
            class="form-input input"
            v-model="data"
            type="date"
            placeholder="insira o serviço"
            required
          />
        </div>
        <div class="form-input">
          <label>Horario</label>
          <input
            class="form-input input"
            v-model="horario"
            type="time"
            placeholder="insira o serviço"
            required
          />
        </div>
        <button class="form-button">Inserir</button>
        <div v-if="success == true" class="success" role="alert">Serviço Registrado</div>
        <div v-if="fail == true" class="error">Cliente ID não encontrado</div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ServicosForm",
  data: function() {
    return {
      client_id: null,
      servico: null,
      status: null,
      data: null,
      horario: null,
      success: false,
      fail: false
    };
  },
  methods: {
    postServico: function(client_id, servico, status, data, horario) {
      fetch("http://localhost:8000/api/service", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Jwt")} `,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          client_id: client_id,
          servico: servico,
          status: status,
          data: data,
          horario: horario
        })
      }).then(res => {
        if (res.status != 201) {
          this.fail = true;
          this.success = false;
        } else {
          this.success = true;
          this.fail = false;
        }
      });
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(17, 16, 16);
  height: 100%;
  background: url("../../../img/skull.png") rgb(17, 16, 16);
  background-position: start;
  background-repeat: no-repeat;
  background-blend-mode: multiply;
  background-size: 600px;
}

.back-button {
  margin: 40px 60px;
  align-self: flex-start;
  background-color: #a07541;
  padding: 10px 38px;
  border-radius: 20px;
  border: none;
  color: white;
  cursor: pointer;
  transition: 0.3s;
}

.back-button:hover {
  background-color: #be8f54;
}

.title {
  color: white;
  font-family: "Smythe", cursive;
  font-size: 3em;
  margin-bottom: 20px;
  border-bottom: 1px solid white;
}

.form-div {
  width: 60%;
  height: 50%;
}

.form {
  margin-top: 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: sans-serif;
  font-size: 16px;
}

label {
  margin-right: 20px;
}

.form-input {
  font-family: "Smythe", cursive;
  font-size: 24px;
  color: white;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(17, 16, 16, 0);
}

.input {
  font-family: "Smythe", cursive;
  font-size: 18px;
  background-color: rgb(17, 16, 16);
  border: 2px solid white;
  padding: 4px 18px;
  border-radius: 4px;
}

.form-button {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 16px;
  cursor: pointer;
  margin-top: 30px;
  padding: 10px 64px;
  border: none;
  border-radius: 8px;
  transition: 0.3s;
}

.form-button:hover {
  padding: 10px 74px;
}

.error {
  margin-top: 20px;
  color: rgb(223, 70, 70);
  font-family: "Poppins", sans-serif;
}

.success {
  margin-top: 20px;
  color: rgb(112, 218, 86);
  font-family: "Poppins", sans-serif;
}
</style>