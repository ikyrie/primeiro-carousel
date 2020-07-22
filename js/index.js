import { Carousel } from "./carousel.js";

const nav = '[data-carousel-nav]'
const next = '[data-next]'
const previous = '[data-previous]'
const track = '[data-carousel-track]'

new Carousel(nav, next, previous, track)
