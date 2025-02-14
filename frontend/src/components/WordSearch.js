import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Container, 
  Grid,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import WordResult from './WordResult';
import SearchHistory from './SearchHistory';

const WordSearch = ({ onSearchComplete, setLoading }) => {
  const [word, setWord] = useState('');

  const handleSearch = async () => {
    if (!word.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/analyze', { word: word.trim() });
      onSearchComplete(response.data);
    } catch (error) {
      console.error('Error analyzing word:', error);
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Paper elevation={3} sx={{ mb: 3 }}>
      <Box sx={{ p: 3 }}>
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
      </Box>
    </Paper>
  );
};

export default WordSearch;
