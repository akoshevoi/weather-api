// Создаем объект cityId, в котором хранятся названия городов и соответствующие им ID

let cityId = {
  Киев: 703448,
  Ужгород: 690548,
  Львов: 702550, //
  'Ивано-Франковск': 707471,
  Черновцы: 710719,
  Тернополь: 691650,
  Хмельницкий: 706369,
  Луцк: 702569,
  Ровно: 695594,
  Житомир: 686967,
  Чернигов: 710735,
  Суммы: 692194,
  Харьков: 706483,
  Луганск: 702658,
  Донецк: 709717,
  Запорожье: 687700,
  Херсон: 706448,
  Симферополь: 693805,
  Севастополь: 694423,
  Николев: 700569,
  Одесса: 698740,
  Винница: 689558,
  Кропивницкий: 705812,
  Днепр: 709930,
  Полтава: 696643,
  Черкассы: 710791
};

/*==================================================================== 
*
* I. Блок получения текущей погоды первого города при загрузке страницы 
*
=====================================================================*/

// Создаем select с перечнем городов и добавляем его на страницу

let citiesListCurrent = document.querySelector('.current__cities');

let citiesLabelCurrent = document.createElement('label');
citiesLabelCurrent.classList.add('current__cities-label');
citiesLabelCurrent.innerHTML = 'Выберите город: <br>';

let citiesSelectCurrent = document.createElement('select');
citiesSelectCurrent.classList.add('current__cities-select');

citiesLabelCurrent.append(citiesSelectCurrent);
citiesListCurrent.append(citiesLabelCurrent);

// С помощью цикла перебираем объект cityId и добавляем option с названиями городов в созданный выше select

for (let key in cityId) {
  let citiesOptionCurrent = document.createElement('option');
  citiesOptionCurrent.classList.add('current__cities-option');
  citiesOptionCurrent.setAttribute('value', cityId[key]);
  citiesOptionCurrent.textContent = [key];
  citiesSelectCurrent.append(citiesOptionCurrent);
}

// Первому option добавляем атрибут selected, для того что бы при загрузке страницы отображалась погода первого города

for (let i = 0; i < citiesSelectCurrent.options.length; i++) {
  citiesSelectCurrent.options[0].setAttribute('selected', 'selected');
}

// URL первого города, погода которого появляется при загрузке страницы

let urlCurrentFirst;

if (location.protocol === 'http:') {
  urlCurrentFirst =
    'http://api.openweathermap.org/data/2.5/weather?id=703448&lang=ru&appid=b010510360a862e7c19ce5de7e28216f';
} else {
  urlCurrentFirst =
    'https://api.openweathermap.org/data/2.5/weather?id=703448&lang=ru&appid=b010510360a862e7c19ce5de7e28216f';
}

// Запрос для получения данных о текущей погоде первого города, который появляется при первой загрузки страницы

fetch(urlCurrentFirst)
  .then(function (resp) {
    return resp.json();
  })
  .then(function (data) {
    let pressure = data.main.pressure * 0.75; // переменная с давлением

    // Добавляем на страницу данные о текущей погоде первого города при первой загрузке страницы

    document.querySelector('.current__city').textContent = data.name; // название города
    document.querySelector(
      '.current__degree'
    ).innerHTML = `<img src="https://openweathermap.org/img/wn/${
      data.weather[0]['icon']
    }@2x.png"> ${Math.round(data.main.temp - 273)} &deg;С`; // текущая температура с иконкой
    document.querySelector(
      '.current__degree-feels'
    ).innerHTML = `Чувствуется как: ${Math.round(
      data.main.feels_like - 273
    )} &deg;C <hr>`; // температура по ощущениям
    document.querySelector(
      '.current__descriprtion'
    ).innerHTML = `Облачность: ${data.weather[0]['description']} <hr>`; // облачность
    document.querySelector(
      '.current__pressure'
    ).innerHTML = `Давление,мм: ${pressure} <hr>`; // давление
    document.querySelector(
      '.current__humidity'
    ).innerHTML = `Влажность,%: ${data.main.humidity} <hr>`; // влажность
  })
  .catch(function () {
    // catch any errors
  });

/*=================================================================================== 
*
* II. Блок получения текущей погоды при выборе пользователем другого города из списка 
*
====================================================================================*/

// Перебираем select с option городов и получаем выбранный option для повторного вызова запроса

for (let i = 0; i < citiesSelectCurrent.options.length; ++i) {
  let cityIdentCurrent = document.querySelector('.current__cities-option')
    .value; // значение выбранного option

  // Создаем функцию для получения данных погоде в зависимости от значения выбранного option (выбранного города)

  citiesSelectCurrent.options[i].getWeatherInfo = function () {
    cityIdentCurrent = this.value; // значение option, по которому произошел клик

    // Составляющие нового URL запроса в зависимости от ID выбранного города

    let urlStartCurrent = 'https://api.openweathermap.org/data/2.5/weather?id='; // начало URL запроса
    let urlEndCurrent = '&lang=ru&appid=b010510360a862e7c19ce5de7e28216f'; // конец URL запроса
    let newUrlCurrent = urlStartCurrent + cityIdentCurrent + urlEndCurrent; // собранный новый URL запрос

    // Повторно делаем запрос для других городов (город, который выбран из списка)

    fetch(newUrlCurrent)
      .then(function (resp) {
        return resp.json();
      })
      .then(function (data) {
        let pressure = data.main.pressure * 0.75; // переменная с давлением

        // Добавляем на страницу данные о текущей погоде выбранного пользователем города

        document.querySelector('.current__city').textContent = data.name; // название города
        document.querySelector(
          '.current__degree'
        ).innerHTML = `<img src="https://openweathermap.org/img/wn/${
          data.weather[0]['icon']
        }@2x.png"> ${Math.round(data.main.temp - 273)} &deg;С`; // текущая температура с иконкой
        document.querySelector(
          '.current__degree-feels'
        ).innerHTML = `Чувствуется как: ${Math.round(
          data.main.feels_like - 273
        )} &deg;C <hr>`; // температура по ощущениям
        document.querySelector(
          '.current__descriprtion'
        ).innerHTML = `Облачность: ${data.weather[0]['description']} <hr>`; // облачность
        document.querySelector(
          '.current__pressure'
        ).innerHTML = `Давление,мм: ${pressure} <hr>`; // давление
        document.querySelector(
          '.current__humidity'
        ).innerHTML = `Влажность,%: ${data.main.humidity} <hr>`; // влажность
      })
      .catch(function () {
        // catch any errors
      });
  };
}

// Каждый раз при при выборе пользователем другого города вызывается вышенаписання функция getWeatherInfo() и загружаются новые данные о погоде в выбранном городе

citiesSelectCurrent.onchange = function () {
  this.options[this.selectedIndex].getWeatherInfo();
};

/*============================================================================================================ 
*
* III. Блок получения прогноза погоды на 5 дней с данными на каждые 3 часа первого города при загрузке страницы 
*
==============================================================================================================*/

// Создаем select с перечнем городов и добавляем его на страницу

let citiesListForecast = document.querySelector('.forecast__cities');

let citiesSelectForecast = document.createElement('select');
citiesSelectForecast.classList.add('forecast__cities-select');

let citiesLabelForecast = document.createElement('label');
citiesLabelForecast.classList.add('forecast__cities-label');
citiesLabelForecast.innerHTML = 'Выберите город:';

citiesLabelForecast.append(citiesSelectForecast);
citiesListForecast.append(citiesLabelForecast);

// С помощью цикла перебираем объект cityId и добавляем в созданный select option с названиями городов

for (let key in cityId) {
  let citiesOptionForecast = document.createElement('option');
  citiesOptionForecast.classList.add('forecast__cities-option');
  citiesOptionForecast.setAttribute('value', cityId[key]);
  citiesOptionForecast.textContent = [key];
  citiesSelectForecast.append(citiesOptionForecast);
}

// Первому option добавляем атрибут selected, для того что бы при загрузке страницы отображалась погода первого города

for (let i = 0; i < citiesSelectForecast.options.length; i++) {
  citiesSelectForecast.options[0].setAttribute('selected', 'selected');
}

// URL первого города, погода которого появляется при загрузке страницы

let url;

if (location.protocol === 'http:') {
  url =
    'http://api.openweathermap.org/data/2.5/forecast?id=703448&lang=ru&appid=b010510360a862e7c19ce5de7e28216f';
} else {
  url =
    'https://api.openweathermap.org/data/2.5/forecast?id=703448&lang=ru&appid=b010510360a862e7c19ce5de7e28216f';
}

// Запрос для получения данных о прогнозе погоды первого города, который появляется при первой загрузки страницы

fetch(url)
  .then(function (resp) {
    return resp.json();
  })
  .then(function (data) {
    // Создаем пустой объект, в котором будет хранится информация о погоде.
    let cityWeather = {};

    console.log(data);

    // Перебираем объект data и добавляем в объект cityWeather ключ с названием города

    for (let key1 in data) {
      // перебираем объект data
      if (typeof data[key1] == 'object') {
        // создаем условие, что-бы отсеять такие данные из data как cod: "200", message: 0, cnt: 40 и не включать их в новый объект
        for (let key2 in data[key1]) {
          for (let key3 in data[key1][key2]) {
            cityWeather[data.city.name] = {}; // Добавляем ключ с названием города в объект cityWeather и присваиваем этому ключу пустой объект
          }
        }
      }
    }

    // Перебираем объект data и добавляем в объект cityWeather остальные данные о погоде

    for (let key1 in data) {
      if (typeof data[key1] == 'object') {
        for (let key2 in data.list) {
          for (let key3 in data[key1][key2]) {
            for (let key4 in cityWeather) {
              cityWeather[key4][data[key1][key2].dt_txt] = data.list[key2]; // присваиваем пустому объекту ключ с датой и временем и значение - объект с данным о погоде
            }
          }
        }
      }
    }

    // Перебираем объект cityWeather для добавления его данных на страницу

    for (let key in cityWeather) {
      document.querySelector('.forecast__city').textContent = [key];

      for (let key1 in cityWeather[key]) {
        // Получаем дату, время и день недели для их отображения на странице

        let dateTime = cityWeather[key][key1].dt_txt;
        let monthLetter;
        let dayLetter;
        let yearNumber = +dateTime.substring(0, 4);
        let monthNumber = +dateTime.substring(5, 7);
        let dateNumber = +dateTime.substring(8, 10);
        let timeNumber = dateTime.substring(11, 16);
        let hoursNumber = +dateTime.substring(11, 13);
        let minutesNumber = +dateTime.substring(14, 16);
        let secondsNumber = +dateTime.substring(17, 19);
        let date = new Date(
          yearNumber,
          monthNumber - 1,
          dateNumber,
          hoursNumber,
          minutesNumber,
          secondsNumber
        );
        let dayNumber = date.getDay();

        // В зависимости от полученного индекса дня недели присваиваем переменной dayLetter название дня недели в буквенном виде

        switch (dayNumber) {
          case 1:
            dayLetter = 'Понедельник';
            break;
          case 2:
            dayLetter = 'Вторник';
            break;
          case 3:
            dayLetter = 'Среда';
            break;
          case 4:
            dayLetter = 'Четверг';
            break;
          case 5:
            dayLetter = 'Пятница';
            break;
          case 6:
            dayLetter = 'Суббота';
            break;
          case 0:
            dayLetter = 'Воскресенье';
            break;
        }

        // В зависимости от полученного индекса месяца присваиваем переменной monthLetter название месяца в буквенном виде

        switch (monthNumber) {
          case 01:
            monthLetter = 'Января';
            break;
          case 02:
            monthLetter = 'Февраля';
            break;
          case 03:
            monthLetter = 'Марта';
            break;
          case 04:
            monthLetter = 'Апреля';
            break;
          case 05:
            monthLetter = 'Мая';
            break;
          case 06:
            monthLetter = 'Июня';
            break;
          case 07:
            monthLetter = 'Июля';
            break;
          case 08:
            monthLetter = 'Августа';
            break;
          case 09:
            monthLetter = 'Сентября';
            break;
          case 10:
            monthLetter = 'Октября';
            break;
          case 11:
            monthLetter = 'Ноября';
            break;
          case 12:
            monthLetter = 'Декабря';
            break;
        }

        let pressure = cityWeather[key][key1].main.pressure * 0.75; // переменная с давлением

        // Создаем карточку с данными о погоде на каждые 3 часа и добавляем ее на страницу

        let weatherColumn = document.createElement('div');
        weatherColumn.classList.add('forecast__column');
        document.querySelector('.forecast__row').appendChild(weatherColumn);

        // Получаем день недели и добавляем эту информацию в созданную выше карточку с данными о погоде на каждые 3 часа

        let weatherDay = document.createElement('div');
        weatherDay.classList.add('forecast__day');
        weatherDay.innerHTML = `${dayLetter}`;
        weatherColumn.appendChild(weatherDay);

        // Получаем дату и добавляем эту информацию в созданную выше карточку с данными о погоде на каждые 3 часа

        let weatherDate = document.createElement('div');
        weatherDate.classList.add('forecast__date');
        weatherDate.innerHTML = `${dateNumber}`;
        weatherColumn.appendChild(weatherDate);

        // Получаем месяц и добавляем эту информацию в созданную выше карточку с данными о погоде на каждые 3 часа

        let weatherMonth = document.createElement('div');
        weatherMonth.classList.add('forecast__month');
        weatherMonth.innerHTML = `${monthLetter}`;
        weatherColumn.appendChild(weatherMonth);

        // Получаем время и добавляем эту информацию в созданную выше карточку с данными о погоде на каждые 3 часа

        let weatherTime = document.createElement('div');
        weatherTime.classList.add('forecast__time');
        weatherTime.innerHTML = `${timeNumber}`;
        weatherColumn.appendChild(weatherTime);

        // Получаем температуру с иконкой и добавляем эту информацию в созданную выше карточку с данными о погоде на каждые 3 часа

        let weatherDegree = document.createElement('div');
        weatherDegree.classList.add('forecast__degree');
        weatherDegree.innerHTML = `<img src="https://openweathermap.org/img/wn/${
          cityWeather[key][key1].weather[0]['icon']
        }@2x.png">  
        ${Math.round(cityWeather[key][key1].main.temp - 273)} &deg;С`;
        weatherColumn.appendChild(weatherDegree);

        // Получаем значение температуры по ощущениям и добавляем эту информацию в созданную выше карточку с данными о погоде на каждые 3 часа

        let weatherDegreeFeels = document.createElement('div');
        weatherDegreeFeels.classList.add('forecast__degree-feels');
        weatherDegreeFeels.innerHTML = `Чувствуется как: ${Math.round(
          cityWeather[key][key1].main.feels_like - 273
        )} &deg;С <hr>`;
        weatherColumn.appendChild(weatherDegreeFeels);

        // Получаем значение облачности и добавляем эту информацию в созданную выше карточку с данными о погоде на каждые 3 часа

        let weatherDescription = document.createElement('div');
        weatherDescription.classList.add('forecast__description');
        weatherDescription.innerHTML = `Облачность: ${cityWeather[key][key1].weather[0]['description']} <hr>`;
        weatherColumn.appendChild(weatherDescription);

        // Получаем значение давления и добавляем эту информацию в созданную выше карточку с данными о погоде на каждые 3 часа

        let weatherPressure = document.createElement('div');
        weatherPressure.classList.add('forecast__pressure');
        weatherPressure.innerHTML = `Давление,мм: ${pressure} <hr>`;
        weatherColumn.appendChild(weatherPressure);

        // Получаем значение влажности и добавляем эту информацию в созданную выше карточку с данными о погоде на каждые 3 часа

        let weatherHumidity = document.createElement('div');
        weatherHumidity.classList.add('forecast__humidity');
        weatherHumidity.innerHTML = `Влажность,%: ${cityWeather[key][key1].main.humidity} <hr>`;
        weatherColumn.appendChild(weatherHumidity);
      }
    }
  })
  .catch(function () {
    // catch any errors
  });

/*=======================================================================
* 
* IV. Блок получения прогноза погоды на 5 дней с данными на каждые 3 часа 
* при при выборе пользователем другого города из списка 
*
=======================================================================*/

// Перебираем select с option городов для повторного вызова запроса

for (let i = 0; i < citiesSelectForecast.options.length; ++i) {
  let cityIdent = document.querySelector('.forecast__cities-option').value; // значение выбранного option

  // Создаем функцию для получения данных погоде в зависимости от значения выбранного option (выбранного города)

  citiesSelectForecast.options[i].getWeatherInfo = function () {
    cityIdent = this.value; // значение option, по которому произошел клик

    // Составляющие нового URL зпроса в зависимости от ID выбранного города

    let urlStart = 'https://api.openweathermap.org/data/2.5/forecast?id='; // начало URL запроса
    let urlEnd = '&lang=ru&appid=b010510360a862e7c19ce5de7e28216f'; // конец URL запроса
    let newUrl = urlStart + cityIdent + urlEnd; // собранный новый URL запрос

    // Повтрно делаем запрос для других городов (город, который выбран из списка)

    fetch(newUrl)
      .then(function (resp) {
        return resp.json();
      })
      .then(function (data) {
        // Повторно создаем пустой объект, в котором будет хранится информация о погоде.
        let cityWeather = {};

        // Повторно перебираем объект data и добавляем в повтороно созданный объект cityWeather ключ с названием города

        for (let key1_1 in data) {
          // перебираем объект data
          if (typeof data[key1_1] == 'object') {
            // создаем условие, что-бы отсеять такие данные из data как cod: "200", message: 0, cnt: 40 и не включать их в новый объект
            for (let key2_1 in data[key1_1]) {
              for (let key3_1 in data[key1_1][key2_1]) {
                cityWeather[data.city.name] = {}; // Добавляем ключ с названием города в повтороно созданный объект cityWeather и присваиваем этому ключу пустой объект
              }
            }
          }
        }

        // Повторно перебираем объект data и добавляем в повтороно созданный объект cityWeather остальные данные о погоде

        for (let key1_1 in data) {
          if (typeof data[key1_1] == 'object') {
            for (let key2_1 in data.list) {
              for (let key3_1 in data[key1_1][key2_1]) {
                for (let key4_1 in cityWeather) {
                  cityWeather[key4_1][data[key1_1][key2_1].dt_txt] =
                    data.list[key2_1]; // присваиваем пустому объекту ключ с датой и временем и значение - объект с данным о погоде
                }
              }
            }
          }
        }

        // Перебираем объект cityWeather для добавления его данных на страницу (заменяем предыдущие данные на странице)

        for (let key5 in cityWeather) {
          document.querySelector('.forecast__city').textContent = [key5];

          // Находим все созданные раннее карточки с данными погоде на каждые 3 часа и с помощью цикла их удаляем

          let weatherDeletedColumn = document.querySelectorAll(
            '.forecast__column'
          );

          for (let i = 0; i < weatherDeletedColumn.length; i++) {
            weatherDeletedColumn[i].remove();
          }

          for (let key6 in cityWeather[key5]) {
            // Получаем дату, время и день недели для их отображения на странице
            let dateTime = cityWeather[key5][key6].dt_txt;
            let monthLetter;
            let dayLetter;
            let yearNumber = +dateTime.substring(0, 4);
            let monthNumber = +dateTime.substring(5, 7);
            let dateNumber = +dateTime.substring(8, 10);
            let timeNumber = dateTime.substring(11, 16);
            let hoursNumber = +dateTime.substring(11, 13);
            let minutesNumber = +dateTime.substring(14, 16);
            let secondsNumber = +dateTime.substring(17, 19);
            let date = new Date(
              yearNumber,
              monthNumber - 1,
              dateNumber,
              hoursNumber,
              minutesNumber,
              secondsNumber
            );
            let dayNumber = date.getDay();

            // В зависимости от полученного индекса дня недели присваиваем переменной dayLetter название дня недели в буквенном виде

            switch (dayNumber) {
              case 1:
                dayLetter = 'Понедельник';
                break;
              case 2:
                dayLetter = 'Вторник';
                break;
              case 3:
                dayLetter = 'Среда';
                break;
              case 4:
                dayLetter = 'Четверг';
                break;
              case 5:
                dayLetter = 'Пятница';
                break;
              case 6:
                dayLetter = 'Суббота';
                break;
              case 0:
                dayLetter = 'Воскресенье';
                break;
            }

            // В зависимости от полученного индекса месяца присваиваем переменной monthLetter название месяца в буквенном виде

            switch (monthNumber) {
              case 01:
                monthLetter = 'Января';
                break;
              case 02:
                monthLetter = 'Февраля';
                break;
              case 03:
                monthLetter = 'Марта';
                break;
              case 04:
                monthLetter = 'Апреля';
                break;
              case 05:
                monthLetter = 'Мая';
                break;
              case 06:
                monthLetter = 'Июня';
                break;
              case 07:
                monthLetter = 'Июля';
                break;
              case 08:
                monthLetter = 'Августа';
                break;
              case 09:
                monthLetter = 'Сентября';
                break;
              case 10:
                monthLetter = 'Октября';
                break;
              case 11:
                monthLetter = 'Ноября';
                break;
              case 12:
                monthLetter = 'Декабря';
                break;
            }

            let pressure = cityWeather[key5][key6].main.pressure * 0.75; // переменная с давлением

            // Создаем новую карточку с данными о погоде на каждые 3 часа и добавляем ее на страницу

            let weatherColumnNew = document.createElement('div');
            weatherColumnNew.classList.add('forecast__column');
            document
              .querySelector('.forecast__row')
              .appendChild(weatherColumnNew);

            // Получаем новый день недели и добавляем эту информацию в созданную выше новую карточку с данными о погоде на каждые 3 часа

            let weatherDayNew = document.createElement('div');
            weatherDayNew.classList.add('forecast__day');
            weatherDayNew.innerHTML = `${dayLetter}`;
            weatherColumnNew.appendChild(weatherDayNew);

            // Получаем новую дату и добавляем эту информацию в созданную выше новую карточку с данными о погоде на каждые 3 часа

            let weatherDateNew = document.createElement('div');
            weatherDateNew.classList.add('forecast__date');
            weatherDateNew.innerHTML = `${dateNumber}`;
            weatherColumnNew.appendChild(weatherDateNew);

            // Получаем новый месяц и добавляем эту информацию в созданную выше новую карточку с данными о погоде на каждые 3 часа

            let weatherMonthNew = document.createElement('div');
            weatherMonthNew.classList.add('forecast__month');
            weatherMonthNew.innerHTML = `${monthLetter}`;
            weatherColumnNew.appendChild(weatherMonthNew);

            // Получаем новое время и добавляем эту информацию в созданную выше новую карточку с данными о погоде на каждые 3 часа

            let weatherTimeNew = document.createElement('div');
            weatherTimeNew.classList.add('forecast__time');
            weatherTimeNew.innerHTML = `${timeNumber}`;
            weatherColumnNew.appendChild(weatherTimeNew);

            // Получаем новую температуру с иконкой и добавляем эту информацию в созданную выше новую карточку с данными о погоде на каждые 3 часа

            let weatherDegreeNew = document.createElement('div');
            weatherDegreeNew.classList.add('forecast__degree');
            weatherDegreeNew.innerHTML = `<img src="https://openweathermap.org/img/wn/${
              cityWeather[key5][key6].weather[0]['icon']
            }@2x.png">  
            ${Math.round(cityWeather[key5][key6].main.temp - 273)} &deg;С`;
            weatherColumnNew.appendChild(weatherDegreeNew);

            // Получаем новое значение температуры по ощущениям и добавляем эту информацию в созданную выше новую карточку с данными о погоде на каждые 3 часа

            let weatherDegreeFeelsNew = document.createElement('div');
            weatherDegreeFeelsNew.classList.add('forecast__degree-feels');
            weatherDegreeFeelsNew.innerHTML = `Чувствуется как: ${Math.round(
              cityWeather[key5][key6].main.feels_like - 273
            )} &deg;С <hr>`;
            weatherColumnNew.appendChild(weatherDegreeFeelsNew);

            // Получаем новое значение облачности и добавляем эту информацию в созданную выше новую карточку с данными о погоде на каждые 3 часа

            let weatherDescriptionNew = document.createElement('div');
            weatherDescriptionNew.classList.add('forecast__description');
            weatherDescriptionNew.innerHTML = `Облачность: ${cityWeather[key5][key6].weather[0]['description']} <hr>`;
            weatherColumnNew.appendChild(weatherDescriptionNew);

            // Получаем новое значение давления и добавляем эту информацию в созданную выше новую карточку с данными о погоде на каждые 3 часа

            let weatherPressureNew = document.createElement('div');
            weatherPressureNew.classList.add('forecast__pressure');
            weatherPressureNew.innerHTML = `Давление,мм: ${pressure} <hr>`;
            weatherColumnNew.appendChild(weatherPressureNew);

            // Получаем новое значение влажности и добавляем эту информацию в созданную выше новую карточку с данными о погоде на каждые 3 часа

            let weatherHumidityNew = document.createElement('div');
            weatherHumidityNew.classList.add('forecast__humidity');
            weatherHumidityNew.innerHTML = `Влажность,%: ${cityWeather[key5][key6].main.humidity} <hr>`;
            weatherColumnNew.appendChild(weatherHumidityNew);
          }
        }
      })
      .catch(function () {
        // catch any errors
      });
  };
}

// Каждый раз при при выборе пользователем другого города вызывается вышенаписання функция getWeatherInfo() и загружаются новые данные о погоде в выбранном городе
citiesSelectForecast.onchange = function () {
  this.options[this.selectedIndex].getWeatherInfo();
};
