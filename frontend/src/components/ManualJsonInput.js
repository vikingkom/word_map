import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import SaveIcon from '@mui/icons-material/Save';
import { emptyTemplate } from './emptyTemplate';
import { exampleTemplate } from './exampleTemplate';

const ManualJsonInput = ({ onSubmit, setLoading }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');

  const validateAndSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      setError('');
      setLoading(true);
      await onSubmit(parsedJson);
    } catch (error) {
      setError('Invalid JSON format. Please check your input.');
    } finally {
      setLoading(false);
    }
  };


  const handlePasteSchema = () => {
    setJsonInput(JSON.stringify(emptyTemplate, null, 2));
  };

  const handlePasteExample = () => {
    setJsonInput(JSON.stringify(exampleTemplate, null, 2));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button
          variant="outlined"
          onClick={handlePasteSchema}
          startIcon={<ContentPasteIcon />}
        >
          Paste Empty Template
        </Button>
        <Button
          variant="outlined"
          onClick={handlePasteExample}
          startIcon={<ContentPasteIcon />}
        >
          Paste Example
        </Button>
      </Box>
      <TextField
        fullWidth
        multiline
        rows={20}
        label="Enter JSON"
        variant="outlined"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        error={!!error}
        helperText={error}
        sx={{ fontFamily: 'monospace' }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={validateAndSubmit}
          startIcon={<SaveIcon />}
          sx={{ minWidth: '120px' }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default ManualJsonInput;
