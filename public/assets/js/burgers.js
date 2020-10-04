// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $(".change-devoured").on("click", function (event) {
    var id = $(this).data("id");
    var newDevoured = $(this).data("newdevoured");

    var newDevouredState = {
      devoured: newDevoured
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevouredState
    }).then(
      function () {
        console.log("changed devour to", newDevoured);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });


  $(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    var newBurger = {
      name: $("#ca").val().trim(),
    };
    addIngredients(newBurger.name);
    var newBurger1 = "";
    setTimeout(function () {
      newBurger1 = {
        name: ingredientString,
        price: "$" + totalPrice
      };
      console.log(newBurger1);
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger1
      })
        .then(
          function () {
            console.log("created new burger");
            // Reload the page to get the updated list
            location.reload();
          }
        );
    }, 400);


  });

  $(".delete-burger").on("click", function (event) {
    var id = $(this).data("id");
    // Send the DELETE request.
    $.ajax("/api/burgers/" + id, {
      type: "DELETE"
    }).then(
      function () {
        console.log("deleted burger", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
  // delete-ingredient

  ///================ingredients=============
  $(".delete-ingredient").on("click", function (event) {
    let id = $(this).data("id");

    $.ajax("/api/ingredient/" + id, {
      type: "DELETE"
    }).then(
      function () {
        console.log("deleted ingredient", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });



  $(".ping-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    var igr = {
      name: $("#ca-ing").val().trim(),
      price: $("#ca-ing-price").val(),
      vegetarian: $("[name=vegetarian]:checked").val().trim()
    };
    // Send the POST request.
    $.ajax("/api/ingredient/create", {
      type: "POST",
      data: igr
    }).then(
      function () {
        console.log("created new Ingredient");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  var newChecked = "test";
  $(".change-selected").on("click", function (event) {
    var id = $(this).data("id");
    var newSelected = $(this).data("newselected");

    if (newSelected === 0) {
      console.log("newselected  === 0");
      newSelected = "1";
      newChecked = "checked";
    } else {
      newSelected = "0";
      newChecked = "null";


      console.log("newselected  === 1");
      console.log("newChecked  === " + newChecked);
    };
    var newSelectedState = {
      selected: newSelected,
      checked: newChecked
    };
    // Send the PUT request.
    $.ajax("/api/ingredients/select/" + id, {
      type: "PUT",
      data: newSelectedState
    }).then(
      function () {
        console.log("changed select to", newSelected);
        // Reload the page to get the updated list

        location.reload();
      }
    );
  });

  var ingredientString = "";
  var totalPrice = 3.50;

  const addIngredients = function (newBurger) {

    $.ajax("/api/ingredients/get/", {
      type: "GET",

    }).then(
      function (data) {
        ingredientString = newBurger + " with ";
        totalPrice = 3.50;  //price for a base burger with no add on ingredients
        for (let i = 0; i < data.ingredients.length; i++) {
          let a = data.ingredients[i].name;
          let p = data.ingredients[i].price;
          if (data.ingredients[i].selected === '1') {
            ingredientString = ingredientString + a + ", ";
            totalPrice = totalPrice += p;
          }
          else {
            console.log("not selected");
          }
        }
        // Reload the page to get the updated list
        // location.reload();
        totalPrice = totalPrice.toFixed(2)
        return (ingredientString, totalPrice);
      }
    );

  };

});