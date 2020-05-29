<template>
  <div>
    <form class="w-25">
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
      <button class="btn btn-primary d-flex">Inserir</button>
    </form>
  </div>
</template>