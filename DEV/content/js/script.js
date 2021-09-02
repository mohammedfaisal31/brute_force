const slides = document.querySelectorAll(".slide");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

var index = 0 ;

prev.addEventListener("click",function () {
    prevSlide();
});
next.addEventListener("click", function () {
    nextSlide();
});
function prevSlide(){
    if(index ==0){
        index= slides.length-1;
    }else{
        index--;
    }
    changeslide();
}
function nextSlide(){
    if(index == slides.length-1){
        index=0;
    }else{
        index++;
    }
    changeslide();
}
function changeslide(){
    slides.forEach(function(item){
        item.classList.remove("active");
    });
                            // makes class inactive
    slides[index].classList.add("active");}