import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css'; // Импортируем все стили Swiper
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation'; // Импортируем стили для модуля Navigation
import 'swiper/css/pagination'; // Импортируем стили для модуля Pagination

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_URL = 'https://portfolio-js.b.goit.study/api/reviews';

const reviewsList = document.querySelector('.reviews-list');

async function fetchReviews() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    renderReviews(data);
    initializeSwiper();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch reviews',
    });
  }
}

function renderReviews(reviews) {
  const reviewsHtml = reviews
    .map(
      review => `
        <div class="swiper-slide">
          <li class="review-item" id="${review._id}">
            <div class="review-author">
              <img src="${review.avatar_url}" alt="Avatar of ${review.author}" class="review-avatar"/>
              <h2 class="review-author-name">${review.author}</h2>
            </div>
            <p class="review-text">${review.review}</p>
          </li>
        </div>
      `
    )
    .join('');
  reviewsList.innerHTML = reviewsHtml;
}

function initializeSwiper() {
  const swiper = new Swiper('.swiper-container', {
    modules: [Navigation, Pagination],
    loop: false, // Отключаем бесконечный цикл
    slidesPerView: 4, // По умолчанию показывать 4 слайда
    spaceBetween: 16, // Расстояние между слайдами
    navigation: {
      nextEl: '.reviews-swiper-button-next',
      prevEl: '.reviews-swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      // when window width is >= 1440px
      1440: {
        slidesPerView: 4,
        spaceBetween: 16,
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      // when window width is >= 375px
      375: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
    },
    on: {
      slideChange: function () {
        updateNavigationButtons(swiper);
      },
    },
  });

  // Обновляем состояние кнопок навигации при инициализации
  updateNavigationButtons(swiper);
}

function updateNavigationButtons(swiper) {
  const nextButton = document.querySelector('.reviews-swiper-button-next');
  const prevButton = document.querySelector('.reviews-swiper-button-prev');

  if (swiper.isEnd) {
    nextButton.classList.remove('active');
    nextButton.classList.add('disabled');
  } else {
    nextButton.classList.remove('disabled');
    nextButton.classList.add('active');
  }

  if (swiper.isBeginning) {
    prevButton.classList.remove('active');
    prevButton.classList.add('disabled');
  } else {
    prevButton.classList.remove('disabled');
    prevButton.classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', fetchReviews);
