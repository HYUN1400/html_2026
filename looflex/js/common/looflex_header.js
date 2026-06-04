const input = document.querySelector(".search-input");
const searchbtn = document.querySelector(".search-icon");


const handleSearch = async () => {
    const inputValue = input.value.trim();
    if (!inputValue) return;

    const isSearchPage = window.location.pathname.includes("looflex_search.html");

    if (isSearchPage) {
        const newUrl = `looflex_search.html?query=${encodeURIComponent(inputValue)}`;
        window.history.pushState({ path: newUrl }, '', newUrl);

        if (typeof searchMovies === "function") {
            window.searchMovies(inputValue); 
        }
    } else {
        window.location.href = `../html/looflex_search.html?query=${encodeURIComponent(inputValue)}`;
    }
};

searchbtn.addEventListener('click', handleSearch);
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});