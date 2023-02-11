const printHome = () => {
    mainContainer.innerHTML = `
        <section class="section-home">
            <p class="section-home__description"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
            <hr class="section-home__break">
        </section>
        <section class="section-home">
            <nav class="nav">
                <a href="#" class="nav__link">CHARACTERS</a>
                <a href="#" class="nav__link">EPISODES</a>
                <a href="#" class="nav__link">LOCATIONS</a>
            </nav>
        </section>
        
        
    `;

    addEventsToHomeLinks();
}


const addEventsToHomeLinks = () => {
    const homeLinks =[...document.getElementsByClassName('nav__link')];
    homeLinks.forEach( element => {
        element.addEventListener('click', () => {
            printPage(element.textContent.toLocaleUpperCase());;
        });
    });
}