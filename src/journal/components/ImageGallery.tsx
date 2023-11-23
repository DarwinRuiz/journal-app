import { ImageList, ImageListItem } from '@mui/material';

interface Props {
    imageUrls: string[]
}

export const ImageGallery = ({ imageUrls }: Props): JSX.Element => {
    return (
        <ImageList sx={{ width: '100%', height: 500 }} cols={4} rowHeight={200}>
            {imageUrls.map((url: string) => (
                <ImageListItem key={url}>
                    <img
                        srcSet={`${url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        src={`${url}?w=164&h=164&fit=crop&auto=format`}
                        alt='Imagen de la nota'
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
};
