<template>
  <v-app id="inspire">
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title class="mx-4">Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title class="mx-4" v-if="user">Welcome {{ user.name }}</v-toolbar-title>
        <v-btn depressed color="indigo darken-3" v-if="user" @click="logout">Log out</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <v-footer color="indigo" app>
      <span class="white--text mx-4">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>

</style>