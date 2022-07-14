<template>
  <div class="home container">
    <div class="row mt-5">
      <div class="col-lg-6">
        <div class="card">
          <h2 class="text-center mb-2">Login</h2>
          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitForm">
              <div class="form-row">
                <input
                  type="text"
                  class="form-control shadow-none p-2 mt-2"
                  v-bind:class="{ 'is-invalid': nameServerError }"
                  id="name"
                  placeholder="Username"
                  v-model="username"
                />
                <div
                  id="feedtwo"
                  class="invalid-feedback"
                  v-if="nameServerErrorMessage"
                >
                  {{ nameServerErrorMessage }}
                </div>
                <div class="input-group">
                  <input
                    type="password"
                    class="form-control shadow-none p-2 mt-2"
                    v-bind:class="{
                      'is-invalid': passwordServerError,
                    }"
                    id="password"
                    placeholder="Password"
                    aria-describedby="inputGroupPrepend3"
                    v-model="password"
                  />
                  <div
                    id="feedthree"
                    class="invalid-feedback"
                    v-if="passwordServerErrorMessage"
                  >
                    {{ passwordServerErrorMessage }}
                  </div>
                </div>
              </div>
              <button class="btn btn-dark w-100 mt-2 shadow-none">LOGIN</button>
            </form>
          </div>
          <small class="text-center mt-3"
            >I already have not an account.
            <router-link class="" to="/signup">Create account </router-link>
            here
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
      errors: [],
    };
  },
  mounted() {
    document.title = "Login";
    if (this.$store.state.isAuthenticated) {
      const toPath = this.$route.query.to || "/";
      this.$router.push(toPath);
    }
  },
  methods: {
    async submitForm() {
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("token");
      const formData = {
        username: this.username,
        password: this.password,
      };

      await axios
        .post("/api/v1/token/login/", formData)
        .then((response) => {
          const token = response.data.auth_token;
          this.$store.commit("setToken", token);

          axios.defaults.headers.common["Authorization"] = "Token " + token;
          localStorage.setItem("token", token);
          const toPath = this.$route.query.to || "/cart";
          this.$router.push(toPath);
        })
        .catch((error) => {
          if (error.response) {
            for (const property in error.response.data) {
              if (property == "non_field_errors" && error.response.data[property] == "Unable to log in with provided credentials.") {
                this.errors.push(`Worng username or passwords`);

                return;
              }

              this.errors.push(`${property}: ${error.response.data[property]}`);
            }
          } else if (error.message) {
            this.errors.push("Something went wrong. Please try again");
            console.log(JSON.stringify(error));
          }
        });
    },
  },
};
</script>
<style scoped>
.row {
  justify-content: center;
}
.btn {
  border-radius: 0;
  padding: 8px;
}
.card {
  background-color: #fafafa38;
  padding: 15px;
}
</style>
