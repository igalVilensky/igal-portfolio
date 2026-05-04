<template>
  <div class="min-h-screen bg-transparent pt-32 pb-24 overflow-hidden relative">
    <div class="container mx-auto px-6 relative z-10 max-w-4xl">
      <!-- Page Header -->
      <div class="max-w-4xl mb-16 px-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-100 dark:bg-white/5 border border-secondary-200 dark:border-white/10 text-xs font-mono text-secondary-500 dark:text-primary-400 mb-6">
          <span class="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></span>
          AI COMPLIANCE COMPASS
        </div>
        <h1 class="text-display-lg md:text-display-xl font-display font-bold text-secondary-900 dark:text-white mb-6 leading-tight">
          AI <span class="text-gradient-primary">Compliance Compass</span>
        </h1>
        <p class="text-xl text-secondary-600 dark:text-secondary-400 max-w-2xl leading-relaxed">
          Understand your AI use case from a legal and compliance perspective in Germany and the EU. Get practical, educational insights about the AI Act and related regulations.
        </p>
      </div>

      <!-- Main Content -->
      <div class="space-y-8">
        <!-- Initial Input State -->
        <div v-if="currentState === 'input'" class="glass bg-white/80 dark:bg-dark-surface/50 rounded-3xl border border-secondary-200 dark:border-white/10 p-8 shadow-2xl">
          <div class="space-y-6">
            <div class="flex items-center gap-4 mb-6">
              <div class="bg-primary-600 rounded-2xl w-12 h-12 flex items-center justify-center text-white shadow-lg">
                <i class="fas fa-compass animate-pulse"></i>
              </div>
              <div>
                <h3 class="text-2xl font-display font-bold text-secondary-900 dark:text-white">
                  Describe Your AI Use Case
                </h3>
                <p class="text-secondary-500 dark:text-secondary-400">
                  Tell us how you use, build, or plan to use AI
                </p>
              </div>
            </div>

            <div class="space-y-4">
              <textarea
                v-model="userDescription"
                rows="4"
                placeholder="e.g. We use ChatGPT to summarize customer support tickets.&#10;e.g. We are building an AI hiring tool that ranks applicants.&#10;e.g. We generate marketing images with AI.&#10;e.g. We use Groq to analyze user messages in our web app.&#10;e.g. We train a model on scraped website content."
                class="w-full bg-secondary-50 dark:bg-white/5 border border-secondary-200 dark:border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-secondary-900 dark:text-white resize-none text-base"
              ></textarea>
              <p class="text-sm text-secondary-400">
                Be specific about the AI tool, data involved, users affected, and your role (using, building, or providing AI).
              </p>
            </div>

            <button
              @click="analyzeDescription"
              :disabled="isLoading || !userDescription.trim()"
              class="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-2xl py-4 text-base transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i class="fas fa-search" :class="{ 'fa-spin': isLoading }"></i>
              <span>{{ isLoading ? 'Analyzing...' : 'Analyze My Use Case' }}</span>
            </button>
          </div>
        </div>

        <!-- Extracted Understanding State -->
        <div v-if="currentState === 'understanding'" class="space-y-6">
          <div class="glass bg-white/80 dark:bg-dark-surface/50 rounded-3xl border border-secondary-200 dark:border-white/10 p-8 shadow-2xl">
            <div class="flex items-center gap-4 mb-6">
              <div class="bg-green-600 rounded-2xl w-12 h-12 flex items-center justify-center text-white shadow-lg">
                <i class="fas fa-brain"></i>
              </div>
              <div>
                <h3 class="text-2xl font-display font-bold text-secondary-900 dark:text-white">
                  I Understood This
                </h3>
                <p class="text-secondary-500 dark:text-secondary-400">
                  Here's what I extracted from your description
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div class="bg-secondary-50 dark:bg-white/5 rounded-xl p-4">
                <div class="text-xs font-bold uppercase tracking-widest text-secondary-500 dark:text-secondary-400 mb-2">Your Role</div>
                <div class="text-secondary-900 dark:text-white font-medium">{{ extractedData.role || 'Unsure' }}</div>
              </div>
              <div class="bg-secondary-50 dark:bg-white/5 rounded-xl p-4">
                <div class="text-xs font-bold uppercase tracking-widest text-secondary-500 dark:text-secondary-400 mb-2">Usage Type</div>
                <div class="text-secondary-900 dark:text-white font-medium">{{ extractedData.usageType || 'Unsure' }}</div>
              </div>
              <div class="bg-secondary-50 dark:bg-white/5 rounded-xl p-4">
                <div class="text-xs font-bold uppercase tracking-widest text-secondary-500 dark:text-secondary-400 mb-2">Domain</div>
                <div class="text-secondary-900 dark:text-white font-medium">{{ extractedData.domain || 'Unsure' }}</div>
              </div>
              <div class="bg-secondary-50 dark:bg-white/5 rounded-xl p-4">
                <div class="text-xs font-bold uppercase tracking-widest text-secondary-500 dark:text-secondary-400 mb-2">Data Involved</div>
                <div class="text-secondary-900 dark:text-white font-medium">{{ extractedData.dataTypes?.join(', ') || 'Unsure' }}</div>
              </div>
              <div class="bg-secondary-50 dark:bg-white/5 rounded-xl p-4">
                <div class="text-xs font-bold uppercase tracking-widest text-secondary-500 dark:text-secondary-400 mb-2">Impact on People</div>
                <div class="text-secondary-900 dark:text-white font-medium">{{ extractedData.impactOnPeople || 'Unsure' }}</div>
              </div>
              <div class="bg-secondary-50 dark:bg-white/5 rounded-xl p-4">
                <div class="text-xs font-bold uppercase tracking-widest text-secondary-500 dark:text-secondary-400 mb-2">User Transparency</div>
                <div class="text-secondary-900 dark:text-white font-medium">{{ extractedData.userFacing ? 'Users know about AI' : 'May not know' }}</div>
              </div>
            </div>

            <div class="flex gap-4">
              <button
                @click="proceedToResults"
                class="flex-1 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-2xl py-3 text-base transition-all"
              >
                This Looks Right
              </button>
              <button
                @click="askClarification"
                class="flex-1 bg-secondary-100 dark:bg-white/5 hover:bg-secondary-200 dark:hover:bg-white/10 text-secondary-700 dark:text-secondary-300 font-bold rounded-2xl py-3 text-base transition-all"
              >
                Need More Details
              </button>
            </div>
          </div>
        </div>

        <!-- Clarification State -->
        <div v-if="currentState === 'clarification'" class="glass bg-white/80 dark:bg-dark-surface/50 rounded-3xl border border-secondary-200 dark:border-white/10 p-8 shadow-2xl">
          <div class="flex items-center gap-4 mb-6">
            <div class="bg-amber-600 rounded-2xl w-12 h-12 flex items-center justify-center text-white shadow-lg">
              <i class="fas fa-question-circle"></i>
            </div>
            <div>
              <h3 class="text-2xl font-display font-bold text-secondary-900 dark:text-white">
                Need More Details
              </h3>
              <p class="text-secondary-500 dark:text-secondary-400">
                To give you a reliable compliance overview, I need a bit more information
              </p>
            </div>
          </div>

          <div class="space-y-4">
            <div v-for="question in clarificationQuestions" :key="question.id" class="space-y-2">
              <label class="text-sm font-bold text-secondary-700 dark:text-secondary-300">{{ question.text }}</label>
              <input
                v-if="question.type === 'text'"
                v-model="clarificationAnswers[question.id]"
                type="text"
                :placeholder="question.placeholder"
                class="w-full bg-secondary-50 dark:bg-white/5 border border-secondary-200 dark:border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-secondary-900 dark:text-white"
              />
              <select
                v-else-if="question.type === 'select'"
                v-model="clarificationAnswers[question.id]"
                class="w-full bg-secondary-50 dark:bg-white/5 border border-secondary-200 dark:border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-secondary-900 dark:text-white"
                style="color: rgb(31, 41, 55); background-color: rgb(249, 250, 251);"
              >
                <option disabled value="" style="color: rgb(31, 41, 55); background-color: rgb(249, 250, 251);">Select an answer</option>
                <option v-for="option in question.options" :key="option.value" :value="option.value" style="color: rgb(31, 41, 55); background-color: white;">{{ option.label }}</option>
              </select>
            </div>
          </div>

          <button
            @click="submitClarification"
            :disabled="isLoading"
            class="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-2xl py-4 text-base transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            <i class="fas fa-check" :class="{ 'fa-spin': isLoading }"></i>
            <span>{{ isLoading ? 'Processing...' : 'Continue' }}</span>
          </button>
        </div>

        <!-- Results State -->
        <div v-if="currentState === 'results'" class="space-y-6">
          <!-- Header -->
          <div class="glass bg-white/80 dark:bg-dark-surface/50 rounded-3xl border border-secondary-200 dark:border-white/10 p-8 shadow-2xl">
            <div class="flex items-center gap-4 mb-6">
              <div class="bg-primary-600 rounded-2xl w-12 h-12 flex items-center justify-center text-white shadow-lg">
                <i class="fas fa-compass"></i>
              </div>
              <div>
                <h3 class="text-2xl font-display font-bold text-secondary-900 dark:text-white">
                  Your AI Usage Compliance Snapshot
                </h3>
                <p class="text-secondary-500 dark:text-secondary-400">
                  Educational overview based on the AI Act and related EU regulations
                </p>
              </div>
            </div>

            <!-- Quick Classification -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div class="bg-secondary-50 dark:bg-white/5 rounded-xl p-5 text-center border border-secondary-200 dark:border-white/10">
                <div class="text-xs font-bold uppercase tracking-widest text-secondary-500 dark:text-secondary-400 mb-3">Likely Role</div>
                <div class="flex items-center justify-center gap-2">
                  <i class="fas fa-user-gear text-primary-600"></i>
                  <span class="text-secondary-900 dark:text-white font-bold text-lg">{{ complianceData.role }}</span>
                </div>
                <div class="text-sm text-secondary-500 dark:text-secondary-400 mt-2">Role inferred from use case and deployment context.</div>
              </div>
              <div class="rounded-xl p-5 text-center border border-secondary-200 dark:border-white/10" :class="riskTheme.bg">
                <div class="text-xs font-bold uppercase tracking-widest text-secondary-500 dark:text-secondary-400 mb-3">AI Act Risk Level</div>
                <div class="flex items-center justify-center gap-2">
                  <i :class="riskTheme.icon"></i>
                  <span class="font-bold text-lg">{{ complianceData.riskLevel }}</span>
                </div>
                <div class="text-sm mt-2 opacity-90">{{ riskTheme.label }}</div>
              </div>
              <div class="rounded-xl p-5 text-center border border-secondary-200 dark:border-white/10" :class="confidenceTheme.bg">
                <div class="text-xs font-bold uppercase tracking-widest text-secondary-500 dark:text-secondary-400 mb-3">Confidence</div>
                <div class="flex items-center justify-center gap-2">
                  <i :class="confidenceTheme.icon"></i>
                  <span class="font-bold text-lg">{{ complianceData.confidence }}</span>
                </div>
                <div class="text-sm mt-2 opacity-90">How sure the snapshot is based on available information.</div>
              </div>
            </div>

            <div class="text-sm text-secondary-600 dark:text-secondary-400 mb-6 leading-relaxed">
              {{ complianceData.reasoning }}
            </div>
          </div>

          <!-- Risk Explanation -->
          <div class="glass bg-white/80 dark:bg-dark-surface/50 rounded-3xl border border-secondary-200 dark:border-white/10 p-8 shadow-2xl">
            <h4 class="text-xl font-bold text-secondary-900 dark:text-white mb-4">AI Act Risk Explanation</h4>
            <div class="text-secondary-600 dark:text-secondary-400 leading-relaxed">
              {{ complianceData.riskExplanation }}
            </div>
          </div>

          <!-- Data Protection Check -->
          <div class="glass bg-white/80 dark:bg-dark-surface/50 rounded-3xl border border-secondary-200 dark:border-white/10 p-8 shadow-2xl">
            <h4 class="text-xl font-bold text-secondary-900 dark:text-white mb-4">Data Protection Check</h4>
            <div class="text-secondary-600 dark:text-secondary-400 leading-relaxed">
              {{ complianceData.gdprCheck }}
            </div>
          </div>

          <!-- Copyright Check -->
          <div class="glass bg-white/80 dark:bg-dark-surface/50 rounded-3xl border border-secondary-200 dark:border-white/10 p-8 shadow-2xl">
            <h4 class="text-xl font-bold text-secondary-900 dark:text-white mb-4">Copyright & Content Check</h4>
            <div class="text-secondary-600 dark:text-secondary-400 leading-relaxed">
              {{ complianceData.copyrightCheck }}
            </div>
          </div>

          <!-- Transparency Check -->
          <div class="glass bg-white/80 dark:bg-dark-surface/50 rounded-3xl border border-secondary-200 dark:border-white/10 p-8 shadow-2xl">
            <h4 class="text-xl font-bold text-secondary-900 dark:text-white mb-4">Transparency & Labeling Check</h4>
            <div class="text-secondary-600 dark:text-secondary-400 leading-relaxed">
              {{ complianceData.transparencyCheck }}
            </div>
          </div>

          <!-- AI Literacy -->
          <div class="glass bg-white/80 dark:bg-dark-surface/50 rounded-3xl border border-secondary-200 dark:border-white/10 p-8 shadow-2xl">
            <h4 class="text-xl font-bold text-secondary-900 dark:text-white mb-4">AI Literacy & Governance</h4>
            <div class="text-secondary-600 dark:text-secondary-400 leading-relaxed">
              Organisations should ensure people involved in AI use understand the capabilities, limitations, risks, and responsible use of AI systems. This includes human oversight, escalation processes, and regular training.
            </div>
          </div>

          <!-- Next Steps -->
          <div class="glass bg-white/80 dark:bg-dark-surface/50 rounded-3xl border border-secondary-200 dark:border-white/10 p-8 shadow-2xl">
            <h4 class="text-xl font-bold text-secondary-900 dark:text-white mb-4">Practical Next Steps</h4>
            <ul class="space-y-2 text-secondary-600 dark:text-secondary-400">
              <li v-for="step in complianceData.nextSteps" :key="step" class="flex items-start gap-3">
                <i class="fas fa-check-circle text-green-500 mt-0.5"></i>
                <span>{{ step }}</span>
              </li>
            </ul>
          </div>

          <!-- Disclaimer -->
          <div class="glass bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-3xl p-8">
            <div class="flex items-start gap-4">
              <i class="fas fa-exclamation-triangle text-red-500 text-xl mt-1"></i>
              <div>
                <h4 class="text-lg font-bold text-red-800 dark:text-red-200 mb-2">Important Disclaimer</h4>
                <p class="text-red-700 dark:text-red-300 leading-relaxed">
                  This tool provides an educational, non-binding overview and does not constitute legal advice. For specific compliance decisions, consult a qualified legal professional or the relevant official authorities. The AI Act is complex and interpretations may vary.
                </p>
                <p class="text-red-700 dark:text-red-300 leading-relaxed mt-2">
                  For official guidance, visit the <a href="https://www.bundesnetzagentur.de/EN/Areas/Telecommunications/Companies/Telecommunication/AI/AI_node.html" target="_blank" class="underline">Bundesnetzagentur AI Service Desk</a> or use their <a href="https://www.bundesnetzagentur.de/EN/Areas/Telecommunications/Companies/Telecommunication/AI/AIComplianceCompass/AIComplianceCompass_node.html" target="_blank" class="underline">AI Compliance Compass</a>.
                </p>
              </div>
            </div>
          </div>

          <!-- Reset Button -->
          <div class="text-center">
            <button
              @click="reset"
              class="bg-secondary-100 dark:bg-white/5 hover:bg-secondary-200 dark:hover:bg-white/10 text-secondary-700 dark:text-secondary-300 font-bold rounded-2xl px-8 py-3 text-base transition-all"
            >
              Analyze Another Use Case
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const userDescription = ref('');
const currentState = ref<'input' | 'understanding' | 'clarification' | 'results'>('input');
const isLoading = ref(false);
const extractedData = ref<any>({});
const clarificationQuestions = ref<any[]>([]);
const clarificationAnswers = ref<any>({});
const complianceData = ref<any>({});

const sanitizeJsonReply = (reply: string) => {
  let text = reply.trim();

  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fenceMatch?.[1]) {
    text = fenceMatch[1].trim();
  }

  if (text.startsWith('`') && text.endsWith('`')) {
    text = text.replace(/^`+|`+$/g, '').trim();
  }

  return text;
};

const parseJsonReply = (reply: string) => {
  const cleaned = sanitizeJsonReply(reply);
  try {
    return JSON.parse(cleaned);
  } catch (error) {
    const looseMatch = cleaned.match(/\{[\s\S]*\}/m);
    if (looseMatch?.[0]) {
      return JSON.parse(looseMatch[0]);
    }
    throw error;
  }
};

const normalizeExtractedData = (data: any) => ({
  summary: data.summary ?? '',
  role: data.role ?? 'unsure',
  usageType: data.usageType ?? 'unsure',
  domain: data.domain ?? 'unsure',
  dataTypes: Array.isArray(data.dataTypes)
    ? data.dataTypes
    : typeof data.dataTypes === 'string'
    ? data.dataTypes.split(',').map((s: string) => s.trim()).filter(Boolean)
    : ['unsure'],
  impactOnPeople: data.impactOnPeople ?? 'unsure',
  userFacing: typeof data.userFacing === 'boolean' ? data.userFacing : false,
  aiGeneratedContentPublished: typeof data.aiGeneratedContentPublished === 'boolean' ? data.aiGeneratedContentPublished : false,
  syntheticOrManipulatedContent: typeof data.syntheticOrManipulatedContent === 'boolean' ? data.syntheticOrManipulatedContent : false,
  externalProviderUsed: typeof data.externalProviderUsed === 'boolean' ? data.externalProviderUsed : false,
  externalProviderName: data.externalProviderName ?? 'unknown',
  confidence: data.confidence ?? 'low',
  missingFields: Array.isArray(data.missingFields) ? data.missingFields : [],
  redFlags: Array.isArray(data.redFlags) ? data.redFlags : []
});

const normalizeComplianceData = (data: any) => ({
  role: data.role || 'Unclear',
  riskLevel: data.riskLevel || 'Unclear',
  confidence: data.confidence || 'Low',
  reasoning: data.reasoning || 'The information available is incomplete, so the risk assessment should be reviewed carefully.',
  riskExplanation: data.riskExplanation || 'The risk classification is based on the information we have. If the use case is not fully described, the actual risk may differ.',
  gdprCheck: data.gdprCheck || 'If personal or customer data is involved, GDPR review is recommended. Document the data flow and legal basis.',
  copyrightCheck: data.copyrightCheck || 'Review whether AI-generated content is based on copyrighted or third-party material and verify provider terms.',
  transparencyCheck: data.transparencyCheck || 'Keep users informed about AI usage and provide clear disclosures where appropriate.',
  nextSteps: Array.isArray(data.nextSteps)
    ? data.nextSteps
    : [
        'Clarify how data is collected and used by the AI.',
        'Identify whether personal data is processed and check GDPR requirements.',
        'Review the AI provider terms and data handling policies.',
        'Document the AI use case, scope and intended audience.',
        'Consider human oversight for important decisions or customer interactions.',
        'Label AI-generated content clearly where required.',
        'Track any potential biases or unintended impacts.',
        'Seek specialized legal advice for high-risk AI applications.'
      ]
});

const riskTheme = computed(() => {
  const level = (complianceData.value.riskLevel || '').toString().toLowerCase();
  if (level.includes('high')) {
    return { bg: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300', icon: 'fas fa-exclamation-triangle', label: 'Assessment: High Risk' };
  }
  if (level.includes('limited')) {
    return { bg: 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300', icon: 'fas fa-exclamation-circle', label: 'Assessment: Limited Risk' };
  }
  if (level.includes('minimal') || level.includes('low')) {
    return { bg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300', icon: 'fas fa-shield-alt', label: 'Assessment: Lower Risk' };
  }
  return { bg: 'bg-secondary-100 text-secondary-700 dark:bg-white/5 dark:text-secondary-300', icon: 'fas fa-question-circle', label: 'Need more info' };
});

const confidenceTheme = computed(() => {
  const confidence = (complianceData.value.confidence || '').toString().toLowerCase();
  if (confidence.includes('high')) {
    return { bg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300', icon: 'fas fa-check-circle', label: 'High confidence' };
  }
  if (confidence.includes('medium')) {
    return { bg: 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300', icon: 'fas fa-adjust', label: 'Medium confidence' };
  }
  if (confidence.includes('low')) {
    return { bg: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300', icon: 'fas fa-exclamation-circle', label: 'Low confidence' };
  }
  return { bg: 'bg-secondary-100 text-secondary-700 dark:bg-white/5 dark:text-secondary-300', icon: 'fas fa-question-circle', label: 'Unknown confidence' };
});

const isFieldMissing = (field: string) => {
  const value = extractedData.value[field];
  if (field === 'dataTypes') {
    return !Array.isArray(value) || value.length === 0 || value.includes('unsure');
  }
  return !value || value === 'unsure';
};

const buildClarificationQuestions = () => {
  clarificationQuestions.value = [];
  clarificationAnswers.value = {};

  const questions: Array<any> = [];

  if (isFieldMissing('role')) {
    questions.push({
      id: 'role',
      text: 'What is your role in this AI use case?',
      type: 'select',
      options: [
        { value: 'provider', label: 'Provider - I build/provide AI systems' },
        { value: 'deployer', label: 'Deployer - I use AI systems in my organization' },
        { value: 'importer', label: 'Importer - I import AI systems into the EU' },
        { value: 'distributor', label: 'Distributor - I distribute AI systems' },
        { value: 'product_manufacturer', label: 'Product Manufacturer - I integrate AI into products' }
      ]
    });
  }

  if (isFieldMissing('usageType')) {
    questions.push({
      id: 'usageType',
      text: 'How are you using AI?',
      type: 'select',
      options: [
        { value: 'existing_tool', label: 'Using an existing AI tool (like ChatGPT, Groq)' },
        { value: 'building_system', label: 'Building/providing my own AI system' },
        { value: 'integrating_ai', label: 'Integrating AI into a product or service' },
        { value: 'training_model', label: 'Training or fine-tuning a model' },
        { value: 'generating_content', label: 'Generating content (text, images, etc.)' },
        { value: 'automated_decision_support', label: 'Automated decision support' }
      ]
    });
  }

  if (isFieldMissing('domain')) {
    questions.push({
      id: 'domain',
      text: 'Which domain best describes the AI use case?',
      type: 'select',
      options: [
        { value: 'customer_support', label: 'Customer support' },
        { value: 'marketing', label: 'Marketing or content generation' },
        { value: 'employment', label: 'Employment/HR' },
        { value: 'education', label: 'Education' },
        { value: 'healthcare', label: 'Healthcare' },
        { value: 'finance', label: 'Finance, credit or insurance' },
        { value: 'public_services', label: 'Public services' },
        { value: 'law_enforcement', label: 'Law enforcement' },
        { value: 'migration', label: 'Migration or asylum' },
        { value: 'internal_productivity', label: 'Internal productivity' },
        { value: 'software_development', label: 'Software development' },
        { value: 'other', label: 'Other / not sure' }
      ]
    });
  }

  if (isFieldMissing('dataTypes')) {
    questions.push({
      id: 'dataTypes',
      text: 'What types of data does the AI process?',
      type: 'text',
      placeholder: 'e.g. user messages, emails, CVs, customer data, images, scraped content'
    });
  }

  if (isFieldMissing('impactOnPeople')) {
    questions.push({
      id: 'impactOnPeople',
      text: 'How does the AI output affect people?',
      type: 'select',
      options: [
        { value: 'none', label: 'No significant impact on people' },
        { value: 'suggestions_only', label: 'Provides suggestions only' },
        { value: 'influences_decisions', label: 'Influences decisions about people' },
        { value: 'automates_decisions', label: 'Automates decisions about people' },
        { value: 'affects_essential_access', label: 'Affects access to essential services (education, jobs, healthcare, etc.)' }
      ]
    });
  }

  clarificationQuestions.value = questions.slice(0, 3);
  clarificationQuestions.value.forEach(question => {
    clarificationAnswers.value[question.id] = '';
  });
};

const needsClarification = () => {
  return ['role', 'usageType', 'domain', 'dataTypes', 'impactOnPeople'].some(isFieldMissing);
};

const analyzeDescription = async () => {
  if (isLoading.value || !userDescription.value.trim()) return;
  isLoading.value = true;

  try {
    const prompt = `Extract structured information from this AI use case description: "${userDescription.value}"

Return a JSON object with these exact fields:
{
  "summary": "brief summary",
  "role": "provider | deployer | importer | distributor | product_manufacturer | unsure",
  "usageType": "existing_tool | building_system | integrating_ai | training_model | generating_content | automated_decision_support | unsure",
  "domain": "education | employment | healthcare | finance | public_services | law_enforcement | migration | marketing | customer_support | internal_productivity | software_development | other | unsure",
  "dataTypes": ["personal_data", "sensitive_data", "children_data", "confidential_data", "copyrighted_material", "scraped_data", "none", "unsure"],
  "impactOnPeople": "none | suggestions_only | influences_decisions | automates_decisions | affects_essential_access | unsure",
  "userFacing": true/false,
  "aiGeneratedContentPublished": true/false,
  "syntheticOrManipulatedContent": true/false,
  "externalProviderUsed": true/false,
  "externalProviderName": "name or unknown",
  "confidence": "low | medium | high",
  "missingFields": ["array of missing field names"],
  "redFlags": ["array of potential issues"]
}

Be conservative - if unsure, use "unsure" values. Focus on extracting what's clearly stated.`;

    const response = await $fetch<{ reply: string }>('/.netlify/functions/groqChat', {
      method: 'POST',
      body: {
        prompt,
        maxLines: 50,
        systemPrompt: "You are an AI compliance analysis expert. Extract structured data from user descriptions. Return only valid JSON, no extra text."
      }
    });

    if (response && response.reply) {
      try {
        const parsed = parseJsonReply(response.reply);
        extractedData.value = normalizeExtractedData(parsed);

        if (needsClarification()) {
          buildClarificationQuestions();
          currentState.value = 'clarification';
        } else {
          currentState.value = 'understanding';
        }
      } catch (e) {
        console.error('Failed to parse AI response:', e);
        console.error('Raw AI reply:', response.reply);
        // Fallback to basic extraction
        extractedData.value = {
          summary: userDescription.value,
          role: 'unsure',
          usageType: 'unsure',
          domain: 'unsure',
          dataTypes: ['unsure'],
          impactOnPeople: 'unsure',
          userFacing: false,
          confidence: 'low',
          missingFields: ['role', 'usageType', 'domain', 'dataTypes', 'impactOnPeople'],
          redFlags: []
        };
        buildClarificationQuestions();
        currentState.value = 'clarification';
      }
    }
  } catch (error: any) {
    console.error('Analysis error:', error);
  } finally {
    isLoading.value = false;
  }
};

const proceedToResults = async () => {
  await generateComplianceReport();
};

const askClarification = () => {
  buildClarificationQuestions();
  currentState.value = 'clarification';
};

const submitClarification = async () => {
  // Update extracted data with answers
  Object.keys(clarificationAnswers.value).forEach(key => {
    if (key === 'dataTypes') {
      extractedData.value.dataTypes = clarificationAnswers.value[key].split(',').map((s: string) => s.trim().toLowerCase());
    } else {
      extractedData.value[key] = clarificationAnswers.value[key];
    }
  });

  await generateComplianceReport();
};

const generateComplianceReport = async () => {
  isLoading.value = true;
  currentState.value = 'results';

  try {
    const prompt = `Based on this structured AI use case data, generate a compliance report for the EU AI Act and related regulations:

${JSON.stringify(extractedData.value, null, 2)}

Generate a compliance analysis with these sections:

1. Quick classification:
- role: [provider/deployer/etc]
- riskLevel: [minimal/limited/high-risk/prohibited/unclear]
- confidence: [low/medium/high]
- reasoning: [brief explanation]

2. riskExplanation: [detailed explanation of AI Act risk level]

3. gdprCheck: [explanation of GDPR relevance and requirements]

4. copyrightCheck: [explanation of copyright/IP relevance]

5. transparencyCheck: [explanation of transparency/labeling requirements]

6. nextSteps: [array of 5-8 practical action items]

Use plain language, avoid legal certainty, use words like "likely", "may", "should be reviewed". Include disclaimer language.

Return as JSON object with these exact field names.`;

    const response = await $fetch<{ reply: string }>('/.netlify/functions/groqChat', {
      method: 'POST',
      body: {
        prompt,
        maxLines: 100,
        systemPrompt: "You are an AI compliance expert. Generate educational compliance reports. Return only valid JSON."
      }
    });

    if (response && response.reply) {
      try {
        const parsed = parseJsonReply(response.reply);
        complianceData.value = normalizeComplianceData(parsed);
      } catch (e) {
        console.error('Failed to parse compliance response:', e);
        console.error('Raw AI reply:', response.reply);
        // Fallback compliance data
        complianceData.value = {
          role: extractedData.value.role || 'unsure',
          riskLevel: 'unclear',
          confidence: 'low',
          reasoning: 'Based on the information provided, the compliance requirements are unclear and should be reviewed by a legal professional.',
          riskExplanation: 'The risk level cannot be determined with confidence from the available information. This may require specialist legal review.',
          gdprCheck: 'If personal data is processed, GDPR may apply. Consider data minimization and lawful processing bases.',
          copyrightCheck: 'If training data includes copyrighted material, copyright considerations may apply.',
          transparencyCheck: 'If users interact with AI, transparency about AI use may be beneficial.',
          nextSteps: [
            'Define your AI system purpose clearly',
            'Identify your role under the AI Act',
            'Map input data and output usage',
            'Check for personal data processing',
            'Review third-party AI provider terms',
            'Document the use case internally',
            'Consider human oversight for important decisions',
            'Seek legal advice for high-risk scenarios'
          ]
        };
      }
    }
  } catch (error: any) {
    console.error('Compliance generation error:', error);
  } finally {
    isLoading.value = false;
    // Merge extracted data into compliance results so clarified values are preserved
    complianceData.value.role = extractedData.value.role || complianceData.value.role;
    complianceData.value.confidence = extractedData.value.confidence || complianceData.value.confidence;
  }
};

const reset = () => {
  userDescription.value = '';
  currentState.value = 'input';
  extractedData.value = {};
  clarificationQuestions.value = [];
  clarificationAnswers.value = {};
  complianceData.value = {};
};

useHead({
  title: "AI Compliance Compass | Igal Vilensky",
  meta: [
    { name: 'description', content: 'Educational AI compliance tool for understanding EU AI Act requirements and related regulations.' }
  ]
});
</script>

<style scoped>
.glass {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.text-gradient-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>