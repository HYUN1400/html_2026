window.searchMovies = async (paramQuery = null) => {
    const inventory = document.querySelector(".inventory");
    const words = document.querySelector(".search-words");

    let invHTML = '';
    let wordHTML = '';

    let query = paramQuery;

    if (!query) {
        const urlParams = new URLSearchParams(window.location.search);
        query = urlParams.get('query');
    }

    if (!query) return;

    words.innerHTML = `<img src="../resource/img/looflex_logo_ico.png" alt=""> <div>❝&nbsp ${query} &nbsp❞ 에 대한 검색결과 ··· </div>`

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?include_adult=false&language=ko-KR&query=${encodeURIComponent(query)}`, 
            TMDB_CONFIG.options
        );
        const datas = await response.json();
        const data = datas.results;
        console.log(data);

        data.forEach((res) => {
            invHTML += `
                <div class="inv-elements">
                    <img src = '${TMDB_CONFIG.posterUrl}w500/${res.poster_path}' onclick="details(${res.id})">
                </div>
            `
        })

        inventory.innerHTML = invHTML;

    } catch (error) {
        console.error("검색 오류:", error);
    }
};

searchMovies();