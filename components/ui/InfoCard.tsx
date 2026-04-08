interface InfoCardProps {
  icon: string;
  title: string;
  description: string;
  bgColor: string;
}

export default function InfoCard({ icon, title, description, bgColor }: InfoCardProps) {
  return (
    <div className={`${bgColor} rounded-2xl p-6 hover:shadow-md transition-shadow cursor-default`}>
      <span className="text-3xl">{icon}</span>
      <h3 className="mt-3 font-bold text-ok-navy text-lg">{title}</h3>
      <p className="mt-2 text-ok-gray-700 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
