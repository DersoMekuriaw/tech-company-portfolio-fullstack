import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  TextInput} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  FadeInUp,
  FadeInRight,
  SlideInLeft,
  useSharedValue,
  useAnimatedStyle,
 
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedRef,
  
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

const projects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    category: 'Web Development',
    client: 'Fashion Retailer',
    description: 'Full-featured online store with advanced analytics and AI-powered recommendations.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    technologies: ['React', 'Node.js', 'MongoDB', 'Redis', 'AWS'],
    year: '2023',
    featured: true,
    revenue: '+45%',
    duration: '4 months',
    rating: 4.9
  },
  {
    id: 2,
    title: 'Fitness App',
    category: 'Mobile App',
    client: 'Health Startup',
    description: 'Personalized workout and nutrition tracking with real-time coaching.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    technologies: ['React Native', 'Firebase', 'Redux', 'TensorFlow'],
    year: '2023',
    duration: '3 months',
    downloads: '500K+',
    rating: 4.8
  },
  {
    id: 3,
    title: 'Banking Dashboard',
    category: 'Web Application',
    client: 'Financial Institution',
    description: 'Real-time financial data visualization with predictive analytics.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    technologies: ['Vue.js', 'Python', 'PostgreSQL', 'D3.js'],
    year: '2022',
    featured: true,
    security: '99.99%',
    duration: '6 months',
    rating: 4.9
  },
  {
    id: 4,
    title: 'Travel Platform',
    category: 'Mobile App',
    client: 'Travel Agency',
    description: 'Flight and hotel booking with AI recommendations and AR preview.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
    technologies: ['Flutter', 'GraphQL', 'AWS', 'ARCore'],
    year: '2022',
    bookings: '1M+',
    duration: '5 months',
    rating: 4.7
  },
  {
    id: 5,
    title: 'Learning Management System',
    category: 'Web Development',
    client: 'Education Company',
    description: 'Interactive online learning platform with VR classrooms.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
    technologies: ['Next.js', 'TypeScript', 'Redis', 'WebRTC'],
    year: '2021',
    users: '100K+',
    duration: '8 months',
    rating: 4.8
  },
  {
    id: 6,
    title: 'Healthcare Portal',
    category: 'Web Application',
    client: 'Hospital Network',
    description: 'Patient management and telemedicine platform with AI diagnostics.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800',
    technologies: ['Angular', 'Java', 'MySQL', 'ML Kit'],
    year: '2021',
    featured: true,
    efficiency: '+60%',
    duration: '7 months',
    rating: 4.9
  }
];

const categories = [
  { id: 'all', name: 'All', icon: 'grid' },
  { id: 'web', name: 'Web Development', icon: 'code' },
  { id: 'mobile', name: 'Mobile App', icon: 'smartphone' },
  { id: 'uiux', name: 'UI/UX Design', icon: 'palette' },
  { id: 'saas', name: 'SaaS Products', icon: 'cloud' },
  { id: 'ai', name: 'AI Solutions', icon: 'cpu' }
];

const stats = [
  { label: 'Projects', value: '50+', icon: 'rocket', color: '#6366f1' },
  { label: 'Happy Clients', value: '100+', icon: 'users', color: '#10b981' },
  { label: 'Years Experience', value: '5+', icon: 'award', color: '#f59e0b' },
  { label: 'Awards', value: '12', icon: 'trophy', color: '#ef4444' }
];

export default function PortfolioScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'featured' | 'recent'>('all');
  const scrollY = useSharedValue(0);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const [showSearch, setShowSearch] = useState(false);

  const filteredProjects = projects.filter(project => {
    if (selectedCategory !== 'all' && project.category !== selectedCategory) return false;
    if (searchQuery && !project.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (activeFilter === 'featured' && !project.featured) return false;
    if (activeFilter === 'recent' && project.year !== '2023') return false;
    return true;
  });

  const handleProjectPress = (projectId: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // router.push(`/portfolio/${projectId}` as any);
  };

  const handleCategorySelect = (categoryId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedCategory(categoryId);
  };

  const handleSearch = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    }
  });

  const headerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 100], [1, 0.8]),
      transform: [
        {
          translateY: interpolate(scrollY.value, [0, 100], [0, -20])
        }
      ]
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />
      
      {/* Floating Navigation */}
      <Animated.View style={[styles.floatingNav, headerStyle]}>
        <LinearGradient
          colors={['rgba(10,10,10,0.95)', 'rgba(26,26,26,0.95)']}
          style={styles.floatingNavGradient}
        >
          <TouchableOpacity style={styles.navLogo} onPress={() => scrollRef.current?.scrollTo({ y: 0, animated: true })}>
            <MaterialIcons name="diamond" size={24} color="#6366f1" />
            <Text style={styles.navLogoText}>Tech</Text>
          </TouchableOpacity>
          
          <View style={styles.navActions}>
            <TouchableOpacity 
              style={styles.searchButton}
              onPress={() => setShowSearch(!showSearch)}
            >
              <Feather name="search" size={20} color="#888" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton}>
              <Text style={styles.contactButtonText}>Contact</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Search Bar */}
      {showSearch && (
        <Animated.View 
          entering={FadeInUp.duration(300)}
          style={styles.searchContainer}
        >
          <View style={styles.searchBar}>
            <Feather name="search" size={20} color="#888" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search projects..."
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Feather name="x" size={20} color="#888" />
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      )}

      <Animated.ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <LinearGradient
            colors={['#0A0A0A', '#1A1A1A']}
            style={styles.heroGradient}
          >
            <Animated.View 
              style={styles.heroContent}
              entering={FadeInUp.duration(800)}
            >
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Premium Portfolio</Text>
                <View style={styles.badgeGlow} />
              </View>
              
              <Text style={styles.heroTitle}>
                Where <Text style={styles.gradientText}>Innovation</Text> Meets{' '}
                <Text style={styles.gradientText}>Excellence</Text>
              </Text>
              
              <Text style={styles.heroSubtitle}>
                We craft digital experiences that transform businesses and engage users. 
                Explore our portfolio of award-winning projects.
              </Text>
              
              <View style={styles.heroStats}>
                <View style={styles.statHeroItem}>
                  <MaterialIcons name="trending-up" size={24} color="#10b981" />
                  <Text style={styles.statHeroValue}>95%</Text>
                  <Text style={styles.statHeroLabel}>Client Satisfaction</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statHeroItem}>
                  <MaterialIcons name="bolt" size={24} color="#f59e0b" />
                  <Text style={styles.statHeroValue}>2.5x</Text>
                  <Text style={styles.statHeroLabel}>Growth Rate</Text>
                </View>
              </View>
            </Animated.View>
          </LinearGradient>
        </View>

        {/* Stats Grid */}
        <Animated.View 
          style={styles.statsGrid}
          entering={FadeInRight.delay(200).duration(600)}
        >
          {stats.map((stat, index) => (
            <Animated.View
              key={stat.label}
              entering={SlideInLeft.delay(300 + index * 100).duration(500)}
              style={styles.statCard}
            >
              <LinearGradient
                colors={['rgba(26,26,26,0.8)', 'rgba(10,10,10,0.8)']}
                style={styles.statGradient}
              >
                <View style={[styles.statIconContainer, { backgroundColor: `${stat.color}20` }]}>
                  <Feather name={stat.icon} size={24} color={stat.color} />
                </View>
                <Text style={styles.statCardValue}>{stat.value}</Text>
                <Text style={styles.statCardLabel}>{stat.label}</Text>
              </LinearGradient>
            </Animated.View>
          ))}
        </Animated.View>

        {/* Filter Section */}
        <Animated.View 
          style={styles.filterSection}
          entering={FadeInUp.delay(400).duration(600)}
        >
          <View style={styles.filterHeader}>
            <Text style={styles.sectionTitle}>Featured Work</Text>
            <View style={styles.filterTabs}>
              {(['all', 'featured', 'recent'] as const).map(filter => (
                <TouchableOpacity
                  key={filter}
                  style={[
                    styles.filterTab,
                    activeFilter === filter && styles.filterTabActive
                  ]}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setActiveFilter(filter);
                  }}
                >
                  <Text style={[
                    styles.filterTabText,
                    activeFilter === filter && styles.filterTabTextActive
                  ]}>
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Categories */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
            contentContainerStyle={styles.categoryContent}
          >
            {categories.map((category, index) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => handleCategorySelect(category.id)}
              >
                <Animated.View
                  entering={SlideInLeft.delay(500 + index * 50).duration(400)}
                  style={[
                    styles.categoryCard,
                    selectedCategory === category.id && styles.categoryCardActive
                  ]}
                >
                  <LinearGradient
                    colors={selectedCategory === category.id 
                      ? ['#6366f1', '#8b5cf6'] 
                      : ['#1A1A1A', '#262626']
                    }
                    style={styles.categoryGradient}
                  >
                    <Feather 
                      name={category.icon} 
                      size={20} 
                      color={selectedCategory === category.id ? 'white' : '#888'} 
                    />
                    <Text style={[
                      styles.categoryName,
                      selectedCategory === category.id && styles.categoryNameActive
                    ]}>
                      {category.name}
                    </Text>
                  </LinearGradient>
                </Animated.View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Projects Grid */}
        <View style={styles.projectsSection}>
          <View style={styles.projectsHeader}>
            <Text style={styles.sectionTitle}>
              {filteredProjects.length} Projects Found
            </Text>
            <TouchableOpacity style={styles.sortButton}>
              <Feather name="filter" size={18} color="#888" />
              <Text style={styles.sortButtonText}>Sort By</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.projectsGrid}>
            {filteredProjects.map((project, index) => (
              <Animated.View
                key={project.id}
                entering={FadeInUp.delay(600 + index * 100).duration(600)}
                style={styles.projectCardWrapper}
              >
                <TouchableOpacity
                  style={styles.projectCard}
                  onPress={() => handleProjectPress(project.id)}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={['#1A1A1A', '#262626']}
                    style={styles.projectGradient}
                  >
                    {/* Project Image with Gradient Overlay */}
                    <View style={styles.projectImageContainer}>
                      <Image
                        source={{ uri: project.image }}
                        style={styles.projectImage}
                        resizeMode="cover"
                      />
                      <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.8)']}
                        style={styles.imageOverlay}
                      />
                      
                      {/* Project Badges */}
                      <View style={styles.projectBadges}>
                        {project.featured && (
                          <View style={styles.featuredBadge}>
                            <Ionicons name="star" size={12} color="#FFD166" />
                            <Text style={styles.featuredBadgeText}>Featured</Text>
                          </View>
                        )}
                        <View style={styles.yearBadge}>
                          <Text style={styles.yearBadgeText}>{project.year}</Text>
                        </View>
                      </View>

                      {/* Project Metrics */}
                      <View style={styles.projectMetrics}>
                        <View style={styles.metricItem}>
                          <Ionicons name="time" size={14} color="#888" />
                          <Text style={styles.metricText}>{project.duration}</Text>
                        </View>
                        <View style={styles.metricItem}>
                          <Ionicons name="star" size={14} color="#f59e0b" />
                          <Text style={styles.metricText}>{project.rating}</Text>
                        </View>
                      </View>
                    </View>

                    {/* Project Content */}
                    <View style={styles.projectContent}>
                      <View style={styles.projectHeader}>
                        <View>
                          <Text style={styles.projectCategory}>{project.category}</Text>
                          <Text style={styles.projectTitle}>{project.title}</Text>
                        </View>
                        <TouchableOpacity style={styles.bookmarkButton}>
                          <Feather name="bookmark" size={20} color="#888" />
                        </TouchableOpacity>
                      </View>

                      <Text style={styles.projectDescription} numberOfLines={2}>
                        {project.description}
                      </Text>

                      <Text style={styles.projectClient}>
                        For: <Text style={styles.clientName}>{project.client}</Text>
                      </Text>

                      {/* Technology Tags */}
                      <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        style={styles.techScroll}
                      >
                        {project.technologies.map((tech, techIndex) => (
                          <LinearGradient
                            key={techIndex}
                            colors={['rgba(99, 102, 241, 0.1)', 'rgba(139, 92, 246, 0.1)']}
                            style={styles.techTag}
                          >
                            <Text style={styles.techTagText}>{tech}</Text>
                          </LinearGradient>
                        ))}
                      </ScrollView>

                      {/* Project Footer */}
                      <View style={styles.projectFooter}>
                        <TouchableOpacity 
                          style={styles.viewButton}
                          onPress={() => handleProjectPress(project.id)}
                        >
                          <Text style={styles.viewButtonText}>View Details</Text>
                          <Feather name="arrow-up-right" size={16} color="#6366f1" />
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.shareButton}>
                          <Feather name="share-2" size={16} color="#888" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* Testimonials Carousel */}
        <Animated.View
          style={styles.testimonialsSection}
          entering={FadeInUp.delay(800).duration(600)}
        >
          <View style={styles.testimonialsHeader}>
            <Text style={styles.sectionTitle}>Client Love</Text>
            <View style={styles.testimonialNav}>
              <TouchableOpacity style={styles.navButton}>
                <Feather name="chevron-left" size={24} color="#888" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButton}>
                <Feather name="chevron-right" size={24} color="#6366f1" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.testimonialsScroll}
            contentContainerStyle={styles.testimonialsContent}
          >
            {[
              {
                id: 1,
                name: 'Sarah Johnson',
                role: 'CEO, TechCorp',
                text: 'The team delivered beyond expectations. Our revenue increased by 300% after launch.',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200',
                rating: 5,
                project: 'E-commerce Platform'
              },
              {
                id: 2,
                name: 'Michael Chen',
                role: 'Founder, HealthStart',
                text: 'Professional approach and innovative solutions. The app has 500K+ downloads in 3 months.',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
                rating: 5,
                project: 'Fitness App'
              },
              {
                id: 3,
                name: 'Emma Wilson',
                role: 'Director, Global Bank',
                text: 'Transformed our banking experience completely. The dashboard is now used by 10K+ employees.',
                avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200',
                rating: 5,
                project: 'Banking Dashboard'
              }
            ].map((testimonial, index) => (
              <Animated.View
                key={testimonial.id}
                entering={SlideInLeft.delay(900 + index * 100).duration(500)}
                style={styles.testimonialCard}
              >
                <LinearGradient
                  colors={['#1A1A1A', '#262626']}
                  style={styles.testimonialGradient}
                >
                  {/* Quote Icon */}
                  <View style={styles.quoteIcon}>
                    <Feather name="quote" size={24} color="#6366f1" />
                  </View>

                  <Text style={styles.testimonialText}>
                    &quot;{testimonial.text}&quot;
                  </Text>

                  {/* Rating */}
                  <View style={styles.ratingContainer}>
                    {[...Array(5)].map((_, i) => (
                      <Ionicons key={i} name="star" size={16} color="#f59e0b" />
                    ))}
                  </View>

                  {/* Author */}
                  <View style={styles.testimonialAuthor}>
                    <Image
                      source={{ uri: testimonial.avatar }}
                      style={styles.authorAvatar}
                    />
                    <View style={styles.authorInfo}>
                      <Text style={styles.authorName}>{testimonial.name}</Text>
                      <Text style={styles.authorRole}>{testimonial.role}</Text>
                      <Text style={styles.authorProject}>{testimonial.project}</Text>
                    </View>
                  </View>
                </LinearGradient>
              </Animated.View>
            ))}
          </ScrollView>
        </Animated.View>

        {/* CTA Section */}
        <Animated.View
          style={styles.ctaSection}
          entering={FadeInUp.delay(1000).duration(600)}
        >
          <LinearGradient
            colors={['#6366f1', '#8b5cf6']}
            style={styles.ctaGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Floating Elements */}
            <View style={styles.ctaOrb1} />
            <View style={styles.ctaOrb2} />
            <View style={styles.ctaOrb3} />
            
            <View style={styles.ctaContent}>
              <Text style={styles.ctaTitle}>Ready to Start Your Project?</Text>
              <Text style={styles.ctaSubtitle}>
                Let s collaborate to create something amazing. Schedule a free consultation today.
              </Text>
              
              <View style={styles.ctaButtons}>
                <TouchableOpacity 
                  style={styles.primaryCtaButton}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    // router.push('/contact');
                  }}
                >
                  <Text style={styles.primaryCtaText}>Start Free Consultation</Text>
                  <Feather name="arrow-right" size={20} color="white" />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.secondaryCtaButton}>
                  <Text style={styles.secondaryCtaText}>View Case Studies</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.ctaStats}>
                <View style={styles.ctaStat}>
                  <Text style={styles.ctaStatValue}>24/7</Text>
                  <Text style={styles.ctaStatLabel}>Support</Text>
                </View>
                <View style={styles.ctaStat}>
                  <Text style={styles.ctaStatValue}>48h</Text>
                  <Text style={styles.ctaStatLabel}>Response Time</Text>
                </View>
                <View style={styles.ctaStat}>
                  <Text style={styles.ctaStatValue}>100%</Text>
                  <Text style={styles.ctaStatLabel}>Satisfaction</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Footer */}
        <View style={styles.footer}>
          <LinearGradient
            colors={['#0A0A0A', '#1A1A1A']}
            style={styles.footerGradient}
          >
            <View style={styles.footerContent}>
              <View style={styles.footerLogo}>
                <MaterialIcons name="diamond" size={32} color="#6366f1" />
                <Text style={styles.footerLogoText}>Tech solution plc</Text>
              </View>
              
              <Text style={styles.footerTagline}>
                Creating digital experiences that inspire and deliver results.
              </Text>
              
              <View style={styles.footerLinks}>
                <TouchableOpacity>
                  <Text style={styles.footerLink}>LinkedIn</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.footerLink}>Dribbble</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.footerLink}>Behance</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.footerLink}>GitHub</Text>
                </TouchableOpacity>
              </View>
              
              <Text style={styles.copyright}>
                © 2025 Tech solution plc. All rights reserved.
              </Text>
            </View>
          </LinearGradient>
        </View>
      </Animated.ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          // router.push('/contact');
        }}
      >
        <LinearGradient
          colors={['#6366f1', '#8b5cf6']}
          style={styles.fabGradient}
        >
          <Feather name="message-circle" size={24} color="white" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  scrollView: {
    flex: 1,
  },
  floatingNav: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  floatingNavGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(26,26,26,0.95)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  navLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navLogoText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  navActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#6366f1',
    borderRadius: 12,
  },
  contactButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  searchContainer: {
    position: 'absolute',
    top: 110,
    left: 20,
    right: 20,
    zIndex: 999,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26,26,26,0.95)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
  heroSection: {
    paddingTop: 120,
    paddingBottom: 40,
  },
  heroGradient: {
    paddingHorizontal: 20,
  },
  heroContent: {
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
    marginBottom: 24,
    position: 'relative',
  },
  badgeGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#6366f1',
    borderRadius: 20,
    opacity: 0.2,
  },
  badgeText: {
    color: '#6366f1',
    fontWeight: '600',
    fontSize: 14,
  },
  heroTitle: {
    fontSize: 46,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    lineHeight: 56,
    marginBottom: 16,
  },
  gradientText: {
    backgroundImage: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    backgroundColor: '#6366f1',
    backgroundClip: 'text',
    textFillColor: 'transparent',
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 20,
    borderRadius: 20,
    gap: 20,
  },
  statHeroItem: {
    alignItems: 'center',
    flex: 1,
  },
  statHeroValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8,
    marginBottom: 4,
  },
  statHeroLabel: {
    fontSize: 14,
    color: '#888',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 40,
    gap: 12,
  },
  statCard: {
    width: (width - 52) / 2,
    borderRadius: 20,
    overflow: 'hidden',
  },
  statGradient: {
    padding: 24,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  statCardValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  statCardLabel: {
    fontSize: 14,
    color: '#888',
  },
  filterSection: {
    marginBottom: 40,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  filterTabs: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 4,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  filterTabActive: {
    backgroundColor: '#6366f1',
  },
  filterTabText: {
    color: '#888',
    fontWeight: '600',
    fontSize: 14,
  },
  filterTabTextActive: {
    color: 'white',
  },
  categoryScroll: {
    paddingHorizontal: 20,
  },
  categoryContent: {
    gap: 12,
  },
  categoryCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  categoryCardActive: {
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  categoryGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  categoryName: {
    color: '#888',
    fontWeight: '600',
    fontSize: 14,
  },
  categoryNameActive: {
    color: 'white',
  },
  projectsSection: {
    paddingHorizontal: 20,
    marginBottom: 60,
  },
  projectsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
  },
  sortButtonText: {
    color: '#888',
    fontSize: 14,
  },
  projectsGrid: {
    gap: 20,
  },
  projectCardWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  projectCard: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  projectGradient: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  projectImageContainer: {
    height: 200,
    position: 'relative',
  },
  projectImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  projectBadges: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 209, 102, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  featuredBadgeText: {
    color: '#FFD166',
    fontSize: 12,
    fontWeight: '600',
  },
  yearBadge: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  yearBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  projectMetrics: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    flexDirection: 'row',
    gap: 12,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  metricText: {
    color: 'white',
    fontSize: 12,
  },
  projectContent: {
    padding: 24,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  projectCategory: {
    color: '#6366f1',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  projectTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  bookmarkButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectDescription: {
    color: '#888',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  projectClient: {
    color: '#666',
    fontSize: 14,
    marginBottom: 20,
  },
  clientName: {
    color: 'white',
    fontWeight: '600',
  },
  techScroll: {
    marginBottom: 20,
  },
  techTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  techTagText: {
    color: '#6366f1',
    fontSize: 12,
    fontWeight: '500',
  },
  projectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    flex: 1,
    marginRight: 12,
  },
  viewButtonText: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  shareButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  testimonialsSection: {
    paddingHorizontal: 20,
    marginBottom: 60,
  },
  testimonialsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  testimonialNav: {
    flexDirection: 'row',
    gap: 8,
  },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  testimonialsScroll: {
    paddingHorizontal: 0,
  },
  testimonialsContent: {
    gap: 16,
  },
  testimonialCard: {
    width: width - 40,
    borderRadius: 24,
    overflow: 'hidden',
  },
  testimonialGradient: {
    padding: 32,
  },
  quoteIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  testimonialText: {
    color: 'white',
    fontSize: 18,
    lineHeight: 28,
    fontStyle: 'italic',
    marginBottom: 24,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  testimonialAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  authorRole: {
    color: '#888',
    fontSize: 14,
    marginBottom: 4,
  },
  authorProject: {
    color: '#6366f1',
    fontSize: 12,
    fontWeight: '600',
  },
  ctaSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  ctaGradient: {
    borderRadius: 32,
    padding: 40,
    position: 'relative',
    overflow: 'hidden',
  },
  ctaOrb1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.1)',
    top: -100,
    right: -100,
  },
  ctaOrb2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.05)',
    bottom: -75,
    left: -75,
  },
  ctaOrb3: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.03)',
    top: 20,
    left: 20,
  },
  ctaContent: {
    position: 'relative',
    zIndex: 1,
  },
  ctaTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 40,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  ctaButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  primaryCtaButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: 'white',
    paddingVertical: 16,
    borderRadius: 16,
  },
  primaryCtaText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryCtaButton: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryCtaText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  ctaStats: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  ctaStat: {
    alignItems: 'center',
  },
  ctaStatValue: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ctaStatLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  footerGradient: {
    padding: 40,
  },
  footerContent: {
    alignItems: 'center',
  },
  footerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  footerLogoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  footerTagline: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 32,
  },
  footerLink: {
    color: '#888',
    fontSize: 14,
  },
  copyright: {
    color: '#666',
    fontSize: 12,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 1000,
  },
  fabGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
});