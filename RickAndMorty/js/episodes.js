const printEpisodes = (url) => {
    console.log(mainContainer);
    mainContainer.innerHTML = "";
    getEpisodes(url).then(response => {
        let episodesCards = formatEpisodesCards(response);
        let dateCards = formatDateCards(response);
        console.log(dateCards);
        mainContainer.innerHTML = `
            <section class="section">
                <div class="section__top">
                    <h3 class="section__title">EPISODES FINDER</h3>
                </div>

                <div class="episodes__container">
                    <div class="episodes__card">
                        <div class="episodes__card-header">
                            <h4 class="episodes__card-title"> SEASON 1</h4>
                        </div>
                        <div class="episodes__card-container">
                            <div class="episodes__card-middle">
                                <p class="episodes__card-info-title""> DATE </p>
                                ${dateCards}
                            </div>
                            <div class="episodes__card-middle">
                                <p class="episodes__card-info-title"> EPISODES </p>
                                ${episodesCards}
                            </div>
                        </div>
                    </div> 
                    <div class="episodes__card">
                        <div class="episodes__card-header">
                            <h4 class="episodes__card-title"> SEASON 2</h4>
                        </div>
                        <div class="episodes__card-container">
                            <div class="episodes__card-middle">
                                <p class="episodes__card-info-title""> DATE </p>
                                ${dateCards}
                            </div>
                            <div class="episodes__card-middle">
                                <p class="episodes__card-info-title"> EPISODES </p>
                                ${episodesCards}
                            </div>
                        </div>
                    </div> 
                </div>
            </section>
        `;
    });
}

 /*   
const filterSeasonOne = (mapDataEpisodes) => {
    mapDataEpisodes.episode.filter(episode => {
        return episode.episode == 'S01';
    })
}
console.log(filterSeasonOne());
*/

const formatEpisodesCards = (episodes) => {
    console.log(episodes);
    
    let templateEpisodes = 
    episodes.map(episode => {
        return `

            <p class="episodes__card-info"> ${episode.episode} </p>
        `
    }).join('');

    return templateEpisodes;
}
/*
const formatDateCards = (options) => {
    let datesFormated = [];

    options.forEach( (element, i) => {
        let stringParts = element.date;
        let lastDate = stringParts[stringParts.length - 1];
        let firstDate = stringParts[element.length +1];
        let auxObject = `
        <div class="episode__info-character">
            <p class="episodes__card-info-1"> ${firstDate} - ${lastDate} </p>
        </div>`
        
        datesFormated.push(auxObject);
    });
    return datesFormated;
}
*/

const formatDateCards = (dates) => {
    console.log(dates);
    let templateDates = 
    dates.map(date => {
        return `

            <p class="episodes__card-info-1"> ${date.date} - ${date.date} </p>
        `
    }).join('');

    return templateDates;
}

const mapDataEpisodes = (data) => {
    let dataMapped = data.map( episodes => {
        let object = {
            date: episodes.air_date,
            episode: episodes.episode,
            urlDetail: episodes.url,
            temporada: episodes.episode.slice(0,3)

            
        }
        console.log(object.temporada);
        return object;
    });
    //console.log(dataMapped);

    return dataMapped;
}

const getEpisodes = async () => {
    let url = URL_BASE + "/episode/";
    console.log(url);
    let urlNext = null;
    let dataAll = [];
    let arrTemporada = [];
    do {
        let response = (urlNext !== null) ? await fetch(urlNext): await fetch(url);
        data = await response.json();
        dataAll = [...dataAll, ...mapDataEpisodes(data.results)];
        urlNext = data.info.next;
        console.log(data);

    } while (data.info.next !== null)
    let arrayGlobal =[];
    let arrayTemporada=[];

    for (let i= 0; i<dataAll.length; i++){
        if(i+1 < dataAll.length && dataAll[i].temporada === dataAll[i + 1].temporada){
            arrTemporada.push(dataAll[i]);

        }else{
            arrTemporada.push(dataAll[i]);
            arrayGlobal.push(arrTemporada);
            arrTemporada = [];
        }

    }
    console.log(arrayGlobal)

    return dataAll;
}





/*

const mapOptionsEp = (options) => {
    let optionFormated = [];

    options.forEach( (element) => {
        let seasonOne = element.filter((episode) =>{return (episode.episode == 'S01' )});
        console.log(seasonOne);
        
    });
    return optionFormated;
}



const formatEpisodesBlock = (episodes) => {
    console.log(episodes);
    let templateEpisodes = episodes.map(episode => {
        return `
        <div class="episodes__card-middle">
            <p class="episodes__card-info-title"> EPISODES </p>
            <p class="episodes__card-info"> ${episodes.episode} </p>
        </div>
        `
    }).join('');

    return templateEpisodes;

}

const firstDate = (options) => {
    options.forEach( (element, i) => {
        let first = element.slice(0,1);
        return first
    });
    return firstDate
}
*/

