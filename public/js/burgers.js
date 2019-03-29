$(function () {

    $(".devour-btn").on("click", function (event) {
        event.preventDefault();
        let thisBurgerID = $(this).data("id");
        let thisBurgerDevoured = $(this).data("devoured");
        console.log(thisBurgerID, thisBurgerDevoured);

        let newBurger = {
            id: thisBurgerID,
            //devoured: thisBurgerDevoured
        };

        $.ajax("/api/burgers/" + thisBurgerID, {
            type: "PUT",
            data: newBurger
        }).then(
            function () {
                location.reload();
            }
        );
    });
});