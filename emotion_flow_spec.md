# Emotion Flow Specification
## 🎨 Color Palette & Easing Functions
- **Pain (불안 구간):** Primary Color: #F48D52 (Amber/Warning) | Transition Easing: easeInOutSine (느리고 부드러운 불안감 표현)
- **Relief (안도 구간):** Primary Color: #64B5F6 (Blue/Calm) | Transition Easing: easeOutCubic (빠르고 명확한 안도감 표현)
- **Control (통제권 회복):** Primary Color: #48BB78 (Green/Success) | Transition Easing: easeInElastic (목표 달성의 탄력적인 느낌)
- **Transition (전환 구간):** Interpolate between Pain and Relief using a custom transition function defined by the specific KPI data.

## ⚙️ State Transition Logic
- Flow is driven by `Guidance_Flag` received from the API (e.g., 'A', 'B', 'C').
- Each flag maps to a specific state change (Pain $\rightarrow$ Relief $\rightarrow$ Control).

## 📊 KPI Integration
- The transition speed and color intensity must be dynamically modulated by the incoming KPI data (e.g., Risk Score, Time Saved).
- **Guidance_Flag** is mandatory for triggering the narrative flow.