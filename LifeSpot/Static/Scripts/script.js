const storageKey = "UserAge";
function askAge() {
    let age = prompt("Сколько вам лет?")
    if (age) {
        localStorage.setItem("UserAge", age);
    }
    return age;
}
(function() {
    let storedName = localStorage.getItem(storageKey);
    if (!storedName) {
        storedName = askAge();
    }
    displayGreeting();
})();

function displayGreeting() {
    alert("Приветствуем Вас на LifeSpot " + new Date().toLocaleDateString());
}

function handleInput() {
    let stream = document.getElementsByClassName('video-container');
    for (let i = 0; i <= stream.length; i++) {
        let child = stream[i];

        let description = child.getElementsByTagName('h2')[0];

        if (!description.innerText.toLowerCase().includes(inputString())) {
            stream[i].style.display = 'none';
        }
        else {
            stream[i].style.display = 'block';
        }
    }
}

let inputString = function () {
    return document.getElementsByTagName('input')[0].value.toLowerCase();
}
