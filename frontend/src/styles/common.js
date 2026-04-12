// src/styles/common.js
// Modern Vibrant Professional Theme
// Premium SaaS / Dashboard Inspired UI

// ─── Layout ───────────────────────────────────────────
export const pageBackground =
  "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen";

export const pageWrapper =
  "max-w-7xl mx-auto px-6 md:px-10 py-14";

export const section = "mb-16";

// ─── Cards ────────────────────────────────────────────
export const cardClass =
  "bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl p-7 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer";

// ─── Typography ───────────────────────────────────────
export const pageTitleClass =
  "text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-700 to-indigo-700 bg-clip-text text-transparent tracking-tight leading-tight mb-2";

export const headingClass =
  "text-3xl font-bold text-slate-900 tracking-tight";

export const subHeadingClass =
  "text-xl font-semibold text-slate-800 tracking-tight";

export const bodyText =
  "text-slate-600 leading-relaxed text-[15px]";

export const mutedText =
  "text-sm text-slate-400";

export const linkClass =
  "text-blue-600 hover:text-indigo-600 font-medium transition-colors";

// ─── Buttons ──────────────────────────────────────────
export const primaryBtn =
  "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-6 py-3 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer text-sm";

export const secondaryBtn =
  "border border-slate-200 bg-white text-slate-800 font-medium px-6 py-3 rounded-2xl hover:bg-slate-50 transition-all duration-300 cursor-pointer text-sm shadow-sm";

export const ghostBtn =
  "text-blue-600 font-medium hover:text-indigo-700 transition-colors cursor-pointer text-sm";

// ─── Forms ────────────────────────────────────────────
export const formCard =
  "bg-white/90 backdrop-blur-xl border border-white/50 rounded-3xl p-10 max-w-4xl mx-auto shadow-2xl";

export const formTitle =
  "text-3xl font-bold text-slate-900 tracking-tight text-center mb-8";

export const labelClass =
  "text-sm font-semibold text-slate-700 mb-2 block";

export const inputClass =
  "w-full bg-white border border-slate-200 rounded-2xl px-5 py-3 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all";

export const formGroup = "mb-5";

export const submitBtn =
  "w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 cursor-pointer mt-3 shadow-lg hover:shadow-xl text-sm";

// ─── Navbar ───────────────────────────────────────────
export const navbarClass =
  "sticky top-0 z-50 bg-white/75 backdrop-blur-xl border-b border-slate-200 shadow-sm";

export const navContainerClass =
  "max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between";

export const navBrandClass =
  "text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent";

export const navLinksClass =
  "flex items-center gap-4";

export const navLinkClass =
  "px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all";

export const navLinkActiveClass =
  "px-4 py-2 rounded-xl text-sm font-semibold bg-blue-100 text-blue-700";

// ─── Article / Blog ───────────────────────────────────
export const articleGrid =
  "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8";

export const articleCardClass =
  "bg-white border border-slate-200 rounded-3xl p-7 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3 cursor-pointer";

export const articleTitle =
  "text-lg font-semibold text-slate-900 leading-snug";

export const articleExcerpt =
  "text-sm text-slate-600 leading-relaxed";

export const articleMeta =
  "text-xs text-slate-400";

export const articleBody =
  "text-slate-700 leading-[1.85] text-[0.95rem] max-w-2xl";

export const timestampClass =
  "text-xs text-slate-400 flex items-center gap-1.5";

export const tagClass =
  "text-[0.65rem] font-semibold text-blue-600 uppercase tracking-widest w-fit";

// ─── Article Page ─────────────────────────────────────
export const articlePageWrapper =
  "max-w-4xl mx-auto px-6 py-14";

export const articleHeader =
  "mb-10 flex flex-col gap-4";

export const articleCategory =
  "text-[0.7rem] font-semibold uppercase tracking-widest text-blue-600";

export const articleMainTitle =
  "text-4xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight";

export const articleAuthorRow =
  "flex items-center justify-between border-y border-slate-200 py-4 text-sm text-slate-500";

export const authorInfo =
  "flex items-center gap-2 font-medium text-slate-800";

export const articleContent =
  "text-slate-700 leading-[1.9] text-[1rem] whitespace-pre-line mt-8";

export const articleFooter =
  "border-t border-slate-200 mt-12 pt-6 text-sm text-slate-400";

// ─── Article Actions ─────────────────────────────
export const articleActions =
  "flex gap-3 mt-6";

export const editBtn =
  "bg-amber-500 text-white text-sm px-4 py-2 rounded-2xl hover:bg-amber-600 transition shadow";

export const deleteBtn =
  "bg-red-500 text-white text-sm px-4 py-2 rounded-2xl hover:bg-red-600 transition shadow";

// ─── Article Status Badge ─────────────────────────
export const articleStatusActive =
  "absolute top-3 right-3 text-[10px] font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700";

export const articleStatusDeleted =
  "absolute top-3 right-3 text-[10px] font-semibold px-3 py-1 rounded-full bg-red-100 text-red-700";

// ─── Feedback ─────────────────────────────────────────
export const errorClass =
  "bg-red-50 text-red-600 border border-red-200 rounded-2xl px-4 py-3 text-sm";

export const successClass =
  "bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-2xl px-4 py-3 text-sm";

export const loadingClass =
  "text-blue-600/70 text-sm animate-pulse text-center py-10";

export const emptyStateClass =
  "text-center text-slate-400 py-16 text-sm";

// ─── Comments ───────────────────────────────────────
export const commentsWrapper =
  "mt-12 flex flex-col gap-6";

export const commentCard =
  "bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:shadow-md transition";

export const commentHeader =
  "flex items-center justify-between mb-2";

export const commentUser =
  "text-sm font-semibold text-slate-900";

export const commentTime =
  "text-xs text-slate-400";

export const commentText =
  "text-slate-700 text-sm leading-relaxed mt-1";

export const avatar =
  "w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-sm font-semibold";

export const commentUserRow =
  "flex items-center gap-3";

// ─── Divider ──────────────────────────────────────────
export const divider =
  "border-t border-slate-200 my-10";