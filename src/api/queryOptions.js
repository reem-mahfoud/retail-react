import { keepPreviousData } from '@tanstack/react-query';
import { STALE_TIMES } from 'api/staleTimes';

export const listQueryOptions = {
  staleTime: STALE_TIMES.list,
  placeholderData: keepPreviousData,
};

export const referenceQueryOptions = {
  staleTime: STALE_TIMES.reference,
};

export const analyticsQueryOptions = {
  staleTime: STALE_TIMES.analytics,
};
