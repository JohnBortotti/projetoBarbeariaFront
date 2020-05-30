<template>
  <div class="container">
    <button
      type="button"
      class="btn btn-danger col-1 p-1 m-4"
      v-on:click="function(){$router.push('/home')}"
    >Voltar</button>
    <div class="row justify-content-sm-center">
      <form class="w-25" @submit.prevent="updateClient(client_id, name, phone), email">
        <h3 class="mb-5 text-center">Novo Cliente</h3>
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
          <label>Nome</label>
          <input class="form-control" v-model="name" placeholder="insira o nome" />
        </div>
        <div class="form-group">
          <label>Telefone</label>
          <input class="form-control" v-model="phone" placeholder="insira o telefone" />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input class="form-control" v-model="email" placeholder="insira o email" />
        </div>
        <div class="row justify-content-md-center">
          <!-- button wrapper para centralizar o button na div -->
          <button class="btn btn-primary col-6 m-3">Atualizar</button>
          <div
            v-if="success == true"
            class="alert alert-success text-center"
            role="alert"
          >Cliente Atualizado</div>
          <div
            v-if="fail == true"
            class="alert alert-danger text-center"
            role="alert"
          >Falha ao atualizar cliente</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Clientsupdateform",
  data: function() {
    return {
      client_id: null,
      name: null,
      phone: null,
      email: null,
      success: null,
      fail: null
    };
  },
  methods: {
    updateClient: function(client_id, name, phone, email) {
      fetch(`http://localhost:8000/api/client/${client_id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Jwt")} `,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          client_id: client_id,
          name: name,
          phone: phone,
          email: email
        })
      });
    }
  }
};
</script>