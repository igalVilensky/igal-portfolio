/** New controls only. Biographical paragraphs come from the existing localized
 * publicContent catalog used by Classic About, never from a parallel biography. */
export const copy = {
 en: {
  back: 'Spatial Home', title: 'The unfinished self', context: 'About / Two perspectives',
  note: 'A self-portrait in motion', hint: 'Drag to turn · Choose a section', section: 'Section', close: 'Reassemble',
  pause: 'Pause counter-rotation', resume: 'Resume counter-rotation', paused: 'Rotation paused',
  coreHint: 'Pause rotation', held: 'Rotation held while reading', reduced: 'Motion reduced',
  fallback: 'The 3D view is unavailable. Explore the six sections below.',
  labels: ['Identity', 'Path', 'Engineering', 'AI & Automation', 'Principles', 'Current Focus'],
 },
 de: {
  back: 'Spatial Home', title: 'Das unvollendete Selbst', context: 'Über mich / Zwei Perspektiven',
  note: 'Ein Selbstporträt in Bewegung', hint: 'Ziehen zum Drehen · Bereich wählen', section: 'Bereich', close: 'Zusammenfügen',
  pause: 'Gegenrotation anhalten', resume: 'Gegenrotation fortsetzen', paused: 'Rotation angehalten',
  coreHint: 'Rotation anhalten', held: 'Rotation beim Lesen angehalten', reduced: 'Bewegung reduziert',
  fallback: 'Die 3D-Ansicht ist nicht verfügbar. Die sechs Bereiche sind weiterhin zugänglich.',
  labels: ['Identität', 'Weg', 'Engineering', 'KI & Automation', 'Prinzipien', 'Aktueller Fokus'],
 },
 ru: {
  back: 'Spatial Home', title: 'Незавершённое я', context: 'Обо мне / Две перспективы',
  note: 'Автопортрет в движении', hint: 'Тяните для вращения · Выберите раздел', section: 'Раздел', close: 'Собрать',
  pause: 'Приостановить встречное вращение', resume: 'Продолжить встречное вращение', paused: 'Вращение приостановлено',
  coreHint: 'Приостановить вращение', held: 'Вращение остановлено на время чтения', reduced: 'Движение уменьшено',
  fallback: '3D-вид недоступен. Все шесть разделов остаются доступны ниже.',
  labels: ['Личность', 'Путь', 'Разработка', 'ИИ и автоматизация', 'Принципы', 'Сейчас в фокусе'],
 },
};
export const aboutSections = [
 ['publicContent.role', 'ui.leipzig_germany'],
 ['publicContent.background', 'publicContent.education'],
 ['publicContent.stack'],
 ['publicContent.aiIntro'],
 ['publicContent.topic4'],
 ['publicContent.focus'],
] as const;
