import React, {useRef} from 'react'
import io from 'socket.io-client'

export default function Join({setchatVisibility,setSocket}) {

    const usernameRef = useRef()

    const handleSubmit = async () => {
        const username = usernameRef.current.value
        if(!username.trim()) return
        const socket = await io.connect('http://localhost:3001')
        socket.emit('set_username',username)
        setSocket(socket)
        setchatVisibility(true) 
    }

    return (
        <div>
            <h1>Join</h1>
            <input type="text" ref={usernameRef} placeholder='Nome do usuário' />
            <button onClick={handleSubmit}>Entrar</button>
        </div>
    )
}

// import React, { useState } from 'react';
// import { Box } from '@mui/material';


// export default function CustomSelector() {
//     const [selectedValue, setSelectedValue] = useState(null);
  
//     const handleCircleClick = (value) => {
//       setSelectedValue(value);
//     };
  
//     return (
//       <div>
//         <div>
//           <Circle
//             value={1}
//             selected={selectedValue === 1}
//             onClick={handleCircleClick}
//           />
//           <Circle
//             value={2}
//             selected={selectedValue === 2}
//             onClick={handleCircleClick}
//           />
//           <Circle
//             value={3}
//             selected={selectedValue === 3}
//             onClick={handleCircleClick}
//           />
//         </div>
//       </div>
//     );
//   };
  
//   const Circle = ({ value, selected, onClick }) => {
//     const handleClick = () => {
//       onClick(value);
//     };
  
//     return (
//       <Box
//         display="inline-flex"
//         justifyContent="center"
//         alignItems="center"
//         width={100}
//         height={100}
//         borderRadius="50%"
//         backgroundColor={selected ? 'green' : 'transparent'}
//         border="2px solid green"
//         margin={1}
//         onClick={handleClick}
//         style={{ cursor: 'pointer' }}
//       >
//         <span>{value}</span>
//       </Box>
//     );
//   };
  