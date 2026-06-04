const favoriteMovies = new Map();

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
// POPULARITY MOVIES => slide img

        fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&region=KR&sort_by=popularity.desc', TMDB_CONFIG.options)
        .then(res => res.json())
        .then(res => res.results)
        .then(movies => {
            const slideBoxes = document.querySelectorAll('.slide-img');
            slideBoxes.forEach((box, index) => {
                if(movies[index]){
                    const backdropPath = movies[index+1].backdrop_path;
                    const movieTitle = movies[index+1].title;

                    box.style.backgroundImage = `url(${TMDB_CONFIG.posterUrl}original${backdropPath})`;
                    box.style.backgroundSize = 'cover';
                    box.style.backgroundRepeat = 'no-repeat';
                    box.style.backgroundPosition = 'center';
                    box.style.backgroundColor = '#1c1d24';
                    box.onclick = () => {
                        details(movies[index+1].id);
                    };

                    box.innerHTML = `
                        <div class = "slide-inner-text">
                            <div class="slide-title">${movies[index+1].title}</div>
                            <div class="slide-original-title">${movies[index+1].original_title}</div>
                        </div>
                    `
                }
            })
        })
        .catch(err => console.error(err));
    

// 구매 / 대여 / 찜 => map에 추가하기

const plusfavorite = (movieId, title) => {
    favoriteMovies.set(movieId, title);
    console.log(favoriteMovies);
}



// NOW PLAYING => movies

const movies = document.querySelector(".movies");

const nowPlaying = async () => {

    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&region=KR', TMDB_CONFIG.options);
        const res = await response.json();
        const topFiveMovies = res.results.slice(1, 6);
    
        let moviesHTML = '';
    
        topFiveMovies.forEach((movie) => {
            moviesHTML += `
                <div class="movie">
                    <div class = "movie-poster"
                    style = "background-image: url(${TMDB_CONFIG.posterUrl}w500${movie.poster_path})"
                    onclick = "details(${movie.id})"
                    ></div>
                </div>
            `
        });
    
        movies.innerHTML = moviesHTML;

    } catch (error) {
        console.error(error);
    }
}

nowPlaying();

// SLIDE

 window.onload = function() {
        const slideWrapper = document.querySelector(".slide-wrapper");
        const slideImg = document.querySelectorAll(".slide-img");

        let currentIndex = 0;
        const slideCount = slideImg.length;

        setInterval(() => {
            currentIndex = (currentIndex + 1) % slideCount;

        const slideWidth = slideImg[0].clientWidth; 
         slideWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }, 4000);
}