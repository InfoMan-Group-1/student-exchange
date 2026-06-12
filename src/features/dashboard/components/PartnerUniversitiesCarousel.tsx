import { ChevronRight, ChevronLeft } from "lucide-react";

export function PartnerUniversitiesCarousel() {
  const universities = [
    { name: "Kyoto University", country: "Japan", highlight: "Great for Engineering, Requires N3 Japanese", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80" },
    { name: "Seoul National University", country: "South Korea", highlight: "Top Business School, Korean Proficiency preferred", img: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&q=80" },
    { name: "Technical University of Munich", country: "Germany", highlight: "Leading Tech Research, English programs available", img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80" },
  ];

  return (
    <div className="bg-surface p-card-padding rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/30 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-title-lg text-title-lg text-primary">Discover Partner Universities</h3>
        <div className="flex gap-2">
          <button className="p-1 rounded bg-surface-container-low hover:bg-surface-container text-on-surface-variant"><ChevronLeft className="w-5 h-5" /></button>
          <button className="p-1 rounded bg-surface-container-low hover:bg-surface-container text-on-surface-variant"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
        {universities.map(uni => (
          <div key={uni.name} className="min-w-[260px] md:min-w-[300px] rounded-xl overflow-hidden border border-outline-variant/50 relative group cursor-pointer snap-start flex-1">
            <div className="h-40 w-full bg-surface-container-high relative">
              <img src={uni.img} alt={uni.name} className="object-cover w-full h-full opacity-90 group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 p-4 w-full">
              <p className="text-white/90 text-[10px] font-bold uppercase tracking-widest mb-1">{uni.country}</p>
              <h4 className="text-white font-title-md font-bold mb-1">{uni.name}</h4>
              <p className="text-white/80 text-[11px] leading-snug line-clamp-2">{uni.highlight}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
