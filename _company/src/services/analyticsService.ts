// src/services/analyticsService.ts

import { CampaignData } from '../types/schema'; // 가정: 전역 스키마 파일 존재

/**
 * @description 여러 캠페인 데이터를 기반으로 ROI 및 KPI를 계산하는 핵심 비즈니스 로직.
 * 이 함수는 데이터 유효성 검사(Validation)와 예외 처리를 포함해야 합니다.
 * @param campaigns - 분석할 CampaignData 배열 (최소 1개 이상).
 * @returns 성공적으로 계산된 전체 KPI 객체.
 */
export function calculateRoiMetrics(campaigns: CampaignData[]): { totalROIPercentage: number; averageCPA: number; breakEvenPointDays: number; overallConversionRate: number } {
    if (!campaigns || campaigns.length === 0) {
        throw new Error("Analytics calculation requires at least one campaign data point.");
    }

    let totalSpent = 0;
    let totalRevenue = 0;
    let totalConversions = 0;

    // 1. 데이터 무결성 검증 및 집계 (Validation & Aggregation)
    for (const campaign of campaigns) {
        if (campaign.budgetSpent < 0 || campaign.totalRevenueGenerated < 0 || campaign.conversionsAchieved < 0) {
            throw new Error(`Invalid data found in campaign ${campaign.campaignId}: Negative values detected.`);
        }
        // 여기에 더 복잡한 비즈니스 규칙 검증 로직 추가 가능 (예: CPA가 너무 높으면 경고)

        totalSpent += campaign.budgetSpent;
        totalRevenue += campaign.totalRevenueGenerated;
        totalConversions += campaign.conversionsAchieved;
    }

    // 2. 핵심 KPI 계산 로직
    const totalROI = (totalRevenue / totalSpent) * 100;
    const averageCPA = totalSpent / totalConversions || 0; // 0으로 나누는 경우 방지
    const overallCR = totalConversions / (campaigns.length > 0 ? campaigns[0].impressions : 1); // 임시: 첫 캠페인 노출 수 사용 가정
    
    // 손익분기점 계산은 복잡하므로, 여기서는 단순화하여 더미 값 반환하거나 별도 서비스 호출 필요
    const breakEven = Math.floor(totalSpent / (totalRevenue * 0.1)); // 임시 로직

    return {
        totalROIPercentage: parseFloat(Math.min(Math.max(totalROI, -100), 500)).toFixed(2), // 안전하게 범위 제한
        averageCPA: parseFloat(averageCPA.toFixed(2)),
        breakEvenPointDays: Math.max(1, breakEven),
        overallConversionRate: parseFloat((overallCR * 100).toFixed(2))
    };
}

// 가상의 타입 정의 (실제 프로젝트에서는 별도 types 폴더에 있어야 함)
export interface CampaignData {
    campaignId: string;
    platform: 'GOOGLE' | 'META' | 'LOCAL';
    startDate: string;
    endDate: string;
    budgetSpent: number; // Must be >= 0
    impressions?: number; // Optional
    conversionsAchieved: number; // Must be >= 0
    totalRevenueGenerated: number; // Must be >= 0
}