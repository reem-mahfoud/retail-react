import { useNavigate } from 'react-router-dom';
import { Building2, Pencil, Trash2 } from 'lucide-react';
import WebcamOutlineIcon from 'components/icons/WebcamOutlineIcon';
import UniversityCountIcon from 'components/icons/UniversityCountIcon';
import { RowToggle } from 'components/dashboard/analytics-location-row/LocationRowUi';
import {
  EntityRowShell,
  EntityRowIcon,
  EntityRowTitle,
  EntityRowMeta,
  EntityRowActions,
  EntityRowIconButton,
  entityRowGridClass,
} from 'components/dashboard/DashboardEntityRow';

export default function UniversityRow({ row, onEdit, onDelete, onToggleActive }) {
  const navigate = useNavigate();

  return (
    <EntityRowShell
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/dashboard/organizations/${row.id}/buildings`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          navigate(`/dashboard/organizations/${row.id}/buildings`);
        }
      }}
      className="cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#7F56D9]/25"
    >
      <div className={entityRowGridClass}>
        <EntityRowIcon>
          <Building2 className="h-5 w-5" strokeWidth={1.67} aria-hidden />
        </EntityRowIcon>

        <EntityRowTitle
          title={row.name}
          subtitle={`${row.entityCount} buildings · ${row.quotaUsed}/${row.quotaTotal} cameras`}
        />

        <EntityRowMeta
          icon={UniversityCountIcon}
          label={String(row.entityCount)}
        />

        <EntityRowMeta
          icon={WebcamOutlineIcon}
          label={`${row.quotaUsed} / ${row.quotaTotal}`}
        />

        <EntityRowActions>
          <EntityRowIconButton
            aria-label={`Edit ${row.name}`}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(row.id);
            }}
          >
            <Pencil className="h-4 w-4" strokeWidth={1.75} />
          </EntityRowIconButton>
          <EntityRowIconButton
            aria-label={`Delete ${row.name}`}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(row.id);
            }}
          >
            <Trash2 className="h-4 w-4" strokeWidth={1.75} />
          </EntityRowIconButton>
          <RowToggle
            checked={row.active}
            onChange={(v) => onToggleActive(row.id, v)}
            ariaLabel={`${row.name} active`}
          />
        </EntityRowActions>
      </div>
    </EntityRowShell>
  );
}
