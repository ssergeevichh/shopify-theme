document.addEventListener('DOMContentLoaded', function () {
    // Initialize thumbnails slider
    const thumbsSwiper = new Swiper('.product-gallery-thumbs', {
      slidesPerView: 6,
    });

    // Initialize main slider
    const mainSwiper = new Swiper('.product-gallery-swiper', {
      spaceBetween: 10,
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: thumbsSwiper
      }
    });
  });
  