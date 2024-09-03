const searchMeal = async (e) => {
  //async
  e.preventDefault();

  const input = document.querySelector(".input");
  const title = document.querySelector(".Food-title");
  const info = document.querySelector(".Food-info");
  const image = document.querySelector(".image");
  const intregrationoutput = document.querySelector(".intregration");
  const showMealsInfo = (meal) => {
    const { strMeal, strMealThumb, strInstructions } = meal;
    title.textContent = strMeal;
    image.style.backgroundImage = `url(${strMealThumb})`;
    info.textContent = strInstructions;
    const ingerdiants = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredients${i}`]) {
        ingerdiants.push(
          `${meal[`strIngredients${i}`]} - ${meal[`strMeasure${i}`]}`
        );
      } else {
        break;
      }
    }
    const html = `<span>${ingerdiants
      .map((ing) => `<li class ="ing">${ing}</li>`)
      .join("")}
    </span>`;
    intregrationoutput.innerHTML = html;
  };

  const showAlert = () => {
    alert("Meal not Found");
  };

  const fetchdata = async (val) => {
    //async
    const res = await fetch(
      //await
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`
    );
    const { meals } = await res.json(); //await
    return meals;
  };
  const val = input.value.trim();
  if (val) {
    const meals = await fetchdata(val); //await
    if (!meals) {
      showAlert();
      return;
    }
    meals.forEach(showMealsInfo);
  } else {
    alert("Please Enter only meal");
  }
};

const form = document.querySelector("form");
form.addEventListener("submit", searchMeal);
const magnifier = document.querySelector(".magnifier");
magnifier.addEventListener("click", searchMeal);
