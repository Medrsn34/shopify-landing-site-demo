(function () {
  document.querySelectorAll('[data-section-id]').forEach(initSection);

  function initSection(root) {
    var form = root.querySelector('#pl-product-form') || document.getElementById('pl-product-form');
    if (!form) return;

    var variantInput = document.getElementById('pl-variant-id');
    var priceEl = document.getElementById('pl-price');
    var ctaBtn = form.querySelector('.pl-cta');
    var cards = document.querySelectorAll('.pl-bundle-card');

    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        cards.forEach(function (c) { c.classList.remove('selected'); });
        card.classList.add('selected');
        card.querySelector('input').checked = true;

        var variantId = card.getAttribute('data-variant-id');
        var price = card.getAttribute('data-price');
        if (variantInput) variantInput.value = variantId;
        if (priceEl && price) priceEl.textContent = formatMoney(price);
        if (ctaBtn) ctaBtn.textContent = 'Add to cart — ' + formatMoney(price);
      });
    });

    // Sticky add-to-cart bar, tied to this section leaving the viewport.
    var stickyBar = document.getElementById('pl-sticky-bar');
    var hero = root.querySelector('.pl-hero');
    if (stickyBar && hero && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        var entry = entries[0];
        stickyBar.classList.toggle('show', !entry.isIntersecting && entry.boundingClientRect.top < 0);
      }, { threshold: 0 });
      io.observe(hero);
    }

    var stickyAdd = document.getElementById('pl-sticky-add');
    if (stickyAdd) {
      stickyAdd.addEventListener('click', function () {
        form.requestSubmit ? form.requestSubmit() : form.submit();
      });
    }

    // AJAX add-to-cart via the Shopify Cart API, so the page never has to
    // reload. Falls back to a normal form submit if the fetch fails.
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var formData = new FormData(form);

      fetch('/cart/add.js', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })
        .then(function (res) {
          if (!res.ok) throw new Error('Add to cart failed');
          return res.json();
        })
        .then(function () {
          document.dispatchEvent(new CustomEvent('cart:updated'));
          if (ctaBtn) {
            var original = ctaBtn.textContent;
            ctaBtn.textContent = 'Added ✓';
            setTimeout(function () { ctaBtn.textContent = original; }, 1500);
          }
        })
        .catch(function () {
          form.submit();
        });
    });
  }

  // Minimal money formatter for the client-side price swap. The initial
  // render always uses Shopify's own `money` filter server-side; this only
  // keeps the number consistent after a variant switch.
  function formatMoney(amount) {
    var value = parseFloat(amount);
    if (isNaN(value)) return amount;
    return '$' + value.toFixed(2);
  }
})();
