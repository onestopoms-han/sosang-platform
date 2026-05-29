# 🔊 BDS 콘텐츠 제작 - 오디오 스토리보드 및 자산 매니페스트 (V1.0)

## 📌 목표
소상공인의 감정적 여정을 사운드로 증폭시켜, 시각적 메시지(Pain $\rightarrow$ Solution)의 몰입도를 극대화한다. 이 문서는 모든 콘텐츠 제작팀의 **최종 청취 가이드**이다.

---

### I. 🎵 배경음악 (BGM - Background Music) 전략
| 구간 | 감정 상태 | 역할/분위기 | 추천 사운드 키워드 | 전환 지점 |
|------|-----------|--------------|---------------------|----------|
| **A** | Pain (문제 제기) | 긴장감, 불안함. 리듬은 빠르나 멜로디가 없는 저음의 불협화음. | Tension, Minor Key, Low Frequency Pulse, Clock Ticking | [Transition Point] |
| **B** | Solution (발견/전환) | 극적인 고조(Build-up). 침묵 후 점진적 상승하는 현악기 사운드. | Rising Swell, Cinematic Build, Hopeful Chord Progression | [Moment of Truth] |
| **C** | Growth (성공/안정) | 밝고 경쾌하며 자신감 있는 톤. 희망과 안정감을 주는 미디엄 템포의 어쿠스틱 사운드. | Uplifting, Major Key, Corporate Pop, Gentle Synth Pad | - |

---

### II. 💥 음향 효과 (SFX - Sound Effects) 매핑
모션 블루프린트와 연동하여 발생하는 구체적인 '사건'에 대한 청각적 반응을 정의합니다.

| 발생 시점/이벤트 | 모듈 컴포넌트 | 사운드 유형 | 상세 스펙 및 역할 |
|-------------------|---------------|--------------|--------------------|
| **Pain 시작** (슬라이드 1) | KPI Gauge Red Zone 진입 | `[SFX: 경고음]` | 날카롭고 짧은 고주파음. 청취자에게 위협을 인지시킴. (Duration: 0.5초) |
| **데이터 변화 감지** | 데이터가 급격히 하락/상승할 때 | `[SFX: Data Fluctuation]` | 빠르고 거친 '스우시(Whoosh)' 사운드와 함께 낮은 떨림을 추가. (Directional, Low End) |
| **솔루션 제시 순간** (핵심 전환) | Red $\rightarrow$ Green으로 변할 때 | `[SFX: A-HA Moment]` | 짧은 '진동음(Resonance)'과 동시에 웅장하게 커지는 화음. 모든 긴장을 해소시키는 역할. (Impact, Wide Stereo Field) |
| **CTA 버튼 클릭** | 최종 행동 유도 시 | `[SFX: Click/Confirmation]` | 명확하고 경쾌한 '딸깍' 소리. 신뢰감을 주며 다음 단계로의 확신을 심어줌. |

---

### III. 🚀 통합 콘텐츠 제작 로드맵 업데이트
| 활동 | 산출물 (Artifact) | 담당 에이전트/팀 | 기한 (Target Date) | 비고 (다음 액션) |
|------|-------------------|------------------|--------------------|-----------------|
| **1단계: 오디오 자산 확보** | BGM/SFX 원본 파일 셋업 | 외부 사운드 디자이너/에이전트 | T+5일 | `audio_asset_list.json` 형태로 확정 요청 |
| **2단계: 콘텐츠 제작 및 애니메이션** | 최종 영상 에셋 (YouTube, Reels) | 레오(영상), Instagram 팀 | T+10일 | 오디오 스토리보드에 맞춰 컷별 사운드 트랙링 진행 |
| **3단계: 통합 검토 및 배포** | Final Content Package & QA | 모든 팀 | T+15일 | 최종 청각적/시각적 경험 테스트 (리허설) |

---