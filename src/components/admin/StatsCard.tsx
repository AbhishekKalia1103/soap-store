interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatsCard({ title, value, icon, trend }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-olive-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-olive-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-olive-800 mt-1">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '+' : ''}{trend.value}% from last month
            </p>
          )}
        </div>
        <div className="w-12 h-12 bg-olive-100 rounded-lg flex items-center justify-center text-olive-600">
          {icon}
        </div>
      </div>
    </div>
  );
}
