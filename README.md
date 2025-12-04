# Lunaa Logdón - Formulario de Lista de Prioridad

Formulario profesional para capturar leads de clientes interesados en vestidos de Bautizo y Comunión, con integración a Google Sheets y envío automático de emails.

---

## 🚀 Características

- ✅ Formulario responsivo y accesible
- ✅ Validación de datos en tiempo real
- ✅ Slideshow de imágenes en el fondo del formulario
- ✅ Integración con Google Sheets para almacenar datos
- ✅ Envío automático de emails de bienvenida al cliente
- ✅ Notificaciones de nuevos leads al dueño del negocio
- ✅ Interfaz profesional con paleta de colores sofisticada
- ✅ Animaciones suaves y feedback visual

---

## 📋 Configuración Inicial

### 1. **Actualizar el SCRIPT_URL en `js/app.js`**

Abre el archivo `js/app.js` y reemplaza el valor de `SCRIPT_URL`:

```javascript
const SCRIPT_URL = "https://script.google.com/macros/s/TU_SCRIPT_ID/exec";
```

Obtén `TU_SCRIPT_ID` de tu Apps Script deployado en Google.

### 2. **Configurar Apps Script**

En Google Apps Script, asegúrate de tener:

- **SPREADSHEET_ID**: `1z4oLZkYQ1C-tOT6Y28splwAnsqaTO1k4eDF7fIO5pKA`
- **SHEET_NAME**: `Hoja 1` (El nombre exacto de tu pestaña en Google Sheets)
- **OWNER_EMAIL**: Emails de notificación (ej: `romero.carlos6357@gmail.com,rbrigith04@gmail.com`)
- **BRAND_NAME**: Nombre de tu marca (ej: `Lunaa_Logodon Ceremonia`)

### 3. **Funciones Necesarias en Apps Script**

El Apps Script debe contener:

```javascript
// Función principal que maneja los datos POST del formulario
function doPost(e) { ... }

// Envía correo de bienvenida al cliente
function sendWelcomeEmail(clientEmail, clientName, eventType) { ... }

// Envía notificación al dueño del negocio
function sendNotificationEmail(data) { ... }

// Función de prueba (GET)
function doGet() { ... }
```

### 4. **Permisos de Gmail en Google Apps Script**

El Apps Script necesita permiso para enviar emails. Cuando ejecutes `doPost()` por primera vez, Google pedirá autorización.

---

## 📁 Estructura del Proyecto

```
lunaa_lgodon/
├── index.html           # Página principal con formulario
├── css/
│   └── style.css       # Estilos responsivos y profesionales
├── js/
│   └── app.js          # Lógica del formulario y validación
├── imagenes/
│   ├── IMG-20251203-WA0023.jpg
│   ├── IMG-20251203-WA0024.jpg
│   ├── IMG-20251203-WA0025.jpg
│   └── IMG-20251203-WA0026.jpg
└── README.md           # Este archivo
```

---

## 🎨 Paleta de Colores

- **Primario**: #d4a5d4 (Rosa Pastel)
- **Primario Oscuro**: #a349a4 (Púrpura)
- **Acento**: #f4d1f4 (Rosa muy pálido)
- **Éxito**: #4caf50 (Verde)
- **Error**: #e74c3c (Rojo)

---

## 📧 Flujo de Emails

### Correo al Cliente

1. **Asunto**: ¡Bienvenid@ a la Lista de Prioridad, [Nombre]! ✨
2. **Contenido**:
   - Mensaje de bienvenida personalizado
   - Confirmación de tipo de evento
   - Información sobre próximos pasos (Guía y Cupón)

### Correo al Dueño

1. **Asunto**: 🚨 ¡NUEVO LEAD DE CEREMONIA! - [Nombre]
2. **Contenido**:
   - Datos del cliente
   - Tipo de evento y plazo
   - Fecha/hora de registro
   - Llamado a acción para seguimiento

---

## 🔧 Validación del Formulario

El formulario valida:

- ✅ Nombre: Mínimo 2 caracteres
- ✅ Email: Formato válido (regex)
- ✅ Evento: Selección obligatoria
- ✅ Fecha: Plazo aproximado obligatorio

Mensajes de error específicos para cada campo.

---

## 🎬 Slideshow de Imágenes

El formulario incluye un slideshow que rota entre las 4 imágenes cada 5 segundos:

- Las imágenes se posicionan como fondo del formulario
- Transición suave (1 segundo)
- Overlay semitransparente para mejorar legibilidad del formulario
- Clases CSS: `.bg-1`, `.bg-2`, `.bg-3`, `.bg-4`

### Cambiar velocidad del slideshow:

En `js/app.js`, busca esta línea:

```javascript
}, 5000); // Cambia cada 5s
```

Modifica `5000` (milisegundos) a tu preferencia.

---

## 📱 Responsividad

El proyecto incluye media queries para:

- **Tablets** (768px máximo): Reducción de padding y tamaño de texto
- **Móviles** (480px máximo): Optimización completa, font-size 16px para evitar zoom de iOS

---

## ✨ Mejoras Implementadas

1. **Mensajes mejorados**: Emojis y confirmación clara de que recibirán emails
2. **Validación robusta**: Mensajes de error específicos y recuperables
3. **Animación de carga**: Spinner en el botón durante envío
4. **Manejo de errores**: Distinción entre errores de conexión y servidor
5. **Scroll automático**: Scroll hacia el mensaje de éxito
6. **Accesibilidad**: ARIA labels, roles semánticos, navegación por teclado

---

## 🐛 Troubleshooting

### "Error de conexión"

- Verifica que el SCRIPT_URL sea correcto
- Asegúrate de que el Apps Script esté desplegado como "Nueva ejecución"
- Comprueba tu conexión a internet

### "Error al procesar tu registro"

- Verifica que el Google Sheet exista y tenga el nombre correcto
- Comprueba los permisos del Apps Script
- Revisa la consola de Google Apps Script para logs de error

### "No recibo emails"

- Verifica los emails en OWNER_EMAIL y clientEmail
- Comprueba que Gmail esté habilitado en el proyecto de Google
- Revisa la carpeta de spam/correo no deseado

---

## 📞 Contacto y Soporte

Para más información sobre la configuración del Apps Script o problemas con la integración, contacta al equipo de Lunaa Logdón.

---

## 📄 Licencia

Proyecto creado para Lunaa Logdón © 2025. Todos los derechos reservados.
