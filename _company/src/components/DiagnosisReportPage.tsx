import React, { useState } from 'react';
import axios from 'axios';

// types/diagnosis.ts 와 일치하는 타입 정의
export type LossCategory = '운영비효율' | '디지털전환부재' | '마케팅성과미흡';

export interface DiagnosisInput {
  businessSector: string;
  annualRevenueEstimate?: number;
  operationalStaffCount: number;
  currentChallengeFocus: LossCategory;
}

export interface DiagnosisResult {
  success: boolean;
  diagnosisId: string;
  estimatedPotentialLossAmount: number;
  lossDetailBreakdown: Record<LossCategory, {
    description: string;
    potentialCost: number;
    mitigationScore?: number;
  }>;
  recommendedActionPlanSummary: string;
}

interface Message {
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

// ROI 시뮬레이션용 커스텀 SVG 차트 컴포넌트 (다크 모드 및 Deep Blue/Growth Green 최적화)
const RoiChart: React.FC<{ currentLoss: number }> = ({ currentLoss }) => {
  const optimizedLoss = Math.floor(currentLoss * 0.15); // 85% 손실 절감
  const netSavings = currentLoss - optimizedLoss;
  const maxVal = Math.max(currentLoss, netSavings) * 1.1;

  // 바 높이 계산 (최대 높이 150px)
  const getBarHeight = (val: number) => {
    return (val / maxVal) * 150;
  };

  const currentHeight = getBarHeight(currentLoss);
  const optimizedHeight = getBarHeight(optimizedLoss);
  const savingsHeight = getBarHeight(netSavings);

  return (
    <div className="bg-slate-950/80 border border-[#004D66]/30 rounded-2xl p-5 shadow-inner space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-1.5">
          <span>📊</span> 연간 재정 개선 시뮬레이션 (ROI)
        </h4>
        <span className="text-xs font-bold text-[#3CB371] bg-[#3CB371]/10 border border-[#3CB371]/20 px-2.5 py-0.5 rounded-full">
          손실 85% 감축 예상
        </span>
      </div>
      
      {/* SVG 차트 영역 */}
      <div className="w-full overflow-hidden">
        <svg viewBox="0 0 400 240" className="w-full h-auto font-sans">
          {/* 가로 그리드선 */}
          <line x1="50" y1="40" x2="380" y2="40" stroke="#1e293b" strokeDasharray="3 3" />
          <line x1="50" y1="90" x2="380" y2="90" stroke="#1e293b" strokeDasharray="3 3" />
          <line x1="50" y1="140" x2="380" y2="140" stroke="#1e293b" strokeDasharray="3 3" />
          <line x1="50" y1="190" x2="380" y2="190" stroke="#334155" strokeWidth="1" />

          {/* Y축 레이블 */}
          <text x="42" y="44" textAnchor="end" fill="#64748b" className="text-[10px] font-medium">
            ₩{(maxVal * 0.94 / 10000).toLocaleString(undefined, { maximumFractionDigits: 0 })}만
          </text>
          <text x="42" y="94" textAnchor="end" fill="#64748b" className="text-[10px] font-medium">
            ₩{(maxVal * 0.62 / 10000).toLocaleString(undefined, { maximumFractionDigits: 0 })}만
          </text>
          <text x="42" y="144" textAnchor="end" fill="#64748b" className="text-[10px] font-medium">
            ₩{(maxVal * 0.31 / 10000).toLocaleString(undefined, { maximumFractionDigits: 0 })}만
          </text>
          <text x="42" y="194" textAnchor="end" fill="#64748b" className="text-[10px] font-medium">₩0</text>

          {/* 그라데이션 정의 */}
          <defs>
            <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
            <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
            <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3CB371" />
              <stop offset="100%" stopColor="#1e5c3b" />
            </linearGradient>
          </defs>

          {/* 바 1: 현재 잠재 손실 (Red) */}
          <rect
            x="80"
            y={190 - currentHeight}
            width="40"
            height={currentHeight}
            fill="url(#redGrad)"
            rx="5"
            className="transition-all duration-500 ease-out hover:opacity-90 cursor-pointer"
          />
          <text
            x="100"
            y={180 - currentHeight}
            textAnchor="middle"
            fill="#ef4444"
            className="text-[10px] font-bold"
          >
            -{(currentLoss / 10000).toLocaleString(undefined, { maximumFractionDigits: 0 })}만
          </text>

          {/* 바 2: BDS 도입 후 손실 (Teal) */}
          <rect
            x="180"
            y={190 - optimizedHeight}
            width="40"
            height={optimizedHeight}
            fill="url(#tealGrad)"
            rx="5"
            className="transition-all duration-500 ease-out hover:opacity-90 cursor-pointer"
          />
          <text
            x="200"
            y={180 - optimizedHeight}
            textAnchor="middle"
            fill="#0ea5e9"
            className="text-[10px] font-bold"
          >
            -{(optimizedLoss / 10000).toLocaleString(undefined, { maximumFractionDigits: 0 })}만
          </text>

          {/* 바 3: 연간 순이익 개선 (Growth Green) */}
          <rect
            x="280"
            y={190 - savingsHeight}
            width="40"
            height={savingsHeight}
            fill="url(#greenGrad)"
            rx="5"
            className="transition-all duration-500 ease-out hover:opacity-90 cursor-pointer"
          />
          <text
            x="300"
            y={180 - savingsHeight}
            textAnchor="middle"
            fill="#3CB371"
            className="text-[10px] font-bold"
          >
            +{(netSavings / 10000).toLocaleString(undefined, { maximumFractionDigits: 0 })}만
          </text>

          {/* X축 레이블 */}
          <text x="100" y="212" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-medium">현재 잠재 손실</text>
          <text x="200" y="212" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-medium">BDS 도입 후</text>
          <text x="300" y="212" textAnchor="middle" fill="#3CB371" className="text-[10px] font-bold">연간 이익 개선</text>
        </svg>
      </div>

      <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between gap-2 text-xs text-slate-400">
        <div>
          <span>예상 손실 감축액: </span>
          <span className="font-bold text-white">₩{netSavings.toLocaleString()}원</span>
        </div>
        <div>
          <span>예상 투자 수익률: </span>
          <span className="font-bold text-[#3CB371]">ROI {((netSavings / (currentLoss * 0.1)) * 100).toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
};

const DiagnosisReportPage: React.FC = () => {
  // 폼 입력 데이터
  const [inputData, setInputData] = useState<DiagnosisInput>({
    businessSector: '식음료',
    annualRevenueEstimate: 5000,
    operationalStaffCount: 2,
    currentChallengeFocus: '운영비효율'
  });

  // 진단 결과 데이터
  const [report, setReport] = useState<DiagnosisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 활성화된 여정 마일스톤 단계 상태
  const [activeStep, setActiveStep] = useState<number>(1);

  // 마일스톤 단계 정의
  const steps = [
    { number: 1, label: '진단 정보 입력', desc: '사업 규모 및 매출 정보 기입' },
    { number: 2, label: 'AI 진단 리포트', desc: '잠재 손실액 및 리스크 분석' },
    { number: 3, label: '카카오톡 연동', desc: '실시간 매출 안심 채널 연결' },
    { number: 4, label: '맞춤형 컨설팅', desc: '안전마진 확보 플랜 신청' },
  ];

  const handleStepClick = (stepNum: number) => {
    if (stepNum === 1) {
      setActiveStep(1);
      document.getElementById('diagnosis-form-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (stepNum === 2) {
      if (report) {
        setActiveStep(2);
        document.getElementById('diagnosis-report-section')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        setError('진단 정보를 입력한 후 실시간 진단을 완료해 주세요.');
      }
    } else if (stepNum === 3) {
      if (report) {
        setActiveStep(3);
        setChatOpen(true);
      } else {
        setError('진단 리포트가 생성된 이후 카카오톡 연동이 가능합니다.');
      }
    } else if (stepNum === 4) {
      if (report) {
        setActiveStep(4);
        document.getElementById('consulting-cta-section')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        setError('진단 리포트가 생성된 이후 무료 성장 컨설팅 신청이 가능합니다.');
      }
    }
  };

  // 카카오톡 챗봇 위젯 상태
  const [chatOpen, setChatOpen] = useState(false);
  const handleChatOpen = (isOpen: boolean) => {
    setChatOpen(isOpen);
    if (isOpen && activeStep < 3) {
      setActiveStep(3);
    }
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: '안녕하세요, 사장님! 소상공인 성공 도우미 BDS입니다. 밤에 잠자리에 들기 전에도 오늘 하루 고객 메시지 정리하느라 지치진 않으셨나요? 사장님의 바쁜 일상을 응원하며, 지금 사장님의 가게에 꼭 필요한 1분 무료 진단을 받아보세요! 👉 [무료 진단 받기]',
      time: '오후 7:51'
    }
  ]);
  const [inputText, setInputText] = useState('');

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // 로컬 FastAPI 백엔드 호출
      const response = await axios.post('/api/diagnosis/submit', inputData);
      setReport(response.data);
      setActiveStep(2);
      
      // 카카오톡 챗봇 자동 리포트 연동
      const newMsg: Message = {
        sender: 'bot',
        text: `📢 [BDS AI 리포트 알림] 사장님의 진단이 완료되었습니다!\n\n• 고유 ID: ${response.data.diagnosisId}\n• 잠재 손실 추정액: ₩${response.data.estimatedPotentialLossAmount.toLocaleString()}원\n\n🎯 AI 권장 액션:\n${response.data.recommendedActionPlanSummary}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newMsg]);
    } catch (err: any) {
      console.error(err);
      setError('진단 리포트 생성 중 오류가 발생했습니다. 백엔드 서버 연결을 확인해 주세요.');
      
      // Fallback 더미 데이터 제공 (서버 미동작시에도 시각적 확인이 가능하도록 배려)
      const mockResult: DiagnosisResult = {
        success: true,
        diagnosisId: `diag_${Math.floor(Math.random() * 900000) + 100000}`,
        estimatedPotentialLossAmount: (inputData.annualRevenueEstimate || 5000) * 8000,
        lossDetailBreakdown: {
          '운영비효율': {
            description: "재고 관리 비효율 및 리소스 낭비로 인한 손실 가능성",
            potentialCost: (inputData.annualRevenueEstimate || 5000) * 3600,
            mitigationScore: 85
          },
          '디지털전환부재': {
            description: "온라인 예약 및 스마트 결제 시스템 부재로 인한 잠재 고객 이탈",
            potentialCost: (inputData.annualRevenueEstimate || 5000) * 2800,
            mitigationScore: 90
          },
          '마케팅성과미흡': {
            description: "타겟팅 부재 및 마케팅 채널 파편화로 인한 비효율적인 지출",
            potentialCost: (inputData.annualRevenueEstimate || 5000) * 1600,
            mitigationScore: 75
          }
        },
        recommendedActionPlanSummary: "AI 기반 자동 재고 및 직원 관리 시스템 도입을 통해 연간 35% 이상의 운영비를 절감하는 것을 최우선으로 제안합니다."
      };
      setReport(mockResult);
      setActiveStep(2);
    } finally {
      setLoading(false);
    }
  };

  // 카카오톡 메시지 전송
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // AI 자동 응답 시뮬레이션
    setTimeout(() => {
      let replyText = '죄송합니다, 이해하지 못했습니다. 아래 버튼을 눌러 빠른 상담을 받아보세요!';
      
      if (inputText.includes('진단') || inputText.includes('시작') || inputText.includes('도움')) {
        replyText = '💡 [Phase 1: 인지도 및 공감] 사장님, 혹은 밤에 잠자리에 들기 전에도 고객 문의 정리로 피로하지 않으신가요? 무료 진단 페이지를 통해 사장님 가게의 리스크와 낭비 요소를 1분 만에 분석해 보세요!';
      } else if (inputText.includes('리스크') || inputText.includes('손실') || inputText.includes('비용')) {
        replyText = '📊 [Phase 2: 가치 교육] 통계에 따르면 소상공인의 83%가 카톡 채팅방 속 대화 데이터(예약, 문의 등)를 유실하여 기회 비용을 낭비하고 있습니다. BDS AI는 이를 분석하여 매출 성장 모델을 도출해 줍니다.';
      } else if (inputText.includes('계획') || inputText.includes('결제') || inputText.includes('프리미엄') || inputText.includes('신청')) {
        replyText = '✨ [Phase 3: 행동 유도] 진단 결과에 맞춘 [노무 및 재고 자동화 패키지] 프리미엄 플랜을 통해 매일 3시간의 절대적인 시간을 확보하세요. 7일간 무료 체험 신청이 활성화되었습니다! 👉 [신청하기]';
      }

      const botReply: Message = {
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botReply]);
    }, 800);
  };

  // 프리셋 질문 버튼 클릭
  const handlePresetClick = (type: 'onboarding' | 'education' | 'conversion') => {
    let userText = '';
    let botText = '';

    if (type === 'onboarding') {
      userText = 'BDS 소상공인 플랫폼이 무엇인가요?';
      botText = '🚨 [Phase 1: 웰컴 공감]\n\n"혹시, 밤에 잠자리에 들기 전에도 오늘 하루 고객 메시지 정리하느라 지치진 않으셨나요?"\n\nBDS는 단순히 데이터를 나열하는 툴이 아닙니다. 사장님이 매일 겪는 대화와 업무 속 병목을 해결하고 시간 낭비를 막아드리는 24시간 AI 비즈니스 컨설턴트입니다.';
      setActiveStep(1);
    } else if (type === 'education') {
      userText = '내 가게의 숨은 손실 리스크가 있나요?';
      botText = '📢 [Phase 2: Pain Point 경고]\n\n"아직도 고객 문의를 메모장에 모으시나요? 놓치고 있는 황금 데이터가 있습니다."\n\n대부분의 사장님들은 카카오톡 대화방에 쌓여 있는 재방문 예측 신호와 인건비 누수 요소를 파악하지 못합니다. BDS AI 진단을 통해 정밀 데이터 분석 리포트를 확인해 보세요!';
      setActiveStep(2);
    } else if (type === 'conversion') {
      userText = 'AI 자동화 패키지 도입 혜택이 궁금해요.';
      botText = '✨ [Phase 3: 프리미엄 전환 제안]\n\n"진단 결과를 통해 분석된 [운영 효율성 극대화 패키지] 가치를 확인해 보세요."\n\n• 리소스 재배치 시뮬레이션으로 시간 낭비 요소 원천 제거\n• 24시간 실시간 매출 극대화 가이드라인 제공\n\n지금 카카오톡 파이프라인 연동을 진행하고 7일간 무료로 체험을 활성화하세요!';
      setActiveStep(3);
    }

    const userMsg: Message = {
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      const botMsg: Message = {
        sender: 'bot',
        text: botText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001f29] via-slate-950 to-[#00151c] text-white p-4 sm:p-8 font-sans transition-all duration-500">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-200 to-[#3CB371]">
            BDS 소상공인 AI 진단 플랫폼
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            카카오톡 데이터 자산화 파이프라인 연동 및 실시간 리스크 진단
          </p>
        </header>

        {/* 여정 마일스톤 트래커 (Journey Map) */}
        <section className="mb-10 max-w-4xl mx-auto bg-slate-900/40 border border-[#004D66]/30 rounded-3xl p-6 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-4 relative">
            {/* 큰 화면용 연결선 */}
            <div className="absolute hidden md:block top-5 left-10 right-10 h-0.5 z-0 bg-slate-800">
              <div 
                className="h-full bg-[#3CB371] transition-all duration-500 ease-in-out" 
                style={{ width: `${((activeStep - 1) / 3) * 100}%` }}
              />
            </div>

            {steps.map((step) => {
              const isCompleted = step.number < activeStep;
              const isActive = step.number === activeStep;

              return (
                <div 
                  key={step.number} 
                  className="flex md:flex-col items-center gap-4 md:gap-2 z-10 flex-1 cursor-pointer group"
                  onClick={() => handleStepClick(step.number)}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
                      isCompleted
                        ? 'bg-[#3CB371] border-[#3CB371] text-white shadow-[0_0_12px_rgba(60,179,113,0.3)]'
                        : isActive
                        ? 'bg-[#004D66] border-[#3CB371] text-[#3CB371] shadow-[0_0_12px_rgba(0,77,102,0.4)]'
                        : 'bg-slate-900 border-[#004D66]/40 text-slate-500'
                    }`}
                  >
                    {isCompleted ? '✓' : step.number}
                  </div>
                  <div className="text-left md:text-center">
                    <p className={`text-sm font-bold transition-colors ${isActive ? 'text-[#3CB371]' : isCompleted ? 'text-slate-300' : 'text-slate-500'}`}>
                      {step.label}
                    </p>
                    <p className="text-[10px] text-slate-500 hidden md:block mt-0.5">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {error && (
          <div className="mb-6 bg-red-950/80 border border-red-500/50 text-red-200 p-4 rounded-xl backdrop-blur-md">
            ⚠️ {error}
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* 좌측: 진단 폼 */}
          <section id="diagnosis-form-section" className="lg:col-span-5 bg-slate-900/60 border border-[#004D66]/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
            <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
              <span>📋</span> 1단계: 실시간 리스크 진단 입력
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">사업 업종 종류</label>
                <select
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#3CB371]/50 focus:border-[#3CB371]"
                  value={inputData.businessSector}
                  onChange={e => setInputData({ ...inputData, businessSector: e.target.value })}
                >
                  <option value="식음료">식음료 (카페, 요식업)</option>
                  <option value="의류/패션">의류 및 패션 소매업</option>
                  <option value="뷰티/미용">헤어샵, 네일샵, 미용업</option>
                  <option value="교육/학원">교육 서비스 및 학원업</option>
                  <option value="기타서비스">기타 일반 서비스업</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">연간 추정 매출액 (만원 단위)</label>
                <input
                  type="number"
                  required
                  min="100"
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#3CB371]/50 focus:border-[#3CB371]"
                  value={inputData.annualRevenueEstimate}
                  onChange={e => setInputData({ ...inputData, annualRevenueEstimate: parseInt(e.target.value) || 0 })}
                />
                <span className="text-xs text-slate-400 mt-1 block">예시: 5000만원 입력시 5000 기입</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">상주 운영 인원 수</label>
                <input
                  type="number"
                  required
                  min="1"
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#3CB371]/50 focus:border-[#3CB371]"
                  value={inputData.operationalStaffCount}
                  onChange={e => setInputData({ ...inputData, operationalStaffCount: parseInt(e.target.value) || 1 })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">현재 가장 심각한 극복 과제</label>
                <div className="grid grid-cols-1 gap-3">
                  {(['운영비효율', '디지털전환부재', '마케팅성과미흡'] as LossCategory[]).map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setInputData({ ...inputData, currentChallengeFocus: cat })}
                      className={`px-4 py-3 rounded-xl border text-left transition-all ${
                        inputData.currentChallengeFocus === cat
                          ? 'border-[#3CB371] bg-[#3CB371]/10 text-emerald-300 font-semibold'
                          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {cat === '운영비효율' && '⚙️ 운영 관리 비효율 (재고 낭비 등)'}
                      {cat === '디지털전환부재' && '📱 디지털 전환 부재 (온라인 예약 등)'}
                      {cat === '마케팅성과미흡' && '📢 마케팅 성과 미흡 (단골 고객 이탈 등)'}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#004D66] to-[#3CB371] hover:from-[#005e7c] hover:to-[#45c381] text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? 'AI 분석 중...' : '🔥 실시간 AI 리스크 진단'}
              </button>
            </form>
          </section>

          {/* 우측: 진단 리포트 결과 */}
          <section id="diagnosis-report-section" className="lg:col-span-7 space-y-6">
            {report ? (
              <div className="bg-slate-900/60 border border-[#004D66]/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-8 animate-fade-in">
                <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-800/80 pb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-[#3CB371] flex items-center gap-1.5">
                      <span>✨</span> 2단계: AI 진단 리포트
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">ID: {report.diagnosisId}</p>
                  </div>
                  <span className="bg-[#3CB371]/10 text-[#3CB371] px-3 py-1 rounded-full text-xs font-semibold border border-[#3CB371]/20">
                    진단 완료
                  </span>
                </div>

                {/* 대시보드 요약 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-red-950/40 to-slate-900 border border-red-900/20 rounded-2xl p-5">
                    <span className="text-xs text-red-300 font-medium block">연간 숨은 잠재적 손실 금액 (추정)</span>
                    <span className="text-3xl font-extrabold text-red-400 mt-2 block">
                      ₩{report.estimatedPotentialLossAmount.toLocaleString()}원
                    </span>
                    <span className="text-xs text-slate-500 mt-2 block">
                      * 운영 패턴 및 의존도 기준 자동 시뮬레이션
                    </span>
                  </div>

                  <div className="bg-gradient-to-br from-[#004D66]/30 to-slate-900 border border-[#004D66]/20 rounded-2xl p-5">
                    <span className="text-xs text-[#3CB371] font-medium block">BDS 솔루션 적용 시 개선 가능 등급</span>
                    <span className="text-3xl font-extrabold text-[#3CB371] mt-2 block">High Growth</span>
                    <span className="text-xs text-slate-500 mt-2 block">
                      * 리소스 낭비 요소를 제거하여 기회 확보
                    </span>
                  </div>
                </div>

                {/* ROI 시뮬레이션 차트 */}
                <RoiChart currentLoss={report.estimatedPotentialLossAmount} />

                {/* 리스크 분해 카드 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-200">🔍 리스크 정밀 진단</h3>
                  <div className="grid gap-3">
                    {(Object.keys(report.lossDetailBreakdown) as LossCategory[]).map(key => {
                      const item = report.lossDetailBreakdown[key];
                      const isFocused = inputData.currentChallengeFocus === key;
                      return (
                        <div
                          key={key}
                          className={`p-4 rounded-xl border transition-all ${
                            isFocused
                              ? 'bg-slate-800/80 border-[#3CB371]/50 shadow-md shadow-[#3CB371]/5'
                              : 'bg-slate-900/40 border-slate-800'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className={`font-bold ${isFocused ? 'text-[#3CB371]' : 'text-slate-300'}`}>
                              {key} 리스크 {isFocused && '🎯'}
                            </span>
                            <span className="text-red-400 text-sm font-semibold">
                              ~ ₩{item.potentialCost.toLocaleString()}원
                            </span>
                          </div>
                          <p className="text-xs text-slate-400">{item.description}</p>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-red-500 to-[#3CB371] h-full"
                              style={{ width: `${item.mitigationScore || 50}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                            <span>개선 필요도</span>
                            <span>개선 가능성: {item.mitigationScore || 50}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 최종 AI 액션 처방 */}
                <div className="bg-[#004D66]/20 border border-[#004D66]/40 rounded-2xl p-5 space-y-3">
                  <h3 className="font-bold text-[#3CB371] flex items-center gap-1.5">
                    <span>💡</span> AI 처방 성장 로드맵
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {report.recommendedActionPlanSummary}
                  </p>
                  <div className="bg-[#3CB371]/5 border border-[#3CB371]/10 rounded-xl p-3 text-xs text-[#3CB371] flex justify-between items-center">
                    <span>💎 Premium 플랜의 혜택 (시행착오 비용 90% 감소 효과)</span>
                    <button
                      onClick={() => handleStepClick(3)}
                      className="bg-[#3CB371] hover:bg-[#2e9e62] text-white px-3.5 py-1.5 rounded-lg font-bold transition-all"
                    >
                      카톡 연동 시작
                    </button>
                  </div>
                </div>

                {/* 최종 안전마진 컨설팅 CTA 섹션 */}
                <div id="consulting-cta-section" className="bg-slate-950/60 border border-[#004D66]/30 rounded-2xl p-6 text-center space-y-4">
                  <div className="inline-block bg-[#3CB371]/10 text-[#3CB371] border border-[#3CB371]/20 px-3.5 py-1 rounded-full text-xs font-semibold">
                    Step 4: 성장 로드맵 최종 단계
                  </div>
                  <h3 className="text-2xl font-bold text-white">📈 매출 성장을 위한 안전마진 확보 전략</h3>
                  <p className="text-slate-300 text-sm max-w-xl mx-auto">
                    사장님의 진단 결과와 연동하여 AI 리포트 기반의 **1:1 맞춤형 무료 컨설팅**을 신청하세요.
                    BDS 전문 코치와 함께 실행 방안을 실시간으로 설계해 드립니다.
                  </p>
                  <button
                    onClick={() => {
                      setActiveStep(4);
                      alert("무료 성장 컨설팅 신청이 완료되었습니다! 담당 매니저가 연락드릴 예정입니다.");
                    }}
                    className="inline-flex items-center gap-2 bg-[#3CB371] hover:bg-[#2e9e62] text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-[#3CB371]/20 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 hover:scale-[1.02] cursor-pointer animate-pulse"
                    style={{ animationDuration: '3s' }}
                  >
                    <span>🛡️</span> 무료 맞춤형 성장 컨설팅 신청하기
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900/30 border border-slate-800/80 rounded-3xl p-12 text-center text-slate-500 flex flex-col items-center justify-center h-full min-h-[300px]">
                <span className="text-5xl mb-4">🔬</span>
                <p className="text-lg font-semibold text-slate-300">진단 결과를 생성해 주세요</p>
                <p className="text-sm mt-1 max-w-sm">
                  좌측 진단 폼에서 입력값을 채워 리포트를 발행하면 AI 진단 결과가 여기에 노출됩니다.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* 카카오톡 플로팅 버튼 */}
      <button
        onClick={() => handleChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#3CB371] hover:bg-[#2e9e62] text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 z-50 animate-bounce"
        style={{ animationDuration: '3s' }}
      >
        <span className="text-2xl font-black">💬</span>
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
          1
        </span>
      </button>

      {/* 카카오톡 채팅 모달 */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-[360px] sm:w-[400px] h-[550px] bg-[#b2c7da] border border-[#a2b7ca] rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 font-sans text-slate-900 animate-slide-up">
          {/* 헤더 */}
          <div className="bg-[#004D66] text-white px-4 py-3.5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#3CB371] text-white font-black flex items-center justify-center text-lg">
                B
              </div>
              <div>
                <h3 className="font-bold text-sm">BDS AI 비서 채널</h3>
                <span className="text-[10px] text-slate-300">24시간 자동 상담 채널</span>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="text-white hover:text-slate-300 font-bold text-xl px-2"
            >
              ✕
            </button>
          </div>

          {/* 챗 프리셋 알림 영역 */}
          <div className="bg-white/90 border-b border-slate-200 p-2 text-center text-xs text-gray-500">
            <p className="font-semibold text-slate-700 mb-1.5">💡 상담 단계별 시뮬레이션 버튼</p>
            <div className="flex justify-center gap-1.5 flex-wrap">
              <button
                onClick={() => handlePresetClick('onboarding')}
                className="bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 text-cyan-800 px-2 py-1 rounded-md text-[10px]"
              >
                1단계: 웰컴 공감
              </button>
              <button
                onClick={() => handlePresetClick('education')}
                className="bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 px-2 py-1 rounded-md text-[10px]"
              >
                2단계: 리스크 경고
              </button>
              <button
                onClick={() => handlePresetClick('conversion')}
                className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 px-2 py-1 rounded-md text-[10px]"
              >
                3단계: 프리미엄 제안
              </button>
            </div>
          </div>

          {/* 대화방 메시지 리스트 */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, index) => {
              const isBot = msg.sender === 'bot';
              return (
                <div key={index} className={`flex items-end gap-1.5 ${isBot ? '' : 'justify-end'}`}>
                  {isBot && (
                    <div className="w-8 h-8 rounded-full bg-[#3CB371] text-white font-black flex items-center justify-center text-xs shrink-0 self-start">
                      B
                    </div>
                  )}
                  {isBot ? (
                    <div className="max-w-[70%] bg-white rounded-r-xl rounded-bl-xl p-3 text-xs shadow-sm leading-relaxed whitespace-pre-line text-slate-800">
                      {msg.text}
                    </div>
                  ) : (
                    <div className="max-w-[70%] bg-[#ffeb33] rounded-l-xl rounded-br-xl p-3 text-xs shadow-sm leading-relaxed whitespace-pre-line text-slate-800">
                      {msg.text}
                    </div>
                  )}
                  <span className="text-[9px] text-gray-500 shrink-0">{msg.time}</span>
                </div>
              );
            })}
          </div>

          {/* 입력창 */}
          <form onSubmit={handleSendMessage} className="bg-white p-2.5 flex items-center gap-2 border-t border-slate-200">
            <input
              type="text"
              placeholder="메시지를 입력하세요 (예: 손실, 신청)"
              className="flex-1 bg-slate-100 border border-slate-200 rounded-full px-4 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#3CB371]"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#3CB371] hover:bg-[#2e9e62] text-white font-bold px-4 py-2 rounded-full text-xs"
            >
              전송
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DiagnosisReportPage;