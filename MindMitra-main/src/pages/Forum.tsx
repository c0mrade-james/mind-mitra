import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Search, 
  TrendingUp, 
  MessageCircle, 
  ThumbsUp, 
  ThumbsDown,
  Flag,
  Clock,
  Users,
  Shield,
  Heart,
  Filter
} from 'lucide-react';
import { forumPosts } from '@/data/mockData';

const Forum: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [posts, setPosts] = useState(forumPosts);
  
  const { toast } = useToast();

  const categories = [
    { id: 'all', name: 'All Posts', icon: '📋' },
    { id: 'anxiety', name: 'Anxiety Support', icon: '🫂' },
    { id: 'depression', name: 'Depression', icon: '💙' },
    { id: 'academic', name: 'Academic Stress', icon: '📚' },
    { id: 'social', name: 'Social Issues', icon: '👥' },
    { id: 'wellness', name: 'General Wellness', icon: '🌱' },
    { id: 'crisis', name: 'Crisis Support', icon: '🆘' },
  ];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || 
                           post.category.toLowerCase().includes(selectedCategory) ||
                           post.tags.some(tag => tag.includes(selectedCategory));
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.upvotes - a.upvotes;
      case 'replies':
        return b.replies - a.replies;
      case 'recent':
      default:
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
  });

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim() || !newPostCategory) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to create your post.",
        variant: "destructive",
      });
      return;
    }

    const newPost = {
      id: posts.length + 1,
      title: newPostTitle,
      content: newPostContent,
      author: 'Anonymous Student',
      timestamp: 'Just now',
      replies: 0,
      upvotes: 0,
      tags: [newPostCategory.toLowerCase()],
      category: newPostCategory,
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostCategory('');
    setIsDialogOpen(false);

    toast({
      title: "Post Created Successfully!",
      description: "Your anonymous post has been shared with the community.",
    });
  };

  const handleVote = (postId: number, type: 'up' | 'down') => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, upvotes: type === 'up' ? post.upvotes + 1 : Math.max(0, post.upvotes - 1) }
          : post
      )
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 calm-gradient">
        <motion.div
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <motion.div
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Users className="w-6 h-6 text-primary" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Peer Support Forum
            </h1>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Connect with fellow students in a safe, anonymous, and moderated environment. 
            Share your experiences and find support from those who understand.
          </p>

          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Fully Anonymous</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4" fill="currentColor" />
              <span>Peer Moderated</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Safe Space</span>
            </div>
          </div>
        </motion.div>
      </section>

      <motion.div
        className="container mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl mx-auto">
          
          {/* Controls */}
          <motion.div variants={cardVariants} className="mb-8">
            <Card className="shadow-soft">
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageCircle className="w-5 h-5 text-primary" />
                      <span>Community Discussions</span>
                    </CardTitle>
                    <CardDescription>
                      Join conversations and share support with your peers
                    </CardDescription>
                  </div>
                  
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex items-center space-x-2">
                        <Plus className="w-4 h-4" />
                        <span>Create Post</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Create Anonymous Post</DialogTitle>
                        <DialogDescription>
                          Share your thoughts or ask for support from the community
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Category</label>
                          <select
                            value={newPostCategory}
                            onChange={(e) => setNewPostCategory(e.target.value)}
                            className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                          >
                            <option value="">Select a category</option>
                            {categories.slice(1).map(category => (
                              <option key={category.id} value={category.name}>
                                {category.icon} {category.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-2 block">Title</label>
                          <Input
                            placeholder="What's on your mind?"
                            value={newPostTitle}
                            onChange={(e) => setNewPostTitle(e.target.value)}
                            maxLength={100}
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-2 block">Content</label>
                          <Textarea
                            placeholder="Share your thoughts, experiences, or ask for support..."
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                            rows={4}
                            maxLength={500}
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            {newPostContent.length}/500 characters
                          </p>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            onClick={handleCreatePost}
                            className="flex-1"
                          >
                            Post Anonymously
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => setIsDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                    >
                      <option value="recent">Most Recent</option>
                      <option value="popular">Most Popular</option>
                      <option value="replies">Most Replies</option>
                    </select>
                    
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <Tabs defaultValue="posts" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="posts">All Posts</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="my-posts">My Posts</TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                
                {/* Category Sidebar */}
                <motion.div variants={cardVariants}>
                  <Card className="shadow-soft">
                    <CardHeader>
                      <CardTitle className="text-lg">Categories</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {categories.map((category) => (
                        <Button
                          key={category.id}
                          variant={selectedCategory === category.id ? "default" : "ghost"}
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => setSelectedCategory(category.id)}
                        >
                          <span className="mr-2">{category.icon}</span>
                          {category.name}
                        </Button>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Posts List */}
                <div className="lg:col-span-3 space-y-4">
                  {sortedPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="hover-lift border-border/50 hover:border-primary/30 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground mb-2">{post.title}</h3>
                              <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                                {post.content}
                              </p>
                              
                              <div className="flex flex-wrap gap-2 mb-3">
                                {post.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{post.author}</span>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{post.timestamp}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleVote(post.id, 'up')}
                                  className="h-8 px-2"
                                >
                                  <ThumbsUp className="w-3 h-3 mr-1" />
                                  {post.upvotes}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleVote(post.id, 'down')}
                                  className="h-8 px-2"
                                >
                                  <ThumbsDown className="w-3 h-3" />
                                </Button>
                              </div>
                              
                              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                <MessageCircle className="w-3 h-3" />
                                <span>{post.replies}</span>
                              </div>
                              
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <Flag className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                  
                  {sortedPosts.length === 0 && (
                    <motion.div
                      variants={cardVariants}
                      className="text-center py-12"
                    >
                      <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">No posts found</h3>
                      <p className="text-muted-foreground mb-4">
                        No posts match your current filters. Try adjusting your search or category.
                      </p>
                      <Button onClick={() => setIsDialogOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Create the first post
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="categories" className="space-y-6">
              <motion.div variants={cardVariants}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.slice(1).map((category, index) => (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="hover-lift h-full border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer"
                            onClick={() => {
                              setSelectedCategory(category.id);
                              // Switch to posts tab
                            }}>
                        <CardHeader>
                          <div className="text-3xl mb-2">{category.icon}</div>
                          <CardTitle>{category.name}</CardTitle>
                          <CardDescription>
                            Find support and share experiences with others facing similar challenges.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{filteredPosts.filter(p => p.category.toLowerCase().includes(category.id) || p.tags.some(t => t.includes(category.id))).length} posts</span>
                            <TrendingUp className="w-4 h-4" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="trending" className="space-y-6">
              <motion.div variants={cardVariants}>
                <h2 className="text-2xl font-bold text-foreground mb-6">Trending Discussions</h2>
                <div className="space-y-4">
                  {sortedPosts.slice(0, 5).map((post, index) => (
                    <Card key={post.id} className="hover-lift border-border/50 hover:border-primary/30 transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl font-bold text-primary">#{index + 1}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">{post.title}</h3>
                            <p className="text-sm text-muted-foreground">{post.content.substring(0, 100)}...</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                              <span>{post.upvotes} upvotes</span>
                              <span>{post.replies} replies</span>
                              <span>{post.timestamp}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="my-posts" className="space-y-6">
              <motion.div variants={cardVariants}>
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>Your Anonymous Posts</CardTitle>
                    <CardDescription>
                      Posts you've created are tracked locally for your reference
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center py-12">
                    <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No posts yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Your posts will appear here once you start participating in the community.
                    </p>
                    <Button onClick={() => setIsDialogOpen(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Create your first post
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
};

export default Forum;