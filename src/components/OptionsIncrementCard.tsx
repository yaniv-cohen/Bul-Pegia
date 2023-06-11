

import { Box, Button, Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react'

export const  OptionsIncrementCard = ({ optionsCount  , slotsCount, min, max , func1}: {optionsCount:number  , slotsCount:number, min:number, max:number , func1: Function})=>{
return  <Card>
<CardBody>
<Box>
<CardHeader>
<Heading size='md'>{Object.keys({ optionsCount }) + `: ${slotsCount}`}</Heading>
</CardHeader>
<Button onClick={() => { func1(Math.min(max, slotsCount + 1)) }}>+</Button>
    <Button onClick={() => { func1(Math.max(min, slotsCount - 1)) }}>-</Button>
    </Box>
    </CardBody>
    </Card>
}
export default OptionsIncrementCard