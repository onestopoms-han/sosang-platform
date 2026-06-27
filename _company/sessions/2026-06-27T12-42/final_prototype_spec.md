# 마스터 프로토타입(V1.0) 디자인 및 인터랙션 명세서

## 1. 핵심 브랜드 시스템
- **Primary Color (신뢰):** Deep Blue (#004D66)
- **Accent Color (성장/경고):** Growth Green (#3CB371)
- **Critical Risk (위험):** Red (#FF0000)

## 2. 리스크 등급별 시각적 상태 매핑 규칙 (Trust Widget & PainGauge)

| 리스크 레벨 | Trust Widget 상태 | PainGauge 상태 | 주요 액션/UI 반응 | 배경 색상 |
| :---: | :---: | :---: | :---: | :---: |
| **A (Critical)** | 매우 낮음 (Low Trust) | 매우 높음 (High Pain) | 즉각적인 개입 필요 / 긴급 조치 요구 | Red (#FF0000) |
| **B (Moderate)** | 중간 (Medium Trust) | 중간 (Medium Pain) | 컨설팅 및 가이드라인 제시 | Yellow/Orange |
| **C (Low)** | 높음 (High Trust) | 낮음 (Low Pain) | 자가 해결 가능 / 정보 제공 모드 | Growth Green (#3CB371) |

## 3. 주요 컴포넌트 인터랙션 흐름 명세 (Prototype Flow)

### A. Trust Widget 상호작용
- **상태:** 리스크 등급(A/B/C)에 따라 고정된 색상과 텍스트가 표시됨.
- **클릭 액션:** 사용자가 특정 리스크 레벨을 선택하면, 해당 레벨에 맞는 상세 설명 모달(Modal)이 열림.
    - *예시:* 'A'를 클릭 시, "Risk Level A는 즉각적인 법적/재무적 조치가 필요합니다"라는 경고 메시지와 함께 관련 법적 안전성 가이드라인 링크가 표시됨.

### B. PainGauge 상호작용
- **상태:** 리스크 레벨에 따라 막대 그래프의 채움 정도와 색상이 동적으로 변화함.
- **클릭 액션:** 사용자가 PainGauge 영역을 클릭하면, 해당 지표(Pain Point)에 대한 상세 분석 데이터(WTP 기반)가 표시되는 팝업 또는 인라인 설명이 활성화됨.

### C. 마스터 프로토타입 흐름 (User Journey Map 반영)
1. **진단 단계:** 사용자가 진단 데이터를 입력하면, 시스템은 자동으로 A/B/C 리스크를 계산함.
2. **시각화 단계:** Trust Widget과 PainGauge가 실시간으로 계산된 Risk Level에 따라 색상(Red/Yellow/Green)을 즉시 반영하여 사용자에게 현재 상태를 직관적으로 전달함. (이 부분이 기술 검증의 핵심 지표임.)
3. **컨설팅 단계:** 리스크 레벨에 따라 맞춤형 솔루션(A단계는 법률 자문 연계, C단계는 교육 자료 제공) 버튼이 제시되어 다음 행동을 유도함.

## 4. 최종 디자인 가이드라인 (개발팀 전달용)
- **UI/UX 원칙:** 모든 시각적 요소는 리스크 등급(A/B/C)의 데이터 흐름을 직접적으로 반영해야 하며, 추상적인 설명 대신 명확한 색상과 상태 변화로 신뢰를 확보한다.
- **컴포넌트 요구사항:** Trust Widget 및 PainGauge 컴포넌트는 반드시 API 응답의 Risk Level 필드에 종속되어야 한다.