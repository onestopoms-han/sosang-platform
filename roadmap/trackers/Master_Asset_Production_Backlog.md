# 🚀 통합 자산 제작 최종 백로그 (V1.0)
## 목적
모든 채널(YouTube, Instagram, 플랫폼 UI) 콘텐츠에 필요한 시각적 에셋 제작 및 기술 구현의 우선순위를 확정하고, 개발팀이 즉시 실행할 수 있는 태스크 목록을 제공합니다. 본 로드맵은 최종 생산 실행 미팅의 핵심 검토 자료입니다.

---
### 🎯 I. 에셋 분류 기준 정의 (Priority & Complexity)
*   **🔴 P1 (Critical / 필수):** 플랫폼의 핵심 가치 전달 및 기능 구현에 필수적인 최소 단위 자산. **가장 먼저 개발되어야 함.** (예: Pain $\rightarrow$ Solution 트랜지션, KPI 데이터 연동 시각화)
*   **🟡 P2 (High Priority / 중요):** 콘텐츠의 완성도와 사용자 경험(UX)을 높이는 중요한 보조 자산. 기술적 구현이 가능하며 일정에 여유가 생기면 진행. (예: 특정 기능 상세 설명 컷, 감성적인 배경 모션)
*   **🟢 P3 (Optional / 선택):** 디자인적으로 매력적이지만, 당장 서비스 출시에는 영향을 주지 않는 부가 자산.

---
### 💡 II. 콘텐츠별 통합 에셋 제작 태스크 목록

#### A. [플랫폼 UI 핵심 컴포넌트] - 가장 높은 개발 우선순위 (Codari + Designer)
| Asset Name | 요구 사양 및 내용 | Priority | 담당 Agent | 기술적 검토 항목 (Codari) | 비고 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **KPI Gauge 컴포넌트** | 데이터 기반의 '통제감' 지표 시각화. (예: 매출 추이, 리스크 감소율). 애니메이션 타이밍 명세서 준수 필수. | 🔴 P1 | Designer $\rightarrow$ Codari | 데이터 연동 로직 안정성 (KPI Gauge 구현 완료 여부) 및 모션 스펙(Timing) 검증. | **핵심 자산.** 이 컴포넌트가 전체 UX의 근간이 됩니다. |
| **Producer Story Form** | 생산자의 스토리텔링을 유도하는 입력 폼. 각 섹션별 인터랙션(Hover, Submit Feedback 등) 디자인 확정 필요. | 🔴 P1 | Designer $\rightarrow$ Codari | JSON Schema를 준수한 데이터 전송 및 클라이언트 측 유효성 검증 로직 연동. | 스토리 수집의 첫 관문입니다. |
| **메인 페이지 가이드** | 플랫폼 핵심 기능(Story 업로드, 컨설팅 예약 등)을 한눈에 보여주는 레이아웃 컴포넌트 세트. | 🟡 P2 | Designer | 반응형 웹 디자인 및 로딩 스피드 최적화 검토. | UI 완성도 높이기. |

#### B. [YouTube 콘텐츠] - 감정 전환 시각화 자산 (Designer + Codari)
| Asset Name | 요구 사양 및 내용 | Priority | 담당 Agent | 기술적 검토 항목 (Codari) | 비고 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Pain $\rightarrow$ Solution Transition Clip** | 소상공인의 불안(경고색/흔들림)에서 플랫폼 사용 후 안정감(안정색/규칙성)으로 전환되는 모션 시퀀스. (15초 분량 핵심 클립) | 🔴 P1 | Designer $\rightarrow$ Motion Graphics | 트랜지션 애니메이션의 프레임별 구현 가능 여부 및 데이터 기반 움직임 적용 검증. | **가장 중요한 비주얼 자산.** |
| **핵심 메시지 그래픽 세트** | '데이터를 통해 통제감을 되찾다' 등 핵심 카피에 대응하는 간결한 모션 인포그래픽 3종. | 🟡 P2 | Designer $\rightarrow$ Motion Graphics | 텍스트 애니메이션 타이밍과 싱크(Sync) 검증. | 후킹 포인트 강화용. |

#### C. [Instagram/SNS 콘텐츠] - 포스팅 및 릴스 에셋 (Designer + Instagram Agent)
| Asset Name | 요구 사양 및 내용 | Priority | 담당 Agent | 기술적 검토 항목 (Codari) | 비고 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **카로셀 템플릿 세트** | 소상공인의 문제점 제시 $\rightarrow$ 해결책 제시의 구조화된 시각 자료. (3~5장 분량) | 🔴 P1 | Designer | 이미지와 텍스트가 결합되는 레이아웃의 일관성 유지 여부. | 즉시 활용 가능한 마스터 템플릿 필요. |
| **릴스 영상용 모션 클립** | 특정 기능이나 데이터를 짧고 강렬하게 보여주는 숏폼 비주얼 에셋 (5~7초). | 🟡 P2 | Designer $\rightarrow$ Motion Graphics | 빠른 전환 속도에 적합한 트랜지션 및 사운드 연동 지점 확인. | 임팩트 강화용. |

---
### 🔍 III. 개발 태스크와 디자인 리소스 간의 연결 (Designer Self-Check)
1.  **Pain $\rightarrow$ Solution Transition Clip (P1)**을 제작하기 위해, **KPI Gauge 컴포넌트 (P1)**가 *실제 작동하는* 형태로 먼저 존재해야 합니다.
2.  따라서, 이번 주 개발 목표는 **'핵심 로직 구현(Codari) $\rightarrow$ 핵심 자산 테스트 환경 제공(Codari) $\rightarrow$ 이를 기반으로 하는 최종 모션 그래픽 제작(Designer)'** 순서로 진행되어야 합니다.