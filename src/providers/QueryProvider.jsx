import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from 'api/createQueryClient';
import { useQueryInvalidationSocket } from 'hooks/useQueryInvalidationSocket';
import { useState } from 'react';

function QueryInvalidationBridge() {
  useQueryInvalidationSocket();
  return null;
}

export default function QueryProvider({ children }) {
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <QueryInvalidationBridge />
      {children}
    </QueryClientProvider>
  );
}
