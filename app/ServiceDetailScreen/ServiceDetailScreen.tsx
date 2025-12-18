import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Linking,
} from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type ServiceDetailScreenRouteProp = RouteProp<RootStackParamList, 'ServiceDetail'>;
type ServiceDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ServiceDetail'>;

interface Props {
  route: ServiceDetailScreenRouteProp;
  navigation: ServiceDetailScreenNavigationProp;
}

const { width } = Dimensions.get('window');

const serviceDetails = {
  '1': {
    title: 'Network Installation',
    icon: 'wifi',
    color: '#4F46E5',
    description: 'Professional network infrastructure setup and management for businesses of all sizes.',
    longDescription: `We provide comprehensive network installation services including LAN/WAN setup, wireless networking, network security, and ongoing maintenance. Our certified engineers ensure optimal performance and security for your business operations.`,
    features: [
      'Custom Network Design',
      'Hardware Installation',
      'Network Security Setup',
      'Performance Optimization',
      '24/7 Monitoring',
      'Regular Maintenance',
    ],
    benefits: [
      'Improved network reliability',
      'Enhanced security measures',
      'Faster data transfer speeds',
      'Scalable infrastructure',
      'Reduced downtime',
    ],
    process: [
      'Initial consultation and assessment',
      'Custom network design proposal',
      'Hardware procurement',
      'Professional installation',
      'Testing and optimization',
      'Training and documentation',
    ],
    technologies: ['Cisco', 'Ubiquiti', 'MikroTik', 'Fortinet', 'Aruba'],
  },
  '2': {
    title: 'Website Development',
    icon: 'code-slash',
    color: '#10B981',
    description: 'Custom website and web application development tailored to your business needs.',
    longDescription: `We create stunning, responsive websites and powerful web applications using the latest technologies. From simple business websites to complex web platforms, we deliver solutions that drive results.`,
    features: [
      'Responsive Design',
      'Custom CMS Development',
      'E-commerce Integration',
      'SEO Optimization',
      'Performance Tuning',
      'Ongoing Support',
    ],
    benefits: [
      'Improved online presence',
      'Enhanced user experience',
      'Mobile responsiveness',
      'Search engine visibility',
      'Scalable architecture',
    ],
    process: [
      'Requirements gathering',
      'UI/UX design',
      'Development & coding',
      'Quality assurance',
      'Deployment',
      'Post-launch support',
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB'],
  },
  // Add similar objects for other services...
};

export default function ServiceDetailScreen({ route, navigation }: Props) {
  const { serviceId } = route.params;
  const service = serviceDetails[serviceId as keyof typeof serviceDetails];

  if (!service) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Service not found</Text>
      </SafeAreaView>
    );
  }

  const handleContact = () => {
    // Implement contact logic
    navigation.navigate('Contact');
  };

  const handleGetQuote = () => {
    // Implement quote request logic
    Linking.openURL('mailto:quotes@techinnovate.com');
  };

  return (
    <SafeAreaView style={styles.container}>




 <View>
      <Text>Our Services</Text>
      
      {/* Method 1: Using Link component */}
      <Link href="/ServiceDetailScreen/123">
        <Text>View Web Development Service</Text>
      </Link>
      
      {/* Method 2: Using router.push() */}
      <TouchableOpacity onPress={() => {
        import('expo-router').then(({ router }) => {
          router.push('/ServiceDetailScreen/456');
        });
      }}>
        <Text>View Mobile App Service</Text>
      </TouchableOpacity>
    




      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[service.color, `${service.color}CC`]}
          style={styles.header}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <View style={[styles.serviceIcon, { backgroundColor: '#FFFFFF20' }]}>
              <Ionicons name={service.icon as any} size={48} color="#FFFFFF" />
            </View>
            <Text style={styles.serviceTitle}>{service.title}</Text>
            <Text style={styles.serviceDescription}>{service.description}</Text>
          </View>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleGetQuote}>
            <Ionicons name="document-text" size={24} color={service.color} />
            <Text style={[styles.actionText, { color: service.color }]}>Get Quote</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleContact}>
            <Ionicons name="chatbubble-ellipses" size={24} color={service.color} />
            <Text style={[styles.actionText, { color: service.color }]}>Consult</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="calendar" size={24} color={service.color} />
            <Text style={[styles.actionText, { color: service.color }]}>Schedule</Text>
          </TouchableOpacity>
        </View>

        {/* Detailed Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About This Service</Text>
          <Text style={styles.longDescription}>{service.longDescription}</Text>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          <View style={styles.featuresGrid}>
            {service.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color={service.color} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Benefits */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Benefits</Text>
          <View style={styles.benefitsList}>
            {service.benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <View style={[styles.benefitIcon, { backgroundColor: `${service.color}20` }]}>
                  <Ionicons name="star" size={16} color={service.color} />
                </View>
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Process */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Process</Text>
          <View style={styles.processContainer}>
            {service.process.map((step, index) => (
              <View key={index} style={styles.processStep}>
                <View style={[styles.stepNumber, { backgroundColor: service.color }]}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Technologies */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technologies We Use</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.techScroll}
            contentContainerStyle={styles.techContent}
          >
            {service.technologies.map((tech, index) => (
              <View key={index} style={styles.techBadge}>
                <Text style={styles.techText}>{tech}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* CTA Section */}
        <LinearGradient
          colors={[service.color, `${service.color}CC`]}
          style={styles.ctaSection}
        >
          <Text style={styles.ctaTitle}>Ready to Get Started?</Text>
          <Text style={styles.ctaDescription}>
            Let&apos;s discuss how {service.title} can benefit your business
          </Text>
          
          <View style={styles.ctaButtons}>
            <TouchableOpacity
              style={[styles.ctaButton, styles.ctaPrimary]}
              onPress={handleContact}
            >
              <Text style={styles.ctaPrimaryText}>Contact Us Now</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.ctaButton, styles.ctaSecondary]}
              onPress={handleGetQuote}
            >
              <Text style={styles.ctaSecondaryText}>Request Free Quote</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Related Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Related Services</Text>
          <Text style={styles.relatedDescription}>
            Explore other services that might interest you
          </Text>
          
          <TouchableOpacity style={styles.relatedService}>
            <Ionicons name="phone-portrait" size={24} color="#8B5CF6" />
            <View style={styles.relatedServiceInfo}>
              <Text style={styles.relatedServiceTitle}>Application Development</Text>
              <Text style={styles.relatedServiceDescription}>
                Custom mobile and desktop applications
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.relatedService}>
            <Ionicons name="cart" size={24} color="#EF4444" />
            <View style={styles.relatedServiceInfo}>
              <Text style={styles.relatedServiceTitle}>E-commerce Development</Text>
              <Text style={styles.relatedServiceDescription}>
                Online stores and shopping platforms
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 1,
  },
  headerContent: {
    alignItems: 'center',
  },
  serviceIcon: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  serviceTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  serviceDescription: {
    fontSize: 16,
    color: '#E0E7FF',
    textAlign: 'center',
    lineHeight: 24,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: -24,
    paddingHorizontal: 20,
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    width: width * 0.28,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
  },
  longDescription: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 24,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: (width - 72) / 2,
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#475569',
    marginLeft: 8,
    flex: 1,
  },
  benefitsList: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  benefitText: {
    fontSize: 16,
    color: '#475569',
    flex: 1,
  },
  processContainer: {
    gap: 20,
  },
  processStep: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  stepText: {
    fontSize: 16,
    color: '#475569',
    flex: 1,
  },
  techScroll: {
    marginHorizontal: -24,
  },
  techContent: {
    paddingHorizontal: 24,
    gap: 12,
  },
  techBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  techText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#475569',
  },
  ctaSection: {
    margin: 24,
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaDescription: {
    fontSize: 16,
    color: '#E0E7FF',
    textAlign: 'center',
    marginBottom: 24,
  },
  ctaButtons: {
    width: '100%',
    gap: 12,
  },
  ctaButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaPrimary: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ctaPrimaryText: {
    color: '#4F46E5',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  ctaSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  ctaSecondaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  relatedDescription: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 20,
  },
  relatedService: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  relatedServiceInfo: {
    flex: 1,
    marginLeft: 12,
  },
  relatedServiceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  relatedServiceDescription: {
    fontSize: 14,
    color: '#64748B',
  },
});