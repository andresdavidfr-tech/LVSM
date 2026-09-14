// Envía las respuestas de "Select Club" directo al endpoint de Google Forms
// (POST a .../formResponse) usando los IDs internos (entry.XXXXX) de cada
// pregunta. El form visible es 100% nuestro (mismo estilo del sitio); Google
// solo recibe el POST y lo guarda en la Sheet conectada — el usuario nunca
// ve la interfaz de Google.
//
// Cómo conseguir estos valores: ver docs/SELECT_CLUB_FORM_SETUP.md
// ("Link prellenado" en el menú de Google Forms).

export interface GoogleFormConfig {
  action: string;
  entryName: string;
  entryEmail: string;
  entryPhone: string;
  entryInterest: string;
  entryMessage: string;
  // Cumpleaños: según cómo Google exponga el campo Fecha en el link
  // prellenado, puede ser UN solo parámetro (entryBirthday) o DOS
  // (entryBirthdayMonth + entryBirthdayDay). Configurá el que corresponda
  // al tuyo — ver la guía.
  entryBirthday?: string;
  entryBirthdayMonth?: string;
  entryBirthdayDay?: string;
}

function env(key: string): string | undefined {
  const value = import.meta.env[key] as string | undefined;
  return value && value.length > 0 ? value : undefined;
}

/** Arma la config desde las variables de entorno. null si falta algo esencial. */
export function getGoogleFormConfig(): GoogleFormConfig | null {
  const action = env('VITE_GOOGLE_FORM_ACTION');
  const entryName = env('VITE_GOOGLE_FORM_ENTRY_NAME');
  const entryEmail = env('VITE_GOOGLE_FORM_ENTRY_EMAIL');
  const entryPhone = env('VITE_GOOGLE_FORM_ENTRY_PHONE');
  const entryInterest = env('VITE_GOOGLE_FORM_ENTRY_INTEREST');
  const entryMessage = env('VITE_GOOGLE_FORM_ENTRY_MESSAGE');

  if (!action || !entryName || !entryEmail || !entryPhone || !entryInterest || !entryMessage) {
    return null;
  }

  return {
    action,
    entryName,
    entryEmail,
    entryPhone,
    entryInterest,
    entryMessage,
    entryBirthday: env('VITE_GOOGLE_FORM_ENTRY_BIRTHDAY'),
    entryBirthdayMonth: env('VITE_GOOGLE_FORM_ENTRY_BIRTHDAY_MONTH'),
    entryBirthdayDay: env('VITE_GOOGLE_FORM_ENTRY_BIRTHDAY_DAY'),
  };
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
