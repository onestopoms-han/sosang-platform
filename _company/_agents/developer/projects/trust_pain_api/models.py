<file_content># Trust Widget 및 PainGauge 상태 변환 로직 (Phase 1)
def determine_trust_state(score: float) -> dict:
    """신뢰도 점수에 따른 상태 결정"""
    if score >= 80:
        return {"status": "trust", "message": "고유한 신뢰도를 구축하고 있습니다.", "color": "#2ecc71"}
    elif score >= 50:
        return {"status": "warning", "message": "신뢰도 유지에 주의가 필요합니다.", "color": "#f1c40f"}
    else:
        return {"status": "critical", "message": "신뢰도 저하 경보가 발령되었습니다.", "color": "#e74c3c"}

def determine_pain_state(level: float) -> dict:
    """위기감 점수에 따른 상태 결정"""
    if level <= 30:
        return {"severity": "safe", "message": "현재 운영 환경은 안정적입니다.", "color": "#2ecc71"}
    elif level <= 69:
        return {"severity": "warning", "message": "위험 신호가 감지되었습니다. 대비를 해주세요.", "color": "#f1c40f"}
    else:
        return {"severity": "danger", "message": "임계 위험 상태입니다. 즉시 대응이 필요합니다.", "color": "#e74c3c"}

</file_content>