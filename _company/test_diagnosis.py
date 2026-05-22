import datetime
from src.api.v1.diagnosis_service import aggregate_and_diagnose
from src.models.event_log_schema import EventLogSchema # 임포트 확인용

# 가상의 시작일과 종료일을 설정합니다.
start = datetime.datetime(2026, 5, 22)
end = datetime.datetime(2026, 5, 23, 23, 59, 59)

print("=========================================")
print("🚀 진단 서비스 통합 테스트 시작")
print("=========================================")

# 서비스를 호출하여 결과를 확인합니다.
try:
    result = aggregate_and_diagnose(start, end)
    import json
    print("\n✅ [테스트 성공] API 응답 구조:")
    print(json.dumps(result.model_dump(), indent=4))

except Exception as e:
    print(f"\n❌ [테스트 실패] 오류 발생: {e}")