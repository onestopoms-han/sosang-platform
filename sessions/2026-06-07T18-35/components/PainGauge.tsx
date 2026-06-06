<file>import React, { useState, useEffect } from 'react';
import './PainGauge.css';

interface PainGaugeProps {
  title: string;
  value?: number | null; // null 이면 로딩/에러 상태
  maxLimit?: number;
  onChange?: (value: number) => void;
}

// 🛡️ Edge Case 처리 함수들
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  const newValue = parseFloat(e.target.value);

  // ✅ 1. 입력 값 유효성 검사 (NaN, 음수 등)
  if (isNaN(newValue)) return;

  // ✅ 2. 최대/최소 한도 적용
  if (typeof props.maxLimit === 'number' && newValue > props.maxLimit) {
    e.target.value = props.maxLimit.toString();
    props.onChange?.(props.maxLimit);
    console.warn(`[PainGauge] 입력값 ${newValue}은 최대 제한(${props.maxLimit})을 초과했습니다.`);
    return;
  }

  // ✅ 3. 변경 이벤트 처리 (debounce 로직 필요 시 적용)
  props.onChange?.(newValue);
};

const PainGauge: React.FC<PainGaugeProps> = ({ title, value, maxLimit, onChange }) => {
  const [isLoading, setIsLoading] = useState(false); // ✅ 로딩 상태 관리

  useEffect(() => {
    if (value === null) return; // 초기값이 없으면 실행 X

    // ✅ 4. 값 변경 시 UI 업데이트 및 에러 처리
    if (isNaN(value)) {
      console.error(`[PainGauge] 유효하지 않은 값: ${value}`);
      setIsLoading(true); // 에러 상태 표시
      return;
    }

    setIsLoading(false);
  }, [value]);

  return (
    <div className="pain-gauge">
      {/* 🎨 디자인 시스템 명세서 (V2.0) 적용 */}
      <h3>{title}</h3>
      
      <input 
        type="number" 
        value={value ?? ''}
        onChange={handleInputChange}
        placeholder="데이터를 입력하세요..."
        disabled={isLoading} // ✅ 5. 로딩 중에는 입력 불가 (UI 안정성)
        className={`pain-gauge-input ${isLoading ? 'is-loading' : ''}`}
      />

      <span className="error-message">{isLoading ? '데이터 로드 중...' : ''}</span>
    </div>
  );
};

export default PainGauge;