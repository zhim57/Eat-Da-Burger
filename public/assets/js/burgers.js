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

 
    $(".change-selected").on("click", function (event) {
      var id = $(this).data("id");
      var newSelected = $(this).data("newselected");
  
      var newSelectedState = {
        selected: newSelected
      };
  
      // Send the PUT request.
      $.ajax("/api/ingredients/" + id, {
        type: "PUT",
        data: newSelectedState
      }).then(
        function () {
          console.log("changed selected to", newSelected);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  // res.redirect("/burgers")
  $(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    // console.log($("#ca").val().trim());
    // console.log($("[name=devoured]:checked").val().trim());
    var newBurger = {
      name: $("#ca").val().trim(),
      // devoured: $("[name=devoured]:checked").val().trim()
    };
    console.log(newBurger);
    alert(newBurger);
    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function () {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".delete-burger").on("click", function (event) {
    var id = $(this).data("id");
    console.log("deleted initiated");
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
    // alert(id);
    // console.log("deleted initiated");
    // Send the DELETE request.
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
    // console.log($("#ca-ing").val().trim());
    // console.log($("#ca-ing-price").val().trim());
    // console.log("so far so good!");
    // console.log($("[name=devoured]:checked").val().trim());

    var igr = {
      name: $("#ca-ing").val().trim(),
      price: $("#ca-ing-price").val().trim(),
    // let igr = {
    //   "name": "test3", "price": 3

      vegetarian: $("[name=vegetarian]:checked").val().trim()
      // devoured: $("[name=devoured]:checked").val().trim()
    };
    // alert(igr);
    // Send the POST request.
    $.ajax("/api/test2", {
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
});