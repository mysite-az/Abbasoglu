import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function BlogPost() {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const envUrl = import.meta.env.VITE_API_URL || 'http://localhost:3558';
        const apiUrl = envUrl.endsWith('/') ? envUrl.slice(0, -1) : envUrl;
        fetch(`${apiUrl}/api/blogs/slug/${slug}`)
            .then((res) => res.json())

            .then((data) => {
                if (!data.error) {
                    setBlog(data);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching blog post:', err);
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return (
            <div className="section-spacing container" style={{ textAlign: 'center' }}>
                <h2>Yüklənir...</h2>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="section-spacing container" style={{ textAlign: 'center' }}>
                <h2>Blog tapılmadı.</h2>
                <Link to="/blogs" className="button-primary-2">Bloglara qayıt</Link>
            </div>
        );
    }

    return (
        <article className="blog-post-section section-spacing">
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <Link to="/blogs" style={{ color: '#666', marginBottom: '20px', display: 'inline-block' }}>
                    ← Bloglara qayıt
                </Link>
                <h1 className="hero-title" style={{ color: '#000', marginBottom: '10px', fontSize: '36px' }}>{blog.title}</h1>
                <p style={{ color: '#666', marginBottom: '30px' }}>
                    Yayımlanma tarixi: {new Date(blog.createdAt).toLocaleDateString('az-AZ')}
                </p>

                {blog.image && (
                    <img src={blog.image} alt={blog.title} style={{ width: '100%', marginBottom: '40px', borderRadius: '12px' }} />
                )}

                <div className="blog-content prose prose-lg" style={{ color: '#333' }}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown>
                </div>
            </div>
        </article>
    );
}

export default BlogPost;
