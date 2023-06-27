import {Box, Divider, Paper, Typography} from '@mui/material';
import React from 'react';

export const About: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        '& > :not(style)': {
          padding: '20px',
        },
      }}>
      <Paper elevation={3}>
        <Typography sx={{textAlign: 'center', color: '#809f39'}} variant="h3" gutterBottom>
          Welcome to COVID-19 charts app!
        </Typography>
        <Divider />
        <Typography sx={{textAlign: 'center', marginTop: '20px'}} variant="h6" gutterBottom>
          How to use this app:
        </Typography>
        <Typography variant="body1" gutterBottom>
          1. Choose start date and end date (if one of the dates is not chosen, then button will be disabled)
        </Typography>
        <Typography variant="body1" gutterBottom>
          2. Please be sure to choose dates not later than 9th March 2023, cause after that day statistic was ended
        </Typography>
        <Typography variant="body1" gutterBottom>
          3. You may choose the country according on your choice, if country is not selected, than you will see whole
          world stats
        </Typography>
        <Typography variant="body1" gutterBottom>
          4. After choosing all filters, click on Show Chart button and the default chart will render
        </Typography>
        <Typography variant="body1" gutterBottom>
          5. Default chart is for confirmed cases, you can also choose recovered and deaths cases
        </Typography>
        <Typography variant="body1" gutterBottom>
          6. The maximum dates request limit is 20, so if you choose a longer period, it will find evenly 20
          intermediate dates
        </Typography>
      </Paper>
    </Box>
  );
};
