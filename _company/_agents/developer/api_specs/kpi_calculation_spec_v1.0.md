<create_content># KPI Calculation API Specification v1.0

## Overview
This document defines the RESTful endpoints for calculating PAIN variables and Safety Margin (SM) score. The backend will eventually implement these with a database, but this spec is used to drive frontend prototyping.

### Base URL
`https://api.bds-platform.co.kr/v1/kpi`

---

## Endpoints

### 1. Calculate Current PAIN Variables
**Endpoint:** `GET /kpi/pain-variables`  
**Method:** `GET`  
**Description:** Returns the latest calculated values for A (revenue volatility) and B (cash flow error rate) from the last business day.

| Field | Type | Description |
|-------|------|-------------|
| `pain_a` | number (2 decimals) | Revenue volatility index |
| `pain_b` | number (2 decimals) | Cash flow error rate |

**Example Response:**
```json
{
  "data": {
    "pain_a": 0.87,
    "pain_b": 1.45
  },
  "timestamp": "2026-06-06T09:30:00Z"
}
```

---

### 2. Calculate Safety Margin (SM)
**Endpoint:** `GET /kpi/safety-margin`  
**Method:** `GET`  
**Description:** Computes the SM score based on the latest PAIN variables and business configuration. The formula is internal, but this endpoint exposes only the final result.

| Field | Type | Description |
|-------|------|-------------|
| `sm_score` | number (0–100) | Safety margin index |
| `pain_level` | string | One of: "critical", "warning", "normal" |
| `formula_version` | string | e.g., "v2.3.1" |

**Example Response:**
```json
{
  "data": {
    "sm_score": 72.5,
    "pain_level": "warning",
    "formula_version": "v2.3.1"
  },
  "timestamp": "2026-06-06T09:30:01Z"
}
```

---

### 3. Get SM Scale Mapping (for UI)
**Endpoint:** `GET /kpi/scale`  
**Method:** `GET`  
**Description:** Returns the thresholds for pain_level and color codes used in the gauge component.

| Field | Type | Description |
|-------|------|-------------|
| `thresholds` | object | Critical: score < 30, Warning: 30–70, Normal: > 70 |
| `colors` | array | ["#FF4500", "#FFFF00", "#00C851"] for critical, warning, normal |

**Example Response:**
```json
{
  "data": {
    "thresholds": [30, 70],
    "colors": ["#FF4500", "#FFFF00", "#00C851"],
    "labels": ["Critical", "Warning", "Normal"]
  }
}
```

---

## Notes for Frontend Prototype
- Use the `/kpi/safety-margin` endpoint as the primary data source. If offline, fallback to local mock data stored in `mock_kpi_response.json`.
- The gauge component should visually indicate pain_level via color and label.
</create_content>