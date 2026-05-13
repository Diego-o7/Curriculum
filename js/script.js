// ===== MODO OSCURO/CLARO CON MEJOR MANEJO =====
const botonTema = document.getElementById("temaBtn");
const iconoTema = document.getElementById("iconoTema");

// Función para aplicar el tema
function aplicarTema(tema) {
    if (tema === "claro") {
        document.body.classList.remove("dark-mode");
        iconoTema.innerHTML = "☀️";
        localStorage.setItem("tema", "claro");
    } else {
        document.body.classList.add("dark-mode");
        iconoTema.innerHTML = "🌙";
        localStorage.setItem("tema", "oscuro");
    }
}

// Revisar tema guardado o preferencia del sistema
const temaGuardado = localStorage.getItem("tema");
const prefiereOscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (temaGuardado) {
    // Si hay tema guardado, usarlo
    aplicarTema(temaGuardado);
} else {
    // Si no hay tema guardado, usar preferencia del sistema
    if (prefiereOscuro) {
        aplicarTema("oscuro");
    } else {
        aplicarTema("claro");
    }
}

// Evento para cambiar tema manualmente
botonTema.addEventListener("click", () => {
    const estaOscuro = document.body.classList.contains("dark-mode");
    if (estaOscuro) {
        aplicarTema("claro");
    } else {
        aplicarTema("oscuro");
    }
});

// ===== FORMULARIO CON VALIDACIONES MEJORADAS =====
const formulario = document.getElementById("formulario");

// Función para mostrar mensajes de error elegantes (opcional)
function mostrarError(input, mensaje) {
    // Eliminar error anterior si existe
    const errorAnterior = input.parentElement.querySelector(".error-mensaje");
    if (errorAnterior) errorAnterior.remove();
    
    // Crear nuevo mensaje de error
    const error = document.createElement("span");
    error.className = "error-mensaje";
    error.textContent = mensaje;
    error.style.color = "#e74c3c";
    error.style.fontSize = "12px";
    error.style.marginTop = "5px";
    error.style.display = "block";
    
    // Marcar input como inválido
    input.style.borderColor = "#e74c3c";
    input.parentElement.appendChild(error);
    
    // Limpiar error después de 3 segundos
    setTimeout(() => {
        if (error.parentElement) error.remove();
        input.style.borderColor = "";
    }, 3000);
}

// Función para limpiar errores de un input
function limpiarError(input) {
    const error = input.parentElement.querySelector(".error-mensaje");
    if (error) error.remove();
    input.style.borderColor = "";
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("email");
    const mensaje = document.getElementById("mensaje");
    
    const nombreValue = nombre.value.trim();
    const correoValue = correo.value.trim();
    const mensajeValue = mensaje.value.trim();
    
    let esValido = true;
    
    // Validar nombre (mínimo 2 caracteres, solo letras y espacios)
    if (nombreValue === "") {
        mostrarError(nombre, "❌ Por favor, ingresa tu nombre completo.");
        esValido = false;
    } else if (nombreValue.length < 2) {
        mostrarError(nombre, "❌ El nombre debe tener al menos 2 caracteres.");
        esValido = false;
    } else if (!/^[a-zA-ZáéíóúñÑÁÉÍÓÚ\s]+$/.test(nombreValue)) {
        mostrarError(nombre, "❌ El nombre solo puede contener letras y espacios.");
        esValido = false;
    } else {
        limpiarError(nombre);
    }
    
    // Validar correo electrónico (más robusto)
    const validarCorreo = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (correoValue === "") {
        mostrarError(correo, "❌ Por favor, ingresa tu correo electrónico.");
        esValido = false;
    } else if (!validarCorreo.test(correoValue)) {
        mostrarError(correo, "❌ El formato del correo no es válido. Ejemplo: usuario@dominio.com");
        esValido = false;
    } else {
        limpiarError(correo);
    }
    
    // Validar mensaje (mínimo 10 caracteres)
    if (mensajeValue === "") {
        mostrarError(mensaje, "❌ Por favor, escribe un mensaje.");
        esValido = false;
    } else if (mensajeValue.length < 10) {
        mostrarError(mensaje, "❌ El mensaje debe tener al menos 10 caracteres.");
        esValido = false;
    } else if (mensajeValue.length > 500) {
        mostrarError(mensaje, "❌ El mensaje no puede exceder los 500 caracteres.");
        esValido = false;
    } else {
        limpiarError(mensaje);
    }
    
    // Si todo es válido, mostrar mensaje de éxito y limpiar formulario
    if (esValido) {
        // Crear notificación personalizada (más elegante que alert)
        const notificacion = document.createElement("div");
        notificacion.textContent = "✅ ¡Mensaje enviado correctamente! Me pondré en contacto contigo pronto.";
        notificacion.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #27ae60;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: slideUp 0.3s ease;
        `;
        
        document.body.appendChild(notificacion);
        
        // Limpiar formulario
        formulario.reset();
        limpiarError(nombre);
        limpiarError(correo);
        limpiarError(mensaje);
        
        // Eliminar notificación después de 3 segundos
        setTimeout(() => {
            notificacion.style.opacity = "0";
            setTimeout(() => notificacion.remove(), 300);
        }, 3000);
    }
});

// ===== VALIDACIÓN EN TIEMPO REAL (mientras el usuario escribe) =====
const nombreInput = document.getElementById("nombre");
const correoInput = document.getElementById("email");
const mensajeInput = document.getElementById("mensaje");

nombreInput.addEventListener("input", () => {
    if (nombreInput.value.trim().length >= 2) {
        limpiarError(nombreInput);
    }
});

correoInput.addEventListener("input", () => {
    const validarCorreo = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (validarCorreo.test(correoInput.value.trim())) {
        limpiarError(correoInput);
    }
});

mensajeInput.addEventListener("input", () => {
    if (mensajeInput.value.trim().length >= 10 && mensajeInput.value.trim().length <= 500) {
        limpiarError(mensajeInput);
    }
});

// ===== EFECTO DE SCROLL SUAVE PARA ENLACES INTERNOS (mejora compatibilidad) =====
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Ajuste para nav sticky
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ANIMACIÓN SUTIL AL CARGAR LA PÁGINA =====
document.addEventListener("DOMContentLoaded", () => {
    // Añadir clase para animaciones progresivas (opcional)
    const secciones = document.querySelectorAll(".pantalla");
    secciones.forEach((seccion, index) => {
        seccion.style.animationDelay = `${index * 0.1}s`;
    });
});

// ===== DETECTAR CAMBIOS EN PREFERENCIA DEL SISTEMA =====
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
mediaQuery.addEventListener("change", (e) => {
    // Solo cambiar si el usuario no ha establecido una preferencia manual
    if (!localStorage.getItem("tema")) {
        if (e.matches) {
            aplicarTema("oscuro");
        } else {
            aplicarTema("claro");
        }
    }
});

// ===== PREVENIR ENVÍO DUPLICADO (evita múltiples clics) =====
let enviando = false;
formulario.addEventListener("submit", (e) => {
    if (enviando) {
        e.preventDefault();
        return;
    }
    
    enviando = true;
    setTimeout(() => {
        enviando = false;
    }, 3000);
});