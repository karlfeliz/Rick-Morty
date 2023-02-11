const printCharacters = () => {
    console.log(mainContainer);
    mainContainer.innerHTML = "";
    getCharacters().then(response => {
        let charactersCards = formatCharactersCards(response);
        mainContainer.innerHTML = `
            <section class="section">
                <h3 class="section__title">CHARACTERS</h3>
                <section class="section__container">
                    ${charactersCards}
                </section>
            </section>
        `;
        adaptCharacterStatus(response.status);
        console.log(adaptCharacterStatus(response));
        addEventsToCharactesLinks(response);
    });
}

const formatCharactersCards = (characters) => {
    console.log(characters);
    let templateCharacter = characters.map(character => {
        return `
            <div class="card">
                <div class="card__header">
                <h4 class="card__title"> ${character.name} </h4>
                <div id="situation" class="card__status"> ${character.status} </div>
                </div>
                <div class="card__info-container">
                    <div>
                        <img class="card__img" src="${character.img}">

                    </div>
                    <div class="card__content">
                        <p class="card__info-title"> SPECIES </p>
                        <p class="card__info"> ${character.species} </p>
                        <p class="card__info-title"> GENDER </p>
                        <p class="card__info"> ${character.gender} </p>
                        <p class="card__info-title"> ORIGIN </p>
                        <p class="card__info"> ${character.origin} </p>
                        <p class="card__info-title"> LOCATION </p>
                        <p class="card__info"> ${character.location} </p>
                    </div>
                </div>
                <a class="card__link" href="#"> +MORE DETAILS </a>
            </div> 
        `
    }).join('');

    return templateCharacter;

}

const addEventsToCharactesLinks = (characters) => {
    let cardLinks = [...document.getElementsByClassName('card__link')];
    cardLinks.forEach((element, i) => {
        element.addEventListener('click', () => {
            printPage('CHARACTERS', characters[i].urlDetail);
        })
    });
}


const getCharacters = async () => {
    let url = URL_BASE + "/character/";
    let response = await fetch(url);
    let data = await response.json();
    data = mapDataCharacters(data.results);
        

    return data;
}

const mapDataCharacters = (data) => {
    let dataMapped = data.map( character => {
        let object = {
            name: character.name,
            status: character.status,
            img: character.image,
            species: character.species,
            gender: character.gender,
            origin: character.origin.name,
            location: character.location.name,
            urlDetail: character.url
        }

        return object;
    });

    return dataMapped;
}

const adaptCharacterStatus = (status) => {
    const situation = document.getElementById('situation');

    if(status === 'Alive'){
        situation.classList.add('card__status--alive');
    } else {
        situation.classList.remove('card__status--alive');
    }
    if(status === 'Dead'){
        situation.classList.add('card__status--dead');
    } else {
        situation.classList.remove('card__status--dead');
    }
    if(status === 'unknown'){
        situation.classList.add('card__status--unknown');
    } else {
        situation.classList.remove('card__status--unknown');
    }
}