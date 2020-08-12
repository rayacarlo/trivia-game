<template>
<v-container class="my-5" fluid>
  <v-row no-gutters>
    <v-col cols="3"></v-col>
    <v-col cols="6">
      <v-img src="@/assets/home.svg" max-height="240" contain="true"></v-img>
      <v-textarea outlined counter :rules="rules" class="mx-2 mt-4" label="Write a new post" rows="2" prepend-icon="mdi-comment"></v-textarea>
      <v-layout>
        <v-spacer></v-spacer>
        <v-btn depressed align-end color="amber" @click="post">Post</v-btn>
      </v-layout>
    </v-col>
    <v-col cols="3"></v-col>
  </v-row>
</v-container>

</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    rules: [v => v.length <= 120 || 'Max 120 characters'],
  }),
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
}
</script>