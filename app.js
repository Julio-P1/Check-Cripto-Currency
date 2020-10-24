const container = document.querySelector('#container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const monedaLocal = document.querySelector('#localCoin');
const criptoMoneda = document.querySelector('#criptoCoin');

window.addEventListener('load', () => {
    traerTopTen();
    formulario.addEventListener('submit', obtenerMonedas);
});

function traerTopTen () {

    const apiKey = 'f3983db33bd720a5ee73b51c695dcb38b9837d343b74f2d42531f5e1b8f3112c';
    const URL = `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&appid=${apiKey}`;

    fetch(URL)
        .then(response => response.json())
        .then(datos => {
            for (let i = 0; i < datos.Data.length; i++) {
                let criptoOpcion = document.createElement('option');
                criptoOpcion.setAttribute('value', `${datos.Data[i].CoinInfo.Name}`)
                criptoOpcion.textContent = `${datos.Data[i].CoinInfo.FullName}`;
                criptoMoneda.appendChild(criptoOpcion);
            }
        })
}

function obtenerMonedas (event) {
    event.preventDefault();

    let valorMoneda = monedaLocal.value;
    let criptoValor = criptoMoneda.value;
    cotizarMoneda(valorMoneda, criptoValor);
    
}

function cotizarMoneda (valorMoneda, criptoValor) {

    const apiKey = 'f3983db33bd720a5ee73b51c695dcb38b9837d343b74f2d42531f5e1b8f3112c';
    const URL = `https://min-api.cryptocompare.com/data/price?fsym=${criptoValor}&tsyms=${valorMoneda}&appid=${apiKey}`;
    console.log(URL);
    
    fetch(URL)
        .then(response => response.json())
        .then(datos => {

            const valorActual = document.createElement('p');
            valorActual.innerHTML = ` 1 ${criptoValor} cuesta ${Object.values(datos).toString()} ${valorMoneda}`;

            const divResultado = document.createElement('div');
            divResultado.appendChild(valorActual);
            
            container.appendChild(divResultado);

            valorActual.classList.add('show-value');

            setTimeout(() => {
                divResultado.remove();
            }, 5000);

        })
}
