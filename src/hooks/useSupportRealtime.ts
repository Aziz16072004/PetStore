import { useEffect } from 'react';

export type SupportStatus = 'all' | 'open' | 'pending' | 'resolved';

/**
 * Listens for app-level 'support:updated' events and triggers a refetch
 * while preserving the current filter, but only when the inbox is visible.
 */
export function useSupportRealtime(
  isOpen: boolean,
  statusFilter: SupportStatus,
  fetchMessages: (status: SupportStatus) => Promise<void>
) {
  useEffect(() => {
    const onSupportUpdated = () => {
      if (isOpen) {
        fetchMessages(statusFilter);
      }
    };

    window.addEventListener('support:updated', onSupportUpdated);
    return () => window.removeEventListener('support:updated', onSupportUpdated);
  }, [isOpen, statusFilter, fetchMessages]);
}
