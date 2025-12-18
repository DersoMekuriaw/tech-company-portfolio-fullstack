import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Share,
  Dimensions
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated, {
  FadeInUp,
  SlideInRight,
  useSharedValue,
  useAnimatedStyle,
  withSpring
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import Tag from '../components/Tag';

const { width } = Dimensions.get('window');

export default function PortfolioDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);

  const project = {
    id: 1,
    title: 'E-commerce Platform',
    client: 'Fashion Retailer',
    category: 'Web Development',
    year: '2023',
    description: 'A full-featured e-commerce platform with advanced analytics and personalized shopping experiences.',
    challenge: 'The client needed a modern, scalable e-commerce solution that could handle high traffic during seasonal sales while providing personalized shopping experiences.',
    solution: 'We built a React-based platform with Node.js backend, implementing real-time analytics, AI-powered recommendations, and a seamless checkout process.',
    results: [
      'Increased conversion rate by 35%',
      'Reduced page load time by 60%',
      'Handled 10x traffic during Black Friday',
      'Improved customer satisfaction by 45%'
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Redis', 'AWS', 'Stripe'],
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500'
    ],
    features: [
      'Product catalog with advanced filtering',
      'Personalized recommendations',
      'Secure payment processing',
      'Real-time inventory management',
      'Customer reviews and ratings',
      'Mobile-responsive design',
      'Multi-language support',
      'Admin dashboard'
    ],
    testimonial: {
      text: 'The platform exceeded our expectations. The team delivered a solution that significantly improved our online sales and customer experience.',
      author: 'Sarah Johnson',
      position: 'CEO, Fashion Retailer'
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this project: ${project.title}`,
        url: 'https://premiumapp.com/portfolio/' + project.id,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const nextImage = () => {
    setSelectedImage(prev => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setSelectedImage(prev => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Image Gallery */}
      <View style={styles.galleryContainer}>
        <Image
          source={{ uri: project.images[selectedImage] }}
          style={styles.mainImage}
          resizeMode="cover"
        />
        
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.shareButton} 
          onPress={handleShare}
        >
          <Ionicons name="share-social" size={24} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButtonLeft} 
          onPress={prevImage}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButtonRight} 
          onPress={nextImage}
        >
          <Ionicons name="chevron-forward" size={24} color="white" />
        </TouchableOpacity>
        
        <View style={styles.imageCounter}>
          <Text style={styles.imageCounterText}>
            {selectedImage + 1} / {project.images.length}
          </Text>
        </View>
      </View>

      {/* Thumbnails */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.thumbnailsContainer}
      >
        {project.images.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedImage(index)}
            style={[
              styles.thumbnail,
              selectedImage === index && styles.selectedThumbnail
            ]}
          >
            <Image
              source={{ uri: image }}
              style={styles.thumbnailImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Project Info */}
      <View style={styles.contentContainer}>
        <Animated.View 
          style={styles.projectHeader}
          entering={FadeInUp.duration(600)}
        >
          <View style={styles.headerTop}>
            <Tag label={project.category} variant="primary" />
            <Text style={styles.year}>{project.year}</Text>
          </View>
          
          <Text style={styles.title}>{project.title}</Text>
          <Text style={styles.client}>{project.client}</Text>
          
          <Text style={styles.description}>{project.description}</Text>
        </Animated.View>

        {/* Challenge & Solution */}
        <Animated.View 
          style={styles.section}
          entering={SlideInRight.delay(200).duration(600)}
        >
          <View style={styles.gridSection}>
            <View style={styles.gridItem}>
              <View style={styles.iconContainer}>
                <Ionicons name="warning" size={24} color="#FF6B6B" />
              </View>
              <Text style={styles.gridTitle}>Challenge</Text>
              <Text style={styles.gridText}>{project.challenge}</Text>
            </View>
            
            <View style={styles.gridDivider} />
            
            <View style={styles.gridItem}>
              <View style={styles.iconContainer}>
                <Ionicons name="bulb" size={24} color="#FFD166" />
              </View>
              <Text style={styles.gridTitle}>Solution</Text>
              <Text style={styles.gridText}>{project.solution}</Text>
            </View>
          </View>
        </Animated.View>

        {/* Results */}
        <Animated.View 
          style={styles.section}
          entering={FadeInUp.delay(300).duration(600)}
        >
          <Text style={styles.sectionTitle}>Results</Text>
          <View style={styles.resultsGrid}>
            {project.results.map((result, index) => (
              <View key={index} style={styles.resultItem}>
                <View style={styles.resultIcon}>
                  <Ionicons name="checkmark-circle" size={20} color="#50C878" />
                </View>
                <Text style={styles.resultText}>{result}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Technologies */}
        <Animated.View 
          style={styles.section}
          entering={SlideInRight.delay(400).duration(600)}
        >
          <Text style={styles.sectionTitle}>Technologies Used</Text>
          <View style={styles.technologiesContainer}>
            {project.technologies.map((tech, index) => (
              <Tag key={index} label={tech} variant="default" size="medium" />
            ))}
          </View>
        </Animated.View>

        {/* Features */}
        <Animated.View 
          style={styles.section}
          entering={FadeInUp.delay(500).duration(600)}
        >
          <Text style={styles.sectionTitle}>Key Features</Text>
          <View style={styles.featuresGrid}>
            {project.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Ionicons name="star" size={16} color="#4A90E2" />
                </View>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Testimonial */}
        <Animated.View 
          style={styles.testimonialSection}
          entering={FadeInUp.delay(600).duration(600)}
        >
          <Ionicons name="quote" size={40} color="#4A90E2" />
          <Text style={styles.testimonialText}>&quot;{project.testimonial.text}&quot;</Text>
          <View style={styles.testimonialAuthor}>
            <Text style={styles.authorName}>{project.testimonial.author}</Text>
            <Text style={styles.authorPosition}>{project.testimonial.position}</Text>
          </View>
        </Animated.View>

        {/* CTA */}
        <Animated.View 
          style={styles.ctaSection}
          entering={FadeInUp.delay(700).duration(600)}
        >
          <Text style={styles.ctaTitle}>Want Something Similar?</Text>
          <Text style={styles.ctaText}>
            Let&apos;s discuss how we can create an amazing solution for your business
          </Text>
          <View style={styles.ctaButtons}>
            <TouchableOpacity 
              style={styles.primaryCtaButton}
              onPress={() => router.push('/(tabs)/ContactScreen' as any)}
            >
              <Text style={styles.primaryCtaButtonText}>Start a Project</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.secondaryCtaButton}
              onPress={() => router.push('/(tabs)/PortfolioScreen' as any)}
            >
              <Text style={styles.secondaryCtaButtonText}>View More Work</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  galleryContainer: {
    height: 400,
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonLeft: {
    position: 'absolute',
    left: 20,
    top: '50%',
    marginTop: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonRight: {
    position: 'absolute',
    right: 20,
    top: '50%',
    marginTop: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCounter: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  imageCounterText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  thumbnailsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#0A0A0A',
  },
  thumbnail: {
    width: 80,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedThumbnail: {
    borderColor: '#4A90E2',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    padding: 24,
  },
  projectHeader: {
    marginBottom: 32,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  year: {
    color: '#888',
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 40,
  },
  client: {
    color: '#4A90E2',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  description: {
    color: '#888',
    fontSize: 18,
    lineHeight: 28,
  },
  section: {
    marginBottom: 32,
  },
  gridSection: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    overflow: 'hidden',
  },
  gridItem: {
    flex: 1,
    padding: 24,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  gridTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  gridText: {
    color: '#888',
    fontSize: 16,
    lineHeight: 24,
  },
  gridDivider: {
    width: 1,
    backgroundColor: '#333',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultsGrid: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 24,
    gap: 16,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultIcon: {
    marginRight: 12,
  },
  resultText: {
    color: '#888',
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
  },
  technologiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  featureIcon: {
    marginRight: 12,
  },
  featureText: {
    color: '#888',
    fontSize: 14,
    flex: 1,
  },
  testimonialSection: {
    backgroundColor: '#4A90E2',
    borderRadius: 20,
    padding: 30,
    marginBottom: 32,
    alignItems: 'center',
  },
  testimonialText: {
    color: 'white',
    fontSize: 18,
    fontStyle: 'italic',
    lineHeight: 28,
    textAlign: 'center',
    marginVertical: 20,
  },
  testimonialAuthor: {
    alignItems: 'center',
  },
  authorName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  authorPosition: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  ctaSection: {
    marginBottom: 50,
  },
  ctaTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  ctaText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  ctaButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  primaryCtaButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    flex: 1,
  },
  primaryCtaButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryCtaButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#4A90E2',
    flex: 1,
  },
  secondaryCtaButtonText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});