import React, { useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../styles.css";

// Pages
import Home from './Home'

// SubApps
import Beatles from "./SubApps/Beatles";
import GameIndustry from "./SubApps/GameIndustry";

// Navigation
import Navigation from "../components/Navigation";

// Console
import Console from '../Console'
import {Database} from "sql.js";

export default function App(){
    const [showConsole, setShowConsole] = useState<boolean>(false)
    const dbRefForConsole = useRef<Database | undefined>(undefined)

    return (
        <BrowserRouter>
            <Navigation />
            <main className={'main'}>
                <div className={`appsContainer ${showConsole && 'consoleOpened'}`}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/beatles" element={<Beatles refForDebug={dbRefForConsole}/>} />
                        <Route path="/game-industry" element={<GameIndustry refForDebug={dbRefForConsole}/>} />
                    </Routes>
                </div>
                <div className={`consoleContainer ${showConsole && 'consoleOpened'}`}>
                    <button onClick={() => setShowConsole(!showConsole)}>Toggle Console</button>
                    { showConsole ? ( <Console dbRef={dbRefForConsole}/> ) : null}
                </div>
            </main>
        </BrowserRouter>
    )
}
