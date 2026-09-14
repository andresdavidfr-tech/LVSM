# Formulario "Select Club" — configuración

El código ya está listo (`src/components/sections/ContactForm.tsx`). Falta
crear el formulario en tu cuenta de Google — eso tenés que hacerlo vos,
porque las respuestas tienen que caer en una Sheet **de tu propia cuenta**,
no de la mía.

## 1. Crear el formulario

1. Entrá a https://forms.google.com con la cuenta de Google que quieras usar
   para LVSM.
2. Creá un formulario nuevo con estos campos (para que se parezca al que
   tenía el sitio antes, más el cumpleaños):
   - **Nombre completo** — Respuesta corta, obligatorio
   - **Email** — Respuesta corta (tipo "Email" en validación), obligatorio
   - **Teléfono** — Respuesta corta, opcional
   - **Fecha de cumpleaños** — tipo Fecha (sin el año si no querés pedirlo;
     Google Forms permite desactivar el año en las opciones del campo),
     opcional. Sirve para mandar un saludo o beneficio ese día.
   - **Interés principal** — Opción múltiple: "Quiero Comprar" / "Quiero
     Vender" / "Ambos"
   - **Mensaje o marca de interés** — Párrafo, opcional

## 2. Conectarlo a una Google Sheet

En el formulario, pestaña **Respuestas** → ícono verde de Sheets →
"Crear planilla nueva". A partir de ahí, cada respuesta aparece sola en esa
planilla — la podés abrir, filtrar y ordenar como cualquier Excel.

## 3. Conseguir la URL para embeber

1. Botón **Enviar** (arriba a la derecha) → pestaña con el ícono `< >`
   (Insertar HTML).
2. Vas a ver algo como:
   ```html
   <iframe src="https://docs.google.com/forms/d/e/1FAIpQLS.../viewform?embedded=true" ...>
   ```
3. Copiá **solo la URL** de adentro del `src="..."`.

## 4. Cargarla en Vercel

Settings → Environment Variables → agregá:

```
VITE_GOOGLE_FORM_EMBED_URL = <la URL que copiaste>
```

Volvé a desplegar después de cargarla. Mientras no esté configurada, esa
sección del sitio muestra un aviso de "pendiente de configurar" en vez de
un iframe roto.

## Opcional: look & feel del formulario

Desde el formulario en Google Forms (ícono de paleta, arriba a la derecha)
podés cambiar el color de acento — te recomiendo usar el bronce de la marca
(`#A36A2E`) para que combine mejor con el resto de la sección, aunque el
formulario en sí siempre se va a ver con la tipografía y estilo propios de
Google Forms (no del sitio) porque corre en un iframe aparte.

## Limitaciones de este enfoque

- **No hay forma de saber desde el sitio si alguien completó el formulario**
  (el iframe es de otro dominio, el navegador no deja que la página vea para
  adentro). El evento `lead_form_view` que se manda a analítica es solo "se
  mostró el formulario", no "se envió" — para medir conversión real hay que
  mirar la cantidad de filas en la Google Sheet.
- El formulario **no tiene el mismo diseño visual** que el resto del sitio
  (colores, tipografía) — es la limitación esperable de embeber un servicio
  externo en vez de mantener un formulario propio.
- El backend viejo (`POST /api/leads`, que guardaba en SQLite) queda sin
  usar. No se borró por las dudas de que quieras volver atrás, pero no hace
  falta nada de eso para que este formulario funcione.
