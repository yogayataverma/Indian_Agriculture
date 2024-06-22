import React from 'react';
import { useTable, Column } from 'react-table';
import { aggregateTable1Data, aggregateTable2Data } from '../utils/aggregation';

const AnalyticsTables: React.FC = () => {
  // Define columns for Table 1 and Table 2
  const columns1: Column<{ Year: number; MaxCrop: string; MinCrop: string }>[] = React.useMemo(
    () => [
      { Header: 'Year', accessor: 'Year' },
      { Header: 'Max Crop', accessor: 'MaxCrop' },
      { Header: 'Min Crop', accessor: 'MinCrop' }
    ],
    []
  );

  const columns2: Column<{ Crop: string; AvgYield: string; AvgArea: string }>[] = React.useMemo(
    () => [
      { Header: 'Crop', accessor: 'Crop' },
      { Header: 'Avg Yield (kg/ha)', accessor: 'AvgYield' },
      { Header: 'Avg Area (ha)', accessor: 'AvgArea' }
    ],
    []
  );

  // Memoized data fetching using aggregate functions
  const table1Data = React.useMemo(() => aggregateTable1Data(), []);
  const table2Data = React.useMemo(() => aggregateTable2Data(), []);

  // React-table instances for Table 1 and Table 2
  const table1Instance = useTable({ columns: columns1, data: table1Data });
  const table2Instance = useTable({ columns: columns2, data: table2Data });

  // Destructuring table properties for Table 1
  const {
    getTableProps: getTableProps1,
    getTableBodyProps: getTableBodyProps1,
    headerGroups: headerGroups1,
    rows: rows1,
    prepareRow: prepareRow1
  } = table1Instance;

  // Destructuring table properties for Table 2
  const {
    getTableProps: getTableProps2,
    getTableBodyProps: getTableBodyProps2,
    headerGroups: headerGroups2,
    rows: rows2,
    prepareRow: prepareRow2
  } = table2Instance;

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
        <h1 style={{textAlign:"center"}}>Agriculture Data</h1>
      <div style={{ marginBottom: '20px' }}>
        <h2>Table 1: Crops Production Summary</h2>
        <table {...getTableProps1()} style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            {headerGroups1.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      borderBottom: '2px solid #ccc',
                      background: '#f2f2f2',
                      padding: '8px',
                      textAlign: 'left'
                    }}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps1()}>
            {rows1.map((row, index) => {
              prepareRow1(row);
              return (
                <tr
                  {...row.getRowProps()}
                  style={{
                    background: index % 2 === 0 ? '#f9f9f9' : 'white',
                    borderBottom: '1px solid #ccc'
                  }}
                >
                  {row.cells.map(cell => (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '8px',
                        textAlign: 'left'
                      }}
                    >
                      {typeof cell.value === 'number' ? cell.value.toFixed(3) : cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Table 2: Crops Average Yield and Cultivation Area</h2>
        <table {...getTableProps2()} style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            {headerGroups2.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      borderBottom: '2px solid #ccc',
                      background: '#f2f2f2',
                      padding: '8px',
                      textAlign: 'left'
                    }}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps2()}>
            {rows2.map((row, index) => {
              prepareRow2(row);
              return (
                <tr
                  {...row.getRowProps()}
                  style={{
                    background: index % 2 === 0 ? '#f9f9f9' : 'white',
                    borderBottom: '1px solid #ccc'
                  }}
                >
                  {row.cells.map(cell => (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '8px',
                        textAlign: 'left'
                      }}
                    >
                      {typeof cell.value === 'number' ? cell.value.toFixed(3) : cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalyticsTables;
