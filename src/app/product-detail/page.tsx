import { useState, useEffect, useCallback } from 'react';

// Define schemas inline to avoid dependency issues
interface StoryFlowStep {
    stepId: number;
    title: string;
    description: string;
}

interface StoryFlowSchema {
    productId: string;
    productName: string;
    traceabilityScore: number;
    riskLevel: string;
    premiumValueProposition: {
        timeSaved: string;
        defectReduction: string;
        traceabilityDetails: string;
    };
    storyFlowSteps: StoryFlowStep[];
}

// 1. Mock API Service (실제로는 백엔드 API 호출로 대체됨)
const apiService = {
    fetchProductData: async (productId: string): Promise<StoryFlowSchema> => {
        console.log(`[API] Fetching data for Product ID: ${productId}`);
        await new Promise(resolve => setTimeout(resolve, 500)); // 네트워크 지연 시뮬레이션
        
        return {
            productId: productId,
            productName: "프리미엄 송이버섯 세트",
            traceabilityScore: 92, // 신뢰도 점수 (0-100)
            riskLevel: "Moderate", // 리스크 수준 (Low, Moderate, High)
            premiumValueProposition: {
                timeSaved: "30%",
                defectReduction: "15%",
                traceabilityDetails: "농장부터 식탁까지 완벽 추적"
            },
            storyFlowSteps: [
                { stepId: 1, title: "원료 선택", description: "최상급 재배 환경 확인" },
                { stepId: 2, title: "생산 과정 모니터링", description: "AI 기반 실시간 변수 추적" },
                { stepId: 3, title: "결과 검증 및 피드백", description: "최종 품질 인증" },
            ]
        };
    }
};

// 2. Trust Widget 컴포넌트 (시각화 핵심)
interface TrustWidgetProps {
    score: number; // 신뢰도 점수 (0-100)
    label: string;
    colorClass: string;
}

const TrustWidget: React.FC<TrustWidgetProps> = ({ score, label, colorClass }) => {
    // 디자인 원칙에 따라 Gold/Warm Color를 Accent로 사용
    const value = Math.round(score);
    return (
        <div className={`p-6 border-4 rounded-xl shadow-lg transition duration-300 ${colorClass} bg-white`}>
            <h3 className="text-2xl font-serif mb-2 text-gray-800">{label}</h3>
            <div className="flex items-baseline mt-3">
                <span className="text-6xl font-bold text-amber-600">{value}%</span>
                <span className="ml-2 text-lg font-medium text-gray-600">신뢰도 지표</span>
            </div>
        </div>
    );
};

// 3. 메인 페이지 컴포넌트 (상태 관리 및 API 통합)
export default function ProductDetailPage() {
    const [productData, setProductData] = useState<StoryFlowSchema | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 데이터 패칭 로직 (useEffect)
    const loadProductData = useCallback(async (id: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await apiService.fetchProductData(id);
            setProductData(data);
        } catch (err) {
            console.error("데이터 로드 실패:", err);
            setError("데이터를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        // 실제 ID는 URL 파라미터나 상태에서 가져온다고 가정합니다.
        const mockProductId = "mushroom-prod-123"; 
        loadProductData(mockProductId);
    }, [loadProductData]);

    if (isLoading) {
        return <div className="text-center py-20 text-xl">데이터를 로딩 중입니다... ⏳</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-600">{error}</div>;
    }

    // 데이터가 성공적으로 로드되었을 때의 렌더링
    if (!productData) return null;

    const { productName, traceabilityScore, riskLevel, premiumValueProposition, storyFlowSteps } = productData;

    return (
        <div className="min-h-screen bg-[#F5F0E6] font-serif">
            {/* Section 1: 스토리텔링 헤드라인 */}
            <header className="bg-[#1E4D2B] text-white p-12 text-center shadow-xl">
                <h1 className="text-6xl font-bold mb-4">{productName}</h1>
                <p className="text-xl opacity-90">시간의 예술, 완벽한 추적성으로 완성된 프리미엄 경험</p>
            </header>

            {/* Section 2: 핵심 가치 시각화 (Trust Widget) */}
            <section className="container mx-auto p-12 space-y-8">
                <h2 className="text-4xl font-bold border-b pb-4 text-[#1E4D2B]">Traceability & Trust</h2>
                
                {/* Dynamic Trust Widget Integration */}
                <div className="grid md:grid-cols-3 gap-8">
                    <TrustWidget 
                        score={traceabilityScore} 
                        label="추적성 점수" 
                        colorClass="border-amber-600"
                    />
                    <TrustWidget 
                        score={15} // 예시: 리스크 수준에 따른 시각화
                        label={`리스크 레벨 (${riskLevel})`} 
                        colorClass="border-red-600"
                    />
                    {/* 추가적인 Value Proposition 카드 삽입 */}
                    <div className="p-6 border-4 rounded-xl shadow-lg bg-white">
                        <h3 className="text-2xl font-serif mb-3 text-[#1E4D2B]">프리미엄 가치</h3>
                        <p><strong>시간 절약:</strong> {premiumValueProposition.timeSaved}</p>
                        <p><strong>품질 향상:</strong> {premiumValueProposition.defectReduction}</p>
                    </div>
                </div>

                {/* Section 3: 스토리 플로우 (Sequence Flow) */}
                <section className="mt-16 pt-8 border-t border-gray-200">
                    <h2 className="text-4xl font-bold mb-6 text-[#1E4D2B]">The Journey: 생산의 여정</h2>
                    <div className="space-y-6">
                        {storyFlowSteps.map((step: StoryFlowStep, index: number) => (
                            <div key={step.stepId} className="flex items-start space-x-4 border-l-4 border-amber-400 pl-4 bg-white p-4 rounded-lg shadow-md">
                                <span className="text-2xl font-bold text-amber-600 w-8 flex-shrink-0">{index + 1}.</span>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                                    <p className="text-gray-600 mt-1">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </section>
        </div>
    );
}