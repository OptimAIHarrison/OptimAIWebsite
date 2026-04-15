import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye, EyeOff, Clock } from "lucide-react";
import { useLocation } from "wouter";
import toast from "react-hot-toast";

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  status: "draft" | "published" | "scheduled";
  category: string;
  tags: string[];
  createdAt: Date;
  publishedAt?: Date;
  scheduledFor?: Date;
}

export default function AdminArticles() {
  const [, setLocation] = useLocation();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "draft" | "published" | "scheduled">("all");

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      // TODO: Call tRPC to fetch articles
      // const result = await trpc.articles.getArticles.query();
      // setArticles(result);
      setArticles([]);
    } catch (error) {
      toast.error("Failed to load articles");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    try {
      // TODO: Call tRPC to delete article
      // await trpc.articles.deleteArticle.mutate({ id });
      setArticles((prev) => prev.filter((a) => a.id !== id));
      toast.success("Article deleted");
    } catch (error) {
      toast.error("Failed to delete article");
      console.error(error);
    }
  };

  const filteredArticles = articles.filter((a) => {
    if (filter === "all") return true;
    return a.status === filter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500/20 text-green-400 border border-green-500/50";
      case "scheduled":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/50";
      case "draft":
        return "bg-gray-500/20 text-gray-400 border border-gray-500/50";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 pt-40 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Articles</h1>
              <p className="text-foreground/70">Manage your blog articles and content</p>
            </div>
            <Button
              onClick={() => setLocation("/admin/article-editor")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center gap-2"
            >
              <Plus size={20} />
              New Article
            </Button>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-6">
            {(["all", "draft", "published", "scheduled"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === f
                    ? "bg-accent text-white"
                    : "bg-white/5 text-foreground/70 hover:bg-white/10"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Articles Table */}
          <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-foreground/70">Loading articles...</div>
            ) : filteredArticles.length === 0 ? (
              <div className="p-8 text-center text-foreground/70">
                No articles found. <br />
                <button
                  onClick={() => setLocation("/admin/article-editor")}
                  className="text-accent hover:underline mt-2"
                >
                  Create your first article
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-white/10 bg-white/5">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Created</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredArticles.map((article) => (
                      <tr
                        key={article.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-foreground">{article.title}</p>
                            <p className="text-sm text-foreground/50">{article.slug}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-foreground/70">{article.category}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(article.status)}`}>
                            {article.status === "scheduled" && <Clock size={12} className="inline mr-1" />}
                            {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground/70">
                          {new Date(article.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setLocation(`/admin/article-editor?id=${article.id}`)}
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit size={18} className="text-accent" />
                            </button>
                            <a
                              href={`/articles/${article.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                              title="View"
                            >
                              <Eye size={18} className="text-foreground/70" />
                            </a>
                            <button
                              onClick={() => handleDelete(article.id)}
                              className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={18} className="text-red-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <p className="text-foreground/70 text-sm mb-2">Total Articles</p>
              <p className="text-3xl font-bold">{articles.length}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <p className="text-foreground/70 text-sm mb-2">Published</p>
              <p className="text-3xl font-bold text-green-400">
                {articles.filter((a) => a.status === "published").length}
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <p className="text-foreground/70 text-sm mb-2">Drafts</p>
              <p className="text-3xl font-bold text-gray-400">
                {articles.filter((a) => a.status === "draft").length}
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <p className="text-foreground/70 text-sm mb-2">Scheduled</p>
              <p className="text-3xl font-bold text-blue-400">
                {articles.filter((a) => a.status === "scheduled").length}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
