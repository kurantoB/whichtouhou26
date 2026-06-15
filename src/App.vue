<template>
  <div class="min-h-screen bg-amber-50 text-slate-900">
    <header class="border-b border-amber-200 bg-amber-100/90 backdrop-blur-md">
      <div class="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
        <div class="flex items-center justify-between gap-3">
          <router-link to="/" class="text-xl font-semibold text-amber-950 transition hover:text-amber-700">Which Touhou</router-link>
          <button
            type="button"
            class="rounded-md bg-amber-200 px-3 py-2 text-sm font-medium text-amber-950 transition hover:bg-amber-300 md:hidden"
            @click="showNav = !showNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
          </button>
        </div>

        <nav :class="[showNav ? 'flex' : 'hidden', 'flex-col gap-2 text-sm md:flex md:flex-row md:items-center md:gap-3']">
          <router-link to="/" class="rounded-md px-3 py-2 font-medium text-amber-950 transition hover:bg-amber-200 hover:text-amber-950">Home</router-link>
          <router-link to="/quiz" class="rounded-md px-3 py-2 font-medium text-amber-950 transition hover:bg-amber-200 hover:text-amber-950">Quiz</router-link>
          <router-link to="/about" class="rounded-md px-3 py-2 font-medium text-amber-950 transition hover:bg-amber-200 hover:text-amber-950">About</router-link>
          <router-link to="/character-profiles" class="rounded-md px-3 py-2 font-medium text-amber-950 transition hover:bg-amber-200 hover:text-amber-950">Character Profiles</router-link>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useQuizStore } from './quizStore'
import questionsJson from './assets/questions.json'

const showNav = ref(false)
const store = useQuizStore()

onMounted(() => {
  const questions = questionsJson.questions as { question: string; options: string[] }[]
  store.initQuiz(questions.length)
})
</script>