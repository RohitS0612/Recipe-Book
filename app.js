let result = document.getElementById('result');
let searchBtn = document.getElementById('search-btn');
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";



searchBtn.addEventListener("click", () => {
    let userInput = document.getElementById('user-inp').value;
    if (userInput.length == 0) {
        result.innerHTML = "<h3>Input Feild Cannot Be Empty</h3>";
    } else {
        fetch(url + userInput)
            .then(responnse => responnse.json())
            .then((data) => {
                console.log(data);
                let myMeal = data.meals[0];
                let count = 1;
                let ingredients = [];
                for (let i in myMeal) {
                    let ingredient = "";
                    let measure = "";
                    if (i.startsWith("strIngredient") && myMeal[i]) {
                        ingredient = myMeal[i];
                        measure = myMeal[`strMeasure` + count];
                        count += 1;
                        ingredients.push(`${measure} ${ingredient}`);
                    }
                }

                result.innerHTML = `
        <img src=${myMeal.strMealThumb}>
        <div class="details">
            <h2>${myMeal.strMeal}</h2>
            <h4>${myMeal.strArea}</h4>
        </div>

        <div id="ingredient-con"></div>
        <div id="recipe">
            <button id="hide-recipe">X</button>
            <pre id="instruction">${myMeal.strInstructions}</pre>
        </div>
        <button id="show-recipe">View Recipe</button>
    `;

                let ingredientCon = document.getElementById("ingredient-con");
                let parent = document.createElement("ul");
                let hideRecipe = document.getElementById("hide-recipe");
                let showRecipe = document.getElementById("show-recipe");

                ingredients.forEach((i) => {
                    let child = document.createElement("li");
                    child.innerHTML = i;
                    parent.appendChild(child);
                    ingredientCon.appendChild(parent);
                });

                // Show and hide recipe functionality
                hideRecipe.addEventListener("click", () => {
                    document.getElementById("recipe").style.display = "none";
                });

                showRecipe.addEventListener("click", () => {
                    document.getElementById("recipe").style.display = "block";
                });


            });
    }

});




