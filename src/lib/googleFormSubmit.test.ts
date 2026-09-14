import { describe, it, expect, afterEach, vi } from 'vitest';
import { getGoogleFormConfig, buildGoogleFormFields, type GoogleFormConfig } from './googleFormSubmit';

afterEach(() => {
  vi.unstubAllEnvs();
});

const REQUIRED_ENVS: Record<string, string> = {
  VITE_GOOGLE_FORM_ACTION: 'https://docs.google.com/forms/d/e/abc/formResponse',
  VITE_GOOGLE_FORM_ENTRY_NAME: 'entry.111',
  VITE_GOOGLE_FORM_ENTRY_EMAIL: 'entry.222',
  VITE_GOOGLE_FORM_ENTRY_PHONE: 'entry.333',
  VITE_GOOGLE_FORM_ENTRY_INTEREST: 'entry.444',
  VITE_GOOGLE_FORM_ENTRY_MESSAGE: 'entry.555',
};

function stubRequiredEnvs(overrides: Record<string, string> = {}) {
  for (const [key, value] of Object.entries({ ...REQUIRED_ENVS, ...overrides })) {
    vi.stubEnv(key, value);
  }
}

describe('getGoogleFormConfig', () => {
  it('devuelve null si falta cualquiera de las variables obligatorias', () => {
    stubRequiredEnvs({ VITE_GOOGLE_FORM_ENTRY_EMAIL: '' });
    expect(getGoogleFormConfig()).toBeNull();
  });

  it('devuelve null si no hay ninguna variable configurada', () => {
    expect(getGoogleFormConfig()).toBeNull();
  });

  it('arma la config cuando están las 6 variables obligatorias', () => {
    stubRequiredEnvs();
    const config = getGoogleFormConfig();
    expect(config).toEqual(
      expect.objectContaining({
        action: REQUIRED_ENVS.VITE_GOOGLE_FORM_ACTION,
        entryName: 'entry.111',
        entryEmail: 'entry.222',
      }),
    );
  });

  it('incluye los entry IDs de cumpleaños cuando están configurados', () => {
    stubRequiredEnvs({ VITE_GOOGLE_FORM_ENTRY_BIRTHDAY_MONTH: 'entry.666_month', VITE_GOOGLE_FORM_ENTRY_BIRTHDAY_DAY: 'entry.666_day' });
    const config = getGoogleFormConfig();
    expect(config?.entryBirthdayMonth).toBe('entry.666_month');
    expect(config?.entryBirthdayDay).toBe('entry.666_day');
  });
});

describe('buildGoogleFormFields', () => {
  const baseConfig: GoogleFormConfig = {
    action: 'https://docs.google.com/forms/d/e/abc/formResponse',
    entryName: 'entry.111',
    entryEmail: 'entry.222',
    entryPhone: 'entry.333',
    entryInterest: 'entry.444',
    entryMessage: 'entry.555',
  };

  it('mapea nombre, email, telefono, interes y mensaje', () => {
    const fields = buildGoogleFormFields(
      { name: 'María', email: 'maria@ejemplo.com', phone: '+54911', birthday: '', interest: 'Comprar', message: 'Hola' },
      baseConfig,
    );
    expect(fields).toEqual([
      ['entry.111', 'María'],
      ['entry.222', 'maria@ejemplo.com'],
      ['entry.333', '+54911'],
      ['entry.444', 'Comprar'],
      ['entry.555', 'Hola'],
    ]);
  });

  it('no agrega campos de cumpleaños si no se completó la fecha', () => {
    const fields = buildGoogleFormFields(
      { name: 'María', email: 'maria@ejemplo.com', phone: '', birthday: '', interest: 'Comprar', message: '' },
      { ...baseConfig, entryBirthdayMonth: 'entry.666_month', entryBirthdayDay: 'entry.666_day' },
    );
    expect(fields.some(([name]) => name.includes('666'))).toBe(false);
  });

  it('agrega un solo campo de cumpleaños cuando la config usa entryBirthday', () => {
    const fields = buildGoogleFormFields(
      { name: 'María', email: 'maria@ejemplo.com', phone: '', birthday: '2024-08-15', interest: 'Comprar', message: '' },
      { ...baseConfig, entryBirthday: 'entry.666' },
    );
    expect(fields).toContainEqual(['entry.666', '2024-08-15']);
  });

  it('separa mes y día cuando la config usa entryBirthdayMonth/Day', () => {
    const fields = buildGoogleFormFields(
      { name: 'María', email: 'maria@ejemplo.com', phone: '', birthday: '2024-08-05', interest: 'Comprar', message: '' },
      { ...baseConfig, entryBirthdayMonth: 'entry.666_month', entryBirthdayDay: 'entry.666_day' },
    );
    expect(fields).toContainEqual(['entry.666_month', '8']);
    expect(fields).toContainEqual(['entry.666_day', '5']);
  });
});
