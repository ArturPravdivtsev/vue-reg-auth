<template>
  <div>
    <v-alert dense outlined type="error" v-if="message">
      {{ message }}
    </v-alert>
    <v-tabs>
      <v-tab>Войти</v-tab>
      <v-tab>Зарегистрироваться</v-tab>
      <v-tab-item>
        <v-card flat>
          <v-text-field
            v-model="username"
            type="text"
            label="Username"
            placeholder="Username"
          ></v-text-field>
          <v-text-field
            v-model="password"
            type="password"
            label="Password"
            placeholder="Password"
          ></v-text-field>
          <v-btn color="accent" @click="onLogin">Вход</v-btn>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-text-field
            v-model="username"
            type="text"
            label="Username"
            placeholder="Username"
          ></v-text-field>
          <v-text-field
            v-model="password"
            type="password"
            label="Password"
            placeholder="Password"
          ></v-text-field>
          <v-btn color="accent" @click="onRegister">Регистрация</v-btn>
        </v-card>
      </v-tab-item>
    </v-tabs>
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
      message: "",
    };
  },
  methods: {
    ...mapActions(["login", "registration"]),
    async onLogin() {
      const { username, password } = this;
      const message = await this.login({ username, password });
      this.message = message;
    },
    async onRegister() {
      const { username, password } = this;
      const message = await this.registration({ username, password });
      this.message = message;
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
