const roomId = new URLSearchParams(window.location.search).get('pokemonName');
console.log(roomId);

setTimeout(() => {
    const tempo = document.getElementById('tempoBack');
    tempo.remove();
    setTimeout(() => {
        const logo = document.getElementById('pokeballLogo');
        logo.remove();
    }, 500);
}, 2000);