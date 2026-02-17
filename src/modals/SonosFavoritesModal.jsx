import React, { useMemo } from 'react';
import { Music } from '../icons';

export default function SonosFavoritesModal({ mpId, entities, cardSettings, settingsKey, getA, getEntityImageUrl, callService, onClose, t }) {
    const sonosFavoritesEntity = cardSettings[settingsKey]?.sonosFavoritesEntity;

    const favorites = useMemo(() => {
        if (!sonosFavoritesEntity || !entities[sonosFavoritesEntity]) {
            return [];
        }

        const entity = entities[sonosFavoritesEntity];
        const favList = entity.attributes?.favorites || [];

        return Array.isArray(favList) ? favList.map((fav, idx) => ({
            id: fav.id || `fav_${idx}`,
            title: fav.title || fav.name || 'Unknown',
            artist: fav.artist || fav.album_artist || '',
            album: fav.album || '',
            imageUrl: fav.image_url ? getEntityImageUrl(fav.image_url) : null,
            uri: fav.uri || null
        })) : [];
    }, [sonosFavoritesEntity, entities, getEntityImageUrl]);

    const handleFavoriteClick = async (favorite) => {
        if (!favorite.uri) return;
        await callService('media_player', 'play_media', {
            entity_id: mpId,
            media_content_id: favorite.uri,
            media_content_type: 'music'
        });
        onClose();
    };

    if (favorites.length === 0) {
        return (
            <div className="popup-surface text-center py-12">
                <Music className="w-12 h-12 mx-auto text-[var(--text-secondary)] opacity-50 mb-3" />
                <p className="text-sm text-[var(--text-secondary)] font-medium">{t('media.noFavorites') || 'No favorites found'}</p>
            </div>
        );
    }

    return (
        <div className="popup-surface max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-3 p-4">
                {favorites.map((favorite) => (
                    <button key={favorite.id} onClick={() => handleFavoriteClick(favorite)} className="group flex flex-col rounded-2xl overflow-hidden bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-blue-500/20 transition-all active:scale-95">
                        <div className="relative w-full aspect-square bg-[var(--glass-bg)] overflow-hidden">
                            {favorite.imageUrl ? (
                                <img src={favorite.imageUrl} alt={favorite.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                                    <Music className="w-8 h-8 text-[var(--text-secondary)] opacity-60" />
                                </div>
                            )}
                        </div>
                        <div className="p-3 flex flex-col gap-1 flex-grow justify-between">
                            <p className="text-xs font-bold truncate text-[var(--text-primary)] leading-tight">
                                {favorite.title}
                            </p>
                            {favorite.artist && (
                                <p className="text-[10px] truncate text-[var(--text-secondary)] opacity-70">
                                    {favorite.artist}
                                </p>
                            )}
                            {favorite.album && (
                                <p className="text-[10px] truncate text-[var(--text-secondary)] opacity-50">
                                    {favorite.album}
                                </p>
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}