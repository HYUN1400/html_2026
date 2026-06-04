// GENRES

const genres = document.querySelector(".genres");
const genresModal = document.querySelector(".genres-drop");
let isLoaded = false;

genres.addEventListener("mouseenter", () => {
    let ModalHTML = '';

    if (!isLoaded) { fetch('https://api.themoviedb.org/3/genre/movie/list?language=ko', TMDB_CONFIG.options)
        .then(res => res.json())
        .then(res => res.genres)
        .then(re => {
                const filteredGenres = re.filter(genre => genre.id !== 36 && genre.id !== 99);

                filteredGenres.forEach((r) => {
                ModalHTML += `
                <div onclick="location.href='../html/looflex_genres.html?genres=${r.id}'">
                    ${r.name}
                </div>
                `
            })

            genresModal.innerHTML = ModalHTML;
            isLoaded = true;
        })
        .catch(err => console.error(err));
}})

// GENRES-detail

const inventory = document.querySelector(".inventory");
const title = document.querySelector(".genre-title");
let inventoryHTML = '';

const showid = async (genresId) => {
    const [movieRes, genreRes] = 
    await Promise.all([
        fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genresId}&sort_by=popularity.desc&language=ko&page=1`, TMDB_CONFIG.options),
        fetch(`https://api.themoviedb.org/3/genre/movie/list?language=ko`, TMDB_CONFIG.options)
    ]);

    const movieData = await movieRes.json();
    const genreData = await genreRes.json();

    const currentGenre = genreData.genres.find(g => g.id == genresId);
    const genreName = currentGenre ? currentGenre.name : "알 수 없는 장르";

    const result = movieData.results;

    title.innerHTML += `<div>${genreName}</div>`;

    result.forEach((re) => {
        console.log(re)
        inventoryHTML += `
            <div class="inv-elements">
                    <img src="${TMDB_CONFIG.posterUrl}w500${re.poster_path}" onclick="details('${re.id}')">
            </div>
        `
    })

    inventory.innerHTML = inventoryHTML;
};

window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const genreName = urlParams.get('genres');

    showid(genreName);
};