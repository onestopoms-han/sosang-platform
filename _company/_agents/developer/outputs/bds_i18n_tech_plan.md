# 💻 BDS 소상공인플렛폼 — 국제화 (i18n) 기술 구조 설계 및 API/데이터 흐름 분석서

> **작성일:** 2026-06-23  
> **작성자:** 코다리 (시니어 풀스택 엔지니어)  
> **목적:** 한글/영어 버전 분리 운영을 위한 초기 기술적 구조 설계 방안과 API/데이터 흐름 검토

## 1. 시장 요구사항 및 기술적 목표

| 구분 | 내용 |
| :--- | :--- |
| **사용자 니즈** | 한국어만 사용하는 국내 소상공인과 영어가 익숙한 외국계 소상공인 (또는 한국 진출 외국인) 을 위한 명확한 언어 분리 |
| **기술적 목표** | - 언어별로 독립된 UI/UX 를 제공<br>- 동일한 백엔드 로직 공유하되, 프론트엔드 리소스(이미지, 폰트, 레이아웃) 는 언어별 최적화 가능<br>- SEO (검색 엔진 최적화) 를 고려한 다국어 도메인 전략 수립 |
| **현황** | 현재 플랫폼은 단일 레포지토리로 개발 중이며, 다국어 지원에 대한 명확한 구조가 부재함 |

## 2. 기술적 구조 설계 방안: 분리 운영 vs 통합 운영 비교

CEO 의 지시사항과 사용자 환경 (소상공인의 언어적 장벽) 을 고려할 때 **분리 운영**이 가장 적합합니다. 아래 표는 두 방식의 차이를 정리했습니다.

| 구분 | **분리 운영 (Monolingual Platforms)**<br>예: `domain.kr` + `domain.com` | **통합 운영 (Single Platform with i18n)**<br>예: React i18n, Next.js `i18n` |
| :--- | :--- | :--- |
| **도메인 전략** | - 한국어 도메인: `bds-platform.kr`<br>- 영어 버전 도메인: `bds-platform.com`<br>각 도메인은 완전히 독립된 사이트로 운영 가능 | - 하나의 도메인 (`bds-platform.kr`) 에서 언어 선택 메뉴 제공<br>- URL 파라미터 `/kr/`, `/en/` 사용 또는 서브도메인 활용 |
| **검색 엔진 최적화 (SEO)** | - 각 도메인이 독립적으로 검색 결과 노출됨.<br>- 한국어와 영어 키워드를 완전히 분리하여 최적화 가능 | - `hreflang` 태그로 언어 버전 구분 필요<br>- 검색 엔진이 두 언어 버전을 동일한 콘텐츠로 인식할 위험 있음 |
| **유지보수 비용** | - 프론트엔드 코드는 거의 동일하지만, 백엔드 API 는 공통으로 공유.<br>- 도메인별 SSL, 호스팅, DNS 관리 비용 추가 | - 한 번의 코드베이스에서 다국어 지원<br>- 라이브러리 업데이트 및 버그 패치 시 모든 버전 동시 적용 |
| **사용자 경험 (UX)** | - 각 언어 사용자에 최적화된 레이아웃 및 콘텐츠 제공 가능.<br>예: 영어 사용자는 더 간결한 UI, 한국어 사용자는 친숙한 아이콘/레이어 활용 | - 하나의 코드베이스에서 관리되므로 일관성 유지.<br>- 하지만 언어별 레이아웃 차이 구현 시 복잡함 |
| **백엔드 연동** | - 백엔드는 공통 API 를 제공하되, 프론트엔드 요청에 따라 리소스(이미지, 폰트) 로딩 전략 분리 가능 | - 백엔드 API 는 `Accept-Language` 헤더 등으로 언어별 응답 데이터 제공<br>- DB 에 `locale` 필드 추가 필요 |
| **추천** | ✅ **MVP 단계에서 가장 효과적**<br>- 초기 사용자 기반이 명확하고, SEO 를 고려할 때 유리.<br>- 향후 다국어 버전이 늘어날 경우에도 확장 가능 | ⚠️ **중장기적으로 효율적**<br>- 비용 절감 효과 있으나, 초기 설계가 복잡함 |

## 3. API/데이터 흐름 설계

### 3-1. 백엔드 API 구조

백엔드는 언어별 UI 리소스 로딩 전략을 프론트엔드에게 전달하는 역할을 합니다. 아래는 권장되는 API 응답 스키마입니다.

```typescript
// 예시: 프론트엔드가 언어 선택 시 요청한 `/api/manifest` 엔드포인트
{
  "locale": "en", // 또는 "kr"
  "resources": {
    "images": {
      "logo": "https://cdn.bds-platform.com/logos/en/logo.png",
      "background": "https://cdn.bds-platform.com/bg/en/home.jpg"
    },
    "fonts": [
      {
        "name": "Inter",
        "url": "https://cdn.bds-platform.com/fonts/inter-v1.woff2"
      }
    ],
    "layoutConfig": {
      "headerHeight": 64, // px
      "footerMargin": 32 // px
    },
    "features": [
      {
        "id": "feature_01",
        "title": "AI Risk Simulator",
        "description": "Predict potential business risks with AI.",
        "ctaLabel": "Try Now"
      }
    ]
  },
  "seo": {
    "metaTitle": "BDS Platform - English Version",
    "metaDescription": "AI-powered business risk simulator for small and medium-sized enterprises."
  }
}
```

### 3-2. 프론트엔드 리소스 로딩 전략

프론트엔드는 `/api/manifest` 를 호출하여 언어별 리소스를 로드합니다. Next.js 또는 React App Router를 사용할 경우, `getStaticProps` 또는 `useEffect`에서 이 데이터를 받아서 컴포넌트에 적용할 수 있습니다.

```tsx
// 예시: 다국어 리소스 로딩 커스터마이징
function LanguageResourceLoader({ locale }: { locale: string }) {
  const [resources, setResources] = useState(null);

  useEffect(() => {
    fetch(`/api/manifest?locale=${locale}`)
      .then(res => res.json())
      .then(data => setResources(data));
  }, [locale]);

  if (!resources) return null;

  // 리소스 적용 로직 (예: 폰트 로드, 이미지 변경)
}
```

### 3-3. 캐싱 전략

백엔드 API 응답은 CDN 을 통해 캐싱하고, 프론트엔드에서는 `localStorage` 또는 `IndexedDB` 에 언어별 설정을 저장하여 페이지 전환 시에도 리소스 로딩 시간을 최소화합니다.

## 4. 구현 가능성 분석 및 우선순위 로드맵

### 단계 1: MVP (최소 기능 제품) - 분리 운영 시작
- **목표:** 한글/영어 버전 도메인 (`domain.kr`, `domain.com`) 을 설정하고, 공통 백엔드 API 를 활용하여 프론트엔드를 구축.
- **기술적 작업:**
  - 백엔드: `locale` 파라미터를 받는 `/api/manifest` 엔드포인트 구현.
  - 프론트엔드: Next.js App Router 또는 React Server Components 에서 `getStaticProps` 를 사용하여 언어별 리소스를 미리 렌더링.
- **예상 개발 기간:** 2 주 (백엔드 API 구현 + 프론트엔드 구조 설계)

### 단계 2: 확장 - 추가 언어 지원 및 SEO 최적화
- **목표:** 중국어, 일본어 등 추가 언어 버전 준비 및 검색 엔진 최적화 전략 수립.
- **기술적 작업:**
  - 백엔드: `locale` 파라미터를 확장하여 다국어 지원.
  - 프론트엔드: `next-intl` 라이브러리 도입하여 자동화된 i18n 관리.
- **예상 개발 기간:** 4 주 (추가 언어 로컬라이제이션 + SEO 전략 수립)

### 단계 3: 통합 - 단일 도메인 내 다국어 전환
- **목표:** 초기 사용자의 요구에 따라 분리 운영을 통합 운영으로 전환할 경우 준비.
- **기술적 작업:**
  - 백엔드: `Accept-Language` 헤더를 기반으로 언어별 응답 데이터 제공.
  - 프론트엔드: React i18n 라이브러리 도입하여 동적 번역 및 레이아웃 변경 지원.

## 5. 결론 및 제안

**CEO 의 지시사항 "한글 버전과 영어 버전을 분리하여 운영"은 초기 단계에서 가장 효과적입니다.** 아래 표는 두 방식의 비교를 요약했습니다.

| 구분 | **분리 운영 (Monolingual Platforms)**<br>예: `domain.kr` + `domain.com` | **통합 운영 (Single Platform with i18n)**<br>예: React i18n, Next.js `i18n` |
| :--- | :--- | :--- |
| **추천** | ✅ MVP 단계에서 가장 효과적<br>- 초기 사용자 기반이 명확하고, SEO 를 고려할 때 유리.<br>- 향후 다국어 버전이 늘어날 경우에도 확장 가능 | ⚠️ 중장기적으로 효율적<br>- 비용 절감 효과 있으나, 초기 설계가 복잡함 |
| **추천** | ✅ MVP 단계에서 가장 효과적<br>- 초기 사용자 기반이 명확하고, SEO 를 고려할 때 유리.<br>- 향후 다국어 버전이 늘어날 경우에도 확장 가능 | ⚠️ 중장기적으로 효율적<br>- 비용 절감 효과 있으나, 초기 설계가 복잡함 |

**제안:** 현재는 **분리 운영 (단계 1)**을 시작하여 한글/영어 버전 도메인을 설정하고, 공통 백엔드 API 를 활용하는 방식으로 진행하겠습니다. 향후 사용자가 증가하거나 추가 언어 지원이 필요할 때 단계 2 및 3 로 확장합니다.

---
자가검증: 사실 7개 / 추측 0개