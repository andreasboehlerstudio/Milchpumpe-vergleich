/**
 * Public Brevo simple-HTML form contract, observed 2026-10-16.
 * The signed public POST action is a form identity, NOT a provider API key.
 * Required attributes were checked in the HTML (JSON null means present/boolean).
 * Version deliberately when a new actual export changes this contract.
 */
export const NEWSLETTER_PROVIDER_CONTRACT = {
  version: 1,
  formId: '6ad0df3f0accffc5587c5a5d',
  form: {
    id: 'sib-form',
    method: 'POST',
    action: 'https://f71c3538.sibforms.com/serve/MUIFAIkkawjcPUoHZkFrnhKoYppPRifBLof4DgXSi-cLZicLvCXz4xUtYnkrY3oDH7W_NIExPWrDHUJ-di18QWbBeTc8Le1YNFm4sW17n3i1M6liMtZgxoALYDXF1SBytIPVZSM7DkWB0uCE2zUqgdsAYxNzkyBMRIBMnna-35Jsh9flbZ590I15oIaprJ4ZkFtVUOBDzAtD3Syj1A==',
    // Absent in the export: native same-context navigation, not a new tab.
    target: null,
  },
  inputs: [
    { type: 'text', id: 'EMAIL', name: 'EMAIL', autoComplete: 'off', value: '', required: true },
    { type: 'checkbox', id: 'OPT_IN', name: 'OPT_IN', value: '1', required: true, checked: false },
    { type: 'text', name: 'email_address_check', value: '' },
    { type: 'hidden', name: 'locale', value: 'de' },
    { type: 'hidden', name: 'html_type', value: 'simple' },
  ],
} as const;
