import collection from "./gallery-items.js"

const galleryRef = document.querySelector('.gallery');
const lightboxRef = document.querySelector('.lightbox');
const lightboxImgRef = lightboxRef.querySelector('.lightbox__image');
const closeBtnRef = lightboxRef.querySelector('[data-action="close-lightbox"]');
const overlay = lightboxRef.querySelector('.lightbox__overlay');

const galleryItems = collection.map(i => {
    let item = document.createElement('li');
    item.classList.add('gallery__item');
    
    let link = document.createElement('a');
    link.classList.add('gallery__link');
    link.href = i.original;

    let img = document.createElement('img');
    img.classList.add('gallery__image');
    img.src = i.preview;
    img.dataset.source = i.original;
    img.alt = i.description
    link.appendChild(img);
    item.appendChild(link);

    return item;
});

galleryRef.append(...galleryItems);

const showImg = (src, alt) => {
    lightboxImgRef.src = src;
    lightboxImgRef.alt = alt;
}

galleryRef.addEventListener('click', (e) => {
    e.preventDefault();    
    lightboxRef.classList.add('is-open');

    const src = e.target.getAttribute('data-source');
    const alt = e.target.getAttribute('alt');

    showImg(src, alt);
});

const prevImgBtn = document.createElement('button');
prevImgBtn.innerHTML = '&#10094;';
const nextImgBtn = document.createElement('button');
nextImgBtn.innerHTML = '&#10095;';
prevImgBtn.classList.add('lightbox__prev');
nextImgBtn.classList.add('lightbox__next');
lightboxRef.querySelector('.lightbox__content').prepend(prevImgBtn);
lightboxRef.querySelector('.lightbox__content').append(nextImgBtn);

const imgsArr = document.querySelectorAll('.gallery__image');

const checkCurrentImgIndex = () => {
    for (let i = 0; i < imgsArr.length; i++) {
        if (lightboxImgRef.src === imgsArr[i].getAttribute('data-source')) {
            return i;
        }
    }
};

const prevImgFn = (index) => {
     if (index === 0) {
        index = imgsArr.length - 1;
    } else {
        index--
    }
    
    showImg(imgsArr[index].getAttribute('data-source'), imgsArr[index].getAttribute('alt'));
}

const nextImgFn = (index) => {    
    if (index >= (imgsArr.length - 1)) {
        index = 0;
    } else {
        index++
    }
    showImg(imgsArr[index].getAttribute('data-source'), imgsArr[index].getAttribute('alt'));
}



const hideModal = () => {
    lightboxRef.classList.remove('is-open');

    lightboxImgRef.src = '';
    lightboxImgRef.alt = '';
} 

prevImgBtn.addEventListener('click', ()=> prevImgFn(checkCurrentImgIndex()));
nextImgBtn.addEventListener('click', ()=>nextImgFn(checkCurrentImgIndex()));
closeBtnRef.addEventListener('click', hideModal);
overlay.addEventListener('click', hideModal);

document.addEventListener('keydown', (e) => {
    (e.keyCode === 27 || (e.code || e.key) === 'Escape') && lightboxRef.classList.contains('is-open') ? hideModal() : '';
    (e.keyCode === 37 || (e.code || e.key) === 'ArrowLeft') && lightboxRef.classList.contains('is-open') ? prevImgFn(checkCurrentImgIndex()) : '';
    (e.keyCode === 39 || (e.code || e.key) === 'ArrowRight') && lightboxRef.classList.contains('is-open') ? nextImgFn(checkCurrentImgIndex()) : '';
});


    



// <li class="gallery__item">
//   <a class="gallery__link" href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg">
//     <img class="gallery__image"
//       src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
//       data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//       alt="Tulips"
//     />
//   </a>
// </li> 

// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image. =>
// Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

// Закрытие модального окна по клику на div.lightbox__overlay.
// Закрытие модального окна по нажатию клавиши ESC.
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".