# 🎨 BDS 소상공인 플랫폼 최종 시각 자산 인벤토리 및 사용 가이드라인 (V1.0)

## 🎯 목적
본 문서는 QA 발표용 스토리보드와 개발팀의 기술적 구현을 완벽하게 동기화하기 위해 작성된 **최종 공식 디자인 승인 자료**입니다. 모든 컴포넌트, 시각 요소, 정보 구조는 본 가이드라인을 따릅니다.

## 🗓️ 1. QA 발표 흐름 기반 핵심 메시지 매핑 (Story Flow Map)
(발표 순서에 따라 어떤 데이터가 어떤 비주얼로 변환되어야 하는지를 정의합니다.)

| 단계 | 스토리텔링 목표 (Goal) | 활용 컴포넌트 (Component) | 필수 시각 자산 (Asset Required) | 논리적 연결 고리 (Linkage) |
| :---: | :---: | :---: | :---: | :---: |
| **도입** | 소상공인의 어려움 공감 유도 | PainGauge (Pain/Need) | 1. 'Pain' 그래프 시각화 (가장 높은 지점 강조) <br> 2. 대표적 문제 키워드 리스트 | [데이터] -> [시각적 충격] |
| **핵심** | BDS 플랫폼의 가치 입증 및 신뢰 구축 | Trust Widget (Trust/Solution) | 1. 핵심 가치(신뢰, 지역성)를 담은 아이콘 세트 <br> 2. 데이터 출처 명시 섹션 레이아웃 | [문제] -> [해결책 제시] |
| **전환** | 실제 참여 프로세스 소개 (사용자 여정) | ProducerStoryForm (Data Input Flow) | 1. 스토리텔링 가이드라인 예시 이미지 <br> 2. 데이터 수집 필드(Field)의 흐름도/와이어프레임 | [개념] -> [실행 가능성] |
| **결론** | 비즈니스 모델 및 기대 효과 제시 | Proposal View (Outcome) | 1. 수익화 시나리오 다이어그램 <br> 2. KPI 측정 대시보드 Mockup | [실행] -> [최종 가치 증명] |

## 🎨 2. 핵심 컴포넌트 상세 스펙 및 상태 정의 (Component Specification & State)
(개발팀이 반드시 참조해야 할 시각적/기술적 사양을 확정합니다.)

### 2.1 PainGauge Component (V3.0 최종 승인 버전)
*   **기능:** 소상공인의 문제점 심층 측정 및 시각화.
*   **필수 상태 정의 (State):**
    *   `Default State`: 기본 레이아웃, 최대 가용 공간 확보.
    *   `Focus State`: 발표 중 가장 높은 'Pain' 지점을 빨간색 강조 박스로 지정하며 텍스트 애니메이션 적용 (기술 구현 필수).
    *   `Empty State`: 데이터 부재 시 빈칸 처리 방식(Placeholder) 명확화.

### 2.2 Trust Widget Component (V2.0 최종 승인 버전)
*   **기능:** BDS가 제공하는 신뢰 지표와 지원 활동을 시각적으로 증명.
*   **필수 상태 정의 (State):**
    *   `Initial State`: 로고 및 3대 핵심 가치(신뢰, 지역성, 연결)의 배지 형태 표시.
    *   `Interactive State`: 마우스 오버 시 간략한 설명(Tooltip)이 나타나도록 구현 (UX 필수).

## ✨ 3. 결론 및 개발팀 요구사항 (Developer Requirements for Report Integration)
*   **[Visual Asset Checklist]**: QA 발표 자료에 사용된 모든 이미지와 그래프는 본 가이드라인의 스펙을 준수해야 하며, 원본 소스 파일(SVG/PNG) 경로를 명확히 기술 보고서에 첨부할 것.
*   **[Interactivity Requirement]**: 단순 정적 이미지가 아닌, **'Focus State'와 'Interactive State'가 구현된 컴포넌트 시연 영상 또는 코드 레벨 설명**을 최종 QA 보고서에 반드시 포함하여 개발의 완성도를 입증해야 함.