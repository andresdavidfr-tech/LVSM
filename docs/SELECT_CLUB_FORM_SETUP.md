# Formulario "Select Club" — configuración

El formulario que ve la gente es 100% del sitio (mismo diseño, tipografía y
colores) — por atrás, manda los datos directo a un Google Form conectado a
una Google Sheet, sin que se note que hay un servicio externo. El código ya
está listo; falta crear el formulario en tu cuenta de Google y darme (cargar
en Vercel) unos IDs que genera Google automáticamente.

## 1. Crear el formulario

1. Entrá a https://forms.google.com con la cuenta de Google que quieras usar
   para LVSM.
2. Creá un formulario con **estas preguntas, en este orden** (el orden no
   importa para que funcione, pero ayuda a no confundirse al sacar los IDs):
   1. **Nombre completo** — Respuesta corta, obligatorio
   2. **Email** — Respuesta corta, obligatorio
   3. **Teléfono** — Respuesta corta, opcional
   4. **Interés principal** — Opción múltiple, con exactamente estas 3
      opciones (tienen que decir igual, son los valores que manda el sitio):
      `Comprar`, `Vender`, `Ambos`
   5. **Mensaje o marca de interés** — Párrafo, opcional
   6. **Cumpleaños** — tipo Fecha, opcional. En las opciones del campo (⋮),
      podés desactivar "Incluir año" si no te interesa pedirlo.

## 2. Conectarlo a una Google Sheet

Pestaña **Respuestas** → ícono verde de Sheets → "Crear planilla nueva".
Cada respuesta va a aparecer sola ahí.

## 3. Sacar los IDs de cada pregunta (`entry.NNNNNN`)

Esta es la parte técnica, pero hay un atajo fácil que da Google, sin tocar
código ni inspeccionar HTML:

1. En el formulario (modo edición), tocá el menú **⋮** (arriba a la derecha)
   → **Obtener enlace con datos rellenados previamente** ("Get pre-filled
   link").
2. Se abre una vista previa del formulario. Completá cada campo con un
   texto que puedas reconocer fácil, por ejemplo:
   - Nombre completo: `NOMBRE_AAA`
   - Email: `EMAIL_BBB`
   - Teléfono: `TELEFONO_CCC`
   - Interés principal: elegí cualquiera de las 3 opciones (no importa cuál)
   - Mensaje: `MENSAJE_DDD`
   - Cumpleaños: elegí cualquier fecha
3. Tocá **Obtener enlace** y copiá la URL larga que te da.
4. Pegala en algún lado donde puedas leerla (notas, el buscador) — vas a ver
   algo así:
   ```
   https://docs.google.com/forms/d/e/1FAIpQLS.../viewform?usp=pp_url&entry.111111111=NOMBRE_AAA&entry.222222222=EMAIL_BBB&entry.333333333=TELEFONO_CCC&entry.444444444=Comprar&entry.555555555=MENSAJE_DDD&entry.666666666_month=8&entry.666666666_day=15
   ```
5. Gracias a los textos reconocibles, es fácil emparejar cada `entry.NNNNNN`
   con su campo:
   - `entry.111111111=NOMBRE_AAA` → ese es el ID de **Nombre completo**
   - `entry.222222222=EMAIL_BBB` → **Email**
   - `entry.333333333=TELEFONO_CCC` → **Teléfono**
   - `entry.444444444=Comprar` → **Interés principal**
   - `entry.555555555=MENSAJE_DDD` → **Mensaje**
   - El cumpleaños puede aparecer de dos formas distintas según la versión
     de Google Forms:
     - **Un solo parámetro**, ej. `entry.666666666=2024-08-15` → usá
       `VITE_GOOGLE_FORM_ENTRY_BIRTHDAY`
     - **Dos parámetros separados**, ej. `entry.666666666_month=8` y
       `entry.666666666_day=15` → usá `VITE_GOOGLE_FORM_ENTRY_BIRTHDAY_MONTH`
       y `VITE_GOOGLE_FORM_ENTRY_BIRTHDAY_DAY` (con el `_month`/`_day`
       incluidos en el valor)

## 4. Conseguir la URL de envío (`action`)

Es la misma URL del link prellenado, pero cambiando `/viewform` por
`/formResponse` y sacando todo lo que sigue después de `?`. Del ejemplo de
arriba:
```
https://docs.google.com/forms/d/e/1FAIpQLS.../formResponse
```
Eso va en `VITE_GOOGLE_FORM_ACTION`.

## 5. Cargar todo en Vercel

Settings → Environment Variables → cargá las variables de la sección
"Formulario Select Club" de `.env.example`, con los valores que sacaste en
los pasos 3 y 4. Volvé a desplegar después.

Mientras falte cualquiera de las variables obligatorias (todas menos el
cumpleaños), esa sección del sitio muestra un aviso de "pendiente de
configurar" en vez de un formulario roto.

## Cómo probarlo

Completá el formulario en el sitio ya desplegado y fijate que aparezca la
fila nueva en la Google Sheet en unos segundos. Si no aparece nada:
- Revisá que los 3 valores de "Interés principal" en el código
  (`Comprar` / `Vender` / `Ambos`) sean EXACTAMENTE iguales a las opciones
  que pusiste en Google Forms (mayúsculas/tildes incluidas).
- Volvé a generar el link prellenado y comparar los `entry.NNNNNN` contra
  lo que cargaste en Vercel — es la causa más común de que falle.

## Limitaciones de este enfoque

- Es una técnica no oficial (Google no la documenta como API pública), pero
  es ampliamente usada y estable — el riesgo real es bajo, aunque no es
  cero: si Google cambia cómo procesa estos formularios, podría dejar de
  funcionar sin aviso previo.
- El sitio **no puede confirmar con certeza** que Google haya guardado la
  respuesta (es un POST a otro dominio, sin devolver una confirmación que
  el navegador pueda leer) — el mensaje de "¡Gracias por sumarte!" se
  muestra cuando el POST terminó de viajar, no cuando Google confirma que
  lo guardó. En la práctica es muy confiable, pero no 100% infalible.
- El backend viejo (`POST /api/leads`, que guardaba en SQLite) queda sin
  usar. No se borró por las dudas, pero no hace falta para que esto ande.
