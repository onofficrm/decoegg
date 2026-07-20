import { useState } from 'react';
import { HelpCircle, ChevronDown, AlertCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: '개인회생 중에도 중고차 할부 상담을 받을 수 있나요?',
      a: '네, 가능합니다. 다만 개인회생 진행 단계(신청 준비 중, 진행 중, 인가 후 변제 중 등)와 고객님의 소득 조건에 따라 검토 가능한 방향이 다릅니다. 상담을 통해 가장 적합한 금융사와 방법을 확인해 드립니다. (금융사별 심사 기준에 따라 결과는 달라질 수 있습니다.)'
    },
    {
      q: '개인회생 인가 전과 인가 후의 조건이 다른가요?',
      a: '인가 전과 인가 후는 변제 계획의 확정 여부가 다르기 때문에 취급하는 금융사와 심사 기준에 차이가 있습니다. 인가 후 꾸준히 변제금을 납부하고 계신다면 조금 더 유리한 조건으로 검토가 가능할 수 있습니다.'
    },
    {
      q: '신용점수가 낮으면 무조건 할부가 안 되나요?',
      a: '신용점수 하나만으로 모든 것을 판단하지 않습니다. 현재 소득, 재직 기간, 기존 금융 거래 패턴 등 다양한 요소를 종합적으로 고려하여 상담을 진행합니다. 단, 승인을 무조건 보장할 수는 없으며 세부 조건 확인이 필요합니다.'
    },
    {
      q: '다른 업체에서 거절된 후에도 상담할 수 있나요?',
      a: '거절 이력이 있다고 해서 무조건 불가능한 것은 아닙니다. 거절된 이유를 파악하고 현재 상황에서 다시 검토할 수 있는 여지가 있는지 꼼꼼히 확인해 드립니다.'
    },
    {
      q: '차량 구매와 추가 필요자금 상담을 함께 받을 수 있나요?',
      a: '네, 차량 대금 외에 보험료, 이전비, 초기 정비비 등 추가로 필요한 자금에 대해 함께 상담을 도와드립니다. 단, 추가 필요자금 가능 여부와 금액은 고객 조건과 금융사 심사 결과에 따라 달라지며, 상환능력을 초과하는 이용은 권장하지 않습니다.'
    },
    {
      q: '상담을 신청하면 바로 신용조회가 진행되나요?',
      a: '아니요, 상담 신청만으로는 신용조회가 진행되지 않습니다. 고객님과 충분히 상담을 나누고, 필요성과 가능성을 검토한 뒤 고객님의 동의 하에 안전하게 조회를 진행합니다.'
    },
    {
      q: '직장인이 아니어도 상담할 수 있나요?',
      a: '네, 주부, 프리랜서, 일용직 등 직장인이 아니시더라도 소득이나 상환 능력을 증명할 수 있는 다른 방법을 통해 상담을 도와드리고 있습니다.'
    },
    {
      q: '사업자나 프리랜서는 어떤 자료가 필요한가요?',
      a: '사업자등록증, 소득금액증명원, 부가세 신고자료, 건강보험/국민연금 납부내역, 통장 입금 내역 등 고객님의 상황에 맞춰 증빙 가능한 서류를 안내해 드립니다.'
    },
    {
      q: '초기 비용 없이 차량 구매가 가능한가요?',
      a: '고객님의 조건에 따라 차량 대금부터 이전비, 보험료까지 포함하여 전액 할부로 진행되는 경우가 있습니다. 하지만 이 역시 개인의 신용도와 한도에 따라 달라지므로 상담 후 정확한 안내가 가능합니다.'
    },
    {
      q: '상담 신청 후 반드시 계약해야 하나요?',
      a: '절대 그렇지 않습니다. 고객님께서 모든 조건을 확인하시고 충분히 만족하셨을 때만 계약을 진행합니다. 강요나 부담 없이 편하게 상담받아보세요.'
    },
    {
      q: '차량은 직접 확인할 수 있나요?',
      a: '네, 추천해 드린 차량은 영상통화, 상세 사진, 성능점검기록부 등을 통해 투명하게 공개하며, 원하시면 매장에 방문하여 실물 확인 및 시승도 가능합니다.'
    },
    {
      q: '전국 어디에서나 상담할 수 있나요?',
      a: '네, 전국 어디서나 전화 또는 카카오톡을 통해 비대면 상담이 가능하며, 원하시는 곳으로 차량을 탁송해 드리는 서비스도 제공하고 있습니다.'
    },
    {
      q: '상담 비용이 있나요?',
      a: '상담에는 어떠한 비용도 발생하지 않습니다. 무료 상담을 통해 가능 여부부터 꼼꼼히 확인해 보세요.'
    },
    {
      q: '월 납입금은 어떻게 결정되나요?',
      a: '차량 구매 금액, 선택하신 할부 기간, 적용되는 금리에 따라 월 납입금이 결정됩니다. 실제 금리, 기간과 월 납입금은 상담 및 심사 후 정확하게 안내해 드립니다.'
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-brand-bg relative border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-yellow/10 text-brand-yellow mb-6">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-6 tracking-tight">
            자주 묻는 질문
          </h2>
          <p className="text-lg text-brand-body leading-relaxed">
            고객님들께서 주로 궁금해하시는 내용을 정리했습니다.<br className="hidden md:block" />
            더 자세한 내용은 언제든 문의해 주세요.
          </p>
        </div>

        <div className="space-y-4 mb-16">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className={`bg-brand-card border transition-all duration-300 clip-chamfer
                  ${isOpen ? 'border-brand-yellow/50' : 'border-white/5 hover:border-white/20'}`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 sm:p-6 text-left flex justify-between items-center focus:outline-none"
                >
                  <span className={`font-bold pr-4 ${isOpen ? 'text-brand-yellow' : 'text-white'}`}>
                    Q. {faq.q}
                  </span>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-brand-yellow/10 text-brand-yellow' : 'bg-white/5 text-brand-body'}`}>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 sm:p-6 pt-0 border-t border-white/5 mt-2">
                        <p className="text-brand-body leading-relaxed pl-4 border-l-2 border-brand-yellow/30">
                          A. {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Global Disclaimers */}
        <div className="bg-[#0D1015] border border-white/5 p-6 sm:p-8 clip-chamfer">
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/5">
            <AlertCircle className="w-5 h-5 text-brand-orange" />
            <span className="font-bold text-white text-sm">상담 및 진행 시 유의사항</span>
          </div>
          <ul className="space-y-2 text-sm text-brand-body/60 list-disc pl-5">
            <li>고객 조건과 금융사별 심사 기준에 따라 결과가 달라질 수 있습니다.</li>
            <li>상담 신청만으로 금융조회가 진행되지 않으며, 고객 동의 하에 안전하게 진행됩니다.</li>
            <li>할부 승인 또는 추가자금 제공을 무조건 보장하지 않습니다.</li>
            <li>차량 계약 전 세부 조건과 이자율, 상환 일정을 반드시 확인하셔야 합니다.</li>
          </ul>
        </div>

      </div>
    </section>
  );
}
