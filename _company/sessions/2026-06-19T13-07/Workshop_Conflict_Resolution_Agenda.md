# 🗓️ Trust/Pain Score 매핑 규칙 최종 확정 워크숍 자료 (초안)

## 🎯 목표
Trust Widget 및 Pain Gauge의 기술적 구현 가능성(API)과 디자인 의도(UX) 간의 충돌 지점을 사전에 식별하고, 최종적인 매핑 규칙을 승인한다.

## 📋 아젠다 순서
1.  **[Designer] UX 핵심 메시지 재확인 (30분):** Trust/Pain Score 구간별 필수 메시지 및 시각적 변화(색상, 아이콘) 검토.
2.  **[Codari] API 로직 제약 조건 발표 (30분):** 현재 API 구조(`api_spec_v3_trust_pain.json`) 상에서 구현 가능한 응답 데이터의 범위와 제한 사항 보고.
3.  **[영숙/전체] Conflict Resolution & Final Decision (60분):**
    *   논리적 충돌 지점 식별 및 토론: *디자인 의도 A* vs *기술 구현 가능성 B*.
    *   최종 매핑 규칙 확정 및 승인.

## 📝 사전 검토 요청 사항 (Deliverables Checklist)
| 주체 | 제출 자료 | 내용 요약 | 담당자 | 마감 시한 |
| :--- | :--- | :--- | :--- | :--- |
| **Designer** | UX 가이드라인 및 에러 케이스 정의서 | 각 리스크 등급(A, B, C)에서 '절대' 누락되면 안 되는 핵심 메시지 3가지와 그 시각적 이유. (기술적 제약을 무시한 최적의 사용자 경험 기준). | Designer | 오늘 중 |
| **Codari** | API 로직 Constraint Report | 현재 JSON 스키마 기반으로 구현 가능한 매핑 규칙의 기술적 한계점 리스트. (예: 메시지 출력 시 최대 글자 수, 필수 포함 데이터 필드 등) | Codari | 오늘 중 |

---