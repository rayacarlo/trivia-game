<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" v-if="user" app clipped>
      <v-list  dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title @click="home">Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title @click="question">Add A Question</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon >mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title @click="logout">Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon v-if="user" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <avatar v-if="user" :src="user.avatar" :username="user.name" :size=32 class="mx-2"></avatar>
      <v-toolbar-title v-if="user">Welcome {{ user.name }}</v-toolbar-title>
      <v-toolbar-title v-if="!user">Trivia Game</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="6">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Avatar from 'vue-avatar'

export default {
  name: 'App',
  components: {
    Avatar
  },
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
  }),
  created () {
    this.$vuetify.theme.dark = true
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    home() {
      this.$store.dispatch('home')
    },
    question() {
      this.$store.dispatch('question')
    },
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>