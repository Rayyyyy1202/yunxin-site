export default function MapEmbed() {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] bg-bg-card border border-border-subtle rounded-xl overflow-hidden">
      {/* Google Maps iframe - Beijing Zhongguancun Software Park as placeholder */}
      <iframe
        title="AIeveR Robotics 总部位置"
        className="w-full h-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3269.456!2d116.2957!3d40.0419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35f051e51b7b9c89%3A0x0!2zQmVpamluZyBaaG9uZ2d1YW5jdW4gU29mdHdhcmUgUGFyaw!5e0!3m2!1sen!2s!4v1700000000000"
        style={{ filter: "invert(90%) hue-rotate(180deg) brightness(0.8)" }}
      />

      {/* Overlay label */}
      <div className="absolute top-6 left-6 bg-bg-primary/90 backdrop-blur-sm border border-border-subtle rounded-lg px-4 py-3">
        <div className="text-purple-light text-[10px] uppercase tracking-wider font-bold mb-1">
          Headquarters
        </div>
        <div className="text-text-primary text-sm font-medium">AIeveR 总部</div>
        <div className="text-text-secondary text-xs mt-0.5">
          北京 · 中关村软件园
        </div>
      </div>
    </div>
  );
}
