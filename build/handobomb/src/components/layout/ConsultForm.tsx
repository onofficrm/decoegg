import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Check, CheckCircle2, Phone, MessageCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/Button';

interface ConsultFormProps {
  initialStatus?: string;
}

export function ConsultForm({ initialStatus = '' }: ConsultFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    status: initialStatus,
    incomeType: '',
    incomeRange: '',
    vehicleType: '',
    monthlyPayment: '',
    purpose: '',
    name: '',
    phone: '',
    region: '',
    availableTime: '',
    message: '',
    agreePrivacy: false,
    agreeThirdParty: false,
  });

  useEffect(() => {
    if (initialStatus) {
      setFormData(prev => ({ ...prev, status: initialStatus }));
    }
  }, [initialStatus]);

  const updateForm = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.status) {
        setError('현재 상태를 선택해주세요.');
        return false;
      }
    } else if (step === 2) {
      if (!formData.incomeType) {
        setError('소득 형태를 선택해주세요.');
        return false;
      }
      if (!formData.incomeRange) {
        setError('월 소득 구간을 선택해주세요.');
        return false;
      }
      if (!formData.vehicleType) {
        setError('원하는 차량을 선택해주세요.');
        return false;
      }
      if (!formData.monthlyPayment) {
        setError('원하는 월 납입금을 선택해주세요.');
        return false;
      }
    } else if (step === 3) {
      if (!formData.purpose) {
        setError('상담 목적을 선택해주세요.');
        return false;
      }
    } else if (step === 4) {
      if (!formData.name.trim()) {
        setError('이름을 입력해주세요.');
        return false;
      }
      const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;
      if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
        setError('올바른 연락처 형식을 입력해주세요. (예: 010-1234-5678)');
        return false;
      }
      if (!formData.region.trim()) {
        setError('거주 지역을 입력해주세요.');
        return false;
      }
      if (!formData.agreePrivacy) {
        setError('개인정보 수집 및 이용에 동의해주세요.');
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
      setError('');
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    setError('');
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setIsSubmitting(true);
    setError('');

    try {
      const tokenRes = await fetch('/proc/inquiry-token.php', {
        method: 'GET',
        credentials: 'same-origin',
        headers: { Accept: 'application/json' },
      });
      const tokenData = await tokenRes.json();
      if (!tokenData?.success || !tokenData?.token) {
        throw new Error(tokenData?.message || '보안 토큰을 가져오지 못했습니다. 페이지를 새로고침해 주세요.');
      }

      const body = new FormData();
      body.append('onoff_inquiry_token', tokenData.token);
      body.append('name', formData.name.trim());
      body.append('phone', formData.phone.trim());
      body.append('message', formData.message.trim());
      body.append('privacy_agree', '1');
      body.append('referer_page', window.location.href);
      body.append('website_url', ''); // honeypot
      body.append('status', formData.status);
      body.append('incomeType', formData.incomeType);
      body.append('incomeRange', formData.incomeRange);
      body.append('vehicleType', formData.vehicleType);
      body.append('monthlyPayment', formData.monthlyPayment);
      body.append('purpose', formData.purpose);
      body.append('region', formData.region);
      body.append('availableTime', formData.availableTime);
      body.append('source', 'handobomb-home');
      if (formData.agreeThirdParty) {
        body.append('agreeThirdParty', '1');
      }

      const submitUrl = tokenData.action || '/proc/inquiry-submit.php';
      const submitRes = await fetch(submitUrl, {
        method: 'POST',
        body,
        credentials: 'same-origin',
        headers: { Accept: 'application/json' },
      });
      const result = await submitRes.json();

      if (!result?.success) {
        throw new Error(result?.message || '접수에 실패했습니다. 잠시 후 다시 시도해 주세요.');
      }

      setStep(5);
    } catch (err) {
      const msg = err instanceof Error ? err.message : '접수 중 오류가 발생했습니다.';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderProgressBar = () => {
    if (step === 5) return null;
    
    const steps = ['STEP 1', 'STEP 2', 'STEP 3', '신청 완료'];
    return (
      <div className="flex items-center justify-between mb-8 sm:mb-12 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/5 -z-10"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-yellow -z-10 transition-all duration-500 ease-out"
          style={{ width: `${((step - 1) / 3) * 100}%` }}
        ></div>
        
        {steps.map((label, index) => {
          const isCompleted = step > index + 1;
          const isCurrent = step === index + 1;
          
          return (
            <div key={label} className="flex flex-col items-center gap-2">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300
                  ${isCompleted ? 'bg-brand-yellow text-brand-bg' : isCurrent ? 'bg-brand-card border-2 border-brand-yellow text-brand-yellow shadow-[0_0_15px_rgba(232,255,63,0.3)]' : 'bg-brand-card border border-white/10 text-white/30'}
                `}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <span className={`text-[10px] sm:text-xs font-bold hidden sm:block ${isCurrent ? 'text-brand-yellow' : 'text-white/50'}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  const selectionOptions = {
    status: ['개인회생 신청 준비 중', '개인회생 진행 중', '개인회생 인가 후 변제 중', '개인회생 면책', '파산면책', '저신용', '기존 할부 거절', '기타'],
    incomeType: ['직장인', '사업자', '프리랜서', '일용직', '주부', '기타'],
    incomeRange: ['200만원 미만', '200만~300만원', '300만~400만원', '400만~500만원', '500만원 이상'],
    vehicleType: ['경차', '준중형', '중형', '대형', 'SUV', '승합차', '화물차', '상담 후 결정'],
    monthlyPayment: ['30만원 이하', '30만~50만원', '50만~70만원', '70만원 이상', '상담 후 결정'],
    purpose: ['차량 구매만 필요', '차량과 초기 비용 상담', '차량과 추가 필요자금 상담', '기존 차량 대차 상담', '상담 후 방향 결정']
  };

  const renderSelectButtons = (field: keyof typeof formData, options: string[], columns = 2) => (
    <div className={`grid grid-cols-2 md:grid-cols-${columns} gap-3`}>
      {options.map(option => {
        const isSelected = formData[field] === option;
        return (
          <button
            key={option}
            onClick={() => updateForm(field as string, option)}
            className={`p-3 sm:p-4 text-sm sm:text-base font-bold transition-all duration-200 border clip-chamfer text-left
              ${isSelected ? 'bg-brand-yellow/10 border-brand-yellow text-brand-yellow' : 'bg-brand-bg border-white/10 text-brand-body hover:border-brand-yellow/50 hover:text-white'}`}
          >
            {option}
          </button>
        )
      })}
    </div>
  );

  return (
    <section id="consult-form" className="py-24 bg-brand-bg relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-4 tracking-tight">
            간편 조건 확인
          </h2>
          <p className="text-brand-body">내게 맞는 정확한 솔루션을 위해 조건을 선택해주세요.</p>
        </div>

        <div className="bg-brand-card border border-white/5 clip-chamfer p-6 sm:p-10 relative">
          
          {renderProgressBar()}

          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              
              {/* STEP 1 */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="mb-6 border-l-2 border-brand-yellow pl-4">
                    <h3 className="text-xl font-bold text-white mb-2">현재 상태</h3>
                    <p className="text-sm text-brand-body">고객님의 현재 상황을 선택해주세요.</p>
                  </div>
                  {renderSelectButtons('status', selectionOptions.status, 2)}
                </motion.div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10"
                >
                  <div>
                    <div className="mb-6 border-l-2 border-brand-yellow pl-4">
                      <h3 className="text-xl font-bold text-white mb-2">소득 형태</h3>
                    </div>
                    {renderSelectButtons('incomeType', selectionOptions.incomeType, 3)}
                  </div>
                  
                  <div>
                    <div className="mb-6 border-l-2 border-brand-yellow pl-4">
                      <h3 className="text-xl font-bold text-white mb-2">월 소득 구간</h3>
                    </div>
                    {renderSelectButtons('incomeRange', selectionOptions.incomeRange, 3)}
                  </div>

                  <div>
                    <div className="mb-6 border-l-2 border-brand-yellow pl-4">
                      <h3 className="text-xl font-bold text-white mb-2">원하는 차량</h3>
                    </div>
                    {renderSelectButtons('vehicleType', selectionOptions.vehicleType, 4)}
                  </div>

                  <div>
                    <div className="mb-6 border-l-2 border-brand-yellow pl-4">
                      <h3 className="text-xl font-bold text-white mb-2">원하는 월 납입금</h3>
                    </div>
                    {renderSelectButtons('monthlyPayment', selectionOptions.monthlyPayment, 3)}
                  </div>
                </motion.div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="mb-6 border-l-2 border-brand-yellow pl-4">
                    <h3 className="text-xl font-bold text-white mb-2">상담 목적</h3>
                    <p className="text-sm text-brand-body">가장 필요하신 상담 내용을 선택해주세요.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectionOptions.purpose.map(option => (
                      <button
                        key={option}
                        onClick={() => updateForm('purpose', option)}
                        className={`p-6 text-lg font-bold transition-all duration-200 border clip-chamfer text-left
                          ${formData.purpose === option ? 'bg-brand-yellow/10 border-brand-yellow text-brand-yellow shadow-[0_0_20px_rgba(232,255,63,0.1)]' : 'bg-brand-bg border-white/10 text-brand-body hover:border-brand-yellow/30 hover:text-white'}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Final Info */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="mb-6 border-l-2 border-brand-yellow pl-4">
                    <h3 className="text-xl font-bold text-white mb-2">상담 신청 정보</h3>
                    <p className="text-sm text-brand-body">빠르고 정확한 상담을 위해 연락처를 남겨주세요.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white block">이름 <span className="text-brand-orange">*</span></label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => updateForm('name', e.target.value)}
                        className="w-full bg-brand-bg border border-white/10 p-4 text-white focus:outline-none focus:border-brand-yellow transition-colors"
                        placeholder="이름을 입력해주세요"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white block">연락처 <span className="text-brand-orange">*</span></label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => updateForm('phone', e.target.value)}
                        className="w-full bg-brand-bg border border-white/10 p-4 text-white focus:outline-none focus:border-brand-yellow transition-colors"
                        placeholder="010-0000-0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white block">거주 지역 <span className="text-brand-orange">*</span></label>
                      <input 
                        type="text" 
                        value={formData.region}
                        onChange={(e) => updateForm('region', e.target.value)}
                        className="w-full bg-brand-bg border border-white/10 p-4 text-white focus:outline-none focus:border-brand-yellow transition-colors"
                        placeholder="예: 서울, 경기 수원"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white block">상담 가능 시간</label>
                      <input 
                        type="text" 
                        value={formData.availableTime}
                        onChange={(e) => updateForm('availableTime', e.target.value)}
                        className="w-full bg-brand-bg border border-white/10 p-4 text-white focus:outline-none focus:border-brand-yellow transition-colors"
                        placeholder="예: 언제든 가능, 오후 2시 이후"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white block">문의 내용 (선택)</label>
                    <textarea 
                      value={formData.message}
                      onChange={(e) => updateForm('message', e.target.value)}
                      className="w-full bg-brand-bg border border-white/10 p-4 text-white focus:outline-none focus:border-brand-yellow transition-colors resize-none h-24"
                      placeholder="추가로 전달하실 내용을 자유롭게 적어주세요."
                    ></textarea>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 shrink-0 mt-0.5 flex items-center justify-center border transition-colors
                        ${formData.agreePrivacy ? 'bg-brand-yellow border-brand-yellow text-brand-bg' : 'border-white/20 bg-brand-bg group-hover:border-brand-yellow/50'}`}>
                        {formData.agreePrivacy && <Check className="w-3 h-3" />}
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden"
                        checked={formData.agreePrivacy}
                        onChange={(e) => updateForm('agreePrivacy', e.target.checked)}
                      />
                      <span className="text-sm text-brand-body group-hover:text-white transition-colors">
                        (필수) 개인정보 수집 및 이용에 동의합니다.
                      </span>
                    </label>
                    
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 shrink-0 mt-0.5 flex items-center justify-center border transition-colors
                        ${formData.agreeThirdParty ? 'bg-brand-yellow border-brand-yellow text-brand-bg' : 'border-white/20 bg-brand-bg group-hover:border-brand-yellow/50'}`}>
                        {formData.agreeThirdParty && <Check className="w-3 h-3" />}
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden"
                        checked={formData.agreeThirdParty}
                        onChange={(e) => updateForm('agreeThirdParty', e.target.checked)}
                      />
                      <span className="text-sm text-brand-body group-hover:text-white transition-colors">
                        (선택) 개인정보 제3자 제공에 동의합니다. (금융사 심사 시 필요)
                      </span>
                    </label>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: Success */}
              {step === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-8"
                >
                  <div className="w-24 h-24 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12 text-brand-green" />
                  </div>
                  
                  <h3 className="text-3xl font-display font-black text-white">조건 확인 신청이 완료되었습니다</h3>
                  <p className="text-lg text-brand-body max-w-lg mx-auto">
                    담당자가 내용을 확인한 후 순차적으로 연락드리겠습니다.<br />
                    빠른 상담을 원하시면 아래 방법으로 즉시 문의가 가능합니다.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
                    <Button variant="accent" size="lg" className="w-full sm:w-auto" onClick={() => window.location.href = 'tel:18004959'}>
                      <Phone className="w-5 h-5 mr-2" /> 지금 바로 전화하기
                    </Button>
                    <Button variant="primary" size="lg" className="w-full sm:w-auto" onClick={() => window.open('https://open.kakao.com/o/seC75DCi', '_blank')}>
                      <MessageCircle className="w-5 h-5 mr-2 text-brand-bg" />
                      카카오톡 상담 이어가기
                    </Button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Navigation & Error */}
          {step < 5 && (
            <div className="mt-12 pt-6 border-t border-white/5">
              
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 flex items-center gap-2 text-brand-orange bg-brand-orange/10 p-4 rounded-md border border-brand-orange/20 text-sm font-bold"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {step > 1 ? (
                  <Button variant="outline" onClick={prevStep} className="w-full sm:w-auto" disabled={isSubmitting}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> 이전 단계
                  </Button>
                ) : (
                  <div></div> // spacer
                )}
                
                {step < 4 ? (
                  <Button variant="primary" onClick={nextStep} className="w-full sm:w-auto">
                    다음 단계 <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button variant="primary" onClick={handleSubmit} className="w-full sm:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-brand-bg border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>내 조건 확인 결과 요청하기 <ArrowRight className="w-5 h-5 ml-2" /></>
                    )}
                  </Button>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
