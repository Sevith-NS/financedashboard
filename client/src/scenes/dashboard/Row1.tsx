import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery } from '@/state/api'
import { useTheme } from '@mui/material'
import { useMemo } from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  Line,
  AreaChart,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area
} from 'recharts'


const Row1 = () => {
  const { palette } = useTheme();
  const { data } = useGetKpisQuery();
  console.log('data:', data);

  const revenueExpenses = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          expenses: expenses,
        };
      })
    );
  }, [data]);

  const revenueProfit = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          profit: (revenue - expenses).toFixed(2), //used to round to 2 decimal places
        };
      })
    );
  }, [data]);

  const revenue = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
        };
      })
    );
  }, [data]);

  return (
    <>
      {/* Manually adjusted height because of overflow in Y axis */}
      <DashboardBox gridArea="a" style={{ height: '375px' }}>
        <BoxHeader
          title="Revenue and Expenses"
          subtitle="Topline Represents Revenue, bottom line Represents exprenses"
          sideText="+8%"
          sideTextColor={palette.primary[600]}
        />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0} />
                <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0.3} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0} />
                <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0.5} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
            <YAxis tickLine={false} style={{ fontSize: "10px" }} axisLine={{ strokeWidth: "0" }} domain={[8000, 23000]} />
            <Tooltip />
            <Area type="monotone" dot={true} dataKey="revenue" stroke={palette.primary.main} fillOpacity={1} fill="url(#colorRevenue)" />
            <Area type="monotone" dot={true} dataKey="expenses" stroke={palette.primary.main} fillOpacity={1} fill="url(#colorExpenses)" />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="b" style={{ height: '375px' }}>
        <BoxHeader
          title="Profit and Revenue"
          subtitle="Topline Represents Revenue, bottom line Represents Profit"
          sideText="+6.2%"
          sideTextColor={palette.primary[600]}
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart

            data={revenueProfit}
            margin={{
              top: 20,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[500]} />
            <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
            <YAxis yAxisId="left" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
            <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
            <Tooltip />
            <Legend height={20} wrapperStyle={{
              margin: '0 0 10px 0'
            }}
            />
            <Line yAxisId="left" type="monotone" dataKey="profit" stroke="#8884d8" />
            <Line yAxisId="right" type="monotone" dataKey="revenue" stroke={palette.primary.main} />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>


      <DashboardBox gridArea="c" style={{ height: '275px' }}  >
        <BoxHeader
          title="Revenue Month By Month"
          subtitle="Graph repsenting revenue month by month"
          sideText="+4.4%"
          sideTextColor={palette.secondary[500]}
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={revenue}
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 58,
            }}
          >
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={1} />
                <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: "10px" }} />
            <YAxis axisLine={false} tickLine={false} style={{ fontSize: "10px" }} />
            <Tooltip />
            <Legend height={20} wrapperStyle={{
              margin: '0 0 6.5px 25px',
            }} />
            <Bar dataKey="revenue" fill="url(#colorRev)" />
          </BarChart>
        </ResponsiveContainer >
      </DashboardBox>
    </>
  )
}

export default Row1;