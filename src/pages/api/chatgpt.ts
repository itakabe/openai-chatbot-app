import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth/next"
import { authOptions } from './auth/[...nextauth]'
import { Cosmos } from '@/components/Cosmos'
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const cosmos = new Cosmos();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions)
    if (!session?.user?.email) {
        res.status(401).send({ message: 'Unauthorized' })
        return
    }

    try {
        const message = req.body.message;
        const url = `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_NAME}/chat/completions?api-version=${process.env.AZURE_OPENAI_API_VERSION}` || "";
        const maxTokens = 2048;
        const temperature = 0.7;
        const data = {
            messages: message,
            max_tokens: maxTokens,
            temperature: temperature,
            stop: "None"
        }

        const headers = {
            'Content-Type': 'application/json',
            'api-key': `${process.env.AZURE_OPENAI_API_KEY}`,
        };
        const response = await axios.post(url, data, { headers });
        const write_data = { ...response.data };
        // レスポンスと入力データ、ユーザを結合してDBにインサート
        write_data.post = { ...data };
        write_data.user = {
            email: session.user.email,
            name: session.user.name,
        };
        await cosmos.create(write_data);

        res.status(200).json({ data: response.data.choices[0].message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};