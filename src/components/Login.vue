<template>
  
  <v-card width="300" class="mx-auto mt-4" outlined>
    <v-alert type="error" v-if="error != null">
      I'm an error alert.
    </v-alert>
    <v-img src="@/assets/icon.png" height="100" width="100" class="mx-auto mt-4"></v-img>
    <v-card-text>
      <v-form>
        <v-text-field label="Email" prepend-icon="mdi-at" required v-model="loginEmail"/>
        <v-text-field label="Password" :type="showLoginPassword ? 'text' : 'password'" prepend-icon="mdi-lock" :append-icon="showLoginPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showLoginPassword = !showLoginPassword" required v-model="loginPassword"/>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn block depressed color="teal" @click="login">Login</v-btn>
    </v-card-actions>
    <v-list  dense>
      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-center" @click="toregister">Don't have an account? Register here</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>

</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    loginEmail: '',
    loginPassword: '',
    showLoginPassword: false,
  }),
  computed: {
    error() {
      return this.$store.state.error;
    }
  },
  methods: {
    login() {
      const dataAuth = {
        email: this.loginEmail,
        password: this.loginPassword
      };
      this.$store.dispatch('login', dataAuth)
    },
    toregister() {
      this.$store.dispatch('toregister')
    }
  }
}
</script>