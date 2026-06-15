<template>
  <section class="rounded-md border border-secondary-200 bg-white p-5 dark:border-dark-border dark:bg-dark-surface">
    <div class="mb-5">
      <h3 class="text-lg font-semibold text-secondary-950 dark:text-white">
        JSON to TypeScript
      </h3>
      <p class="mt-2 text-sm leading-6 text-secondary-600 dark:text-secondary-400">
        Paste JSON and generate a simple TypeScript interface locally in the browser.
      </p>
    </div>

    <div class="space-y-4">
      <div class="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <label class="block">
          <span class="text-xs font-medium text-secondary-600 dark:text-secondary-400">Interface name</span>
          <input
            v-model="interfaceName"
            type="text"
            class="mt-2 w-full rounded-md border border-secondary-200 bg-secondary-50 px-3 py-2 text-sm text-secondary-950 transition-colors placeholder:text-secondary-400 focus:border-secondary-400 dark:border-dark-border dark:bg-dark-bg dark:text-white dark:placeholder:text-secondary-500"
            placeholder="RootObject"
          />
        </label>

        <div class="flex flex-wrap gap-2">
          <button
            v-for="example in examples"
            :key="example.label"
            type="button"
            class="rounded-md border border-secondary-200 px-3 py-2 text-xs font-medium text-secondary-600 transition-colors hover:border-secondary-400 hover:text-secondary-950 dark:border-dark-border dark:text-secondary-400 dark:hover:text-white"
            @click="loadExample(example)"
          >
            {{ example.label }}
          </button>
        </div>
      </div>

      <label class="block">
        <span class="text-xs font-medium text-secondary-600 dark:text-secondary-400">JSON input</span>
        <textarea
          v-model="inputJson"
          rows="10"
          placeholder='{"name": "Igal", "role": "Developer"}'
          class="mt-2 w-full resize-none rounded-md border border-secondary-200 bg-secondary-50 px-3 py-2 font-mono text-xs leading-5 text-secondary-950 transition-colors placeholder:text-secondary-400 focus:border-secondary-400 dark:border-dark-border dark:bg-dark-bg dark:text-white dark:placeholder:text-secondary-500"
        ></textarea>
      </label>

      <p v-if="error" class="text-sm leading-6 text-red-600 dark:text-red-400">
        {{ error }}
      </p>

      <div
        v-if="tsInterface"
        class="rounded-md border border-secondary-200 bg-secondary-50 dark:border-dark-border dark:bg-dark-bg"
      >
        <div class="flex items-center justify-between border-b border-secondary-200 px-3 py-2 dark:border-dark-border">
          <span class="text-xs font-medium text-secondary-600 dark:text-secondary-400">
            Generated interface
          </span>
          <button
            type="button"
            class="text-xs font-medium text-primary-700 transition-colors hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200"
            @click="copyToClipboard"
          >
            {{ copied ? "Copied" : "Copy" }}
          </button>
        </div>

        <pre class="overflow-x-auto whitespace-pre-wrap p-3 font-mono text-xs leading-5 text-secondary-800 dark:text-secondary-200">{{ tsInterface }}</pre>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

type JsonExample = {
  label: string;
  interfaceName: string;
  value: string;
};

const props = withDefaults(defineProps<{ isFeatured?: boolean }>(), {
  isFeatured: false,
});

void props;

const examples: JsonExample[] = [
  {
    label: "Profile",
    interfaceName: "Profile",
    value: JSON.stringify(
      {
        name: "Igal",
        role: "Developer",
        links: ["GitHub", "LinkedIn"],
        available: true,
      },
      null,
      2
    ),
  },
  {
    label: "Project",
    interfaceName: "Project",
    value: JSON.stringify(
      {
        title: "Decision Matrix AI",
        tags: ["React", "TypeScript", "AI"],
        stats: {
          hasLiveDemo: true,
          score: 4.5,
        },
      },
      null,
      2
    ),
  },
  {
    label: "API",
    interfaceName: "ApiResponse",
    value: JSON.stringify(
      {
        ok: true,
        data: {
          id: 42,
          status: "ready",
        },
        error: null,
      },
      null,
      2
    ),
  },
];

const inputJson = ref("");
const interfaceName = ref("RootObject");
const error = ref("");
const copied = ref(false);

const normalizedInterfaceName = computed(() => {
  const fallback = "RootObject";
  const cleaned = interfaceName.value
    .trim()
    .replace(/[^A-Za-z0-9_$]/g, "")
    .replace(/^[0-9]+/, "");

  return cleaned || fallback;
});

const tsInterface = computed(() => {
  if (!inputJson.value.trim()) return "";
  error.value = "";

  try {
    const parsed = JSON.parse(inputJson.value);
    return generateInterface(parsed, normalizedInterfaceName.value);
  } catch {
    error.value = "Invalid JSON input.";
    return "";
  }
});

const loadExample = (example: JsonExample) => {
  interfaceName.value = example.interfaceName;
  inputJson.value = example.value;
};

const toPropertyName = (key: string) => {
  if (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key)) return key;
  return JSON.stringify(key);
};

function inferType(val: any, key = "", indent = 2): string {
  const spaces = " ".repeat(indent);
  const innerSpaces = " ".repeat(indent + 2);
  const lowerKey = key.toLowerCase();

  if (val === null) {
    if (
      lowerKey.includes("name") ||
      lowerKey.includes("bio") ||
      lowerKey.includes("url") ||
      lowerKey.includes("email") ||
      lowerKey.includes("text") ||
      lowerKey.includes("date") ||
      lowerKey.includes("time")
    ) {
      return "string | null";
    }

    return "unknown | null";
  }

  if (Array.isArray(val)) {
    if (val.length === 0) return "unknown[]";

    const rawTypes = val.map((item) => inferType(item, key, indent + 2));
    const merged = mergeStructuralTypes(rawTypes);
    const type = merged.length > 1 ? `(${merged.join(" | ")})` : merged[0];

    return `${type}[]`;
  }

  if (typeof val === "object") {
    const entries = Object.entries(val);
    if (!entries.length) return "Record<string, unknown>";

    let struct = "{\n";
    for (const [objectKey, objectValue] of entries) {
      struct += `${innerSpaces}${toPropertyName(objectKey)}: ${inferType(objectValue, objectKey, indent + 2)};\n`;
    }
    struct += `${spaces}}`;
    return struct;
  }

  if (typeof val === "string") {
    const enumLikeKeys = ["role", "theme", "status", "type", "kind", "action", "tag"];

    if (enumLikeKeys.some((enumKey) => lowerKey.includes(enumKey))) {
      return JSON.stringify(val);
    }

    return "string";
  }

  return typeof val;
}

function mergeStructuralTypes(types: string[]): string[] {
  const unique = Array.from(new Set(types)).filter(Boolean);
  if (unique.length <= 1) return unique;

  const objects = unique.filter((type) => type.startsWith("{"));
  const nonObjects = unique.filter((type) => !type.startsWith("{"));

  if (objects.length > 1) {
    const longest = objects.sort((a, b) => b.length - a.length)[0];
    return [...nonObjects, longest];
  }

  return unique;
}

function generateInterface(obj: any, name: string): string {
  const rootObject = Array.isArray(obj) ? obj[0] : obj;

  if (!rootObject || typeof rootObject !== "object" || Array.isArray(rootObject)) {
    return `interface ${name} {\n  value: ${inferType(obj)};\n}`;
  }

  let result = `interface ${name} {\n`;
  for (const [key, value] of Object.entries(rootObject)) {
    result += `  ${toPropertyName(key)}: ${inferType(value, key, 2)};\n`;
  }
  result += "}";
  return result;
}

function copyToClipboard() {
  navigator.clipboard.writeText(tsInterface.value);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}
</script>
