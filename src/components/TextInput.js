import React from 'react'
import { Flex, Input, Text } from '@chakra-ui/react'

const TextInput = ({placeholder='', error, label='', value, onChange})=>{
    return(
        <Flex direction="column" h="100px">
            {label && <Text fontWeight="medium" fontSize="14px" mb={2}>{label}</Text>}
            <Input 
                // isInvalid={error} 
                focusBorderColor="brand.800" 
                errorBorderColor="bad.primary" 
                placeholder={placeholder} 
                size='md' 
                value={value}
                onChange={onChange}
            />
            <Text fontSize="12px" mt="2" color="bad.primary" fontWeight="light">{error || ' ' }</Text>
        </Flex>
    )
}

export default TextInput