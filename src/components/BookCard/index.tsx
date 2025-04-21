import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Skeleton,
} from '@mui/material';
import { Bookmark, BookmarkBorder } from '@mui/icons-material';

interface BookCardProps {
    author_name: string[];
    cover_i: string;
    first_publish_year: number;
    title: string;
    isSaved?: boolean;
    id: string;
    onToggleSave: (id: string) => void;
    isLoading?: boolean;
}

const BookCard = ({author_name, cover_i, first_publish_year, title, isSaved, id, isLoading, onToggleSave}: BookCardProps) => {
    const imageUrl = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;

    return (
        <Card sx={{ width: '100%', height: '100%', borderRadius: 3, boxShadow: 3 }}>
            {isLoading ? 
                <Skeleton variant="rectangular"  sx={{ width: '100%', objectFit: 'cover', height: 'auto', aspectRatio: '180/270' }}/>
             :
                <CardMedia
                    component="img"
                    image={imageUrl}
                    alt={title}
                    sx={{ width: '100%', objectFit: 'cover', height: 'auto', aspectRatio: '180/270' }}
                />
            }
            <CardContent>
            {isLoading ? 
                <>
                    <Skeleton width="80%" />
                    <Skeleton width="60%" />
                </>
            : 
                <>
                    <Typography gutterBottom variant="h6" component="div">
                    {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Year: {first_publish_year}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Author: {author_name?.join(', ')} 
                    </Typography>
                </>
            }
            </CardContent>
            <CardActions>
            {isLoading ? 
                <Skeleton variant="rectangular" width={80} height={30} />
            : 
                <IconButton onClick={()=> onToggleSave(id)} color="primary">
                    {isSaved ? <Bookmark /> : <BookmarkBorder />}
                </IconButton>
            }
            </CardActions>
        </Card>

    );
}

export default BookCard;