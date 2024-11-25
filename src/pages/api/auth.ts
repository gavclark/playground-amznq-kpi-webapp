import { NextApiRequest, NextApiResponse } from 'next';
import { Auth } from 'aws-amplify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const user = await Auth.currentAuthenticatedUser();
      res.status(200).json({
        username: user.username,
        attributes: user.attributes,
      });
    } catch (error) {
      res.status(401).json({ error: 'Not authenticated' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}