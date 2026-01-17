import axios from 'axios';

const PINATA_JWT = import.meta.env.VITE_PINATA_JWT;

export const uploadJSONToIPFS = async (JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    try {
        const response = await axios.post(url, JSONBody, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${PINATA_JWT}`
            }
        });
        return {
            success: true,
            pinataURL: "ipfs://" + response.data.IpfsHash
        };
    } catch (error) {
        console.error("Error uploading JSON to IPFS:", error);
        return {
            success: false,
            message: error.message,
        };
    }
};

export const uploadFileToIPFS = async (file) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    let data = new FormData();
    data.append('file', file);

    const metadata = JSON.stringify({
        name: file.name,
    });
    data.append('pinataMetadata', metadata);

    try {
        const response = await axios.post(url, data, {
            maxBodyLength: "Infinity",
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                Authorization: `Bearer ${PINATA_JWT}`
            }
        });
        return {
            success: true,
            pinataURL: "ipfs://" + response.data.IpfsHash
        };
    } catch (error) {
        console.error("Error uploading file to IPFS:", error);
        return {
            success: false,
            message: error.message,
        };
    }
};
