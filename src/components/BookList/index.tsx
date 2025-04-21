import React, { useEffect } from "react";
import { Box, CircularProgress, Container } from "@mui/material";
import { LIMIT } from "../../api/constants";
import { fetchBooks } from "../../api/api";
import BookCard from "../BookCard";
import Toast from "../Toast";

interface BookListProps {
    page: number;
    query: string;
    onTotalPagesChange: (totalPages: number) => void;
}
const BookList = ({page, query, onTotalPagesChange}: BookListProps) => { 
    const [books, setBooks] = React.useState<any>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [savedBooks, setSavedBooks] = React.useState<any>([]);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState<string>("");

    useEffect(() => {
        try {
            setIsLoading(true);
            fetchBooks({page, query}).then((data: any) => {
                onTotalPagesChange(Math.ceil(data.numFound/LIMIT));
                console.log(data);
                setBooks(data.docs);
                setIsLoading(false);
            }).catch((error: any) => {
                console.log("Error fetching books", error);
                setIsLoading(false);
            });
        }
        catch (error) {
            console.log("Something went wrong");
            setIsLoading(false);
        }
    },[page, query]);

    useEffect(() => {
        const savedBooks = localStorage.getItem("savedBooks");
        if (savedBooks) {
            setSavedBooks(JSON.parse(savedBooks));
        }
    }, []);

    const handleToggleSave = (key: any) => {

        if(savedBooks.includes(key.trim())) {
            const updated = savedBooks.filter((book: any) => key !== book);
            setSavedBooks(updated);
            setMessage("Book removed from saved");
            setIsOpen(true);
            localStorage.setItem("savedBooks", JSON.stringify(updated));
        } else {
            const updated = [...savedBooks, key];
            setSavedBooks(updated);
            setMessage("Book saved");
            setIsOpen(true);
            localStorage.setItem("savedBooks", JSON.stringify(updated));
        }
    };

    if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <CircularProgress />
        </Box>;

    if (!books || books.length === 0) return <div className="text-center">No books found</div>;

    return (
        <Container sx={{ mt: 4, minHeight: "100vh" }}>
            <Box
                sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, auto))',
                }}
>
                {books.map((book: any) => (
                    <BookCard 
                        {...book} 
                        key={book.key} 
                        id={book.key} 
                        isSaved={savedBooks.includes(book.key)} 
                        onToggleSave={handleToggleSave}
                        isLoading={isLoading}
                    />
                ))}
            </Box>
            <Toast open={isOpen} message={message} onClose={() => setIsOpen(false)}/>
        </Container>
    )
};

export default BookList;