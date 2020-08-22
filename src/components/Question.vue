<template>
  <v-form v-model="valid" @submit.prevent="submit">
    <v-text-field v-model="question" :counter="100" label="Question" required></v-text-field>
    <v-text-field v-model="answerCorrect" label="Correct answer" required></v-text-field>
    <v-text-field v-model="answerFake1" label="Fake answer 1" required></v-text-field>
    <v-text-field v-model="answerFake2" label="Fake answer 2" required></v-text-field>
    <v-text-field v-model="answerFake3" label="Fake answer 3" required></v-text-field>
    <v-btn :disabled="!valid" color="red" class="mr-4" @click="cancel">Cancel</v-btn>
    <v-btn color="teal" class="mr-4" type="submit">Add question</v-btn>
  </v-form>
</template>

<script>
import {db} from '@/firebase'

export default {
  name: 'Question',
  data: () => ({
    valid: false,
    question: '',
    answerCorrect: '',
    answerFake1: '', 
    answerFake2: '', 
    answerFake3: '', 
  }),
  methods: {
    cancel() {
      this.$store.dispatch('home')
    },
    submit() {
      let answers = [
        {
          text: this.answerCorrect,
          isCorrect: true
        },
        {
          text: this.answerFake1,
          isCorrect: false
        },
        {
          text: this.answerFake2,
          isCorrect: false
        },
        {
          text: this.answerFake3,
          isCorrect: false
        }
      ]
      answers = answers.sort(() => 0.5 - Math.random());
      db.collection('questions').add({
          text: this.question,
          answers: answers
      }),
      this.question = '',
      this.answerCorrect = '',
      this.answerFake1 = '',
      this.answerFake2 = '',
      this.answerFake3 = ''
    },
    firestore() {
      return {
        questions: db.collection('questions')
      }
    }
  },
}
</script>