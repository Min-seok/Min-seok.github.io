// 헤더 스크롤 시 흐림(Blur) 및 백그라운드 색상 밀도 제어
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Intersection Observer를 이용한 스크롤 연동 UI/UX 감지 및 탭 전환 활성화
const sections = document.querySelectorAll('.content-section');
const tabButtons = document.querySelectorAll('.tab-btn');

const observerOptions = {
    root: null,
    rootMargin: '-25% 0px -35% 0px', // 최적의 인터랙션을 위한 상하 뷰포트 마진 디텍팅 조정
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // 해당 타겟 등장 클래스 추가 (CSS 애니메이션 트리거)
            entry.target.classList.add('visible');
            
            // 데이터 매칭을 활용한 탭 상태 업데이트
            const id = entry.target.getAttribute('id');
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('onclick').includes(id)) {
                    btn.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// 스티키 헤더 및 네비게이션 오프셋을 계산한 스무스 스크롤 이펙트
function scrollToSection(id) {
    const element = document.getElementById(id);
    const headerOffset = 130; // 탭 네비게이션의 고정 위치 높이를 오프셋 값으로 설정
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}