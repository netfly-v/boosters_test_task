import React, {useState} from 'react';
import {Line} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  PointElement,
  RadialLinearScale,
} from 'chart.js';
import {ChartFilterValues, RegionsT, StatsT} from '../../constants/types';
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import {chartFilters} from '../../constants/common';
import {useSearchParams} from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, RadialLinearScale, ArcElement, Title, Tooltip);

type ChartBlockProps = {
  stats: StatsT[];
  labels: string[];
  regionsData: RegionsT[] | undefined;
};

type ChartFiltersProps = {
  value: string;
  setValue: (v: string) => void;
};

export const ChartBlock: React.FC<ChartBlockProps> = ({stats, labels, regionsData}) => {
  const [caseValue, setCaseValue] = useState<string>(ChartFilterValues.CONFIRMED);
  const [searchParams] = useSearchParams();
  const region = searchParams.get('region');
  const chartData = stats.map((s) => {
    switch (caseValue) {
      case ChartFilterValues.CONFIRMED:
        return s.confirmed;
      case ChartFilterValues.DEATHS:
        return s.deaths;
      case ChartFilterValues.RECOVERED:
        return s.recovered;
      default:
        return s.confirmed;
    }
  });
  const regionName = regionsData?.find((d) => d.iso === region)?.name;
  const getChartLineColor = () => {
    switch (caseValue) {
      case ChartFilterValues.CONFIRMED:
        return '#809f39';
      case ChartFilterValues.DEATHS:
        return '#AA1803';
      case ChartFilterValues.RECOVERED:
        return '#2F70AF';
      default:
        return '#809f39';
    }
  };
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: region ? `${regionName || region} stats` : 'Global stats',
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: caseValue,
        },
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: caseValue,
        fill: false,
        data: chartData,
        borderColor: getChartLineColor(),
        backgroundColor: getChartLineColor(),
      },
    ],
  };

  return (
    <>
      <ChartFilters value={caseValue} setValue={setCaseValue} />
      <Line data={data} options={options} />
    </>
  );
};

const ChartFilters: React.FC<ChartFiltersProps> = ({value, setValue}) => {
  const onChooseCase = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        paddingTop: '8px',
        paddingBottom: '8px',
      }}>
      <FormControl sx={{marginLeft: '20px', minWidth: '200px'}}>
        <InputLabel>Choose case</InputLabel>
        <Select value={value} onChange={onChooseCase} label="Case">
          {chartFilters.map((f, i) => (
            <MenuItem key={i} value={f}>
              {f}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
