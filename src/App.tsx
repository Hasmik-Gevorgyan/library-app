import { IconButton, Box } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeContext } from './theme/ThemeContext';
import BookList from './components/BookList';
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import './App.css';
const App = () => {
  const { mode, toggleColorMode } = useThemeContext();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [total, setTotal] = useState(0);

  return (
    <>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <IconButton onClick={toggleColorMode} color="inherit" className="focus:outline-none focus:ring-0">
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Box>
      <SearchBar  value={query} onChange={(value) => setQuery(value)}/>
    
      <BookList page={page} query={query.trim() || 'all'} onTotalPagesChange={(total: number) => setTotal(total) }/>
      <Pagination page={page} total={total} onPageChange={(newPage) => setPage(newPage)}/>
    </>
  );
};

export default App;
