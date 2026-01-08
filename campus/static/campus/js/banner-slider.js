/**
 * 首页轮播图逻辑
 */
function initBannerSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!slides.length) return; // 防止在没有轮播图的页面报错

    let currentIndex = 0;
    let timer = null;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    function nextSlide() {
        let next = (currentIndex + 1) % slides.length;
        showSlide(next);
    }

    function prevSlide() {
        let prev = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(prev);
    }

    function startTimer() {
        timer = setInterval(nextSlide, 5000);
    }

    function resetTimer() {
        clearInterval(timer);
        startTimer();
    }

    // 绑定事件
    if (nextBtn) nextBtn.onclick = () => { nextSlide(); resetTimer(); };
    if (prevBtn) prevBtn.onclick = () => { prevSlide(); resetTimer(); };

    dots.forEach((dot, idx) => {
        dot.onclick = () => { showSlide(idx); resetTimer(); };
    });

    startTimer();
}

// 页面加载完成后启动
document.addEventListener('DOMContentLoaded', initBannerSlider);