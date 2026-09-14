// Envía las respuestas de "Select Club" directo al endpoint de Google Forms
// (POST a .../formResponse) usando los IDs internos (entry.XXXXX) de cada
// pregunta. El form visible es 100% nuestro (mismo estilo del sitio); Google
// solo recibe el POST y lo guarda en la Sheet conectada — el usuario nunca
// ve la interfaz de Google.
//
// Hardcodeado a propósito (no env vars): estos valores no son secretos —
// son los mismos que cualquiera puede ver abriendo el formulario público de
// Google— así que no hace falta tocar nada en Vercel para que esto funcione,
// alcanza con el deploy automático que ya dispara cada git push.
// Para cambiar de formulario en el futuro, ver docs/SELECT_CLUB_FORM_SETUP.md.

export interface GoogleFormConfig {
  action: string;
  entryName: string;
  entryEmail: string;
  entryPhone: string;
  entryInterest: string;
  entryMessage: string;
  entryBirthday?: string;
  entryBirthdayMonth?: string;
  entryBirthdayDay?: string;
}

const GOOGLE_FORM_CONFIG: GoogleFormConfig = {
  action: 'https://docs.google.com/forms/d/e/1FAIpQLSfjgd8io2NHa8byVgrlCkmyboZL-UNCnU-Ba_0-WyNTNcs03Q/formResponse',
  entryName: 'entry.1498126086',
  entryEmail: 'entry.1383104060',
  entryPhone: 'entry.1041084826',
  entryInterest: 'entry.908880382',
  entryMessage: 'entry.537245645',
  entryBirthday: 'entry.1181411326',
};

/** Devuelve la config del formulario. null si falta algo esencial (no debería pasar, está hardcodeada). */
export function getGoogleFormConfig(): GoogleFormConfig | null {
  const { action, entryName, entryEmail, entryPhone, entryInterest, entryMessage } = GOOGLE_FORM_CONFIG;
  if (!action || !entryName || !entryEmail || !entryPhone || !entryInterest || !entryMessage) {
    return null;
  }
  return GOOGLE_FORM_CONFIG;
}

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  birthday: string; // yyyy-mm-dd (del <input type="date">), puede ser ''
  interest: string;
  message: string;
}

/** Convierte los datos del form + la config en pares [name, value] listos para mandar como hidden inputs. */
export function buildGoogleFormFields(data: LeadFormData, config: GoogleFormConfig): Array<[string, string]> {
  const fields: Array<[string, string]> = [
    [config.entryName, data.name],
    [config.entryEmail, data.email],
    [config.entryPhone, data.phone],
    [config.entryInterest, data.interest],
    [config.entryMessage, data.message],
  ];

  if (data.birthday) {
    const [, month, day] = data.birthday.split('-'); // yyyy-mm-dd
    if (config.entryBirthday) {
      fields.push([config.entryBirthday, data.birthday]);
    }
    if (config.entryBirthdayMonth && config.entryBirthdayDay) {
      fields.push([config.entryBirthdayMonth, String(Number(month))]);
      fields.push([config.entryBirthdayDay, String(Number(day))]);
    }
  }

  return fields;
}
