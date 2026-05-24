"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import ProjectDetailModal from "../components/ProjectDetailModal";
import LeadForm from "../components/LeadForm";
import { projectsData, ProjectItem } from "../config/projectsData";

export default function HomePage() {
  const [filter, setFilter] = useState<"all" | "core-self" | "commercial" | "open-source">("all");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Scroll Anchor State
  const [activeSection, setActiveSection] = useState<string>("about");

  const filteredProjects = projectsData.filter((p) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  const handleOpenDetail = (project: ProjectItem) => {
    setSelectedProject(project);
    setIsDetailOpen(true);
  };

  // High-performance pointer spotlight tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const parent = e.currentTarget;
    const rect = parent.getBoundingClientRect();
    
    // We compute relative coordinates to support full page scrolls
    const x = e.clientX + window.scrollX - rect.left;
    const y = e.clientY + window.scrollY - rect.top;

    parent.style.setProperty("--x", `${x}px`);
    parent.style.setProperty("--y", `${y}px`);
  };

  // Setup dynamic IntersectionObserver for scroll-linked Left-Side vertical navigation
  useEffect(() => {
    const sections = ["about", "services", "portfolio", "inquire"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: "-25% 0px -55% 0px" // Triggers when section is roughly in the reading sweet spot
        }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="spotlight-wrapper min-h-screen text-slate-800 flex flex-col relative"
    >
      {/* Mobile Top Navbar (Hidden on desktop, floats as a minimal pill on mobile) */}
      <div className="lg:hidden w-full flex justify-center py-4 relative z-50">
        <Navbar />
      </div>

      {/* Main Container - Split dual panel */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full flex-grow flex flex-col lg:flex-row lg:justify-between relative z-10">
        
        {/* ================= FIXED LEFT COLUMN (DESKTOP FIXED NAVIGATION) ================= */}
        <header className="w-full lg:w-[40%] lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-between lg:py-24 py-12 space-y-8 lg:space-y-0">
          <div className="space-y-6">
            {/* Branding & Bio */}
            <div className="space-y-2.5">
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-none font-sans select-none">
                Adilia
              </h1>
              <h2 className="text-sm font-bold text-indigo-600 font-mono tracking-wide uppercase">
                资深全栈工程师 & 前端研发专家
              </h2>
              <p className="text-xs text-slate-400 font-bold max-w-xs leading-relaxed mt-4">
                我专注为想要快速上线、注重交互细节的客户，提供大厂规范、极限降本的 Serverless 系统交付。
              </p>
            </div>

            {/* Scroll-linked Vertical Indicator Navigation (Desktop only) */}
            <nav className="hidden lg:flex flex-col gap-4 pt-10 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 select-none">
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo("about");
                }}
                className={`nav-link-item flex items-center gap-3 transition-colors ${
                  activeSection === "about" ? "nav-link-item-active" : ""
                }`}
              >
                <span className="nav-line w-6" />
                <span className="nav-text">关于我 (ABOUT)</span>
              </a>
              
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo("services");
                }}
                className={`nav-link-item flex items-center gap-3 transition-colors ${
                  activeSection === "services" ? "nav-link-item-active" : ""
                }`}
              >
                <span className="nav-line w-6" />
                <span className="nav-text">服务 (SERVICES)</span>
              </a>

              <a
                href="#portfolio"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo("portfolio");
                }}
                className={`nav-link-item flex items-center gap-3 transition-colors ${
                  activeSection === "portfolio" ? "nav-link-item-active" : ""
                }`}
              >
                <span className="nav-line w-6" />
                <span className="nav-text">成果 (PROJECTS)</span>
              </a>

              <a
                href="#inquire"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo("inquire");
                }}
                className={`nav-link-item flex items-center gap-3 transition-colors ${
                  activeSection === "inquire" ? "nav-link-item-active" : ""
                }`}
              >
                <span className="nav-line w-6" />
                <span className="nav-text">咨询 (CONTACT)</span>
              </a>
            </nav>
          </div>

          {/* Social Links Fixed bottom */}
          <div className="flex items-center gap-4 text-xs font-bold text-slate-400 select-none">
            <a href="https://github.com/leochen-dev" target="_blank" rel="noopener" className="hover:text-slate-800 transition-colors">
              GitHub
            </a>
            <span className="text-slate-200">/</span>
            <a href="#inquire" onClick={(e) => { e.preventDefault(); handleScrollTo("inquire"); }} className="hover:text-slate-800 transition-colors">
              WeChat
            </a>
            <span className="text-slate-200">/</span>
            <a href="mailto:adiliagathings@gmail.com" className="hover:text-slate-800 transition-colors">
              Email
            </a>
          </div>
        </header>

        {/* ================= SCROLLABLE RIGHT COLUMN (CONTENT MAIN BODY) ================= */}
        <main className="w-full lg:w-[52%] lg:py-24 pb-20 space-y-32">
          
          {/* 01 ABOUT SECTION */}
          <section id="about" className="scroll-mt-24 space-y-4 animate-fade-in-up">
            <div className="lg:hidden text-[9px] font-bold tracking-widest text-indigo-600 font-mono uppercase">
              01 / ABOUT
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-bold">
              你好，我是 Adilia。我是一个追求极致细节与系统可用性的全能研发工程师。在过去的 8 年研发沉淀中，我亲手设计交付了 50+ 个商业闭环项目，涵盖跨境 SaaS、高频统计看板和高流量微信小程序。
            </p>
            <p className="text-xs text-slate-500 leading-relaxed font-bold">
              我主张**“精益架构”**。我不喜欢堆砌华而不实的服务器中间件让客户花冤枉钱。相反，我极擅长将最先进的 Serverless 函数与边缘计算网络融合，让常用小型系统长久稳定运行，而运维账单接近 0 元。
            </p>
          </section>


          {/* 02 SERVICES / TIMELINE SECTION */}
          <section id="services" className="scroll-mt-24 space-y-8 animate-fade-in-up">
            <div className="lg:hidden text-[9px] font-bold tracking-widest text-indigo-600 font-mono uppercase">
              02 / SERVICES
            </div>
            
            {/* Capability timeline cards with Group Hover Dimming */}
            <div className="group-hover-list flex flex-col gap-4">
              <div className="group-hover-item glass-panel p-6 bg-white/70 border-slate-200/50 flex flex-col justify-between min-h-[140px]">
                <h3 className="text-xs font-black text-slate-900">全栈 Web SaaS 系统开发</h3>
                <p className="text-[10px] text-slate-400 font-bold mt-1.5 leading-relaxed">
                  独立负责原型图交互、高清前端还原、Node.js 接口及容器化 CI/CD 上线。在高维统计图表中引入 Web Worker 多线程多通道离屏加速，确保百万级订单渲染绝不卡顿。
                </p>
                <div className="text-indigo-600 text-[10px] font-extrabold font-mono mt-3">
                  起步商务线索：￥12,000 / 系统交付起
                </div>
              </div>

              <div className="group-hover-item glass-panel p-6 bg-white/70 border-slate-200/50 flex flex-col justify-between min-h-[140px]">
                <h3 className="text-xs font-black text-slate-900">微信小程序 & uni-app</h3>
                <p className="text-[10px] text-slate-400 font-bold mt-1.5 leading-relaxed">
                  承接面向高流量、社交裂变的小程序开发，或移动多端（iOS/Android）配送与商户跨端应用。打包分包极限调优，静态资源 CDN 缓存部署，确保冷启动时间直降 60%。
                </p>
                <div className="text-indigo-600 text-[10px] font-extrabold font-mono mt-3">
                  起步商务线索：￥6,800 / 多端交付起
                </div>
              </div>

              <div className="group-hover-item glass-panel p-6 bg-white/70 border-slate-200/50 flex flex-col justify-between min-h-[140px]">
                <h3 className="text-xs font-black text-slate-900">系统性能调优与前端攻坚</h3>
                <p className="text-[10px] text-slate-400 font-bold mt-1.5 leading-relaxed">
                  深度诊断并修复首屏白屏等待时间过高、构建依赖摇树树枝裁剪及体积冗余等 Core Web Vitals (LCP) 核心指标硬伤，帮助既有老旧系统立竿见影提升转化率。
                </p>
                <div className="text-indigo-600 text-[10px] font-extrabold font-mono mt-3">
                  起步商务线索：￥3,500 / 指标重塑起
                </div>
              </div>
            </div>
          </section>


          {/* 03 PORTFOLIO PROJECTS SHOWCASE (GROUP HOVER DIMMING INTEGRATED) */}
          <section id="portfolio" className="scroll-mt-24 space-y-8 animate-fade-in-up">
            <div className="flex items-center justify-between">
              <div className="lg:hidden text-[9px] font-bold tracking-widest text-indigo-600 font-mono uppercase">
                03 / PROJECTS
              </div>
              
              {/* Category selector pills */}
              <div className="flex flex-wrap gap-1">
                {[
                  { id: "all", label: "全部成果" },
                  { id: "core-self", label: "精品自研" },
                  { id: "commercial", label: "商业交付" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setFilter(tab.id as any)}
                    className={`px-3 py-1 text-[9px] font-bold rounded-full border transition-all cursor-pointer ${
                      filter === tab.id
                        ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                        : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* List with fluid opacity isolation on hover */}
            <div className="group-hover-list flex flex-col gap-5">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenDetail={handleOpenDetail}
                />
              ))}
            </div>
          </section>


          {/* 04 INQUIRY / LEAD FORM SECTION */}
          <section id="inquire" className="scroll-mt-24 space-y-6 animate-fade-in-up">
            <div className="space-y-2">
              <div className="lg:hidden text-[9px] font-bold tracking-widest text-indigo-600 font-mono uppercase">
                04 / CONTACT
              </div>
              <h2 className="text-lg font-black text-slate-900">预约我的开发时间</h2>
              <p className="text-[11px] text-slate-400 font-bold leading-relaxed">
                你可以使用下方我专门设计的**“分步解锁意向收集器”**填入你的需求设想。每一个步骤通过格式验证后，系统会自动展开淡入下一步，帮助你轻松理清逻辑。我会在 24 小时内亲自评估答复。
              </p>
            </div>

            {/* Intake Form */}
            <LeadForm onSubmitSuccess={() => setShowSuccessModal(true)} />
          </section>

        </main>
      </div>

      {/* ================= MODAL: COMMERCIAL WORK ARCHIVE DETAIL ================= */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedProject(null);
        }}
      />

      {/* ================= MODAL: SUCCESS SUBMISSION PROMPT ================= */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all duration-300 animate-fade-in-up">
          <div className="relative w-full max-w-sm bg-white border border-slate-200 rounded-2xl p-6 text-center space-y-6 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto border border-teal-100 shadow-sm">
              <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-sm font-extrabold text-slate-900">意向提报已成功送达！</h3>
              <p className="text-[10px] text-slate-400 leading-relaxed font-bold">
                感谢您的信任。我已经收到您提交的项目简报与预算区间。我将会在 24 小时内亲自完成技术架构预估，并通过邮箱或微信主动与您对接。
              </p>
            </div>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-2 rounded-lg text-xs font-bold text-white bg-slate-900 hover:bg-indigo-600 transition-colors cursor-pointer"
            >
              好的，我知道了
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
