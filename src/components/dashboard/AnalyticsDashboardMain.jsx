import { useCallback, useMemo, useState } from 'react';
import AnalyticsPageHeader from 'components/dashboard/AnalyticsPageHeader';
import AnalyticsChartToolbar from 'components/dashboard/AnalyticsChartToolbar';
import AnalyticsTemperatureGrid from 'components/dashboard/AnalyticsTemperatureGrid';
import AnalyticsCameraFailuresGrid from 'components/dashboard/AnalyticsCameraFailuresGrid';
import AnalyticsDeviceCardsRow from 'components/dashboard/AnalyticsDeviceCardsRow';
import AnalyticsLocationRow from 'components/dashboard/analytics-location-row/AnalyticsLocationRow';
import ConfirmDeleteEntityDialog from 'components/dashboard/ConfirmDeleteEntityDialog';
import EditLocationDialog from 'components/dashboard/analytics-location-row/EditLocationDialog';
import DataStatus from 'components/dashboard/DataStatus';
import ListQueryPanel from 'components/dashboard/ListQueryPanel';
import ListEmptyState from 'components/dashboard/ListEmptyState';
import { useLocationsQuery } from 'hooks/queries';
import { useAnalyticsDashboard } from 'hooks/useAnalyticsDashboard';
import { useAnalyticsLocations } from 'hooks/useAnalyticsLocations';
import { CRADLE_PAGE_COLUMN } from 'design/cradleDesignTokens';

const analyticsChartPanelClass =
  'flex w-full min-w-0 flex-col gap-5 rounded-3xl bg-white p-5 shadow-[0px_14px_42px_0px_rgba(0,0,0,0.06)]';

export default function AnalyticsDashboardMain() {
  const [selectedDeviceCard, setSelectedDeviceCard] = useState(0);
  const [branchId, setBranchId] = useState('');
  const [departmentId, setDepartmentId] = useState('all');
  const [dateStr, setDateStr] = useState('2024-12-27');
  const [branchSearch, setBranchSearch] = useState('');

  const handleDeviceCardMenu = useCallback(() => {}, []);
  const handleDeviceCardField = useCallback(({ cardIndex, field }) => {
    if (field !== 'menu') setSelectedDeviceCard(cardIndex);
  }, []);

  const [tempRange, setTempRange] = useState('12m');
  const [failuresRange, setFailuresRange] = useState('12m');

  const { data: branchData, isLoading: branchesLoading } = useLocationsQuery({
    search: branchSearch,
    isActive: true,
    page: 1,
    pageSize: 20,
  });

  const branchOptions = useMemo(() => {
    const rows = branchData?.locations ?? [];
    return [
      { value: '', label: 'All branch' },
      ...rows.map((row) => ({
        value: String(row.id),
        label: row.name || row.address || `Branch ${row.id}`,
      })),
    ];
  }, [branchData]);

  const onBranchSearch = useCallback((q) => setBranchSearch(q), []);

  const {
    temperatureChart,
    failuresChart,
    deviceCards,
    smartCamerasData,
    isError: chartsError,
    isFetching: chartsFetching,
    error: chartsErrorDetail,
    refetchCharts,
  } = useAnalyticsDashboard({
    tempRange,
    failuresRange,
    branchId: branchId || undefined,
    departmentId: departmentId === 'all' ? undefined : departmentId,
    dateStr,
  });

  const {
    locations,
    editingLocation,
    deleteLocation,
    requestEdit,
    requestDelete,
    cancelEdit,
    cancelDelete,
    saveLocationLabel,
    confirmDelete,
    isLoading: locationsLoading,
    isError: locationsError,
    error: locationsErrorDetail,
  } = useAnalyticsLocations({ smartCamerasData });

  const loadError = chartsError;
  const loadErrorMessage = chartsErrorDetail;

  return (
    <div className={`${CRADLE_PAGE_COLUMN} analytics-scrollbar-hidden gap-4 bg-[#FAFAFA] pb-12`}>
      <AnalyticsPageHeader
        branchId={branchId}
        onBranchIdChange={setBranchId}
        departmentId={departmentId}
        onDepartmentIdChange={setDepartmentId}
        dateStr={dateStr}
        onDateStrChange={setDateStr}
        branchOptions={branchOptions}
        branchSearchLoading={branchesLoading}
        onBranchSearch={onBranchSearch}
      />
      <section className={analyticsChartPanelClass}>
        <div className="px-1">
          <AnalyticsChartToolbar value={tempRange} onChange={setTempRange} />
        </div>
        {loadError ? (
          <DataStatus
            isLoading={false}
            isError
            error={loadErrorMessage}
            onRetry={refetchCharts}
          />
        ) : (
          <DataStatus isFetching={chartsFetching} />
        )}
        <div className="min-w-0">
          <AnalyticsTemperatureGrid
            range={tempRange}
            categories={temperatureChart?.categories}
            temperatureLine={temperatureChart?.temperatureLine}
            peakBars={temperatureChart?.peakBars}
          />
        </div>
        <AnalyticsDeviceCardsRow
          className="pt-1"
          cards={deviceCards.length ? deviceCards : undefined}
          selectedIndex={selectedDeviceCard}
          onCardClick={setSelectedDeviceCard}
          onCardMenuClick={handleDeviceCardMenu}
          onCardFieldClick={handleDeviceCardField}
        />
      </section>

      <section className={analyticsChartPanelClass}>
        <div className="px-1">
          <AnalyticsChartToolbar
            title="Number of camera failures"
            leadingIcon="camera"
            value={failuresRange}
            onChange={setFailuresRange}
          />
        </div>
        <div className="min-w-0">
          <AnalyticsCameraFailuresGrid
            range={failuresRange}
            categories={failuresChart?.categories}
            bars={failuresChart?.bars}
            trend={failuresChart?.trend}
          />
        </div>
        <div className="flex w-full min-w-0 flex-col gap-3 overflow-x-hidden pt-1" aria-label="Camera locations">
          <ListQueryPanel
            isLoading={locationsLoading}
            isError={locationsError}
            error={locationsErrorDetail}
            isEmpty={locations.length === 0}
            emptyState={
              <ListEmptyState variant="compact" className="py-8">
                No camera locations found.
              </ListEmptyState>
            }
          >
            {locations.map((row) => (
              <div key={row.id} className="contents">
                <AnalyticsLocationRow
                  locationLabel={row.locationLabel}
                  branchLabel={row.branchLabel}
                  orgLabel={row.orgLabel}
                  deviceLabel={row.deviceLabel}
                  onEdit={() => requestEdit(row.id)}
                  onDelete={() => requestDelete(row.id)}
                />
              </div>
            ))}
          </ListQueryPanel>
        </div>
      </section>

      <EditLocationDialog
        open={Boolean(editingLocation)}
        initialValue={editingLocation?.locationLabel ?? ''}
        onClose={cancelEdit}
        onConfirm={saveLocationLabel}
      />

      <ConfirmDeleteEntityDialog
        open={Boolean(deleteLocation)}
        title="Delete location"
        entityName={deleteLocation?.locationLabel ?? ''}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
