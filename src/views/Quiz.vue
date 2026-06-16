<template>
  <section class="space-y-6 p-4 md:p-6">
    <div>
      <h1 class="text-3xl font-semibold text-amber-950">Quiz</h1>
      <p class="text-slate-700">{{ quizResult ? 'Girls have evaluated.' : 'Girls are evaluating...' }}</p>
    </div>

    <div v-if="currentQuestionData" class="space-y-4 rounded-3xl border border-amber-200 bg-white/95 p-6 shadow-sm shadow-amber-200/70">
      <p class="text-xl font-medium text-amber-950">{{ currentQuestionData.question }}</p>
      <div class="grid gap-3 md:grid-cols-2">
        <button
          v-for="(option, index) in currentQuestionData.options"
          :key="option"
          type="button"
          @click="answerQuestion(index)"
          class="rounded-2xl bg-amber-100 px-5 py-3 text-left text-amber-950 transition hover:bg-amber-300 hover:text-amber-950 break-words whitespace-normal"
        >
          {{ option }}
        </button>
      </div>
    </div>

    <div v-else class="space-y-6 rounded-3xl border border-amber-200 bg-white/95 p-6 shadow-sm shadow-amber-200/70">
      <div v-if="submissionError" class="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
        <p class="font-semibold">Submission error</p>
        <p>{{ submissionError }}</p>
      </div>

      <div v-if="quizResult" class="space-y-6">
        <div class="rounded-3xl border border-amber-200 bg-white/95 p-6 shadow-sm shadow-amber-200/70">
          <h2 class="text-2xl font-semibold text-amber-950">Your leanings:</h2>
          <div class="mt-4">
            <ul class="list-disc pl-5 space-y-3 m-0">
              <li>{{ leaningsText1 }}</li>
              <li>{{ leaningsText2 }}</li>
              <li>{{ leaningsText3 }}</li>
            </ul>
          </div>
        </div>

        <div class="grid gap-6 lg:grid-cols-2">
          <article class="rounded-3xl border border-amber-200 bg-white/95 p-6 shadow-sm shadow-amber-200/70">
            <h2 class="text-2xl font-semibold text-amber-950">Closest Match</h2>
            <div class="mt-4 flex items-center gap-4">
              <div v-if="closestProfile.thumbnail" class="h-32 w-32 rounded-3xl overflow-hidden border border-slate-200 bg-slate-100">
                <img :src="getThumb(closestProfile.thumbnail)" :alt="closestProfile.name" class="h-full w-full object-cover" />
              </div>
              <div v-else class="flex h-32 w-32 items-center justify-center rounded-3xl border border-slate-200 bg-slate-100 text-center text-sm text-slate-500">
                <span>Thumbnail 128×128</span>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-amber-950">{{ closestProfile.name }}</h3>
                <p class="mt-1 text-sm text-slate-600">{{ closestProfile.label }}</p>
              </div>
            </div>
            <p class="mt-4 text-slate-700">{{ quizResult.closestMatchBlurb }}</p>
          </article>

        <article class="rounded-3xl border border-amber-200 bg-white/95 p-6 shadow-sm shadow-amber-200/70">
          <h2 class="text-2xl font-semibold text-amber-950">Runner-Up</h2>
          <div class="mt-4 flex items-center gap-4">
            <div v-if="runnerUpProfile.thumbnail" class="h-32 w-32 rounded-3xl overflow-hidden border border-slate-200 bg-slate-100">
              <img :src="getThumb(runnerUpProfile.thumbnail)" :alt="runnerUpProfile.name" class="h-full w-full object-cover" />
            </div>
            <div v-else class="flex h-32 w-32 items-center justify-center rounded-3xl border border-slate-200 bg-slate-100 text-center text-sm text-slate-500">
              <span>Thumbnail 128×128</span>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-amber-950">{{ runnerUpProfile.name }}</h3>
              <p class="mt-1 text-sm text-slate-600">{{ runnerUpProfile.label }}</p>
            </div>
          </div>
          <p class="mt-4 text-slate-700">{{ quizResult.runnerUpBlurb }}</p>
        </article>
      </div>
    </div>

      <div v-if="!quizResult && !submissionError" class="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800">
        Sending results to the service and awaiting match data...
      </div>

      <button
        type="button"
        @click="resetQuiz"
        class="mt-4 rounded-lg bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-500"
      >
        Reset Quiz
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuizStore } from '../quizStore'
import questionsJson from '../assets/questions.json'
import profilesJson from '../assets/profiles.json'

const store = useQuizStore()
const { quizResult } = storeToRefs(store)

const questions = questionsJson.questions as { question: string; options: string[] }[]
const profiles = profilesJson.profiles as { name: string; label: string; thumbnail?: string }[]

const getThumb = (path?: string) => {
  if (!path) return ''
  const p = path.startsWith('/') ? path.slice(1) : path
  return import.meta.env.BASE_URL + p
}

const currentQuestionData = computed(() => {
  const order = store.questionOrder.length ? store.questionOrder : questions.map((_, i) => i)
  const qIndex = order[store.currentQuestion]
  return questions[qIndex] ?? null
})

const quizComplete = computed(() => !currentQuestionData.value && store.answers.length > 0)

const submissionError = ref('')
const isSubmitting = ref(false)

const closestProfile = computed(() => profiles[quizResult.value?.closestMatchCharacter ?? 0] ?? { name: 'Unknown', label: '' })
const runnerUpProfile = computed(() => profiles[quizResult.value?.runnerUpCharacter ?? 0] ?? { name: 'Unknown', label: '' })

const leanings = computed(() => {
  const raw = quizResult.value?.leanings
  return Array.isArray(raw) ? raw.map((v) => Number(v)) : []
})

const getLeaningsText = (index: number): string => {
  const value = leanings.value[index]
  if (value === undefined || Number.isNaN(value)) {
    return 'No leanings data'
  }
  if (index === 0) {
    if (value < 0.33) return 'Under-stimmed in favor of over-stimmed'
    if (value < 0.67) return 'Neither over-stimmed nor under-stimmed'
    return 'Over-stimmed in favor of under-stimmed'
  }
  if (index === 1) {
    if (value < 0.33) return 'Moot-value in favor of face-value appraiser'
    if (value < 0.67) return 'Neither face-value nor moot-value appraiser'
    return 'Face-value in favor of moot-value appraiser'
  }
  if (index === 2) {
    if (value < 0.33) return 'Low hero quotient'
    if (value < 0.67) return 'Medium hero quotient'
    return 'High hero quotient'
  }
  return ''
}

const leaningsText1 = computed(() => quizResult.value ? getLeaningsText(0) : 'No leanings data')
const leaningsText2 = computed(() => quizResult.value ? getLeaningsText(1) : 'No leanings data')
const leaningsText3 = computed(() => quizResult.value ? getLeaningsText(2) : 'No leanings data')

const submitResults = async () => {
  if (quizResult.value || submissionError.value || isSubmitting.value) {
    return
  }

  isSubmitting.value = true
  submissionError.value = ''

  try {
    const response = await fetch(
      'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-0a3bf03e-c018-4c1a-a5bc-6f63daa24945/sample/hello',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(store.answers)
      }
    )

    if (!response.ok) {
      const bodyText = await response.text()
      throw new Error(`Server error ${response.status}: ${bodyText}`)
    }

    const result = await response.json()
    store.setQuizResult(result)
  } catch (error) {
    submissionError.value = error instanceof Error ? error.message : String(error)
  } finally {
    isSubmitting.value = false
  }
}

watch(quizComplete, (complete) => {
  if (complete) {
    submitResults()
  }
})

const answerQuestion = (choice: number) => {
  store.recordAnswer(choice)
}

const resetQuiz = () => {
  store.initQuiz(questions.length)
  store.clearQuizResult()
  submissionError.value = ''
  isSubmitting.value = false
}
</script>