// Global Variables to keep track of state
ISAUTH = false;


// When the window loads, get the most recent posts.
window.onload = function() {
    getMostRecentPosts();
    let loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", function(event){
        event.preventDefault();
        checkCredentials();
    });

    let addPostForm = document.getElementById("addPostForm");
    addPostForm.addEventListener("submit", function(event){
        event.preventDefault();
        // TODO send the post to the server
        submitPost();
    });

}

// Loads the About Info in the content-container
function getAboutInfo(){
    let info = `
    <div id='aboutInfo'>
    <h2>About</h2>
    <p>This blog is intended to be about software and software-related things. I believe
    in the KISS principle which stands for Keep It Simple Stupid. 
    I am currently focused on learning frontend technologies and UI/UX design.</p>
    </div>`

    let element = document.getElementById('content-container');
    element.innerHTML = info;
}

// Loads the first 10 Posts of the blog
function getMostRecentPosts(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'posts/recent/0/10');
    xhr.onload = function() {
    if (xhr.status === 200) {
        console.log(xhr.responseText)
        let array = JSON.parse(xhr.responseText)
        console.log(array);
        let info = '';
        for (let row of array) {
            let formattedDate = formatDate(row.date);
            info += `<div class='post'>`
            info += `<h2>${row.name}</h2>`
            info += `<time datetime='${row.date}'>${formattedDate.date} at ${formattedDate.time}</time>`
            info += `${row.content}` 
            // TODO add metatags 
            info += `</div>`
         }
        let element = document.getElementById('content-container');
        element.innerHTML = info;
    }
    else {
        alert('Request failed.  Returned status of ' + xhr.status);
    }
    };
    xhr.send();
    
   
}

/* Format Date assuming date is a string in the format YYYY-MM-DDTHH:MM:SS:SSZ (i.e. 2020-03-30T04:00:00.000Z) */
function formatDate(inputDate){
    let array = inputDate.split('T');
    let resultDate = array[0];
    let resultTime = array[1].slice(0, 8); 
    return {
        'date': resultDate,
        'time': resultTime
    }
}

/* Add Post */
function addPost(){
    // Check if user has been authenticated
    // Launch a form to get info about post
    if (ISAUTH){
        openAddPostForm();
    }

}

// Gets the login form.
function login(){
    // Get info to login
    openLoginForm();

}

/* Get information from login form and sends to server to check. */
function checkCredentials(){
    // Get values from the login form
    let email = document.getElementById('email').value
    let psw = document.getElementById('psw').value

    xhr = new XMLHttpRequest();
    xhr.open('POST', 'auth/');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // Call a function when the state changes.
    xhr.onreadystatechange = function() { 
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Request finished. Do processing here.
            let result = JSON.parse(xhr.response)
            if (result["success"] == true) {
                console.log('User has succesefully logined.')
                // allow actions that need authentication
                ISAUTH = true;
                allowActions();
                closeLoginForm();

             } else {
                 console.warn("User has entered incorrect credentials");
             }
        }
    }
    xhr.send(`email=${email}&psw=${psw}`);

}

/* Get information from addPost form and sends to server */
function submitPost(){
    // Get values from the add Post form
    let name = document.getElementById('name').value
    let content = document.getElementById('content').value
    let metaTags = document.getElementById('meta-tags').value

    let date =  new Date().toJSON();
    console.log(date);

    xhr = new XMLHttpRequest();
    xhr.open('POST', 'add/post/');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // Call a function when the state changes.
    xhr.onreadystatechange = function() { 
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Request finished. Do processing here.
            let result = JSON.parse(xhr.response)
            if (result["success"] == true) {
                console.log('User has succesefully added post.')
                closeLoginForm();
             } else {
                 console.warn("Server has failed to add post.");
             }
        }
    }
    let body = `name=${name}&date=${date}&content=${content}&meta_tags=${metaTags}`;
    xhr.send(body);

}


/* Opens the login form. */
function openLoginForm() {
    document.getElementById("loginForm").style.display = "block";
  }

/* Closes the login form. */   
function closeLoginForm() {
    document.getElementById("loginForm").style.display = "none";
} 

/* Opens the add post form. */
function openAddPostForm() {
    document.getElementById("addPostForm").style.display = "block";
  }

/* Closes the add post form. */   
function closeAddPostForm() {
    document.getElementById("addPostForm").style.display = "none";
} 



/* Runs this only when authenticated. */
function allowActions(){
    let addPostAction = document.getElementById('addPost');
    addPostAction.className = 'isAuth';
}