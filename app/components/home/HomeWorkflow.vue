<template>
  <figure class="workflow" aria-labelledby="workflow-title" aria-describedby="workflow-caption">
    <div class="workflow-header">
      <h2 id="workflow-title" class="technical-label">{{ t('foundation.workflowTitle') }}</h2>
      <Workflow :size="20" aria-hidden="true" />
    </div>
    <ol class="workflow-stages">
      <li v-for="(stage, index) in stages" :key="stage.id" class="workflow-stage">
        <div class="workflow-node">
          <component :is="stage.icon" class="workflow-icon" :size="20" aria-hidden="true" />
          <div>
            <h3>{{ stage.title }}</h3>
            <p>{{ stage.description }}</p>
          </div>
        </div>
        <div v-if="index < stages.length - 1" class="workflow-connection" aria-hidden="true"><ArrowDown :size="24" /></div>
      </li>
    </ol>
    <figcaption id="workflow-caption" class="metadata">{{ t('foundation.workflowCaption') }}</figcaption>
  </figure>
</template>

<script setup lang="ts">
import { ArrowDown, Workflow, Database, Combine, GitBranch, PanelsTopLeft } from 'lucide-vue-next';
const { t } = useI18n();
// An illustrative sequence only; never a description of employer infrastructure.
const stages = computed(() => [
  { id: 'inputs', icon: Database, title: t('foundation.inputs'), description: t('foundation.inputsDescription') },
  { id: 'processing', icon: Combine, title: t('foundation.processing'), description: t('foundation.processingDescription') },
  { id: 'automation', icon: GitBranch, title: t('foundation.automation'), description: t('foundation.automationDescription') },
  { id: 'outputs', icon: PanelsTopLeft, title: t('foundation.outputs'), description: t('foundation.outputsDescription') },
]);
</script>

<style scoped>
.workflow { min-width: 0; padding: var(--space-6); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-panel); }
.workflow-header { display: flex; justify-content: space-between; align-items: center; gap: var(--space-4); padding-bottom: var(--space-6); color: var(--color-system); }
.workflow-header h2 { color: var(--color-system); }
.workflow-stages { list-style: none; padding: 0; margin: 0; }
.workflow-node { display: flex; align-items: flex-start; gap: var(--space-3); background: var(--color-surface-raised); border-left: 2px solid var(--color-system); border-radius: 0 var(--radius-control) var(--radius-control) 0; padding: var(--space-3) var(--space-4); }
.workflow-icon { flex-shrink: 0; margin-top: 3px; color: var(--color-system); }
.workflow-node h3 { font-size: 1rem; line-height: 1.5; font-weight: 600; }
.workflow-node p { font-size: 0.875rem; line-height: 1.5; color: var(--color-text-muted); margin-top: var(--space-1); }
.workflow-connection { display: flex; height: var(--space-8); align-items: center; margin-left: var(--space-4); color: var(--color-border-control); }
figcaption { margin-top: var(--space-6); }
@media (max-width: 639px) { .workflow { padding: var(--space-4); } }
</style>
