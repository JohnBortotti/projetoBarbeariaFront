<template>
  <div class="container">
    <button
      type="button"
      class="btn btn-danger col-1 p-1 m-4"
      v-on:click="function(){$router.push('/home')}"
    >Voltar</button>
    <div class="row justify-content-sm-center">
      <form class="w-25" @submit.prevent="postServico(client_id, servico, status, data, horario)">
        <h3 class="mb-5 text-center">Novo Serviço</h3>
        <div class="form-group">
          <label>Cliente ID</label>
          <input
            class="form-control"
            type="number"
            v-model="client_id"
            placeholder="insira o id do cliente"
            required
          />
        </div>
        <div class="form-group">
          <label>Serviço</label>
          <input class="form-control" v-model="servico" placeholder="insira o serviço" required />
        </div>
        <div class="form-group">
          <label for="exampleFormControlSelect1">Stauts</label>
          <select class="form-control" v-model="status" placeholder="agendado ou realizado">
            <option>agendado</option>
            <option>realizado</option>
          </select>
        </div>
        <div class="form-group">
          <label>Data</label>
          <input
            class="form-control"
            v-model="data"
            type="date"
            placeholder="insira o serviço"
            required
          />
        </div>
        <div class="form-group">
          <label>Horario</label>
          <input
            class="form-control"
            v-model="horario"
            type="time"
            placeholder="insira o serviço"
            required
          />
        </div>
        <div class="row justify-content-md-center">
          <!-- button wrapper para centralizar o button na div -->
          <button class="btn btn-primary col-6 m-3">Inserir</button>
          <div
            v-if="success == true"
            class="alert alert-success text-center"
            role="alert"
          >Serviço Registrado</div>
          <div
            v-if="fail == true"
            class="alert alert-danger text-center"
            role="alert"
          >Falha ao registrar serviço</div>
        </div>
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
        if (res.body > 1 || res.status != 200) {
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
div {
  max-width: 100%;
  max-height: 100% !important;
  background-color: rgb(247, 247, 247);
}

@media screen and (max-width: 700px) {
  form {
    margin: 0 10%;
  }
  .w-25 {
    width: 100% !important;
  }
}
.btn-danger {
  width: 100px !important;
  max-width: 100% !important;
}
</style>