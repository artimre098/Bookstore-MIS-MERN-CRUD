// CsvImportButton.jsx
import React from 'react';
import CSVReader from 'react-csv-reader';

const CsvImportButton = ({ onImport }) => {
  const handleImportCSV = (data, fileInfo) => {
    // Pass the imported data to the parent component
    const cleanedData = data.filter(row =>
        row.title && row.author && row.publishYear && row.synopsis
      );
    onImport(cleanedData);
  };

  return (
    <>
      <CSVReader
        onFileLoaded={handleImportCSV}
        parserOptions={{ header: true }}
        inputId="csv-input"
        inputStyle={{ display: 'none' }}
      />
      <label htmlFor="csv-input" className='p-2 bg-green-300 m-2 cursor-pointer text-center'>
        Import from CSV
      </label>
    </>
  );
};

export default CsvImportButton;