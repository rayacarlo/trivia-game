<template>
  <v-form @submit.prevent="send">
      <v-card>
        <v-window v-model="onboarding" vertical class="px-6 pt-5"> 
          <v-window-item v-for="question in randomQuestions.slice(0, 1)" :key="question.id" class="mb-5 px-5 pt-2">
            <h3 class="teal--text text--darken-2">{{ question.text }}</h3>
            <v-radio-group v-model="answer1">
              <v-radio v-for="(answer, i) in question.answers" :key="i" :label="answer.text" :value="answer.isCorrect ? 'ok' : answer.text" color="teal accent-3" require @click="next"></v-radio>
            </v-radio-group>
          </v-window-item>
          <v-window-item v-for="question in randomQuestions.slice(1, 2)" :key="question.id" class="mb-5 px-5 pt-2">
            <h3 class="teal--text text--darken-2">{{ question.text }}</h3>
            <v-radio-group v-model="answer2">
              <v-radio v-for="(answer, i) in question.answers" :key="i" :label="answer.text" :value="answer.isCorrect ? 'ok' : answer.text" color="teal accent-3" require @click="next"></v-radio>
            </v-radio-group>
          </v-window-item>
          <v-window-item v-for="question in randomQuestions.slice(2, 3)" :key="question.id" class="mb-5 px-5 pt-2">
            <h3 class="teal--text text--darken-2">{{ question.text }}</h3>
            <v-radio-group v-model="answer3">
              <v-radio v-for="(answer, i) in question.answers" :key="i" :label="answer.text" :value="answer.isCorrect ? 'ok' : answer.text" color="teal accent-3" require></v-radio>
            </v-radio-group>
          </v-window-item>
        </v-window>
        <v-card-actions class="justify-space-between">
          <v-btn text @click="prev">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-item-group v-model="onboarding" class="text-center" mandatory>
            <v-item v-for="n in length" :key="`btn-${n}`" v-slot:default="{ active, toggle }">
              <v-btn :input-value="active" icon @click="toggle">
                <v-icon>mdi-record</v-icon>
              </v-btn>
            </v-item>
          </v-item-group>
          <v-btn text @click="next">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-row justify="center">
        <v-btn rounded x-large type="submit" dark class="jugar mt-5" min-width="170px" :disabled="!valid">Send
        </v-btn>
      </v-row>
    </v-form>
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
      length: 3,
      onboarding: 0,
    }
  },
  computed: {
    randomQuestions() {
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
    next () {
      this.onboarding = this.onboarding + 1 === this.length
      ? 0
      : this.onboarding + 1
    },
    prev () {
      this.onboarding = this.onboarding - 1 < 0
      ? this.length - 1
      : this.onboarding - 1
    },
  }
}
</script>