const printDetailLocation = (url) => {
    console.log(url);
    getLocation(url).then(response => {
        console.log(response);
        let locationDetail = formatLocationDetail(response);
        mainContainer.innerHTML = `
            <section class="section">
                <h3 class="section__title">LOCATION DETAIL</h3>
                <section class="location">
                    ${locationDetail}
                </section>
            </section>

        `;
        addEventsToLocationResidentsLinks(response.urlResidents);
    });
}


const getLocation = async (url) => {
    let response = await fetch(url);
    let data = await response.json();
    data = formatDataLocation(data);
   

    return data;
}

const formatDataLocation= (data) => {
    let dataFormated = {
        name: data.name,
        type: data.type,
        dimension: data.dimension,
        residents: residentOptions(data.residents).join(' '),
        urlResidents: data.residents
    };
    
    return dataFormated;

}

function formatLocationDetail(location) {
    
    return `
        <div class="location__container
        ">
            <div class="location__info-container">    
                <div class="location__header">
                    <p class="location__title">${location.name}</p>
                </div>
                <div class="location__info-data">
                    <p class="location__info-title">TYPE</p>
                    <p class="location__info">${location.type}</p>
                    <p class="location__info-title">DIMENSION</p>
                    <p class="location__info">${location.dimension}</p>
                    <p class="location__info-title">RESIDENTS</p>
                    <div class="location__info-episode-list">
                        <p class="location__info-episode-container">
                            ${location.residents}
                        </p>
                    </div>
                </div>
            </div>
            
        </div>
    `;
}
const residentOptions = (options) => {
    let residentsFormated = [];

    options.forEach( (element, i) => {
        let stringParts = element.split("/");
        let idResident = stringParts[stringParts.length - 1];
        let auxObject = `
        <div class="location__info-resident">
            <img class="detail__img-small" src="https://rickandmortyapi.com/api/character/avatar/${idResident}.jpeg" href="${element}">
        </div>`
        
        residentsFormated.push(auxObject);
    });
    return residentsFormated;
}

const addEventsToLocationResidentsLinks = (episode) => {
    let cardLinks = [...document.getElementsByClassName('detail__img-small')];
    cardLinks.forEach((element, i) => {
        element.addEventListener('click', () => {
            printPage('CHARACTERS', episode[i]);
        })
    });
}