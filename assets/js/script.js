const apiURLExchangeRates = "https://mindicador.cl/api/";

const selectMoney = document.querySelector("#select-money");
const buttonSearch = document.querySelector("#button-search");

const exchanges = [
  {
    idExchange: "dolar",
    nameExchange: "Dólar observado",
  },
  {
    idExchange: "dolar_intercambio",
    nameExchange: "Dólar acuerdo",
  },
  { idExchange: "euro", nameExchange: "Euro" },
  {
    idExchange: "ivp",
    nameExchange: "Indice de valor promedio (IVP)",
  },
  {
    idExchange: "uf",
    nameExchange: "Unidad de fomento (UF)",
  },
  {
    idExchange: "utm",
    nameExchange: "Unidad Tributaria Mensual (UTM)",
  },
];

renderExchangeRates();

function renderExchangeRates() {
  let html = `<option value="" selected>Seleccione moneda</option>`;
  for (exchange of exchanges) {
    html += `<option value="${exchange.idExchange}">${exchange?.nameExchange}</option>`;
  }
  selectMoney.innerHTML = html;
}

buttonSearch.addEventListener("click", async function () {
  let inputCLP = document.querySelector("#input-clp");
  const myChart = document.getElementById("myChart");
  let contentInputCLP = Number(inputCLP.value);

  if (contentInputCLP === 0) {
    currencyExchangeResponse("Ingrese pesos CLP");
    myChart.style.background = "";
    clearChart();
    return;
  }

  if (selectMoney.value !== "") {
    const responseGetExchangeRates = await getExchangeRates(selectMoney.value);
    const valueExchangeRates = responseGetExchangeRates.serie[0].valor;
    const calculateExchangeRates = (
      contentInputCLP / valueExchangeRates
    ).toFixed(2);
    renderGraphic(responseGetExchangeRates.serie.slice(0, 10));
    currencyExchangeResponse("Resultado: $".concat(calculateExchangeRates));
  } else {
    currencyExchangeResponse("Seleccione moneda a convertir");
    myChart.style.background = "";
    clearChart();
  }
});

function currencyExchangeResponse(responseAddEventListener) {
  let currencyExchange = document.querySelector("#currency-exchange");
  currencyExchange.innerHTML = responseAddEventListener;
}

async function getExchangeRates(typeExchange) {
  try {
    const response = await fetch(apiURLExchangeRates.concat(typeExchange));
    return await response.json();
  } catch (error) {
    alert("Error al intentar convertir moneda seleccionada");
  }
}

function renderGraphic(responseGetExchangeRates) {
  const data = getAndCreateDataToChart(responseGetExchangeRates);
  const config = {
    type: "line",
    data,
  };
  const myChart = document.getElementById("myChart");
  myChart.style.backgroundColor = "white";
  clearChart();
  window.chart = new Chart(myChart, config);
}

function getAndCreateDataToChart(responseGetExchangeRates) {
  const labels = responseGetExchangeRates.map((exchange) => {
    return exchange.fecha.split("T")[0];
  });
  const data = responseGetExchangeRates.map((exchange) => {
    return exchange.valor;
  });
  const datasets = [
    {
      label: "Historial últimos 10 días",
      borderColor: "rgb(255, 99, 132)",
      data,
    },
  ];
  return { labels, datasets };
}

function clearChart() {
  if (window.chart) {
    window.chart.clear();
    window.chart.destroy();
  }
}
