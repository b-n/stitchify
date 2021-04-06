import React, {useRef} from 'react';

interface FileSelectorProps {
  label: string;
  onChange: (imageBase64: string) => void;
}

const FileSelector: React.FC<FileSelectorProps> = ({
  label,
  onChange
}) => {
  const Selector = useRef<HTMLInputElement>(null);
  
  const showImage = () => {
    if (!Selector?.current?.files) {
      return;
    }
    const reader = new FileReader()
    reader.addEventListener("load", () => {
      onChange(reader.result as string);
    })
    reader.readAsDataURL(Selector.current.files[0])
  }

  return (
    <>
      <label>{label}</label>
      <input
        ref={Selector}
        type="file"
        onChange={() => { showImage() }}
      />
    </>
  )
}

export default FileSelector;
