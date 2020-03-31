
// When the window loads, get the most recent posts.
window.onload = function() {
    getMostRecentPosts();
}






// Loads the About Info in the content-container
function getAboutInfo(){
    let info = `<h2>About</h2>
    <p>This blog is intended to be about software and software-related things. I believe
    in the KISS principle which stands for Keep It Simple Stupid. 
    I am currently focused on learning frontend technologies and UI/UX design.</p>`

    let element = document.getElementById('content-container');
    element.innerHTML = info;
}

// Loads the first 10 Posts of the blog
function getMostRecentPosts(){
    console.log('DEBUG')
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'posts/recent/0/10');
    xhr.onload = function() {
    if (xhr.status === 200) {
        console.log(xhr.responseText)
        let array = JSON.parse(xhr.responseText)
        console.log(array);
        let info = '';
        for (let row of array) {
            info += `<div class='post'>`
            info += `<h2>${row.name}</h2>`
            info += `${row.content}` 
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