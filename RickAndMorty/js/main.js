const mainContainer = document.querySelector('.main');
const URL_BASE = "https://rickandmortyapi.com/api";

window.onload = () => {
    printHome('HOME');
}

const printPage = (section, url) => {

    adaptHeader(section);

    console.log(section);

    switch (section){
        case 'HOME':
            printHome();
            break;
        case 'LOCATIONS':
            console.log('Pintamos ubicaciones');
            url ? printDetailLocation(url) : printLocations();
            break;
        case 'CHARACTERS':
            console.log('Pintamos personajes');
            url ? printDetailCharacter(url) : printCharacters();
            break;
        case 'EPISODES':
            console.log('Pintamos episodios');
            url ? printDetailEpisode(url) : printEpisodes();
            break;
        default:
            printHome();
            break;
    }

    window.scrollTo(0,0);
}

const adaptHeader = (section) => {
    const header = document.querySelector('header');
    const spanTitle= document.getElementById('title');
    const spanSubTitle= document.getElementById('subtitle');

    if(section === 'HOME'){
        header.classList.add('header--home');
        spanTitle.classList.add('header--home__title');
        spanSubTitle.classList.add('header--home__subtitle');

    } else {
        header.classList.remove('header--home');
        spanTitle.classList.remove('header--home__title');
        spanSubTitle.classList.remove('header--home__subtitle');

    }
}

