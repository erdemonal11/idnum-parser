# TC Generate! - Web Extension

**TC Generate!** is a powerful tool that allows you to generate valid Turkish ID numbers (T.C. Kimlik No) in milliseconds. This extension is perfect for testing purposes, particularly for adding users to your system effortlessly.


![Extension Screenshot](/extension.png)


## Features
- **Instant Generation**: Create valid TC numbers in just milliseconds.
- **JSON Download**: Download generated data in JSON format and use it to create users with just three clicks.
- **Dynamic Data**: Address and TC number fields are dynamically generated, while other data fields are static.
- **Integration with Node.js**: Use `node server.js` to parse TC numbers from the `tcnobul` website.

## Installation

### Prerequisites
- **React + Vite**: The extension is built using React and Vite.
- **Node.js**: Required for running the server-side scripts.

### Steps
1. **Clone the repository**: 
    ```bash
    git clone https://github.com/yourusername/tc-generate-extension.git
    cd tc-generate-extension
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Build the extension**:
    ```bash
    npm run build
    ```

4. **Load the extension into Chrome**:
    - Open Chrome and navigate to `chrome://extensions/`.
    - Enable **Developer mode**.
    - Click on **Load unpacked** and select the `dist` directory generated by the build process.

5. **Modify the manifest**:
    - Open the `manifest.json` file and make any necessary adjustments.

## Usage

- **Generating TC Numbers**: Simply open the extension, and click to generate a valid TC number.
- **Downloading as JSON**: Click the download button to save the generated data in JSON format.

### Sample JSON Format
The JSON data you can download will look like this:

```json
{
  "customerTypeShortCode": "RSDNTL",
  "langShortCode": null,
  "employeeNumber": null,
  "secretKeyword": null,
  "legacyCustomerId": [],
  "temporaryPassword": null,
  "contactMedium": [
    {
      "contactData": "5464977941",
      "contactMediumType": {
        "shortCode": "HOME_PHONE",
        "contactMediumTypeId": 30,
        "groupTypeCode": "PHONE",
        "hasExtension": false,
        "name": "HOME_PHONE"
      }
    },
    {
      "contactData": "",
      "contactMediumType": {
        "shortCode": "EMAIL",
        "contactMediumTypeId": 10,
        "groupTypeCode": "EMAIL",
        "hasExtension": false,
        "name": "EMAIL"
      }
    }
  ],
  ...
  "natId": "14610371788",
  "motherName": "M***",
  "fatherName": "M***",
  "idTypeShrtCode": "INDNT",
  "idNo": "A12345678",
  "registrationNo": "12345",
  ...
  "processType": "MERNIS"
}

 ```

This README is well-organized and provides clear instructions for installation, usage, and contributions.
