import Link from 'next/link';
import prisma from '../lib/prisma';

export async function getServerSideProps() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Convert Date objects to strings
  const serializedPosts = posts.map(post => ({
    ...post,
    createdAt: post.createdAt.toISOString(),
  }));

  return {
    props: { posts: serializedPosts },
  };
}

export default function Home({ posts }) {
  return (
    <div>
      <h1>Blog</h1>
      <Link href="/create">Create New Post</Link>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link> -{' '}
            <small>{new Date(post.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
