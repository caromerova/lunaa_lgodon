// **IMPORTANTE:** Reemplaza esta URL con la URL de tu Despliegue de Apps Script
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyvwCBuOb2Kz2k3FWh8Tk6-cPZooAiPOJjReFwml3mVpYQBbIp2W6skqgeXV3h8TBXU/exec";

// **IMPORTANTE:** Reemplaza esto con tu Site Key de reCAPTCHA v3
const RECAPTCHA_SITE_KEY = "6LemKCEsAAAAAL20-rHZs_MHX75MlSYwQKPJS32k";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("leadForm");
  const responseMessage = document.getElementById("responseMessage");
  const submitBtn = document.getElementById("submitBtn");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const eventSelect = document.getElementById("event");
  const dateSelect = document.getElementById("date");
  const hpInput = document.getElementById("hp_website"); // honeypot

  // Validar email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validar formulario antes de enviar
  function validateForm() {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const event = eventSelect.value;
    const date = dateSelect.value;
    const hp = hpInput ? hpInput.value.trim() : "";

    // Limpiar mensaje anterior
    responseMessage.textContent = "";
    responseMessage.className = "";
    responseMessage.style.display = "none";

    // Validaciones
    if (!name || name.length < 2) {
      showError("Por favor, ingresa un nombre válido (mínimo 2 caracteres).");
      return false;
    }

    // Honeypot check: si este campo tiene contenido, probablemente es un bot.
    if (hp) {
      console.warn(
        "Honeypot triggered - posible envío automatizado. Valor:",
        hp
      );
      // No dar información detallada al usuario; mostrar un mensaje genérico.
      showError("No se pudo procesar el envío. Por favor intenta de nuevo.");
      return false;
    }

    if (!isValidEmail(email)) {
      showError("Por favor, ingresa un email válido.");
      return false;
    }

    if (!event) {
      showError(
        "Por favor, selecciona un evento (Primera Comunión, Bautizo u Otro)."
      );
      return false;
    }

    if (!date) {
      showError("Por favor, selecciona una fecha aproximada.");
      return false;
    }

    return true;
  }

  // Mostrar error
  function showError(message) {
    responseMessage.textContent = message;
    responseMessage.className = "error-message";
    responseMessage.setAttribute("role", "alert");
    responseMessage.style.display = "block";
    // Mostrar toast de error también
    showToast(message, "error");
  }

  // Mostrar éxito
  function showSuccess(message) {
    responseMessage.textContent = message;
    responseMessage.className = "success-message";
    responseMessage.setAttribute("role", "status");
    responseMessage.style.display = "block";
    // Mostrar toast de éxito también
    showToast(message, "success");
  }

  // Mostrar un toast en la parte superior (tipo: 'success' | 'error' | 'info')
  function showToast(message, type = "info") {
    const toast = document.getElementById("toast");
    if (!toast) return;
    // Configurar texto y clases
    toast.textContent = message;
    toast.className = "toast show toast-" + type;
    // Limpiar timeout previo si existe
    if (toast._timeout) clearTimeout(toast._timeout);
    // Ocultar después de 5s
    toast._timeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 5000);
  }

  // Limpiar error al escribir
  [nameInput, emailInput, eventSelect, dateSelect].forEach((input) => {
    input.addEventListener("input", function () {
      if (responseMessage.classList.contains("error-message")) {
        responseMessage.style.display = "none";
      }
    });
  });

  // Función para obtener token de reCAPTCHA v3
  async function getRecaptchaToken() {
    try {
      if (
        typeof grecaptcha !== "undefined" &&
        RECAPTCHA_SITE_KEY !== "YOUR_SITE_KEY"
      ) {
        const token = await grecaptcha.execute(RECAPTCHA_SITE_KEY, {
          action: "submit",
        });
        return token;
      } else {
        console.warn("reCAPTCHA no está configurado correctamente");
        return null;
      }
    } catch (err) {
      console.error("Error obteniendo token reCAPTCHA:", err);
      return null;
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validar antes de enviar
    if (!validateForm()) {
      return;
    }

    // Deshabilitar botón y mostrar mensaje de carga
    submitBtn.disabled = true;
    submitBtn.classList.add("loading");
    submitBtn.textContent = "Enviando...";
    responseMessage.style.display = "none";

    // Obtener token de reCAPTCHA v3
    const recaptchaToken = await getRecaptchaToken();
    if (!recaptchaToken) {
      console.warn(
        "No se pudo obtener token de reCAPTCHA, continuando sin validación..."
      );
    }

    // 1. Recopilar datos del formulario
    const formData = new FormData(form);
    // Añadir el token de reCAPTCHA a los datos
    formData.set("recaptchaToken", recaptchaToken || "");
    // Convertir FormData a un objeto URLSearchParams (necesario para el POST de Apps Script)
    const params = new URLSearchParams(formData);

    try {
      // 2. Enviar datos al Apps Script
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body: params, // Se envían como x-www-form-urlencoded
      });

      // 3. Manejar la respuesta del Apps Script
      const result = await response.json();

      if (result.result === "success") {
        // Éxito: Mostrar mensaje de gracias y limpiar formulario
        showSuccess(
          "✨ ¡Registro exitoso! Te hemos enviado un correo de bienvenida con tu cupón del 10% y el enlace de descarga para nuestra Guía de Tendencias. ¡Gracias por confiar en nosotros!"
        );
        form.reset(); // Limpiar campos
        // Scroll suave hacia arriba para que vea el mensaje de éxito
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Error reportado por el Apps Script
        throw new Error(result.message || "Error desconocido al registrar.");
      }
    } catch (error) {
      // Error de conexión o de código
      console.error("Error en el envío:", error);

      // Mensaje más específico según el tipo de error
      if (error.message.includes("Failed to fetch")) {
        showError(
          "⚠️ Error de conexión. Por favor, verifica tu internet e inténtalo de nuevo."
        );
      } else if (error.message.includes("Estatus")) {
        showError(
          "⚠️ Error al procesar tu registro. Por favor, inténtalo más tarde."
        );
      } else {
        showError("⚠️ Error al registrar. Por favor, inténtalo de nuevo.");
      }
    } finally {
      // Volver a habilitar el botón y su texto original
      submitBtn.disabled = false;
      submitBtn.classList.remove("loading");
      submitBtn.textContent = "Sí, Quiero mi Guía y mi Cupón del 10%";
    }
  });

  // Slideshow de fondo del formulario
  (function initBgSlideshow() {
    const slides = document.querySelectorAll(".form-bg .bg-slide");
    if (!slides.length) return;
    let idx = 0;
    slides[idx].classList.add("active");
    setInterval(() => {
      slides[idx].classList.remove("active");
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add("active");
    }, 5000); // Cambia cada 5s
  })();
});
