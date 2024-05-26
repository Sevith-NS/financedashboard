import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashboardBox'
import FlexBetween from '@/components/FlexBox'
import { useGetKpisQuery, useGetProductsQuery } from '@/state/api'
import { Box, Typography, useTheme } from '@mui/material'
import React, { useMemo } from 'react'
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts'

type Props = {}

const pieData = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 400 },
]

const Row2 = (props: Props) => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]];
  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();

  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses }) => {
        return {
          name: month.substring(0, 3),
          "Operational Expenses": operationalExpenses,
          "Non Operational Expenses": nonOperationalExpenses,
        };
      })
    );
  }, [operationalData]);

  const productExpenseData = useMemo(() => {
    return (
      productData &&
      productData.map(
        ({ _id, price, expense }) => {
          return {
            id: _id,
            price: price,
            expense: expense,
          };
        })
    );
  }, [productData]);

  return (
    <>
      <DashboardBox gridArea="d" style={{ height: '275px' }}>
        <BoxHeader
          title="Operational vs Non Operational Expenses"
          sideText="+8.9%"
          sideTextColor={palette.primary[600]}
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart

            data={operationalExpenses}
            margin={{
              top: 20,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[500]} />
            <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
            <YAxis yAxisId="left" orientation="left" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
            <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
            <Tooltip />

            <Line yAxisId="left" type="monotone" dataKey="Non Operational Expenses" stroke="#8884d8" />
            <Line yAxisId="right" type="monotone" dataKey="Operational Expenses" stroke={palette.primary.main} />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="e" style={{ height: '175px' }}>
        <BoxHeader
          title="Campaigns and targets"
          sideText="+11.11%"
          sideTextColor={palette.primary[600]}
        />
        <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
          <PieChart width={300} height={100} margin={{
            top: 0,
            right: 40,
            left: 10,
            bottom: 0,

          }} >
            <Pie
              data={pieData}
              stroke='none'
              innerRadius={40}
              outerRadius={60}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>

          </PieChart>
          <Box ml="-2rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">Target sales</Typography>
            <Typography variant="h2" color={palette.primary[300]}>88</Typography>
            <Typography variant="h6">Finance Goals of the campaign that is desired</Typography>
          </Box>
          <Box flexBasis="40%">
            <Typography variant="h5">Losses in Revenue</Typography>
            <Typography variant="h6">Losses are down 25%</Typography>
            <Typography mt="0.4rem" variant="h5">Profit margins</Typography>
            <Typography variant="h6">Margins are up by 30% from last Month</Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="f" style={{ height: '275px' }}>
        <BoxHeader
          title="Product Prices and Expenses"
          sideText="+8%"
          sideTextColor={palette.secondary[500]}
        />
        
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 42,
              left: -10,
          }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type="number"
              dataKey="price"
              name="price"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="number"
              dataKey="expense"
              name="expense"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />

            <ZAxis
              type="number"
              range={[20]}
            />
            <Tooltip formatter={(v) => `$${v}`} />

            <Scatter
              name="Product Expense Ratio"
              data={productExpenseData}
              fill= {palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  )
}

export default Row2;