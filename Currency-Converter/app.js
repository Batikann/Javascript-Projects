const dropList = document.querySelectorAll("select");
fromCurrency = document.querySelector(".from select");
toCurrency = document.querySelector(".to select");
const getButton = document.querySelector("button");
const exchangeRate = document.querySelector(".exchange-rate");
for (let i = 0; i < dropList.length; i++) {
  for (curreny_code in country_list) {
    let selected;
    if (i == 0) {
      selected = curreny_code == "TRY" ? "selected" : "";
    } else if (i == 1) {
      selected = curreny_code == "USD" ? "selected" : "";
    }
    let optionTag = `<option value="${curreny_code}" ${selected}>${curreny_code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change",e=>{
    loadFlag(e.target);
  })
}

function loadFlag(element) {
  for(code in country_list){
    if (code==element.value) {
      let imgTag=element.parentElement.querySelector('img');
      imgTag.src=`https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`
    }
  }
}

const exchangeIcon=document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener('click',()=>{
  let tempCode=fromCurrency.value;
  fromCurrency.value=toCurrency.value;
  toCurrency.value=tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
})

window.addEventListener("load",()=>{
  getExchangeRate();
})

getButton.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

async function getExchangeRate() {
  const amount = document.querySelector(".amount input");
  let amountValue = amount.value;
  if (amountValue == "" || amountValue == 0) {
    amount.value = "1";
    amountValue = 1;
  }
  exchangeRate.innerText="Getting exchange rate...";
  var myHeaders = new Headers();
  myHeaders.append("apikey", "0BYVGPCpDInBQQ4Z5RV0cD4n80HHWZ3k");

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  const response =  await fetch(
    `https://api.apilayer.com/exchangerates_data/convert?to=${toCurrency.value}&from=${fromCurrency.value}&amount=${amountValue}`,
    requestOptions
  ).then((response)  =>
    response.json()).then((result) => {
      return result
    })
  ;
  const result=response.result

  exchangeRate.innerText = `${amountValue} ${fromCurrency.value} = ${result.toFixed(2)} ${toCurrency.value}`;
}
