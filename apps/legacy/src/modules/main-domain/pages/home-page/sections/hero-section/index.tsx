export function HeroSection() {
  const logos = ["HubSpot", "Salesforce", "Zendesk", "Pipedrive", "Monday"];

  const chatMessages = [
    { from: "user", text: "Can I extend my rental for a day?" },
    { from: "bot", text: "Sure, can you provide me with your booking number?" },
    { from: "user", text: "Sure, it's VF034280." },
    { from: "bot", text: "Got it. I see your reservation ends today at 3pm, would you like to extend it?" },
  ];

  return (
    <div className="flex flex-col">
      {/* ── Hero text area ── */}
      <section className="bg-[#f2f1ee] px-6 pt-20 pb-16 text-center">
        <h1
          className="mx-auto max-w-3xl text-5xl font-normal leading-[1.12] tracking-[-0.01em] text-gray-900 sm:text-6xl lg:text-[64px]"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Close more deals,<br />
          grow revenue faster
        </h1>

        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-gray-500">
          The CRM platform that helps sales teams own every customer
          interaction — improving resolution, controlling costs, and delivering
          better customer outcomes.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-full bg-[#3d7eff] px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#2d6ef0]"
          >
            Book a demo
            <svg className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors duration-150 hover:border-gray-400 hover:text-gray-900"
          >
            Sign up for free
          </a>
        </div>
      </section>

      {/* ── Logo strip ── */}
      <div className="border-y border-gray-200 bg-[#f2f1ee]">
        <div className="mx-auto flex max-w-5xl items-stretch divide-x divide-gray-200">
          {/* Left label */}
          <div className="flex items-center px-5 py-3.5">
            <span className="text-xs text-gray-400 whitespace-nowrap">Choose case study</span>
          </div>
          {/* Logo items */}
          {logos.map((name) => (
            <button
              key={name}
              className="flex flex-1 items-center justify-center px-5 py-3.5 text-sm font-semibold text-gray-500 transition-colors duration-150 hover:text-gray-800"
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* ── Aerial image section ── */}
      <div className="relative w-full overflow-hidden" style={{ height: "480px" }}>
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: "url('/trees.jpg')" }}
        />

        {/* Subtle dark overlay */}
        <div className="absolute inset-0 bg-black/20" />



        {/* Stat card — bottom left */}
        <div className="absolute bottom-0 left-12 w-52 rounded-t-xl border border-b-0 border-gray-200 bg-white px-5 pt-5 pb-7 shadow-lg">
          <p className="text-3xl font-semibold tracking-tight text-gray-900">82%</p>
          <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-gray-400">User satisfaction</p>
          <p className="mt-3 text-[11px] leading-relaxed text-gray-500">
            Salesforce migrated 3,000+ reps to our platform in 6 weeks, cutting onboarding time by 40%.
          </p>
        </div>

        {/* Chat card — horizontally centered */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] rounded-t-xl border border-b-0 border-gray-200 bg-white shadow-lg overflow-hidden">
          <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3d7eff] text-[9px] font-bold text-white">AI</div>
            <span className="text-xs font-medium text-gray-700">Support Agent</span>
            <span className="ml-auto flex items-center gap-1.5 text-[10px] font-medium text-emerald-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Online
            </span>
          </div>
          <div className="space-y-2.5 px-4 py-3">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-end gap-2 ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.from === "bot" && (
                  <div className="mb-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#3d7eff] text-[8px] font-bold text-white">AI</div>
                )}
                <div
                  className={`max-w-[78%] rounded-2xl px-3 py-2 text-[11px] leading-snug ${
                    msg.from === "user"
                      ? "rounded-br-sm bg-gray-100 text-gray-600"
                      : "rounded-bl-sm bg-[#3d7eff] text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
