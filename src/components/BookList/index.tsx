import React, { useEffect } from "react";
import { fetchBooks } from "../../api/api";
import BookCard from "../BookCard";
import { Box, CircularProgress, Container } from "@mui/material";
import Toast from "../Toast";
import { LIMIT } from "../../api/constants";
interface BookListProps {
    page: number;
    query: string;
    onTotalPagesChange: (totalPages: number) => void;
}
const BookList = ({page, query, onTotalPagesChange}: BookListProps) => { 
    const [books, setBooks] = React.useState<any>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);
    const [savedBooks, setSavedBooks] = React.useState<any>([]);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState<string>("");
    const [type, setType] = React.useState<string>("success");
    const [duration, setDuration] = React.useState<number>(3000);

    const handleClose = () => {
        setIsOpen(false);
        setMessage("");
        setType("success");
        setDuration(3000);
    };
    const handleOpen = (message: string, type: string, duration: number) => {
        setIsOpen(true);
        setMessage(message);
        setType(type);
        setDuration(duration);
    };

    useEffect(() => {
        console.log("Books: ", books);
        try {
            setIsLoading(true);
            fetchBooks({page, query}).then((data: any) => {
                onTotalPagesChange(Math.ceil(data.numFound/LIMIT));
                console.log(data);
                setBooks(data.docs);
                setIsLoading(false);
            })
        }
        catch (error) {
            setError("Something went wrong");
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
        console.log("Book: ", key, savedBooks);
        if(savedBooks.includes(key.trim())) {
            const updated = savedBooks.filter((book: any) => key !== book);
            setSavedBooks(updated);
            console.log("Book Updated: ", key, savedBooks, updated);

            localStorage.setItem("savedBooks", JSON.stringify(updated));
        } else {
            const updated = [...savedBooks, key];
            setSavedBooks(updated);
            localStorage.setItem("savedBooks", JSON.stringify(updated));
        }
        handleOpen("Book Saved", "success", 3000);
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
            {/* <Toast message="aded to ....." onClose={handleClose} isOpen={isOpen}/> */}
        </Container>
    )
};

export default BookList;