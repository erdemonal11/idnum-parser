import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import './App.css';
import { getCities, getDistrictsByCityCode, getNeighbourhoodsByCityCodeAndDistrict } from 'turkey-neighbourhoods';
import { Clipboard } from 'flowbite-react';
import { FaSyncAlt, FaDownload } from 'react-icons/fa';

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

const generateTcNumber = () => {
    const birthDate = Math.floor(Math.random() * 900000000) + 100000000;
    const genderDigit = Math.floor(Math.random() * 10);
    const firstTenDigits = `${birthDate}${genderDigit}`;
    const sumOfDigits = firstTenDigits.split('').map(Number).reduce((a, b) => a + b, 0);
    const eleventhDigit = sumOfDigits % 10;
    return `${firstTenDigits}${eleventhDigit}`;
};

const generateAdditionalInfo = (tc) => {
    const cities = getCities();
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const districts = getDistrictsByCityCode(randomCity.code);
    const randomDistrict = districts[Math.floor(Math.random() * districts.length)];
    const neighbourhoods = getNeighbourhoodsByCityCodeAndDistrict(randomCity.code, randomDistrict);
    const randomNeighbourhood = neighbourhoods[Math.floor(Math.random() * neighbourhoods.length)];

    return {
        customerTypeShortCode: "RSDNTL",
        langShortCode: null,
        employeeNumber: null,
        secretKeyword: null,
        legacyCustomerId: [],
        temporaryPassword: null,
        contactMedium: [
            {
                contactData: "5464977941",
                contactMediumType: {
                    shortCode: "HOME_PHONE",
                    contactMediumTypeId: 30,
                    groupTypeCode: "PHONE",
                    hasExtension: false,
                    name: "HOME_PHONE"
                }
            },
            {
                contactData: "",
                contactMediumType: {
                    shortCode: "EMAIL",
                    contactMediumTypeId: 10,
                    groupTypeCode: "EMAIL",
                    hasExtension: false,
                    name: "EMAIL"
                }
            }
        ],
        employer: null,
        consentEmail: false,
        consentSms: false,
        unionShortCode: null,
        partyTypeShortCode: "INDV",
        genderShortCode: "MALE",
        email: "",
        firstName: "CL*****",
        lastName: "BO**",
        maidenName: "aaaa",
        birthDate: "Sat Jan 01 1966 12:00:00 GMT+2 (GMT+02:00)",
        placeOfBirth: "BİLKENT",
        address: {
            cityId: randomCity.id,
            subPrvncId: randomDistrict.id,
            dstrctId: randomNeighbourhood.id,
            pstlCode: randomNeighbourhood.postalCode,
            addrDesc: "hkghjgk",
            doorNum: "4654"
        },
        natId: tc,
        motherName: "M***",
        fatherName: "M***",
        idTypeShrtCode: "INDNT",
        idNo: "A12345678",
        registrationNo: "12345",
        permitDate: "",
        oldLastName: null,
        oldName: null,
        maritalStatus: "UNMARRIED",
        nalId: 1103,
        customerProfileVals: [],
        hobbies: [],
        bsnInterSpecShortCode: "REAL_SALE",
        checkInDate: "",
        idExpiryDate: null,
        cityId: randomCity.id,
        subProvinceId: randomDistrict.id,
        districtName: randomDistrict,
        dstrctId: randomNeighbourhood.id,
        pstlCode: randomNeighbourhood.postalCode,
        processType: "MERNIS"
    };
};

const downloadJson = (data) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "TCInfo.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
};

function App() {
    const [tcNumber, setTcNumber] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState(null);

    const generateAndDisplayTcNumber = () => {
        let newTcNumber;
        do {
            newTcNumber = generateTcNumber();
        } while (!isValidTC(newTcNumber));
        const info = generateAdditionalInfo(newTcNumber);
        setTcNumber(newTcNumber);
        setAdditionalInfo(info);
    };

    return (
        <div className="container app-container flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-orange-300 via-blue-400 to-blue-600 font-poppins p-8">
            <div className="grid place-items-center p-4 bg-white border border-gray-300 rounded-lg shadow-md max-w-sm">
                <div className="text-center">
                    <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                            TC NUMBER GENERATOR
                        </span>
                    </h1>

                    <div className="flex flex-col items-center mb-2">
                        <div className="flex items-center space-x-2">
                            <p className="text-lg">{tcNumber}</p>
                            {tcNumber && (
                                <Clipboard.WithIcon
                                    valueToCopy={tcNumber}
                                    buttonLabel={tcNumber ? 'Copied' : 'Copy'}
                                    component="button"
                                    className="button copy"
                                />
                            )}
                        </div>
                        <div className="w-full h-0.5 bg-gray-800 my-2"></div>
                    </div>

                    <div className="flex justify-center space-x-2 w-full">
                        <button 
                            type="button" 
                            onClick={generateAndDisplayTcNumber} 
                            className="flex-grow flex items-center justify-center px-2 py-1 text-sm font-bold text-white bg-[#f58220] rounded hover:bg-[#d76e1c] focus:bg-[#c05f18] transform transition-transform duration-300 hover:scale-105 mt-2"
                        >
                            Generate TC <FaSyncAlt className="ml-1" />
                        </button>
                        {additionalInfo && (
                            <button 
                                type="button" 
                                className="flex-grow flex items-center justify-center px-2 py-1 text-sm font-bold text-white bg-[#242441] rounded hover:bg-[#1f1f37] focus:bg-[#1b1b32] transform transition-transform duration-300 hover:scale-105 mt-2"
                                onClick={() => downloadJson(additionalInfo)}
                            >
                                JSON <FaDownload className="ml-1" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
