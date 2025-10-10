

import {  Button,  } from '@chakra-ui/react'

export const  SubmitButton = ({arr, func}: {arr:string[], func:Function})=>{
return  <Button onClick={()=>func(arr)}>נחש</Button>
}
export default SubmitButton