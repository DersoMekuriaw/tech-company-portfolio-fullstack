import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated as RNAnimated,
  Easing,
  Modal,
  TextInput,
  StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withDelay,
  withSequence,
  withRepeat,
  interpolate,
  Extrapolate,
  useAnimatedScrollHandler,
  useAnimatedRef,

} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width,  } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const scrollY = useSharedValue(0);
  const parallaxY = useSharedValue(0);
  const pulseAnim = useRef(new RNAnimated.Value(1)).current;
  const fadeIn = useRef(new RNAnimated.Value(0)).current;
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [, setUserName] = useState('Guest');
  // eslint-disable-next-line no-empty-pattern
  const [] = useState(3);
  const [, setGreeting] = useState('Good Morning');

  // Animation values
  const headerOpacity = useSharedValue(0);
  const heroTitleX = useSharedValue(-100);
  const heroSubtitleX = useSharedValue(100);
  const floatingOrb = useSharedValue(0);
  const statsScale = useSharedValue(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const servicesOpacity = Array(7).fill(0).map(() => useSharedValue(0));
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const servicesTranslateY = Array(7).fill(0).map(() => useSharedValue(50));
  const featuredScale = useSharedValue(0.9);
  const featuredOpacity = useSharedValue(0);
  const testimonialsTranslateX = useSharedValue(width);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const services = [
    { 
      id: '1', 
      title: 'Network Installation', 
      icon: 'wifi', 
      color: '#4F46E5',
      gradient: ['#4F46E5', '#7C3AED'],
      description: 'Secure & scalable network solutions',
      features: ['Security', 'Scalability', '24/7 Support'],
      projects: 45
    },
    { 
      id: '2', 
      title: 'Website Development', 
      icon: 'code-slash', 
      color: '#10B981',
      gradient: ['#10B981', '#34D399'],
      description: 'Modern responsive websites',
      features: ['React', 'Next.js', 'TypeScript'],
      projects: 89
    },
    { 
      id: '3', 
      title: 'Company Branding', 
      icon: 'color-palette', 
      color: '#F59E0B',
      gradient: ['#F59E0B', '#FBBF24'],
      description: 'Complete brand identity',
      features: ['Logo Design', 'Brand Guide', 'Marketing'],
      projects: 67
    },
    { 
      id: '4', 
      title: 'E-commerce', 
      icon: 'cart', 
      color: '#EF4444',
      gradient: ['#EF4444', '#F87171'],
      description: 'Online store solutions',
      features: ['Payment Gateway', 'Inventory', 'Analytics'],
      projects: 52
    },
    { 
      id: '5', 
      title: 'App Development', 
      icon: 'phone-portrait', 
      color: '#8B5CF6',
      gradient: ['#8B5CF6', '#A78BFA'],
      description: 'Native & cross-platform apps',
      features: ['React Native', 'Flutter', 'iOS/Android'],
      projects: 78
    },
    { 
      id: '6', 
      title: 'Graphics Design', 
      icon: 'brush', 
      color: '#EC4899',
      gradient: ['#EC4899', '#F472B6'],
      description: 'Visual design services',
      features: ['UI/UX', 'Illustration', 'Animation'],
      projects: 93
    },
    { 
      id: '7', 
      title: 'Software Development', 
      icon: 'laptop', 
      color: '#06B6D4',
      gradient: ['#06B6D4', '#0EA5E9'],
      description: 'Custom software solutions',
      features: ['Enterprise', 'Cloud', 'API'],
      projects: 34
    },
  ];

  const featuredProjects = [
    { 
      id: '1', 
      title: 'E-commerce Platform', 
      category: 'Web Development', 
      company: 'FashionHub',
      progress: 95,
      color: '#4F46E5',
      revenue: '+$2.5M',
      team: ['👨‍💻', '👩‍🎨', '👨‍💼'],
      timeline: '4 months'
    },
    { 
      id: '2', 
      title: 'Mobile Banking App', 
      category: 'App Development', 
      company: 'FinTech Solutions',
      progress: 87,
      color: '#10B981',
      downloads: '500K+',
      team: ['👨‍💻', '👩‍💻', '👨‍🔬'],
      timeline: '6 months'
    },
    { 
      id: '3', 
      title: 'Corporate Branding', 
      category: 'Branding', 
      company: 'Global Corp',
      progress: 92,
      color: '#F59E0B',
      impact: '+40% Growth',
      team: ['👩‍🎨', '👨‍🎤', '👩‍💼'],
      timeline: '3 months'
    },
  ];

  const testimonials = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'CEO, TechStart',
      text: 'Exceptional service! Their team transformed our digital presence completely.',
      rating: 5,
      avatar: '👩‍💼',
      companyLogo: '🏢',
      revenue: '+300%'
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'CTO, InnovateCo',
      text: 'Professional and reliable. Delivered beyond expectations. The app has 500K+ downloads.',
      rating: 5,
      avatar: '👨‍💻',
      companyLogo: '💻',
      impact: '4.9★ Rating'
    },
    {
      id: '3',
      name: 'Emma Wilson',
      role: 'Marketing Director',
      text: 'Outstanding creativity and technical expertise. Our brand recognition increased by 150%.',
      rating: 5,
      avatar: '👩‍🎓',
      companyLogo: '🎯',
      growth: '+150%'
    },
  ];

  const quickStats = [
    { label: 'Active Projects', value: '24', color: '#4F46E5', icon: 'rocket' },
    { label: 'Team Members', value: '48', color: '#10B981', icon: 'users' },
    { label: 'Client Satisfaction', value: '98%', color: '#F59E0B', icon: 'heart' },
    { label: 'On-time Delivery', value: '96%', color: '#8B5CF6', icon: 'clock' },
  ];

  const techStack = [
    { name: 'React', icon: '⚛️', color: '#61DAFB' },
    { name: 'Node.js', icon: '🟢', color: '#339933' },
    { name: 'AWS', icon: '☁️', color: '#FF9900' },
    { name: 'Figma', icon: '🎨', color: '#F24E1E' },
    { name: 'Python', icon: '🐍', color: '#3776AB' },
    { name: 'Docker', icon: '🐳', color: '#2496ED' },
  ];

  useEffect(() => {
    // Initialize animations
    const initAnimations = async () => {
      // Load user data
      const user = await AsyncStorage.getItem('userName');
      if (user) setUserName(user);

      // Set greeting based on time
      const hour = new Date().getHours();
      if (hour < 12) setGreeting('Good Morning');
      else if (hour < 18) setGreeting('Good Afternoon');
      else setGreeting('Good Evening');

      // Hero animations
      RNAnimated.timing(fadeIn, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      RNAnimated.loop(
        RNAnimated.sequence([
          RNAnimated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          RNAnimated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Reanimated animations
      heroTitleX.value = withDelay(200, withSpring(0, { damping: 15 }));
      heroSubtitleX.value = withDelay(400, withSpring(0, { damping: 15 }));
      
      floatingOrb.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 2000 }),
          withTiming(0, { duration: 2000 })
        ),
        -1,
        true
      );

      statsScale.value = withDelay(800, withSpring(1, { damping: 15 }));
      
      // Services animations
      services.forEach((_, index) => {
        servicesOpacity[index].value = withDelay(600 + index * 100, withTiming(1, { duration: 500 }));
        servicesTranslateY[index].value = withDelay(600 + index * 100, withSpring(0, { damping: 15 }));
      });

      // Featured projects animation
      featuredScale.value = withDelay(1000, withSpring(1, { damping: 15 }));
      featuredOpacity.value = withDelay(1000, withTiming(1, { duration: 600 }));

      // Testimonials animation
      testimonialsTranslateX.value = withDelay(1200, withSpring(0, { damping: 15 }));
    };

    initAnimations();
  }, [fadeIn, featuredOpacity, featuredScale, floatingOrb, heroSubtitleX, heroTitleX, pulseAnim, services, servicesOpacity, servicesTranslateY, statsScale, testimonialsTranslateX]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
      parallaxY.value = event.contentOffset.y * 0.5;
      headerOpacity.value = interpolate(
        event.contentOffset.y,
        [0, 100],
        [0, 1],
        Extrapolate.CLAMP
      );
    },
  });

  const handleServicePress = (index: number, service: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    servicesTranslateY[index].value = withSequence(
      withSpring(-10, { damping: 15 }),
      withSpring(0, { damping: 15 })
    );
    
    setTimeout(() => {
      // router.push(`/service/${service.id}`);
    }, 200);
  };

  const handleProjectPress = (project: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // router.push(`/project/${project.id}`);
  };



  const handleQuickAction = (action: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // switch (action) {
    //   case 'quote':
    //     // router.push('/quote');
    //     break;
    //   case 'contact':
    //     router.push('/contact');
    //     break;
    //   case 'portfolio':
    //     router.push('/portfolio');
    //     break;
    //   case 'services':
    //     router.push('/services');
    //     break;
    // }
  };

  const animatedStyles = {
    header: useAnimatedStyle(() => ({
      opacity: headerOpacity.value,
      transform: [{ translateY: interpolate(headerOpacity.value, [0, 1], [-60, 0]) }],
    })),
    heroTitle: useAnimatedStyle(() => ({
      transform: [{ translateX: heroTitleX.value }],
    })),
    heroSubtitle: useAnimatedStyle(() => ({
      transform: [{ translateX: heroSubtitleX.value }],
    })),
    floatingOrb: useAnimatedStyle(() => ({
      transform: [
        { translateY: interpolate(floatingOrb.value, [0, 1], [0, -20]) },
        { scale: interpolate(floatingOrb.value, [0, 1], [1, 1.2]) }
      ],
      opacity: interpolate(floatingOrb.value, [0, 1], [0.8, 1]),
    })),
    stats: useAnimatedStyle(() => ({
      transform: [{ scale: statsScale.value }],
      opacity: statsScale.value,
    })),
    // eslint-disable-next-line react-hooks/rules-of-hooks
    servicesCard: (index: number) => useAnimatedStyle(() => ({
      opacity: servicesOpacity[index].value,
      transform: [{ translateY: servicesTranslateY[index].value }],
    })),
    featured: useAnimatedStyle(() => ({
      transform: [{ scale: featuredScale.value }],
      opacity: featuredOpacity.value,
    })),
    testimonials: useAnimatedStyle(() => ({
      transform: [{ translateX: testimonialsTranslateX.value }],
    })),
    parallaxBackground: useAnimatedStyle(() => ({
      transform: [{ translateY: interpolate(scrollY.value, [0, 500], [0, -100]) }],
    })),
  };

  const RenderRating = ({ rating }: { rating: number }) => {
    return (
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= rating ? 'star' : 'star-outline'}
            size={16}
            color="#F59E0B"
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      
      {/* Animated Header
      <Animated.View style={[styles.header, animatedStyles.header]}>
        <BlurView intensity={80} tint="dark" style={styles.headerBlur}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <TouchableOpacity style={styles.menuButton}>
                <Feather name="menu" size={24} color="white" />
              </TouchableOpacity>
              <View>
                <Text style={styles.greetingText}>{greeting}</Text>
                <Text style={styles.userName}>{userName}</Text>
              </View>
            </View>
            
            <View style={styles.headerRight}>
              <TouchableOpacity 
                style={styles.headerIconButton}
                onPress={handleSearch}
              >
                <Feather name="search" size={20} color="white" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.headerIconButton}
                onPress={handleNotificationPress}
              >
                <Feather name="bell" size={20} color="white" />
                {notificationCount > 0 && (
                  <View style={styles.notificationBadge}>
                    <Text style={styles.notificationBadgeText}>{notificationCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </Animated.View> */}

      <Animated.ScrollView 
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          {/* Animated Background */}
          <Animated.View style={[styles.heroBackground, animatedStyles.parallaxBackground]}>
            <LinearGradient
              colors={['#0F172A', '#1E293B', '#334155']}
              style={styles.heroBackgroundGradient}
            >
              {/* Animated Particles */}
              {[...Array(20)].map((_, i) => (
                <Animated.View
                  key={i}
                  style={[
                    styles.particle,
                    {
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      opacity: 0.3 + Math.random() * 0.7,
                    },
                  ]}
                />
              ))}
            </LinearGradient>
          </Animated.View>

          {/* Main Hero Content */}
          <LinearGradient
            colors={['rgba(79, 70, 229, 0.95)', 'rgba(124, 58, 237, 0.85)', 'rgba(139, 92, 246, 0.75)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            {/* Floating Elements */}
            <Animated.View style={[styles.floatingOrb, animatedStyles.floatingOrb]}>
              <LinearGradient
                colors={['#4F46E5', '#7C3AED']}
                style={styles.floatingOrbGradient}
              >
                <MaterialIcons name="rocket-launch" size={32} color="white" />
              </LinearGradient>
            </Animated.View>

            <View style={styles.heroContent}>
              <Animated.View style={[styles.heroTextContainer, animatedStyles.heroTitle]}>
                <Text style={styles.companyName}>Tech solution plc</Text>
              </Animated.View>
              
              <Animated.View style={[styles.heroTextContainer, animatedStyles.heroSubtitle]}>
                <Text style={styles.tagline}>Digital Transformation Experts</Text>
              </Animated.View>
              
              <Animatable.Text 
                animation="fadeIn" 
                duration={800}
                delay={600}
                style={styles.heroDescription}
              >
                We craft innovative digital solutions that drive growth, enhance efficiency, and transform businesses for the future.
              </Animatable.Text>

              {/* Quick Stats */}
              <Animated.View style={[styles.quickStats, animatedStyles.stats]}>
                {quickStats.map((stat, index) => (
                  <View key={index} style={styles.quickStatItem}>
                    <View style={[styles.quickStatIcon, { backgroundColor: `${stat.color}20` }]}>
                      <Feather name={stat.icon} size={16} color={stat.color} />
                    </View>
                    <Text style={styles.quickStatValue}>{stat.value}</Text>
                    <Text style={styles.quickStatLabel}>{stat.label}</Text>
                  </View>
                ))}
              </Animated.View>

              {/* CTA Buttons */}
              <View style={styles.ctaContainer}>
                {/* <TouchableOpacity 
                  style={styles.primaryCta}
                  onPress={() => handleQuickAction('quote')}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={['#FFFFFF', '#F1F5F9']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.ctaGradient}
                  >
                    <Feather name="message-circle" size={20} color="#4F46E5" />
                    <Text style={styles.primaryCtaText}>Get Free Quote</Text>
                  </LinearGradient>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.secondaryCta}
                  onPress={() => handleQuickAction('portfolio')}
                  activeOpacity={0.9}
                >
                  <Feather name="eye" size={20} color="white" />
                  <Text style={styles.secondaryCtaText}>View Work</Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Services Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <LinearGradient
                colors={['#4F46E5', '#7C3AED']}
                style={styles.sectionIcon}
              >
                <Feather name="layers" size={24} color="white" />
              </LinearGradient>
              <View>
                <Text style={styles.sectionTitle}>Our Services</Text>
                <Text style={styles.sectionSubtitle}>
                  Comprehensive solutions for your digital needs
                </Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.seeAllButton}
              onPress={() => handleQuickAction('services')}
            >
              <Text style={styles.seeAllText}>Explore All</Text>
              <Feather name="arrow-right" size={18} color="#4F46E5" />
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.servicesScroll}
            contentContainerStyle={styles.servicesContent}
          >
            {services.map((service, index) => (
              <Animated.View
                key={service.id}
                style={[styles.serviceCardContainer, animatedStyles.servicesCard(index)]}
              >
                <TouchableOpacity
                  style={styles.serviceCard}
                  onPress={() => handleServicePress(index, service)}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={service.gradient}
                    style={styles.serviceCardGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <View style={styles.serviceCardContent}>
                      <View style={styles.serviceCardHeader}>
                        <LinearGradient
                          colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                          style={styles.serviceIconContainer}
                        >
                          <Ionicons name={service.icon as any} size={28} color="white" />
                        </LinearGradient>
                        
                        <View style={styles.serviceProjectsBadge}>
                          <Text style={styles.serviceProjectsText}>{service.projects} Projects</Text>
                        </View>
                      </View>
                      
                      <Text style={styles.serviceTitle}>{service.title}</Text>
                      <Text style={styles.serviceDescription}>{service.description}</Text>
                      
                      <View style={styles.serviceFeatures}>
                        {service.features.map((feature, idx) => (
                          <View key={idx} style={styles.serviceFeatureChip}>
                            <Text style={styles.serviceFeatureText}>{feature}</Text>
                          </View>
                        ))}
                      </View>
                      
                      <View style={styles.serviceFooter}>
                        <Text style={styles.serviceLearn}>Learn More</Text>
                        <Feather name="arrow-up-right" size={18} color="white" />
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        {/* Featured Projects */}
        <Animated.View style={[styles.featuredSection, animatedStyles.featured]}>
          <LinearGradient
            colors={['#1E293B', '#0F172A']}
            style={styles.featuredGradient}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <LinearGradient
                  colors={['#10B981', '#34D399']}
                  style={styles.sectionIcon}
                >
                  <Feather name="award" size={24} color="white" />
                </LinearGradient>
                <View>
                  <Text style={styles.sectionTitle}>Featured Projects</Text>
                  <Text style={styles.sectionSubtitle}>
                    Our latest and most impactful work
                  </Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.seeAllButton}
                onPress={() => handleQuickAction('portfolio')}
              >
                <Text style={styles.seeAllText}>View All</Text>
                <Feather name="arrow-right" size={18} color="#10B981" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.projectsGrid}>
              {featuredProjects.map((project) => (
                <TouchableOpacity
                  key={project.id}
                  style={styles.projectCard}
                  onPress={() => handleProjectPress(project)}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={[`${project.color}20`, `${project.color}10`]}
                    style={styles.projectCardGradient}
                  >
                    <View style={styles.projectHeader}>
                      <View style={[styles.projectIcon, { backgroundColor: `${project.color}20` }]}>
                        <Feather name="check-circle" size={24} color={project.color} />
                      </View>
                      <View style={styles.projectInfo}>
                        <Text style={styles.projectTitle}>{project.title}</Text>
                        <Text style={styles.projectCompany}>{project.company}</Text>
                      </View>
                      <View style={styles.projectTeam}>
                        {project.team.map((member, idx) => (
                          <Text key={idx} style={styles.teamMember}>{member}</Text>
                        ))}
                      </View>
                    </View>
                    
                    <Text style={styles.projectCategory}>{project.category}</Text>
                    
                    <View style={styles.projectMetrics}>
                      <View style={styles.metricItem}>
                        <Feather name="trending-up" size={14} color={project.color} />
                        <Text style={styles.metricText}>
                          {project.revenue || project.downloads || project.impact}
                        </Text>
                      </View>
                      <View style={styles.metricItem}>
                        <Feather name="clock" size={14} color={project.color} />
                        <Text style={styles.metricText}>{project.timeline}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.progressContainer}>
                      <View style={styles.progressBar}>
                        <LinearGradient
                          colors={[project.color, `${project.color}DD`]}
                          style={[styles.progressFill, { width: `${project.progress}%` }]}
                        />
                      </View>
                      <Text style={styles.progressText}>{project.progress}% Complete</Text>
                    </View>
                    
                    <TouchableOpacity style={styles.projectButton}>
                      <Text style={[styles.projectButtonText, { color: project.color }]}>
                        View Case Study
                      </Text>
                      <Feather name="arrow-right" size={16} color={project.color} />
                    </TouchableOpacity>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Tech Stack */}
        <View style={styles.techSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Our Tech Stack</Text>
            <Text style={styles.sectionSubtitle}>Technologies we excel in</Text>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.techScroll}
            contentContainerStyle={styles.techContent}
          >
            {techStack.map((tech, index) => (
              <Animatable.View
                key={tech.name}
                animation="bounceIn"
                delay={index * 100}
                style={styles.techCard}
              >
                <View style={[styles.techIcon, { backgroundColor: `${tech.color}20` }]}>
                  <Text style={styles.techIconText}>{tech.icon}</Text>
                </View>
                <Text style={styles.techName}>{tech.name}</Text>
              </Animatable.View>
            ))}
          </ScrollView>
        </View>

        {/* Testimonials */}
        <Animated.View style={[styles.testimonialsSection, animatedStyles.testimonials]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <LinearGradient
                colors={['#F59E0B', '#FBBF24']}
                style={styles.sectionIcon}
              >
                <Feather name="message-circle" size={24} color="white" />
              </LinearGradient>
              <View>
                <Text style={styles.sectionTitle}>Client Testimonials</Text>
                <Text style={styles.sectionSubtitle}>
                  What our clients say about us
                </Text>
              </View>
            </View>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.testimonialsScroll}
            contentContainerStyle={styles.testimonialsContent}
          >
            {testimonials.map((testimonial, index) => (
              <Animatable.View
                key={testimonial.id}
                animation="fadeInRight"
                delay={600 + index * 200}
                style={styles.testimonialCard}
              >
                <LinearGradient
                  colors={['#FFFFFF', '#F8FAFC']}
                  style={styles.testimonialGradient}
                >
                  {/* Company Logo */}
                  <View style={styles.companyLogoContainer}>
                    <Text style={styles.companyLogo}>{testimonial.companyLogo}</Text>
                  </View>
                  
                  <View style={styles.testimonialHeader}>
                    <View style={styles.testimonialAvatar}>
                      <Text style={styles.avatarText}>
                        {testimonial.avatar}
                      </Text>
                    </View>
                    <View style={styles.testimonialInfo}>
                      <Text style={styles.testimonialName}>{testimonial.name}</Text>
                      <Text style={styles.testimonialRole}>{testimonial.role}</Text>
                    </View>
                  </View>
                  
                  <RenderRating rating={testimonial.rating} />
                  
                  <Text style={styles.testimonialText}>
                    &quot;{testimonial.text}&quot;
                  </Text>
                  
                  <View style={styles.testimonialResult}>
                    <Feather name="trending-up" size={16} color="#10B981" />
                    <Text style={styles.testimonialResultText}>
                      {testimonial.revenue || testimonial.impact || testimonial.growth}
                    </Text>
                  </View>
                </LinearGradient>
              </Animatable.View>
            ))}
          </ScrollView>
        </Animated.View>

        {/* CTA Banner */}
        <View style={styles.ctaBanner}>
          <LinearGradient
            colors={['#4F46E5', '#7C3AED', '#8B5CF6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaBannerGradient}
          >
            {/* Floating Elements */}
            <View style={styles.ctaOrb1} />
            <View style={styles.ctaOrb2} />
            
            <View style={styles.ctaContent}>
              <Feather name="star" size={48} color="white" />
              
              <Text style={styles.ctaTitle}>Ready to Transform Your Business?</Text>
              <Text style={styles.ctaSubtitle}>
                Let&apos;s create something amazing together. Schedule a free consultation today.
              </Text>
              
              <View style={styles.ctaButtons}>
                <TouchableOpacity 
                  style={styles.ctaPrimaryButton}
                  // onPress={() => handleQuickAction('contact')}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={['#FFFFFF', '#F1F5F9']}
                    style={styles.ctaButtonGradient}
                  >
                    <Feather name="calendar" size={10} color="#4F46E5" />
                    <Text style={styles.ctaPrimaryText}>Book Consultation</Text>
                  </LinearGradient>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.ctaSecondaryButton}
                  // onPress={() => handleQuickAction('quote')}
                  activeOpacity={0.9}
                >
                  <Feather name="dollar-sign" size={20} color="white" />
                  <Text style={styles.ctaSecondaryText}>Get Quote</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.ctaStats}>
                <View style={styles.ctaStat}>
                  <Feather name="clock" size={16} color="rgba(255,255,255,0.8)" />
                  <Text style={styles.ctaStatText}>24h Response</Text>
                </View>
                <View style={styles.ctaStat}>
                  <Feather name="shield" size={16} color="rgba(255,255,255,0.8)" />
                  <Text style={styles.ctaStatText}>100% Secure</Text>
                </View>
                <View style={styles.ctaStat}>
                  <Feather name="award" size={16} color="rgba(255,255,255,0.8)" />
                  <Text style={styles.ctaStatText}>Award Winning</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
      </Animated.ScrollView>

      {/* Search Modal */}
      <Modal
        visible={showSearchModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSearchModal(false)}
      >
        <View style={styles.modalContainer}>
          <BlurView intensity={20} style={styles.modalBlur}>
            <View style={styles.searchModalContent}>
              <LinearGradient
                colors={['#1E293B', '#0F172A']}
                style={styles.searchModalGradient}
              >
                <View style={styles.searchHeader}>
                  <Text style={styles.searchTitle}>Search</Text>
                  <TouchableOpacity 
                    style={styles.searchClose}
                    onPress={() => setShowSearchModal(false)}
                  >
                    <Feather name="x" size={24} color="#888" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.searchBarContainer}>
                  <Feather name="search" size={20} color="#888" style={styles.searchIcon} />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="What are you looking for?"
                    placeholderTextColor="#666"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoFocus
                  />
                </View>
                
                <ScrollView style={styles.searchResults}>
                  <Text style={styles.searchCategory}>Popular Searches</Text>
                  {['Website Design', 'Mobile App', 'E-commerce', 'Branding', 'SEO', 'Cloud'].map((item, index) => (
                    <TouchableOpacity key={index} style={styles.searchResultItem}>
                      <Feather name="search" size={16} color="#888" />
                      <Text style={styles.searchResultText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </LinearGradient>
            </View>
          </BlurView>
        </View>
      </Modal>

      {/* Quick Actions Bar */}
      {/* <Animated.View 
        style={styles.quickActionsBar}
        entering={FadeIn.delay(2000)}
      >
        <BlurView intensity={80} tint="dark" style={styles.quickActionsBlur}>
          <View style={styles.quickActionsContent}>
            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => handleQuickAction('contact')}
            >
              <Feather name="message-circle" size={20} color="#4F46E5" />
              <Text style={styles.quickActionText}>Contact</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => scrollRef.current?.scrollTo({ y: 0, animated: true })}
            >
              <Feather name="home" size={20} color="#10B981" />
              <Text style={styles.quickActionText}>Home</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => handleQuickAction('portfolio')}
            >
              <Feather name="briefcase" size={20} color="#F59E0B" />
              <Text style={styles.quickActionText}>Work</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => handleQuickAction('services')}
            >
              <Feather name="grid" size={20} color="#8B5CF6" />
              <Text style={styles.quickActionText}>Services</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Animated.View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerBlur: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  userName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  heroSection: {
    height: 600,
    overflow: 'hidden',
    position: 'relative',
  },
  heroBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heroBackgroundGradient: {
    flex: 1,
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#4F46E5',
  },
  heroGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  floatingOrb: {
    position: 'absolute',
    top: 80,
    right: 40,
    zIndex: 1,
  },
  floatingOrbGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
  },
  heroContent: {
    alignItems: 'center',
    marginTop: 60,
  },
  heroTextContainer: {
    overflow: 'hidden',
  },
  companyName: {
    fontSize: 56,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  tagline: {
    fontSize: 24,
    fontWeight: '600',
    color: '#E0E7FF',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 32,
    letterSpacing: 0.5,
  },
  heroDescription: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  quickStats: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 24,
    marginBottom: 40,
    gap: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  quickStatItem: {
    alignItems: 'center',
    flex: 1,
  },
  quickStatIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  quickStatLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  ctaContainer: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
    justifyContent: 'center',
  },
  primaryCta: {
    flex: 1,
    maxWidth: 0,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 25,
    gap: 12,
  },
  primaryCtaText: {
    color: '#4F46E5',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryCta: {
    flex: 1,
    maxWidth: 200,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  secondaryCtaText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    padding: 24,
    marginTop: -40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 24,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(79, 70, 229, 0.2)',
  },
  seeAllText: {
    color: '#4F46E5',
    fontSize: 14,
    fontWeight: '600',
  },
  servicesScroll: {
    marginHorizontal: -24,
  },
  servicesContent: {
    paddingHorizontal: 24,
    paddingRight: 8,
  },
  serviceCardContainer: {
    width: 280,
    marginRight: 20,
  },
  serviceCard: {
    height: 320,
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 16,
  },
  serviceCardGradient: {
    flex: 1,
  },
  serviceCardContent: {
    padding: 24,
    flex: 1,
  },
  serviceCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  serviceIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  serviceProjectsBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  serviceProjectsText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  serviceTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
    lineHeight: 28,
  },
  serviceDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 20,
    lineHeight: 22,
  },
  serviceFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  serviceFeatureChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  serviceFeatureText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  serviceFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  serviceLearn: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  featuredSection: {
    padding: 24,
    marginTop: -20,
  },
  featuredGradient: {
    borderRadius: 32,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 20,
  },
  projectsGrid: {
    gap: 20,
  },
  projectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  projectCardGradient: {
    flex: 1,
  },
  projectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  projectIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  projectInfo: {
    flex: 1,
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  projectCompany: {
    fontSize: 14,
    color: '#64748B',
  },
  projectTeam: {
    flexDirection: 'row',
    gap: 4,
  },
  teamMember: {
    fontSize: 20,
  },
  projectCategory: {
    fontSize: 16,
    color: '#475569',
    fontWeight: '600',
    marginBottom: 16,
  },
  projectMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  metricText: {
    color: '#4F46E5',
    fontSize: 12,
    fontWeight: '600',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  projectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  projectButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  techSection: {
    padding: 24,
  },
  techScroll: {
    marginHorizontal: -24,
  },
  techContent: {
    paddingHorizontal: 24,
  },
  techCard: {
    alignItems: 'center',
    marginRight: 20,
  },
  techIcon: {
    width: 72,
    height: 72,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  techIconText: {
    fontSize: 32,
  },
  techName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  testimonialsSection: {
    padding: 24,
  },
  testimonialsScroll: {
    marginHorizontal: -24,
  },
  testimonialsContent: {
    paddingHorizontal: 24,
    paddingRight: 8,
  },
  testimonialCard: {
    width: 320,
    marginRight: 20,
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 16,
  },
  testimonialGradient: {
    padding: 32,
    borderRadius: 28,
  },
  companyLogoContainer: {
    position: 'absolute',
    top: 24,
    right: 24,
    opacity: 0.1,
  },
  companyLogo: {
    fontSize: 64,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  testimonialAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
  },
  testimonialInfo: {
    flex: 1,
  },
  testimonialName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  testimonialRole: {
    fontSize: 14,
    color: '#64748B',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 4,
  },
  testimonialText: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 24,
    fontStyle: 'italic',
    marginBottom: 20,
  },
  testimonialResult: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  testimonialResultText: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '600',
  },
  ctaBanner: {
    margin: 24,
    borderRadius: 32,
    overflow: 'hidden',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 20,
  },
  ctaBannerGradient: {
    padding: 40,
    position: 'relative',
  },
  ctaOrb1: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  ctaOrb2: {
    position: 'absolute',
    bottom: -50,
    left: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  ctaContent: {
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  ctaTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: '#E0E7FF',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  ctaButtons: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 32,
  },
  ctaPrimaryButton: {
    flex: 1,
    maxWidth: 220,
    borderRadius: 25,
    overflow: 'hidden',
  },
  ctaButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 25,
    gap: 12,
  },
  ctaPrimaryText: {
    color: '#4F46E5',
    fontSize: 16,
    fontWeight: '700',
  },
  ctaSecondaryButton: {
    flex: 1,
    maxWidth: 180,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  ctaSecondaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  ctaStats: {
    flexDirection: 'row',
    gap: 24,
  },
  ctaStat: {
    alignItems: 'center',
  },
  ctaStatText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBlur: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  searchModalContent: {
    height: 400,
    borderRadius: 32,
    overflow: 'hidden',
  },
  searchModalGradient: {
    flex: 1,
    padding: 24,
  },
  searchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  searchTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchClose: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
  searchResults: {
    flex: 1,
  },
  searchCategory: {
    color: '#888',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchResultText: {
    color: 'white',
    fontSize: 16,
  },
  quickActionsBar: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  quickActionsBlur: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  quickActionsContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  quickAction: {
    alignItems: 'center',
    gap: 6,
  },
  quickActionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});