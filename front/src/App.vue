<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center"></div>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <Loader v-if="isLoading" />
          <div v-else>
            <h1 v-if="this.$store.getters.getAuth">
              Пользователь
              {{ this.$store.getters.getUser.username }} авторизован
            </h1>
            <div v-else>
              <h1>Авторизуйтесь</h1>
              <LoginForm />
            </div>
          </div>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import LoginForm from "./components/LoginForm.vue";
import Loader from "./components/Loader.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",
  components: {
    LoginForm,
    Loader,
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
