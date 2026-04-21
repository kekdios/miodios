(function () {
  "use strict";

  var modal = document.getElementById("qr-modal");
  var modalTitle = document.getElementById("qr-modal-title");
  var modalImg = document.getElementById("qr-modal-img");
  var modalAddress = document.getElementById("qr-modal-address");
  var backdrop = modal && modal.querySelector(".modal-backdrop");
  var closeBtn = modal && modal.querySelector(".modal-close");

  function qrUrl(data) {
    return (
      "https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=" +
      encodeURIComponent(data)
    );
  }

  function openModal(title, address) {
    if (!modal || !modalTitle || !modalImg || !modalAddress) return;
    modalTitle.textContent = title;
    modalImg.src = qrUrl(address);
    modalImg.alt = "QR code for " + title;
    modalAddress.textContent = address;
    modal.classList.add("is-open");
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    if (modalImg) modalImg.src = "";
  }

  document.querySelectorAll("[data-qr-open]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var title = btn.getAttribute("data-qr-title") || "Donation address";
      var address = btn.getAttribute("data-address") || "";
      openModal(title, address);
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
