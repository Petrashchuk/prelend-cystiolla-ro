// ─── CONFIG ────────────────────────────────────────────────────────────────
const OFFER_URL   = '${OFFER_URL}';
const _up         = new URLSearchParams(window.location.search);
const FB_PIXEL_ID = _up.get('pixel') || '${FB_PIXEL_ID}';

// ─── COOKIE CONSENT ────────────────────────────────────────────────────────
(function () {
  var bar = document.getElementById('cookieBar');
  var btn = document.getElementById('cookieAcceptBtn');
  if (!bar) return;
  if (localStorage.getItem('ck_ok')) {
    bar.style.display = 'none';
  } else if (btn) {
    btn.addEventListener('click', function () {
      localStorage.setItem('ck_ok', '1');
      bar.style.display = 'none';
    });
  }
}());

// ─── PIXEL ─────────────────────────────────────────────────────────────────
(function(f,b,e,v,n,t,s){
  if(f.fbq) return;
  n=f.fbq=function(){n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments)};
  if(!f._fbq) f._fbq=n;
  n.push=n; n.loaded=!0; n.version='2.0';
  n.queue=[];
  t=b.createElement(e); t.async=!0;
  t.src=v; s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s);
}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js'));

fbq('init', FB_PIXEL_ID);
fbq('track', 'PageView');

// ─── CTA LINKS ──────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {

  // Підставити посилання у всі CTA
  document.querySelectorAll('.cta-btn, [data-cta]').forEach(function (el) {
    el.href = OFFER_URL;
    el.addEventListener('click', function () {
      fbq('track', 'ViewContent', { content_name: 'Cystiolla RO Prelander' });
    });
  });

  // ─── STICKY CTA ─────────────────────────────────────────────────────────
  var stickyCta = document.getElementById('stickyCta');
  var firstCta = document.getElementById('firstCta');

  if (stickyCta && firstCta) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          stickyCta.classList.add('visible');
        } else {
          stickyCta.classList.remove('visible');
        }
      });
    }, { threshold: 0 });
    observer.observe(firstCta);
  }

  // ─── BACK BUTTON INTERCEPT (mobile exit-intent) ──────────────────────────
  history.pushState(null, '', location.href);
  window.addEventListener('popstate', function () {
    if (confirm('Ești sigur că vrei să pleci?\n\nOferta specială pentru Cystiolla este disponibilă doar astăzi!')) {
      history.back();
    } else {
      history.pushState(null, '', location.href);
    }
  });

  // ─── COMMENTS LOAD MORE ─────────────────────────────────────────────────
  var hiddenComments = document.querySelectorAll('.comment.hidden');
  var loadMoreBtn = document.getElementById('loadMoreBtn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function () {
      hiddenComments.forEach(function (c) { c.classList.remove('hidden'); });
      loadMoreBtn.style.display = 'none';
    });
  }

  // ─── ANIMATE ON SCROLL ──────────────────────────────────────────────────
  var animEls = document.querySelectorAll('.anim');
  if ('IntersectionObserver' in window) {
    var anim = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    animEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
      anim.observe(el);
    });
  }
});
