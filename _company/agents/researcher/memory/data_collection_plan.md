<!DOCTYPE html>
<html lang="ko">
<head><meta charset="UTF-8"></head>
<body>
<h1>Factoring Lite Market Data Collection Plan (Day 1–2)</h1>
<p><strong>연구자:</strong> 🔍 Researcher | <strong>날짜:</strong> 2026-06-10</p>

<div style="background-color: #f5f5f5; padding: 1em; border-left: 4px solid #333;">
    <strong>MVP 핵심 목표:</strong> 고금리 및 유동성 부족을 해결하는 AI 기반 Factoring Lite 의 초기 수익 모델을 검증하고, 리스크 등급별 상품군을 설계하여 법적 리스크를 최소화합니다.
</div>

<h2>1️⃣ 개요</h2>
<p>Factoring Lite MVP 의 시장 진입을 위해 정확한 데이터 기반의 리스크 평가 모델과 수익성을 입증해야 합니다. 본 계획은 Day 1~2 동안 공개적으로 접근 가능한 데이터 소스를 활용하여 핵심 지표를 추출합니다.</p>

<h2>2️⃣ 공공데이터 및 정부통계 출처 (Day 1)</h2>
<table style="width: 100%; border-collapse: collapse;">
    <thead>
        <tr style="background-color: #333; color: white;">
            <th style="padding: 12px; text-align: left;">카테고리</th>
            <th style="padding: 12px; text-align: center;">URL/API 엔드포인트</th>
            <th style="padding: 12px; text-align: center;">주요 데이터 항목</th>
            <th style="padding: 12px; text-align: center;">수집 방법</th>
        </tr>
    </thead>
    <tbody>
        <tr style="background-color: #e8f5e9;">
            <td style="padding: 10px;"><strong>중소기업 통계</strong></td>
            <td style="padding: 10px;">https://opendata.go.kr/resource.json?serviceKey=YOUR_KEY&tableName=BIZSTATS000001<br/>https://kostat.go.kr/eng/statistics/data/101012.csv</td>
            <td style="padding: 10px;">중소기업 수, 매출액, 부가가치세 등</td>
            <td style="padding: 10px;">API 또는 CSV 다운로드</td>
        </tr>
        <tr style="background-color: #e8f5e9;">
            <td style="padding: 10px;"><strong>금융감독원 공시데이터</strong></td>
            <td style="padding: 10px;">https://www.fss.or.kr/data/...</td>
            <td style="padding: 10px;">기업 재무제표 공개 (팩터링 관련)</td>
            <td style="padding: 10px;">웹스크래핑 (BeautifulSoup)</td>
        </tr>
        <tr style="background-color: #e8f5e9;">
            <td style="padding: 10px;"><strong>통계청 사업체 조사</strong></td>
            <td style="padding: 10px;">https://kostat.go.kr/eng/statistics/data/101012.csv</td>
            <td style="padding: 10px;">산업별 기업 수, 매출액</td>
            <td style="padding: 10px;">직접 다운로드</td>
        </tr>
        <tr style="background-color: #e8f5e9;">
            <td style="padding: 10px;"><strong>한국은행 금융통계월보</strong></td>
            <td style="padding: 10px;">https://www.bankofkorea.or.kr/bank/kor/static/common/board/board_04.jsp?boardIdx=51&menuIdx=96</td>
            <td style="padding: 10px;">이자율, 자금조달 비용</td>
            <td style="padding: 10px;">웹 파싱</td>
        </tr>
        <tr style="background-color: #e8f5e9;">
            <td style="padding: 10px;"><strong>소상공인시장진흥공단 데이터</strong></td>
            <td style="padding: 10px;">http://www.sips.go.kr/...</td>
            <td style="padding: 10px;">소상공인 지원 사업 현황</td>
            <td style="padding: 10px;">API 또는 엑셀 파일</td>
        </tr>
    </tbody>
</table>

<p><strong>주의:</strong> 일부 API 는 서비스 키(serviceKey) 필요. Day 1 에는 우선 CSV 파일을 직접 다운로드하여 분석합니다.</p>

<h2>3️⃣ 초기 시장 잠재력 예측 모델 구축을 위한 데이터 (Day 2)</h2>
<h4>핵심 지표</h4>
<ul>
    <li><strong>수요 측면:</strong> 중소기업 수, 평균 매출액, 팩터링 이용률 추이 (통계청, 한국은행)</li>
    <li><strong>공급 측면:</strong> 금융기관 팩터링 상품 개수, 이자율 비교, 심의 기준 (금융감독원 공시)</li>
    <li><strong>리스크 지표:</strong> 부도율, 채무불이행 사건 수 (한국정보통신진흥협회 등)</li>
</ul>

<h4>모델 프레임워크</h4>
<pre style="background-color: #f5f5f5; padding: 1em;"><code># 예시: 시장 잠재력 예측 (간단한 시계열 분석)
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA

data = pd.read_csv('factoring_usage.csv')  # 통계청 팩터링 이용 데이터
model = ARIMA(data['usage'], order=(1,1,0))
forecast = model.fit()
</code></pre>

<h2>4️⃣ 경쟁사 분석 (Day 2 추가)</h2>
<p>두 곳의 Factoring 플랫폼을 선정하여 최근 활동 및 성공 콘텐츠 정리합니다:</p>
<ul>
    <li><strong>A社:</strong> 온라인 팩터링 플랫폼 (예: KCB Digital Factoring)</li>
    <li><strong>B社:</strong> AI 기반 리스크 평가 모델 사용 (예: NH AI Factoring)</li>
</ul>

<h4>분석 항목:</h4>
<ul>
    <li>주요 기능 (리스크 등급, 수수료 구조, 대시보드 UI/UX)</li>
    <li>마케팅 채널 (웹inar, 블로그, 인스타그램 등)</li>
    <li>고객 사례 (성공 스토리, 만족도)</li>
</ul>

<h2>5️⃣ 수집 계획 및 일정</h2>
<table style="width: 100%; border-collapse: collapse;">
    <thead>
        <tr style="background-color: #333; color: white;">
            <th style="padding: 12px; text-align: left;">날짜</th>
            <th style="padding: 12px; text-align: center;">작업 내용</th>
            <th style="padding: 12px; text-align: center;">산출물</th>
        </tr>
    </thead>
    <tbody>
        <tr style="background-color: #e8f5e9;">
            <td style="padding: 10px;"><strong>Day1</strong></td>
            <td style="padding: 10px;">공공데이터 API 호출 및 CSV 다운로드, 웹파싱 시도</td>
            <td style="padding: 10px;">raw_data/factoring_day1.csv, extracted_metrics.json</td>
        </tr>
        <tr style="background-color: #e8f5e9;">
            <td style="padding: 10px;"><strong>Day2</strong></td>
            <td style="padding: 10px;">경쟁사 웹사이트 분석 (BeautifulSoup), 시장 예측 모델 스프레드시트 제작</td>
            <td style="padding: 10px;">competitor_analysis.md, market_forecast.xlsx</td>
        </tr>
    </tbody>
</table>

<h2>6️⃣ 결론</h2>
<p>본 계획은 Factoring Lite 의 신뢰도를 높이기 위해 투명하고 검증 가능한 데이터를 기반으로 합니다. Day 1~2 에 수집된 데이터는 후속 개발 단계 (리스크 알고리즘 구현) 로 직접 연결됩니다.</p>
</body>
</html>