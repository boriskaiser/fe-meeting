const lazyObserver =
  "IntersectionObserver" in window &&
  new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadImage(entry.target);
        }
      });
    },
    {
      rootMargin: `${window.screen.height}px 0px`
    }
  );

const loadImage = imageEl => {
  imageEl.setAttribute("src", imageEl.lazySrc);
  unObserveImage(imageEl);
};

const observeImage = imageEl => {
  if (lazyObserver) {
    lazyObserver.observe(imageEl);
  } else {
    loadImage(imageEl);
  }
};

const unObserveImage = imageEl => {
  if (lazyObserver) {
    lazyObserver.unobserve(imageEl);
  }
};

export default {
  bind(imageEl, binding) {
    imageEl.lazySrc = binding.value;
    observeImage(imageEl);
  },
  unbind(imageEl) {
    unObserveImage(imageEl);
  }
};
