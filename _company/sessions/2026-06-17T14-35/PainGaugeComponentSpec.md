# 🎨 컴포넌트 명세: Trust Widget & Pain Gauge (V2.0)

## I. 개요 및 목표
본 문서는 Researcher가 도출한 페인 포인트를 사용자에게 직관적으로 전달하고, 플랫폼의 가치 제안(Trust/Solution)을 극대화하는 **재사용 가능한 UI 컴포넌트**를 정의합니다. 개발팀이 즉시 구현할 수 있도록 Props와 상태 변화에 중점을 둡니다.

## II. Trust Widget Component Spec
*   **역할:** 사용자가 플랫폼의 신뢰성을 인식하게 하는 영역. (Ex: "XXX 소상공인들이 실제로 성공했습니다.")
*   **Props 정의:**
    *   `sourceType`: ('Testimonial', 'Statistic', 'Media') - 출처 유형 (필수)
    *   `dataList`: Array<{ name: string, count: number, period?: string }> - 데이터 배열 (최소 3개 권장)
    *   `layoutStyle`: ('Horizontal', 'Vertical', 'Carousel') - 레이아웃 타입 (기본값: Horizontal)
    *   `accentColor`: '#004D66' 또는 '#3CB371' - 강조 색상
*   **State 변화:**
    *   데이터 개수 증가 시, `dataList`에 새로운 객체가 추가되어야 함. (API 호출 성공 시 반영)
*   **디자인 규칙:** 명확하고 간결한 폰트 사용. 숫자와 단위는 가장 크게 강조하여 가독성을 확보합니다.

## III. Pain Gauge Component Spec
*   **역할:** 소상공인의 현재 '위기감(Pain)'과 '걱정거리(Worry)'를 직관적인 색상과 그래프로 시각화. (핵심 전환 유도 지점)
*   **Props 정의:**
    *   `painScore`: number (0 ~ 100) - 통증 점수 (필수)
    *   `worryScore`: number (0 ~ 100) - 걱정 점수 (필수)
    *   `title`: string - 섹션 제목 (Ex: "현재 소상공인의 어려움")
    *   `colorPalette`: { pain: '#CC3333', worry: '#FFC300' } - 색상 팔레트 (빨강/노랑)
*   **State 변화:**
    *   점수(Score)가 높을수록, 그래프의 채움 정도와 경고 아이콘이 더 자주 나타나야 합니다.
*   **Interaction:**
    *   마우스를 올리면 (`onHover`), 해당 점수에 대한 간략한 텍스트 설명 (Tooltip)이 나와야 합니다.

## IV. 통합 목업 레이아웃 제안 (Lander Page Context)
1.  **Section Title:** "Pain Point 인식 → 해결책 제시" 흐름을 명시합니다.
2.  **Layout Flow:** [Header] $\rightarrow$ **[Pain Gauge Component]** $\rightarrow$ *('문제의 심각성' 강조)* $\rightarrow$ **[Trust Widget Component]** $\rightarrow$ *('신뢰 확보')* $\rightarrow$ [CTA/Solution Form]