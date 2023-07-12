import { Box } from '@mui/material';

export default function Palito({ number }) {
    return (
        <>
            {number ? <Box>
                {[...Array(number)].map((e, i) => (
                    <Box
                        key={i}
                        component="img"
                        alt="palito"
                        src="/palito.png"
                    />
                ))}
            </Box>:null}
        </>
    )
}