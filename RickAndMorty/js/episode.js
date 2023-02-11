const printDetailEpisode = (url) => {
    console.log(url);
    getEpisode(url).then(response => {
        console.log(response);
        let episodeDetail = formatEpisodeDetail(response);
        mainContainer.innerHTML = `
            <section class="section">
                <h3 class="section__title">EPISODE DETAIL</h3>
                <section class="episode">
                    ${episodeDetail}
                </section>
            </section>

        `;
        addEventsToEpisodeCharactersLinks(response.urlCharacter);
    });
}


const getEpisode = async (url) => {

    let response = await fetch(url);
    let data = await response.json();
    data = formatDataEpisode(data);
   

    return data;
}

const formatDataEpisode= (data) => {
    let dataFormated = {
        name: data.name,
        episode: data.episode,
        date: data.air_date,
        characters: characterOptions(data.characters).join(' '),
        urlCharacter: data.characters
    };
    
    return dataFormated;

}

function formatEpisodeDetail(episode) {
    
    return `
        <div class="episode__container
        ">
            <div class="episode__info-container">    
                <div class="episode__header">
                    <p class="episode__title">${episode.name}</p>
                </div>
                <div class="episode__info-data">
                    <p class="episode__info-title">EPISODE</p>
                    <p class="episode__info">${episode.episode}</p>
                    <p class="episode__info-title">DATE</p>
                    <p class="episode__info">${episode.date}</p>
                    <p class="episode__info-title">CHARACTERS</p>
                    <div class="episode__info-episode-list">
                        <p class="episode__info-episode-container">
                            ${episode.characters}
                        </p>
                    </div>
                </div>
            </div>
            
        </div>
    `;
}

const characterOptions = (options) => {
    let charactersFormated = [];

    options.forEach( (element, i) => {
        let stringParts = element.split("/");
        let idCharacter = stringParts[stringParts.length - 1];
        let auxObject = `
        <div class="episode__info-character">
            <img class="detail__img-small card_link" src="https://rickandmortyapi.com/api/character/avatar/${idCharacter}.jpeg" href="${element}">
        </div>`
        
        charactersFormated.push(auxObject);
    });
    return charactersFormated;
}


const addEventsToEpisodeCharactersLinks = (episode) => {
    let cardLinks = [...document.getElementsByClassName('detail__img-small')];
    cardLinks.forEach((element, i) => {
        element.addEventListener('click', () => {
            printPage('CHARACTERS', episode[i]);
        })
    });
}