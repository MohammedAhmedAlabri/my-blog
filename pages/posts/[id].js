// pages/posts/[id].js
import prisma from '../../lib/prisma';
import { useRouter } from 'next/router';
import Link from 'next/link';


export async function getServerSideProps({ params }) {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!post) {
    return { notFound: true }; // Next.js will show 404
  }

  // Serialize Date
  const serializedPost = {
    ...post,
    createdAt: post.createdAt.toISOString(),
  };

  return { props: { post: serializedPost } };
}

export default function PostPage({ post }) {
  const router = useRouter();

  if (!post) return <p>Post not found</p>; // fallback in case something goes wrong

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    await fetch(`/api/posts/${post.id}`, { method: 'DELETE' });
    router.push('/');
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <small>Created at: {new Date(post.createdAt).toLocaleString()}</small>

      <div style={{ marginTop: '20px' }}>
<Link href={`/posts/edit/${post.id}`}>
  <button>Edit</button>
</Link>
        <button onClick={handleDelete} style={{ marginLeft: '10px' }}>
          Delete
        </button>
      </div>
    </div>
  );
}
