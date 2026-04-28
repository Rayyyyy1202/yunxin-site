export default function MapEmbed() {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] bg-bg-card border border-border-subtle rounded-xl overflow-hidden">
      {/* Hong Kong Science Park · Pak Shek Kok */}
      <iframe
        title="AIeveR Robotics 香港总部"
        className="w-full h-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps?q=Hong+Kong+Science+Park,+Pak+Shek+Kok&output=embed"
        style={{ filter: "invert(90%) hue-rotate(180deg) brightness(0.8)" }}
      />

      {/* Overlay label */}
      <div className="absolute top-6 left-6 bg-bg-primary/90 backdrop-blur-sm border border-border-subtle rounded-lg px-4 py-3">
        <div className="text-purple-light text-[10px] uppercase tracking-wider font-bold mb-1">
          Headquarters
        </div>
        <div className="text-text-primary text-sm font-medium">AIeveR 总部</div>
        <div className="text-text-secondary text-xs mt-0.5">
          香港科学园 · 白石角
        </div>
      </div>
    </div>
  );
}
