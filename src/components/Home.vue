<template>
  <div>
    <v-img src="@/assets/icon.png" height="160" width="160" class="mx-auto mb-4"></v-img>
    <v-btn class="mb-4" block color="teal" @click="play" dark>Let's play!</v-btn>
    <v-card>
      <v-card-title>
        Trivia Game
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
        </v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="scores" :items-per-page="5" :search="search"></v-data-table>
    </v-card>
  </div>
</template>

<script>
import {db} from '@/firebase'

export default {
  name: 'Home',
  data () {
    return {
      search:'',
      headers: [
        {
          text: 'Player',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Score', value: 'success' },
        { text: 'Percentage', value: 'percentage' },
        { text: 'Date', value: 'currentDate' }
      ],
      players: this.scores
    }
  },

  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  firestore() {
    return {
      scores: db.collection("score").orderBy("success", "desc")
    }
  },
  methods: {
    play() {
      this.$store.dispatch('play')
    },
  },
}
</script>