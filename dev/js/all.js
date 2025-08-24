document.addEventListener("DOMContentLoaded", () => {
  $(document).ready(function () {

    // Кнопка отправки
    $('[data-submit]').on('click', function (e) {
      e.preventDefault();
      $(this).parents('form').submit();
    });

    // Метод валидации
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
          email: {
            required: 'Заполните поле',
            email: 'Неверный формат E-mail'
          }
        },
        submitHandler: function (form) {
          var $form = $(form);
          var $formId = $form.attr('id');
          const isMainForm1 = $form.hasClass('main__form_1');

          // Обработка main__form_1
          if ($formId === 'popupResult' || $formId === 'form1' || isMainForm1) {
            const currentPage = window.location.pathname;

            const day = parseInt($form.find('input[name="number"]').val(), 10);
            const gender = $form.find('input[name="gender"]:checked').val();

            if (!day || day < 1 || day > 31) {
              alert('Пожалуйста, введите число от 1 до 31');
              return false;
            }

            if (!currentPage.includes('main.html')) {
              // Правильный редирект с параметрами и якорем в конце
              const query = `?day=${day}&gender=${gender}#dayMessages`;
              window.location.href = 'main.html' + query;
              return false;
            }

            // Если уже на main.html — показываем сообщение и скроллим
            $('#dayMessages .day-message').hide();
            const target = $('#dayMessages .day-message[data-day="' + day + '"][data-gender="' + gender + '"]');

            if (target.length > 0) {
              target.show();

              // Скролл к блоку
              $('html, body').animate({
                scrollTop: $('#dayMessages').offset().top - 110
              }, 1000);
            } else {
              alert('Сообщение не найдено. Проверьте введённые данные.');
            }

            // Отправка AJAX
            $.ajax({
              type: 'POST',
              url: $form.attr('action'),
              data: $form.serialize(),
            }).always(function () {
              setTimeout(() => $('#loader').fadeOut(), 800);
              setTimeout(() => {
                $.arcticmodal('close');
                $('#popup-thank').arcticmodal({});
                $form.trigger('reset');
              }, 1100);
            });

            return false;
          }

          // Обработка других форм
          if ($formId === 'form2' || $formId === 'form3' || $formId === 'form4') {
            return true;
          }

          return true;
        }
      });
    }

    // Инициализация валидации для всех форм
    $('.js-form').each(function () {
      valEl($(this));
    });

    // Функция обработки параметров при загрузке main.html
    function handleRedirectParams() {
      const params = new URLSearchParams(window.location.search);
      const day = parseInt(params.get('day'), 10);
      const gender = params.get('gender');

      if (day && gender) {
        const target = document.querySelector(`#dayMessages .day-message[data-day="${day}"][data-gender="${gender}"]`);
        if (target) {
          // Скрываем все сообщения и показываем нужное
          document.querySelectorAll('#dayMessages .day-message').forEach(el => el.style.display = 'none');
          target.style.display = 'block';

          // Скроллим к блоку
          $('html, body').animate({
            scrollTop: $('#dayMessages').offset().top
          }, 1000);
        }
      }
    }

    handleRedirectParams();

    // Плавный скролл для элементов с data-scroll
    $('[data-scroll]').on('click', function (event) {
      $('html, body').animate({
        scrollTop: $($.attr(this, 'data-scroll')).offset().top
      }, 2000);
      event.preventDefault();
    });

  });
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('form2');
  const input1 = form.querySelector('input[name="partner1"]');
  const input2 = form.querySelector('input[name="partner2"]');

  // Удаление красной рамки при вводе
  [input1, input2].forEach(input => {
    input.addEventListener('input', () => {
      input.style.border = '';
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const partner1 = input1.value.trim();
    const partner2 = input2.value.trim();
    let hasError = false;

    // Проверка формата DD. MM. YYYY
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.\s?(0[1-9]|1[0-2])\.\s?(19|20)\d{2}$/;

    // Сброс рамок
    [input1, input2].forEach(input => {
      input.style.border = '';
    });

    // Проверка partner1
    if (!dateRegex.test(partner1)) {
      input1.style.setProperty('border', '2.5px solid #ff0000', 'important');
      hasError = true;
    }

    // Проверка partner2
    if (!dateRegex.test(partner2)) {
      input2.style.setProperty('border', '2.5px solid #ff0000', 'important');
      hasError = true;
    }

    if (hasError) return;

    // Если всё верно — переход на main2.html
    const url = `main2.html?partner1=${encodeURIComponent(partner1)}&partner2=${encodeURIComponent(partner2)}`;
    window.location.href = url;
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
  const form = document.querySelector('.main__form_1'); // ищем только нужную форму
  const messagesContainer = document.getElementById('dayMessages');

  if (!form || !messagesContainer) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const dayInput = form.querySelector('input[name="number"]');
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





