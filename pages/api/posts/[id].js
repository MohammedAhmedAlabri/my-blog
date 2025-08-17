import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const postId = parseInt(req.query.id);

  if (req.method === 'GET') {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    return res.json(post);
  }

  if (req.method === 'PUT') {
    const { title, content } = req.body;
    try {
      const updatedPost = await prisma.post.update({
        where: { id: postId },
        data: { title, content },
      });
      return res.json(updatedPost);
    } catch (error) {
      return res.status(400).json({ error: 'Update failed' });
    }
  }

  if (req.method === 'DELETE') {
    await prisma.post.delete({ where: { id: postId } });
    return res.status(204).end();
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
