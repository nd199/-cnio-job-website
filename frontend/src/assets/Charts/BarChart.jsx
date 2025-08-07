import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { name: 'Product', value: 65, color: '#FFE59D' },
  { name: 'Content', value: 79, color: '#FEC3C7' },
  { name: 'Finance', value: 48, color: '#D3C7F3' },
  { name: 'Design', value: 93, color: '#F8A6FF' },
];

export default function BarChartCard() {
  return (
    <div className="bg-black backdrop-blur-md p-2 rounded-xl shadow-md w-[180px]">
      <h3 className="text-xs font-semibold text-gray-400 mb-2 text-center">Job Categories</h3>
      <ResponsiveContainer width="100%" height={100}>
        <BarChart
          data={data}
          layout="horizontal"
          margin={{ top: 0, right: 0, left: 0, bottom: -20 }}
          barCategoryGap={16}
        >
          <XAxis type="category" dataKey="name" tick={false} />
          <YAxis type="number" hide domain={[0, 100]} />
          <Tooltip
            cursor={{ fill: 'transparent' }}
            contentStyle={{
              backgroundColor: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '10px',
              boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
              padding: '4px 8px',
            }}
            formatter={(value) => [`${value}%`]}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={20}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Custom Label Row */}
      <div className="flex justify-between text-[10px] mt-1 text-gray-400">
        {data.map((item) => (
          <span key={item.name} className="w-[25%] text-center truncate">
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
}
