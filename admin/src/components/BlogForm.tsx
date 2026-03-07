"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft } from "lucide-react";


import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogFormProps {
    initialData?: {
        id: string;
        title: string;
        slug: string;
        content: string;
        image?: string;
        published?: boolean;
    };
}

export default function BlogForm({ initialData }: BlogFormProps) {
    const [title, setTitle] = useState(initialData?.title || "");
    const [slug, setSlug] = useState(initialData?.slug || "");
    const [content, setContent] = useState(initialData?.content || "");
    const [image, setImage] = useState(initialData?.image || "");
    const [published, setPublished] = useState(initialData?.published ?? true);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(false);
    const router = useRouter();

    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .replace(/ə/g, "e")
            .replace(/ı/g, "i")
            .replace(/ç/g, "c")
            .replace(/ş/g, "s")
            .replace(/ğ/g, "g")
            .replace(/ü/g, "u")
            .replace(/ö/g, "o")
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        if (!initialData) {
            setSlug(generateSlug(e.target.value));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const url = initialData ? `/api/blogs/${initialData.id}` : "/api/blogs";
        const method = initialData ? "PATCH" : "POST";

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, slug, content, image, published }),
        });

        if (res.ok) {
            router.push("/dashboard/blogs");
            router.refresh();
        } else {
            alert("Xəta baş verdi");
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="text-gray-600 hover:text-indigo-600 flex items-center font-medium transition-colors"
                >
                    <ArrowLeft className="h-5 w-5 mr-1" />
                    Geri qayıt
                </button>
                <h2 className="text-2xl font-extrabold text-gray-900">
                    {initialData ? "Bloqu Redaktə Et" : "Yeni Blog Yazısı"}
                </h2>
            </div>

            <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="block text-sm font-bold text-gray-900 uppercase tracking-tight">Başlıq</label>
                        <input
                            type="text"
                            required
                            className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 bg-gray-50 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
                            placeholder="Bloqun başlığını daxil edin..."
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-bold text-gray-900 uppercase tracking-tight">Slug (Link)</label>
                        <input
                            type="text"
                            required
                            className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 bg-gray-50 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
                            placeholder="blog-kecid-linki"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-bold text-gray-900 uppercase tracking-tight">Şəkil URL</label>
                    <input
                        type="text"
                        className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 bg-gray-50 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="block text-sm font-bold text-gray-900 uppercase tracking-tight">
                            Məzmun <span className="text-gray-500 font-normal normal-case ml-1">(Markdown dəstəklənir)</span>
                        </label>
                        <button
                            type="button"
                            onClick={() => setPreview(!preview)}
                            className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${preview
                                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            {preview ? "📝 Redaktə et" : "👁️ Ön baxış"}
                        </button>
                    </div>

                    {preview ? (
                        <div className="prose prose-indigo max-w-none border-2 border-dashed border-indigo-100 p-6 rounded-xl min-h-[400px] bg-white text-gray-900 shadow-inner">
                            {content ? (
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                            ) : (
                                <p className="text-gray-400 italic">Hələ ki məzmun yoxdur...</p>
                            )}
                        </div>
                    ) : (
                        <textarea
                            rows={15}
                            required
                            className="block w-full rounded-xl border border-gray-300 px-4 py-4 text-gray-900 bg-gray-50 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all outline-none font-mono text-sm resize-y"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="# Başlıq\n\nBura bloq mətnini daxil edin...\n\n- Siyahı elementi\n- Digər element"
                        />
                    )}
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <input
                        type="checkbox"
                        id="published"
                        className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        checked={published}
                        onChange={(e) => setPublished(e.target.checked)}
                    />
                    <label htmlFor="published" className="ml-3 block font-bold text-gray-800 cursor-pointer select-none">
                        Bloqu dərhal daxil et (Dərc edilsin)
                    </label>
                </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 mt-8 border-t border-gray-100">
                <button
                    type="button"
                    onClick={() => router.push("/dashboard/blogs")}
                    className="px-6 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-lg transition-colors"
                >
                    Ləğv et
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md shadow-indigo-100 flex items-center transition-all active:transform active:scale-95 disabled:opacity-70"
                >
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? "Yadda saxlanılır..." : "Yadda saxla"}
                </button>
            </div>

        </form>
    );
}
