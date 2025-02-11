import React, { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Chip,
} from '@mui/material';
import axios from 'axios';

const SearchHistory = ({ onSelectWord }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/history');
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Recent Searches
      </Typography>
      <List>
        {history.map((item) => (
          <ListItem
            key={item.id}
            disablePadding
            secondaryAction={
              <Chip
                label={`${item.search_count} searches`}
                size="small"
                variant="outlined"
              />
            }
          >
            <ListItemButton onClick={() => onSelectWord(item)}>
              <ListItemText
                primary={item.word}
                secondary={`Last searched: ${new Date(
                  item.updated_at
                ).toLocaleDateString()}`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default SearchHistory;
