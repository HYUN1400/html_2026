const modalDetails = document.querySelector(".modal-details");
const modal = document.querySelector(".modal");

const details = async(movieId) => {
    try {
        let modalHTML = '';
        modal.classList.add('show');

        setTimeout(() => {
            modal.classList.add('open')
        }, 200);
        
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits,videos,images,watch/providers&language=ko-KR`, TMDB_CONFIG.options)
        const res = await response.json();

        const krProviders = res['watch/providers']?.results?.KR;

        let ottHTML = '';

        if (krProviders) {
            if (krProviders.flatrate) {
                krProviders.flatrate.forEach(provider => {
                    ottHTML += `
                        <div class="ott-item">
                            <img src="https://image.tmdb.org/t/p/original${provider.logo_path}">
                            <div>${provider.provider_name}<div> · 구독</div></div>
                        </div>
                    `;
                });
            }

            if (krProviders.rent) {
                krProviders.rent.forEach(provider => {
                    ottHTML += `
                        <div class="ott-item">
                            <img src="https://image.tmdb.org/t/p/original${provider.logo_path}">
                            <div>${provider.provider_name}<div> · 대여</div></div>
                        </div>
                    `;
                });
            }

            if (krProviders.buy) {
                krProviders.buy.forEach(provider => {
                    ottHTML += `
                        <div class="ott-item">
                            <img src="https://image.tmdb.org/t/p/original${provider.logo_path}">
                            <div>${provider.provider_name}<div> · 구매</div></div>
                        </div>
                    `;
                });
            }
        }

        if (ottHTML === '') {
            ottHTML = '<div class="no-ott">국내 상영 중인 OTT 서비스가 없습니다.</div>';
        }

        let companyHTML = '';

        for(let i = 0; i < res.production_companies.length; i++){
            companyHTML += `
                <div class = "modal-company">
                    <div><img src = '${TMDB_CONFIG.posterUrl}w200${res.production_companies[i].logo_path}'></div>
                </div>
            `
        }

        let castsHTML = '';

        const casts = res.credits.cast.slice(0, 10);
        
        casts.forEach((cast) => {
            castsHTML += `
                <div class="member">
                    <div><img src = "${TMDB_CONFIG.posterUrl}w200${cast.profile_path}"></div>
                    <div class="cast-name">${cast.name}</div>
                    <div class="cast-character">${cast.character} 역</div>
                </div>
            `
        })

        modalHTML += `
                    <div class="modal-back" 
                        style="background-image:
                        linear-gradient(rgba(255, 255, 255, 0), #20232cfe),
                        url('${TMDB_CONFIG.posterUrl}w1280/${res.backdrop_path}')"
                    >
                        <div class = "modal-back-text"> 
                            <div class="modal-origin">${res.tagline? res.tagline : res.original_title}</div>
                            <div class="modal-title">${res.title}</div>
                        </div>
                        <div class="modal-companies">${companyHTML}</div>
                    </div>
                    <div class = "modal-scripts">
                        <div class="modal-scripts-poster">
                            <img src='${TMDB_CONFIG.posterUrl}w400/${res.poster_path}'>
                            <div class="buttons">
                                <button>소장하기</button>
                                <button>대여하기</button>
                                <button class="wish" onclick = "plusfavorite(${res.id}, '${res.title}')"></button>
                            </div>
                        </div>
                        <div class = "modal-script-box">
                            <div class="modal-script">
                                <img src="../resource/img/looflex_logo_ico.png">${res.overview}
                            </div>
                            <div class="casts">
                                <div class="casts-title"><img src = "../resource/img/person_icon.png">등장인물</div>
                                <div class="cast">
                                    ${castsHTML}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ott-script">
                        ${ottHTML}
                    </div>
        `;

        modalDetails.innerHTML = modalHTML;

    } catch (error) {
        console.log(error)
    }
}

modal.addEventListener('click', (e) => {
    if(e.target === modal){
        modalClose();
    }
})

const modalClose = () => {
    modal.classList.remove('open')
    
    setTimeout(() => {
        modal.classList.remove('show');
        }, 400);

    modalDetails.innerHTML = '';
}