/** Interactive tools; secondary Lab Shelf collections can be registered separately. */
export const experiments = [
 { id: 'architect', title: 'ui.system_design_sketcher', description: 'ui.generate_a_concise_firstpass_architecture_outline_from_a_domain', type: 'ai', component: null, route: '/experiments', status: 'classic', accent: '#c79967', glyph: '⌘' },
 { id: 'json', title: 'ui.json_to_typescript', description: 'ui.paste_json_and_generate_a_simple_typescript_interface_locally', type: 'local', component: null, route: '/experiments', status: 'classic', accent: '#8aabcf', glyph: '{ }' },
 { id: 'contrast', title: 'ui.a11y_contrast_checker', description: 'ui.check_foreground_and_background_contrast_against_common_wcag_text', type: 'local', component: 'ContrastChecker', route: '/experiments', status: 'spatial', accent: '#77b6ac', glyph: '◐' },
] as const;
export type Experiment = typeof experiments[number];
