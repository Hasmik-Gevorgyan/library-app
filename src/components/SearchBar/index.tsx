import React from "react";
import { debounce } from "../../utils/debounce";
import { Box, TextField } from "@mui/material";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

const SearchBar: React.FC<Props> = ({ value, onChange }) => {
    const [searchvalue, setSearchValue] = React.useState(value);

    const debouncedChange = debounce((value: string) => {
        onChange(value);
    }, 500);

    const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
        const value: string = event.target.value;

        setSearchValue(value);
        debouncedChange(value);
    }

    return (
        <Box sx={{ p: 2 }}>
            <TextField  
                fullWidth   
                label="Search" 
                id="fullWidth" 
                onChange={onSearchChange}
                value={searchvalue}
            />
        </Box>
    );
};

export default SearchBar;
