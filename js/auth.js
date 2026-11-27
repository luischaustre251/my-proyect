// Credenciales de prueba
export const USUARIO_CORRECTO = "admin";
export const CONTRASENA_CORRECTA = "12345678";
const CLAVE_SESION = "usuarioLogueado";
const CLAVE_USUARIOS = "usuariosRegistrados";

function obtenerUsuarios() {
    const usuarios = localStorage.getItem(CLAVE_USUARIOS);
    return usuarios ? JSON.parse(usuarios) : [];
}

export function validarUsuario(usuario, contrasena) {
    if (!usuario || !contrasena) return false;
    const nombreUsuario = usuario.trim();

    if (nombreUsuario === USUARIO_CORRECTO && contrasena.trim() === CONTRASENA_CORRECTA) {
        return true;
    }

    return obtenerUsuarios().some(
        cuenta => cuenta.correo === nombreUsuario.toLowerCase() && cuenta.contrasena === contrasena.trim()
    );
}

export function registrarUsuario(nombre, correo, contrasena) {
    const usuarios = obtenerUsuarios();
    const correoNormalizado = correo.trim().toLowerCase();

    if (usuarios.some(cuenta => cuenta.correo === correoNormalizado)) return false;

    usuarios.push({ nombre: nombre.trim(), correo: correoNormalizado, contrasena: contrasena.trim() });
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
    return true;
}

export function usuarioActual() {
    return sessionStorage.getItem(CLAVE_SESION);
}

export function estaAutenticado() {
    return Boolean(usuarioActual());
}

export function iniciarSesion(usuario) {
    sessionStorage.setItem(CLAVE_SESION, usuario.trim());
}

export function cerrarSesion() {
    sessionStorage.removeItem(CLAVE_SESION);
}

function crearModalCerrarSesion() {
    const modal = document.createElement("div");
    modal.id = "logout-modal";
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content modal-login-content">
            <h3 class="login-titulo">Cerrar sesión</h3>
            <p class="login-subtitulo" id="logout-texto">¿Quieres salir de tu cuenta?</p>
            <div class="logout-acciones">
                <button type="button" class="btn-logout-cancelar" id="logout-cancelar">Cancelar</button>
                <button type="button" class="btn-logout-confirmar" id="logout-confirmar">Cerrar sesión</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const ocultar = () => modal.classList.remove("active");
    modal.querySelector("#logout-cancelar").addEventListener("click", ocultar);
    modal.addEventListener("click", (evento) => {
        if (evento.target === modal) ocultar();
    });
    modal.querySelector("#logout-confirmar").addEventListener("click", () => {
        cerrarSesion();
        actualizarInterfazAutenticacion();
        ocultar();
        mostrarMensaje(
            document.getElementById("page-login-mensaje"),
            "Sesión cerrada correctamente.",
            "exito"
        );
    });

    return modal;
}

function pedirCerrarSesion() {
    const modal = document.getElementById("logout-modal") || crearModalCerrarSesion();
    const texto = modal.querySelector("#logout-texto");
    const nombre = nombreVisible(usuarioActual());
    if (texto) {
        texto.textContent = nombre
            ? `Hola, ${nombre}. ¿Quieres salir de tu cuenta?`
            : "¿Quieres salir de tu cuenta?";
    }
    modal.classList.add("active");
}

function mostrarMensaje(elemento, texto, tipo) {
    if (!elemento) return;
    elemento.className = `login-mensaje ${tipo}`;
    elemento.textContent = texto;
}

function nombreVisible(usuario) {
    if (!usuario) return "";
    const cuenta = obtenerUsuarios().find(
        item => item.correo === usuario.trim().toLowerCase()
    );
    if (cuenta && cuenta.nombre) return cuenta.nombre;
    if (usuario.trim().toLowerCase() === USUARIO_CORRECTO) return "Admin";
    return usuario.split("@")[0];
}

export function actualizarInterfazAutenticacion() {
    const usuario = usuarioActual();
    const activo = Boolean(usuario);
    const nombre = nombreVisible(usuario);

    document.querySelectorAll(".header-saludo").forEach((elemento) => {
        elemento.textContent = `Hola, ${nombre}`;
    });

    document.querySelectorAll(".nav-sesion").forEach((elemento) => {
        elemento.hidden = !activo;
    });

    document.querySelectorAll("#header-saludo").forEach((elemento) => {
        elemento.hidden = !activo;
    });

    document.querySelectorAll("#btn-cerrar-sesion-header").forEach((elemento) => {
        elemento.hidden = !activo;
    });

    document.querySelectorAll("#header-login-btn").forEach((elemento) => {
        elemento.hidden = activo;
        elemento.textContent = "Iniciar Sesión";
    });

    const tarjetaFormulario = document.getElementById("login-card-form");
    const panelSesion = document.getElementById("panel-sesion-activa");
    if (tarjetaFormulario && panelSesion) {
        tarjetaFormulario.style.display = activo ? "none" : "block";
        panelSesion.style.display = activo ? "block" : "none";
        const usuarioPanel = document.getElementById("usuario-autenticado");
        if (usuarioPanel) usuarioPanel.textContent = nombre;
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
            iniciarSesion(entradaUsuario.value);
            mostrarMensaje(mensaje, `Acceso concedido. Bienvenido, ${entradaUsuario.value.trim()}.`, "exito");
            actualizarInterfazAutenticacion();
            if (alIngresar) alIngresar();
        } else {
            mostrarMensaje(mensaje, "Usuario o contraseña incorrectos.", "error");
            entradaContrasena.value = "";
            entradaContrasena.focus();
        }
    });
}

function configurarRegistro(modal) {
    const formulario = document.getElementById("registro-form-modal");
    const formularioAcceso = document.getElementById("login-form-modal") ||
        document.getElementById("login-form-page");
    const mensaje = document.getElementById("modal-login-mensaje") ||
        document.getElementById("page-login-mensaje");
    const botonRegistro = document.getElementById("mostrar-registro-modal");
    const botonAcceso = document.getElementById("mostrar-acceso-modal");

    const cambiarFormulario = (mostrarRegistro) => {
        formularioAcceso?.classList.toggle("hidden", mostrarRegistro);
        formulario?.classList.toggle("hidden", !mostrarRegistro);
        botonRegistro?.classList.toggle("hidden", mostrarRegistro);
        if (mensaje) {
            mensaje.textContent = "";
            mensaje.className = "login-mensaje";
        }
    };

    botonRegistro?.addEventListener("click", () => cambiarFormulario(true));
    botonAcceso?.addEventListener("click", () => cambiarFormulario(false));

    if (!formulario) return;

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        const nombre = document.getElementById("registro-nombre").value.trim();
        const correo = document.getElementById("registro-correo").value.trim();
        const contrasena = document.getElementById("registro-contrasena").value.trim();

        try {
            if (!registrarUsuario(nombre, correo, contrasena)) {
                mostrarMensaje(mensaje, "Ya existe una cuenta con ese correo.", "error");
                return;
            }
        } catch {
            mostrarMensaje(mensaje, "No se pudo guardar la cuenta en este navegador.", "error");
            return;
        }

        iniciarSesion(correo);
        cambiarFormulario(false);
        mostrarMensaje(mensaje, "Cuenta creada. Ya iniciaste sesión.", "exito");
        actualizarInterfazAutenticacion();
        if (modal) setTimeout(() => modal.classList.remove("active"), 600);
    });
}

export function inicializarAutenticacion() {
    actualizarInterfazAutenticacion();

    const modal = document.getElementById("login-modal");
    const botonCerrar = document.getElementById("close-login-modal-btn");

    [
        {
            formulario: document.getElementById("login-form-page"),
            idUsuario: "page-usuario",
            idContrasena: "page-contrasena",
            idMensaje: "page-login-mensaje"
        },
        {
            formulario: document.getElementById("login-form-modal"),
            idUsuario: "modal-usuario",
            idContrasena: "modal-contrasena",
            idMensaje: "modal-login-mensaje",
            alIngresar: () => {
                if (modal) setTimeout(() => modal.classList.remove("active"), 600);
            }
        }
    ].forEach(manejarEnvioAcceso);

    configurarRegistro(modal);

    const botonCerrarPagina = document.getElementById("btn-cerrar-sesion-page");
    if (botonCerrarPagina) {
        botonCerrarPagina.addEventListener("click", pedirCerrarSesion);
    }

    document.querySelectorAll('a[href*="wa.me"]').forEach((enlace) => {
        enlace.addEventListener("click", (evento) => {
            if (estaAutenticado()) return;
            evento.preventDefault();
            if (modal) modal.classList.add("active");
        });
    });

    document.querySelectorAll(".btn-cerrar-sesion-header").forEach((boton) => {
        boton.addEventListener("click", pedirCerrarSesion);
    });

    document.querySelectorAll("#header-login-btn").forEach((boton) => {
        boton.addEventListener("click", (evento) => {
            evento.preventDefault();
            if (modal) {
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
