import React, { useState } from 'react';

function ImageUpload(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    props.onFileSelect(event.target.files[0], selectedLanguage); // Pass file back to parent
  };

  const languageChangeHandler = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor='languageSelect'>Translate to: </label>
        <select
          id='languageSelect'
          value={selectedLanguage}
          onChange={languageChangeHandler}
        >
          <option value=''>Select Language</option>
          <option value='en'>English</option>
          <option value='es'>Spanish</option>
          <option value='fr'>French</option>
        </select>
      </div>
      <div>
        <input type='file' onChange={fileSelectedHandler} />
        {selectedFile && (
          <img src={URL.createObjectURL(selectedFile)} alt='Selected' />
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
