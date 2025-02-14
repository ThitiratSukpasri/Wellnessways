function initializeSearch() {
  const searchForm = document.querySelector("form");
  const searchResultDiv = document.querySelector(".search-result");
  const container = document.querySelector(".container");
  let searchQuery = "";
  const APP_ID = "your_id";
  const APP_key = "your_api_key";

  // Start profiling
  console.time("initializeSearch");

  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector("input").value;
    await fetchAPI(); // Corrected to use await with fetchAPI()
    // End profiling after fetchAPI() finishes
    console.timeEnd("initializeSearch");
  });

  async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;

    try {
      const response = await fetch(baseURL);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      generateHTML(data.hits);
      console.log(data);

      return data.hits;
    } catch (error) {
      throw error; // Rethrow the caught error
    }
  }

  function generateHTML(results) {
    container.classList.remove("initial");
    let generatedHTML = "";
    results.forEach((result) => {
      generatedHTML += `
        <div class="item">
          <img src="${result.recipe.image}" alt="img">
          <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a class="view-btn" target="_blank" href="${result.recipe.url}">View Recipe</a>
          </div>
          <p class="item-summary">Calories: ${result.recipe.calories.toFixed(2)}</p>
          <p class="item-summary">Diet label: ${
            result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : "No Data Found"
          }</p>
          <button class="read-more-btn">Read More</button>
          <div class="item-details" style="display: none;">
            <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
            <p class="item-data">Diet label: ${
              result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : "No Data Found"
            }</p>
            <p class="item-data">Health labels: ${result.recipe.healthLabels}</p>
          </div>
        </div>
      `;
    });
    searchResultDiv.innerHTML = generatedHTML;

    // Add event listeners to the "Read More" buttons
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    readMoreButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const itemDetails = button.nextElementSibling;
        itemDetails.style.display = itemDetails.style.display === 'none' ? 'block' : 'none';
      });
    });
  }
}

module.exports = initializeSearch;
