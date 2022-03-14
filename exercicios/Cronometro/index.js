function Cronometro() {
  this.start();
  this.keypress();
  this.contador = 0;
  this.clickStart = 0;
  this.inner = document.querySelector('.setTimer');
  this.pause = document.querySelector('.pause');
  this.restart = document.querySelector('.restart');
  this.timer = document.querySelector('.timer');
  this.iniciar = document.querySelector('.start');
  this.btnNone = document.querySelectorAll('.btnNone')
  this.pause.setAttribute('title', '"P" p/ pausar');
  this.iniciar.setAttribute('title', '"Enter" p/ começar')
  this.restart.setAttribute('title', '"R" p/ resetar');
}  

Cronometro.prototype.start = function () {
  document.addEventListener('click', e =>{
    const el = e.target;
    if(el.classList.contains('start')) this.startCronometro(); 
    if(el.classList.contains('pause')) this.pauseCronometro();
    if(el.classList.contains('restart')) this.restartCronometro();
  });
}

Cronometro.prototype.startCronometro = function () {
  if(this.startTimer) return;
  this.startTimer = true;
  clearInterval(this.timerGo);
  clearInterval(this.pauseAnima);
  clearInterval(this.pauseAnima2);
  this.iniciaCorreto();
  this.clickStart++;
  this.timer.style = 'color: white';
  for(buttons of this.btnNone) buttons.classList.remove('btnNone');
}

Cronometro.prototype.iniciaCorreto = function () {
  if(this.clickStart === 0){
    this.timer.innerText = '00:00:01';
    this.contador++;
    this.iniciaTimer();
  }else this.iniciaTimer();
}

Cronometro.prototype.iniciaTimer = function () {
  this.timerGo = setInterval(() => {
    this.contador++;
    this.timer.innerText = this.criaSegundos(this.contador * 1000);
  }, 1000);
}

Cronometro.prototype.criaSegundos = function (segundos) {
  const data = new Date(segundos);
  return data.toLocaleTimeString('pt-br', {
    hour12: false,
    timeZone: 'UTC'
  });
}

Cronometro.prototype.pauseCronometro = function () {
  clearInterval(this.timerGo);
  this.timer.style = 'color: rgb(192, 0, 0)';
  this.piscaTimer();
  this.startTimer = false;
}

Cronometro.prototype.piscaTimer = function () {
  this.pauseAnima = setInterval(() => {
    this.timer.style = 'color: black';
  }, 500);

  this.pauseAnima2 = setInterval(() => {
    this.timer.style = 'color: rgb(192, 0, 0)';
  }, 1000);
}

Cronometro.prototype.restartCronometro = function () {
  clearInterval(this.timerGo);
  clearInterval(this.pauseAnima);
  clearInterval(this.pauseAnima2);
  this.timer.innerHTML = '00:00:00';
  this.contador = 0;
  this.timer.style = 'color: white';
  this.clickStart = 0;
  this.inner.innerHTML = '';
  this.startTimer = false;
}

Cronometro.prototype.setTimer = function () {
  const p = document.createElement('li');
  this.inner.appendChild(p);
  p.innerText += `${this.criaSegundos(this.contador * 1000)}`
}

Cronometro.prototype.keypress = function () {
  document.addEventListener('keypress', e =>{
    const el = e.keyCode;
    if(el === 112) this.pauseCronometro();
    if(el === 13) this.startCronometro();
    if(el === 114) this.restartCronometro();
    if(el === 32) this.setTimer();
  });
}

const tempo = new Cronometro();
