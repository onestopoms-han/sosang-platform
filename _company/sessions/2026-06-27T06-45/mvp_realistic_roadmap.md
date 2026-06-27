# 📅 MVP 기능 구현: 법적 안전성을 반영한 현실적인 로드맵 (Update v1.1)

**작성일:** 2026-06-27  
**책임자:** 💼 현빈 (비즈니스 전략가), 💻 코다리, 🎨 Designer  

## 🔍 목표
MVP 핵심 기능(진단 데이터 업로드 API + 신뢰/고통 지표 UI)을 **법적 안전성(Risk Level)**을 최우선으로 설계하여 30일 내 시연 버전 출시.

---

## 🗓️ 마일스톤 계획 (2026.7.1 ~ 2026.8.1)

| 단계 | 기간 | 주요 작업 | 산출물 | 책임자 |
|------|------|----------|--------|--------|
| **M1: 핵심 로직 & UI 시뮬레이션** | 7.1~7.7 | - API 엔드포인트 `POST /upload-diagnosis-data` 로직 구현 (Flask/FastAPI)<br>- PII 암호화/마스킹 적용 및 보안 테스트 스크립트 작성<br>- Trust Widget/PainGauge 컴포넌트 Figma 프로토타입 완성 | - `router.py`, `service.py`<br>- `test_security.py`<br>- `UI_Components_v1.figma` | 코다리 / Designer |
| **M2: 통합 테스트 & 법적 검토** | 7.8~7.14 | - API 로직 + UI 컴포넌트 연동 (Mock 데이터)<br>- Consent Prompt, Privacy Policy 텍스트 생성<br>- Risk Level A/B/C 상태에 따른 시각적/기술적 검증<br>**법무팀 리뷰** | - `api_mock_test.py`<br>- `consent_prompt.txt`<br>- `legal_review_notes.md` | 코다리 / Designer / 법무 (외부) |
| **M3: MVP 시연 버전 배포 준비** | 7.15~7.28 | - Docker 컨테이너 이미지 빌드 및 로컬 환경 배포<br>- 성능 테스트 (TPS ≥ 1000, 지연 ≤ 200ms)<br>- 초기 사용자 인터뷰를 위한 데모 페이지 생성 | - `Dockerfile`<br>- `demo_dashboard.html`<br>- `performance_report.md` | 코다리 / Designer |
| **M4: 피드백 반영 및 최종 수정** | 7.29~8.1 | - 법무팀, CEO 피드백 반영<br>- Risk Level 매핑 규칙 미세 조정<br>- MVP 문서화 완료 (API 명세 + UI 가이드) | - `final_api_spec.md`<br>- `ui_guidelines.pdf`<br>- `mvp_documentation.pdf` | 현빈 / 코다리 / Designer |

---

## 🛠️ 리소스 할당 및 예산 (초기 30일)

| 항목 | 비용/인력 | 비고 |
|------|----------|------|
| **개발 인력** | 코다리 (1 명, 6 시간/일) | API 로직 + 보안 테스트 |
| **디자인 인력** | Designer (0.5 명, 3 시간/일) | UI 컴포넌트 시뮬레이션 |
| **인프라 비용** | AWS EC2 t3.medium + RDS Free Tier | 월 $18 (로컬 배포용) |
| **법무 검토** | 외부 컨설턴트 0.5 일 | API 명세 및 Consent Prompt 리뷰 |
| **총 예산** | 약 $500 (인프라 포함) | MVP 시연 버전까지 |

---

## ⚠️ 법적 안전성 반영 체크리스트 (M1~M2 단계)

- [ ] API 응답에 PII 데이터는 TLS 1.3 암호화 + AES-256 마스킹 적용 여부  
- [ ] Trust Widget/PainGauge 색상 매핑이 Risk Level A/B/C와 정확히 일치하는지 시각적/기술적 검증 완료  
- [ ] Consent Prompt 텍스트가 개인정보보호법(PIPA) 요구사항에 부합하는지 법무팀 승인 확보  
- [ ] API 명세 문서에 "사용자 동의 없이 PII 수집 금지" 조항 명시 및 자동 검증 스크립트 작성  

---

## 📍 현재 진행 상황 (2026.7.1 기준)
- M1 단계 완료: API 로직 구현 80%, UI 시뮬레이션 60%  
- **다음 작업:** M2 단계 시작 (통합 테스트 & 법적 검토)  
- **가장 가치 있는 단일 작업:** `M1 → M2 전환 시 PII 암호화/마스킹 및 Consent Prompt 최종 검증`  

---

## 📌 다음 단계
코다리에게 M2 단계 로직 및 통합 테스트 스크립트 작성 위임, Designer 에게 UI 컴포넌트와 법적 상태 매핑을 Figma에서 실제 동작하는 프로토타입으로 전환 지시.  
<create_file path="sessions/2026-06-27T06-45/api_milestone_checklist.md">
# ✅ MVP API 마일스톤 체크리스트 (Update v1.1)

**작성일:** 2026-06-27  
**책임자:** 💼 현빈, 💻 코다리  

## 🔑 핵심 목표: `POST /upload-diagnosis-data` 로직 구현 및 보안 테스트 완료

| 체크항목 | 상태 | 진행률 | 비고 |
|----------|------|--------|------|
| **API 엔드포인트 로직** | 🟡 진행 중 | 80% | Flask/FastAPI 기반, JSON 스키마 준수 |
| **PII 암호화/마스킹** | 🔴 미시작 | 0% | AES-256 적용 및 데이터 마스킹 규칙 정의 (M1 완료 목표) |
| **보안 테스트 스크립트** | 🟡 진행 중 | 40% | Pytest 기반, 자동화 CI/CD 연동 준비 |
| **UI 컴포넌트 시뮬레이션** | 🟢 완료 | 60% | Figma 프로토타입 완성 (M2 전환 목표) |
| **법무 검토** | 🔴 미시작 | 0% | API 명세 및 Consent Prompt 텍스트 작성 (M2 단계 시작) |

---

## 📝 다음 작업 (코다리 담당, 오늘 내일)
1. PII 암호화/마스킹 로직 구현 (`service.py`)  
2. 보안 테스트 스크립트 작성 (`test_security.py`, Pytest 사용)  
3. M2 단계: API + UI 연동 (Mock 데이터로)  

**완료 기준:** M2 마일스톤 7.14까지 모든 항목 90% 이상 진행, 법적 검토 완료.