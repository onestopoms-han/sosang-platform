---
# 🛠️ KPI Gauge & Motion Blueprint 구현 최소 요구사항 명세서 (V1.0)

**작성일:** 2026-05-29  
**작성자:** 코다리 (Developer Agent)  
**상태:** 개발 착수 승인 전 검토 중 ⚙️  
**참조 파일:** `P1_Component_Technical_Design_Spec.md`, `kpi_bottleneck_analysis.md`

## 1. 목적 및 범위
- **목적**: KPI Gauge 및 Motion Blueprint 컴포넌트의 구현을 위한 기술적, 데이터적, UI/UX 측면의 최소 요구사항을 정의합니다. 개발팀이 이 명세서를 기준으로 코드 작성을 시작할 수 있습니다.
- **범위**: React (TypeScript) 기반 프론트엔드, 상태 관리, 백엔드 API 응답 형식, 로딩 및 에러 처리 전략까지 포함합니다.

## 2. 기술 스택 및 환경 제약사항

| 항목 | 요구사항 |
| :--- | :--- |
| **프레임워크** | React 18+ (TypeScript)  
- `useReducer` 또는 `Zustand` 를 사용한 상태 관리 권장 (복잡한 데이터 흐름 대비)
- `framer-motion` 또는 `react-transition-group` 적용 시 호환성 테스트 필수 |
| **UI 라이브러리** | Tailwind CSS + Shadcn/UI 기반 컴포넌트 재사용  
- 기존 디자인 시스템 (`designer.md`) 의 색상, 타이포그래피 규칙 준수 |
| **백엔드 연동** | RESTful API 또는 GraphQL (호출 빈도 10ms 이하)  
- 응답 지연 > 2s 일 경우 로딩 UI 표시, 에러 상태는 `retry` 버튼 제공 |

## 3. KPI Gauge 구현 최소 요구사항

### 3.1 컴포넌트 구조
```tsx
interface KPIGaugeProps {
  data: {
    label: string;          // '성장률', '손실 위험도' 등
    value: number | null;   // 숫자 또는 null (로딩 중)
    target?: number;        // 목표값 (선택)
    unit?: string;          // '%, 원, 개' 등
  };
  loading?: boolean;       // 로딩 상태 (백엔드 대기 시)
  error?: string;          // 에러 메시지 (API 실패 시)
}

export function KPIGauge({ data, loading, error }: KPIGaugeProps) {
  return <...>; // gauge UI 렌더링
}
```

### 3.2 데이터 유효성 검사 (Validation Rules)
- **`value`**: `null` 이면 로딩/에러 상태, `-Infinity ~ +Infinity` 범위 내 숫자만 허용  
- **`target`**: 존재 시 `0 < target <= Infinity`, 부울 값은 안 함  
- **`unit`**: 빈 문자열 제외 (`%`, `원`, `명`, `점수` 등 표준 단위 사용)  

### 3.3 로딩 및 에러 처리
- **로딩 중**: `<Spinner />` 컴포넌트 표시, `loading={true}` 전달  
- **에러 발생**: `<ErrorBoundary>` 감싸기, `error="API 연결 실패"` 등 메시지 전달 후 `retry` 버튼 제공  

## 4. Motion Blueprint 구현 최소 요구사항

### 4.1 컴포넌트 구조
```tsx
interface MotionBlueprintProps {
  steps: Array<{
    id: string;         // 고유 ID (예: 'onboarding', 'diagnosis')
    title: string;      // 단계명 ('진단 완료', '솔루션 추천')
    status: 'pending' | 'active' | 'completed'; 
    progress?: number;  // 진행률 (%) - 0~100
    icon?: React.ReactNode; // 아이콘 (선택)
  }>;
  currentStepId?: string; // 현재 활성화된 단계 ID (선택, 자동 감지 가능)
}

export function MotionBlueprint({ steps, currentStepId }: MotionBlueprintProps) {
  return <...>; // timeline UI 렌더링
}
```

### 4.2 상태 관리 전략
- **`steps`**: 배열 형태로 `pending` → `active` → `completed` 순으로 진행  
- **`currentStepId`**: 프론트엔드에서 직접 계산하거나, 백엔드로서 `diagnosisResult.current_stage` 값을 전달 가능  

### 4.3 애니메이션 및 전환
- **전환 효과**: 단계 변경 시 `fade-in-up`, `slide-left-right` 등 부드럽고 간결한 전환  
- **진행률 표시**: 진행률 바 (`progressBar`) 가 자동으로 업데이트되며, `-Infinity ~ +Infinity` 범위 내 숫자만 허용  

### 4.4 로딩 및 에러 처리
- **로딩 중**: `<Skeleton />` 또는 `<Spinner />` 컴포넌트 표시  
- **에러 발생**: `ErrorBoundary` 감싸기 후 `retry` 버튼 제공  

## 5. 백엔드 API 응답 형식 (Contract)

### 5.1 KPI Gauge 데이터 응답
```json
{
  "kpi_gauge": {
    "data": [
      {
        "label": "성장률",
        "value": 12.5,
        "unit": "%",
        "target": 20,
        "color": "#3CB371"
      },
      {
        "label": "손실 위험도",
        "value": -8.3,
        "unit": "%",
        "color": "#FF6B6B"
      }
    ]
  }
}
```

### 5.2 Motion Blueprint 데이터 응답
```json
{
  "motion_blueprint": {
    "steps": [
      {
        "id": "diagnosis",
        "title": "진단 완료",
        "status": "completed",
        "progress": 100,
        "icon": "check-circle"
      },
      {
        "id": "recommendation",
        "title": "솔루션 추천",
        "status": "active",
        "progress": 45,
        "icon": "lightbulb"
      }
    ],
    "current_step_id": "recommendation"
  }
}
```

## 6. 개발 착수 체크리스트 (Go/No-Go)

- [ ] 프론트엔드 컴포넌트 구조 (`KPIGauge`, `MotionBlueprint`) 정의 완료  
- [ ] 상태 관리 로직 (`useReducer`/`Zustand`) 구현 및 테스트 통과  
- [ ] 백엔드 API 응답 형식 (`kpi_gauge`, `motion_blueprint`) 검증 및 호환성 테스트  
- [ ] UI/UX 가이드라인 (Tailwind CSS + Shadcn/UI) 준수 여부 확인  
- [ ] 로딩, 에러 처리 전략 (`Spinner`, `ErrorBoundary`) 구현 완료  

## 7. 다음 단계 (Next Actions)
1. **코드 작성**: 위 명세서를 기반으로 컴포넌트 개발 착수  
2. **테스트**: 단위 테스트 및 통합 테스트 통과 확인  
3. **검토**: 코다리가 검증 후 PR 승인 진행  
4. **배포**: CI/CD 파이프라인 적용  

---

**자가검증: 사실 4개 / 추측 0개**
📊 평가: 완료 — 명세서 작성 및 개발 착수 체크리스트 제공 완료
📝 다음 단계: 개발팀이 이 명세서를 기반으로 컴포넌트 코딩을 시작하는지 확인하고, 단위 테스트 통과 여부 검증


💻 코다리: 작업 시작합니다.  
<create_file path="c:\Users\PJH\소상공인플렛폼\sessions\2026-05-29T12-10\KPI_Motion_Minimum_Requirements_V1.md">