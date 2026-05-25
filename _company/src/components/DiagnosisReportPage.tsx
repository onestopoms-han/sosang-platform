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

  // 카카오톡 챗봇 위젯 상태
  const [chatOpen, setChatOpen] = useState(false);
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
        replyText = '💡 [Phase 1: 인지도 및 공감] 사장님, 혹시 밤에 잠자리에 들기 전에도 고객 문의 정리로 피로하지 않으신가요? 무료 진단 페이지를 통해 사장님 가게의 리스크와 낭비 요소를 1분 만에 분석해 보세요!';
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
    } else if (type === 'education') {
      userText = '내 가게의 숨은 손실 리스크가 있나요?';
      botText = '📢 [Phase 2: Pain Point 경고]\n\n"아직도 고객 문의를 메모장에 모으시나요? 놓치고 있는 황금 데이터가 있습니다."\n\n대부분의 사장님들은 카카오톡 대화방에 쌓여 있는 재방문 예측 신호와 인건비 누수 요소를 파악하지 못합니다. BDS AI 진단을 통해 정밀 데이터 분석 리포트를 확인해 보세요!';
    } else if (type === 'conversion') {
      userText = 'AI 자동화 패키지 도입 혜택이 궁금해요.';
      botText = '✨ [Phase 3: 프리미엄 전환 제안]\n\n"진단 결과를 통해 분석된 [운영 효율성 극대화 패키지] 가치를 확인해 보세요."\n\n• 리소스 재배치 시뮬레이션으로 시간 낭비 요소 원천 제거\n• 24시간 실시간 매출 극대화 가이드라인 제공\n\n지금 카카오톡 파이프라인 연동을 진행하고 7일간 무료로 체험을 활성화하세요!';
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
    <div className="min-h-screen bg-gradient-to-tr from-slate-900 via-slate-800 to-indigo-950 text-white p-4 sm:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-amber-200 to-orange-400">
            BDS 소상공인 AI 진단 플랫폼
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            카카오톡 데이터 자산화 파이프라인 연동 및 실시간 리스크 진단
          </p>
        </header>

        {error && (
          <div className="mb-6 bg-red-950/80 border border-red-500 text-red-200 p-4 rounded-xl backdrop-blur-md">
            ⚠️ {error}
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* 좌측: 진단 폼 */}
          <section className="lg:col-span-5 bg-slate-900/60 border border-slate-700/60 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-yellow-400 flex items-center gap-2">
              <span>📋</span> 1단계: 실시간 리스크 진단 입력
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">사업 업종 종류</label>
                <select
                  className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
                <label className="block text-sm font-medium text-gray-300 mb-2">연간 추정 매출액 (만원 단위)</label>
                <input
                  type="number"
                  required
                  min="100"
                  className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  value={inputData.annualRevenueEstimate}
                  onChange={e => setInputData({ ...inputData, annualRevenueEstimate: parseInt(e.target.value) || 0 })}
                />
                <span className="text-xs text-gray-400 mt-1 block">예시: 5000만원 입력시 5000 기입</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">상주 운영 인원 수</label>
                <input
                  type="number"
                  required
                  min="1"
                  className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  value={inputData.operationalStaffCount}
                  onChange={e => setInputData({ ...inputData, operationalStaffCount: parseInt(e.target.value) || 1 })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">현재 가장 심각한 극복 과제</label>
                <div className="grid grid-cols-1 gap-3">
                  {(['운영비효율', '디지털전환부재', '마케팅성과미흡'] as LossCategory[]).map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setInputData({ ...inputData, currentChallengeFocus: cat })}
                      className={`px-4 py-3 rounded-xl border text-left transition-all ${
                        inputData.currentChallengeFocus === cat
                          ? 'border-yellow-400 bg-yellow-400/10 text-yellow-300 font-semibold'
                          : 'border-slate-600 bg-slate-800 text-gray-300 hover:border-slate-500'
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
                className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? 'AI 분석 중...' : '🔥 실시간 AI 리스크 진단'}
              </button>
            </form>
          </section>

          {/* 우측: 진단 리포트 결과 */}
          <section className="lg:col-span-7 space-y-6">
            {report ? (
              <div className="bg-slate-900/60 border border-slate-700/60 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-8 animate-fade-in">
                <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-700/80 pb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-emerald-400">✨ 2단계: AI 진단 리포트</h2>
                    <p className="text-xs text-gray-400 mt-1">ID: {report.diagnosisId}</p>
                  </div>
                  <span className="bg-emerald-400/10 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-400/20">
                    진단 완료
                  </span>
                </div>

                {/* 대시보드 요약 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-red-950/40 to-slate-900 border border-red-900/30 rounded-2xl p-5">
                    <span className="text-xs text-red-300 font-medium block">연간 숨은 잠재적 손실 금액 (추정)</span>
                    <span className="text-3xl font-extrabold text-red-400 mt-2 block">
                      ₩{report.estimatedPotentialLossAmount.toLocaleString()}원
                    </span>
                    <span className="text-xs text-gray-400 mt-2 block">
                      * 운영 패턴 및 의존도 기준 자동 시뮬레이션
                    </span>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-900/30 rounded-2xl p-5">
                    <span className="text-xs text-indigo-300 font-medium block">BDS 솔루션 적용 시 개선 가능 등급</span>
                    <span className="text-3xl font-extrabold text-indigo-400 mt-2 block">High Growth</span>
                    <span className="text-xs text-gray-400 mt-2 block">
                      * 리소스 낭비 요소를 제거하여 기회 확보
                    </span>
                  </div>
                </div>

                {/* 리스크 분해 카드 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-200">🔍 리스크 정밀 진단</h3>
                  <div className="grid gap-3">
                    {(Object.keys(report.lossDetailBreakdown) as LossCategory[]).map(key => {
                      const item = report.lossDetailBreakdown[key];
                      const isFocused = inputData.currentChallengeFocus === key;
                      return (
                        <div
                          key={key}
                          className={`p-4 rounded-xl border transition-all ${
                            isFocused
                              ? 'bg-slate-800/80 border-yellow-500/50 shadow-md shadow-yellow-500/5'
                              : 'bg-slate-900/40 border-slate-800'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className={`font-bold ${isFocused ? 'text-yellow-400' : 'text-gray-300'}`}>
                              {key} 리스크 {isFocused && '🎯'}
                            </span>
                            <span className="text-red-400 text-sm font-semibold">
                              ~ ₩{item.potentialCost.toLocaleString()}원
                            </span>
                          </div>
                          <p className="text-xs text-gray-400">{item.description}</p>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-red-500 to-yellow-400 h-full"
                              style={{ width: `${item.mitigationScore || 50}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                            <span>개선 필요도</span>
                            <span>개선 가능성: {item.mitigationScore || 50}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 최종 AI 액션 처방 */}
                <div className="bg-emerald-950/30 border border-emerald-900/30 rounded-2xl p-5 space-y-3">
                  <h3 className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <span>💡</span> AI 처방 성장 로드맵
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {report.recommendedActionPlanSummary}
                  </p>
                  <div className="bg-emerald-400/5 border border-emerald-500/10 rounded-xl p-3 text-xs text-emerald-300 flex justify-between items-center">
                    <span>💎 Premium 플랜의 혜택 (시행착오 비용 90% 감소 효과)</span>
                    <button
                      onClick={() => setChatOpen(true)}
                      className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 px-3 py-1.5 rounded-lg font-bold"
                    >
                      카톡 상담 시작
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900/30 border border-slate-800/80 rounded-3xl p-12 text-center text-gray-500 flex flex-col items-center justify-center h-full min-h-[300px]">
                <span className="text-5xl mb-4">🔬</span>
                <p className="text-lg font-semibold">진단 결과를 생성해 주세요</p>
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
        onClick={() => setChatOpen(prev => !prev)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#FFE000] hover:bg-[#FADA0A] text-[#3c1e1e] rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 z-50 animate-bounce"
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
          <div className="bg-[#526373] text-white px-4 py-3.5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#FFE000] text-[#3c1e1e] font-black flex items-center justify-center text-lg">
                B
              </div>
              <div>
                <h3 className="font-bold text-sm">BDS AI 비서 채널</h3>
                <span className="text-[10px] text-gray-300">24시간 자동 상담 채널</span>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="text-white hover:text-gray-300 font-bold text-xl px-2"
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
                className="bg-yellow-100 hover:bg-yellow-200 border border-yellow-300 text-yellow-800 px-2 py-1 rounded-md text-[10px]"
              >
                1단계: 웰컴 공감
              </button>
              <button
                onClick={() => handlePresetClick('education')}
                className="bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-800 px-2 py-1 rounded-md text-[10px]"
              >
                2단계: 리스크 경고
              </button>
              <button
                onClick={() => handlePresetClick('conversion')}
                className="bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 text-emerald-800 px-2 py-1 rounded-md text-[10px]"
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
                    <div className="w-8 h-8 rounded-full bg-[#FFE000] text-[#3c1e1e] font-black flex items-center justify-center text-xs shrink-0 self-start">
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
              className="flex-1 bg-slate-100 border border-slate-200 rounded-full px-4 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-yellow-400"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#FFE000] hover:bg-[#FADA0A] text-[#3c1e1e] font-bold px-4 py-2 rounded-full text-xs"
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