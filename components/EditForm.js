"use client"; // must be at the top
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function EditForm({ post }) {
  const router = useRouter();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`/api/posts/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    setLoading(false);

    if (res.ok) router.push(`/posts/${post.id}`);
    else alert('Failed to update post');
  };

  return (
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Update Post'}
        </button>
      </form>
    </div>
  );
}
