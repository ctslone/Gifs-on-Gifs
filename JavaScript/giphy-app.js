var topics = ["Mustang", "Corvette", "Camaro", "Ferarri", "Lamborghini", "Porsche", "Aston Martin"]

function gifButtons() {
    for (i=0; i<topics.length; i++) {
        console.log(topics[i]);
        $("#gif-buttons").append("<button type='button' class='btn btn-outline-dark'>" + topics[i] + "</button>")
    }
}

gifButtons()

