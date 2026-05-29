# BDS 통합 비주얼 가이드라인 (최종 배포 버전 V2.1)

## ✨ 개요
본 가이드는 소상공인플렛폼의 모든 시각 콘텐츠 및 UI 컴포넌트 제작을 위한 최종 표준입니다. 특히, 기술적 구현 가능성을 검토한 모션과 인터랙션 사양을 포함합니다.

---

### 🎨 I. 디자인 시스템 핵심 요소 (불변)
*   **컬러 팔레트:**
    *   Primary: #007bff (신뢰/솔루션)
    *   Secondary: #28a745 (성장/안정)
    *   Warning/Pain: #dc3545 (위험/불안)
    *   Neutral Background: #f8f9fa
*   **타이포그래피:** Noto Sans KR (Headings), Pretendard (Body)

### 🎬 II. 모션 및 인터랙션 시스템 (V2.1 핵심 업데이트)
모든 애니메이션은 '불안(Pain)'에서 '확신(Solution)'으로의 감정적 전환을 시각적으로 증폭시키는 것을 목표로 합니다.

**A. KPI Gauge 컴포넌트 (핵심 모듈)**
*   **전환 로직:** [Developer 검증 완료] 데이터가 Warning 색상($\rightarrow$) Primary/Secondary 색상으로 변할 때, 게이지 바의 변화는 단순한 크기 변화가 아닌 '물리적인 수축 및 팽창(Pulsing & Expanding)' 모션을 가져야 합니다.
*   **속도:** (기술적 제약 반영) 전환 과정은 최소 1.5초에서 최대 2.5초 사이로 설정하며, 가속/감속 곡선(Easing Curve: EaseOutQuad)을 적용하여 자연스러운 '숨 고르기' 느낌을 부여합니다.
*   **트리거:** 트랜지션 발생 시점의 카피 오버레이가 선행되어야 합니다 (카피 $\rightarrow$ 모션).

**B. 데이터 전환 흐름 (Emotional Transition)**
1.  **Pain 단계 시작:** 화면 전체에 Warning 색상의 미세한 노이즈/진동 효과를 적용하여 불안감을 조성합니다.
2.  **전환점 발생:** 핵심 키워드와 통계 수치가 대비되는 '스크래치(Scratch)' 또는 '플래시(Flash)' 효과로 전환됩니다.
3.  **Solution 단계 진입:** 배경 노이즈가 제거되고, Primary 색상의 차분한 톤으로 안정화되며, KPI Gauge의 모션이 부드럽게 시작되어야 합니다.

### 🖼️ III. 최종 에셋 제작 매니페스트 및 우선순위 (최종 확정)
모든 콘텐츠는 이 자산들을 조합하여 완성됩니다.

| 구분 | 에셋 ID | 내용/목적 | 적용 채널 | 상태 | 담당 에이전트 | 비고 |
| :---: | :---: | :--- | :--- | :--- | :--- | :--- |
| **핵심 모듈** | A-KPI-Gauge-V2.1 | Pain $\rightarrow$ Solution 감정 전환 모션 및 컴포넌트 | YouTube, Web UI | 🟢 최종 확정 | Designer/Developer | *최우선순위* |
| **콘텐츠 자산** | B-Story-Flow-Card | 스토리텔링 흐름 카드 (3단계 구조) | Instagram Carousel, PPT | 🟡 제작 대기 | Designer | 지역 생산자 온보딩용 |
| **영상 에셋** | C-Hook-Set-V1.0 | A/B 테스트 후킹 클립 5종 (데이터 시각화 포함) | YouTube Shorts / Reels | 🟢 최종 확정 | Writer/Designer | 각 채널별 최적 길이로 분할 제작 필요 |
| **브랜딩 에셋** | D-Logo-Set-V1.0 | 모든 플랫폼에 적용될 로고 조합형 (활용 가이드 포함) | 전 영역 | 🟡 디자인 검토 대기 | Designer | 최종 컬러 코드 확정 필요 |

---