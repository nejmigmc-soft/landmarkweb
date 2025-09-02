'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from '@/lib/motion';
import { adminApi } from '@/lib/admin-api';
import { Upload, X, Star, ArrowUp, ArrowDown, Trash2 } from 'lucide-react';

interface UploadedFile {
  url: string;
  key: string;
  contentType: string;
  alt?: string;
  order: number;
  isCover: boolean;
}

interface ImageUploaderProps {
  onUploaded: (files: UploadedFile[]) => void;
  initialImages?: UploadedFile[];
}

export default function ImageUploader({ onUploaded, initialImages = [] }: ImageUploaderProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = useCallback(async (files: FileList) => {
    setUploading(true);
    
    try {
      const newFiles: UploadedFile[] = [];
      
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) continue;
        
        // Dosya boyutu kontrolü (5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert(`${file.name} dosyası çok büyük. Maksimum 5MB olmalıdır.`);
          continue;
        }

        // Pre-signed URL al
        const signResponse = await adminApi.admin.signUpload({
          fileName: file.name,
          contentType: file.type,
        });

        // S3'e yükle
        await fetch(signResponse.uploadUrl, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type,
          },
        });

        const newFile: UploadedFile = {
          url: signResponse.publicUrl,
          key: signResponse.key,
          contentType: file.type,
          alt: file.name,
          order: uploadedFiles.length + newFiles.length,
          isCover: uploadedFiles.length + newFiles.length === 0, // İlk dosya kapak
        };

        newFiles.push(newFile);
      }

      const updatedFiles = [...uploadedFiles, ...newFiles];
      setUploadedFiles(updatedFiles);
      onUploaded(updatedFiles);
      
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Görsel yüklenirken bir hata oluştu');
    } finally {
      setUploading(false);
    }
  }, [uploadedFiles, onUploaded]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  }, [handleFileUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files);
    }
  }, [handleFileUpload]);

  const removeFile = useCallback((index: number) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    // Sıra numaralarını güncelle
    updatedFiles.forEach((file, i) => {
      file.order = i;
      file.isCover = i === 0;
    });
    setUploadedFiles(updatedFiles);
    onUploaded(updatedFiles);
  }, [uploadedFiles, onUploaded]);

  const setCover = useCallback((index: number) => {
    const updatedFiles = uploadedFiles.map((file, i) => ({
      ...file,
      isCover: i === index,
      order: i === index ? 0 : i > index ? i : i + 1,
    }));
    setUploadedFiles(updatedFiles);
    onUploaded(updatedFiles);
  }, [uploadedFiles, onUploaded]);

  const moveFile = useCallback((index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === uploadedFiles.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const updatedFiles = [...uploadedFiles];
    [updatedFiles[index], updatedFiles[newIndex]] = [updatedFiles[newIndex], updatedFiles[index]];
    
    // Sıra numaralarını güncelle
    updatedFiles.forEach((file, i) => {
      file.order = i;
      file.isCover = i === 0;
    });
    
    setUploadedFiles(updatedFiles);
    onUploaded(updatedFiles);
  }, [uploadedFiles, onUploaded]);

  const updateAlt = useCallback((index: number, alt: string) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles[index].alt = alt;
    setUploadedFiles(updatedFiles);
    onUploaded(updatedFiles);
  }, [uploadedFiles, onUploaded]);

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? 'border-primary bg-primary/5'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-4">
          <Label htmlFor="file-upload" className="cursor-pointer">
            <span className="text-primary hover:text-primary/80 font-medium">
              Görsel seç
            </span>
            {' '}veya sürükle bırak
          </Label>
          <Input
            id="file-upload"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          PNG, JPG, GIF maksimum 5MB
        </p>
      </div>

      {/* Uploaded Images */}
      <AnimatePresence>
        {uploadedFiles.map((file, index) => (
          <motion.div
            key={file.key}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border rounded-lg p-4 bg-gray-50"
          >
            <div className="flex items-start space-x-4">
              {/* Image Preview */}
              <div className="flex-shrink-0">
                <img
                  src={file.url}
                  alt={file.alt || 'Görsel'}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </div>

              {/* Image Details */}
              <div className="flex-1 space-y-3">
                <div>
                  <Label htmlFor={`alt-${index}`}>Alt Metin</Label>
                  <Input
                    id={`alt-${index}`}
                    value={file.alt || ''}
                    onChange={(e) => updateAlt(index, e.target.value)}
                    placeholder="Görsel açıklaması"
                    className="mt-1"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCover(index)}
                    className={file.isCover ? 'bg-primary text-white' : ''}
                  >
                    <Star className="h-4 w-4 mr-1" />
                    {file.isCover ? 'Kapak' : 'Kapak Yap'}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => moveFile(index, 'up')}
                    disabled={index === 0}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => moveFile(index, 'down')}
                    disabled={index === uploadedFiles.length - 1}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-sm text-gray-500">
                  Sıra: {file.order + 1} • {file.isCover ? 'Kapak görseli' : 'Ek görsel'}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Upload Status */}
      {uploading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-4 text-sm text-gray-600"
        >
          Görseller yükleniyor...
        </motion.div>
      )}

      {/* Empty State */}
      {uploadedFiles.length === 0 && !uploading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 text-gray-500"
        >
          Henüz görsel yüklenmemiş
        </motion.div>
      )}
    </div>
  );
}
