import React, { useState } from 'react';
import './App.css';

const generateTcNumber = () => {
    const birthDate = Math.floor(Math.random() * 900000000) + 100000000;
    const genderDigit = Math.floor(Math.random() * 10);
    const firstTenDigits = `${birthDate}${genderDigit}`;
    const sumOfDigits = firstTenDigits.split('').map(Number).reduce((a, b) => a + b, 0);
    const eleventhDigit = sumOfDigits % 10;
    return `${firstTenDigits}${eleventhDigit}`;
};

const copyToClipboard = (text, setCopied) => {
    navigator.clipboard.writeText(text)
        .then(() => setCopied(true))
        .catch(err => console.error('Failed to copy text:', err));
};

function App() {
    const [content, setContent] = useState('');
    const [tcNumber, setTcNumber] = useState('');
    const [contentCopied, setContentCopied] = useState(false);
    const [tcNumberCopied, setTcNumberCopied] = useState(false);

    const fetchData = () => {
        fetch('http://localhost:3001/scrape')
            .then(response => response.json())
            .then(data => {
                setContent(data.spanContent);
                setContentCopied(false); 
                console.log(data.spanContent, 'fetched');
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const generateAndDisplayTcNumber = () => {
        const newTcNumber = generateTcNumber();
        setTcNumber(newTcNumber);
        setTcNumberCopied(false); 
        console.log(newTcNumber, 'generated');
    };

    return (
        <div className="container">
            <div className="grid-container">
                <div className="section">
                    <h1>Scrape TC Number</h1>
                    <div className="tc-container">
                    <p>{content}</p>
                    {content && (
                        <div className="copy-container">
                            <button 
                                type="button" 
                                onClick={() => copyToClipboard(content, setContentCopied)} 
                                className="button copy"
                            >
                                {contentCopied ? 'Copied' : 'Copy'}
                            </button>
                        </div>
                    )}
                   </div>
                    <button 
                        type="button" 
                        onClick={fetchData} 
                        className="button fetch"
                    >
                        Fetch TC from website
                    </button>
                </div>
                <div className="section">
                    <h1>Generate TC Number</h1>
                    <div className="tc-container">
                        <p>{tcNumber}</p>
                        {tcNumber && (
                            <button 
                                type="button" 
                                onClick={() => copyToClipboard(tcNumber, setTcNumberCopied)} 
                                className="button copy"
                            >
                                {tcNumberCopied ? 'Copied' : 'Copy'}
                            </button>
                        )}
                    </div>
                    <button 
                        type="button" 
                        onClick={generateAndDisplayTcNumber} 
                        className="button generate"
                    >
                        Generate random TC
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
