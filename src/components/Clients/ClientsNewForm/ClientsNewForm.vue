<template>
  <div class="container">
    <button
      type="button"
      class="back-button"
      v-on:click="function(){$router.push('/clients')}"
    >Voltar</button>
    <h3 class="title">Novo Cliente</h3>
    <div class="form-div">
      <form class="form" @submit.prevent="updateClient(name, phone, email)">
        <div class="form-input">
          <label>Nome</label>
          <input class="form-input input" v-model="name" placeholder="insira o nome" required />
        </div>
        <div class="form-input">
          <label>Telefone</label>
          <input class="form-input input" v-model="phone" placeholder="insira o telefone" required />
        </div>
        <div class="form-input">
          <label>Email</label>
          <input class="form-input input" v-model="email" placeholder="insira o email" required />
        </div>
        <button class="form-button">Cadastrar</button>
        <div v-if="success == true" class="success">Cliente Cadastrado</div>
        <div v-if="fail == true" class="error">Falha ao cadastrar cliente</div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Clientsnewform",
  data: function() {
    return {
      name: null,
      phone: null,
      email: null,
      success: null,
      fail: null
    };
  },
  methods: {
    updateClient: function(name, phone, email) {
      fetch(`http://localhost:8000/api/client`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Jwt")} `,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          phone: phone,
          email: email
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