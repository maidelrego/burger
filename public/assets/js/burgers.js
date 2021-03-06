$(function(){

    $(".change-devoured-state").on("click",function(event){
        var id = $(this).data("id");
        var devoured = $(this).data("devoured");
        console.log(id,devoured);

        var newDevouredState = {
            devoured: devoured
        };

       
        $.ajax(`/api/burgers/${id}`, {
            type: 'PUT',
            data: newDevouredState
        }).then(
            function(){
                console.log(`CHANGED DEVOURED TO: ${newDevouredState}`);
                
                location.reload();
            }
        );
    });

    $(".add-burger").on("submit",function(event){
        event.preventDefault();
        var newBurger = {
            burger_name: $("#newBurger").val().trim(),
            devoured: 0
        };
        if(newBurger.burger_name === "" || newBurger.burger_name === " "){
            $('.add-burger')[0].reset();
            return console.log(`ERROR: PLEASE ADD A VALID NAME`)
        }
        
        $.ajax(`/api/burgers`,{
            type: "POST",
            data: newBurger
        }).then(
            function(){
                console.log(`ADDED NEW BURGER: ${newBurger.burger_name}`);

                location.reload();
            }
        )
    })

});