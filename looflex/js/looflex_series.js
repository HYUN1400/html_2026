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

// COMMON

const SERIES_CATEGORIES = {
  marvel: { type: 'discover', keywordId: 180547, sortBy: 'release_date.desc' }, // 마블 MCU 전체
  dc_universe: { type: 'discover', keywordId: 229266, sortBy: 'release_date.desc' }, // DC 확장 유니버스(DCEU)

  starwars: { type: 'collection', id: 10 },          // 스타워즈
  fastandfurious: { type: 'collection', id: 9485 },   // 분노의 질주
  lordoftherings: { type: 'collection', id: 119 },    // 반지의 제왕
  johnwick: { type: 'collection', id: 404609 },       // 존 윅
  missionimpossible: { type: 'collection', id: 87359 }, // 미션 임파서블
  jurassicpark: { type: 'collection', id: 328 },      // 쥬라기 공원/월드
  transformers: { type: 'collection', id: 8650 },     // 트랜스포머
  indianajones: { type: 'collection', id: 84 },       // 인디아나 존스
  matrix: { type: 'collection', id: 2344 },         // 매트릭스
  jamesbond: { type: 'collection', id: 645 },         // 007 제임스 본드
  planetoftheapes: { type: 'collection', id: 173727 }, // 혹성탈출 (리부트)
  darkknight: { type: 'collection', id: 263 },        // 다크 나이트 트리로지

  harrypotter: { type: 'collection', id: 1241, sortBy: 'release_date.desc' },     // 해리포터
  hobbit: { type: 'collection', id: 121938 },         // 호빗
  pirates: { type: 'collection', id: 295 },           // 캐리비안의 해적
  hungergames: { type: 'collection', id: 131635 },    // 헝거 게임
  fantasticbeasts: { type: 'collection', id: 438510 }, // 신비한 동물사전

  toystory: { type: 'collection', id: 10194 },       // 토이 스토리
  shrek: { type: 'collection', id: 748 },             // 슈렉
  frozen: { type: 'collection', id: 386375 },         // 겨울왕국
  kungfupanda: { type: 'collection', id: 78330 },     // 쿵푸팬더

  conjuring: { type: 'collection', id: 294249 },      // 컨저링 유니버스
  alien: { type: 'collection', id: 80 }               // 에이리언 시리즈
};

const fetchSeriesMovies = async (categoryName) => {
    const inventory = document.querySelector(".inventory");
    let inventoryHTML = ''; 
    const category = SERIES_CATEGORIES[categoryName];

    const collections01 = document.querySelectorAll(".collections .col-top div");
    collections01.forEach((title) => {
        if(title.className === categoryName) {
            title.style.boxShadow = '0px 0px 6px rgba(0, 0, 0, 0.5)';
        } else {
            title.style.boxShadow = '';
        }
        });

    const collections02 = document.querySelectorAll(".collections .col-bottom div");
    collections02.forEach((title) => {
        if(title.className === categoryName) {
            title.style.boxShadow = '0px 0px 6px rgba(0, 0, 0, 0.5)';
        } else {
            title.style.boxShadow = '';
        }
        });
        
    
    if (category.type === 'collection') {
        return fetch(`https://api.themoviedb.org/3/collection/${category.id}?language=ko-KR`, TMDB_CONFIG.options)
        .then(res => res.json())
        .then(datas => {console.log(datas.parts)
            datas.parts.forEach((data) => {
                    inventoryHTML += `
                        <div class='inv-elements'>
                            <div><img src = '${TMDB_CONFIG.posterUrl}w500${data.poster_path}' onclick="details('${data.id}')"></div>
                        </div>
                    `
                    console.log(data.id);
                })

                inventory.innerHTML = inventoryHTML;
        }); 
    } else if (category.type === 'discover') {

        const filterParam = category.keywordId 
        ? `with_keywords=${category.keywordId}` 
        : `with_companies=${category.companyId}`;

        return fetch(`https://api.themoviedb.org/3/discover/movie?${filterParam}&sort_by=${category.sortBy}&language=ko-KR&page=1`, TMDB_CONFIG.options)
        .then(res => res.json())
        .then(datas => {console.log(datas.results)
                datas.results.forEach((data) => {
                    inventoryHTML += `
                        <div class='inv-elements'>
                            <div><img src = '${TMDB_CONFIG.posterUrl}w500${data.poster_path}' onclick="details('${data.id}')"></div>
                        </div>
                    `
                    console.log(data.id);
                })

                inventory.innerHTML = inventoryHTML;
            }
            ); 
    }
}

// MAIN에 노출된 series로 바로 들어갈 때
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryName = urlParams.get('category');

    if (categoryName && SERIES_CATEGORIES[categoryName]) {
        fetchSeriesMovies(categoryName);
    } else {
        
    }
};