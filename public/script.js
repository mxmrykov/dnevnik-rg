
let slideIndex = 1;
showSlides(slideIndex);
function nextSlide() {
    showSlides(slideIndex += 1);
}
function previousSlide() {
    showSlides(slideIndex -= 1);
}
document.getElementById('next').onclick = function () {
    nextSlide()
}
document.getElementById('previous').onclick = function () {
    previousSlide()
}
function showSlides(n) {
    let slides = document.getElementsByClassName("item");
    if (n > slides.length) slideIndex = 1
    if (n < 1) slideIndex = slides.length
    for (let slide of slides) {
        slide.style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

let slideIndex_1 = 1;
showSlides_(slideIndex_1);
function nextSlide_() {
    showSlides_(slideIndex_1 += 1);
}
function previousSlide_() {
    showSlides_(slideIndex_1 -= 1);
}
document.getElementById('next_1').onclick = function () {
    nextSlide_()
}
document.getElementById('previous_1').onclick = function () {
    previousSlide_()
}
function showSlides_(n) {
    let slides_ = document.getElementsByClassName("item_1");
    if (n > slides_.length) slideIndex_1 = 1
    if (n < 1) slideIndex_1 = slides_.length
    for (let slide of slides_) {
        slide.style.display = "none";
    }
    slides_[slideIndex_1 - 1].style.display = "block";
}

let slideIndex_2 = 1;
showSlides__(slideIndex_2);
function nextSlide__() {
    showSlides__(slideIndex_2 += 1);
}
function previousSlide__() {
    showSlides__(slideIndex_2 -= 1);
}
document.getElementById('next_2').onclick = function () {
    nextSlide__()
}
document.getElementById('previous_2').onclick = function () {
    previousSlide__()
}
function showSlides__(n) {
    let slides__ = document.getElementsByClassName("item_2");
    if (n > slides__.length) slideIndex_2 = 1
    if (n < 1) slideIndex_2 = slides__.length
    for (let slide of slides__) {
        slide.style.display = "none";
    }
    slides__[slideIndex_2 - 1].style.display = "block";
}
//
// let slideIndex_3 = 1;
// showSlides___(slideIndex_3);
// function nextSlide___() {
//     showSlides___(slideIndex_3 += 1);
// }
// function previousSlide___() {
//     showSlides___(slideIndex_3 -= 1);
// }
// document.getElementById('next_3').onclick = function () {
//     nextSlide___()
// }
// document.getElementById('previous_3').onclick = function () {
//     previousSlide___()
// }
// function showSlides___(n) {
//     let slides__ = document.getElementsByClassName("item_3");
//     if (n > slides__.length) slideIndex_3 = 1
//     if (n < 1) slideIndex_3 = slides__.length
//     for (let slide of slides__) {
//         slide.style.display = "none";
//     }
//     slides__[slideIndex_3 - 1].style.display = "block";
// }