<template>
  <section class="p-4 md:p-6">
    <div>
      <h1 class="text-3xl font-semibold text-amber-950">Character Profiles</h1>
      <p class="text-slate-700">{{ profiles.length }} total characters</p>
    </div>

    <div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="profile in profiles"
        :key="profile.name"
        class="rounded-3xl border border-amber-200 bg-white/95 p-5 shadow-sm shadow-amber-200/70"
      >
        <div class="flex items-center gap-4">
          <img
            :src="getThumb(profile.thumbnail)"
            :alt="profile.name"
            class="h-32 w-32 rounded-3xl border border-slate-200 bg-slate-100 object-cover"
          />
          <div>
            <h2 class="text-xl font-semibold text-amber-950">{{ profile.name }}</h2>
            <p class="mt-1 text-sm text-slate-600">{{ profile.label }}</p>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import profilesJson from '../assets/profiles.json'

const profiles = profilesJson.profiles as { name: string; label: string; thumbnail?: string }[]

const getThumb = (path?: string) => {
  if (!path) return ''
  return new URL('/' + path, import.meta.url).href
}
</script>