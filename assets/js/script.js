const video = document.querySelector(".about__video");
const playBtn = document.querySelector(".video__play");

playBtn.addEventListener("click", () => {
    video.play();
    playBtn.style.display = "none";
});

video.addEventListener("click", () => {
    video.pause();
    playBtn.style.display = "block";
});

video.addEventListener("ended", () => {
    playBtn.style.display = "block";
});

// Phần này là chỗ bấm để xem review của khách hàng.
const track = document.querySelector(".feedback__track");
const dots = document.querySelectorAll(".feedback__dot");

const totalReviews = 3;
const autoSlideDelay = 3000;

let currentSlide = 0;
let autoSlideTimer;

// Hiển thị review
function goToSlide(index) {
    // 5 dots nhưng chỉ có 3 review
    currentSlide = index % totalReviews;

    // Trượt track
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Active dot
function setActiveDot(index) {
    dots.forEach((dot) => {
        dot.classList.remove("feedback__dot--active");
    });

    dots[index].classList.add("feedback__dot--active");
}

// Khi click dot
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        // Xác định review tương ứng
        const slideIndex = index % totalReviews;

        // Hiển thị review
        goToSlide(slideIndex);

        // Dot được click active
        setActiveDot(index);

        // Reset timer
        clearInterval(autoSlideTimer);
        startAutoSlide();
    });
});

// Tự động chuyển review
function startAutoSlide() {
    autoSlideTimer = setInterval(() => {
        currentSlide++;

        // Review 1 → 2 → 3 → 1
        if (currentSlide >= totalReviews) {
            currentSlide = 0;
        }

        // Hiển thị review
        goToSlide(currentSlide);

        // Khi tự chạy thì active dot tương ứng
        setActiveDot(currentSlide);
    }, autoSlideDelay);
}

// Khởi chạy
startAutoSlide();
