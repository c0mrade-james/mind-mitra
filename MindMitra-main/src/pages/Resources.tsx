import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Play, 
  FileText, 
  Headphones, 
  Download,
  Clock,
  Star,
  BookOpen,
  Heart,
  Brain,
  Shield
} from 'lucide-react';
import { resourceCategories } from '@/data/mockData';

const Resources: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const allResources = resourceCategories.flatMap(category => 
    category.resources.map(resource => ({
      ...resource,
      category: category.name,
      categoryId: category.id,
      categoryIcon: category.icon,
      categoryColor: category.color,
    }))
  );

  const filteredResources = allResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.categoryId === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Play;
      case 'audio': return Headphones;
      case 'guide': return FileText;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'text-red-500';
      case 'audio': return 'text-green-500';
      case 'guide': return 'text-blue-500';
      default: return 'text-gray-500';
    }
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
              <BookOpen className="w-6 h-6 text-primary" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Wellness Resource Hub
            </h1>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover evidence-based resources, guides, and content to support your mental health journey. 
            All resources are curated by mental health professionals.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Professionally Curated</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4" fill="currentColor" />
              <span>Evidence-Based</span>
            </div>
            <div className="flex items-center space-x-2">
              <Brain className="w-4 h-4" />
              <span>Accessible 24/7</span>
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
        {/* Search and Filters */}
        <motion.div variants={cardVariants} className="mb-8">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-primary" />
                <span>Find Resources</span>
              </CardTitle>
              <CardDescription>
                Search by topic, type, or browse by category
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                  >
                    <option value="all">All Categories</option>
                    {resourceCategories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                  >
                    <option value="all">All Types</option>
                    <option value="video">Videos</option>
                    <option value="audio">Audio</option>
                    <option value="guide">Guides</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="categories">By Category</TabsTrigger>
            <TabsTrigger value="popular">Most Popular</TabsTrigger>
            <TabsTrigger value="recent">Recently Added</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {/* Resource Grid */}
            <motion.div variants={cardVariants}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  All Resources ({filteredResources.length})
                </h2>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource, index) => {
                  const TypeIcon = getTypeIcon(resource.type);
                  return (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <Card className="hover-lift h-full border-border/50 hover:border-primary/30 transition-all duration-300">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-2">
                              <div className={`p-2 rounded-lg bg-${resource.categoryColor}/10 text-${resource.categoryColor}`}>
                                <TypeIcon className={`w-5 h-5 ${getTypeColor(resource.type)}`} />
                              </div>
                              <div>
                                <Badge variant="outline" className="text-xs">
                                  {resource.categoryIcon} {resource.category}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                              <span className="text-xs text-muted-foreground">4.8</span>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="space-y-3">
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">{resource.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {resource.description}
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{resource.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="capitalize">{resource.type}</span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button className="flex-1" size="sm">
                              <Play className="w-4 h-4 mr-2" />
                              Access
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            {/* Categories View */}
            <motion.div variants={cardVariants}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resourceCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="hover-lift h-full border-border/50 hover:border-primary/30 transition-all duration-300">
                      <CardHeader>
                        <div className={`w-16 h-16 rounded-2xl bg-${category.color}/10 text-${category.color} flex items-center justify-center text-2xl mb-4`}>
                          {category.icon}
                        </div>
                        <CardTitle>{category.name}</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="text-sm text-muted-foreground">
                            {category.resources.length} resources available
                          </div>
                          <Button 
                            className="w-full" 
                            variant={category.color as any}
                            onClick={() => setSelectedCategory(category.id)}
                          >
                            Explore {category.name}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="popular" className="space-y-6">
            <motion.div variants={cardVariants}>
              <h2 className="text-2xl font-bold text-foreground mb-6">Most Popular Resources</h2>
              <p className="text-muted-foreground mb-6">
                Resources with the highest engagement and positive feedback from our community.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.slice(0, 6).map((resource, index) => {
                  const TypeIcon = getTypeIcon(resource.type);
                  return (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <Card className="hover-lift h-full border-border/50 hover:border-primary/30 transition-all duration-300">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="text-xs">
                              #{index + 1} Popular
                            </Badge>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                              <span className="text-xs font-medium">4.{9 - index}</span>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <TypeIcon className={`w-4 h-4 ${getTypeColor(resource.type)}`} />
                            <h3 className="font-semibold text-foreground">{resource.title}</h3>
                          </div>
                          
                          <p className="text-sm text-muted-foreground">
                            {resource.description}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{resource.duration}</span>
                            <span className="capitalize">{resource.type}</span>
                          </div>
                          
                          <Button className="w-full" size="sm">
                            <Play className="w-4 h-4 mr-2" />
                            Access Resource
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <motion.div variants={cardVariants}>
              <h2 className="text-2xl font-bold text-foreground mb-6">Recently Added</h2>
              <p className="text-muted-foreground mb-6">
                Fresh content added in the last 30 days to support your mental wellness journey.
              </p>
              
              <div className="space-y-4">
                {filteredResources.slice(0, 5).map((resource, index) => {
                  const TypeIcon = getTypeIcon(resource.type);
                  return (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="hover-lift border-border/50 hover:border-primary/30 transition-all duration-300">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <div className={`p-3 rounded-lg bg-${resource.categoryColor}/10 text-${resource.categoryColor}`}>
                              <TypeIcon className={`w-6 h-6 ${getTypeColor(resource.type)}`} />
                            </div>
                            
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground">{resource.title}</h3>
                              <p className="text-sm text-muted-foreground">{resource.description}</p>
                              <div className="flex items-center space-x-3 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {resource.categoryIcon} {resource.category}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{resource.duration}</span>
                                <Badge variant="secondary" className="text-xs">New</Badge>
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button size="sm">
                                <Play className="w-4 h-4 mr-2" />
                                Access
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Resources;