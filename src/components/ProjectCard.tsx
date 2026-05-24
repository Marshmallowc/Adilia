"use client";

import React from "react";
import { ProjectItem } from "../config/projectsData";

interface ProjectCardProps {
  project: ProjectItem;
  onOpenDetail: (project: ProjectItem) => void;
}

export default function ProjectCard({ project, onOpenDetail }: ProjectCardProps) {
  const { title, category, description, techTags, liveUrl, githubUrl, completionDate, role } = project;

  // Tiny minimalist category tags
  const categoryBadge = () => {
    switch (category) {
      case "core-self":
        return (
          <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-slate-900 text-white select-none">
            精品自研
          </span>
        );
      case "commercial":
        return (
          <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 select-none">
            商业交付
          </span>
        );
      case "open-source":
        return (
          <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-slate-100 text-slate-500 select-none">
            开源项目
          </span>
        );
    }
  };

  return (
    <article
      onClick={() => category === "commercial" && onOpenDetail(project)}
      className={`group-hover-item glass-panel p-6 flex flex-col justify-between h-full bg-white/70 border-slate-200/50 hover:border-indigo-400/40 transition-all select-none rounded-2xl ${
        category === "commercial" ? "cursor-pointer" : ""
      }`}
    >
      <div>
        {/* Header Meta */}
        <div className="flex items-center justify-between mb-4">
          {categoryBadge()}
          <span className="text-[10px] text-slate-400 font-mono font-bold">{completionDate}</span>
        </div>

        {/* Title & Arrow Hover Slide Effect */}
        <h3 className="text-sm font-extrabold text-slate-900 leading-snug font-sans mb-1.5 flex items-center gap-1 group-hover:text-indigo-600 transition-colors">
          <span>{title}</span>
          <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-slate-400 group-hover:text-indigo-600 text-xs">
            ↗
          </span>
        </h3>

        {/* Role Sub-Info */}
        <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-3 flex items-center gap-1">
          <span>•</span>
          <span>担任角色: {role}</span>
        </div>

        {/* Description */}
        <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      {/* Tech Tags & Actions */}
      <div className="mt-5">
        <div className="flex flex-wrap gap-1 mb-4">
          {techTags.map((tag) => (
            <span
              key={tag}
              className="spring-tag text-[9px] font-mono px-2 py-0.5 rounded bg-slate-50 border border-slate-100 text-slate-500 font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Dynamic Buttons */}
        <div className="flex items-center gap-2 pt-2.5 border-t border-slate-100">
          {category === "core-self" && (
            <>
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-1.5 px-3 text-[10px] font-extrabold rounded-full bg-slate-900 hover:bg-indigo-600 text-white transition-colors cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  在线体验
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-3 text-[10px] font-bold rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 transition-all cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  源码
                </a>
              )}
            </>
          )}

          {category === "commercial" && (
            <span className="text-[10px] font-extrabold text-slate-800 flex items-center gap-1 group-hover:text-indigo-600 transition-colors">
              查看脱敏交付工程档案
            </span>
          )}

          {category === "open-source" && (
            <>
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-1.5 px-3 text-[10px] font-extrabold rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition-all flex items-center justify-center gap-1 cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  GitHub 仓库 ↗
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  );
}
