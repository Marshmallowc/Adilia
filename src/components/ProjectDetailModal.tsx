"use client";

import React, { useState, useEffect } from "react";
import { ProjectItem } from "../config/projectsData";

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"readme" | "architecture" | "database">("readme");

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !project || !project.desensitizedDoc) return null;

  const doc = project.desensitizedDoc;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all duration-300 animate-fade-in-up">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Content - Elegant Light Mode Card */}
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-white border border-slate-200/80 rounded-2xl flex flex-col shadow-2xl overflow-hidden z-10">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest font-mono bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full">
              商业交付脱敏档案 / Commercial Case
            </span>
            <h2 className="text-lg font-black text-slate-900 mt-2">{doc.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="关闭弹窗"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Scrollable Container */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          
          {/* Visual Showcase (30s dynamic video description) */}
          <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-6 text-center relative overflow-hidden group shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-teal-500/5 pointer-events-none" />
            <div className="relative flex flex-col items-center justify-center py-4">
              <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-3.5 border border-indigo-100 shadow-sm">
                <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                </svg>
              </div>
              <h4 className="text-xs font-extrabold text-slate-800 mb-1">
                交付演示录像 (30s 核心功能脱敏版)
              </h4>
              <p className="text-[11px] text-slate-500 max-w-md">
                此模块为向客户展示的交互录屏，展示响应速度与流畅度。因隐私保密协议，我对敏感数据与内部域名进行了模糊与替换。
              </p>
              
              {/* Interactive Screens placeholders */}
              <div className="grid grid-cols-2 gap-4 mt-6 w-full max-w-lg">
                <div className="aspect-video bg-white border border-slate-200 rounded-lg flex items-center justify-center text-xs text-slate-400 font-mono shadow-sm">
                  [系统看板 - 核心交互演示]
                </div>
                <div className="aspect-video bg-white border border-slate-200 rounded-lg flex items-center justify-center text-xs text-slate-400 font-mono shadow-sm">
                  [数据报表 - 离线导出演示]
                </div>
              </div>
            </div>
          </div>

          {/* Progressive Tabbed Documentation */}
          <div>
            {/* Tab Controls */}
            <div className="flex border-b border-slate-200 mb-6 font-semibold text-xs gap-1.5 overflow-x-auto">
              <button
                onClick={() => setActiveTab("readme")}
                className={`pb-3 px-4 border-b-2 transition-all cursor-pointer ${
                  activeTab === "readme"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                1. 部署与交付说明 (README)
              </button>
              <button
                onClick={() => setActiveTab("architecture")}
                className={`pb-3 px-4 border-b-2 transition-all cursor-pointer ${
                  activeTab === "architecture"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                2. 核心架构设计 (Architecture)
              </button>
              <button
                onClick={() => setActiveTab("database")}
                className={`pb-3 px-4 border-b-2 transition-all cursor-pointer ${
                  activeTab === "database"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                3. 数据设计表 (Schema)
              </button>
            </div>

            {/* Tab Content Panels - Premium contrast codes */}
            <div className="bg-slate-950 border border-slate-900 rounded-xl p-5 md:p-6 min-h-[220px]">
              {activeTab === "readme" && (
                <div className="space-y-4 text-xs text-slate-300 leading-relaxed font-sans progressive-step-reveal">
                  <h4 className="text-white font-bold text-sm mb-2 font-mono">部署指南 (README.md)</h4>
                  <pre className="p-4 rounded-lg bg-black text-slate-300 font-mono text-xs overflow-x-auto border border-zinc-900 leading-normal whitespace-pre-wrap">
                    {doc.readmeContent}
                  </pre>
                </div>
              )}

              {activeTab === "architecture" && (
                <div className="space-y-4 text-xs text-slate-300 leading-relaxed progressive-step-reveal font-sans">
                  <h4 className="text-white font-bold text-sm">我设计的系统架构与并发调优方案</h4>
                  <p className="text-slate-400 font-medium leading-relaxed">{doc.architectureDescription}</p>
                  <div className="p-3.5 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse flex-shrink-0" />
                    <span className="text-[11px] text-zinc-500 font-mono">
                      架构设计经过严密压力测试，已在生产环境中完成平稳上线。
                    </span>
                  </div>
                </div>
              )}

              {activeTab === "database" && (
                <div className="space-y-4 text-xs text-slate-300 leading-relaxed progressive-step-reveal">
                  <h4 className="text-white font-bold text-sm mb-2 font-mono">PostgreSQL 核心建表语句</h4>
                  <pre className="p-4 rounded-lg bg-black text-emerald-400/90 font-mono text-xs overflow-x-auto border border-zinc-900 leading-normal">
                    {doc.databaseSchema}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors cursor-pointer"
          >
            返回主页
          </button>
        </div>

      </div>
    </div>
  );
}
