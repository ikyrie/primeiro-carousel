export class Carousel {
    constructor(nav, next, previous, track) {
        this.nav = document.querySelector(nav)
        this.track = document.querySelector(track)
        this.next = document.querySelector(next)
        this.previous = document.querySelector(previous)
        
        this.navDots = this.getDotList()
        this.slides = this.getSlideList()
        this.slideSize = this.getSlideWidth()
        this.currentSlide = this.getCurrentSlide()

        this.currentIndex = 0
        
        this.next.addEventListener('click', this.nextSlide.bind(this))
        this.previous.addEventListener('click', this.previousSlide.bind(this))
        this.nav.addEventListener('click', this.navigateToSlide.bind(this))

        this.prepareSlides()
    }

    getSlideWidth() {
        return this.slides[0].getBoundingClientRect().width
    }

    getSlideList() {
        return Array.from(this.track.children)
    }

    getDotList() {
        return Array.from(this.nav.children)
    }

    prepareSlides() {
        this.slides.forEach((slide, i) => {
            slide.style.left = this.slideSize * i + 'px'
        })
    }


    scrollToSlide(targetSlide) {
        this.track.style.transform = 'translateX(-' + targetSlide.style.left +')'
    }
    
    updateIndicators(currentIndicator, targetDot) {
        currentIndicator.classList.remove('carousel__indicator--active')
        targetDot.classList.add('carousel__indicator--active')
    }
    
    getCurrentSlide() {
        return this.slides[this.currentIndex]
    }
    
    getCurrentInidicator() {
        return this.navDots[this.currentIndex]
    }

    nextSlide() {
        const nextIndex = this.currentIndex + 1
        this.goToSlide(nextIndex)
    }

    goToSlide(index) {
        const currentIndicator = this.getCurrentInidicator()
        this.currentIndex = index
        this.currentIndex = this.currentIndex % this.slides.length
        const nextSlide = this.getCurrentSlide()
        const nextIndicator = this.getCurrentInidicator()

        this.scrollToSlide(nextSlide)
        this.updateIndicators(currentIndicator, nextIndicator)
    }

    previousSlide() {
        let previousIndex = this.currentIndex - 1
        if(previousIndex < 0) {
            previousIndex = this.slideSize - 1
        }
        this.goToSlide(previousIndex)
    }

    navigateToSlide(event) {
        if(event.target === event.currentTarget) return
        const targetDot = event.target.getAttribute('data-indicator')
        this.goToSlide(targetDot)
    }
}
