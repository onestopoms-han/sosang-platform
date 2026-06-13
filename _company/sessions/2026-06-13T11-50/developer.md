# 💻 코다리 — 플랫폼 Go-Live 전 기술 안정성 보고서와 디자인 승인 자료(`designer.md`, `developer.md`)를 통합하여, 최종 QA 발표에 포함될 '기술적 신뢰도 입증' 섹션의 핵심 논리와 데이터 흐름을 재점검하고 시각적 일관성을 코드로 검증할 준비를 하라.



💻 코다리: Go-Live 전 '기술적 신뢰도 입증' 섹션을 위한 통합 검증 도구 개발을 시작합니다. 먼저 현재 워크스페이스의 핵심 자료(`developer.md`, `designer.md`) 와 관련 스토리보드를 확인하겠습니다.

<list_files path="C:\Users\PJH\소상공인플렛폼\_company"/>
<glob pattern="**/*.{md,ts,py}"/>

---
## 📁 파일 액션 결과

📂 목록: ~\소상공인플렛폼\_company/
```
📁 00_Raw/
📄 ActionPlan_QA_Finalization_Memo.md
📁 action_plan_service/
📁 agents/
📁 api/
📁 approvals/
📁 backend/
📄 BDS_Final_Visual_Asset_Handoff_Guide.md
📄 BDS_Integrated_Design_System_v3.0.md
📄 BDS_Integrated_Standard_Audit_Report_v1.0.md
📄 ComponentSpec_V3.0_SafetyMargin.md
📄 Daily_Briefing_Report_2026-06-01.md
📁 data/
📁 DecisionLogs/
📁 design/
📄 design_review_final_guideline.md
📄 Design_SignOff_Checklist_KPI_v1.0.md
📁 design_system/
📄 Design_System_V1.0_Manual.md
📄 diagnosis_input_schema.ts
📄 Draft_Guidebook_v1.0_소상공인_생존매뉴얼.md
📄 e2e_test_suite.py
📄 final_asset_inventory_and_guide_v1.0.md
📄 final_insta_caption_set.md
📄 final_lp_copy.md
📄 Final_Onboarding_Manual_v1.0_DRAFT.md
📄 final_review_for_coder.md
📄 final_visual_review_checklist_v3.md
📄 final_visual_review_checklist_v4.md
📄 Form_Build_Plan_v2.md
📄 KPI_Dev_Spec.md
📄 KPI_Dev_Spec_Final_Verification_Plan.md
📄 KPI_Master_Sheet.xlsx
📁 marketing/
📄 Marketing_Assets_Final_Consistency_Checklist_v1.0.md
📁 mock_data/
📄 mock_data.json
📄 Monetization_Strategy_Final_Roadmap.md
📄 PaymentFailure_Component_Dictionary_v2.md
📄 PaymentFailure_Component_Library_Handoff.md
📄 PaymentFailure_Upsell_Mockup_Guide.md
📄 Payment_Failure_Screen_Final_Design_System_Spec.md
📄 PilotTest_Execution_Checklist_v1.0.md
📄 Pilot_Launch_Roadmap_v2.0.md
📁 projects/
📄 QA_Meeting_Plan_v1.md
📄 SafetyMargin_Interaction_Design_System_v1.md
📁 scripts/
📁 services/
📁 sessions/
📄 Shiitake_MealKit_Master_Plan.md
📁 specs/
📁 src/
📄 TechnicalFeasibilityReport_V2.md
📁 tests/
📄 test_diagnosis.py
📄 test_e2e_funnel.py
📄 TrendGraph_Mockup_Spec_V1.md
📄 UserFlowMap_V2.0_SafetyMargin.md
📄 UserJourneyMap_BDS_v1.md
📄 user_paywall_strategy_final_v1.md
📁 _agents/
📁 _shared/
```
🔎 glob `**/*.{md,ts,py}` (c:\Users\PJH\소상공인플렛폼): 0개
```
_(매칭 없음)_
```

[시스템: list_files 결과]
디렉토리: ~\소상공인플렛폼\_company/
📁 00_Raw/
📄 ActionPlan_QA_Finalization_Memo.md
📁 action_plan_service/
📁 agents/
📁 api/
📁 approvals/
📁 backend/
📄 BDS_Final_Visual_Asset_Handoff_Guide.md
📄 BDS_Integrated_Design_System_v3.0.md
📄 BDS_Integrated_Standard_Audit_Report_v1.0.md
📄 ComponentSpec_V3.0_SafetyMargin.md
📄 Daily_Briefing_Report_2026-06-01.md
📁 data/
📁 DecisionLogs/
📁 design/
📄 design_review_final_guideline.md
📄 Design_SignOff_Checklist_KPI_v1.0.md
📁 design_system/
📄 Design_System_V1.0_Manual.md
📄 diagnosis_input_schema.ts
📄 Draft_Guidebook_v1.0_소상공인_생존매뉴얼.md
📄 e2e_test_suite.py
📄 final_asset_inventory_and_guide_v1.0.md
📄 final_insta_caption_set.md
📄 final_lp_copy.md
📄 Final_Onboarding_Manual_v1.0_DRAFT.md
📄 final_review_for_coder.md
📄 final_visual_review_checklist_v3.md
📄 final_visual_review_checklist_v4.md
📄 Form_Build_Plan_v2.md
📄 KPI_Dev_Spec.md
📄 KPI_Dev_Spec_Final_Verification_Plan.md
📄 KPI_Master_Sheet.xlsx
📁 marketing/
📄 Marketing_Assets_Final_Consistency_Checklist_v1.0.md
📁 mock_data/
📄 mock_data.json
📄 Monetization_Strategy_Final_Roadmap.md
📄 PaymentFailure_Component_Dictionary_v2.md
📄 PaymentFailure_Component_Library_Handoff.md
📄 PaymentFailure_Upsell_Mockup_Guide.md
📄 Payment_Failure_Screen_Final_Design_System_Spec.md
📄 PilotTest_Execution_Checklist_v1.0.md
📄 Pilot_Launch_Roadmap_v2.0.md
📁 projects/
📄 QA_Meeting_Plan_v1.md
📄 SafetyMargin_Interaction_Design_System_v1.md
📁 scripts/
📁 services/
📁 sessions/
📄 Shiitake_MealKit_Master_Plan.md
📁 specs/
📁 src/
📄 TechnicalFeasibilityReport_V2.md
📁 tests/
📄 test_diagnosis.py
📄 test_e2e_funnel.py
📄 TrendGraph_Mockup_Spec_V1.md
📄 UserFlowMap_V2.0_SafetyMargin.md
📄 UserJourneyMap_BDS_v1.md
📄 user_paywall_strategy_final_v1.md
📁 _agents/
📁 _shared/

[시스템: glob 결과]
패턴: **/*.{md,ts,py}
루트: c:\Users\PJH\소상공인플렛폼
매치 0개:
_(매칭 없음)_
