import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";

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
  const handleResetFrame = () => {
    onSelect(null);
  }
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
    if(filePath != ''){
      setPreviewUrl(filePath);
      inputRef.current.value = '';
    }
  }, [filePath])

  return (
      <div style={{ display: 'grid', gap: 8, maxWidth: 600 }}>
        <FrameHeader>
          <FileInput
              ref={inputRef}
              type="file"
              accept="audio/mpeg,audio/*"
              onClick={onClickInput}
              onChange={onChange}
          />
          {file && (
            <ReloadButton onClick={handleResetFrame}>
              {resetIcon}
              {/** 리셋에 대한 정의 필요 **/}
            </ReloadButton>
          )}
        </FrameHeader>
        <audio
            src={previewUrl}
            controls
            style={{ width: '100%' }}
        />
        <Text>
        {file ? (
            <small>
              파일명: {file != null ? file.name : previewUrl} ({(file.size / 1024 / 1024).toFixed(1)} MB)
            </small>
        ) : (
            <small>
              파일명: {previewUrl.split('s3-oaple')[1]}
            </small>
        )}
        </Text>
      </div>
  );
}

const FileInput = styled.input`
  width: 75px;
`;
const ReloadButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
`

const FrameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  height: 70px;
`

const Text = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  height: 70px;
`
const resetIcon = <svg width="21" height="21" viewBox="0 0 21 21"><g fill="none" fillRule="evenodd" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" transform="matrix(0 1 1 0 2.5 2.5)"><path d="m3.98652376 1.07807068c-2.38377179 1.38514556-3.98652376 3.96636605-3.98652376 6.92192932 0 4.418278 3.581722 8 8 8s8-3.581722 8-8-3.581722-8-8-8"/><path d="m4 1v4h-4" transform="matrix(1 0 0 -1 0 6)"/></g></svg>