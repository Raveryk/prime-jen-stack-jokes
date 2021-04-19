console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    $('#addJokeButton').on('click', addJoke);

    getJokes();
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
        getJokes(); //runs getJokes function after every joke is added, thus appending new joke to DOM.

    }) .catch( function( error ) {
        console.log('Error from the server', error);
        alert('Sorry, we could not process your joke');
        // alert('Please fill out all necessary inputs.');  
    })


} // end of addJoke


// function to make GET request to server to receive the jokes
function getJokes() {
    $.ajax({
        method: 'GET',
        url: '/joke'
    })
        .then( function( response ) {
            console.log('Response from server', response);
            appendToDom( response );   
        })
        .catch( function( error ) {
            console.log('Error from server', error);
            alert('Sorry, something went wrong retreiving data from server')
            
        })
        console.log('After making server request');
}


// process data received from server and append it to the DOM
function appendToDom( jokes ) {
    $('#outputDiv').empty();

    for( let item of jokes ) {
        $('#outputDiv').append(`<ul><li>${item.whoseJoke}'s Joke: ${item.jokeQuestion}...<b>${item.punchLine}</b> HHAHAHAHAHAHA!!!`)
    };

}