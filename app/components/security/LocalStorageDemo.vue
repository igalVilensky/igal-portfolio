<template>
  <div class="space-y-10">
    <!-- Simulation Header -->
    <div class="px-6 py-4 bg-red-500/5 border border-red-500/20 rounded-[2rem] flex items-center gap-4">
      <div
        class="w-10 h-10 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 shrink-0 shadow-inner">
        <i class="fas fa-microchip text-sm leading-none"></i>
      </div>
      <div class="space-y-0.5">
        <div class="text-[10px] font-black text-red-500 uppercase tracking-widest">Simulation Active</div>
        <p class="text-[11px] text-secondary-600 dark:text-secondary-400 font-medium italic leading-tight">
          Monitoring insecure persistence of authentication artifacts in browser storage.
        </p>
      </div>
    </div>

    <div class="grid lg:grid-cols-2 gap-10">
      <!-- Interaction Zone -->
      <div class="flex flex-col gap-6">
        <div class="space-y-4">
          <div class="space-y-2">
            <label class="text-[10px] font-black text-secondary-500 uppercase tracking-[0.2em] pl-1">Credentials
              Access</label>
            <div class="relative group">
              <input v-model="username" type="text"
                class="w-full p-4 bg-secondary-50 dark:bg-black/40 border border-secondary-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm text-secondary-900 dark:text-white pl-12 shadow-inner"
                placeholder="administrator" />
              <i
                class="fas fa-id-badge absolute left-5 top-1/2 -translate-y-1/2 text-secondary-400 group-focus-within:text-primary-500 transition-colors text-xs"></i>
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-[10px] font-black text-secondary-500 uppercase tracking-[0.2em] pl-1">Entropy
              Input</label>
            <div class="relative group">
              <input v-model="password" type="password"
                class="w-full p-4 bg-secondary-50 dark:bg-black/40 border border-secondary-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm text-secondary-900 dark:text-white pl-12 shadow-inner"
                placeholder="••••••••••••" />
              <i
                class="fas fa-shield-alt absolute left-5 top-1/2 -translate-y-1/2 text-secondary-400 group-focus-within:text-primary-500 transition-colors text-xs"></i>
            </div>
          </div>
        </div>

        <div class="flex gap-4">
          <button @click="login" :disabled="!username || !password"
            class="flex-1 px-6 py-4 bg-red-600 hover:bg-red-500 disabled:opacity-30 disabled:hover:bg-red-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-red-500/20 active:scale-95">
            Commit To Storage
          </button>
          <button @click="reset"
            class="w-14 h-14 flex items-center justify-center bg-secondary-100 dark:bg-white/5 text-secondary-600 dark:text-secondary-400 rounded-2xl hover:bg-secondary-200 dark:hover:bg-white/10 transition-colors">
            <i class="fas fa-sync-alt text-xs"></i>
          </button>
        </div>
      </div>

      <!-- Result Zone (The "Blueprint" Outlet) -->
      <div class="flex flex-col gap-4">
        <div v-if="token" class="flex flex-col gap-4 animate-fade-in">
          <div class="flex items-center justify-between">
            <h4 class="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Leaked Memory
            </h4>
            <span class="text-[10px] font-mono font-bold text-secondary-400">PLAIN_TEXT</span>
          </div>
          <div class="relative group">
            <pre
              class="w-full p-6 bg-secondary-900 text-red-400 rounded-[2.5rem] border border-red-500/30 text-[11px] font-mono overflow-x-auto whitespace-pre-wrap break-all shadow-2xl leading-relaxed">{{ token }}</pre>
            <div
              class="absolute inset-0 bg-red-500/5 rounded-[2.5rem] pointer-events-none group-hover:bg-red-500/10 transition-colors">
            </div>
          </div>
          <p class="text-[11px] text-secondary-500 italic leading-relaxed px-2">
            <i class="fas fa-info-circle mr-1"></i> Vulnerability established: Any malicious script on this origin can
            execute <code class="bg-red-500/10 text-red-400 px-1 rounded">localStorage.getItem('authToken')</code>.
          </p>
          <button @click="simulateAttack"
            class="w-full px-6 py-3 bg-secondary-900 border border-red-500/30 text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-500/10 transition-all active:scale-98">
            Attempt Extraction
          </button>
        </div>

        <div v-else
          class="h-full min-h-[220px] flex flex-col items-center justify-center p-10 border-2 border-dashed border-secondary-200 dark:border-white/5 rounded-[2.5rem] opacity-30 grayscale group hover:opacity-50 transition-all">
          <div
            class="w-16 h-16 rounded-full bg-secondary-100 dark:bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <i class="fas fa-ghost text-2xl text-secondary-300"></i>
          </div>
          <span class="text-[10px] font-black uppercase tracking-[0.3em] text-secondary-400">Zero Persistent
            State</span>
        </div>
      </div>
    </div>

    <!-- Defensive Countermeasure -->
    <div class="p-8 bg-green-500/[0.03] border border-green-500/20 rounded-[2.5rem] relative overflow-hidden group">
      <div
        class="absolute top-0 right-0 w-32 h-32 bg-green-500/5 -mr-16 -mt-16 rounded-full blur-3xl pointer-events-none">
      </div>
      <div class="relative z-10">
        <h4 class="text-[10px] font-black text-green-500 uppercase tracking-[0.2em] flex items-center gap-2 mb-4">
          <i class="fas fa-user-shield text-xs"></i> Defensive Architecture
        </h4>
        <p class="text-xs text-secondary-600 dark:text-secondary-400 leading-relaxed italic">
          Resolution: Encapsulate tokens within <strong>HTTP-Only, Secure, and SameSite</strong> cookies. This removes
          the persistence layer from the reachable DOM, neutralizing XSS-based theft.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const username = ref("");
const password = ref("");
const token = ref<string | null>(null);

onMounted(() => {
  const savedToken = localStorage.getItem("authToken");
  if (savedToken) token.value = savedToken;
});

function login() {
  token.value = btoa(`${username.value}:${password.value}`);
  localStorage.setItem("authToken", token.value);
}

function simulateAttack() {
  const stolen = localStorage.getItem("authToken");
  console.log("%c [SYS_MOD] EXTRACTION EVENT CAPTURED: ", "color: #ff0000; font-weight: bold; background: #000; padding: 2px 5px;", stolen);
  alert("Vulnerability Confirmed!\n\nThe simulation successfully extracted the following token from memory:\n\n" + stolen + "\n\nRefer to the system console for full diagnostic logs.");
}

function reset() {
  username.value = "";
  password.value = "";
  token.value = null;
  localStorage.removeItem("authToken");
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
