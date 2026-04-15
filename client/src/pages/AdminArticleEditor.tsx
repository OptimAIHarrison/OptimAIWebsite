import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { ChevronLeft, Save, Eye, Upload, X } from "lucide-react";
import { useLocation } from "wouter";
import "@/styles/editor.css";

interface ArticleFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  author: string;
  readTime: number;
  status: "draft" | "published" | "scheduled";
  scheduledFor?: string;
}

export default function AdminArticleEditor() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState<ArticleFormData>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    category: "General",
    tags: [],
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    author: "OptimAI",
    readTime: 5,
    status: "draft",
  });

  const [tagInput, setTagInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image.configure({ allowBase64: true }),
    ],
    content: formData.content,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, content: editor.getHTML() }));
    },
  });

  useEffect(() => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.title]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setFormData((prev) => ({ ...prev, featuredImage: base64 }));
        toast.success("Image selected successfully");
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("Failed to load image");
      console.error(error);
      setIsUploading(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content) {
      toast.error("Title and content are required");
      return;
    }

    try {
      toast.success("Article saved successfully (tRPC integration pending)");
    } catch (error) {
      toast.error("Failed to save article");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 pt-40 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setLocation("/admin/articles")}
              className="flex items-center gap-2 text-foreground/70 hover:text-accent transition-colors"
            >
              <ChevronLeft size={20} />
              Back to Articles
            </button>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2"
              >
                <Eye size={18} />
                {showPreview ? "Edit" : "Preview"}
              </Button>
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center gap-2"
              >
                <Save size={18} />
                Save Article
              </Button>
            </div>
          </div>

          {!showPreview ? (
            <div className="space-y-8">
              <div className="bg-white/5 border-2 border-white/20 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-bold">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Article Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, title: e.target.value }))
                      }
                      className="w-full bg-white/5 border-2 border-white/30 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-accent focus:bg-white/10 transition-colors"
                      placeholder="Enter article title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">URL Slug</label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, slug: e.target.value }))
                      }
                      className="w-full bg-white/5 border-2 border-white/30 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-accent focus:bg-white/10 transition-colors"
                      placeholder="auto-generated-from-title"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border-2 border-white/20 rounded-lg p-6">
                <label className="block text-sm font-semibold mb-3">Excerpt</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      excerpt: e.target.value,
                    }))
                  }
                  rows={2}
                  className="w-full bg-white/5 border-2 border-white/30 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-accent focus:bg-white/10 transition-colors"
                  placeholder="Brief summary of the article"
                />
              </div>

              <div className="bg-white/5 border-2 border-white/20 rounded-lg p-6">
                <label className="block text-sm font-semibold mb-3">Featured Image</label>
                <div className="flex gap-4">
                  <label className="flex-1 flex items-center justify-center gap-2 bg-white/5 border-2 border-dashed border-white/20 rounded-lg px-4 py-8 cursor-pointer hover:border-accent transition-colors">
                    <Upload size={20} />
                    <span>Click to upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </label>
                  {formData.featuredImage && (
                    <div className="relative w-32 h-32">
                      <img
                        src={formData.featuredImage}
                        alt="Featured"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            featuredImage: "",
                          }))
                        }
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white/5 border-2 border-white/20 rounded-lg p-6">
                <label className="block text-sm font-semibold mb-3">Content</label>
                <div className="bg-white/5 border-2 border-white/30 rounded-lg overflow-hidden">
                  <div className="border-b border-white/10 bg-white/5 p-3 flex gap-2 flex-wrap">
                    <button
                      onClick={() =>
                        editor?.chain().focus().toggleBold().run()
                      }
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm font-semibold"
                    >
                      Bold
                    </button>
                    <button
                      onClick={() =>
                        editor?.chain().focus().toggleItalic().run()
                      }
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm"
                    >
                      Italic
                    </button>
                    <button
                      onClick={() =>
                        editor?.chain().focus().toggleHeading({ level: 2 }).run()
                      }
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm"
                    >
                      H2
                    </button>
                    <button
                      onClick={() =>
                        editor
                          ?.chain()
                          .focus()
                          .toggleBulletList()
                          .run()
                      }
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm"
                    >
                      List
                    </button>
                  </div>
                  <EditorContent
                    editor={editor}
                    className="prose prose-invert max-w-none p-4 text-foreground"
                  />
                </div>
              </div>

              <div className="bg-white/5 border-2 border-white/20 rounded-lg p-6">
                <label className="block text-sm font-semibold mb-3">Tags</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleAddTag()
                    }
                    className="flex-1 bg-white/5 border-2 border-white/30 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-accent focus:bg-white/10 transition-colors"
                    placeholder="Add a tag and press Enter"
                  />
                  <Button onClick={handleAddTag} className="bg-accent hover:bg-accent/90">
                    Add Tag
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <div
                      key={tag}
                      className="bg-accent/20 border border-accent/50 rounded-full px-3 py-1 flex items-center gap-2 text-sm"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-red-400"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border-2 border-white/20 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4">SEO Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Meta Title</label>
                    <input
                      type="text"
                      value={formData.metaTitle}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          metaTitle: e.target.value,
                        }))
                      }
                      maxLength={60}
                      className="w-full bg-white/5 border-2 border-white/30 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-accent focus:bg-white/10 transition-colors text-sm"
                      placeholder="SEO title (max 60 chars)"
                    />
                    <p className="text-xs text-foreground/50 mt-1">
                      {formData.metaTitle.length}/60
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Meta Description</label>
                    <textarea
                      value={formData.metaDescription}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          metaDescription: e.target.value,
                        }))
                      }
                      maxLength={160}
                      rows={2}
                      className="w-full bg-white/5 border-2 border-white/30 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-accent focus:bg-white/10 transition-colors text-sm"
                      placeholder="SEO description (max 160 chars)"
                    />
                    <p className="text-xs text-foreground/50 mt-1">
                      {formData.metaDescription.length}/160
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Meta Keywords</label>
                    <input
                      type="text"
                      value={formData.metaKeywords}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          metaKeywords: e.target.value,
                        }))
                      }
                      className="w-full bg-white/5 border-2 border-white/30 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-accent focus:bg-white/10 transition-colors text-sm"
                      placeholder="Comma-separated keywords"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border-2 border-white/20 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4">Publishing Options</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          status: e.target.value as any,
                        }))
                      }
                      className="w-full bg-white/5 border-2 border-white/30 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-accent focus:bg-white/10 transition-colors"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="scheduled">Scheduled</option>
                    </select>
                  </div>

                  {formData.status === "scheduled" && (
                    <div>
                      <label className="block text-sm font-semibold mb-2">Schedule For</label>
                      <input
                        type="datetime-local"
                        value={formData.scheduledFor || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            scheduledFor: e.target.value,
                          }))
                        }
                        className="w-full bg-white/5 border-2 border-white/30 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-accent focus:bg-white/10 transition-colors"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Category</label>
                      <input
                        type="text"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                        className="w-full bg-white/5 border-2 border-white/30 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-accent focus:bg-white/10 transition-colors"
                        placeholder="e.g., AI, Automation"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Read Time (minutes)</label>
                      <input
                        type="number"
                        value={formData.readTime}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            readTime: parseInt(e.target.value) || 0,
                          }))
                        }
                        className="w-full bg-white/5 border-2 border-white/30 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-accent focus:bg-white/10 transition-colors"
                        min="1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-lg p-8">
              <h1 className="text-4xl font-bold mb-4">{formData.title}</h1>
              <div className="flex gap-4 mb-6 text-foreground/70 text-sm">
                <span>{formData.category}</span>
                <span>•</span>
                <span>{formData.readTime} min read</span>
              </div>
              {formData.featuredImage && (
                <img
                  src={formData.featuredImage}
                  alt={formData.title}
                  className="w-full h-96 object-cover rounded-lg mb-8"
                />
              )}
              <div
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: formData.content }}
              />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
