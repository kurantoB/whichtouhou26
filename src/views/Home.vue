<template>
  <section class="space-y-6 p-4 md:p-6">
    <div class="space-y-3 rounded-3xl border border-amber-200 bg-white/95 p-6 shadow-sm shadow-amber-200/70">
      <div class="space-y-3">
        <h1 class="text-3xl font-semibold text-amber-950">Which Touhou Girl Are You?</h1>
        <p class="max-w-2xl text-slate-700">
          Put your curiosity to rest with this personality quiz!
        </p>
        <p class="max-w-2xl text-sm text-slate-600">
          No, this isn't Myers-Briggs or Big Five - it's just a boutique evaluation rubric. This is a doujin after all.
        </p>
        <div class="space-y-2 pt-4 text-slate-700">
          <h2 class="text-xl font-semibold text-amber-950">Quiz Specs</h2>
          <div><strong>Format:</strong> Multiple-choice</div>
          <div><strong>Number of questions:</strong> 7</div>
          <div><strong>Randomized:</strong> Yes</div>
        </div>
      </div>
    </div>

    <router-link
      to="/quiz"
      class="inline-flex rounded-lg bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-500"
    >
      Take Quiz
    </router-link>

    <!-- <div class="space-y-4 rounded-3xl border border-amber-200 bg-white/95 p-6 shadow-sm shadow-amber-200/70">
      <div class="space-y-3 pt-4">
        <h2 class="text-2xl font-semibold text-amber-950">If you are at TouhouFest 2026:</h2>
        <p class="text-slate-700">
          Come swing by the Touhou Game Dev booth at the Assembly Hall! Show the booth your results for this quiz to receive a "kin tag", and check out their games!
        </p>
        <p class="text-slate-700">
          Special thanks to the <a href="https://discord.gg/touhougamejam" class="font-semibold text-amber-600 underline hover:text-amber-700">Touhou Fan Game Jam</a> community for granting table space.
        </p>
      </div>
    </div> -->
  </section>
</template>