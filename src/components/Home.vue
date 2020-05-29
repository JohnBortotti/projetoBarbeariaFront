<template>
  <div>home</div>
</template>

<script>
export default {
  name: "Home",
  data: function() {
    return {
      baseUrl: "http://localhost:8000/api/"
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
          if (!res.id) { // verifica se há um id na resposta, se não houver, redireciona para o login
            this.$router.push("/");
          }
        });
    }
  },
  mounted: function() {
    this.verifyToken();
  }
};
</script>
