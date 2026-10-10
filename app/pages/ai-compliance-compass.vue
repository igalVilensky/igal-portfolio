<template>
  <div class="page-shell">
    <div class="page-container">
      <!-- Page Header -->
      <header class="page-header">
        <div class="page-header-main">
        <div class="page-kicker">
          <span class="h-1.5 w-1.5 rounded-full bg-primary-500"></span>
          {{ t('ui.responsible_ai_workflow') }}
        </div>
        <h1 class="page-title">
          AI Compliance Compass
        </h1>
        </div>
        <div class="page-header-side">
        <p class="page-intro">
          {{ t('ui.a_practical_educational_ai_usecase_checker_for_germany_and') }}
        </p>
        <p class="mt-4 text-xs font-semibold uppercase tracking-widest text-secondary-500 dark:text-secondary-400">
          {{ t('ui.educational_advisory_tool_not_legal_advice') }}
        </p>
        </div>
      </header>

      <!-- Main Content -->
      <div class="max-w-4xl space-y-8">
        <!-- Initial Input State -->
        <div v-if="currentState === 'input'" class="rounded-2xl border border-secondary-200 dark:border-white/10 bg-white dark:bg-dark-surface/30 p-8 mb-8">
          <div class="space-y-6">
            <div>
              <h2 class="text-2xl font-bold text-secondary-900 dark:text-white mb-2">
                {{ t('ui.describe_your_ai_use_case') }}
              </h2>
              <p class="text-secondary-600 dark:text-secondary-400">
                {{ t('ui.tell_us_how_you_use_build_or_plan_to') }}
              </p>
            </div>

            <div class="space-y-4">
              <textarea
                v-model="userDescription"
                rows="4"
                :placeholder="t('ui.eg_we_use_chatgpt_to_summarize_customer_support_ticketseg')"
                class="w-full bg-secondary-50 dark:bg-white/5 border border-secondary-200 dark:border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-secondary-900 dark:text-white resize-none text-base"
              ></textarea>
              <p class="text-sm text-secondary-500 dark:text-secondary-400">
                {{ t('ui.be_specific_about_the_ai_tool_data_involved_users') }}
              </p>
            </div>

            <button
              @click="analyzeDescription"
              :disabled="isLoading || !userDescription.trim()"
              class="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 py-3 text-base font-bold text-white transition-all hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Loader2 v-if="isLoading" :size="18" class="animate-spin" />
              <Search v-else :size="18" />
              <span>{{ isLoading ? t('ui.analyzing') : t('ui.analyze_my_use_case') }}</span>
            </button>

            <p v-if="errorMessage" class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200">
              {{ displayText(errorMessage) }}
            </p>
          </div>
        </div>

        <!-- Extracted Understanding State -->
        <div v-if="currentState === 'understanding'" class="space-y-6">
          <div class="rounded-2xl border border-secondary-200 dark:border-white/10 bg-white dark:bg-dark-surface/30 p-8">
            <div class="mb-8">
              <h2 class="text-2xl font-bold text-secondary-900 dark:text-white mb-2">
                {{ t('ui.extracted_information') }}
              </h2>
              <p class="text-secondary-600 dark:text-secondary-400">
                {{ t('ui.heres_what_i_understood_from_your_description') }}
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div class="bg-secondary-50 dark:bg-white/5 rounded-lg p-4 border border-secondary-100 dark:border-white/5">
                <div class="text-xs font-bold uppercase tracking-widest text-secondary-500 dark:text-secondary-400 mb-2">{{ t('ui.role') }}</div>
                <div class="text-secondary-900 dark:text-white font-semibold">{{ displayText(extractedData.role) }}</div>
              </div>
              <div class="bg-secondary-50 dark:bg-white/5 rounded-lg p-4 border border-secondary-100 dark:border-white/5">
                <div class="text-xs font-bold uppercase tracking-widest text-secondary-500 dark:text-secondary-400 mb-2">{{ t('ui.ai_usage') }}</div>
                <div class="text-secondary-900 dark:text-white font-semibold">{{ displayText(extractedData.usageType) }}</div>
              </div>
              <div class="bg-secondary-50 dark:bg-white/5 rounded-lg p-4 border border-secondary-100 dark:border-white/5">
                <div class="text-xs font-bold uppercase tracking-widest text-secondary-500 dark:text-secondary-400 mb-2">{{ t('ui.domain') }}</div>
                <div class="text-secondary-900 dark:text-white font-semibold">{{ displayText(extractedData.domain) }}</div>
              </div>
              <div class="bg-secondary-50 dark:bg-white/5 rounded-lg p-4 border border-secondary-100 dark:border-white/5">
                <div class="text-xs font-bold uppercase tracking-widest text-secondary-500 dark:text-secondary-400 mb-2">{{ t('ui.data_types') }}</div>
                <div class="text-secondary-900 dark:text-white font-semibold">{{ extractedData.dataTypes?.map(displayText).join(', ') || displayText('unsure') }}</div>
              </div>
              <div class="bg-secondary-50 dark:bg-white/5 rounded-lg p-4 border border-secondary-100 dark:border-white/5">
                <div class="text-xs font-bold uppercase tracking-widest text-secondary-500 dark:text-secondary-400 mb-2">{{ t('ui.impact') }}</div>
                <div class="text-secondary-900 dark:text-white font-semibold">{{ displayText(extractedData.impactOnPeople) }}</div>
              </div>
            </div>

            <div class="flex gap-3">
              <button
                @click="proceedToResults"
                class="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg py-3 text-base transition-all"
              >
                {{ t('ui.continue') }}
              </button>
              <button
                @click="askClarification"
                class="flex-1 bg-secondary-100 dark:bg-white/5 hover:bg-secondary-200 dark:hover:bg-white/10 text-secondary-700 dark:text-secondary-300 font-bold rounded-lg py-3 text-base transition-all"
              >
                {{ t('ui.clarify') }}
              </button>
            </div>
          </div>
        </div>

        <!-- Clarification State -->
        <div v-if="currentState === 'clarification'" class="rounded-2xl border border-secondary-200 dark:border-white/10 bg-white dark:bg-dark-surface/30 p-8 mb-8">
          <div class="mb-6">
            <h2 class="text-2xl font-bold text-secondary-900 dark:text-white mb-2">
              {{ t('ui.need_more_details') }}
            </h2>
            <p class="text-secondary-600 dark:text-secondary-400">
              {{ t('ui.please_clarify_the_missing_information') }}
            </p>
          </div>

          <div class="space-y-4">
            <div v-for="question in clarificationQuestions" :key="question.id" class="space-y-2">
              <label class="text-sm font-semibold text-secondary-900 dark:text-white">{{ displayText(question.text) }}</label>
              <input
                v-if="question.type === 'text'"
                v-model="clarificationAnswers[question.id]"
                type="text"
                :placeholder="displayText(question.placeholder)"
                class="w-full bg-secondary-50 dark:bg-white/5 border border-secondary-200 dark:border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-secondary-900 dark:text-white"
              />
              <select
                v-else-if="question.type === 'select'"
                v-model="clarificationAnswers[question.id]"
                class="clarification-select w-full bg-secondary-50 dark:bg-white/5 border border-secondary-200 dark:border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-secondary-900 dark:text-white"
              >
                <option disabled value="">{{ t('ui.select_an_option') }}</option>
                <option v-for="option in question.options" :key="option.value" :value="option.value">{{ displayText(option.label) }}</option>
              </select>
            </div>
          </div>

          <button
            @click="submitClarification"
            :disabled="isLoading"
            class="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 py-3 text-base font-bold text-white transition-all hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Loader2 v-if="isLoading" :size="18" class="animate-spin" />
            <Check v-else :size="18" />
            <span>{{ isLoading ? t('ui.processing') : t('ui.continue') }}</span>
          </button>
        </div>

        <!-- Results State -->
        <div v-if="currentState === 'results'" class="space-y-6">
          <!-- Header -->
          <div class="rounded-2xl border border-secondary-200 dark:border-white/10 bg-white dark:bg-dark-surface/30 p-8 mb-6">
            <h2 class="text-2xl font-bold text-secondary-900 dark:text-white mb-4">{{ t('ui.compliance_assessment') }}</h2>
            <p class="text-secondary-600 dark:text-secondary-400">{{ t('ui.educational_overview_based_on_the_ai_act_and_related') }}</p>
            <p v-if="errorMessage" class="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200">
              {{ displayText(errorMessage) }}
            </p>
          </div>

            <!-- Quick Classification -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div class="bg-secondary-50 dark:bg-white/5 rounded-xl p-5 text-center border border-secondary-200 dark:border-white/10">
                <div class="text-xs font-bold uppercase tracking-widest text-secondary-500 dark:text-secondary-400 mb-3">{{ t('ui.likely_role') }}</div>
                <div class="flex items-center justify-center gap-2">
                  <i class="fas fa-user-gear text-primary-600"></i>
                  <span class="text-secondary-900 dark:text-white font-bold text-lg">{{ displayText(complianceData.role) }}</span>
                </div>
                <div class="text-sm text-secondary-500 dark:text-secondary-400 mt-2">{{ t('ui.role_inferred_from_use_case_and_deployment_context') }}</div>
              </div>
              <div class="rounded-xl p-5 text-center border border-secondary-200 dark:border-white/10" :class="riskTheme.bg">
                <div class="text-xs font-bold uppercase tracking-widest text-secondary-500 dark:text-secondary-400 mb-3">{{ t('ui.ai_act_risk_level') }}</div>
                <div class="flex items-center justify-center gap-2">
                  <i :class="riskTheme.icon"></i>
                  <span class="font-bold text-lg">{{ displayText(complianceData.riskLevel) }}</span>
                </div>
                <div class="text-sm mt-2 opacity-90">{{ displayText(riskTheme.label) }}</div>
              </div>
              <div class="rounded-xl p-5 text-center border border-secondary-200 dark:border-white/10" :class="confidenceTheme.bg">
                <div class="text-xs font-bold uppercase tracking-widest text-secondary-500 dark:text-secondary-400 mb-3">{{ t('portfolioAgent.confidence.label') }}</div>
                <div class="flex items-center justify-center gap-2">
                  <i :class="confidenceTheme.icon"></i>
                  <span class="font-bold text-lg">{{ displayText(complianceData.confidence) }}</span>
                </div>
                <div class="text-sm mt-2 opacity-90">{{ t('ui.how_sure_the_snapshot_is_based_on_available_information') }}</div>
              </div>
            </div>

            <div class="text-sm text-secondary-600 dark:text-secondary-400 mb-6 leading-relaxed">
              {{ displayText(complianceData.reasoning) }}
            </div>
          </div>

          <!-- Risk Explanation -->
          <div class="rounded-2xl border border-secondary-200 dark:border-white/10 bg-white dark:bg-dark-surface/30 p-8">
            <h3 class="text-lg font-bold text-secondary-900 dark:text-white mb-4">{{ t('ui.ai_act_risk_explanation') }}</h3>
            <div class="text-secondary-600 dark:text-secondary-400 leading-relaxed text-sm">
              {{ displayText(complianceData.riskExplanation) }}
            </div>
          </div>

          <!-- Data Protection Check -->
          <div class="rounded-2xl border border-secondary-200 dark:border-white/10 bg-white dark:bg-dark-surface/30 p-8">
            <h3 class="text-lg font-bold text-secondary-900 dark:text-white mb-4">{{ t('ui.data_protection_check') }}</h3>
            <div class="text-secondary-600 dark:text-secondary-400 leading-relaxed text-sm">
              {{ displayText(complianceData.gdprCheck) }}
            </div>
          </div>

          <!-- Copyright Check -->
          <div class="rounded-2xl border border-secondary-200 dark:border-white/10 bg-white dark:bg-dark-surface/30 p-8">
            <h3 class="text-lg font-bold text-secondary-900 dark:text-white mb-4">{{ t('ui.copyright_content_check') }}</h3>
            <div class="text-secondary-600 dark:text-secondary-400 leading-relaxed text-sm">
              {{ displayText(complianceData.copyrightCheck) }}
            </div>
          </div>

          <!-- Transparency Check -->
          <div class="rounded-2xl border border-secondary-200 dark:border-white/10 bg-white dark:bg-dark-surface/30 p-8">
            <h3 class="text-lg font-bold text-secondary-900 dark:text-white mb-4">{{ t('ui.transparency_labeling_check') }}</h3>
            <div class="text-secondary-600 dark:text-secondary-400 leading-relaxed text-sm">
              {{ displayText(complianceData.transparencyCheck) }}
            </div>
          </div>

          <!-- AI Literacy -->
          <div class="rounded-2xl border border-secondary-200 dark:border-white/10 bg-white dark:bg-dark-surface/30 p-8">
            <h3 class="text-lg font-bold text-secondary-900 dark:text-white mb-4">{{ t('ui.ai_literacy_governance') }}</h3>
            <div class="text-secondary-600 dark:text-secondary-400 leading-relaxed text-sm">
              {{ t('ui.organisations_should_ensure_people_involved_in_ai_use_understand') }}
            </div>
          </div>

          <!-- Next Steps -->
          <div class="rounded-2xl border border-secondary-200 dark:border-white/10 bg-white dark:bg-dark-surface/30 p-8">
            <h3 class="text-lg font-bold text-secondary-900 dark:text-white mb-4">{{ t('ui.practical_next_steps') }}</h3>
            <ul class="space-y-2 text-secondary-600 dark:text-secondary-400 text-sm">
              <li v-for="step in complianceData.nextSteps" :key="step" class="flex items-start gap-3">
                <i class="fas fa-check text-primary-600 mt-0.5 flex-shrink-0"></i>
                <span>{{ displayText(step) }}</span>
              </li>
            </ul>
          </div>

          <!-- Disclaimer -->
          <div class="rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-8">
            <h3 class="text-lg font-bold text-amber-900 dark:text-amber-100 mb-3">{{ t('ui.important_disclaimer') }}</h3>
            <p class="text-amber-800 dark:text-amber-200 text-sm leading-relaxed mb-3">
              {{ t('ui.this_tool_provides_an_educational_nonbinding_overview_and_does') }}
            </p>
            <p class="text-amber-800 dark:text-amber-200 text-sm leading-relaxed">
              {{ t('ui.for_official_guidance_visit_the') }} <a href="https://www.bundesnetzagentur.de/EN/Areas/Telecommunications/Companies/Telecommunication/AI/AI_node.html" target="_blank" rel="noopener noreferrer" class="underline hover:opacity-70">{{ t('ui.bundesnetzagentur_ai_service_desk') }}</a> {{ t('ui.or_use_their') }} <a href="https://www.bundesnetzagentur.de/EN/Areas/Telecommunications/Companies/Telecommunication/AI/AIComplianceCompass/AIComplianceCompass_node.html" target="_blank" rel="noopener noreferrer" class="underline hover:opacity-70">AI Compliance Compass</a>.
            </p>
          </div>

          <!-- Reset Button -->
          <div class="text-center mt-8">
            <button
              @click="reset"
              class="bg-secondary-100 dark:bg-white/5 hover:bg-secondary-200 dark:hover:bg-white/10 text-secondary-700 dark:text-secondary-300 font-bold rounded-lg px-8 py-3 text-base transition-all"
            >
              {{ t('ui.analyze_another_use_case') }}
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
const { t, locale, te } = useI18n();
import { ref, computed } from 'vue';
import { Loader2, Search, Check } from "lucide-vue-next";

const responseLanguage = computed(() => locale.value === 'de' ? 'German' : locale.value === 'ru' ? 'Russian' : 'English');
const enumKeys: Record<string, string> = {
  "provider": "ui.provider",
  "deployer": "ui.deployer",
  "importer": "ui.importer",
  "distributor": "ui.distributor",
  "product_manufacturer": "ui.product_manufacturer",
  "existing_tool": "ui.existing_ai_tool",
  "building_system": "ui.building_an_ai_system",
  "integrating_ai": "ui.ai_integration",
  "training_model": "ui.model_training",
  "generating_content": "ui.content_generation",
  "automated_decision_support": "ui.automated_decision_support",
  "education": "ui.education",
  "employment": "ui.employmenthr",
  "healthcare": "ui.healthcare",
  "finance": "ui.finance_credit_or_insurance",
  "public_services": "ui.public_services",
  "law_enforcement": "ui.law_enforcement",
  "migration": "ui.migration_or_asylum",
  "marketing": "ui.marketing_or_content_generation",
  "customer_support": "ui.customer_support",
  "internal_productivity": "ui.internal_productivity",
  "software_development": "ui.software_development",
  "other": "ui.other_not_sure",
  "unsure": "ui.unclear",
  "unclear": "ui.unclear",
  "unknown": "ui.unclear",
  "personal_data": "ui.personal_data",
  "sensitive_data": "ui.sensitive_data",
  "children_data": "ui.childrens_data",
  "confidential_data": "ui.confidential_data",
  "copyrighted_material": "ui.copyrighted_material",
  "scraped_data": "ui.scraped_data",
  "none": "ui.none",
  "suggestions_only": "ui.provides_suggestions_only",
  "suggests_only": "ui.provides_suggestions_only",
  "influences_decisions": "ui.influences_decisions_about_people",
  "automates_decisions": "ui.automates_decisions_about_people",
  "affects_essential_access": "ui.affects_access_to_essential_services_education_jobs_healthcare_etc",
  "minimal": "ui.minimal_risk",
  "low": "ui.low",
  "limited": "ui.limited_risk",
  "high-risk": "ui.high_risk",
  "high": "ui.high",
  "prohibited": "ui.prohibited",
  "medium": "ui.medium"
};
const displayText = (value: unknown): string => {
  if (typeof value !== 'string' || !value) return t('ui.unclear');
  if (value.startsWith('ui.') && te(value)) return t(value);
  const key = enumKeys[value.toLowerCase()];
  return key ? t(key) : value;
};

const userDescription = ref('');
const currentState = ref<'input' | 'understanding' | 'clarification' | 'results'>('input');
const isLoading = ref(false);
const extractedData = ref<any>({});
const clarificationQuestions = ref<any[]>([]);
const clarificationAnswers = ref<any>({});
const complianceData = ref<any>({});
const errorMessage = ref('');
const groqChat = useGroqChat();

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

const inferFieldsFromDescription = (text: string, data: any) => {
  const lower = text.toLowerCase();

  if (!data.role || data.role === 'unsure') {
    if (/(we use|we are using|our team|we use ai|we use chatgpt|using chatgpt|customer support|support tickets|ticket|customer tickets)/.test(lower)) {
      data.role = 'deployer';
    }
  }

  if (!Array.isArray(data.dataTypes) || data.dataTypes.length === 0 || data.dataTypes.includes('unsure') || (data.dataTypes.length === 1 && data.dataTypes[0] === 'none')) {
    if (/(customer|support ticket|ticket|user message|user data|customer support|customer tickets|customer service|client data)/.test(lower)) {
      data.dataTypes = ['personal_data'];
    }
  }

  if (!data.impactOnPeople || data.impactOnPeople === 'unsure' || data.impactOnPeople === 'none') {
    if (/(support|customer support|ticket|message|summarize|summary)/.test(lower)) {
      data.impactOnPeople = 'suggestions_only';
    }
  }

  return data;
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
  role: data.role || 'unclear',
  riskLevel: data.riskLevel || 'unclear',
  confidence: data.confidence || 'low',
  reasoning: data.reasoning || "ui.the_information_available_is_incomplete_so_the_risk_assessment",
  riskExplanation: data.riskExplanation || "ui.the_risk_classification_is_based_on_the_information_we",
  gdprCheck: data.gdprCheck || "ui.if_personal_or_customer_data_is_involved_gdpr_review",
  copyrightCheck: data.copyrightCheck || "ui.review_whether_aigenerated_content_is_based_on_copyrighted_or",
  transparencyCheck: data.transparencyCheck || "ui.keep_users_informed_about_ai_usage_and_provide_clear",
  nextSteps: Array.isArray(data.nextSteps)
    ? data.nextSteps
    : [
        "ui.clarify_how_data_is_collected_and_used_by_the",
        "ui.identify_whether_personal_data_is_processed_and_check_gdpr",
        "ui.review_the_ai_provider_terms_and_data_handling_policies",
        "ui.document_the_ai_use_case_scope_and_intended_audience",
        "ui.consider_human_oversight_for_important_decisions_or_customer_interactions",
        "ui.label_aigenerated_content_clearly_where_required",
        "ui.track_any_potential_biases_or_unintended_impacts",
        "ui.seek_specialized_legal_advice_for_highrisk_ai_applications"
      ]
});

const riskTheme = computed(() => {
  const level = (complianceData.value.riskLevel || '').toString().toLowerCase();
  if (level.includes('high')) {
    return { bg: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300', icon: 'fas fa-exclamation-triangle', label: "ui.assessment_high_risk" };
  }
  if (level.includes('limited')) {
    return { bg: 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300', icon: 'fas fa-exclamation-circle', label: "ui.assessment_limited_risk" };
  }
  if (level.includes('minimal') || level.includes('low')) {
    return { bg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300', icon: 'fas fa-shield-alt', label: "ui.assessment_lower_risk" };
  }
  return { bg: 'bg-secondary-100 text-secondary-700 dark:bg-white/5 dark:text-secondary-300', icon: 'fas fa-question-circle', label: "ui.need_more_info" };
});

const confidenceTheme = computed(() => {
  const confidence = (complianceData.value.confidence || '').toString().toLowerCase();
  if (confidence.includes('high')) {
    return { bg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300', icon: 'fas fa-check-circle', label: "ui.high_confidence" };
  }
  if (confidence.includes('medium')) {
    return { bg: 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300', icon: 'fas fa-adjust', label: "ui.medium_confidence" };
  }
  if (confidence.includes('low')) {
    return { bg: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300', icon: 'fas fa-exclamation-circle', label: "ui.low_confidence" };
  }
  return { bg: 'bg-secondary-100 text-secondary-700 dark:bg-white/5 dark:text-secondary-300', icon: 'fas fa-question-circle', label: "ui.unknown_confidence" };
});

const isFieldMissing = (field: string) => {
  const value = extractedData.value[field];
  if (field === 'dataTypes') {
    return (
      !Array.isArray(value) ||
      value.length === 0 ||
      value.includes('unsure') ||
      (value.length === 1 && value[0] === 'none')
    );
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
      text: "ui.what_is_your_role_in_this_ai_use_case",
      type: 'select',
      options: [
        { value: 'provider', label: "ui.provider_i_buildprovide_ai_systems" },
        { value: 'deployer', label: "ui.deployer_i_use_ai_systems_in_my_organization" },
        { value: 'importer', label: "ui.importer_i_import_ai_systems_into_the_eu" },
        { value: 'distributor', label: "ui.distributor_i_distribute_ai_systems" },
        { value: 'product_manufacturer', label: "ui.product_manufacturer_i_integrate_ai_into_products" }
      ]
    });
  }

  if (isFieldMissing('usageType')) {
    questions.push({
      id: 'usageType',
      text: "ui.how_are_you_using_ai",
      type: 'select',
      options: [
        { value: 'existing_tool', label: "ui.using_an_existing_ai_tool_like_chatgpt_groq" },
        { value: 'building_system', label: "ui.buildingproviding_my_own_ai_system" },
        { value: 'integrating_ai', label: "ui.integrating_ai_into_a_product_or_service" },
        { value: 'training_model', label: "ui.training_or_finetuning_a_model" },
        { value: 'generating_content', label: "ui.generating_content_text_images_etc" },
        { value: 'automated_decision_support', label: "ui.automated_decision_support" }
      ]
    });
  }

  if (isFieldMissing('domain')) {
    questions.push({
      id: 'domain',
      text: "ui.which_domain_best_describes_the_ai_use_case",
      type: 'select',
      options: [
        { value: 'customer_support', label: "ui.customer_support" },
        { value: 'marketing', label: "ui.marketing_or_content_generation" },
        { value: 'employment', label: "ui.employmenthr" },
        { value: 'education', label: "ui.education" },
        { value: 'healthcare', label: "ui.healthcare" },
        { value: 'finance', label: "ui.finance_credit_or_insurance" },
        { value: 'public_services', label: "ui.public_services" },
        { value: 'law_enforcement', label: "ui.law_enforcement" },
        { value: 'migration', label: "ui.migration_or_asylum" },
        { value: 'internal_productivity', label: "ui.internal_productivity" },
        { value: 'software_development', label: "ui.software_development" },
        { value: 'other', label: "ui.other_not_sure" }
      ]
    });
  }

  if (isFieldMissing('dataTypes')) {
    questions.push({
      id: 'dataTypes',
      text: "ui.what_types_of_data_does_the_ai_process",
      type: 'text',
      placeholder: "ui.eg_user_messages_emails_cvs_customer_data_images_scraped"
    });
  }

  if (isFieldMissing('impactOnPeople')) {
    questions.push({
      id: 'impactOnPeople',
      text: "ui.how_does_the_ai_output_affect_people",
      type: 'select',
      options: [
        { value: 'none', label: "ui.no_significant_impact_on_people" },
        { value: 'suggestions_only', label: "ui.provides_suggestions_only" },
        { value: 'influences_decisions', label: "ui.influences_decisions_about_people" },
        { value: 'automates_decisions', label: "ui.automates_decisions_about_people" },
        { value: 'affects_essential_access', label: "ui.affects_access_to_essential_services_education_jobs_healthcare_etc" }
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
  errorMessage.value = '';

  try {
    const prompt = `Extract structured information from this AI use case description: "${userDescription.value}"

IMPORTANT: Be intelligent about inferring missing information from context.

For dataTypes: Infer from the description. If it mentions:
- customer/user interactions, support tickets, messages → includes personal_data
- employee data, hiring, HR → includes sensitive_data  
- public content, marketing → may not include sensitive data
Don't just return "unsure" - extract what's actually implied.

For impactOnPeople: Infer based on how the AI affects decisions or people:
- If used for support/suggestions → suggests_only
- If used for hiring, credit, healthcare → influences_decisions or automates_decisions
- If it's internal/analytical only → none

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

Be smart - infer from context. Write free-text fields in ${responseLanguage.value}; keep all JSON keys and enum codes exactly as specified. Return only valid JSON.`;

    const response = await groqChat({
      prompt,
      maxLines: 50,
      systemPrompt: "You are an AI compliance analysis expert. Extract structured data from user descriptions. Return only valid JSON, no extra text."
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
    errorMessage.value = "ui.the_ai_analysis_service_is_unavailable";
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
  errorMessage.value = '';

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

Write reasoning, explanations, checks, and nextSteps in ${responseLanguage.value}. Keep role, riskLevel, confidence and JSON field names as the exact English codes specified above. Return as JSON object with these exact field names.`;

    const response = await groqChat({
      prompt,
      maxLines: 100,
      systemPrompt: "You are an AI compliance expert. Generate educational compliance reports. Return only valid JSON."
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
          reasoning: "ui.based_on_the_information_provided_the_compliance_requirements_are",
          riskExplanation: "ui.the_risk_level_cannot_be_determined_with_confidence_from",
          gdprCheck: "ui.if_personal_data_is_processed_gdpr_may_apply_consider",
          copyrightCheck: "ui.if_training_data_includes_copyrighted_material_copyright_considerations_may",
          transparencyCheck: "ui.if_users_interact_with_ai_transparency_about_ai_use",
          nextSteps: [
            "ui.define_your_ai_system_purpose_clearly",
            "ui.identify_your_role_under_the_ai_act",
            "ui.map_input_data_and_output_usage",
            "ui.check_for_personal_data_processing",
            "ui.review_thirdparty_ai_provider_terms",
            "ui.document_the_use_case_internally",
            "ui.consider_human_oversight_for_important_decisions",
            "ui.seek_legal_advice_for_highrisk_scenarios"
          ]
        };
      }
    }
  } catch (error: any) {
    console.error('Compliance generation error:', error);
    errorMessage.value = "ui.the_compliance_report_service_is_unavailable";
    complianceData.value = normalizeComplianceData({
      role: extractedData.value.role || 'unclear',
      riskLevel: 'unclear',
      confidence: 'low',
      reasoning: "ui.the_ai_service_could_not_generate_a_full_report",
      riskExplanation: "ui.risk_classification_is_unavailable_because_the_report_request_failed",
      gdprCheck: "ui.if_personal_data_is_processed_gdpr_review_is_recommended",
      copyrightCheck: "ui.review_whether_copyrighted_or_thirdparty_material_is_involved",
      transparencyCheck: "ui.inform_users_where_ai_is_used_and_keep_human",
      nextSteps: [
        "ui.document_the_ai_use_case_and_intended_users",
        "ui.map_input_data_output_data_and_thirdparty_providers",
        "ui.check_whether_personal_or_sensitive_data_is_processed",
        "ui.review_provider_terms_and_retention_policies",
        "ui.add_human_oversight_for_important_outcomes",
      ],
    });
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
  errorMessage.value = '';
};

useHead(() => ({
  title: "AI Compliance Compass | Igal Vilensky",
  meta: [
    { name: 'description', content: t("ui.educational_ai_compliance_and_responsible_ai_tool_for_practical") }
  ]
}));
</script>

<style scoped>
.glass {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
</style>
