import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';

export const Circle = ({ value, selected, onClick, disabled }) => {
    const handleClick = () => {
        if (!disabled) {
            onClick(value)
        }
    };

    return (
        <Box
            boxShadow={3}
            display="inline-flex"
            justifyContent="center"
            alignItems="center"
            width={100}
            height={100}
            borderRadius="50%"
            backgroundColor={disabled ? 'gray' : (selected ? '#a5d6a7' : 'transparent')}
            margin={1}
            onClick={handleClick}
            style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
        >
            <span>{value}</span>
        </Box>
    );
};