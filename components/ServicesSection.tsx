const services = [
  { title: "Strategiya", desc: "Aniq, o'lchanadigan o'sish rejasi." },
  { title: "Sistema", desc: "Jarayonlarni avtomatlashtirish va tartibga solish." },
  { title: "Ijro", desc: "Reja qog'ozda qolmaydi — biz birga amalga oshiramiz." },
];

export default function ServicesSection() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <h2 className="reveal-item text-3xl font-semibold text-white sm:text-4xl">
        Xizmatlarimiz
      </h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {services.map((s) => (
          <div key={s.title} className="reveal-item rounded-2xl bg-white/5 p-6">
            <h3 className="text-lg font-medium text-white">{s.title}</h3>
            <p className="mt-2 text-sm text-white/70">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}