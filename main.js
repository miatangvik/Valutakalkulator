const ForexDataClient = require('forex-quotes');
let client = new ForexDataClient('XVVYWICltjMrIgzNtnH15pvLRfFesPdc');

var valueToConvertElement = document.querySelector('input');
var baseCurrencyContainer = document.querySelector('.base-currency.container');
var counterCurrenciesContainer = document.querySelector('.counter-currencies.container');
var counterCurrencyValueElements = document.querySelectorAll('.counter-currency .currency-value');
var counterCurrencyCodeElements = document.querySelectorAll('.counter-currency .currency-code');

var overlay = document.querySelector('.overlay.settings');
var chooseOverlay = document.querySelector('.overlay.choose');

var overlayBaseCurrencyElement = document.querySelector('.overlay.settings .base-currency');
var overlayCounterCurrenciesContainer = document.querySelector('.overlay.settings .counter-currencies');
var overlayCounterCurrencyElements;
var overlayAllCurrenciesContainer = document.querySelector('.overlay.choose .all-currencies');

var changeCurrencyButtons = document.querySelectorAll('.change-currency-button');
var settingsIcon = document.querySelector('.settings-icon');
var closeIcon = document.querySelector('.close-icon');

var choosingBaseCurrency;
var counterCurrencyIndexClicked;

// Save all available currencies in an array
var currencies = [
    {
        iconPath: 'img/flags/norway.svg',
        code: 'NOK',
        name: 'Norske kroner'
    }, {
        iconPath: 'img/flags/european-union.svg',
        code: 'EUR',
        name: 'Euro'
    }, {
        iconPath: 'img/flags/united-states.svg',
        code: 'USD',
        name: 'Amerikanske dollar'
    }, {
        iconPath: 'img/flags/united-kingdom.svg',
        code: 'GBP',
        name: 'Britiske pund'
    }, {
        iconPath: 'img/flags/sweden.svg',
        code: 'SEK',
        name: 'Svenske kroner'
    }, {
        iconPath: 'img/flags/japan.svg',
        code: 'JPY',
        name: 'Japanske yen'
    }, {
        iconPath: 'img/flags/australia.svg',
        code: 'AUD',
        name: 'Australske dollar'
    }, {
        iconPath: 'img/flags/canada.svg',
        code: 'CAD',
        name: 'Canadiske dollar'
    }, {
        iconPath: 'img/flags/republic-of-poland.svg',
        code: 'PLN',
        name: 'Polske zloty'
    }, {
        iconPath: 'img/flags/switzerland.svg',
        code: 'CHF',
        name: 'Sveitsiske franc'
    }, {
        iconPath: 'img/flags/new-zealand.svg',
        code: 'NZD',
        name: 'Newzealandske dollar'
    }, {
        iconPath: 'img/flags/mexico.svg',
        code: 'MXN',
        name: 'Meksikanske peso'
    }, {
        iconPath: 'img/flags/turkey.svg',
        code: 'TRY',
        name: 'Tyrkiske lire'
    }, {
        iconPath: 'img/flags/south-africa.svg',
        code: 'ZAR',
        name: 'Sørafrikanske rand'
    }, {
        iconPath: 'img/flags/china.svg',
        code: 'CNH',
        name: 'Kinesiske renminbi'
    }, {
        iconPath: 'img/flags/singapore.svg',
        code: 'SGD',
        name: 'Singaporske dollar'
    }, {
        iconPath: 'img/flags/russia.svg',
        code: 'RUB',
        name: 'Russiske rubel'
    }, {
        iconPath: 'img/flags/hong-kong.svg',
        code: 'HKD',
        name: 'Hongkongdollar'
    }, {
        iconPath: 'img/flags/denmark.svg',
        code: 'DKK',
        name: 'Danske kroner'
    }
];

// Give focus to the end of the input element
valueToConvertElement.focus();
valueToConvertElement.value = 1000;

// Save current base currency and current counter currencies in variable and array
var currentBaseCurrency = baseCurrencyContainer.children[1].innerHTML;
var currentCounterCurrencies = [];
for (var i = 0; i < counterCurrencyCodeElements.length; i++) {
    currentCounterCurrencies.push(counterCurrencyCodeElements[i].innerHTML);
}

getConvertedValues(currentBaseCurrency, currentCounterCurrencies);

// Add currencies to overlay
for (var i = 0; i < currencies.length; i++) {
    var overlayBaseCurrencyElementCopy = overlayBaseCurrencyElement.cloneNode(true);

    overlayBaseCurrencyElementCopy.children[0].src = currencies[i].iconPath;
    overlayBaseCurrencyElementCopy.children[1].innerHTML = currencies[i].code;
    overlayBaseCurrencyElementCopy.children[2].innerHTML = currencies[i].name;
    overlayAllCurrenciesContainer.appendChild(overlayBaseCurrencyElementCopy);

    if (currencies[i].code == currentBaseCurrency) {
        setBaseCurrency(currencies[i].iconPath, currencies[i].code, currencies[i].name);
    } else if (currentCounterCurrencies.includes(currencies[i].code)) {
        var clone = overlayBaseCurrencyElementCopy.cloneNode(true);
        clone.classList.remove('base-currency');
        clone.classList.add('counter-currency');
        overlayCounterCurrenciesContainer.appendChild(clone);
    }
}


function setBaseCurrency(flagSrc, currencyCode, currencyName) {
    if (currentCounterCurrencies.includes(currencyCode)) {
        var index = currentCounterCurrencies.indexOf(currencyCode);

        currentCounterCurrencies[index] = currentBaseCurrency;

        counterCurrenciesContainer.children[index].children[1].innerHTML = overlayBaseCurrencyElement.children[1].innerHTML;
        counterCurrenciesContainer.children[index].children[2].innerHTML = overlayBaseCurrencyElement.children[2].innerHTML;

        overlayCounterCurrenciesContainer.children[index].children[0].src = overlayBaseCurrencyElement.children[0].src;
        overlayCounterCurrenciesContainer.children[index].children[1].innerHTML = overlayBaseCurrencyElement.children[1].innerHTML;
        overlayCounterCurrenciesContainer.children[index].children[2].innerHTML = overlayBaseCurrencyElement.children[2].innerHTML;
    }

    currentBaseCurrency = currencyCode;

    baseCurrencyContainer.children[1].innerHTML = currencyCode;
    baseCurrencyContainer.children[2].innerHTML = currencyName;

    overlayBaseCurrencyElement.children[0].src = flagSrc;
    overlayBaseCurrencyElement.children[1].innerHTML = currencyCode;
    overlayBaseCurrencyElement.children[2].innerHTML = currencyName;
}

function setCounterCurrency(flagSrc, currencyCode, currencyName) {
    if (currencyCode == currentBaseCurrency) {
        setBaseCurrency(overlayCounterCurrencyElements[counterCurrencyIndexClicked].children[0].src, overlayCounterCurrencyElements[counterCurrencyIndexClicked].children[1].innerHTML, overlayCounterCurrencyElements[counterCurrencyIndexClicked].children[2].innerHTML);
    }

    currentCounterCurrencies[counterCurrencyIndexClicked] = currencyCode;

    counterCurrenciesContainer.children[counterCurrencyIndexClicked].children[1].innerHTML = currencyCode;
    counterCurrenciesContainer.children[counterCurrencyIndexClicked].children[2].innerHTML = currencyName;

    overlayCounterCurrencyElements[counterCurrencyIndexClicked].children[0].src = flagSrc;
    overlayCounterCurrencyElements[counterCurrencyIndexClicked].children[1].innerHTML = currencyCode;
    overlayCounterCurrencyElements[counterCurrencyIndexClicked].children[2].innerHTML = currencyName;
}

function markChosen() {
    for (var i = 0; i < overlayAllCurrenciesContainer.children.length; i++) {
        if (choosingBaseCurrency) {
            if (overlayAllCurrenciesContainer.children[i].children[1].innerHTML == currentBaseCurrency) {
                overlayAllCurrenciesContainer.children[i].classList.add('chosen');
            } else {
                overlayAllCurrenciesContainer.children[i].classList.remove('chosen');
            }
        } else {
            for (var j = 0; j < overlayCounterCurrencyElements.length; j++) {
                if (overlayAllCurrenciesContainer.children[i].children[1].innerHTML == currentBaseCurrency) {
                    overlayAllCurrenciesContainer.children[i].classList.remove('chosen');
                }

                if (overlayAllCurrenciesContainer.children[i].children[1].innerHTML == overlayCounterCurrencyElements[j].children[1].innerHTML) {
                    overlayAllCurrenciesContainer.children[i].classList.add('chosen');
                }
            }
        }
    }
}

changeCurrencyButtons.forEach(function (changeCurrencyButton, index) {
    changeCurrencyButton.addEventListener('mousedown', function () {
        counterCurrencyIndexClicked = index;
        markChosen();
        chooseOverlay.classList.add('visible');
    });
});

overlayBaseCurrencyElement.addEventListener('mousedown', function () {
    for (var i = 0; i < overlayAllCurrenciesContainer.children.length; i++) {
        overlayAllCurrenciesContainer.children[i].classList.remove('counter-currency');
        overlayAllCurrenciesContainer.children[i].classList.add('base-currency');


    }
    choosingBaseCurrency = true;
    markChosen();
    chooseOverlay.classList.add('visible');
});

overlayCounterCurrencyElements = document.querySelectorAll('.overlay.settings .counter-currency');
overlayCounterCurrencyElements.forEach(function (counterCurrencyElement, index) {
    counterCurrencyElement.addEventListener('mousedown', function () {
        for (var i = 0; i < overlayAllCurrenciesContainer.children.length; i++) {
            overlayAllCurrenciesContainer.children[i].classList.remove('base-currency');
            overlayAllCurrenciesContainer.children[i].classList.add('counter-currency');
        }

        counterCurrencyIndexClicked = index;
        choosingBaseCurrency = false;
        markChosen();
        chooseOverlay.classList.add('visible');
    });
});

overlayAllCurrenciesContainer.addEventListener('mousedown', function (event) {
    for (var i = 0; i < overlayAllCurrenciesContainer.children.length; i++) {
        if (overlayAllCurrenciesContainer.children[i].classList.contains('chosen')) {
            overlayAllCurrenciesContainer.children[i].classList.remove('chosen');
        }
    }

    if (choosingBaseCurrency) {
        if (event.target.classList.contains('base-currency')) {
            setBaseCurrency(event.target.children[0].src, event.target.children[1].innerHTML, event.target.children[2].innerHTML);
            event.target.classList.add('chosen');
        } else {
            setBaseCurrency(event.target.parentElement.children[0].src, event.target.parentElement.children[1].innerHTML, event.target.parentElement.children[2].innerHTML);
            event.target.parentElement.classList.add('chosen');
        }
    } else {
        if (event.target.classList.contains('counter-currency')) {
            setCounterCurrency(event.target.children[0].src, event.target.children[1].innerHTML, event.target.children[2].innerHTML);
            event.target.classList.add('chosen');
        } else {
            setCounterCurrency(event.target.parentElement.children[0].src, event.target.parentElement.children[1].innerHTML, event.target.parentElement.children[2].innerHTML);
            event.target.parentElement.classList.add('chosen');
        }
    }
    getConvertedValues(currentBaseCurrency, currentCounterCurrencies);
    chooseOverlay.classList.remove('visible');
});

settingsIcon.addEventListener('mousedown', function () {
    overlay.classList.add('visible');
});

closeIcon.addEventListener('mousedown', function () {
    overlay.classList.remove('visible');
});

function getConvertedValues(baseCurrency, counterCurrencies) {
    var promises = [];
    for (var i = 0; i < counterCurrencyValueElements.length; i++) {
        var promise = convert(baseCurrency, counterCurrencies[i], valueToConvertElement.value);
        promises.push(promise);
    }

    Promise.all(promises).then(function (convertedValues) {
        for (var i = 0; i < counterCurrencyValueElements.length; i++) {
            counterCurrencyValueElements[i].innerHTML = convertedValues[i].toFixed(2);
        }
    });
}

function convert(from, to, value) {
    return new Promise(function (resolve) {
        client.convert(from, to, value).then(response => {
            return resolve(response.value);
        });
    });
}

// Convert again on number input
valueToConvertElement.addEventListener('input', function () {
    if (valueToConvertElement.value <= 0) {
        for (var i = 0; i < counterCurrencyValueElements.length; i++) {
            counterCurrencyValueElements[i].innerHTML = '0';
        }
        return;
    }
    getConvertedValues(currentBaseCurrency, currentCounterCurrencies);
});

/*client.quota().then(response => {
    console.log(response);
});*/
