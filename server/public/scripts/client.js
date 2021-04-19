console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    $('#addJokeButton').on('click', addJoke)
}


function addJoke() {
    // bundle inputs into an object
    let newJoke = {
        whoseJoke: $('#whoseJokeIn').val(),
        jokeQuestion: $('#questionIn').val(),
        punchLine: $('#punchLineIn').val()
    }

    console.log( 'You have a new joke ', newJoke );

    // POST request to send data to server
    $.ajax({
        method: 'POST',
        url: '/joke',
        data: newJoke
    }) .then( function( response )  {
        console.log('Adding Joke');
        // getCalc();

        // getNums();
    }) .catch( function( error ) {
        console.log('Error from the server', error);
        alert('Sorry, we could not process your joke');
        // alert('Please fill out all necessary inputs.');  
    })


} // end of addJoke