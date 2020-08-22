<template>
  <v-container>
    <v-form @submit.prevent="send">
      <v-card v-for="question in disorderQuestions.slice(0,1)" :key="question.id" max-width="100%" tile>
        <span class="font-weight-bold mt-4 mx-4">{{ question.text }}</span>
          <v-radio-group class="my-4" v-model="answer1">
            <v-radio v-for="(answer, i) in question.answers" :key="i" :label="answer.text" :value="answer.isCorrect ? 'ok' : answer.text" require color="teal"></v-radio>
          </v-radio-group>
      </v-card>
      <v-card v-for="question in disorderQuestions.slice(1,2)" :key="question.id" max-width="100%" tile>
        <span class="font-weight-bold mt-4 mx-4">{{ question.text }}</span>
          <v-radio-group class="my-4" v-model="answer2">
            <v-radio v-for="(answer, i) in question.answers" :key="i" :label="answer.text" :value="answer.isCorrect ? 'ok' : answer.text" require color="teal"></v-radio>
          </v-radio-group>
      </v-card>
      <v-card v-for="question in disorderQuestions.slice(2,3)" :key="question.id" max-width="100%" tile>
        <span class="font-weight-bold mt-4 mx-4">{{ question.text }}</span>
          <v-radio-group class="my-4" v-model="answer3">
            <v-radio v-for="(answer, i) in question.answers" :key="i" :label="answer.text" :value="answer.isCorrect ? 'ok' : answer.text" require color="teal"></v-radio>
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
      valid: true,
      answer1: '',
      answer2: '',
      answer3: '',
    }
  },
  computed: {
    disorderQuestions() {
      let questions = [...this.questions]
      questions.sort(() => 0.5 - Math.random());
      return questions;
    }
  },
  firestore() {
    return {
      questions: db.collection('questions'),
      score: db.collection('score')
    }
  },
  methods: {
    send() {
      let success = 0;
      if (this.answer1 == 'ok'){
        success++
      }
      if (this.answer2 == 'ok'){
        success++
      }
      if (this.answer3 == 'ok'){
        success++
      }
      const date = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit', hour12: true};
      const currentDate =  date.toLocaleDateString("en-US", options);
      
      let percentage = (success / 3) * 100;
      percentage = percentage.toFixed(1);

      db.collection('score').add({
        name: this.$store.state.user.name,
        success: success + '/3',
        percentage: percentage + '%',
        currentDate: currentDate
      })
      this.$store.dispatch('home')
    },
    cancel() {
      this.$store.dispatch('home')
    },
  }
}
</script>