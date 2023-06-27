import {useEffect, useState} from 'react';
import {regionsAPI} from '../api/regions';
import {RegionsT} from '../constants/types';

export const useGetRegions = () => {
  const [regions, setRegions] = useState<RegionsT[]>();
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await regionsAPI.getRegions();
      setRegions(res?.data as RegionsT[]);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  return {regions, regionsLoading: loading};
};
