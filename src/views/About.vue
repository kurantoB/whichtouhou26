<template>
  <section class="space-y-6 p-4 md:p-6 md:max-w-5xl md:mx-auto">
    <div class="space-y-6 rounded-3xl border border-amber-200 bg-white/95 p-6 shadow-sm shadow-amber-200/70">
      <header class="space-y-3">
        <h1 class="text-3xl font-semibold text-amber-950">About</h1>
        <p class="text-slate-700">
          This is a long-running project that will inevitably need to be updated from time to time as the Touhou cast keeps on growing. The questions and metrics themselves aren't perfect, but each new iteration of this quiz comes with its own attempted improvements and tweaks.
        </p>
      </header>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-amber-950">Methodology</h2>
        <p class="text-slate-700">
          Personality type questionnaires tend to measure across different axes, and this one's no different. The ones used here are as follows:
        </p>

        <div class="space-y-5">
          <div class="space-y-2 rounded-2xl bg-amber-50 p-4">
            <p class="font-semibold text-amber-950">Under-stimmed vs over-stimmed</p>
            <p class="text-slate-700">
              Maybe it doesn't matter what it is you seek - it only matters that you are seeking <i>something</i>, even when it's done unconsciously. Alternatively, maybe your hunger is, and has always been, satiated, and your life is too bountiful (figuratively). The driving forces you encounter are so many, and so intense, such that you are numb to them all. Or, neither of these experiences apply to you, and the journeys and missions you find yourself in are almost entirely deliberate.
            </p>
          </div>

          <div class="space-y-2 rounded-2xl bg-amber-50 p-4">
            <p class="font-semibold text-amber-950">Face-value appraiser vs moot-value appraiser</p>
            <p class="text-slate-700">
              Having a values system - that's what gives your life structure, and being able to make snap judgments may be your superpower. Everything has a value - objects, concepts, experiences, and yes, sometimes people. Of course, you don't need anyone to tell you your value system is subjective - what matters is that you <i>have</i> one, and it has been pulling its weight. Alternatively, maybe having structure in your life is overrated. Your inability to make snap judgments may be a personal shortcoming, or it may be a conscious choice. Every single thing has qualities intrinsic to it that cannot be compared, cannot be assigned a value, and most of all, cannot be separated from a story that you have yet to discover.
            </p>
          </div>

          <div class="space-y-2 rounded-2xl bg-amber-50 p-4">
            <p class="font-semibold text-amber-950">Hero quotient</p>
            <p class="text-slate-700">
              If you make a memorable impression upon those that you meet, it's only when you are well aware of the fact, that you get to be on the defining side of the spectrum. You are blessed with a brand but are subject to the effort it takes to cultivate and maintain it - but oh does it deliver. Building an impression without the self-awareness draws attention to the action rather than the person. Being self-aware but incapable of building an impression makes one a supporting character. This spectrum is skewed towards one side, and may not even be a fair axis to use in a personality questionnaire, but the select few that conquer the spectrum should be markedly distinct.
            </p>
          </div>
        </div>

        <p class="text-slate-700">
          The first axis has 3 buckets for the quiz-taker to fall into, while the second and third each have 2, so the total distinct "personalities" is 12. To that end, 12 Touhou characters are selected so we can have one representing each personality. How are these 12 chosen? That's a great question, and one that I don't have a clear cut answer to aside from mentioning things like popularity, amount of source material to go by, whichever personality type needs to be filled, and personal preference.
        </p>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-amber-950">The Journey Thus Far</h2>
        <p class="text-slate-700">This iteration was made in 2026.</p>
        <p class="text-slate-700">
          The earliest version of this quiz (made circa 2017) is
          <a href="https://whichtouhou-147401.appspot.com/" class="font-semibold text-amber-600 underline hover:text-amber-700">here</a>, if you're ever interested in checking it out.
        </p>
        <p class="text-slate-700">
          Did you know there was an
          <a href="https://which-touhou-2.uk.r.appspot.com/" class="font-semibold text-amber-600 underline hover:text-amber-700">updated version</a>?
          (made circa 2021)
        </p>
        <p class="text-slate-700">
          There is also a Maidens of the Kaleidoscope
          <a href="https://www.shrinemaiden.com/index.php?topic=254.0" class="font-semibold text-amber-600 underline hover:text-amber-700">thread</a>
          on Which Touhou which kept on getting new posts every now and then.
        </p>
      </section>

      <footer class="flex items-center gap-2 text-sm text-slate-500">
        <span>Created by kurantoB</span>
        <a href="https://kurantob.itch.io/" target="_blank" rel="noreferrer" class="inline-flex items-center text-amber-600 transition hover:text-amber-700 text-[150%]">
          <FontAwesomeIcon :icon="faItchIo" />
        </a>
      </footer>
    </div>
  </section>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faItchIo } from '@fortawesome/free-brands-svg-icons'
</script>