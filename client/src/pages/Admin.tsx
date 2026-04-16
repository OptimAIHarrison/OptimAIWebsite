import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Plus, LogOut, Edit2, Trash2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  status: 'draft' | 'published' | 'scheduled';
  createdAt: string;
  publishedAt?: string;
}

export default function Admin() {
  const [, setLocation] = useLocation();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setLocation('/login');
    } else {
      setIsAuthenticated(true);
      // Load articles from localStorage
      const saved = localStorage.getItem('articles');
      if (saved) {
        setArticles(JSON.parse(saved));
      }
    }
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    toast.success('Logged out successfully');
    setLocation('/login');
  };

  const handleNewArticle = () => {
    setLocation('/admin/editor');
  };

  const handleEditArticle = (id: string) => {
    setLocation(`/admin/editor?id=${id}`);
  };

  const handleDeleteArticle = (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    
    const updated = articles.filter((a) => a.id !== id);
    setArticles(updated);
    localStorage.setItem('articles', JSON.stringify(updated));
    toast.success('Article deleted');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-500/20 text-green-600';
      case 'scheduled':
        return 'bg-blue-500/20 text-blue-600';
      case 'draft':
        return 'bg-yellow-500/20 text-yellow-600';
      default:
        return '';
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-white/10">
        <div className="container mx-auto px-4 max-w-6xl flex items-center justify-between h-20">
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-foreground/60 hover:text-foreground transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 max-w-6xl py-12">
        {/* Articles Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Articles</h2>
              <p className="text-foreground/60">Manage your resource articles and guides</p>
            </div>
            <Button
              onClick={handleNewArticle}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              <Plus className="w-5 h-5" />
              New Article
            </Button>
          </div>

          {/* Articles Table */}
          {articles.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-lg p-12 text-center">
              <p className="text-foreground/60 mb-4">No articles yet. Create your first one!</p>
              <Button
                onClick={handleNewArticle}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Create Article
              </Button>
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Created</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {articles.map((article) => (
                    <tr key={article.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-foreground">{article.title}</p>
                          <p className="text-sm text-foreground/60">{article.excerpt}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            article.status
                          )}`}
                        >
                          {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground/60">
                        {new Date(article.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditArticle(article.id)}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-foreground/60 hover:text-foreground"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <a
                            href={`/articles/${article.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-foreground/60 hover:text-foreground"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => handleDeleteArticle(article.id)}
                            className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-foreground/60 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
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
      </main>
    </div>
  );
}
