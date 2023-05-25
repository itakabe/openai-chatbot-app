import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth/next"
import { authOptions } from './auth/[...nextauth]'
import { Cosmos } from '@/components/Cosmos'

const cosmos = new Cosmos();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions)
    if (!session?.user?.email) {
        res.status(401).send({ message: 'Unauthorized' })
        return
    }
    try {
        const { start, end } = req.query;
        // 全件取得
        const data = await cosmos.readAll();
        res.status(200).json({ data });
        /*
        if (start && end) {
            // 範囲を指定して取得
            const data = cosmos.readByRange(start as string, end as string);
            return res.status(200).json(data);
        } else if (!end) {
            // Bの処理を実行
            // デフォルトのデータ取得処理を実装
            const data = cosmos.readById(start as string);
            return res.status(200).json(data);
        } else {
            // 全件取得
            const data = cosmos.readAll();
            res.status(200).json({ data });
        }*/
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};