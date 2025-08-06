document.addEventListener("DOMContentLoaded", () => {
  $(document).ready(function () {

    // Кнопка отправки
    $('[data-submit]').on('click', function (e) {
      e.preventDefault();
      $(this).parents('form').submit();
    });

    // Валидация
    $.validator.addMethod("regex", function (value, element, regexp) {
      var re = new RegExp(regexp);
      return this.optional(element) || re.test(value);
    }, "Please check your input.");

    function valEl(el) {
      el.validate({
        rules: {
          tel: {
            required: true,
            regex: '^([\\+]+)*[0-9\\x20\\x28\\x29\\-]{5,20}$'
          },
          name: {
            required: true
          },
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          tel: {
            required: 'Заполните поле',
            regex: 'Телефон может содержать символы + - ()'
          },
          name: {
            required: 'Заполните поле',
          },
          text: {
            required: 'Заполните поле',
          },
          email: {
            required: 'Заполните поле',
            email: 'Неверный формат E-mail'
          }
        },
        submitHandler: function (form) {
          $('#loader').fadeIn();
          var $form = $(form);
          var $formId = $(form).attr('id');

          if ($formId === 'popupResult') {
            const day = parseInt($form.find('input[name="data"]').val(), 10);
            const gender = $form.find('input[name="gender"]:checked').val();

            // Скрыть все сообщения
            $('#dayMessages .day-message').hide();

            // Показать нужное
            const target = $('#dayMessages .day-message[data-day="' + day + '"][data-gender="' + gender + '"]');
            if (target.length > 0) {
              target.show();
            } else {
              alert('Пожалуйста, выберите корректное число от 1 до 31');
              $('#loader').fadeOut();
              return false;
            }
          }

          // Отправка формы
          switch ($formId) {
            case 'popupResult':
              $.ajax({
                type: 'POST',
                url: $form.attr('action'),
                data: $form.serialize(),
              })
                .always(function () {
                  setTimeout(() => {
                    $('#loader').fadeOut();
                  }, 800);
                  setTimeout(() => {
                    $.arcticmodal('close');
                    $('#popup-thank').arcticmodal({});
                    $form.trigger('reset');
                  }, 1100);
                });
              break;
          }
          return false;
        }
      });
    }

    $('.js-form').each(function () {
      valEl($(this));
    });

    // Плавный скролл
    $('[data-scroll]').on('click', function () {
      $('html, body').animate({
        scrollTop: $($.attr(this, 'data-scroll')).offset().top
      }, 2000);
      event.preventDefault();
    });

  });
});
document.addEventListener('DOMContentLoaded', function () {
  const swiper1 = new Swiper('.swiper1', {
    slidesPerView: 3,
    spaceBetween: 20,
    pagination: {
      el: ".swiper-pagination1",
    },
    navigation: {
      nextEl: '.swiper-button-next1',
      prevEl: '.swiper-button-prev1',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 0,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 20,
        slidesPerView: 2
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 3
      }
    }
  });

});
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector('.menu-btn');
  const menu = document.querySelector('.menu');

  menuBtn.addEventListener('click', function (e) {
    e.stopPropagation(); // чтобы клик на кнопке не закрыл меню
    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
  });

  menu.addEventListener('click', function (e) {
    e.stopPropagation(); // чтобы клик внутри меню не закрыл его
  });

  // Закрытие меню при клике вне его
  document.addEventListener('click', function () {
    if (menu.classList.contains('active')) {
      menu.classList.remove('active');
      menuBtn.classList.remove('active');
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".main-nav");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      nav.classList.add("fixed");
    } else {
      nav.classList.remove("fixed");
    }
  });
});
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('popupResult');
  const messagesContainer = document.getElementById('dayMessages');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const dayInput = form.querySelector('input[name="data"]');
    const dayValue = parseInt(dayInput.value, 10);

    // Скрываем все сообщения
    messagesContainer.querySelectorAll('.day-message').forEach(el => {
      el.style.display = 'none';
    });

    // Показываем нужное
    const target = messagesContainer.querySelector(`.day-message[data-day="${dayValue}"]`);
    if (target) {
      target.style.display = 'block';
    } else {
      alert("Введите число от 1 до 30");
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.per').forEach(perSection => {
    const tabsBtns = perSection.querySelectorAll(".tabs__btn");
    const tabsPanes = perSection.querySelectorAll(".tabs__pane");
    const headerSubs = perSection.querySelectorAll(
      ".header__sub_1, .header__sub_2, .header__sub_3, .header__sub_4"
    );

    if (!tabsBtns.length || !tabsPanes.length) return;

    tabsBtns.forEach((btn, index) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();

        tabsBtns.forEach(b => b.classList.remove("tabs__btn_active", "active"));
        this.classList.add("tabs__btn_active", "active");

        tabsPanes.forEach((pane, i) => {
          pane.classList.toggle("tabs__pane_show", i === index);
        });

        headerSubs.forEach((sub, i) => {
          if (sub) {
            sub.style.display = (i === index) ? "block" : "none";
          }
        });
      });
    });

    // Инициализация: показываем только первый подзаголовок
    headerSubs.forEach((sub, i) => {
      if (sub) {
        sub.style.display = (i === 0) ? "block" : "none";
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.order').forEach(orderSection => {
    const tabsBtns = orderSection.querySelectorAll(".tabs__btn");
    const tabsPanes = orderSection.querySelectorAll(".tabs__pane");
    const headerSubs = orderSection.querySelectorAll(
      ".header__sub_1, .header__sub_2, .header__sub_3, .header__sub_4"
    );

    if (!tabsBtns.length || !tabsPanes.length) return;

    tabsBtns.forEach((btn, index) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();

        tabsBtns.forEach(b => b.classList.remove("tabs__btn_active", "active"));
        this.classList.add("tabs__btn_active", "active");

        tabsPanes.forEach((pane, i) => {
          pane.classList.toggle("tabs__pane_show", i === index);
        });

        // Проверяем, существует ли соответствующий headerSub
        headerSubs.forEach((sub, i) => {
          if (sub) {
            sub.style.display = (i === index) ? "block" : "none";
          }
        });
      });
    });

    // Инициализация: показываем только первый подзаголовок
    headerSubs.forEach((sub, i) => {
      if (sub) {
        sub.style.display = (i === 0) ? "block" : "none";
      }
    });
  });
});
// Замена <img class="svg"> на inline SVG
document.addEventListener("DOMContentLoaded", () => {
  const svgImages = document.querySelectorAll('img.svg');

  svgImages.forEach(img => {
    const imgURL = img.getAttribute('src');

    fetch(imgURL)
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'image/svg+xml');
        let svg = xmlDoc.querySelector('svg');

        if (!svg) return;

        // Перенос ID
        if (img.id) {
          svg.setAttribute('id', img.id);
        }

        // Перенос классов
        const classes = img.getAttribute('class');
        if (classes) {
          svg.setAttribute('class', `${classes} replaced-svg`);
        }

        // Удаление некорректных xmlns
        svg.removeAttribute('xmlns:a');

        // Добавление viewBox, если его нет
        if (!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
          svg.setAttribute('viewBox', `0 0 ${svg.getAttribute('width')} ${svg.getAttribute('height')}`);
        }

        // Замена <img> на <svg>
        img.parentNode.replaceChild(svg, img);
      })
      .catch(error => {
        console.error(`Ошибка при загрузке SVG: ${imgURL}`, error);
      });
  });
});

