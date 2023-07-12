import { Box } from '@mui/material';

export const Circle = ({ value, selected, onClick, disabled }) => {
    const handleClick = () => {
        if (!disabled) {
            onClick(value)
        }
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
            border={disabled ? "2px solid gray" : "2px solid green"}
            margin={1}
            onClick={handleClick}
            style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
        >
            <span>{value}</span>
        </Box>
    );
};