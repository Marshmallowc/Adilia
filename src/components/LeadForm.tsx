"use client";

import React, { useState } from "react";

interface LeadFormProps {
  onSubmitSuccess: () => void;
}

export default function LeadForm({ onSubmitSuccess }: LeadFormProps) {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    platforms: [] as string[],
    budget: "",
    timeline: "",
    details: ""
  });

  // Step validation trackers
  const isStep1Valid = formData.name.trim().length >= 2 && formData.contact.trim().length >= 5;
  const isStep2Valid = formData.platforms.length > 0;
  const isStep3Valid = formData.budget !== "" && formData.timeline !== "";
  const isStep4Valid = formData.details.trim().length >= 10;

  // Form submission status
  const [submitting, setSubmitting] = useState(false);

  const handlePlatformChange = (val: string) => {
    setFormData((prev) => {
      const exists = prev.platforms.includes(val);
      const updated = exists
        ? prev.platforms.filter((p) => p !== val)
        : [...prev.platforms, val];
      return { ...prev, platforms: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep1Valid || !isStep2Valid || !isStep3Valid || !isStep4Valid) return;

    setSubmitting(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setFormData({
          name: "",
          contact: "",
          platforms: [],
          budget: "",
          timeline: "",
          details: ""
        });
        onSubmitSuccess();
      } else {
        alert("提交失败，请稍后重试，或直接添加下方微信联系！");
      }
    } catch (err) {
      console.error(err);
      alert("网络错误，请稍后重试，或直接添加下方微信联系！");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white/80 backdrop-blur-md border border-slate-200/80 p-6 md:p-8 rounded-2xl shadow-xl relative overflow-hidden select-none"
    >
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-2xl rounded-full pointer-events-none" />

      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
          预约我的时间：免费评估与询价
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          根据您的步骤输入，系统将逐步解锁后续选项，并在 24 小时内完成商业架构评估。
        </p>
      </div>

      {/* STEP 1: Name and Contact */}
      <div className="space-y-4 animate-fade-in-up">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 font-mono tracking-wider uppercase">
            第一步 / Step 1: 称呼与联系方式
          </span>
          {isStep1Valid && (
            <span className="text-[10px] font-semibold text-teal-600 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded flex items-center gap-1 font-mono">
              ✓ 已就绪
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-xs font-bold text-slate-700 mb-1.5">
              您的称呼 *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="例如：陈先生"
              className="w-full px-4 py-2.5 bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-indigo-500 text-slate-900 rounded-lg text-xs transition-all focus:outline-none placeholder:text-slate-400"
            />
          </div>
          <div>
            <label htmlFor="contact" className="block text-xs font-bold text-slate-700 mb-1.5">
              微信 / 手机 / 邮箱 *
            </label>
            <input
              type="text"
              id="contact"
              required
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              placeholder="方便我能够及时联系您"
              className="w-full px-4 py-2.5 bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-indigo-500 text-slate-900 rounded-lg text-xs transition-all focus:outline-none placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* STEP 2: Platform Selector */}
      {isStep1Valid && (
        <div className="space-y-4 pt-6 border-t border-slate-100 progressive-step-reveal">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 font-mono tracking-wider uppercase">
              第二步 / Step 2: 您的开发需求平台 (多选)
            </span>
            {isStep2Valid && (
              <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded flex items-center gap-1 font-mono animate-pulse">
                ✓ 已选择 {formData.platforms.length} 项
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { id: "web", label: "Web / SaaS 看板" },
              { id: "mini", label: "微信小程序" },
              { id: "app", label: "uni-app (混合App)" },
              { id: "backend", label: "高并发后端开发" },
              { id: "other", label: "性能调优/毕设加急" }
            ].map((p) => {
              const selected = formData.platforms.includes(p.id);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handlePlatformChange(p.id)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                    selected
                      ? "bg-indigo-50 border-indigo-500 text-indigo-600 shadow-sm"
                      : "bg-slate-50/60 border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 3: Budget and Timeline */}
      {isStep1Valid && isStep2Valid && (
        <div className="space-y-4 pt-6 border-t border-slate-100 progressive-step-reveal">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 font-mono tracking-wider uppercase">
              第三步 / Step 3: 预算范围与期望交付周期
            </span>
            {isStep3Valid && (
              <span className="text-[10px] font-semibold text-teal-600 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded flex items-center gap-1 font-mono">
                ✓ 商务信息就绪
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="budget" className="block text-xs font-bold text-slate-700 mb-1.5">
                大致预算范围 *
              </label>
              <select
                id="budget"
                required
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-indigo-500 text-slate-900 rounded-lg text-xs transition-all focus:outline-none"
              >
                <option value="" disabled>选择预算范围</option>
                <option value="under-5k">￥5,000 以下 (指标调优/加急急单)</option>
                <option value="5k-10k">￥5,000 - ￥10,000 (标准功能定制)</option>
                <option value="10k-30k">￥10,000 - ￥30,000 (全栈系统/中型SaaS) (推荐)</option>
                <option value="above-30k">￥30,000 以上 (大型供应链/高并发系统)</option>
              </select>
            </div>
            <div>
              <label htmlFor="timeline" className="block text-xs font-bold text-slate-700 mb-1.5">
                期望交付周期 *
              </label>
              <select
                id="timeline"
                required
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-indigo-500 text-slate-900 rounded-lg text-xs transition-all focus:outline-none"
              >
                <option value="" disabled>选择周期</option>
                <option value="urgent">1周以内 (极度加急)</option>
                <option value="standard">2周 - 4周 (常规周期) (推荐)</option>
                <option value="flexible">1个月以上 (复杂大项目/慢磨精修)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Details & Submit */}
      {isStep1Valid && isStep2Valid && isStep3Valid && (
        <div className="space-y-4 pt-6 border-t border-slate-100 progressive-step-reveal">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 font-mono tracking-wider uppercase">
              第四步 / Step 4: 需求描述与立项提交
            </span>
            {isStep4Valid && (
              <span className="text-[10px] font-semibold text-teal-600 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded flex items-center gap-1 font-mono">
                ✓ 需求描述达标
              </span>
            )}
          </div>

          <div>
            <label htmlFor="details" className="block text-xs font-bold text-slate-700 mb-1.5">
              项目需求详述 * (至少 10 个字)
            </label>
            <textarea
              id="details"
              required
              rows={4}
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              placeholder="请简要介绍您的产品目标、核心业务功能以及您偏好的开发技术栈..."
              className="w-full px-4 py-2.5 bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-indigo-500 text-slate-900 rounded-lg text-xs transition-all focus:outline-none placeholder:text-slate-400 resize-none"
            />
          </div>

          {/* Action Trigger */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting || !isStep4Valid}
              className={`w-full py-3 rounded-lg font-bold text-xs text-white flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                isStep4Valid
                  ? "bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-700 hover:to-teal-700 active:scale-[0.99]"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  提报中...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                  发送项目意向，预约 Leo 的时间
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
