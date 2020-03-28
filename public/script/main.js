// Loads the About Info in the content-container
function getAboutInfo(){
    let info = `<h2>About</h2>
    <p>This blog is intended to be about software and software-related things. I believe
    in the KISS principle which stands for Keep It Simple Stupid. 
    I am currently focused on learning frontend technologies and UI/UX design.</p>`

    let element = document.getElementById('content-container');
    element.innerHTML = info;
}

// Loads the Posts of the blog
function getPosts(){
    // TODO add AJAX to get posts from database
    let info = '';
    let element = document.getElementById('content-container');
    element.innerHTML = info;
}