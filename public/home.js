
function done(id) {
    const btn = document.getElementById(id);

    const status = document.getElementById(id).innerText

    if (status === 'In progress') {
    document.getElementById(id).innerText = 'Done';
    btn.addEventListener('click', done);

} else {
    document.getElementById(id).innerText = 'In progress';
    btn.addEventListener('click', done);

}
    if (status === 'Done') {
    document.getElementById(id).innerText = 'Done';
    btn.addEventListener('mouseover', function (id) {
    alert('All your task are done')
})
}
}

var modal = document.getElementById("myModal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById('myImg');
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
}

    // Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
span.onclick = function() {
            modal.style.display = "none";
}

