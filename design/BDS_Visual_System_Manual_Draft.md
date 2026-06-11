# 📘 BDS소상공인플렛폼 통합 비주얼 시스템 매뉴얼 (초안)
**버전:** 0.1 (Designer Lead Draft)
**목표:** 플랫폼 전반의 모든 콘텐츠(웹, SNS, 교육 자료 등)에 통일된 디자인 언어를 적용하고 브랜드 신뢰도를 극대화한다.

## I. 핵심 가이드라인 및 원칙
*   **톤앤매너:** '데이터 기반', '신뢰', '성장' (Empowering & Trustworthy).
*   **핵심 메시지:** "막연한 불안감(Pain)을 정량적 데이터(Gauge)로 확인하고, 체계적인 컨설팅(Trust)으로 성장한다."
*   **시각화 원칙:** 모든 통계나 수치는 단순 텍스트가 아닌 **비주얼 컴포넌트(차트, 게이지 등)**로 변환하여 제시되어야 한다.

## II. 컬러 시스템 (Color Palette)
| 이름 | 코드 | 사용 목적 | 예시 활용처 |
| :--- | :--- | :--- | :--- |
| Primary Blue | `#004D66` | 신뢰, 메인 브랜드 색상. 위젯 배경, 주요 제목. | Trust Widget 프레임, CTA 버튼(메인) |
| Growth Green | `#3CB371` | 긍정적 변화, 성장, 성공 지표. | 목표 달성 영역 강조, '성장 로드맵' 진행 바 |
| Warning Red | `#D9534F` | 경고, 위험, 즉각적인 문제점(Pain). | PainGauge의 고위험 구간, 리스크 등급 C 표시 |
| Neutral Grey | `#EEEEEE` | 배경 분리, 구분선. 가독성 확보. | 섹션 간의 여백, 보조 정보 텍스트 |

## III. 타이포그래피 시스템 (Typography)
*   **폰트:** Pretendard (가장 높은 가독성과 현대적 느낌).
    *   H1: Weight Bold, Size 36px - 최대 중요 메시지.
    *   H2: Weight SemiBold, Size 28px - 섹션 제목 및 기능 명시.
    *   Body: Weight Regular, Size 16px - 일반적인 설명 문구.
    *   Caption: Weight Light, Size 12px - 출처(Source), 보조 정보.

## IV. 표준 컴포넌트 라이브러리 (Templates)
이 섹션은 모든 콘텐츠에 재사용되어야 하는 기본 UI/UX 블록입니다.

1.  **데이터 시각화 블록 (Data Visualization Block):**
    *   **목적:** 복잡한 데이터를 즉시 이해시키는 것이 목표.
    *   **종류 3가지 표준화:**
        *   A) **Time-Series Chart**: 시간 흐름에 따른 변화를 보여주는 라인 그래프 (재사용 필수).
        *   B) **Comparative Bar Chart**: 여러 항목 간의 순위 및 비교를 위한 막대 그래프.
        *   C) **Radial/Gauge Chart**: 단일 지표의 현재 상태(예: 리스크 등급)를 직관적으로 보여주는 원형 게이지 (PainGauge와 연동).

2.  **CTA 블록 (Call-to-Action Block):**
    *   단순한 버튼이 아닌, **'다음 행동 유도 스토리텔링'** 구조여야 함.
    *   구성: ➡️ [강력한 후크 카피] → [혜택 요약(3가지)] → [버튼 (Growth Green 배경)].

## V. 채널별 적용 가이드라인 (Channel Specific Rules)
*   **웹페이지:** 모든 컴포넌트가 위 시스템을 따르며, 스크롤 시 리스크 등급 변화에 따른 인터랙션이 발생해야 함.
*   **SNS/릴스:** 15초 내 핵심 메시지 전달을 목표로 하며, 반드시 Primary Blue와 Growth Green의 대비를 극대화하여 '신뢰'와 '성장 가능성'을 강조한다. (텍스트 최소화)