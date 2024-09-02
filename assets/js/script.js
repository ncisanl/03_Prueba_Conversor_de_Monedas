const apiURL = "https://mindicador.cl/api/";

const selectMoney = document.querySelector("#select-money");
const buttonSearch = document.querySelector("#button-search");

async function getExchangeRates() {
  const response = await fetch(apiURL);
  return await response.json();
}

async function renderSelectExchangeRates() {
  try {
    const exchangeRates = await getExchangeRates();
    selectMoney.innerHTML = `
<option value="" selected>Seleccione moneda</option>
<option value="${exchangeRates?.bitcoin?.valor}">${exchangeRates?.bitcoin?.nombre}</option>
<option value="${exchangeRates?.dolar?.valor}">${exchangeRates?.dolar?.nombre}</option>
<option value="${exchangeRates?.dolar_intercambio?.valor}">${exchangeRates?.dolar_intercambio?.nombre}</option>
<option value="${exchangeRates?.euro?.valor}">${exchangeRates?.euro?.nombre}</option>
<option value="${exchangeRates?.imacec?.valor}">${exchangeRates?.imacec?.nombre}</option>
<option value="${exchangeRates?.ipc?.valor}">${exchangeRates?.ipc?.nombre}</option>
<option value="${exchangeRates?.ivp?.valor}">${exchangeRates?.ivp?.nombre}</option>
<option value="${exchangeRates?.libra_cobre?.valor}">${exchangeRates?.libra_cobre?.nombre}</option>
<option value="${exchangeRates?.tasa_desempleo?.valor}">${exchangeRates?.tasa_desempleo?.nombre}</option>
<option value="${exchangeRates?.tpm?.valor}">${exchangeRates?.tpm?.nombre}</option>
<option value="${exchangeRates?.uf?.valor}">${exchangeRates?.uf?.nombre}</option>
<option value="${exchangeRates?.utm?.valor}">${exchangeRates?.utm?.nombre}</option>
`;
  } catch (error) {
    alert(error.message);
  }
}

renderSelectExchangeRates();

buttonSearch.addEventListener("click", function () {
  let inputCLP = document.querySelector("#input-clp");
  let contentInputCLP = Number(inputCLP.value);
  let currencyExchange = document.querySelector("#currency-exchange");
  if (contentInputCLP === 0) {
    currencyExchange.innerHTML = "Ingrese pesos CLP";
    return;
  }
  if (selectMoney.value === "") {
    currencyExchange.innerHTML = "Seleccione moneda a convertir";
    return;
  }
  currencyExchange.innerHTML = "Resultado: $".concat(
    contentInputCLP + Number(selectMoney.value),
  );
});
