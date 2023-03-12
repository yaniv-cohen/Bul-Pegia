import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Button,
    Card,
} from '@chakra-ui/react'
import { createRef, useRef, useState } from 'react'
import Circle from './circle'

export const HistoryPanel = () =>
{
    const colorMap = {} as any
    return <aside >
        <h2>this is a aside</h2>
        <h2>Results:</h2>
        <Circle color="red" side={50}></Circle>
        <ul id="resultsList">
        </ul>
    </aside>
}
export default HistoryPanel