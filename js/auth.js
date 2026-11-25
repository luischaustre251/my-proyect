// Credenciales de prueba
export const USUARIO_CORRECTO = "admin";
export const CONTRASENA_CORRECTA = "12345678";
const CLAVE_SESION = "usuarioLogueado";

export function validarUsuario(usuario, contrasena) {
    if (!usuario || !contrasena) return false;
    return usuario.trim() === USUARIO_CORRECTO && contrasena.trim() === CONTRASENA_CORRECTA;
}

// Permite probar la validación desde la consola.
if (typeof window !== "undefined") {
    window.validarUsuario = validarUsuario;
    window.USUARIO_CORRECTO = USUARIO_CORRECTO;
    window.CONTRASENA_CORRECTA = CONTRASENA_CORRECTA;
}

export function estaAutenticado() {
    return sessionStorage.getItem(CLAVE_SESION) === USUARIO_CORRECTO;
}

export function iniciarSesion() {
    sessionStorage.setItem(CLAVE_SESION, USUARIO_CORRECTO);
}

export function cerrarSesion() {
    sessionStorage.removeItem(CLAVE_SESION);
}

function mostrarMensaje(elemento, texto, tipo) {
    if (!elemento) return;
    elemento.className = `login-mensaje ${tipo}`;
    elemento.textContent = texto;
}

export function actualizarInterfazAutenticacion() {
    const activo = estaAutenticado();

    document.querySelectorAll(".btn-login, #header-login-btn").forEach((boton) => {
        boton.textContent = activo ? `Salir (${USUARIO_CORRECTO})` : "Iniciar Sesión";
    });

    document.querySelectorAll(".nav-login-link").forEach((enlace) => {
        enlace.textContent = activo ? `Sesión (${USUARIO_CORRECTO})` : "Acceso";
    });

    const tarjetaFormulario = document.getElementById("login-card-form");
    const panelSesion = document.getElementById("panel-sesion-activa");
    if (tarjetaFormulario && panelSesion) {
        tarjetaFormulario.style.display = activo ? "none" : "block";
        panelSesion.style.display = activo ? "block" : "none";
    }
}

function manejarEnvioAcceso({ formulario, idUsuario, idContrasena, idMensaje, alIngresar }) {
    if (!formulario) return;

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        const entradaUsuario = document.getElementById(idUsuario);
        const entradaContrasena = document.getElementById(idContrasena);
        const mensaje = document.getElementById(idMensaje);

        if (validarUsuario(entradaUsuario.value, entradaContrasena.value)) {
            iniciarSesion();
            mostrarMensaje(mensaje, `Acceso concedido. Bienvenido, ${USUARIO_CORRECTO}.`, "exito");
            actualizarInterfazAutenticacion();
            if (alIngresar) alIngresar();
        } else {
            mostrarMensaje(mensaje, "Usuario o contraseña incorrectos.", "error");
            entradaContrasena.value = "";
            entradaContrasena.focus();
        }
    });
}

export function inicializarAutenticacion() {
    actualizarInterfazAutenticacion();

    const modal = document.getElementById("login-modal");
    const botonCerrar = document.getElementById("close-login-modal-btn");

    manejarEnvioAcceso({
        formulario: document.getElementById("login-form-page"),
        idUsuario: "page-usuario",
        idContrasena: "page-password",
        idMensaje: "page-login-mensaje"
    });

    manejarEnvioAcceso({
        formulario: document.getElementById("login-form-modal"),
        idUsuario: "modal-usuario",
        idContrasena: "modal-password",
        idMensaje: "modal-login-mensaje",
        alIngresar: () => {
            if (modal) setTimeout(() => modal.classList.remove("active"), 600);
        }
    });

    const botonCerrarPagina = document.getElementById("btn-cerrar-sesion-page");
    if (botonCerrarPagina) {
        botonCerrarPagina.addEventListener("click", () => {
            cerrarSesion();
            actualizarInterfazAutenticacion();
            mostrarMensaje(
                document.getElementById("page-login-mensaje"),
                "Sesión cerrada correctamente.",
                "exito"
            );
        });
    }

    document.querySelectorAll(".btn-login, #header-login-btn").forEach((boton) => {
        boton.addEventListener("click", (evento) => {
            if (estaAutenticado()) {
                evento.preventDefault();
                if (confirm(`¿Deseas cerrar la sesión de ${USUARIO_CORRECTO}?`)) {
                    cerrarSesion();
                    actualizarInterfazAutenticacion();
                    window.location.reload();
                }
            } else if (modal) {
                evento.preventDefault();
                modal.classList.add("active");
            } else if (!window.location.pathname.endsWith("login.html")) {
                window.location.href = "login.html";
            }
        });
    });

    if (botonCerrar && modal) {
        botonCerrar.addEventListener("click", () => modal.classList.remove("active"));
    }
}