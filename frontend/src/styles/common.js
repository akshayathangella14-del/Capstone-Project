// ─── Layout ───────────────────────────────────────────
// Added a soft "Aurora" mesh gradient background for more color depth
export const pageBackground =
  "bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-blue-100 min-h-screen text-slate-900 selection:bg-indigo-200";

export const pageWrapper =
  "max-w-7xl mx-auto px-4 sm:px-8 py-16";

export const section = "mb-20";

// ─── Cards ────────────────────────────────────────────
// Glassmorphism with a subtle purple-tinted border and floating animation
export const cardClass =
  "bg-white/60 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(79,70,229,0.08)] hover:shadow-[0_30px_60px_rgba(79,70,229,0.15)] hover:-translate-y-3 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer group";

// ─── Typography ───────────────────────────────────────
// Vibrant multi-color gradient for titles
export const pageTitleClass =
  "text-6xl md:text-8xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent tracking-tighter leading-[1] mb-8 drop-shadow-sm";

export const headingClass =
  "text-3xl font-extrabold text-slate-800 tracking-tight leading-snug";

export const subHeadingClass =
  "text-xl font-bold text-indigo-600/80 tracking-tight";

export const bodyText =
  "text-slate-600 leading-relaxed text-[17px] font-medium";

export const mutedText =
  "text-sm font-bold text-indigo-400 uppercase tracking-widest";

export const linkClass =
  "text-indigo-600 hover:text-pink-500 transition-all font-bold decoration-2 underline-offset-4 hover:underline";

// ─── Buttons ──────────────────────────────────────────
// Dark professional buttons with a "glow" hover effect
export const primaryBtn =
  "relative bg-slate-900 text-white font-bold px-10 py-4 rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:bg-indigo-600 hover:shadow-[0_15px_30px_rgba(79,70,229,0.3)] hover:-translate-y-1 active:scale-95 transition-all duration-300 text-sm tracking-widest uppercase";

export const secondaryBtn =
  "bg-white/80 backdrop-blur-sm border-2 border-indigo-100 text-indigo-700 font-bold px-10 py-4 rounded-2xl hover:bg-indigo-50 hover:border-indigo-200 transition-all text-sm tracking-widest uppercase shadow-sm";

export const ghostBtn =
  "text-slate-500 font-bold hover:text-indigo-600 hover:bg-white/50 rounded-xl transition-all text-sm py-2 px-6";

// ─── Forms ────────────────────────────────────────────
// "Ultra-Glass" look with soft shadows
export const formCard =
  "bg-white/80 backdrop-blur-3xl border border-white rounded-[3rem] p-12 max-w-2xl mx-auto shadow-[0_40px_80px_-15px_rgba(79,70,229,0.15)]";

export const formTitle =
  "text-4xl font-black bg-gradient-to-r from-slate-900 to-indigo-800 bg-clip-text text-transparent text-center mb-10 tracking-tighter";

export const labelClass =
  "text-[12px] font-black text-indigo-900/60 mb-2 ml-2 block uppercase tracking-[0.2em]";

export const inputClass =
  "w-full bg-white/50 border-2 border-slate-100 rounded-2xl px-6 py-4.5 text-slate-900 text-[16px] focus:outline-none focus:ring-8 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-300 placeholder:text-slate-300 shadow-inner";

export const formGroup = "mb-8";

export const submitBtn =
  "w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white font-black py-5 rounded-2xl hover:shadow-[0_20px_40px_rgba(79,70,229,0.4)] hover:opacity-90 active:scale-[0.97] transition-all mt-4 text-lg uppercase tracking-widest";

// ─── Navbar ───────────────────────────────────────────
export const navbarClass =
  "bg-white/70 backdrop-blur-xl border-b border-white/50 px-10 h-[90px] flex items-center sticky top-0 z-50 transition-all shadow-sm";

export const navContainerClass =
  "max-w-7xl mx-auto w-full flex items-center justify-between";

export const navBrandClass =
  "text-3xl font-black tracking-tighter bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer";

export const navLinksClass =
  "flex items-center gap-12";

export const navLinkClass =
  "text-[14px] text-slate-500 hover:text-indigo-600 transition-all font-black uppercase tracking-widest";

export const navLinkActiveClass =
  "text-[14px] text-indigo-600 font-black uppercase tracking-widest relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-1 after:bg-gradient-to-r after:from-indigo-600 after:to-pink-500 after:rounded-full";

// ─── Article / Blog ───────────────────────────────────
export const articleGrid =
  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12";

export const articleCardClass =
  "group bg-white/80 backdrop-blur-sm rounded-[2.5rem] p-10 border border-white shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_70px_rgba(79,70,229,0.12)] hover:-translate-y-4 transition-all duration-700 flex flex-col gap-6";

export const articleTitle =
  "text-2xl font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors tracking-tight";

export const articleExcerpt =
  "text-slate-500 leading-relaxed text-[16px] font-medium";

export const articleMeta =
  "text-[12px] font-black text-indigo-300 tracking-[0.2em] uppercase";

export const articleBody =
  "text-slate-700 leading-loose text-[1.1rem] font-medium";

export const timestampClass =
  "text-[13px] font-bold text-slate-400 flex items-center gap-2 group-hover:text-indigo-400 transition-colors";

export const tagClass =
  "text-[10px] font-black text-white uppercase tracking-[0.2em] bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-1.5 rounded-full w-fit shadow-lg shadow-indigo-100";

// ─── Article Page ─────────────────────────────────────
export const articlePageWrapper =
  "max-w-4xl mx-auto px-6 py-24";

export const articleHeader =
  "mb-20 flex flex-col gap-8 text-center items-center";

export const articleCategory =
  "text-xs font-black uppercase tracking-[0.3em] text-white bg-slate-900 px-6 py-2 rounded-full shadow-xl";

export const articleMainTitle =
  "text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.95] drop-shadow-sm";

export const articleAuthorRow =
  "flex items-center justify-center gap-12 border-y border-indigo-50 py-10 w-full text-[13px] font-black text-slate-400 uppercase tracking-widest";

export const authorInfo =
  "flex items-center gap-4 text-indigo-600";

export const articleContent =
  "text-slate-800 leading-[2.2] text-[1.25rem] whitespace-pre-line mt-16 font-sans selection:bg-pink-100";

export const articleFooter =
  "border-t-4 border-indigo-50 mt-24 pt-12 text-[12px] font-black text-slate-300 tracking-[0.3em] uppercase";

// ─── Article Actions ─────────────────────────────
export const articleActions =
  "flex gap-6 mt-12";

export const editBtn =
  "bg-indigo-600 text-white font-black text-[12px] uppercase tracking-widest px-8 py-3 rounded-xl hover:bg-indigo-700 hover:shadow-lg transition-all active:scale-95";

export const deleteBtn =
  "bg-white border-2 border-rose-100 text-rose-600 font-black text-[12px] uppercase tracking-widest px-8 py-3 rounded-xl hover:bg-rose-50 hover:border-rose-200 transition-all";

// ─── Article Status Badge ─────────────────────────
export const articleStatusActive =
  "absolute top-8 right-8 text-[10px] font-black px-4 py-2 rounded-full bg-emerald-500 text-white uppercase tracking-[0.2em] shadow-lg shadow-emerald-100 animate-pulse";

export const articleStatusDeleted =
  "absolute top-8 right-8 text-[10px] font-black px-4 py-2 rounded-full bg-rose-500 text-white uppercase tracking-[0.2em] shadow-lg shadow-rose-100";

// ─── Feedback ─────────────────────────────────────────
export const errorClass =
  "bg-rose-50 text-rose-700 border-2 border-rose-100 rounded-[1.5rem] px-8 py-5 text-sm font-black flex items-center gap-4 shadow-xl shadow-rose-100/50";

export const successClass =
  "bg-emerald-50 text-emerald-700 border-2 border-emerald-100 rounded-[1.5rem] px-8 py-5 text-sm font-black flex items-center gap-4 shadow-xl shadow-emerald-100/50";

export const loadingClass =
  "text-transparent bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-3xl font-black animate-bounce text-center py-32 tracking-tighter";

export const emptyStateClass =
  "text-center text-indigo-200 py-32 text-2xl font-black tracking-tighter opacity-50";

// ─── Comments ───────────────────────────────────────
export const commentsWrapper =
  "mt-32 flex flex-col gap-10";

export const commentCard =
  "bg-white border border-indigo-50 rounded-[2rem] p-10 transition-all hover:shadow-[0_20px_40px_rgba(79,70,229,0.08)] hover:scale-[1.01]";

export const commentHeader =
  "flex items-center justify-between mb-6";

export const commentUser =
  "text-[17px] font-black text-slate-900 tracking-tight";

export const commentTime =
  "text-[12px] font-bold text-indigo-300 uppercase tracking-widest";

export const commentText =
  "text-slate-600 text-[16px] leading-[1.8] font-medium";

export const avatar =
  "w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center text-xl font-black shadow-xl shadow-indigo-200 ring-4 ring-white";

export const commentUserRow =
  "flex items-center gap-5";

// ─── Divider ──────────────────────────────────────────
export const divider =
  "h-1 bg-gradient-to-r from-transparent via-indigo-100 to-transparent my-24 opacity-50";