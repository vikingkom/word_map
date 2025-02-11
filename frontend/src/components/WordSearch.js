import React, { useState } from 'react';
import { Paper, TextField, Button, Box, Typography, Tabs, Tab } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import ManualJsonInput from './ManualJsonInput';

const WordSearch = ({ onSearchComplete, setLoading }) => {
  const [word, setWord] = useState('');
  const [mode, setMode] = useState(0); // 0 for word input, 1 for JSON input

  const handleSearch = async () => {
    if (!word.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/analyze', { word: word.trim() });
      onSearchComplete(response.data);
    } catch (error) {
      console.error('Error analyzing word:', error);
      // TODO: Add error handling UI
    } finally {
      setLoading(false);
    }
  };

  const handleManualSubmit = async (jsonData) => {
    try {
      // Store the word from the JSON data
      const wordFromJson = jsonData.word;
      if (wordFromJson) {
        setWord(wordFromJson);
      }
      
      // Pass the data directly to the parent component
      onSearchComplete(jsonData);
    } catch (error) {
      console.error('Error submitting manual JSON:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && mode === 0) {
      handleSearch();
    }
  };

  return (
    <Paper elevation={3} sx={{ mb: 3 }}>
      <Tabs
        value={mode}
        onChange={(e, newValue) => setMode(newValue)}
        variant="fullWidth"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="Word Analysis" />
        <Tab label="Manual JSON Input" />
      </Tabs>

      <Box sx={{ p: 3 }}>
        {mode === 0 ? (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="Enter a German word"
              variant="outlined"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              startIcon={<SearchIcon />}
              sx={{ minWidth: '120px' }}
            >
              Search
            </Button>
          </Box>
        ) : (
          <ManualJsonInput onSubmit={handleManualSubmit} setLoading={setLoading} />
        )}
      </Box>
    </Paper>
  );
};

export default WordSearch;
