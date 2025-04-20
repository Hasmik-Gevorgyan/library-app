import React from "react";
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import{ Pagination as MUIPagination, PaginationItem}from "@mui/material";


interface PaginationProps {
  page: number;
  total: number;
  onPageChange: (newPage: number) => void;
}

const Pagination = ({page, total, onPageChange}: PaginationProps) => {

  const handlePageChange = (event:  React.ChangeEvent<unknown>,page: number) => {onPageChange(page)};
  
  return (
    <Stack spacing={2} sx={{ p: 2, my: 2, alignItems: 'center' }}>
      <MUIPagination
        count={total}
        page={page}
        onChange={handlePageChange}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
  </Stack>
);
}

export default Pagination;
