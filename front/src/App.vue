<template>
  <div id="app">
    <div v-if="isLoading">Загрузка...</div>
    <div v-else>
      <h1 v-if="this.$store.getters.getAuth">
        Пользователь {{ this.$store.getters.getUser.username }} авторизован
      </h1>
      <div v-else>
        <h1>Авторизуйтесь</h1>
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "./components/LoginForm.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",
  components: {
    LoginForm,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  methods: {
    ...mapActions(["checkAuth"]),
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  async created() {
    if (localStorage.getItem("token")) {
      await this.checkAuth();
    }
    this.isLoading = false;
    console.log(this.$store.getters.getAuth);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
