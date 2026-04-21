(function () {
  "use strict";

  var modal = document.getElementById("qr-modal");
  var modalTitle = document.getElementById("qr-modal-title");
  var modalImg = document.getElementById("qr-modal-img");
  var modalAddress = document.getElementById("qr-modal-address");
  var backdrop = modal && modal.querySelector(".modal-backdrop");
  var closeBtn = modal && modal.querySelector(".modal-close");
  var modalBox = modal && modal.querySelector(".modal-box");

  var triggerElement = null;
  var trapHandler = null;

  function qrUrl(data) {
    return (
      "https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=" +
      encodeURIComponent(data)
    );
  }

  function getFocusableElements() {
    if (!modalBox) return [];
    var sel =
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.prototype.slice.call(modalBox.querySelectorAll(sel)).filter(function (el) {
      return el.offsetWidth > 0 || el.offsetHeight > 0 || el === closeBtn;
    });
  }

  function onTrapKeydown(e) {
    if (!modal || !modal.classList.contains("is-open") || e.key !== "Tab") return;
    var focusables = getFocusableElements();
    if (focusables.length === 0) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function openModal(title, address, opener) {
    if (!modal || !modalTitle || !modalImg || !modalAddress) return;
    triggerElement = opener || null;
    modalTitle.textContent = title;
    modalImg.src = qrUrl(address);
    modalImg.alt = "QR code for " + title + " wallet address";
    modalAddress.textContent = address;
    modal.classList.add("is-open");
    document.body.classList.add("modal-open");

    trapHandler = onTrapKeydown;
    document.addEventListener("keydown", trapHandler, true);

    window.requestAnimationFrame(function () {
      if (closeBtn) closeBtn.focus();
    });
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    if (modalImg) modalImg.src = "";
    if (modalImg) modalImg.alt = "";

    if (trapHandler) {
      document.removeEventListener("keydown", trapHandler, true);
      trapHandler = null;
    }

    var toFocus = triggerElement;
    triggerElement = null;
    if (toFocus && typeof toFocus.focus === "function") {
      window.requestAnimationFrame(function () {
        toFocus.focus();
      });
    }
  }

  document.querySelectorAll("[data-qr-open]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var title = btn.getAttribute("data-qr-title") || "Donation";
      var address = btn.getAttribute("data-address") || "";
      openModal(title, address, btn);
    });
  });

  if (backdrop) backdrop.addEventListener("click", closeModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy") || "";
      function done(ok) {
        var prev = btn.textContent;
        btn.textContent = ok ? "Copied!" : "Copy failed";
        btn.classList.toggle("copied", ok);
        setTimeout(function () {
          btn.textContent = prev;
          btn.classList.remove("copied");
        }, 2000);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () {
            done(true);
          },
          function () {
            done(false);
          },
        );
      } else {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
          done(true);
        } catch (err) {
          done(false);
        }
        document.body.removeChild(ta);
      }
    });
  });
})();
