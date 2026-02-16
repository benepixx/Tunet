import { useMemo, useState } from 'react';
import { Camera } from '../../icons';
import { getIconComponent } from '../../icons';
import { RefreshCw } from 'lucide-react';

function buildCameraSnapshotPath(entityId, accessToken) {
  const tokenQuery = accessToken ? `?token=${encodeURIComponent(accessToken)}` : '';
  return `/api/camera_proxy/${entityId}${tokenQuery}`;
}

function appendTs(url, ts) {
  if (!url) return '';
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}_ts=${ts}`;
}

export default function CameraCard({
  cardId,
  entityId,
  entity,
  dragProps,
  controls,
  cardStyle,
  editMode,
  customNames,
  customIcons,
  getEntityImageUrl,
  onOpen,
  t,
}) {
  const [refreshTs, setRefreshTs] = useState(Date.now());
  const attrs = entity?.attributes || {};
  const isOffline = !entity || entity.state === 'unavailable' || entity.state === 'unknown' || entity.state === 'off';
  const name = customNames?.[cardId] || attrs.friendly_name || entityId;

  const iconName = customIcons?.[cardId] || attrs.icon;
  const Icon = iconName ? (getIconComponent(iconName) || Camera) : Camera;

  const accessToken = attrs.access_token;
  const snapshotPath = buildCameraSnapshotPath(entityId, accessToken);
  const entityPicture = attrs.entity_picture || null;
  const previewUrl = useMemo(() => getEntityImageUrl(appendTs(entityPicture || snapshotPath, refreshTs)), [entityPicture, snapshotPath, refreshTs, getEntityImageUrl]);

  return (
    <div
      key={cardId}
      {...dragProps}
      data-haptic={editMode ? undefined : 'card'}
      className={`touch-feedback relative h-full rounded-3xl overflow-hidden border bg-[var(--card-bg)] group transition-all duration-300 ${editMode ? 'cursor-move' : 'cursor-pointer active:scale-[0.98]'}`}
      style={cardStyle}
      onClick={(e) => {
        e.stopPropagation();
        if (!editMode) onOpen?.();
      }}
    >
      {controls}

      {previewUrl && !isOffline ? (
        <img
          src={previewUrl}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--glass-bg)]">
          <Icon className="w-12 h-12 text-[var(--text-secondary)] opacity-70" />
        </div>
      )}

      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.10) 35%, rgba(0,0,0,0.45) 100%)' }} />

      <div className="absolute top-3 right-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setRefreshTs(Date.now());
          }}
          className="p-2 rounded-xl popup-surface popup-surface-hover text-[var(--text-primary)] transition-colors"
          title={t?.('camera.refresh') || 'Refresh'}
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest popup-surface text-[var(--text-primary)] border border-[var(--glass-border)]">
        <span className={`w-2 h-2 rounded-full ${isOffline ? 'bg-red-400' : 'bg-emerald-400'}`} />
        {isOffline ? (t?.('camera.unavailable') || 'Unavailable') : (t?.('camera.live') || 'Live')}
      </div>

      <div className="absolute left-3 right-3 bottom-3 flex items-end justify-between gap-3">
        <div className="min-w-0 max-w-[75%] px-3 py-2 rounded-xl popup-surface border border-[var(--glass-border)]">
          <p className="text-xs font-bold text-[var(--text-primary)] truncate tracking-wide uppercase">{name}</p>
        </div>
        <div className="shrink-0 p-2 rounded-xl popup-surface border border-[var(--glass-border)] text-[var(--text-primary)]">
          <Icon className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
