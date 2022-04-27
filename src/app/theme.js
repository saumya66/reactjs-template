import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

//custom styling
// const styles = {
//     global: props => ({
//       body: {
//         color: mode('gray.800', 'gray.800')(props),
//         bg: mode('gray.200', '#1F1F23')(props),
//       },
//     }),
  
//   };

//Example props -> color = "brand.100"   
const theme = extendTheme({ config , 
  colors:{
    brand :{
      100:"#f0e5ff",
      200:"#e3d1ff",
      300:"#d1b3ff",
      400:"#bf94ff",
      500:"#a970ff",
      600:"#C167FF",
      700:"#9147ff",
      800:"#772ce8",
      900:"#5c16c5"
    },
    good:{
      primary:"#00db84"
    },
    bad:{
      primary:"#e91916"
    }
}})

export default theme

