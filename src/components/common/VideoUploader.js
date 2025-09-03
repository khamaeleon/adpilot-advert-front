import React, { useEffect, useRef, useState } from 'react';

export default function VideoUploader({ file, onSelect, filePath }) {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const onChange = (e) => {
    const f = e.target.files?.[0] || null;
    console.log(f.type)
    if (f && !f.type.startsWith('audio/')) {
      alert('오디오 파일만 업로드 가능합니다.');
      // 잘못된 선택 시 input 비우기
      if (inputRef.current) inputRef.current.value = '';
      onSelect(null);
      return;
    }
    onSelect(f);
  };

  // 동일 파일을 연속 선택해도 onChange가 뜨도록 클릭 시 value 리셋
  const onClickInput = (e) => {
    e.currentTarget.value = ''; // 매 클릭마다 초기화
  };

  // 미리보기 URL 관리
  useEffect(() => {
    if (!file) {
      setPreviewUrl('');
      // 부모가 setFile(null) 했을 때 input도 비워 줌
      if (inputRef.current) inputRef.current.value = '';
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(()=> {
    setPreviewUrl(filePath);
    inputRef.current.value = '';
  }, [filePath])

  return (
      <div style={{ display: 'grid', gap: 8, maxWidth: 600 }}>
        <input
            ref={inputRef}
            type="file"
            accept="audio/mpeg,audio/*"
            onClick={onClickInput}
            onChange={onChange}
        />
        {previewUrl && (
            <audio
                src={previewUrl}
                controls
                style={{ width: '100%', borderRadius: 8, background: '#000' }}
            />
        )}
        {file && (
            <small>
              선택됨: {file.name} ({(file.size / 1024 / 1024).toFixed(1)} MB)
            </small>
        )}
      </div>
  );
}
