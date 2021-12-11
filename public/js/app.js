// fetch("http://localhost:3000/weather").then(async (response) => {
//     const data = await response.json();
//     if (data.error) {
//         console.log(data.error);
//     } else {
//         console.log(data.forecast);
//         console.log(data.location);
//     }
// });

const weatherForm = document.querySelector("form");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (document.querySelector(".output")) {
        document.querySelector(".output").remove();
    }

    const inputField = document.querySelector("input");
    const inputValue = inputField.value;
    const mainContent = document.querySelector(".main-content");
    const weatherLink = `/weather?address=${inputValue}`;
    const output = document.createElement("p");
    output.classList.add("output");

    fetch(weatherLink).then(async (response) => {
        const data = await response.json();
        if (data.error) {
            output.classList.add("error");
            output.textContent = data.error;
            mainContent.appendChild(output);
        } else {
            output.classList.add("success");

            const outputList = document.createElement("ul");
            outputList.classList.add("output-list");

            const locationItem = document.createElement("li");
            locationItem.appendChild(
                document.createTextNode(`Location: ${data.location}`)
            );
            outputList.appendChild(locationItem);

            const forecastItem = document.createElement("li");
            forecastItem.appendChild(
                document.createTextNode(`Forecast: ${data.forecast}`)
            );
            outputList.appendChild(forecastItem);

            const addressItem = document.createElement("li");
            addressItem.appendChild(
                document.createTextNode(`Address: ${data.address}`)
            );
            outputList.appendChild(addressItem);

            output.appendChild(outputList);
            mainContent.appendChild(output);
        }
    });
});
