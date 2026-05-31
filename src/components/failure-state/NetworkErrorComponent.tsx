import React from 'react';
import { IconType } from '@iconify'; // 예시 아이콘 라이브러리 가정

// 1. 컴포넌트 Props 정의 (재사용성 확보)
interface NetworkErrorProps {
  /** 사용자에게 보여줄 핵심 메시지 */
  title: string;
  /** 상세 설명 문구 */
  description: string;
  /** 에러를 해결할 수 있는 제안 버튼의 텍스트 */
  actionButtonText: string;
}

// 2. 컴포넌트 구현
const NetworkErrorComponent: React.FC<NetworkErrorProps> = ({ title, description, actionButtonText }) => {
  return (
    <div className="bds-failure-container network-error p-8 bg-red-50 border border-red-200 rounded-xl max-w-md shadow-lg">
      {/* 💡 시각적 요소: 네트워크 불안정 아이콘을 배치합니다. */}
      <div className="mb-4 flex items-center space-x-3">
        <IconType width={32} height={32} color="#EF4444" /> {/* 예시: Broken connection icon */}
        <h2 className="text-xl font-bold text-red-700">{title}</h2>
      </div>

      {/* 📝 핵심 메시지 영역 */}
      <p className="mt-2 text-gray-600 mb-4">{description}</p>

      {/* 🚀 사용자 액션 유도 */}
      <div className="flex justify-center pt-4">
        <button 
          className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-150 cursor-pointer"
          onClick={() => console.log("재시도 로직 실행")} // 실제 재연결 API 호출 예정
        >
          {actionButtonText}
        </button>
      </div>
    </div>
  );
};

export default NetworkErrorComponent;