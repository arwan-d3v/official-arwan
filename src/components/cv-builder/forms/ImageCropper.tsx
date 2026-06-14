'use client';

import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '@/lib/cropImage';
import { X } from 'lucide-react';

interface ImageCropperProps {
  imageSrc: string;
  onCropComplete: (croppedImageBase64: string) => void;
  onCancel: () => void;
}

export default function ImageCropper({ imageSrc, onCropComplete, onCancel }: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropCompleteHandler = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (!croppedAreaPixels) return;
    try {
      setIsProcessing(true);
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropComplete(croppedImage);
    } catch (e) {
      console.error(e);
      alert('Error cropping image');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-card border border-border w-full max-w-md p-6 rounded-xl shadow-2xl relative">
        <button 
          onClick={onCancel}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X size={20} />
        </button>
        <h3 className="text-foreground font-mono text-sm tracking-wider uppercase mb-4">Crop Photo</h3>
        
        <div className="relative w-full h-64 bg-black rounded-lg overflow-hidden mb-6">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="rect"
            showGrid={false}
            onCropChange={setCrop}
            onCropComplete={onCropCompleteHandler}
            onZoomChange={setZoom}
          />
        </div>

        <div className="mb-6">
          <label className="text-xs text-muted-foreground font-mono mb-2 block">Zoom</label>
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button 
            onClick={onCancel}
            className="px-4 py-2 border border-border text-muted-foreground text-xs font-mono uppercase hover:bg-secondary/30 rounded"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={isProcessing}
            className="px-4 py-2 bg-primary text-primary-foreground text-xs font-mono uppercase font-bold hover:shadow-[0_0_15px_rgba(var(--primary),0.4)] disabled:opacity-50 rounded"
          >
            {isProcessing ? 'Processing...' : 'Apply Crop'}
          </button>
        </div>
      </div>
    </div>
  );
}
