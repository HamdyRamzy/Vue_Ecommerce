<template>
  <div class="home container">
    <div class="row mt-5">
      <div class="col-lg-6">
        <div class="card">
          <h2 class="text-center mb-2">Registraion</h2>

          <div class="card-body">
            <form @submit.prevent="submitForm">
              <div class="form-row">
                <input
                  type="text"
                  class="form-control shadow-none p-2 mt-2"
                  v-bind:class="{
                    'is-invalid': emailServerError,
                  }"
                  id="email"
                  placeholder="Email"
                  v-model="email"
                />
                <div
                  id="feedone"
                  class="invalid-feedback"
                  v-if="emailServerErrorMessage"
                >
                  {{ emailServerErrorMessage }}
                </div>

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
                    type="text"
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
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control shadow-none p-2 mt-2"
                    v-bind:class="{
                      'is-invalid': password2ServerError,
                    }"
                    id="password2"
                    placeholder="Confirm Password"
                    aria-describedby="inputGroupPrepend3"
                    v-model="password2"
                  />
                  <div
                    id="feedthree"
                    class="invalid-feedback"
                    v-if="password2ServerErrorMessage"
                  >
                    {{ password2ServerErrorMessage }}
                  </div>
                </div>
              </div>
              <button class="btn btn-dark w-100 mt-2" type="submit">
                Submit form
              </button>
            </form>
          </div>
          <small class="text-center mt-3"
            >I already have an account.
            <router-link class="" to="/login">Login </router-link>
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
  name: "SignupView",
  data() {
    return {
      username: "",
      password: "",
      password2: "",
      email: "",
      errors: [],
      nameServerError: false,
      emailServerError: false,
      passwordServerError: false,
      password2ServerError: false,
      nameServerErrorMessage: "",
      emailServerErrorMessage: "",
      passwordServerErrorMessage: "",
      password2ServerErrorMessage: "",
    };
  },
  methods: {
    submitForm() {
      this.errors = [];
      this.nameServerError = false;
      this.nameServerErrorMessage = "";
      this.emailServerError = false;
      this.emailServerErrorMessage = "";
      this.passwordServerError = false;
      this.passwordServerErrorMessage = "";
      this.password2ServerError = false;
      this.password2ServerErrorMessage = "";

      if (this.username === "") {
        this.nameServerError = true;
        this.nameServerErrorMessage = "This field may not be blank.";
        this.errors.push("username wrong");
      }
      if (this.email === "") {
        this.emailServerError = true;
        this.emailServerErrorMessage = "This field may not be blank.";
        this.errors.push("email wrong");
      }
      if (this.password === "") {
        this.passwordServerError = true;
        this.passwordServerErrorMessage = "This field may not be blank.";
        this.errors.push("password wrong");
      }

      if (this.password !== this.password2) {
        this.password2ServerError = true;
        this.password2ServerErrorMessage = "The passwords doesn't match";
        this.errors.push("password2 wrong");
      }
      if (this.password2 === "") {
        this.password2ServerError = true;
        this.password2ServerErrorMessage = "This field may not be blank.";
        this.errors.push("password2 wrong");
      }
      if (!this.errors.length) {
        const formData = {
          username: this.username,
          password: this.password,
          email: this.email,
        };
        axios
          .post("/api/v1/users/", formData)
          .then((response) => {
            this.$router.push("/login");
          })
          .catch((error) => {
            if (error.response) {
              this.nameServerError = false;
              this.nameServerErrorMessage = "";
              this.emailServerError = false;
              this.emailServerErrorMessage = "";
              this.passwordServerError = false;
              this.passwordServerErrorMessage = "";
              this.password2ServerError = false;
              this.password2ServerErrorMessage = "";
              for (const property in error.response.data) {
                if (property === "username") {
                  this.nameServerError = true;
                  this.nameServerErrorMessage = `${error.response.data[property]}`;
                  this.errors.push("username wrong");
                }
                if (property === "email") {
                  this.emailServerError = true;
                  this.emailServerErrorMessage = `${error.response.data[property]}`;
                  this.errors.push("email wrong");
                }
                if (property === "password") {
                  this.passwordServerError = true;
                  this.passwordServerErrorMessage = `${error.response.data[property]}`;
                  this.errors.push("password wrong");
                }
              }
              console.log(JSON.stringify(error.response.data));
            } else if (error.message) {
              this.errors.push("Something went wrong. Please try again");

              console.log(JSON.stringify(error));
            }
          });
      }
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
  background-color: #fafafa;
  padding: 15px;
}
</style>
