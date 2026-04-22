/* ═══════════════════════════════════════════════════════
   LISTQIK · by Resolution Realty Group
   script.js — All Interactivity
═══════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────────────
   PROPERTY DATA
───────────────────────────────────────────────────── */
const LISTINGS = [
    {
        img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=640&q=80',
        price: '$489,000',
        address: '4812 Maple Grove Dr, Dallas, TX',
        beds: 4, baths: 3, sqft: '2,450', days: 5, badge: 'New',
    },
    {
        img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=640&q=80',
        price: '$712,500',
        address: '1890 Lakeside Blvd, Austin, TX',
        beds: 5, baths: 4, sqft: '3,210', days: 3, badge: 'Hot',
    },
    {
        img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=640&q=80',
        price: '$329,000',
        address: '678 Pine Ridge Ct, Houston, TX',
        beds: 3, baths: 2, sqft: '1,820', days: 12, badge: 'Price Drop',
    },
    {
        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=640&q=80',
        price: '$1,250,000',
        address: '250 Ocean Vista Pkwy, Miami, FL',
        beds: 5, baths: 5, sqft: '4,100', days: 7, badge: 'Luxury',
    },
    {
        img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=640&q=80',
        price: '$395,000',
        address: '9201 Sunset Trail, Orlando, FL',
        beds: 4, baths: 3, sqft: '2,180', days: 9, badge: 'New',
    },
    {
        img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=640&q=80',
        price: '$577,000',
        address: '3345 Heritage Oak Ln, Dallas, TX',
        beds: 4, baths: 3.5, sqft: '2,790', days: 2, badge: 'Hot',
    },
    {
        img: 'https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?w=640&q=80',
        price: '$845,000',
        address: '102 Barton Hills Dr, Austin, TX',
        beds: 5, baths: 4, sqft: '3,560', days: 14, badge: null,
    },
    {
        img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=640&q=80',
        price: '$264,900',
        address: '812 Pecan Grove Rd, Houston, TX',
        beds: 3, baths: 2, sqft: '1,490', days: 21, badge: 'Price Drop',
    },
];
const avatar = document.getElementById('avatarAssistant');
const avatarVideo = document.getElementById('avatarVideo');
const soundBtn = document.getElementById('avatarSoundBtn');

let isSoundOn = false;

avatar.addEventListener('click', () => {
    // toggle sound
    isSoundOn = !isSoundOn;

    if (isSoundOn) {
        avatarVideo.muted = false;
        avatarVideo.volume = 1;
        avatarVideo.play();
        avatar.classList.add('sound-on');
    } else {
        avatarVideo.muted = true;
        avatar.classList.remove('sound-on');
    }
});
soundBtn.addEventListener('click', () => {
    avatarVideo.muted = !avatarVideo.muted;
    soundBtn.textContent = avatarVideo.muted ? '🔊' : '🔇';
});
function avatarSpeak(duration = 2500) {
    if (!avatar) return;

    avatar.classList.add('talking');

    // restart video to simulate speaking reaction
    avatarVideo.currentTime = 0;
    avatarVideo.play();

    setTimeout(() => {
        avatar.classList.remove('talking');
    }, duration);
}
/* ─────────────────────────────────────────────────────
   NAV SCROLL BEHAVIOR
───────────────────────────────────────────────────── */
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ─────────────────────────────────────────────────────
   HAMBURGER MENU
───────────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});
navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
    });
});

/* ─────────────────────────────────────────────────────
   CAROUSEL — Build + Drag/Swipe
───────────────────────────────────────────────────── */
const track = document.getElementById('carouselTrack');
const outer = document.getElementById('carouselOuter');
const dotsWrap = document.getElementById('carouselDots');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');

let carouselIdx = 0;
let carouselAuto = null;
let isDragging = false;
let dragStartX = 0;
let dragCurrentX = 0;
let dragOffset = 0;

function buildCarousel() {
    // Duplicate for infinite feel
    const allListings = [...LISTINGS, ...LISTINGS];
    track.innerHTML = '';

    allListings.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.innerHTML = `
      ${p.badge ? `<span class="property-card__badge">${p.badge}</span>` : ''}
      <span class="property-card__fav" title="Save">♡</span>
      <img class="property-card__img" src="${p.img}" alt="${p.address}" loading="lazy" />
      <div class="property-card__body">
        <div class="property-card__price">${p.price}</div>
        <div class="property-card__addr">📍 ${p.address}</div>
        <div class="property-card__meta">
          <span>🛏 <strong>${p.beds}</strong> bd</span>
          <span>🚿 <strong>${p.baths}</strong> ba</span>
          <span>📐 <strong>${p.sqft}</strong> sqft</span>
        </div>
        <div class="property-card__cta">
          <a href="#" class="view-details-btn">View Details →</a>
          <span class="property-card__days">${p.days}d on market</span>
        </div>
      </div>
    `;

        // Fav toggle
        const fav = card.querySelector('.property-card__fav');
        fav.addEventListener('click', (e) => {
            e.preventDefault();
            fav.textContent = fav.textContent === '♡' ? '♥' : '♡';
            fav.style.color = fav.textContent === '♥' ? '#ef4444' : '';
        });

        track.appendChild(card);
    });

    buildDots();
}

function buildDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i < LISTINGS.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
    }
}

function getCardWidth() {
    const card = track.querySelector('.property-card');
    if (!card) return 340;
    const gap = 20; // 1.25rem
    return card.offsetWidth + gap;
}

function goTo(idx) {
    const total = LISTINGS.length;
    carouselIdx = ((idx % total) + total) % total;
    track.style.transition = 'transform .55s cubic-bezier(.4,0,.2,1)';
    track.style.transform = `translateX(-${carouselIdx * getCardWidth()}px)`;
    updateDots();
}

function updateDots() {
    dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
        d.classList.toggle('active', i === carouselIdx % LISTINGS.length);
    });
}

prevBtn.addEventListener('click', () => { clearAutoplay(); goTo(carouselIdx - 1); startAutoplay(); });
nextBtn.addEventListener('click', () => { clearAutoplay(); goTo(carouselIdx + 1); startAutoplay(); });

function startAutoplay() {
    clearAutoplay();
    carouselAuto = setInterval(() => goTo(carouselIdx + 1), 4000);
}
function clearAutoplay() {
    clearInterval(carouselAuto);
}

outer.addEventListener('mouseenter', clearAutoplay);
outer.addEventListener('mouseleave', startAutoplay);

/* Drag support */
function onDragStart(e) {
    isDragging = true;
    dragStartX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    dragOffset = 0;
    track.style.transition = 'none';
    clearAutoplay();
}
function onDragMove(e) {
    if (!isDragging) return;
    dragCurrentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    dragOffset = dragCurrentX - dragStartX;
    const base = carouselIdx * getCardWidth();
    track.style.transform = `translateX(${-base + dragOffset}px)`;
}
function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    if (dragOffset < -60) goTo(carouselIdx + 1);
    else if (dragOffset > 60) goTo(carouselIdx - 1);
    else goTo(carouselIdx);
    startAutoplay();
}

outer.addEventListener('mousedown', onDragStart);
window.addEventListener('mousemove', onDragMove);
window.addEventListener('mouseup', onDragEnd);
outer.addEventListener('touchstart', onDragStart, { passive: true });
outer.addEventListener('touchmove', onDragMove, { passive: true });
outer.addEventListener('touchend', onDragEnd);

/* ─────────────────────────────────────────────────────
   PRICE RANGE SLIDER
───────────────────────────────────────────────────── */
const priceRange = document.getElementById('priceRange');
const rangeDisplay = document.getElementById('rangeDisplay');

function formatMoney(val) {
    if (val >= 2000000) return '$2M+';
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${Math.round(val / 1000)}K`;
    return `$${val}`;
}

priceRange.addEventListener('input', () => {
    rangeDisplay.textContent = `$0 – ${formatMoney(+priceRange.value)}`;
});

/* ─────────────────────────────────────────────────────
   STEPPER (AVM Calculator)
───────────────────────────────────────────────────── */
const stepperVals = { beds: 3, baths: 2 };

function stepperChange(field, delta) {
    const min = field === 'baths' ? 1 : 1;
    const max = field === 'baths' ? 6 : 10;
    stepperVals[field] = Math.max(min, Math.min(max, stepperVals[field] + delta));
    document.getElementById(`stepper-${field}-val`).textContent = stepperVals[field];
}

/* ─────────────────────────────────────────────────────
   HOME VALUE ESTIMATE CALCULATOR
───────────────────────────────────────────────────── */
const BASE_PRICE_PER_SQFT = {
    single: 200,
    condo: 180,
    townhouse: 190,
    multi: 160,
    land: 40,
};
const LOCATION_MULTIPLIERS = {
    dallas: 1.05,
    austin: 1.25,
    houston: 1.00,
    miami: 1.35,
    orlando: 0.92,
    default: 1.00,
};
const BED_PREMIUM = 12000;
const BATH_PREMIUM = 18000;

function runEstimate() {
    const address = document.getElementById('estAddress').value.trim();
    const sqft = parseFloat(document.getElementById('estSqft').value);
    const type = document.getElementById('estType').value;

    if (!address || !sqft || !type) {
        shakeEl(document.getElementById('estimateBtn'));
        highlightEmpty([
            { el: document.getElementById('estAddress'), val: address },
            { el: document.getElementById('estSqft'), val: sqft },
            { el: document.getElementById('estType'), val: type },
        ]);
        return;
    }

    const btn = document.getElementById('estimateBtn');
    const btnText = btn.querySelector('.btn-text');
    const btnLoad = btn.querySelector('.btn-loader');
    btnText.style.display = 'none';
    btnLoad.style.display = 'flex';
    btn.disabled = true;

    setTimeout(() => {
        const ppsf = BASE_PRICE_PER_SQFT[type] || 180;
        const locKey = Object.keys(LOCATION_MULTIPLIERS).find(k =>
            address.toLowerCase().includes(k)) || 'default';
        const locMult = LOCATION_MULTIPLIERS[locKey];
        const beds = stepperVals.beds;
        const baths = stepperVals.baths;

        const base = sqft * ppsf * locMult;
        const midVal = Math.round(base + beds * BED_PREMIUM + baths * BATH_PREMIUM);
        const variance = midVal * 0.08;
        const lowVal = Math.round(midVal - variance);
        const highVal = Math.round(midVal + variance);

        const confidence = locKey !== 'default' ? 88 : 74;

        // Restore button
        btnText.style.display = '';
        btnLoad.style.display = 'none';
        btn.disabled = false;

        showResult({ midVal, lowVal, highVal, confidence, locKey, sqft, beds, baths });
    }, 1600);
}

function showResult({ midVal, lowVal, highVal, confidence, locKey, sqft, beds, baths }) {
    const placeholder = document.getElementById('resultPlaceholder');
    const resultData = document.getElementById('resultData');

    placeholder.style.display = 'none';
    resultData.style.display = 'block';

    // Animate numbers
    animateNumber(document.getElementById('resultMid'), midVal, '$', true);
    animateNumber(document.getElementById('resultLow'), lowVal, '$', true);
    animateNumber(document.getElementById('resultHigh'), highVal, '$', true);

    // Confidence bar
    const fill = document.getElementById('confidenceFill');
    const confText = document.getElementById('confidenceText');
    setTimeout(() => {
        fill.style.width = confidence + '%';
        confText.textContent = confidence >= 85 ? 'High' : confidence >= 70 ? 'Medium' : 'Fair';
    }, 100);

    // Insights
    const mktTrend = locKey === 'austin' || locKey === 'miami'
        ? '📈 Strong seller\'s market' : '📊 Balanced market';
    const compCount = Math.floor(Math.random() * 15 + 8);
    const avgDays = locKey === 'austin' ? 12 : locKey === 'miami' ? 10 : 18;

    document.getElementById('insightMarket').textContent = mktTrend;
    document.getElementById('insightComps').textContent = `Based on ${compCount} nearby comps`;
    document.getElementById('insightDays').textContent = `Avg ${avgDays} days to receive offer`;
}

function animateNumber(el, target, prefix = '', isCurrency = false) {
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
        const t = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        const cur = Math.round(ease * target);
        el.textContent = prefix + (isCurrency ? cur.toLocaleString() : cur);
        if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

function highlightEmpty(fields) {
    fields.forEach(({ el, val }) => {
        if (!val) {
            el.style.borderColor = '#ef4444';
            el.addEventListener('input', () => { el.style.borderColor = ''; }, { once: true });
        }
    });
}

function shakeEl(el) {
    el.style.animation = 'none';
    el.offsetHeight; // reflow
    el.style.animation = 'shake .35s ease';
    el.addEventListener('animationend', () => { el.style.animation = ''; }, { once: true });
}

/* CSS for shake — injected once */
(function injectShakeCSS() {
    const style = document.createElement('style');
    style.textContent = `
    @keyframes shake {
      0%,100% { transform: translateX(0); }
      20%      { transform: translateX(-6px); }
      40%      { transform: translateX(6px); }
      60%      { transform: translateX(-4px); }
      80%      { transform: translateX(4px); }
    }
  `;
    document.head.appendChild(style);
})();

/* ─────────────────────────────────────────────────────
   TESTIMONIAL CAROUSEL
───────────────────────────────────────────────────── */
const tTrack = document.getElementById('testimonialTrack');
const tDots = document.getElementById('tDots');
let tIdx = 0;
let tAuto = null;

function buildTestimonialDots() {
    const cards = tTrack.querySelectorAll('.testimonial-card');
    tDots.innerHTML = '';
    cards.forEach((_, i) => {
        const d = document.createElement('div');
        d.className = 't-dot' + (i === 0 ? ' active' : '');
        d.addEventListener('click', () => tGoTo(i));
        tDots.appendChild(d);
    });
}

function tGoTo(idx) {
    const cards = tTrack.querySelectorAll('.testimonial-card');
    tIdx = ((idx % cards.length) + cards.length) % cards.length;
    tTrack.style.transform = `translateX(-${tIdx * 100}%)`;
    tDots.querySelectorAll('.t-dot').forEach((d, i) => d.classList.toggle('active', i === tIdx));
}

function testimonialNav(dir) {
    tGoTo(tIdx + dir);
}

function startTestimonialAuto() {
    tAuto = setInterval(() => tGoTo(tIdx + 1), 5500);
}

/* ─────────────────────────────────────────────────────
   COUNTER ANIMATION (Stats)
───────────────────────────────────────────────────── */
function startCounters() {
    document.querySelectorAll('.trust-stat__num').forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        animateCounter(el, target);
    });
}

function animateCounter(el, target) {
    const duration = 1800;
    const start = performance.now();

    function tick(now) {
        const t = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        const cur = Math.round(ease * target);
        el.textContent = cur.toLocaleString();
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(tick);
}

/* ─────────────────────────────────────────────────────
   SEARCH TRIGGER
───────────────────────────────────────────────────── */
function triggerSearch() {
    const loc = document.getElementById('heroLocation').value.trim();
    const type = document.getElementById('heroType').value;
    const price = document.getElementById('heroPrice').value;

    // Scroll to listings
    document.getElementById('listings').scrollIntoView({ behavior: 'smooth', block: 'start' });

    // If location given, update filter bar
    if (loc) document.getElementById('filterLocation').value = loc;
    if (type) document.getElementById('filterType').value = type;
}

function applyFilters() {
    // Scroll to listings with visual feedback
    document.getElementById('listings').scrollIntoView({ behavior: 'smooth', block: 'start' });

    const btn = document.querySelector('.filter-btn');
    const origText = btn.textContent;
    btn.textContent = 'Filtering…';
    btn.disabled = true;
    setTimeout(() => {
        btn.textContent = '✓ Applied';
        setTimeout(() => {
            btn.textContent = origText;
            btn.disabled = false;
        }, 1200);
    }, 700);
}

/* ─────────────────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────────────────── */
function initReveal() {
    const revealEls = [
        ...document.querySelectorAll('.how-step'),
        ...document.querySelectorAll('.why-card'),
        ...document.querySelectorAll('.trust-stat'),
        ...document.querySelectorAll('.location-card'),
        ...document.querySelectorAll('.list-cta__inner > *'),
    ];

    revealEls.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
}

/* Counter observer */
function initCounterObserver() {
    const trustSection = document.getElementById('trust');
    if (!trustSection) return;

    let triggered = false;
    const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !triggered) {
            triggered = true;
            startCounters();
            obs.disconnect();
        }
    }, { threshold: 0.3 });
    obs.observe(trustSection);
}

/* ─────────────────────────────────────────────────────
   PARTICLE EFFECT (Hero)
───────────────────────────────────────────────────── */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 24; i++) {
        const p = document.createElement('div');
        const size = Math.random() * 4 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const dur = Math.random() * 12 + 8;
        const del = Math.random() * 6;

        p.style.cssText = `
      position:absolute;
      width:${size}px;
      height:${size}px;
      left:${x}%;
      top:${y}%;
      background:rgba(255,255,255,${Math.random() * 0.15 + 0.04});
      border-radius:50%;
      animation:floatParticle ${dur}s ${del}s ease-in-out infinite alternate;
      pointer-events:none;
    `;
        container.appendChild(p);
    }

    const style = document.createElement('style');
    style.textContent = `
    @keyframes floatParticle {
      0%   { transform: translate(0, 0) scale(1); opacity: .4; }
      50%  { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) scale(1.3); opacity: .8; }
      100% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) scale(.8); opacity: .2; }
    }
  `;
    document.head.appendChild(style);
}

/* ─────────────────────────────────────────────────────
   SMOOTH ANCHOR SCROLL (override)
───────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const id = a.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (target) {
            e.preventDefault();
            const offset = nav.offsetHeight + 10;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

/* ─────────────────────────────────────────────────────
   INIT
───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    buildCarousel();
    buildTestimonialDots();
    initReveal();
    initCounterObserver();
    initParticles();
    startAutoplay();
    startTestimonialAuto();
});
