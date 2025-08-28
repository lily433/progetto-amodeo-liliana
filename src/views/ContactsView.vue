<script setup>
import { ref, onMounted } from 'vue'
// services
import FirebaseService from '@/services/firebase.js'

// components
import Comment from '@/components/Comment.vue'

const comments = ref([])
const loading = ref(true)

const user = ref('')
const email = ref('')
const message = ref('')

onMounted(() => {
  refreshCommands()
})

function refreshCommands() {
  FirebaseService.getComments()
    .then((data) => {
      comments.value = []
      data.forEach(function (d) {
        comments.value.push(d.data())
      })
    })
    .catch((e) => {
      console.log('cant get data', err)
      // handle error
    })
    .finally(() => {
      loading.value = false
    })
}

function sendMessage() {
  if (user.value == '' || email.value == '' || message.value == '') {
    return
  }

  FirebaseService.addComment(user.value, email.value, message.value)
    .then(() => {
      refreshCommands()
    })
    .catch((e) => {})
    .finally(() => {})
}
</script>

<template>
  <div class="container-fluid max-w-100 h-100 d-flex flex-column align-items-center gap-4 p-4">
    <h2>Questions? Contact us!</h2>
    <div class="d-flex justify-content-center w-100">
      <form class="d-flex flex-column gap-2 w-100 w-sm-50">
        <input
          v-model="user"
          type="text"
          placeholder="user"
          class="form-control rounded border-primary"
        />
        <input
          v-model="email"
          type="text"
          placeholder="email"
          class="form-control rounded border-primary"
        />
        <textarea
          v-model="message"
          placeholder="message"
          class="form-control rounded border-primary"
          rows="5"
        ></textarea>
        <button
          type="button"
          @click="sendMessage"
          :disabled="user == '' || email == '' || message == ''"
          class="btn btn-primary"
        >
          Send
        </button>
      </form>
    </div>
    <hr />
    <div v-if="loading" class="d-flex justify-content-center align-items-center w-100 h-100">
      <!-- loader -->
      <v-progress-circular indeterminate></v-progress-circular>
    </div>

    <div v-else class="d-flex flex-column gap-2 w-100 h-100">
      <h3>Question history</h3>
      <Comment
        v-if="comments.length > 0"
        v-for="c in comments"
        :key="c.message"
        :user="c.user"
        :email="c.email"
        :message="c.message"
      />
      <div v-else>No question to show</div>
    </div>
  </div>
</template>
