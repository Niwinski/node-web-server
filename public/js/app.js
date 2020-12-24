console.log("hello world");

const weatherForm = document.querySelector("form");
const city = document.querySelector("input");
const msg = document.querySelector("#m1");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = city.value;
    const url = "http://localhost:3000/weather?address=" + location;

    fetch(url).then((response) => {
        response.json().then((data) => {
            console.log(data);
            msg.textContent =
                data["address"] +
                " is " +
                data["temp"] +
                " though it feels like " +
                data["feel"];
        });
    });
});
