document.addEventListener('DOMContentLoaded', (event) => {
  let movies = [];
  (async function() {
      const response = await fetch("./Script/data.json",{
        mode: 'cors',
});
      movies = await response.json();

      
      const uniqueGenres = Array.from(new Set(movies.flatMap(movie => movie.genres)));
      populateGenreSelect(uniqueGenres);

      
      const uniqueYears = Array.from(new Set(movies.map(movie => (new Date(movie.release_date)).getFullYear())));
      populateYearSelect(uniqueYears);

      
      const uniqueLanguages = Array.from(new Set(movies.map(movie => movie.original_language)));
      populateLanguageSelect(uniqueLanguages);

      
      const uniqueRatings = Array.from(new Set(movies.map(movie => movie.vote_average)));
      populateRatingSelect(uniqueRatings);

      
      updateTable();
  })();


  function populateGenreSelect(genres) {
      const genreSelect = document.getElementById("genreSelect");
      genreSelect.innerHTML = "";

      const allOption = document.createElement("option");
      allOption.value = "";
      allOption.text = "All";
      genreSelect.add(allOption);

      genres.sort(); 

      genres.forEach((genre) => {
          const option = document.createElement("option");
          option.value = genre;
          option.text = genre;
          genreSelect.add(option);
      });
  }

  function populateYearSelect(years) {
      const yearSelect = document.getElementById("yearSelect");
      yearSelect.innerHTML = "";

      const allOption = document.createElement("option");
      allOption.value = "";
      allOption.text = "All";
      yearSelect.add(allOption);

      years.sort((a, b) => b - a); 

      years.forEach((year) => {
          const option = document.createElement("option");
          option.value = year;
          option.text = year;
          yearSelect.add(option);
      });
  }

  function populateLanguageSelect(languages) {
      const languageSelect = document.getElementById("languageSelect");
      languageSelect.innerHTML = "";
      const allOption = document.createElement("option");
      allOption.value = "";
      allOption.text = "All";
      languageSelect.add(allOption);

      languages.sort(); 

      languages.forEach((language) => {
          const option = document.createElement("option");
          option.value = language;
          option.text = language;
          languageSelect.add(option);
      });
  }

  function populateRatingSelect(ratings) {
      const ratingSelect = document.getElementById("ratingSelect");
      ratingSelect.innerHTML = "";

      const allOption = document.createElement("option");
      allOption.value = "";
      allOption.text = "All";
      ratingSelect.add(allOption);

      ratings.sort((a, b) => b - a); 

      ratings.forEach((rating) => {
          const option = document.createElement("option");
          option.value = rating;
          option.text = rating;
          ratingSelect.add(option);
      });
  }



  const genreSelect = document.getElementById("genreSelect");
  const yearSelect = document.getElementById("yearSelect");
  const languageSelect = document.getElementById("languageSelect");
  const ratingSelect = document.getElementById("ratingSelect");

  genreSelect.addEventListener("change", () => updateTable());
  yearSelect.addEventListener("change", () => updateTable());
  languageSelect.addEventListener("change", () => updateTable());
  ratingSelect.addEventListener("change", () => updateTable());

  function updateTable() {
      const selectedGenre = genreSelect.value;
      const selectedYear = yearSelect.value;
      const selectedLanguage = languageSelect.value;
      const selectedRating = parseFloat(ratingSelect.value);

      const filteredMovies = movies.filter(movie => {
          const movieYear = (new Date(movie.release_date)).getFullYear();
          return (
              (selectedGenre === "" || movie.genres.includes(selectedGenre)) &&
              (selectedYear === "" || movieYear === parseInt(selectedYear)) &&
              (selectedLanguage === "" || movie.original_language === selectedLanguage) &&
              (isNaN(selectedRating) || movie.vote_average === selectedRating)
          );
      });

      const table = document.querySelector("table");
      const tableBody = table.querySelector("tbody") || document.createElement("tbody");

      tableBody.innerHTML = "";

      if (filteredMovies.length === 0) {
          const row = document.createElement("tr");
          const messageCell = document.createElement("td");
          messageCell.textContent = "No movie found, please try changing filters.";
          messageCell.colSpan = 3; 
          row.appendChild(messageCell);
          tableBody.appendChild(row);
      } else {
          filteredMovies.forEach((movie, index) => {
              const row = document.createElement("tr");

              const rankCell = document.createElement("td");
              rankCell.textContent = index + 1;
              row.appendChild(rankCell);

              const movieCell = document.createElement("td");
              movieCell.textContent = movie.title;
              row.appendChild(movieCell);

              const yearCell = document.createElement("td");
              yearCell.textContent = (new Date(movie.release_date)).getFullYear();
              row.appendChild(yearCell);

              tableBody.appendChild(row);
          });
      }

      table.appendChild(tableBody);
  }


  
  updateTable();

});