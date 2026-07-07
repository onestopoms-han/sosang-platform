<title>LandingPage.tsx</title>
```tsx
import React from 'react';
import { motion } from 'framer-motion';
// 디자인 시스템에서 가져오는 색상/타이포그래피를 가정합니다.
import { ColorPalette, Typography } from '../theme/designSystem'; 

// 스타일 임포트 (실제 CSS 파일 경로에 따라 조정 필요)
import './LandingPage.css';

interface LandingPageProps {
  platformName: string; // 새로 적용할 네이밍 (예: Matsutake Insight)
  primaryColor: string; // 선택된 메인 컬러
}

const LandingPage: React.FC<LandingPageProps> = ({ platformName, primaryColor }) => {
  // Variant 정의 - 데이터 기반 통제권 회복 컨셉에 맞춤
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className={`landing-page ${primaryColor.bg}`}>
      {/* Hero Section: 통제권 회복 강조 */}
      <motion.header 
        className="hero" 
        initial="hidden" 
        animate="visible"
        variants={containerVariants}
      >
        <h1 className="headline">{platformName}</h1>
        <p className="subheadline">데이터가 당신의 통제권을 되찾아줍니다.</p>
        <motion.div variants={itemVariants}>
          <motion.button 
            className="cta-button" 
            style={{ backgroundColor: primaryColor.accent, color: primaryColor.text }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            지금 통제권을 확보하세요
          </motion.button>
        </motion.div>
      </motion.header>

      {/* Features Section: Story Flow 강조 */}
      <section className="features-section">
        <h2>불확실성 감소의 여정</h2>
        <div className="feature-grid">
          {/* 데이터 시각화 컴포넌트 Placeholder */}
          <motion.div variants={itemVariants} className="feature-card insight-card">
            <h3>1단계: 불확실성 인식</h3>
            <p>현재 시장의 불안정성을 정확히 측정합니다.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="feature-card action-card">
            <h3>2단계: 통제권 확보</h3>
            <p>데이터 기반으로 명확한 실행 계획을 수립합니다.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="feature-card result-card">
            <h3>3단계: 성과 증명</h3>
            <p>실행을 통해 가치와 결과를 입증합니다.</p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section (Placeholder) */}
      <section className="pricing-section">
        <h2>맞춤형 솔루션</h2>
        {/* 실제 가격 모델은 추후 구현될 예정입니다. */}
        <p>Basic: 월 $49 (데이터 제공)</p>
        <p>Premium: 월 $79 + 성과 기반 수수료 (통제권 회복 가속화)</p>
      </section>

    </div>
  );
};

export default LandingPage;
```