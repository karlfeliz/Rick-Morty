const printLocations = () => {
    console.log(mainContainer);
    mainContainer.innerHTML = "";
    getLocations().then(response => {
        let locationsCards = formatLocationCards(response);
        mainContainer.innerHTML = `
            <section class="locations">
                <div class="locations__top">
                    <h3 class="locations__title">LOCATION FINDER</h3>
                    <div class="locations__button">
                        <i class="locations__search fa-solid fa-magnifying-glass"></i>
                        <input class="locations__query" type="text" name="buscador" id="finder" placeholder="Buscar...">     
                    </div>
                </div>

                <ul class="locations__container">
                    ${locationsCards}
                </ul>
            </section>
        `;
        addEventsToLocationsLinks(response);
    });
}

/*
const inputText = document.querySelector('input');
const locationList = document.getElementById('finder');
inputText.addEventListener('change', filterLocation);

function filterLocation(e) {
    locationList = locations.filter(location => location.name.includes(inputText.value));
    return locationList;
}
*/
const formatLocationCards = (locations) => {
    console.log(locations);
    let templateLocations = locations.map(locations => {
        return `
            <li class="locations__card">
                <div class="locations__card-header">
                    <h4 class="locations__card-title"> ${locations.name} </h4>
                </div>
                <div class="locations__card-container">
                    <div class="locations__card-middle--1">
                        <p class="locations__card-info-title""> TYPE </p>
                        <p class="locations__card-info"> ${locations.type} </p>
                    </div>
                    <div class="locations__card-middle">
                        <p class="locations__card-info-title"> DIMENSION </p>
                        <p class="locations__card-info"> ${locations.dimension} </p>
                    </div>
                </div>
                <a class="locations__card-link" href="#"> +MORE DETAILS </a>
            </li> 
        `
    }).join('');

    return templateLocations;

}

const addEventsToLocationsLinks = (locations) => {
    let cardLinks = [...document.getElementsByClassName('locations__card-link')];
    cardLinks.forEach((element, i) => {
        element.addEventListener('click', () => {
            printPage('LOCATIONS', locations[i].urlDetail);
        })
    });
}


const getLocations = async () => {
    let url = URL_BASE + "/location/";
    let response = await fetch(url);
    let data = await response.json();
    data = mapDataLocations(data.results);
        

    return data;
}

const mapDataLocations = (data) => {
    let dataMapped = data.map( locations => {
        let object = {
            name: locations.name,
            type: locations.type,
            dimension: locations.dimension,
            urlDetail: locations.url
        }

        return object;
    });

    return dataMapped;
}

