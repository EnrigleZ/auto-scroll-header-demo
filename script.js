const content = document.querySelector("content");
const header = document.querySelector("header");
const body = document.querySelector("body");

function throttle(func, delay) {
  if (delay <= 0) return func;
  let lastTime = false;
  return function() {
    if (lastTime) return;
    lastTime = true;
    setTimeout(() => {
      lastTime = false;
    }, delay);
    func.apply(this, arguments);
  };
}

function onscroll(e) {
  const percentage =
    (content.scrollTop / (content.scrollHeight - content.clientHeight)) *
    100 *
    (content.clientHeight / (content.clientHeight + header.clientHeight));
  const offset = Number.prototype.toString.call(percentage).substr(0, 6) + "%";
  body.style.backgroundPositionY = offset;
}

content.onscroll = throttle(onscroll, 0);

var intersectionObserver = new IntersectionObserver(function(
  entries,
  observer
) {
  entries.forEach(entry => {
    // for each to find the current intersected marks.
    if (entry.isIntersecting) {
      entry.target.classList.add("extended");

      // only observed once.
      observer.unobserve(entry.target);
    }
  });
});
// start observing

function markOnClick() {
  const classList = this.classList;
  if (classList.contains("invalid")) {
    classList.remove("invalid");
  } else {
    classList.add("invalid");
  }
}

const marks = document.querySelectorAll("mark");
marks.forEach(mark => {
  intersectionObserver.observe(mark);
  mark.onclick = markOnClick;
});

document.querySelector("body").ondblclick = e => {
  e.preventDefault();
  marks.forEach(mark => {
    mark.classList.remove("invalid");
  });
};
