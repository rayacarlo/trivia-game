<template>
  <div>
    <v-img src="@/assets/icon.png" height="160" width="160" class="mx-auto mb-4"></v-img>
    <v-btn class="mb-4" block color="teal" @click="play" dark>Let's play!</v-btn>
    <v-data-table :headers="headers" :items="players" :items-per-page="5" class="elevation-1">
    </v-data-table>
  </div>
</template>

<script>
import {db} from '@/firebase'
console.log(db)

export default {
  name: 'Home',
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  data () {
    return {
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Score', value: 'score' },
        { text: 'Percentage', value: 'percentage' },
        { text: 'Date', value: 'date' },
      ],
      players: [
        {
          name: 'Jerry',
          score: 159,
          percentage: 6.0,
          date: 24,
        }
      ],
    }
  },
  methods: {
    play() {
      this.$store.dispatch('play')
    },
  },
}
</script>