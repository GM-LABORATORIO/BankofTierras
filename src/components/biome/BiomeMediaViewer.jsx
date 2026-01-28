import React from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Shield } from 'lucide-react';

const BiomeMediaViewer = ({
    photoGallery,
    currentPhotoIndex,
    setCurrentPhotoIndex,
    nextPhoto,
    prevPhoto,
    hasLiveStream,
    setIsLiveStreamFullscreen,
    regionalData,
    selectedCell
}) => {
    return (
        <div className="w-full md:w-3/5 bg-black relative flex flex-col overflow-hidden">
            {/* Photo Gallery */}
            {photoGallery.length > 0 && (
                <div className="relative h-1/2 overflow-hidden group">
                    <img
                        src={photoGallery[currentPhotoIndex]}
                        alt={`${selectedCell.zone?.name || 'Biome'} - Photo ${currentPhotoIndex + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

                    {/* Gallery Controls */}
                    {photoGallery.length > 1 && (
                        <>
                            <button
                                onClick={prevPhoto}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-xl rounded-full border border-white/10 hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
                            >
                                <ChevronLeft className="text-white" size={24} />
                            </button>
                            <button
                                onClick={nextPhoto}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-xl rounded-full border border-white/10 hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
                            >
                                <ChevronRight className="text-white" size={24} />
                            </button>

                            {/* Photo Indicators */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                {photoGallery.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentPhotoIndex(idx)}
                                        className={`w-2 h-2 rounded-full transition-all ${idx === currentPhotoIndex ? 'bg-white w-8' : 'bg-white/40'}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {/* Photo Counter */}
                    <div className="absolute top-4 right-4 px-4 py-2 bg-black/50 backdrop-blur-xl rounded-full border border-white/10">
                        <span className="text-white text-sm font-black">
                            {currentPhotoIndex + 1} / {photoGallery.length}
                        </span>
                    </div>
                </div>
            )}

            {/* Live Stream */}
            {hasLiveStream && (
                <div className="relative h-1/2 bg-black group">
                    <iframe
                        src={hasLiveStream}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Live Stream"
                    />

                    {/* Fullscreen Button */}
                    <button
                        onClick={() => setIsLiveStreamFullscreen(true)}
                        className="absolute top-4 right-4 p-3 bg-black/50 backdrop-blur-xl rounded-full border border-white/10 hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
                    >
                        <Maximize2 className="text-white" size={20} />
                    </button>

                    {/* Live Badge */}
                    <div className="absolute top-4 left-4 px-4 py-2 bg-red-500 rounded-full flex items-center gap-2 animate-pulse">
                        <div className="w-2 h-2 bg-white rounded-full" />
                        <span className="text-white text-xs font-black uppercase">En Vivo</span>
                    </div>
                </div>
            )}

            {/* Zone Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/90 to-transparent">
                <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">{selectedCell.zone?.icon}</div>
                    <div>
                        <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-none">
                            {regionalData?.name || selectedCell.zone?.name || selectedCell.label}
                        </h3>
                        <div className="flex items-center gap-3 mt-1">
                            <p className="text-gray-400 text-sm font-medium">
                                GPS: {selectedCell.coords[0].toFixed(3)}, {selectedCell.coords[1].toFixed(3)}
                                {regionalData?.country && ` • ${regionalData.country.name} ${regionalData.country.flag_emoji || ''}`}
                            </p>
                            {regionalData?.originator_id && (
                                <div className="flex items-center gap-2 px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded-full">
                                    <Shield size={10} className="text-blue-400" />
                                    <span className="text-[10px] font-black text-blue-400 uppercase">Originador: {regionalData.originator?.name || 'ONG Local'}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {(regionalData?.fun_facts?.[0] || selectedCell.zone?.funFact) && (
                    <p className="text-white/80 text-sm font-medium italic leading-relaxed max-w-2xl">
                        "{regionalData?.fun_facts?.[0] || selectedCell.zone.funFact}"
                    </p>
                )}
            </div>
        </div>
    );
};

export default BiomeMediaViewer;
