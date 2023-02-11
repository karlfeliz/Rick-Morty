const printDetailCharacter = (url) => {
    getCharacter(url).then(response => {
        console.log(response);
        let characterDetail = formatCharacterDetail(response);
        mainContainer.innerHTML = `
            <section class="section">
                <h3 class="section__title">CHARACTER DETAIL</h3>
                <section class="section__container">
                    ${characterDetail}
                </section>
            </section>

        `;
        adaptStatus(response.status);
        addEventsToEpisodesLinks(response.urlsEpisode);
        addEventsToCharacterLocationLinks(response.urlLocation);
    });
}


const getCharacter = async (url) => {
    let response = await fetch(url);
    let data = await response.json();
    data = formatDataCharacter(data);
   

    return data;
}

const formatDataCharacter= (data) => {
    let dataFormated = {
        img: data.image,
        name: data.name,
        status: data.status,
        species: data.species,
        origin: data.origin.name,
        location: data.location.name,
        episode: mapOptions(data.episode).join(' '), //data.episode, //.toString().replaceAll("https://rickandmortyapi.com/api/episode/", "").replaceAll(",", " ").split(" ", data.episode.lenght).join(' '),
        urlDetail: data.url,
        urlsEpisode: data.episode,
        urlLocation: data.location.url

    };
    
    return dataFormated;

}

function formatCharacterDetail(character) {
    
    return `
        <div class="detail">
                <div>
                    <img class="detail__img" src="${character.img}">
                    <h4 class="detail__title">${character.name}</h4>
                    <hr class="detail__break">
                </div>
            <div class="detail__info-container">    
                
                <div class="detail__info-data">
                    <p class="detail__info-title">STATUS</p>
                    <div class="detail__info-status-container">
                        <div class="detail__status-block">
                            <div id="alive" class="detail__status-result">ALIVE</div>
                            <div id="dead" class="detail__status-result">DEAD</div>
                            <div id="unknown" class="detail__status-result">UNKNOWN</div>
                        </div>
                    </div>
                    <p class="detail__info-title">ORIGIN</p>
                    <p class="detail__info">${character.origin}</p>
                    <p class="detail__info-title">LOCATON</p>
                    <p class="detail__info-location">${character.location}</p>
                    <div class="detail__info-episode-list">
                        <p class="detail__info-title">EPISODE</p>
                        <div class="detail__info-episode-container">
                            ${character.episode}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    `;
}

const addEventsToEpisodesLinks = (episodes) => {
    let episodeLinks = [...document.getElementsByClassName('detail__info-episode')];
    episodeLinks.forEach((element, i) => {
        element.addEventListener('click', () => {
            console.log(episodes);
            printPage('EPISODES', episodes[i]);
        })
    });
}
const addEventsToCharacterLocationLinks = (location) => {
    let locationLinks = [...document.getElementsByClassName('detail__info-location')];
    locationLinks.forEach((element, i) => {
        element.addEventListener('click', () => {
            console.log(location);
            printPage('LOCATIONS', location[i]);
        })
    });
}

const mapOptions = (options) => {
    let optionFormated = [];

    options.forEach( (element) => {
        let idOption = element.replace("https://rickandmortyapi.com/api/episode/","");
        let episodesBlock = '';
        episodesBlock += `<div class="detail__info-episode" href="${element}">${idOption}</div>`;
        
        optionFormated.push(episodesBlock);
    });
    return optionFormated;
}

const adaptStatus = (status) => {
    const alive = document.getElementById('alive');
    const dead= document.getElementById('dead');
    const unknown= document.getElementById('unknown');

    if(status === 'Alive'){
        alive.classList.add('detail__alive');
    } else {
        alive.classList.remove('detail__alive');
    }
    if(status === 'Dead'){
        dead.classList.add('detail__dead');
    } else {
        dead.classList.remove('detail__dead');
    }
    if(status === 'unknown'){
        unknown.classList.add('detail__unknown');
    } else {
        unknown.classList.remove('detail__unknown');
    }
}