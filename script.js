
(function () {

    var $cronometro = document.querySelector('#cronometro');
    var $iniciar = document.querySelector('#iniciar');
    var $pausar = document.querySelector('#pausar');
    var $parar = document.querySelector('#parar');

    $iniciar.addEventListener("click", iniciarCronometro);
    $pausar.addEventListener("click", pausarCronometro);
    $parar.addEventListener("click", zerarCronometro);

    var dataInicial = new Date();
    var dataFinal = new Date();
    var dataInicialStamp;
    var dataFinalStamp;
    var tempoPercorridoStamp;
    var tempoSegundos;
    var tempoPercorridoPause = 0;
    var intervalo;
    $cronometro.textContent = "00:00:000";

    function iniciarCronometro() {
        dataInicial = new Date();
        dataInicialStamp = dataInicial.getTime();
        intervalo = setInterval(contaTempo, 100);
        $pausar.removeAttribute("disabled");
        $parar.removeAttribute("disabled");
        $iniciar.setAttribute("disabled", "disabled");
    }

    function contaTempo() {
        dataFinal = new Date();
        dataFinalStamp = dataFinal.getTime();
        tempoPercorridoStamp = dataFinalStamp - dataInicialStamp;
        tempoFinal = formataTempo((tempoPercorridoPause + tempoPercorridoStamp));
        $cronometro.textContent = tempoFinal;
    }

    function pausarCronometro() {
        if (intervalo > 0) {
            clearInterval(intervalo);
            intervalo = false;
            $pausar.textContent = "Continuar";
        } else if (intervalo == false) {
            tempoPercorridoPause = tempoPercorridoPause + tempoPercorridoStamp;
            $pausar.textContent = "Pausar";
            iniciarCronometro();
        }
    }

    function zerarCronometro() {
        clearInterval(intervalo);
        intervalo = false;
        tempoPercorridoStamp = 0;
        tempoPercorridoPause = 0;
        $pausar.textContent = "Pausar";
        $cronometro.textContent = "00:00:000";
        $iniciar.removeAttribute("disabled");
        $pausar.setAttribute("disabled", "disabled");
        $parar.setAttribute("disabled", "disabled");
    }


    const MINUTO = 60000;
    const SEGUNDO = 1000;

    function formataTempo(ms) {
        if (ms < SEGUNDO) {
            var c = "000" + (ms.toString());
            c = c.substring(c.length - 3)
            return "00:00:" + c;
        } else if (ms < MINUTO) {
            var s = ms / SEGUNDO;
            s = parseInt(s);
            if (s < 10) {
                s = "0" + s;
            }
            var c = ms - (s * SEGUNDO);
            c = "000" + (c.toString());
            c = c.substring(c.length - 3)
            return "00:" + s + ":" + c;
        } else {
            var m = ms / MINUTO;
            m = parseInt(m);
            if (m < 10) {
                m = "0" + m;
            }
            var s = ms / SEGUNDO - (m * 60);
            s = parseInt(s);
            if (s < 10) {
                s = "0" + s;
            }
            var c = ms - ((s * SEGUNDO) + (m * MINUTO));
            c = "000" + (c.toString());
            c = c.substring(c.length - 3)
            return m + ":" + s + ":" + c;
        }
    }
})()



