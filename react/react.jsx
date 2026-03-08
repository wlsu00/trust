import { useState } from "react";

const steps = [
  {
    id: 1,
    title: "위탁판매란?",
    icon: "📦",
    color: "#C8A96E",
    content: {
      summary: "공급자가 소유권은 유지하면서 판매·출고 권한만 한국철근거래소에 위임하는 방식",
      items: [
        { label: "소유권", value: "공급자 보유", icon: "🔑" },
        { label: "판매·출고 권한", value: "한국철근거래소 대행", icon: "🏢" },
        { label: "실물 보관", value: "보세창고 (물리적 이동 없음)", icon: "🏭" },
      ],
      reasons: [
        {
          title: "절차 간소화",
          desc: "소유권 이전 없이 판매 권한만 위임하므로 계약·정산·행정 절차의 반복 최소화",
        },
        {
          title: "신속한 판매 대응",
          desc: "보세창고 보관 상태에서 즉시 출고 가능. 구매자 확정 시 빠른 출하로 판매 기회 확보",
        },
      ],
    },
  },
  {
    id: 2,
    title: "안전장치",
    icon: "🛡️",
    color: "#7EB8A4",
    content: {
      summary: "공급자를 보호하는 두 가지 핵심 안전장치",
      safeties: [
        {
          title: "위탁 해지 권한",
          icon: "⚡",
          desc: "공급자는 판매 전까지 언제든지 위탁을 즉시 해지할 수 있음",
          detail: "한국철근거래소 사이트에서 '삭제' 버튼 클릭 시 즉시 위탁등록내역이 삭제되며, 해당 제품은 사이트 내 구매 불가",
        },
        {
          title: "제3자 보관 구조",
          icon: "🏛️",
          desc: "보세창고(제3자)가 실물을 독립적으로 관리",
          detail: "위·수탁자가 아닌 독립적인 제3자가 재고 관리. 보관인을 통한 재고 실사 및 출고 기록 확보 가능",
        },
      ],
    },
  },
  {
    id: 3,
    title: "판매 절차",
    icon: "🔄",
    color: "#8B9ED4",
    content: {
      summary: "위탁 등록부터 상품 인도까지 4단계 프로세스",
      flow: [
        {
          step: "① 위탁 등록",
          actor: "공급자 → 한국철근거래소",
          desc: "상품 위탁 등록 (실물은 보세창고 보관 유지). 승인 시 카카오톡·이메일 알림톡 발송",
        },
        {
          step: "② 구매 확정",
          actor: "구매자 → 한국철근거래소",
          desc: "구매 의사 표시 후 입금 완료 시 확정. 1시간 이내 미입금 시 주문 취소",
        },
        {
          step: "③ 출고 지시",
          actor: "한국철근거래소 → 보세창고",
          desc: "판매 확정 후 보세창고에 출하 지시",
        },
        {
          step: "④ 상품 인도",
          actor: "보세창고 → 구매자",
          desc: "구매자 또는 지정 장소로 출고. 완료 시 공급자에게 알림톡 발송",
        },
      ],
    },
  },
  {
    id: 4,
    title: "상품 등록방법",
    icon: "📝",
    color: "#D4936B",
    content: {
      summary: "총 6단계로 위탁 상품을 등록합니다",
      steps: [
        { num: "①", title: "출고지 정보 입력", desc: "출고지(현재 보관중인 창고) 선택 후 판매상품 위탁 동의 체크" },
        { num: "②", title: "공급 상품 등록", desc: "메이커, 강종, 굵기, 규격, 수량, 단가 등 상품 정보 기입" },
        { num: "③", title: "상품 사진 등록", desc: "태그전면·바디·근거리·원거리 등 예시에 맞는 사진 업로드 (jpg/png/gif, 10MB 이하)" },
        { num: "④", title: "상품 추가 조건", desc: "홀수톤 판매, 배송 수량 제한(차량단위 판매) 등 해당 항목 체크" },
        { num: "⑤", title: "첨부서류", desc: "밀시트(Mill Certificate Sheet), 국내 시험성적서 등 필요 시 첨부" },
        { num: "⑥", title: "약관 동의", desc: "이용약관 및 개인정보처리방침에 동의 후 '상품 등록 요청하기' 클릭" },
      ],
    },
  },
  {
    id: 5,
    title: "밀시트",
    icon: "📋",
    color: "#B07BAC",
    content: {
      summary: "제조사가 발행하는 제품 품질증명서 (Mill Certificate Sheet)",
      definition: [
        "제조사가 화학성분 및 기계적 성질을 시험·기재하여 발행",
        "보통 Lot 단위로 발행",
        "해당 Lot를 대표하는 시험 결과로 전수검사를 의미",
      ],
      roles: [
        {
          title: "품질 증빙",
          icon: "✅",
          desc: "KS 기준 적합 여부, 화학성분 및 기계적 성질 확인 가능",
        },
        {
          title: "구매자 제출",
          icon: "📄",
          desc: "관급공사, 대형 건설현장, 감리 현장 등에서 필수 제출 서류",
        },
      ],
      register: "공급자 상품 등록 시 마지막 단계(첨부서류)에서 파일로 등록",
    },
  },
];

export default function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [expandedFlow, setExpandedFlow] = useState(null);

  const step = steps[activeStep];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F5F0E8",
      fontFamily: "'Noto Serif KR', 'Georgia', serif",
      color: "#2C2416",
    }}>
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .step-btn { transition: all 0.25s ease; cursor: pointer; border: none; }
        .step-btn:hover { transform: translateY(-2px); }
        .flow-card { transition: all 0.2s ease; cursor: pointer; }
        .flow-card:hover { transform: translateX(4px); }
        .fade-in { animation: fadeIn 0.4s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Header */}
      <div style={{
        background: "#2C2416",
        color: "#F5F0E8",
        padding: "32px 40px 28px",
        borderBottom: `4px solid ${step.color}`,
      }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ fontSize: 12, letterSpacing: 4, color: "#C8A96E", marginBottom: 8, textTransform: "uppercase" }}>
            한국철근거래소
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>
            위탁판매 가이드
          </h1>
          <div style={{ fontSize: 13, color: "#9A8E7A", marginTop: 6 }}>공급자(위탁자) 기준 · 2026.02.20</div>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 24px" }}>

        {/* Step Navigation */}
        <div style={{
          display: "flex",
          gap: 8,
          marginBottom: 32,
          flexWrap: "wrap",
        }}>
          {steps.map((s, i) => (
            <button
              key={s.id}
              className="step-btn"
              onClick={() => { setActiveStep(i); setExpandedFlow(null); }}
              style={{
                padding: "10px 18px",
                borderRadius: 4,
                background: activeStep === i ? s.color : "#E8E0D0",
                color: activeStep === i ? "#fff" : "#5A4E3A",
                fontFamily: "inherit",
                fontSize: 14,
                fontWeight: activeStep === i ? 700 : 400,
                display: "flex",
                alignItems: "center",
                gap: 6,
                boxShadow: activeStep === i ? `0 4px 16px ${s.color}55` : "none",
              }}
            >
              <span>{s.icon}</span>
              <span>{s.title}</span>
            </button>
          ))}
        </div>

        {/* Content Card */}
        <div className="fade-in" key={activeStep} style={{
          background: "#fff",
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: "0 2px 24px rgba(44,36,22,0.08)",
          border: `1px solid #E8E0D0`,
        }}>
          {/* Card Header */}
          <div style={{
            background: step.color,
            padding: "24px 32px",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}>
            <span style={{ fontSize: 36 }}>{step.icon}</span>
            <div>
              <div style={{ fontSize: 11, letterSpacing: 3, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", marginBottom: 4 }}>
                Step {step.id} / {steps.length}
              </div>
              <h2 style={{ fontSize: 22, color: "#fff", fontWeight: 700 }}>{step.title}</h2>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", marginTop: 4 }}>{step.content.summary}</p>
            </div>
          </div>

          {/* Card Body */}
          <div style={{ padding: "28px 32px" }}>

            {/* Step 1 - 위탁판매란 */}
            {activeStep === 0 && (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
                  {step.content.items.map((item, i) => (
                    <div key={i} style={{
                      background: "#F5F0E8",
                      borderRadius: 6,
                      padding: "16px 20px",
                      borderLeft: `3px solid ${step.color}`,
                    }}>
                      <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
                      <div style={{ fontSize: 11, color: "#9A8E7A", letterSpacing: 1, marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#2C2416" }}>{item.value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 13, color: "#7A6E5A", marginBottom: 16, letterSpacing: 1 }}>운영 이유</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {step.content.reasons.map((r, i) => (
                    <div key={i} style={{
                      background: "#F5F0E8",
                      borderRadius: 6,
                      padding: "18px 22px",
                    }}>
                      <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 15 }}>{r.title}</div>
                      <div style={{ fontSize: 13, color: "#5A4E3A", lineHeight: 1.7 }}>{r.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 - 안전장치 */}
            {activeStep === 1 && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {step.content.safeties.map((s, i) => (
                  <div key={i} style={{
                    background: "#F5F0E8",
                    borderRadius: 6,
                    padding: "22px 24px",
                    borderTop: `3px solid ${step.color}`,
                  }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{s.title}</div>
                    <div style={{ fontSize: 14, color: "#5A4E3A", marginBottom: 12, lineHeight: 1.6 }}>{s.desc}</div>
                    <div style={{
                      background: "#fff",
                      borderRadius: 4,
                      padding: "12px 14px",
                      fontSize: 12,
                      color: "#7A6E5A",
                      lineHeight: 1.7,
                      borderLeft: `2px solid ${step.color}`,
                    }}>{s.detail}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 3 - 판매 절차 */}
            {activeStep === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {step.content.flow.map((f, i) => (
                  <div
                    key={i}
                    className="flow-card"
                    onClick={() => setExpandedFlow(expandedFlow === i ? null : i)}
                    style={{
                      background: expandedFlow === i ? "#F5F0E8" : "#FAFAF8",
                      borderRadius: 6,
                      padding: "16px 22px",
                      border: `1px solid ${expandedFlow === i ? step.color : "#E8E0D0"}`,
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <span style={{
                          background: step.color,
                          color: "#fff",
                          borderRadius: 4,
                          padding: "4px 10px",
                          fontSize: 13,
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                        }}>{f.step}</span>
                        <span style={{ fontSize: 14, color: "#5A4E3A", fontWeight: 600 }}>{f.actor}</span>
                      </div>
                      <span style={{ color: step.color, fontSize: 18 }}>{expandedFlow === i ? "▲" : "▼"}</span>
                    </div>
                    {expandedFlow === i && (
                      <div style={{
                        marginTop: 14,
                        paddingTop: 14,
                        borderTop: `1px solid #E8E0D0`,
                        fontSize: 14,
                        color: "#2C2416",
                        lineHeight: 1.8,
                      }}>{f.desc}</div>
                    )}
                  </div>
                ))}
                <div style={{ fontSize: 12, color: "#9A8E7A", marginTop: 4, textAlign: "center" }}>
                  ▼ 각 단계를 클릭하면 상세 내용을 확인할 수 있어요
                </div>
              </div>
            )}

            {/* Step 4 - 상품 등록방법 */}
            {activeStep === 3 && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {step.content.steps.map((s, i) => (
                  <div key={i} style={{
                    background: "#F5F0E8",
                    borderRadius: 6,
                    padding: "16px 20px",
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                  }}>
                    <span style={{
                      background: step.color,
                      color: "#fff",
                      borderRadius: "50%",
                      width: 30,
                      height: 30,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}>{i + 1}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{s.title}</div>
                      <div style={{ fontSize: 12, color: "#5A4E3A", lineHeight: 1.7 }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 5 - 밀시트 */}
            {activeStep === 4 && (
              <div>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 13, color: "#7A6E5A", letterSpacing: 1, marginBottom: 12 }}>정의</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {step.content.definition.map((d, i) => (
                      <div key={i} style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        fontSize: 14,
                        color: "#2C2416",
                        lineHeight: 1.6,
                      }}>
                        <span style={{ color: step.color, fontWeight: 700 }}>—</span>
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 13, color: "#7A6E5A", letterSpacing: 1, marginBottom: 12 }}>역할</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    {step.content.roles.map((r, i) => (
                      <div key={i} style={{
                        background: "#F5F0E8",
                        borderRadius: 6,
                        padding: "18px 22px",
                        borderLeft: `3px solid ${step.color}`,
                      }}>
                        <div style={{ fontSize: 24, marginBottom: 8 }}>{r.icon}</div>
                        <div style={{ fontWeight: 700, marginBottom: 6 }}>{r.title}</div>
                        <div style={{ fontSize: 13, color: "#5A4E3A", lineHeight: 1.7 }}>{r.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{
                  background: "#2C2416",
                  color: "#F5F0E8",
                  borderRadius: 6,
                  padding: "16px 22px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontSize: 14,
                }}>
                  <span style={{ fontSize: 20 }}>📎</span>
                  <div>
                    <span style={{ color: step.color, fontWeight: 700 }}>등록 방법: </span>
                    {step.content.register}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Navigation */}
          <div style={{
            borderTop: "1px solid #E8E0D0",
            padding: "16px 32px",
            display: "flex",
            justifyContent: "space-between",
            background: "#FAFAF8",
          }}>
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              style={{
                padding: "10px 20px",
                borderRadius: 4,
                border: "1px solid #E8E0D0",
                background: activeStep === 0 ? "#F0EBE0" : "#fff",
                color: activeStep === 0 ? "#C0B8A8" : "#2C2416",
                cursor: activeStep === 0 ? "not-allowed" : "pointer",
                fontFamily: "inherit",
                fontSize: 14,
              }}
            >← 이전</button>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {steps.map((s, i) => (
                <div key={i} onClick={() => setActiveStep(i)} style={{
                  width: i === activeStep ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === activeStep ? step.color : "#E8E0D0",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }} />
              ))}
            </div>
            <button
              onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
              disabled={activeStep === steps.length - 1}
              style={{
                padding: "10px 20px",
                borderRadius: 4,
                border: "none",
                background: activeStep === steps.length - 1 ? "#E8E0D0" : step.color,
                color: "#fff",
                cursor: activeStep === steps.length - 1 ? "not-allowed" : "pointer",
                fontFamily: "inherit",
                fontSize: 14,
                fontWeight: 600,
              }}
            >다음 →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
