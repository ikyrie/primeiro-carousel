const track = document.querySelector('.carousel__pictures')
let slides = Array.from(track.children)
const navigation = document.querySelector('.carousel__nav')
let navDots = Array.from(navigation.children)
const slideSize = slides[0].getBoundingClientRect().width
const next = document.querySelector('.js-carousel-next')
const previous = document.querySelector('.js-carousel-previous')

for (let i = 0; i < slides.length; i++) {
    slides[i].style.left = slideSize * i + 'px';
}

function goToSlide(track, currentSlide, targetSlide) {
    track.style.transform = 'translateX(-' + targetSlide.style.left +')'
    currentSlide.classList.remove('js-active-slide')
    targetSlide.classList.add('js-active-slide')
}

function updateIndicators(currentIndicator, targetDot) {
    currentIndicator.classList.remove('carousel__indicator--active','js-active-slide')
    targetDot.classList.add('carousel__indicator--active','js-active-slide')
}

function getCurrentSlide() {
    return track.querySelector('.js-active-slide')
}

function getCurrentInidicator() {
    return navigation.querySelector('.js-active-slide')
}

next.addEventListener('click', e => {
    let currentSlide = getCurrentSlide()
    let nextSlide = currentSlide.nextElementSibling
    let currentIndicator = getCurrentInidicator()
    let targetDot = currentIndicator.nextElementSibling

    if(!nextSlide) return

    goToSlide(track, currentSlide, nextSlide)
    updateIndicators(currentIndicator, targetDot)
})

previous.addEventListener('click', e => {
    let currentSlide = getCurrentSlide()
    let previousSlide = currentSlide.previousElementSibling
    let currentIndicator = getCurrentInidicator()
    let targetDot = currentIndicator.previousElementSibling

    if(!previousSlide) return

    goToSlide(track, currentSlide, previousSlide)
    updateIndicators(currentIndicator, targetDot)
})

navigation.addEventListener('click', e => {
    let targetDot = e.target.closest('.carousel__indicator')
    if(targetDot !== null) {
        let currentSlide = getCurrentSlide()
        let currentIndicator = getCurrentInidicator()
        let targetIndex = navDots.findIndex(dot => dot === targetDot)
        let targetSlide = slides[targetIndex]

        goToSlide(track, currentSlide, targetSlide)
        updateIndicators(currentIndicator, targetDot)
    }
    return
})
