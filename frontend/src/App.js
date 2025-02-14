import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box } from '@mui/material';
import WordSearch from './components/WordSearch';
import WordResult from './components/WordResult';
import SearchHistory from './components/SearchHistory';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [searchResult, setSearchResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleSearchComplete = (result) => {
    setSearchResult(result);
    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <WordSearch 
            onSearchComplete={handleSearchComplete} 
            setLoading={setLoading} 
          />
          <WordResult 
            result={searchResult} 
            loading={loading} 
          />
          <SearchHistory 
            onSelectWord={handleSearchComplete}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
