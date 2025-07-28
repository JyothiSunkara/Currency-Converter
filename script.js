let apiKey = "c3643d23feb8ff1f28a81ad6"

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns) {
    for(currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
       select.addEventListener("change" , (evnt) => {
           updateFlag(evnt.target);
     });
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }

    let URL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurr.value}`;

    fetch(URL)
    .then((response) => {
         if (!response.ok) {
            throw new Error("Network response was not ok");
         }
         return response.json();
    })
    .then((data) => {
         console.log(data);
         let rate = data.conversion_rates[toCurr.value];
         let finalAmount = amtVal * rate;
         msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    })
    .catch((error) => {
        console.error("Error fetching exchange rate:", error);
        msg.innerText = "Failed to get exchange rate. Please try again.";
     });
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click",async (evnt) => {
    evnt.preventDefault();
    updateExchangeRate();
    
});

window.addEventListener("load", () => {
    updateExchangeRate();
})