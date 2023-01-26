
function done() {
    const btn = document.querySelector('.new');

    const status = document.querySelector('.new').innerText;

    if (status === 'In progress') {
    document.querySelector('.new').innerText = 'Done';
    btn.addEventListener('click', done);

} else {
    document.querySelector('.new').innerText = 'In progress';
    btn.addEventListener('click', done);

}
    if (status === 'Done') {
    document.querySelector('.new').innerText = 'Done';
    btn.addEventListener('mouseover', function () {
    alert('All your task are done')
})
}
}

// var modal = document.getElementById("myModal");
//
//     // Get the image and insert it inside the modal - use its "alt" text as a caption
// var img = document.getElementById('myImg');
// var modalImg = document.getElementById("img01");
// var captionText = document.getElementById("caption");
// img.onclick = function(){
//     modal.style.display = "block";
//     modalImg.src = this.src;
//     captionText.innerHTML = this.alt;
// }

function myModal(id) {
    const modal = document.getElementById("myModal");
    const img = document.getElementById(id);
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");
    const span = document.getElementsByClassName("close")[0];

    img.addEventListener('click', function () {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    });
    span.addEventListener('click', function () {
        modal.style.display = "none";
    })
}

    // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];
//
//     // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//             modal.style.display = "none";
// }

