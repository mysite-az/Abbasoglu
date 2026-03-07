import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const envUrl = import.meta.env.VITE_API_URL || 'http://localhost:3558';
        const apiUrl = envUrl.endsWith('/') ? envUrl.slice(0, -1) : envUrl;
        fetch(`${apiUrl}/api/blogs`)
            .then((res) => res.json())

            .then((data) => {
                setBlogs(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching blogs:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="section-spacing container" style={{ textAlign: 'center' }}>
                <h2>Yüklənir...</h2>
            </div>
        );
    }

    return (
        <section className="blogs-section section-spacing">
            <div className="container">
                <h1 className="hero-title" style={{ color: '#000', marginBottom: '40px' }}>Bloglar</h1>
                <div className="w-layout-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '30px'
                }}>
                    {blogs.map((blog) => (
                        <div key={blog.id} className="blog-card" style={{
                            backgroundColor: '#fff',
                            borderRadius: '12px',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                            overflow: 'hidden',
                            transition: 'transform 0.3s ease'
                        }}>
                            {blog.image && (
                                <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                            )}
                            <div style={{ padding: '20px' }}>
                                <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{blog.title}</h3>
                                <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
                                    {new Date(blog.createdAt).toLocaleDateString('az-AZ')}
                                </p>
                                <Link to={`/blog/${blog.slug}`} className="button-primary-2" style={{ padding: '10px 20px', textDecoration: 'none', display: 'inline-block' }}>
                                    Davamını oxu
                                </Link>
                            </div>
                        </div>
                    ))}
                    {blogs.length === 0 && (
                        <p>Hələ ki, heç bir blog paylaşılmayıb.</p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Blogs;
