import {eachDayOfInterval, format} from 'date-fns';
import {useState} from 'react';
import {reportsAPI} from '../api/reports';
import {MAX_REQ_LIMIT} from '../constants/common';
import {StatsT} from '../constants/types';

export const useGetStats = () => {
  const [stats, setStats] = useState<StatsT[]>([]);
  const [days, setDays] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const getStats = async (dateFrom: Date, dateTo: Date, iso?: string) => {
    const daysArr = eachDayOfInterval({start: dateFrom, end: dateTo}).map((d) => format(d, 'yyyy-MM-dd'));
    const filteredDaysArr =
      daysArr.length > MAX_REQ_LIMIT
        ? daysArr.reduce((acc: string[], el, idx) => {
            //because we want last element to be always inside an array
            //then array will contain 19 + last element = 20 requests (MAX_REQ_LIMIT)
            const step = daysArr.length / (MAX_REQ_LIMIT - 1);

            if (idx === Math.floor(acc.length * step) || idx === daysArr.length - 1) {
              acc.push(el);
            }

            return acc;
          }, [])
        : daysArr;
    setDays(filteredDaysArr);
    const promiseArr = filteredDaysArr.map(async (d) => await reportsAPI.getTotalReports(d, iso));

    try {
      setLoading(true);
      const res = await Promise.all(promiseArr);
      setStats(res as StatsT[]);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return {stats, days, getStats, loading};
};
