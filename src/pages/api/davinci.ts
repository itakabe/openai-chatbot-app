import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth/next"
import { authOptions } from './auth/[...nextauth]'
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions)
    if (!session?.user?.email) {
        res.status(401).send({ message: 'Unauthorized' })
        return
    }
    try {
        const message = req.body.input;
        const url = `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/davinci/completions?api-version=2023-03-15-preview` || "";
        const maxTokens = 2048;
        const temperature = 0.7;
        const data = {
            prompt: message,
            max_tokens: maxTokens,
            temperature: temperature,
        };

        const headers = {
            'Content-Type': 'application/json',
            'api-key': `${process.env.AZURE_OPENAI_API_KEY}`,
        };
        const response = await axios.post(url, data, { headers });
        res.status(200).json({ data: response.data.choices[0].text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};