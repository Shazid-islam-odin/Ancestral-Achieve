const events = [
  {
    year: "1905",
    title: "Village established",
    full: "The first permanent settlements were recorded by the district census. Families from three surrounding areas gathered around the central pond.",
    icon: "&#127968;",
    tags: ["community", "founding", "infrastructure"]
  },
  {
    year: "1932",
    title: "First school",
    full: "The community built its first school with bamboo walls and a tin roof. Classes were held in two shifts to accommodate all children.",
    icon: "&#127979;",
    tags: ["education", "1930s", "community"]
  },
  {
    year: "1955",
    title: "The great flood",
    full: "Monsoon flooding submerged the lower fields for eleven weeks. Elder testimonies describe rebuilding boats from market timber.",
    icon: "&#127754;",
    tags: ["flooding", "nature", "infrastructure"]
  },
  {
    year: "1963",
    title: "Marketplace built",
    full: "The central wooden bazaar was raised by communal effort. It would remain the social heart of the village for over two decades.",
    icon: "&#127979;",
    tags: ["marketplace", "daily life", "infrastructure"]
  },
  {
    year: "1971",
    title: "Liberation war",
    full: "Village men joined the resistance. Oral histories recall hiding places, food sharing across families, and the long wait for news.",
    icon: "&#127988;",
    tags: ["history", "1971", "community"]
  },
  {
    year: "1985",
    title: "New bridge opened",
    full: "The original wooden bridge was replaced with a concrete structure. Many elders wept for the old bridge, which they said had its own sound in rain.",
    icon: "&#127313;",
    tags: ["infrastructure", "change", "landmarks"]
  },
  {
    year: "1994",
    title: "Electricity arrives",
    full: "The first electrical lines reached the village. Children remember watching their first television in the headmaster's house.",
    icon: "&#128161;",
    tags: ["infrastructure", "modernity", "daily life"]
  },
  {
    year: "2010",
    title: "Archive founded",
    full: "A group of young villagers began collecting old photographs and recording elders' stories before too many were lost to time.",
    icon: "&#128218;",
    tags: ["archive", "heritage", "community"]
  },
  {
    year: "2024",
    title: "This platform",
    full: "The Ancestral Archive went online, making the full collection accessible to anyone from the village — wherever in the world they live.",
    icon: "&#127760;",
    tags: ["digital", "archive", "present"]
  }
];

const container = document.getElementById('timeline-events');
const detailEl = document.getElementById('event-detail');
let activeIndex = null;

function showDetail(index) {
  const ev = events[index];

  if (activeIndex !== null) {
    container.children[activeIndex].classList.remove('active');
  }

  container.children[index].classList.add('active');
  activeIndex = index;

  detailEl.style.opacity = '0';

  setTimeout(() => {
    detailEl.innerHTML = '<div class="event-detail-icon">' + ev.icon + '</div>'
      + '<div class="event-detail-content">'
      + '<p class="event-detail-year">' + ev.year + '</p>'
      + '<h2 class="event-detail-title">' + ev.title + '</h2>'
      + '<p class="event-detail-desc">' + ev.full + '</p>'
      + '<div class="event-detail-tags">'
      + ev.tags.map(t => '<span class="event-tag">' + t + '</span>').join('')
      + '</div>'
      + '</div>';

    detailEl.style.opacity = '1';
  }, 120);
}

events.forEach((ev, i) => {
  const el = document.createElement('div');
  el.className = 'timeline-event';
  el.setAttribute('tabindex', '0');
  el.setAttribute('role', 'button');
  el.setAttribute('aria-label', ev.year + ': ' + ev.title);

  el.innerHTML = '<span class="event-label">' + ev.year + '</span>'
    + '<span class="event-dot"></span>'
    + '<span class="event-title-short">' + ev.title + '</span>';

  el.addEventListener('click', () => showDetail(i));
  el.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') showDetail(i);
  });

  container.appendChild(el);
});

const scrollWrapper = document.querySelector('.timeline-scroll-wrapper');
let isDragging = false;
let startX = 0;
let scrollLeft = 0;

scrollWrapper.addEventListener('mousedown', e => {
  isDragging = true;
  startX = e.pageX - scrollWrapper.offsetLeft;
  scrollLeft = scrollWrapper.scrollLeft;
});

scrollWrapper.addEventListener('mousemove', e => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - scrollWrapper.offsetLeft;
  scrollWrapper.scrollLeft = scrollLeft - (x - startX);
});

scrollWrapper.addEventListener('mouseup', () => { isDragging = false; });
scrollWrapper.addEventListener('mouseleave', () => { isDragging = false; });
