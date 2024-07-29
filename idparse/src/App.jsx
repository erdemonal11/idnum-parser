import React, { useState } from 'react';
import './App.css';
import { getCities, getDistrictsByCityCode, getNeighbourhoodsByCityCodeAndDistrict } from 'turkey-neighbourhoods';

function isValidTC(tc) {
    if (tc.length !== 11) return false;
    const digits = tc.split('').map(Number);

    if (digits.some(isNaN)) return false;

    const sumOdd = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
    const sumEven = digits[1] + digits[3] + digits[5] + digits[7];

    const digit10 = ((sumOdd * 7) - sumEven) % 10;
    const totalSum = digits.slice(0, 10).reduce((acc, val) => acc + val, 0);
    const digit11 = totalSum % 10;

    return digit10 === digits[9] && digit11 === digits[10];
}

const copyToClipboard = (text, setCopied) => {
    navigator.clipboard.writeText(text)
        .then(() => setCopied(true))
        .catch(err => console.error('Failed to copy text:', err));
};

const generateTcNumber = () => {
    const birthDate = Math.floor(Math.random() * 900000000) + 100000000;
    const genderDigit = Math.floor(Math.random() * 10);
    const firstTenDigits = `${birthDate}${genderDigit}`;
    const sumOfDigits = firstTenDigits.split('').map(Number).reduce((a, b) => a + b, 0);
    const eleventhDigit = sumOfDigits % 10;
    return `${firstTenDigits}${eleventhDigit}`;
};

const generateRandomStreetName = () => {
    const words = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet", "Consectetur", "Adipiscing", "Elit", "Sed", "Do", "Eiusmod", "Tempor", "Incididunt", "Ut", "Labore", "Et", "Dolore", "Magna", "Aliqua"];
    const randomIndex = () => Math.floor(Math.random() * words.length);
    const uniqueWords = new Set();
    while (uniqueWords.size < 4) {
        uniqueWords.add(words[randomIndex()]);
    }
    return `${Array.from(uniqueWords).join(' ')} Sokak`;
};

const generateAdditionalInfo = (tc) => {
    const birthDate = "01.01.1966";
    const seriNo = "A12345678";
    const kimlikKayitNo = "12345";
    const cities = getCities();
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const districts = getDistrictsByCityCode(randomCity.code);
    const randomDistrict = districts[Math.floor(Math.random() * districts.length)];
    const neighbourhoods = getNeighbourhoodsByCityCodeAndDistrict(randomCity.code, randomDistrict);
    const randomNeighbourhood = neighbourhoods[Math.floor(Math.random() * neighbourhoods.length)];
    const sokak = generateRandomStreetName();

    return {
        "natId": tc,
        "birthDate": birthDate,
        "idNo": seriNo,
        "registrationNo": kimlikKayitNo,
        "address": {
            "city": randomCity.name,
            "district": randomDistrict,
            "neighbourhood": randomNeighbourhood,
            "street": sokak,
            "phoneNumber": "5555555555"
        }
    };
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
                if (isValidTC(data.spanContent)) {
                    const additionalInfo = generateAdditionalInfo(data.spanContent);
                    setContent(data.spanContent);
                    console.log(JSON.stringify(additionalInfo, null, 2)); 
                } else {
                    console.error('Fetched TC is invalid');
                    setContent('Fetched TC is invalid');
                }
                setContentCopied(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setContent('Error fetching data');
            });
    };

    const generateAndDisplayTcNumber = () => {
        let newTcNumber;
        do {
            newTcNumber = generateTcNumber();
        } while (!isValidTC(newTcNumber));
        const additionalInfo = generateAdditionalInfo(newTcNumber);
        setTcNumber(newTcNumber);
        setTcNumberCopied(false);
        console.log(JSON.stringify(additionalInfo, null, 2));
    };

    return (
        <div className="container">
            <div className="grid-container">
                <div className="section">
                    <h1>Scrape TC Number</h1>
                    <div className="tc-container">
                        <p>{content}</p>
                        {content && (
                            <button 
                                type="button" 
                                onClick={() => copyToClipboard(content, setContentCopied)} 
                                className="button copy"
                            >
                                {contentCopied ? 'Copied' : 'Copy'}
                            </button>
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
