import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const data = [
  { month: 'Jan', value: 10 },
  { month: 'Feb', value: 5 },
  { month: 'Mar', value: 15 },
  { month: 'Apr', value: 10 },
  { month: 'May', value: 35 },
  { month: 'Jun', value: 30 },
  { month: 'Jul', value: 35 },
  { month: 'Aug', value: 50 },
  { month: 'Sep', value: 45 },
  { month: 'Oct', value: 25 },
  { month: 'Nov', value: 25 },
  { month: 'Dec', value: 60 }
]

const Home = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2  shadow-2xl rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Sales Revenue
          </h3>

          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    background: '#0f172a',
                    borderRadius: '8px',
                    border: 'none',
                    color: 'white'
                  }}
                  labelStyle={{ color: '#c7d2fe' }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#2563eb' }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full">
      <div className="shadow-2xl rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">
            Top selling products
          </h3>

          <button className="flex items-center gap-1 text-sm hover">
            See All
            <span className="text-lg">→</span>
          </button>
        </div>

        <ul className="space-y-5">
          {[1, 2, 3, 4, 5].map((item) => (
            <li
              key={item}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden">
                  <img
                    src="https://via.placeholder.com/40x40"
                    alt="product"
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="font-semibold leading-tight">
                    Healthcare Erbology
                  </p>
                  <p className="text-sm">
                    in Accessories
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold text-emerald-500">
                  13,153
                </p>
                <p className="text-sm">
                  in sales
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
  <div className="w-full mt-[30px] shadow-2xl rounded-[10px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className=" rounded-xl p-6">
          <h3 className="text-lg font-semibold  mb-4">
            Recent Transactions
          </h3>

          <div className="grid grid-cols-4 text-sm pb-3">
            <span>Name</span>
            <span>Date</span>
            <span>Amount</span>
            <span>Status</span>
          </div>

          <div className="space-y-4">
            {[
              { name: 'Jagarnath S.', date: '24.05.2023', amount: '$124.97', status: 'Paid' },
              { name: 'Anand G.', date: '23.05.2023', amount: '$55.42', status: 'Pending' },
              { name: 'Kartik S.', date: '23.05.2023', amount: '$89.90', status: 'Paid' },
              { name: 'Rakesh S.', date: '22.05.2023', amount: '$144.94', status: 'Pending' },
              { name: 'Anup S.', date: '22.05.2023', amount: '$70.52', status: 'Paid' },
              { name: 'Jimmy P.', date: '22.05.2023', amount: '$70.52', status: 'Paid' }
            ].map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-4 items-center text-sm"
              >
                <span>{row.name}</span>
                <span>{row.date}</span>
                <span>{row.amount}</span>
                <span>
                  <span
                    className={`px-3 py-1 rounded-md text-xs font-medium
                      ${row.status === 'Paid'
                        ? 'bg-emerald-100 text-emerald-600'
                        : 'bg-slate-200 text-slate-600'
                      }`}
                  >
                    {row.status}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">
            Top Products by Units Sold
          </h3>

          <div className="grid grid-cols-[1fr_120px_80px] text-sm pb-3">
            <span>Name</span>
            <span>Price</span>
            <span className="text-right">Units</span>
          </div>

          <div className="space-y-4">
            {[
              { name: 'Men Grey Hoodie', price: '$49.90', units: 204 },
              { name: 'Women Striped T-Shirt', price: '$34.90', units: 155 },
              { name: 'Women White T-Shirt', price: '$40.90', units: 120 },
              { name: 'Men White T-Shirt', price: '$49.90', units: 204 },
              { name: 'Women Red T-Shirt', price: '$34.90', units: 155 }
            ].map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_120px_80px] items-center text-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-slate-100" />
                  <span className="font-medium">
                    {item.name}
                  </span>
                </div>

                <span>{item.price}</span>

                <span className="text-right font-medium">
                  {item.units}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
</div>
  )
}

export default Home
