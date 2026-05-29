# 🖼️ BDS 소상공인 플랫폼 - 썸네일 컴포넌트 디자인 시스템 핸드오프 (v1.0)

## 🎯 목적
본 문서는 BDS소상공인플렛폼의 모든 콘텐츠(유튜브, 블로그, 카드뉴스 등)에 사용될 표준화된 썸네일 컴포넌트를 정의합니다. 소상공인의 Pain Point와 Solution을 감정적 흐름으로 포착하여 높은 클릭률(CTR)과 신뢰도를 동시에 확보하는 것이 목표입니다.

## 📐 공통 사양 (Global Specs)
*   **최종 해상도:** 1280px x 720px (16:9 비율 - YouTube 표준)
*   **파일 포맷:** JPG, PNG (배경 투명도가 필요한 경우 SVG 고려)
*   **폰트 시스템:** Noto Sans KR Bold/SemiBold (최대 가독성 확보)
*   **컬러 팔레트 (Emotional Gradient):**
    *   **🚨 Pain Color (위기/문제 제기):** `#D9534F` (강한 경고, 붉은 계열)
    *   **💡 Insight Color (해결책 제시):** `#5BC0DE` (지적인 통찰, 밝은 청록색)
    *   **✅ Solution Color (안정/성공):** `#5CB85C` (긍정적 성장, 녹색 계열)

## 💡 컨셉별 상세 정의 및 레이아웃 규칙 (The Three Pillars)

| 구분 | 컨셉 A: '문제-대비' (Pain Focus) | 컨셉 B: '해결책 제시' (Solution Focus) | 컨셉 C: '지식 전달' (How-To/Tip Focus) |
| :--- | :--- | :--- | :--- |
| **주요 메시지** | 소상공인이 겪는 가장 큰 어려움(Pain)을 직관적으로 보여줌. 공감 유도에 최적화. | BDS플랫폼이 제공하는 명확한 해결책(Solution)을 제시하며 기대감을 높임. 신뢰 구축에 최적화. | 구체적인 정보나 노하우를 단계별로 정리하여 전문성을 강조함. 검색 및 학습 목적에 적합. |
| **핵심 시각 요소** | 🚨 Pain Color를 배경의 주조색으로 사용하고, 문제 상황을 연상시키는 아이콘/이미지 배치 (예: 폐업 통계 그래프). | ✅ Solution Color와 💡 Insight Color 조합. 'Before'와 'After'를 명확한 대비 구조로 분리하여 배치. | 단순하지만 강력한 정보 전달력을 위해 깔끔한 화이트 배경에 플로우차트/숫자 위주로 구성. |
| **레이아웃 규칙** | **[좌측 40% (Pain)] + [우측 60% (Hope)]** 구조. 좌측에 질문형 헤드라인을 배치하여 시청자의 궁금증 자극. | **[대비선]을 이용한 명확한 분할.** "이전 상황"과 "변화된 상황"의 Before/After를 대각선 또는 수직선을 기준으로 대비. | **'3단계 공식' 레이아웃** (Step 1, Step 2, Step 3). 번호와 화살표 아이콘을 사용하여 학습 흐름을 시각적으로 완성. |
| **헤드라인 예시** | "월 매출 급감? 소상공인이 가장 많이 놓치는 3가지 함정" (Pain 질문형) | "폐업 위기 탈출! AI 네이티브 시스템으로 성공하는 법" (Solution 확언형) | "매출 2배 올리는 상권 분석 노하우 📈 [5분 만에 끝내기]" (How-To 명시형) |

---

### 💾 개발 핸드오프 스펙 파일 목록

개발팀이 즉시 디자인 시스템으로 인식하고 구현할 수 있도록, 각 컨셉별로 다음 구조의 파일을 생성하여 폴더를 정리했습니다.

1.  **`Thumbnails_DesignSystem_Handover_v1.0.md`**: (위 내용) 전체적인 가이드라인 및 철학 정의.
2.  **`<create_file path="c:\Users\PJH\소상공인플렛폼\sessions\thumb_spec_A_pain_focus.json">{"concept": "Pain Focus", "size": "1280x720", "ratio": "16:9", "background_color": "#D9534F", "key_elements": ["Pain Iconography", "Questioning Headline"], "typography": {"headline": {"font": "Noto Sans KR Bold", "size": "72px"}, "sub": {"font": "Noto Sans KR SemiBold", "size": "48px"}}, "layout_rule": "Vertical split (Q&A format)"}