# 🚀 솔루션 워크북 (Mini-Workshop Flow) 설계 명세서 V1.0

## 🎯 목표
진단 결과(PainGauge 점수, Trust Widget 상태)를 받은 소상공인에게 즉시 실행 가능한 '3단계 실습형 콘텐츠'를 제공하여 플랫폼 체류 시간과 만족도를 극대화한다. (Diagnosis $\rightarrow$ Action Plan)

## 👤 페르소나 기반 시퀀스
*   **Trigger:** 사용자가 PainGauge 진단 완료 및 결과 확인 페이지 도달.
*   **Flow Goal:** '무엇이 문제인가?'에서 '어떻게 해결할 것인가?'로 인지 전환 유도.
*   **Key Metric:** 워크북의 3단계 완주율 (Completion Rate).

## 🖼️ 와이어프레임 및 인터랙션 정의

### Step 1: 공감 및 원인 분석 (Pain Re-framing)
*   **제목/헤드라인:** "당신의 진단 점수, 이 숫자가 의미하는 것." (Diagnosis $\rightarrow$ Interpretation)
*   **시각 요소:** PainGauge 결과 그래프가 단순히 '낮다'가 아니라, **"A 영역의 어려움(예: 마케팅 부족)"**을 구체적으로 짚어주는 형태로 변화.
*   **인터랙션:** 사용자가 자신의 점수 구간에 해당하는 *대표 사례 이미지*를 클릭하면, 해당 어려움을 겪는 소상공인의 짧은 'Pain Story'가 카드 뉴스 형식으로 슬라이드되어 노출된다. (Writer의 스토리텔링 에셋 필요)

### Step 2: 실행 과제 제시 (Micro-Action Assignment)
*   **제목/헤드라인:** "딱 하나의 변화만, 오늘부터 시작할 작은 행동." (Overwhelming $\rightarrow$ Manageable)
*   **시각 요소:** 'Mega Goal' 대신, **3가지의 선택 가능한 Micro-Task 카드**를 제시. 각 카드는 구체적인 실행 방법과 예상 소요 시간을 명시해야 한다.
    *   **예시 1 (마케팅):** "인스타그램 스토리 템플릿 5개 제작하기" (소요 시간: 30분)
    *   **예시 2 (자금 관리):** "지난달 지출 카테고리 재정렬하여 목록화하기" (소요 시간: 1시간)
    *   **예시 3 (네트워크):** "지역 상인 커뮤니티에 인사글 작성하고 댓글 달기" (소요 시간: 15분)
*   **핵심 인터랙션:** 사용자가 하나의 카드를 선택하면, 해당 과제에 필요한 **'리소스 가이드(Tool)'**가 모달로 팝업된다.

### Step 3: 결과물 시각화 및 다음 스텝 유도 (Solution Output & Next Loop)
*   **제목/헤드라인:** "당신이 만들어낸 변화, 다시 확인하기." (Action $\rightarrow$ Verification)
*   **시각 요소:** 사용자가 Mini-Workshop에서 수행한 '가상의 결과물'을 시각적으로 보여주는 공간. (예: 작성된 인스타그램 스토리 템플릿의 모형, 재정렬된 지출 카테고리 목록 등).
*   **핵심 인터랙션:**
    1.  결과물을 확인하면 **`[다음 진단하기]` 버튼**이 활성화되며, 이 버튼을 누르는 순간 PainGauge 점수가 상승했는지 여부를 *가상의 신뢰 지수(Trust Score)*와 함께 업데이트하는 시뮬레이션을 보여준다. (Codari의 로직 검증 필요)
    2.  혹은 **`[전문 컨설팅 예약하기]`** CTA를 통해 수익화 모델과 연결한다.

## 🎨 Designer's Review Notes (for Writer & Coder)
1.  **디자인 시스템 활용:** 이 워크북의 모든 레이아웃 요소는 `BDS_Integrated_Design_System_v3.0.md`에 정의된 색상 코드와 타이포그래피를 엄격히 준수해야 한다.
2.  **데이터 플로우:** Step 1 $\rightarrow$ Step 2 $\rightarrow$ Step 3로의 데이터 흐름은 **'진단 (Diagnosis) $\rightarrow$ 과제 부여 (Task Assignment) $\rightarrow$ 성과 측정 (Measurement)'**의 논리적 순서를 따라야 한다.