<template>
  
  <v-card width="300" class="mx-auto mt-4" outlined>
    <v-alert type="error" v-if="error != null">
      I'm an error alert.
    </v-alert>
    <v-img src="@/assets/icon.png" height="100" width="100" class="mx-auto mt-4"></v-img>
    <v-card-text>
      <v-form>
        <v-text-field label="Name" prepend-icon="mdi-account-circle" required v-model="registerName"/>
        <v-text-field label="Email" prepend-icon="mdi-at" required v-model="registerEmail"/>
        <v-text-field label="Password" :type="showRegistrationPassword ? 'text' : 'password'" prepend-icon="mdi-lock" :append-icon="showRegistrationPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showRegistrationPassword = !showRegistrationPassword" required v-model="registerPassword"/>
        <v-text-field label="Confirm password" :type="showConfirmPassword ? 'text' : 'password'" prepend-icon="mdi-lock" :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showConfirmPassword = !showConfirmPassword" required v-model="confirmPassword"/>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn block depressed color="teal" @click="register">Register</v-btn>
    </v-card-actions>
    <v-list  dense>
      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-center" @click="tologin">Go back</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>

</template>

<script>
export default {
  name: 'Register',
  data: () => ({
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    confirmPassword:'',
    showRegistrationPassword: false,
    showConfirmPassword: false,
  }),
  computed: {
    error() {
      return this.$store.state.error;
    }
  },
  methods: {
    register() {
      if (this.registerPassword != this.confirmPassword) {
        this.$store.commit('set_error', 'Both passwords must match');
        return;
      }
      const dataAuth = {
        name: this.registerName,
        email: this.registerEmail,
        password: this.registerPassword
      };
      this.$store.dispatch('register', dataAuth)
    },
    tologin() {
      this.$store.dispatch('tologin')
    }
  }
}
</script>