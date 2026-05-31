import React from 'react';

// 1. 컴포넌트 Props 정의 (재사용성 확보)
interface InvalidInputProps {
  /** 어떤 필드에 대한 오류인지 명시 */
  fieldName: string;
  /** 구체적인 유효성 검사 실패 메시지 */
  message: string;
}

// 2. 컴포넌트 구현
const InvalidInputComponent: React.FC<InvalidInputProps> = ({ fieldName, message }) => {
  return (
    <div className="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-500 text-sm shadow-sm">
      <p className="font-semibold text-yellow-800 flex items-center space-x-2">
        {/* ⚠️ 경고 아이콘 */}
        <span role="img" aria-label="경고">⚠️</span> 
        <span>{fieldName} 입력 오류:</span>
      </p>
      <p className="text-yellow-700 mt-1">{message}</p>
    </div>
  );
};

export default InvalidInputComponent;