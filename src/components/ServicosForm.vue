<template>
  <div class="container">
    <button type="button" class="btn btn-danger col-1 p-1 m-4">Voltar</button>
    <div class="row justify-content-sm-center">
      <form class="w-25">
        <h3 class="mb-5 text-center">Novo Serviço</h3>
        <div class="form-group">
          <label>Cliente ID</label>
          <input class="form-control" placeholder="insira o id do cliente" required />
        </div>
        <div class="form-group">
          <label>Serviço</label>
          <input class="form-control" placeholder="insira o serviço" required />
        </div>
        <div class="form-group">
          <label>Status</label>
          <input class="form-control" placeholder="insira o serviço" required />
        </div>
        <div class="form-group">
          <label>Data</label>
          <input class="form-control" type="date" placeholder="insira o serviço" required />
        </div>
        <div class="form-group">
          <label>Horario</label>
          <input class="form-control" type="time" placeholder="insira o serviço" required />
        </div>
        <div class="row justify-content-md-center">
          <!-- button wrapper para centralizar o button na div -->
          <button class="btn btn-primary col-6">Inserir</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
div {
  max-width: 100%;
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