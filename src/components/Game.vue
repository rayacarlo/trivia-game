<template>
  <v-container>
    <v-form v-model="valid" @submit.prevent="submit">
      <v-card v-for="(question, i) in questions.slice(0,3)" :key="i" max-width="100%" tile>
        <span class="font-weight-bold mt-4 mx-4">{{ question.text }}</span>
          <v-radio-group class="my-4">
            <v-radio v-for="(answer, j) in question.answers" :key="j" :label="answer.text" :value="answer.isCorrect ? 'ok' : answer.answer" require :v-model="form.questionAnswers[i]" color="teal"></v-radio>
          </v-radio-group>
      </v-card>
      <span>
        <v-btn class="my-2" block color="red" @click="cancel">Cancel</v-btn>
        <v-btn class="my-2" block color="teal" type="submit" :disabled="!valid">Send</v-btn>
      </span>
    </v-form>
  </v-container>
</template>

<script>
import {db} from '@/firebase'

export default {
  name: 'Game',
  data() {
    return {
      valid: false,
      questions: [],
      form: {
        questionAnswers: []
      }
      
    }
  },
  firestore() {
    return {
      questions: db.collection('questions')
    }
  },
  methods: {
    cancel() {
      this.$store.dispatch('home')
    },
    submit() {
      console.log(this.form.questionAnswers)
    }
  }
}
</script>