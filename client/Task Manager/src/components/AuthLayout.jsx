import { Link } from "react-router-dom";

const AuthLayout = ({
  variant,
  heading,
  subheading,
  featureTitle,
  featureItems,
  actionText,
  actionLink,
  actionLinkText,
  children
}) => {
  const heroColor = variant === "register" ? "from-indigo-600/30" : "from-sky-500/30";
  const accentColor = variant === "register" ? "bg-fuchsia-500/20" : "bg-indigo-500/20";

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className={`pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b ${heroColor} to-transparent blur-3xl`} />
      <div className={`pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full ${accentColor} blur-3xl`} />
      <div className="pointer-events-none absolute right-0 top-28 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 xl:grid-cols-[1.35fr_1fr] xl:items-center">
          <section className="space-y-8 rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
            <div className="space-y-4">
              <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-slate-200">
                {actionText}
              </span>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{heading}</h1>
              <p className="max-w-2xl text-lg text-slate-300">{subheading}</p>
            </div>

            <div className="grid gap-4 rounded-[1.75rem] bg-slate-950/80 p-6 text-slate-200 shadow-lg shadow-slate-950/20">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{featureTitle}</p>
                <ul className="space-y-3 text-sm leading-7 text-slate-200">
                  {featureItems.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white/5 p-4 text-sm text-slate-100">
                  <p className="font-semibold text-white">Fast access</p>
                  <p className="mt-2 text-slate-400">Sign in quickly and jump straight into your plan.</p>
                </div>
                <div className="rounded-3xl bg-white/5 p-4 text-sm text-slate-100">
                  <p className="font-semibold text-white">Modern UI</p>
                  <p className="mt-2 text-slate-400">A smooth, professional experience from first visit.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto w-full max-w-xl rounded-[2rem] bg-white p-10 shadow-2xl shadow-slate-950/20">
            {children}
            <p className="mt-6 text-center text-sm text-slate-500">
              {actionLink}
              {' '}
              <Link to={actionLinkText.href} className="font-semibold text-indigo-600 hover:text-indigo-700">
                {actionLinkText.label}
              </Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
