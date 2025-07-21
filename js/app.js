const tiempo = document.querySelector(".time");
const inputHoras = document.querySelector(".input-horas");
const inputMinutos = document.querySelector(".input-minutos");
const inputSegundos = document.querySelector(".input-segundos");
const formTemporizador = document.querySelector(".form-temporizador");
const audioFinish = document.getElementById("audioFinish");
const btnInicio = document.querySelector(".btn-Inicio");
const btnPausar = document.querySelector(".btn-Pausa");
const btnReinicio = document.querySelector(".btn-Reiniciar");

btnPausar.classList.add("disabled");
btnReinicio.classList.add("disabled");

let totalMs = 0;
let restante = 0;
let intervalo;
let corriendo = false;

const actualizarTiempo = () => {
  const horas = Math.floor(restante / (1000 * 60 * 60));
  const minutos = Math.floor((restante / (1000 * 60)) % 60);
  const segundos = Math.floor((restante / 1000) % 60);

  tiempo.textContent = `${horas.toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;

  if (restante <= 0) {
    clearInterval(intervalo);
    corriendo = false;
    restante = 0;
    tiempo.textContent = "00:00:00";
    btnInicio.classList.remove("disabled");
    btnPausar.classList.add("disabled");
    btnReinicio.classList.add("disabled");
    audioFinish.play();
  } else {
    restante -= 1000;
  }
};

const Iniciar = (e) => {
  e.preventDefault();
  btnInicio.classList.add("disabled");
  btnPausar.classList.remove("disabled");
  btnReinicio.classList.remove("disabled");
  if (!corriendo) {
    const horas = parseInt(inputHoras.value) || 0;
    const minutos = parseInt(inputMinutos.value) || 0;
    const segundos = parseInt(inputSegundos.value) || 0;

    if (restante === 0) {
      totalMs = (horas * 60 * 60 + minutos * 60 + segundos) * 1000;
      restante = totalMs;
    }
  }
  intervalo = setInterval(actualizarTiempo, 1000);
  corriendo = true;
  formTemporizador.reset();
};

const Pausar = () => {
  if (corriendo) {
    clearInterval(intervalo);
    corriendo = false;
  }
};

const Reiniciar = () => {
  clearInterval(intervalo);
  restante = 0;
  corriendo = false;
  tiempo.textContent = "00:00:00";
  btnInicio.classList.remove("disabled");
  btnPausar.classList.add("disabled");
  btnReinicio.classList.add("disabled");
};

formTemporizador.addEventListener("submit", Iniciar);
btnPausar.addEventListener("click", Pausar);
btnReinicio.addEventListener("click", Reiniciar);

document.addEventListener("keydown", (e) => {
  if (!corriendo && restante > 0) {
    if (e.code === "Space") {
      intervalo = setInterval(actualizarTiempo, 1000);
      corriendo = true;
      btnInicio.classList.add("disabled");
      btnPausar.classList.remove("disabled");
      btnReinicio.classList.remove("disabled");
    }
  }
});
