let session = new Map();
function handleInput() {
    let stream = document.getElementsByClassName('video-container');
    for (let i = 0; i <= stream.length; i++)
    {
        let child = stream[i];

        let description = child.getElementsByTagName('h2')[0];

        if (!description.innerText.toLowerCase().includes(inputString()))
        {
            stream[i].style.display = 'none';
        }
        else
        {
            stream[i].style.display = 'block';
        }
        console.log(description.innerText);
        console.log(inputString());
    }
}

let inputString = function() {
   return document.getElementsByTagName('input')[0].value.toLowerCase();
}

function sessionLog(session){
    // Вывод в консоль
    for (let result of session) {
        console.log(result)
    }
}

function handleSession()
{

    cheakAge();
    // Сохраним UserAgent
    session.set("userAgent", window.navigator.userAgent)

    sessionLog(session);
}

function cheakAge()
{
    session.set("age", prompt("Пожалуйста, введите ваш возраст"))
    // Проверка на возраст и сохранение сессии
    if (session.get("age") >= 18) {
        let startDate = new Date().toLocaleString();

        alert("Приветствуем на LifeSpot! " + '\n' + "Текущее время: " + startDate);
        session.set("startDate", startDate)
    }
    else {
        alert("Наши трансляции не предназначены для лиц моложе 18 лет. Вы будете перенаправлены");
        window.location.href = "http://www.google.com"
    }
}