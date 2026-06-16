# 🎨 BDS 소상공인 플랫폼 - 디자인 시스템 컴포넌트 라이브러리 (V1.0)
## 📄 목적
이 문서는 Trust Widget 및 PainGauge V5.0의 모든 UI 요소를 개발팀에 핸드오프하기 위한 원자적(Atomic) 레퍼런스입니다. 모든 페이지는 여기서 정의된 컴포넌트를 사용해야 합니다.

---
### 1. [PainGauge Component] - 핵심 위기감 시각화 장치

**역할:** 소상공인의 현재 어려움 수준을 데이터 기반으로 시각적 경고를 제공합니다.
**변수:** `data-value` (현재 점수), `data-threshold` (경계점)
**레이아웃 스펙:** 16:9 비율의 가로형 그래프 + 숫자 출력 영역

| 속성 | 명세 | 색상 코드 | 개발 구현 지침 |
| :--- | :--- | :--- | :--- |
| **Critical Zone (71-100)** | 경고색 배경, 즉각적 액션 촉구 문구 강제 삽입. | Background: #FFCCCC (빨강 계열) / Text: Deep Blue (#004D66) | 그래프가 붉은 영역에 진입하면 애니메이션 효과(Pulse Effect)를 적용하여 긴급성 부여. |
| **Warning Zone (51-70)** | 주의색 배경, 데이터 기반의 문제 인식 유도. | Background: #FFFFCC (노랑 계열) / Text: Deep Blue (#004D66) | 경고 문구는 '점진적 위험' 톤앤매너 유지. |
| **Safe Zone (0-50)** | 안정색 배경, 성과 축하 및 다음 단계 제시. | Background: #CCFFCC (연두 계열) / Text: Deep Blue (#004D66) | '안정적이지만 더 나은 성장 가능성'을 암시하는 문구 배치. |

---
### 2. [Trust Widget Component] - 데이터 권위 증명 장치

**역할:** 제시된 수치가 단순한 예측이 아닌, 검증된 데이터를 기반으로 함을 시각적으로 입증합니다.
**구성 요소:** (A) 신뢰 주체 아이콘, (B) 출처 명시 텍스트, (C) 데이터 측정일자 스탬프.

| 상태 | 디자인 지침 | 예시 구조 | 비고 |
| :--- | :--- | :--- | :--- |
| **기본 (Default)** | Deep Blue 배경의 띠 형태로 배치. 신뢰 주체 아이콘(예: Ministry of SMEs)을 왼쪽에 크게 표시. | [아이콘] 신뢰 주체 이름 - 데이터 출처 및 측정일자 | 최소한의 정보로 최대의 권위를 전달해야 함. |
| **강조 (Highlight)** | 중요한 전환점(예: A/B 테스트 성공 지표 제시 시)에만 사용. 배경 색상을 Growth Green(#3CB371)으로 변경하고, '검증 완료' 배지를 추가. | [아이콘] 신뢰 주체 이름 - *[Growth Green 강조]* 검증 완료 (2026. 06.) | 과도한 사용 금지. 임팩트가 필요한 지점에만 제한적으로 사용한다. |

---
### 3. [Standard CTA Button Component] - 전환 유도 장치

**역할:** 사용자 행동(클릭)을 촉발하는 최종 접점. 불안감 해소와 희망 제시의 메시지를 포함해야 함.
**스펙:** 크기: L (최대 노출), Corner Radius: 8px, Hover State 필수 적용.

| 속성 | Deep Blue (위기/공감) | Growth Green (해결/희망) | 개발 지침 |
| :--- | :--- | :--- | :--- |
| **Default** | 배경색: #004D66 / 텍스트: White | 배경색: #3CB371 / 텍스트: White | 버튼 클릭 시 '성공 애니메이션'과 함께 다음 단계로 넘어가는 부드러운 전환 효과가 필수. |
| **Hover** | Background: #006688 (더 밝게) / Shadow: Light Blue Drop Shadow | Background: #5cb871 (더 진하게) / Shadow: Green Drop Shadow | 마우스 오버 시, 버튼이 약간 팝업되는 듯한 효과(Scale Up)를 적용하여 즉각적인 클릭 유도. |

---
**[API 연동 매핑 테이블]**

| 데이터 필드 (Backend API) | 컴포넌트 | 디자인 속성/위치 | 설명 및 제약 조건 |
| :--- | :--- | :--- | :--- |
| `current_pain_score` (Integer) | PainGauge | Graph Bar Value / Text Display | 0~100점 범위. 이 값에 따라 Background Color가 동적으로 변경되어야 함. |
| `trust_source_name` (String) | Trust Widget | Primary Label (B) | 신뢰를 부여하는 주체의 공식 명칭을 정확히 표기해야 함. |
| `cta_message` (String) | CTA Button | Inner Text Content | 불안감을 해소하고 다음 행동을 제시하는 구체적인 문구여야 함. (예: '지금 무료 컨설팅 신청하기') |