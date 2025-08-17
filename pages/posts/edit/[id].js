import prisma from '../../../lib/prisma';
import EditForm from '../../../components/EditForm';

export async function getServerSideProps({ params }) {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!post) return { notFound: true };

  return {
    props: {
      post: {
        ...post,
        createdAt: post.createdAt.toISOString(),
      },
    },
  };
}

export default function EditPage({ post }) {
  return <EditForm post={post} />;
}
