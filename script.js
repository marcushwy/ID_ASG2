//Display 896 pokemon in one page.
const pokedex = document.getElementById("pokedex"); 

console.log(pokedex);


const getPokemon = () => { 

    const promises = []; 
    for(let z = 1; z <= 896; z++){
        const url = `https://pokeapi.co/api/v2/pokemon/${z}`; 
        promises.push(fetch(url).then((res) =>  res.json()));
    }

    Promise.all(promises).then((results) => {
        const pokemon = results.map ((data) => ({
            name : data.name,
            id: data.id,
            image: data.sprites['front_shiny'],
            type: data.types.map((type) => type.type.name).join(',')
         
        }));
        showPokemon(pokemon);
    });  
};

const showPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLstring = pokemon.map(info => `
    <li class="card">
        <img class="card-image" src="${info.image}"/>
        <h2 class="card-title">${info.id}. ${info.name}</h2>
        <p class ="card-desc">Type: ${info.type}</p>
    </li>
    `)
    .join('');
    pokedex.innerHTML = pokemonHTMLstring; 
};

getPokemon();



//navigation animation 
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    //toggle nav

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
    
    //animate links 
        navLinks.forEach((link, index) => {
            if(link.style.animation){
                link.style.animation = '';
            } else{
                link.style.animation = `navLinkFade 0.5s ease forwads ${index / 7 + 1.5}s`;
            }  
        }); 
    });
}

navSlide();