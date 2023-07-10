import { Box } from '@mui/material';

export const Circle = ({ value, selected, onClick }) => {
    const handleClick = () => {
        onClick(value);
    };

    return (
        <Box
            display="inline-flex"
            justifyContent="center"
            alignItems="center"
            width={100}
            height={100}
            borderRadius="50%"
            backgroundColor={selected ? 'green' : 'transparent'}
            border="2px solid green"
            margin={1}
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
        >
            <span>{value}</span>
        </Box>
    );
};