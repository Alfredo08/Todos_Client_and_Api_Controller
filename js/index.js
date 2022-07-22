
async function fetchTodos(){
    const URL = "http://127.0.0.1:5000/api/todos";
    const settings = {
        method : "GET"
    }

    /*
    const response = await fetch( URL, settings );
    const data = await response.json();
    console.log( data );
    */

    fetch( URL, settings )
        .then( function( response ){
            console.log( "This will be the second log!" );
            return response.json();
        })
        .then( function( data ){
            const results = document.querySelector( '.results' );
            results.innerHTML = ""

            for( const todo of data ){
                results.innerHTML += `
                    <div class="todo">
                        <h2>
                            ${todo.description}
                        </h2>
                        <p>
                            Status: ${todo.status}
                        </p>
                    </div>
                `;
            }

        })
    
    console.log( "This will be the first log" );
}

async function deleteTodo( id ){
    const URL = `http://127.0.0.1:5000/api/delete/todo/${id}`;
    const settings = {
        method: "DELETE"
    }

    const response = await fetch( URL, settings )
    console.log( response );
}

async function addTodo( event ){
    event.preventDefault();

    const URL = "http://127.0.0.1:5000/api/add/todo";
    const data = {
        description : document.querySelector( '#description' ).value,
        status : document.querySelector( '#status' ).value,
        user_id : 1
    }
    const settings = {
        method : "POST",
        headers : {
            "Content-type" : "application/json"
        },
        body : JSON.stringify( data )
    }

    const response = await fetch( URL, settings );
    console.log( response )
    const jsonData = await response.json();
    console.log( jsonData );
}