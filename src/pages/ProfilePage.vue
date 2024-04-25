<template>
  <v-progress-linear v-if="isLoading" indeterminate color="blue" />
  <v-container v-if="!isLoading">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Edit Profile</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="updateName">
              <v-text-field
                v-model="name"
                label="Name"
                type="text"
                required
                :rules="[rules.required, rules.name]"
              />
              <v-btn
                type="submit"
                color="primary"
                :disabled="!name || isLoading"
              >
                Update
              </v-btn>
            </v-form>

            <v-alert v-if="message" :type="messageType" class="mt-3">
              {{ message }}
            </v-alert>
          </v-card-text>
        </v-card>
        <v-btn class="mt-5" color="warn" @click="logout"> Logout </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { patchProfile, getUser } from "../services/patchProfile.js";

export default {
  name: "ProfilePage",
  data() {
    return {
      name: "",
      password: "",
      uid: "",
      isLoading: true,
      message: null,
      messageType: "info",
      profileData: null,
      rules: {
        required: (value) => !!value || "Field is required",
      },
    };
  },
  mounted() {
    this.uid = this.$route.params.uid;
    this.fetchUserProfile(this.uid);
  },

  methods: {
    async fetchUserProfile(uid) {
      try {
        const user = await getUser(uid);
        this.name = user.name;
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching profile:", error);
        this.message = "Error fetching profile";
        this.messageType = "error";
      }
    },

    async updateName() {
      this.isLoading = true;
      this.message = null;
      try {
        await patchProfile(this.uid, { name: this.name, uid: this.uid });
        console.log("Name updated successfully!");
        this.message = "Name updated successfully!";
        this.messageType = "success";
      } catch (error) {
        console.error("Error updating name:", error);
        this.message = "Error updating name";
        this.messageType = "error";
      } finally {
        this.isLoading = false;
      }
    },

    logout() {
      try {
        localStorage.removeItem("authToken");
        this.$router.push("/login");
      } catch (error) {
        console.error("Logout error:", error);
      }
    },
  },
};
</script>
