import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json(posts);
  } else if (req.method === 'POST') {
    const { title, content } = req.body;
    const post = await prisma.post.create({
      data: { title, content },
    });
    res.status(201).json(post);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
