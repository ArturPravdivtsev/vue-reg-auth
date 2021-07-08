<template>
  <div>
    <input v-model="username" type="text" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="onLogin">Вход</button>
    <button @click="onRegister">Регистрация</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["login", "registration"]),
    onLogin() {
      const { username, password } = this;
      this.login({ username, password });
    },
    onRegister() {
      const { username, password } = this;
      this.registration({ username, password} );
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
