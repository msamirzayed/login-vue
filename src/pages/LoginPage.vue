<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="headline">
            {{ isLoginMode ? "Login" : "Signup" }}
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleSubmit">
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
                :rules="[rules.required, rules.email]"
              />
              <v-text-field
                v-if="!isLoginMode"
                v-model="userName"
                label="User Name"
                type="text"
                required
                :rules="[rules.required, rules.userName]"
              />
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
                :rules="[rules.required, rules.password]"
              />

              <v-btn
                type="submit"
                color="primary"
                :disabled="!email || !password || emailError || passwordError"
              >
                {{ isLoginMode ? "Login" : "Signup" }}
              </v-btn>
              <v-alert
                v-if="errorMessage"
                type="error"
                class="mt-3"
                border-left
                dismissible
              >
                {{ errorMessage }}
              </v-alert>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="toggleMode">
              Switch to {{ isLoginMode ? "Signup" : "Login" }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { login, signup } from "@/services/authService";

export default {
  name: "LoginPage",
  data() {
    return {
      isLoginMode: true,
      email: "",
      password: "",
      uid: "",
      userName: "",
      emailError: false,
      passwordError: false,
      errorMessage: null,
      rules: {
        required: (value) => !!value || "Field is required",
        email: (value) => this.isValidEmail(value) || "Invalid email format",
        password: (value) =>
          value.length >= 6 || "Password must be at least 6 characters",
      },
    };
  },
  methods: {
    async handleSubmit() {
      this.resetErrors();

      if (
        !this.email ||
        !this.password ||
        this.emailError ||
        this.passwordError
      ) {
        this.emailError = !this.email || this.emailError;
        this.passwordError = !this.password || this.passwordError;
        return;
      }

      try {
        if (this.isLoginMode) {
          await login({ email: this.email, password: this.password });
          this.uid = localStorage.getItem("uid");
        } else {
          await signup(
            { email: this.email, password: this.password },
            this.userName
          );
          this.uid = localStorage.getItem("uid");
        }

        this.$router.push(`/profile/${this.uid}`);
      } catch (error) {
        this.errorMessage = error.message
          ? error.message.toString()
          : "Unknown error occurred";
      }
    },

    toggleMode() {
      this.isLoginMode = !this.isLoginMode;
      this.resetErrors();
    },

    resetErrors() {
      this.emailError = false;
      this.passwordError = false;
      this.errorMessage = null;
    },

    validateEmail() {
      this.emailError = !this.email || !this.isValidEmail(this.email);
    },

    validatePassword() {
      this.passwordError = !this.password || this.password.length < 6;
    },

    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
  },
};
</script>

<style scoped>
.v-card {
  margin: 20px;
}
</style>
