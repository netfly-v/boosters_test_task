import React from 'react';
import {Box, CircularProgress, Typography} from '@mui/material';
import {useGetStats} from '../../hooks/stats';
import {FiltersBlock} from './Filters';
import {ChartBlock} from './Chart';
import {useGetRegions} from '../../hooks/regions';

export const Stats: React.FC = () => {
  const {stats, days, getStats, loading} = useGetStats();
  const {regions, regionsLoading} = useGetRegions();

  if (loading) {
    return (
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        paddingTop: '8px',
      }}>
      <Typography variant="h3" gutterBottom>
        COVID-19 stats
      </Typography>
      <Typography variant="h6" gutterBottom>
        Choose chart parameters:
      </Typography>
      <FiltersBlock getStats={getStats} regionsData={regions} loading={regionsLoading} />
      {stats.length ? (
        <ChartBlock stats={stats} labels={days} regionsData={regions} />
      ) : (
        <Typography
          sx={{marginTop: '50px', color: '#809f39', '@media (max-width: 640px)': {textAlign: 'center'}}}
          variant="h6">{`Choose 'Date from' and 'Date to' to enable chart`}</Typography>
      )}
    </Box>
  );
};
