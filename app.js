/*=============== CORE NAV & SCROLL FUNCTIONS ===============*/
const navMenu = document.getElementById('navMenu'),
      navToggle = document.getElementById('navToggle');

// Show Menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
    });
}

// Remove Menu on Link Click
const navLinks = document.querySelectorAll('.nav__link');
function linkAction() {
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));

// Change Header on Scroll
function scrollHeader() {
    const navContainer = document.querySelector('.nav.container');
    if (this.scrollY >= 80) {
        navContainer.classList.add('scroll-header');
    } else {
        navContainer.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);


// Show Scroll Up Button
function scrollUp() {
    const scrollUpButton = document.getElementById('scroll-up');
    if (this.scrollY >= 350) scrollUpButton.classList.add('show-scroll');
    else scrollUpButton.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

// Active Link on Scroll
const sections = document.querySelectorAll('section[id]');
function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav__menu a.active-link').classList.remove('active-link');
                navLink.classList.add('active-link');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);


/*=============== NEW: ANIMATED COUNTERS ===============*/
const counters = document.querySelectorAll('.about__info-title');
const speed = 200;

const startCounter = (counter) => {
    const goal = +counter.getAttribute('data-goal');
    const isDecimal = goal % 1 !== 0;

    const updateCount = () => {
        const count = +counter.innerText.replace('+', '');
        const increment = goal / speed;

        if (count < goal) {
            let newValue = count + increment;
            if (isDecimal) {
                counter.innerText = newValue.toFixed(2);
            } else {
                counter.innerText = Math.ceil(newValue);
            }
            setTimeout(updateCount, 1);
        } else {
            counter.innerText = isDecimal ? goal.toFixed(2) : (goal === 4 ? '4+' : goal);
        }
    };
    updateCount();
};

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.9 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

/*=============== NEW: CUSTOM CURSOR ===============*/
const cursor = document.querySelector('.custom-cursor');
const linksAndButtons = document.querySelectorAll('a, button');
let scrollY = window.scrollY;

window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
});

document.addEventListener('mousemove', e => {
    cursor.setAttribute("style", "top: "+(e.pageY - scrollY)+"px; left: "+e.pageX+"px;")
});

linksAndButtons.forEach(el => {
    el.addEventListener('mouseover', () => {
        cursor.classList.add('pointer');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('pointer');
    });
});

/*=============== NEW: STAGGERED SCROLL ANIMATIONS ===============*/
const animatedElements = document.querySelectorAll('.animate-on-scroll');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, { threshold: 0.1 });

animatedElements.forEach((el, index) => {
    el.style.transitionDelay = `${index * 100}ms`;
    scrollObserver.observe(el);
});
