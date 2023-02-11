



/*
const mapStatus =(options) => {
    let statusBlock= "";
    options.forEach((element) => {
        if (element.toLowerCase() == 'alive') {
            statusBlock = `
            <div class="detail__status-result alive">ALIVE</div>
            <div class="detail__status-result">DEAD</div>
            <div class="detail__status-result">UNKNOWN</div>
            `;
        } else if (element.toLowerCase() == 'dead') {
            statusBlock = `
            <div class="detail__status-result">ALIVE</div>
            <div class="detail__status-result dead">DEAD</div>
            <div class="detail__status-result">UNKNOWN</div>
            `;
        } else if (element.toLowerCase() == 'unknown') {
            statusBlock = `
            <div class="detail__status-result">ALIVE</div>
            <div class="detail__status-result">DEAD</div>
            <div class="detail__status-result unknown">UNKNOWN</div>
            `;
        }
    })
    
}
*/

const formatOptions = (option, options) => {
    let htmlStructure = "";
    options.forEach(element => {
        htmlStructure += `<img class="detail__options-img detail__options-img--${option}" src="${element.urlImg}">`;
    })

    htmlStructure = `
        <p class="detail__options-title">${option.toUpperCase()}</p>
        <div class="detail__img-container">
            ${htmlStructure}
        </div>
    `;
    return htmlStructure;
}


const addEventListenerToOptions = (option, options) => {
    let optionLinks = [...document.getElementsByClassName(`detail__options-img--${option}`)];
    optionLinks.forEach((element,i) => {
        element.addEventListener('click', () => {
            printPage(option.toUpperCase(), options[i].urlFetch);
        });
    });
}