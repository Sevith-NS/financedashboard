import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashboardBox'
import FlexBetween from '@/components/FlexBox'
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from '@/state/api'
import { Box, Typography, useTheme } from '@mui/material'
import { DataGrid, GridCellParams } from '@mui/x-data-grid'
import { useMemo } from 'react'
import { PieChart, Pie, Cell } from 'recharts'



const Row3 = () => {
  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]];

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },

            {
              name: `${key} of Total`,
              value: totalExpenses - value,
            },
          ];
        });
    }
  }, [kpiData]);

  const productColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },

    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      // Used to display/ render the values with Dollar sign for Expense or any other currency currency
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      // Used to display/ render the values with Dollar sign for Expense or any other currency currency
      renderCell: (params: GridCellParams) => `$${params.value}`,
    }
  ]
  const transactionColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },

    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.67,
      // Used to display/ render the values with Dollar sign for Expense or any other currency currency
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      // Used to display/ render the values with Dollar sign for Expense or any other currency currency
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.1,
      // Used to display/ render the count values of the porduct purchased
      renderCell: (params: GridCellParams) => (params.value as string[]).length,
    },
  ]
  return (
    <>
      <DashboardBox gridArea="g" style={{ height: '275px' }}>
        <BoxHeader
          title="List of Products"
          sideText={`${productData?.length} products`}
          sideTextColor={palette.secondary[500]}
        />

        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="70%"
          sx={{
            "& .MuiDataGrid-root": {
              color: "#d1d3da",
              border: "none"

            },

            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid #48494e} !important`

            },

            "& .MuiDataGrid-columnHeader": {
              borderBottom: `1px solid #48494e} !important`

            },

            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            }
          }}
        >
          <DataGrid
            columnHeaderHeight={30}
            rowHeight={40}
            hideFooter={true}
            rows={productData || []}
            columns={productColumns}
          />
        </Box>
      </DashboardBox>


      <DashboardBox gridArea="h" style={{ height: '375px' }}>
        <BoxHeader
          title="Recent Orders"
          sideText={`${transactionData?.length} transactions`}
          sideTextColor={palette.secondary[500]}
        />

        <Box
          mt="1rem"
          p="0 0.5rem"
          height="80%"
          sx={{
            "& .MuiDataGrid-root": {
              color: "#d1d3da",
              border: "none"

            },

            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid #48494e} !important`

            },

            "& .MuiDataGrid-columnHeader": {
              borderBottom: `1px solid #48494e} !important`

            },

            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            }
          }}
        >
          <DataGrid
            columnHeaderHeight={30}
            rowHeight={40}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionColumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="i" style={{ height: "175px" }}>
        <BoxHeader
          title="Expense Breakdown By Category"
          sideText="-5%" sideTextColor="red" />
        <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={100}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>

      </DashboardBox>
      <DashboardBox gridArea="j" style={{ height: "175px" }}>
        <BoxHeader
          title="Overall Summary"
          sideText="+15%"
          sideTextColor={palette.primary[600]} />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            margin="1.25rem 1rem 0.4rem 0rem"
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="40%"
          >

          </Box>
        </Box>
        <Typography margin="1rem" variant="h6">
          Once, a moment slipped away from time
          There, I found a story, but not the moment
          With a bit of laughter, and a bit of tears
          This moment, too, is going to pass
          Live every moment here to the fullest
          This moment might not be here tomorrow
          

        </Typography>
      </DashboardBox>

    </>
  )
}

export default Row3;