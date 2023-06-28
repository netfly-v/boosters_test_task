import React, {useEffect} from 'react';
import {
  SelectChangeEvent,
  Box,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  MenuItem,
  Button,
} from '@mui/material';
import {DateRange, LocalizationProvider, DateRangePicker} from '@mui/x-date-pickers-pro';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import locale from 'date-fns/locale/en-GB';
import {RegionsT} from '../../constants/types';
import {useSearchParams} from 'react-router-dom';
import {format} from 'date-fns';
import {mockRegionsData} from '../../constants/common';

type FiltersBlockProps = {
  getStats: (dateFrom: Date, dateTo: Date, iso?: string) => void;
  regionsData: RegionsT[] | undefined;
  loading: boolean;
};

export const FiltersBlock: React.FC<FiltersBlockProps> = ({getStats, regionsData, loading}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dateFrom = new Date(searchParams.get('date_from') as string);
  const dateTo = new Date(searchParams.get('date_to') as string);
  const region = searchParams.get('region') as string;

  useEffect(() => {
    if (searchParams.has('date_from') && searchParams.has('date_to')) {
      getStats(dateFrom, dateTo, region);
    }
  }, []);

  const onChooseRegion = (event: SelectChangeEvent) => {
    searchParams.set('region', event.target.value);
    setSearchParams(searchParams);
  };

  const onChooseDates = (dateValue: DateRange<Date>) => {
    if (dateValue.every((v) => !!v)) {
      searchParams.set('date_from', format(dateValue[0] as Date, 'yyyy-MM-dd'));
      searchParams.set('date_to', format(dateValue[1] as Date, 'yyyy-MM-dd'));
      setSearchParams(searchParams);
    }
  };

  const onShowCharts = () => {
    getStats(dateFrom, dateTo, region);
  };

  const isDisabled = !searchParams.get('date_from') || !searchParams.get('date_to');
  const dateRangeValue =
    searchParams.has('date_from') && searchParams.has('date_to') ? [dateFrom, dateTo] : [null, null];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        paddingTop: '8px',
        '@media (max-width: 1024px)': {padding: '0 10px'},
        '@media (max-width: 640px)': {
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: '180px',
        },
      }}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
        <DateRangePicker
          localeText={{start: 'Date from', end: 'Date to'}}
          value={dateRangeValue as DateRange<Date>}
          onChange={(v) => onChooseDates(v)}
          disableFuture
        />
      </LocalizationProvider>
      <FormControl sx={{marginLeft: '20px', minWidth: '200px'}}>
        <InputLabel>Choose country</InputLabel>
        <Select value={region || ''} onChange={onChooseRegion} label="Region">
          {loading && <CircularProgress color="inherit" />}
          {regionsData
            ? regionsData.map((r) => (
                <MenuItem key={r.name} value={r.iso}>
                  {r.name}
                </MenuItem>
              ))
            : mockRegionsData.map((r) => (
                <MenuItem key={r.name} value={r.iso}>
                  {r.name}
                </MenuItem>
              ))}
        </Select>
      </FormControl>
      <Button variant="contained" sx={{marginLeft: '20px'}} onClick={onShowCharts} disabled={isDisabled}>
        Show chart
      </Button>
    </Box>
  );
};
