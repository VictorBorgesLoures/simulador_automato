import { useState } from 'react'
import AF from '../classes/AF'
import IAFProvider from '../interfaces/IAFProvider';

function AFProvider(): IAFProvider {
    const [afState, setAF] = useState<AF | null>(null);
    const saveAF = (af: AF) => {
        setAF(af);
    }
    return {
        afState,
        saveAF
    }
} 

export default AFProvider;
