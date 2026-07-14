import React, { useState } from 'react';
import './LandingPage.css'; // CSS 파일을 연결합니다.

// --- Mock Data & API Simulation ---
const mockData = {
    painLevel: 80, // Initial high pain level
    storyStep: 1, // Current story step (1: Pain -> 2: Promise -> 3: Control)
    originData: null, // Placeholder for Origin Transparency Data
};

// Mock API Call Simulation Function
const fetchOriginData = async () => {
    console.log("API 호출 시뮬레이션: 원산지 데이터 로딩 시작...");
    await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5초 지연 시뮬레이션

    // 실제 API 응답 시뮬레이션 (성공/실패 케이스 포함)
    if (Math.random() > 0.1) { // 90% 성공 가정
        const data = {
            provenance: "중국 산림 생태계 기반 인증",
            traceability: "씨앗부터 포장까지 실시간 추적 가능",
            sustainabilityScore: 95,
            certificateUrl: "#" // 실제 URL로 대체될 부분
        };
        return data;
    } else {
        throw new Error("데이터 로딩 실패: 원산지 데이터베이스 연결 오류.");
    }
};

// Mock Redirection Function
const handleCtaClick = (nextStep) => {
    console.log(`CTA 클릭 감지: 다음 단계로 이동 시도 (${nextStep})`);
    // 실제 구현에서는 여기서 Next.js의 router.push 등을 사용합니다.
    alert(`다음 단계(${nextStep})로 리다이렉트 시뮬레이션 실행. (실제 페이지는 미구현)`);
};

const LandingPage = () => {
    const [pain, setPain] = useState(mockData.painLevel);
    const [story, setStory] = useState(mockData.storyStep);
    const [isLoading, setIsLoading] = useState(false);
    const [originInfo, setOriginInfo] = useState(null);

    const handleLoadOrigin = async () => {
        setIsLoading(true);
        try {
            const data = await fetchOriginData();
            setOriginInfo(data);
            console.log("원산지 데이터 로딩 성공:", data);
        } catch (error) {
            console.error("데이터 로딩 에러 발생:", error);
            alert("데이터를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleNextStep = () => {
        setStory(prev => prev + 1);
        // 다음 단계로 이동 시, PainGauge 상태 변화 로직을 여기에 추가할 예정입니다.
    };


    return (
        <div className="landing-page">
            {/* Section 1: Hero - Emotion & Pain Gauge */}
            <header className="hero-section">
                <h1 className="main-headline">통제된 럭셔리: 희소성으로 증명된, 태고의 풍미를 소유하는 경험.</h1>
                
                {/* PainGauge Integration Simulation */}
                <div className="pain-gauge-container">
                    <div className={`pain-gauge ${pain > 70 ? 'high' : 'medium'}`}>
                        <span className="pain-text">{pain}%</span>
                        <p className="pain-label">현재 당신의 통제권 수준</p>
                    </div>
                </div>

                {/* Primary CTA */}
                <button className="cta-primary" onClick={() => handleNextStep()}>
                    시스템으로 통제권 확보하기 &rarr;
                </button>
            </header>

            {/* Section 2: The Pain & The Promise - Logic & Transparency */}
            <section className="promise-section">
                <h2>불확실성을 넘어, 데이터로 증명합니다.</h2>
                <div className="content-grid">
                    <div className="pain-visualization">
                        <h3>당신의 불확실성 (Pain Visualization)</h3>
                        {/* 이 영역에 PainGauge의 시각화된 그래프가 들어갑니다. */}
                        <p>데이터를 통해 위험을 명확히 인지하고, 해결책을 선택하세요.</p>
                    </div>
                    <div className="logic-details">
                        <h3>원산지 투명성 증명 (Origin Transparency Proof)</h3>
                        {isLoading ? (
                            <div className="loading-state">데이터를 불러오는 중... ⚙️</div>
                        ) : originInfo ? (
                            <div className="data-display">
                                <p>✅ **Provenance:** {originInfo.provenance}</p>
                                <p>🔬 **Traceability:** {originInfo.traceability}</p>
                                <p>📈 **Sustainability Score:** {originInfo.sustainabilityScore}%</p>
                                <a href={originInfo.certificateUrl} className="cta-secondary">인증서 확인하기 &rarr;</a>
                            </div>
                        ) : (
                            <button className="load-data-btn" onClick={handleLoadOrigin} disabled={isLoading}>
                                {isLoading ? '로딩 중...' : '원산지 데이터 즉시 요청'}
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer / Next Step CTA */}
            <footer className="footer-cta">
                 <p>다음 단계: <span className="next-action">{story === 1 ? "해결책 도입" : story === 2 ? "통제권 확보" : "최종 행동"}</span></p>
                <button className="cta-final" onClick={() => handleCtaClick(story + 1)}>
                    다음 단계로 진행하기 &rarr;
                </button>
            </footer>
        </div>
    );
};

export default LandingPage;