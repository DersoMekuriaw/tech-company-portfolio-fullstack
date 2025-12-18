import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
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
import Button from '../components/Button';

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState('basic');

  const service = {
    id: 1,
    title: 'Mobile App Development',
    category: 'Development',
    description: 'Build high-performance mobile applications for iOS and Android using cutting-edge technologies.',
    longDescription: 'Our mobile app development service combines technical expertise with creative design to deliver apps that users love. We specialize in both native and cross-platform development, ensuring your app performs flawlessly on all devices.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500',
    features: [
      'Native iOS & Android development',
      'Cross-platform with React Native/Flutter',
      'UI/UX design and prototyping',
      'API integration and backend development',
      'App Store deployment and management',
      'Maintenance and updates',
      'Performance optimization',
      'Push notifications and analytics'
    ],
    process: [
      { step: 1, title: 'Discovery', desc: 'Understand your requirements' },
      { step: 2, title: 'Design', desc: 'Create wireframes and prototypes' },
      { step: 3, title: 'Development', desc: 'Code and implement features' },
      { step: 4, title: 'Testing', desc: 'Quality assurance and bug fixing' },
      { step: 5, title: 'Launch', desc: 'App store deployment' },
      { step: 6, title: 'Support', desc: 'Ongoing maintenance and updates' },
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'AWS'],
    packages: {
      basic: {
        name: 'Starter',
        price: '$5,000',
        features: ['Single platform', 'Basic features', '3-month support', 'Standard design'],
        recommended: false
      },
      standard: {
        name: 'Professional',
        price: '$15,000',
        features: ['Both platforms', 'Advanced features', '6-month support', 'Custom design', 'API integration'],
        recommended: true
      },
      premium: {
        name: 'Enterprise',
        price: '$30,000',
        features: ['Both platforms', 'All features', '12-month support', 'Premium design', 'Full backend', 'Maintenance'],
        recommended: false
      }
    }
  };

  const handleContact = () => {
    router.push('/(tabs)/ContactScreen' as any);
  };

  const handleQuote = () => {
    // Handle quote request
    console.log('Requesting quote for:', selectedPackage);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Image
          source={{ uri: service.image }}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.heroOverlay}>
          <Text style={styles.heroCategory}>{service.category}</Text>
          <Text style={styles.heroTitle}>{service.title}</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        {/* Overview */}
        <Animated.View 
          style={styles.overviewSection}
          entering={FadeInUp.duration(600)}
        >
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.overviewText}>{service.longDescription}</Text>
        </Animated.View>

        {/* Features */}
        <Animated.View 
          style={styles.featuresSection}
          entering={SlideInRight.delay(200).duration(600)}
        >
          <Text style={styles.sectionTitle}>What We Offer</Text>
          <View style={styles.featuresGrid}>
            {service.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Ionicons name="checkmark-circle" size={20} color="#50C878" />
                </View>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Process */}
        <Animated.View 
          style={styles.processSection}
          entering={FadeInUp.delay(300).duration(600)}
        >
          <Text style={styles.sectionTitle}>Our Process</Text>
          <View style={styles.processTimeline}>
            {service.process.map((step, index) => (
              <View key={step.step} style={styles.processStep}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{step.step}</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDesc}>{step.desc}</Text>
                </View>
                {index < service.process.length - 1 && (
                  <View style={styles.stepConnector} />
                )}
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Technologies */}
        <Animated.View 
          style={styles.techSection}
          entering={SlideInRight.delay(400).duration(600)}
        >
          <Text style={styles.sectionTitle}>Technologies We Use</Text>
          <View style={styles.techGrid}>
            {service.technologies.map((tech, index) => (
              <View key={index} style={styles.techItem}>
                <Text style={styles.techText}>{tech}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Packages */}
        <Animated.View 
          style={styles.packagesSection}
          entering={FadeInUp.delay(500).duration(600)}
        >
          <Text style={styles.sectionTitle}>Packages</Text>
          <Text style={styles.packagesSubtitle}>
            Choose the package that fits your needs
          </Text>
          
          <View style={styles.packagesContainer}>
            {Object.entries(service.packages).map(([key, pkg]) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.packageCard,
                  selectedPackage === key && styles.selectedPackage,
                  pkg.recommended && styles.recommendedPackage
                ]}
                onPress={() => setSelectedPackage(key)}
              >
                {pkg.recommended && (
                  <View style={styles.recommendedBadge}>
                    <Text style={styles.recommendedText}>Recommended</Text>
                  </View>
                )}
                
                <Text style={styles.packageName}>{pkg.name}</Text>
                <Text style={styles.packagePrice}>{pkg.price}</Text>
                
                <View style={styles.packageFeatures}>
                  {pkg.features.map((feature, index) => (
                    <View key={index} style={styles.packageFeature}>
                      <Ionicons name="checkmark" size={16} color="#50C878" />
                      <Text style={styles.packageFeatureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
                
                <TouchableOpacity 
                  style={[
                    styles.selectButton,
                    selectedPackage === key && styles.selectedButton
                  ]}
                  onPress={() => setSelectedPackage(key)}
                >
                  <Text style={[
                    styles.selectButtonText,
                    selectedPackage === key && styles.selectedButtonText
                  ]}>
                    {selectedPackage === key ? 'Selected' : 'Select'}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* CTA */}
        <Animated.View 
          style={styles.ctaSection}
          entering={FadeInUp.delay(600).duration(600)}
        >
          <Text style={styles.ctaTitle}>Ready to Build Your App?</Text>
          <Text style={styles.ctaText}>
            Contact us for a free consultation and quote
          </Text>
          <View style={styles.ctaButtons}>
            <View style={styles.ctaButton}>
              <Button
                title="Get a Quote"
                onPress={handleQuote}
              />
            </View>
            <View style={styles.ctaButton}>
              <Button
                title="Contact Us"
                onPress={handleContact}
                variant="outline"
              />
            </View>
          </View>
        </Animated.View>

        {/* Portfolio */}
        <Animated.View 
          style={styles.portfolioSection}
          entering={SlideInRight.delay(700).duration(600)}
        >
          <Text style={styles.sectionTitle}>Related Work</Text>
          <Text style={styles.portfolioText}>
            Check out our mobile app development projects
          </Text>
          <TouchableOpacity 
            style={styles.portfolioButton}
            onPress={() => router.push('/(tabs)/PortfolioScreen' as any)}
          >
            <Text style={styles.portfolioButtonText}>View Portfolio</Text>
            <Ionicons name="arrow-forward" size={20} color="#4A90E2" />
          </TouchableOpacity>
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
  heroSection: {
    height: 400,
    position: 'relative',
  },
  heroImage: {
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
    zIndex: 2,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
    padding: 24,
  },
  heroCategory: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heroTitle: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    lineHeight: 44,
  },
  contentContainer: {
    padding: 24,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  overviewSection: {
    marginBottom: 32,
  },
  overviewText: {
    color: '#888',
    fontSize: 16,
    lineHeight: 26,
  },
  featuresSection: {
    marginBottom: 32,
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
  processSection: {
    marginBottom: 32,
  },
  processTimeline: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 24,
  },
  processStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    position: 'relative',
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
    paddingTop: 8,
  },
  stepTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  stepDesc: {
    color: '#888',
    fontSize: 14,
    lineHeight: 20,
  },
  stepConnector: {
    position: 'absolute',
    left: 20,
    top: 40,
    bottom: -24,
    width: 2,
    backgroundColor: '#333',
  },
  techSection: {
    marginBottom: 32,
  },
  techGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  techItem: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  techText: {
    color: '#888',
    fontSize: 14,
  },
  packagesSection: {
    marginBottom: 32,
  },
  packagesSubtitle: {
    color: '#888',
    fontSize: 16,
    marginBottom: 24,
  },
  packagesContainer: {
    gap: 16,
  },
  packageCard: {
    backgroundColor: '#1A1A1A',
    padding: 24,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  selectedPackage: {
    borderColor: '#4A90E2',
  },
  recommendedPackage: {
    borderColor: '#FFD166',
  },
  recommendedBadge: {
    position: 'absolute',
    top: -12,
    left: 24,
    backgroundColor: '#FFD166',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  recommendedText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  packageName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  packagePrice: {
    color: '#4A90E2',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  packageFeatures: {
    gap: 12,
    marginBottom: 24,
  },
  packageFeature: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  packageFeatureText: {
    color: '#888',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  selectButton: {
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4A90E2',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#4A90E2',
  },
  selectButtonText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedButtonText: {
    color: 'white',
  },
  ctaSection: {
    backgroundColor: '#4A90E2',
    borderRadius: 20,
    padding: 30,
    marginBottom: 32,
    alignItems: 'center',
  },
  ctaTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  ctaText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  ctaButtons: {
    width: '100%',
    gap: 12,
  },
  ctaButton: {
    width: '100%',
  },
  portfolioSection: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 30,
    marginBottom: 50,
    alignItems: 'center',
  },
  portfolioText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  portfolioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  portfolioButtonText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: 'bold',
  },
});