import { describe, it, expect } from 'vitest';
import { getGoogleFormConfig, buildGoogleFormFields, type GoogleFormConfig } from './googleFormSubmit';

describe('getGoogleFormConfig', () => {
  it('devuelve la config hardcodeada del formulario de LVSM', () => {
    const config = getGoogleFormConfig();
    expect(config).not.toBeNull();
    expect(config?.action).toMatch(/^https:\/\/docs\.google\.com\/forms\/d\/e\/.+\/formResponse$/);
    expect(config?.entryName).toMatch(/^entry\.\d+$/);
    expect(config?.entryEmail).toMatch(/^entry\.\d+$/);
  });

  it('incluye el entry ID de cumpleaños', () => {
    const config = getGoogleFormConfig();
    expect(config?.entryBirthday).toMatch(/^entry\.\d+$/);
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
