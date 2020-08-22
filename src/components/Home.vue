<template>
  <div>
    <v-img src="@/assets/icon.png" height="160" width="160" class="mx-auto mb-4"></v-img>
    <v-btn class="mb-4" block color="teal" @click="play" dark>Let's play!</v-btn>
    <v-simple-table>
        <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Score</th>
            <th class="text-left">Percentage</th>
            <th class="text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="score in scores" :key='score.id'>
              <th>{{ score.name }}</th>
              <td>{{ score.success }}</td>
              <td>{{ score.percentage }}</td>
              <td>{{ score.currentDate }}</td>
            </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import {db} from '@/firebase'

export default {
  name: 'Home',
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