import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
  Linking,

  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors, Gradients, Shadows } from '../../constants/colors';
import { formatCurrency, formatFileSize } from '../../utils';

const { width } = Dimensions.get('window');

const productDetails = {
  '1': {
    name: 'Project Management Suite',
    category: 'software',
    price: 299,
    description: 'Complete project management solution for teams of all sizes',
    longDescription: `The Project Management Suite is a comprehensive solution designed to streamline project planning, execution, and monitoring. With features like task management, time tracking, team collaboration, and advanced reporting, it helps teams stay organized and productive.\n\nBuilt with modern technologies and a focus on user experience, this suite scales from small teams to enterprise organizations.`,
    features: [
      'Task Management with priority levels',
      'Time Tracking and reporting',
      'Team Collaboration tools',
      'Gantt Charts and timelines',
      'Customizable dashboards',
      'Advanced reporting and analytics',
      'Integration with popular tools',
      'Mobile app for on-the-go access',
    ],
    specifications: {
      'Version': '3.2.1',
      'Last Updated': 'March 15, 2024',
      'File Size': '245 MB',
      'License': 'Commercial',
      'Platform': 'Web, Windows, macOS, Linux',
      'Framework': 'React, Node.js',
      'Database': 'PostgreSQL',
      'Cloud Ready': 'Yes',
      'Support': '24/7 Email & Chat',
    },
    requirements: [
      'Modern web browser (Chrome, Firefox, Safari, Edge)',
      'Node.js 18+ for self-hosting',
      'PostgreSQL 12+ database',
      'Minimum 2GB RAM for server',
      'SSL certificate for production',
    ],
    rating: 4.8,
    reviews: 124,
    downloads: 2540,
    badge: 'Popular' as const,
    images: ['🖥️', '📊', '👥'],
    versionHistory: [
      { version: '3.2.1', date: '2024-03-15', changes: ['Bug fixes', 'Performance improvements'] },
      { version: '3.2.0', date: '2024-02-28', changes: ['New reporting module', 'Mobile app release'] },
      { version: '3.1.0', date: '2024-01-15', changes: ['Enhanced security', 'New API endpoints'] },
    ],
  },
  '2': {
    name: 'E-commerce Template',
    category: 'templates',
    price: 89,
    description: 'Modern e-commerce website template with admin dashboard',
    longDescription: `This responsive e-commerce template provides everything you need to launch an online store quickly. Built with modern design principles and optimized for performance, it includes product management, shopping cart, checkout, and customer management features.\n\nWith clean code and comprehensive documentation, you can customize it to match your brand perfectly.`,
    features: [
      'Fully responsive design',
      'Product catalog with filters',
      'Shopping cart and checkout',
      'Payment gateway integration',
      'Customer management system',
      'Order tracking',
      'Admin dashboard',
      'SEO optimized structure',
    ],
    specifications: {
      'Version': '2.0.0',
      'Last Updated': 'February 28, 2024',
      'File Size': '45 MB',
      'License': 'Single Use',
      'Platform': 'Web',
      'Framework': 'React, Next.js',
      'CMS': 'Headless CMS ready',
      'Payment': 'Stripe, PayPal',
      'Support': '6 months included',
    },
    requirements: [
      'Node.js 16+ for development',
      'Modern web browser',
      'Stripe/PayPal account for payments',
      'Web hosting with Node.js support',
    ],
    rating: 4.6,
    reviews: 89,
    downloads: 1240,
    badge: 'New' as const,
    images: ['🛍️', '📱', '💳'],
    versionHistory: [
      { version: '2.0.0', date: '2024-02-28', changes: ['Complete redesign', 'New admin panel'] },
      { version: '1.5.0', date: '2023-12-10', changes: ['Added mobile app', 'New payment options'] },
    ],
  },
};

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const product = productDetails[id as keyof typeof productDetails];

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFound}>
          <Ionicons name="alert-circle" size={64} color={Colors.error} />
          <Text style={styles.notFoundText}>Product not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleBuyNow = () => {
    Alert.alert(
      'Purchase Confirmation',
      `Would you like to purchase ${product.name} for ${formatCurrency(product.price * quantity)}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Buy Now', 
          onPress: () => {
            // Handle purchase
            Alert.alert('Success', 'Purchase completed successfully!');
          }
        },
      ]
    );
  };

  const handleAddToCart = () => {
    Alert.alert('Added to Cart', `${product.name} has been added to your cart.`);
  };

  const getBadgeColor = () => {
    switch (product.badge) {
      case 'Popular': return Colors.success;
      case 'New': return Colors.info;
      default: return Colors.primary;
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Ionicons key={i} name="star" size={20} color="#F59E0B" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<Ionicons key={i} name="star-half" size={20} color="#F59E0B" />);
      } else {
        stars.push(<Ionicons key={i} name="star-outline" size={20} color={Colors.gray[300]} />);
      }
    }
    return stars;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[Colors.primary, Colors.secondary]}
          style={styles.header}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <View style={styles.productBadge}>
              <Text style={styles.productBadgeText}>{product.badge}</Text>
            </View>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
          </View>
        </LinearGradient>

        {/* Product Images */}
        <View style={styles.imagesSection}>
          <View style={styles.mainImageContainer}>
            <LinearGradient
              colors={[Colors.primary + '20', Colors.secondary + '20']}
              style={styles.mainImage}
            >
              <Text style={styles.productEmoji}>{product.images[activeImage]}</Text>
            </LinearGradient>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.thumbnailsScroll}
            contentContainerStyle={styles.thumbnailsContent}
          >
            {product.images.map((image, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.thumbnail,
                  activeImage === index && styles.thumbnailActive
                ]}
                onPress={() => setActiveImage(index)}
              >
                <Text style={styles.thumbnailEmoji}>{image}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <View style={styles.quantitySelector}>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Ionicons name="remove" size={20} color={Colors.primary} />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Ionicons name="add" size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.downloadButton}
            onPress={handleAddToCart}
          >
            <Ionicons name="cart" size={24} color={Colors.primary} />
            <Text style={styles.downloadButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>

        {/* Price & Rating */}
        <View style={styles.priceSection}>
          <View>
            <Text style={styles.price}>{formatCurrency(product.price)}</Text>
            <Text style={styles.priceNote}>One-time payment</Text>
          </View>
          
          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
              {renderStars(product.rating)}
            </View>
            <Text style={styles.ratingText}>{product.rating} ({product.reviews} reviews)</Text>
            <Text style={styles.downloadsText}>{product.downloads.toLocaleString()} downloads</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.longDescription}>{product.longDescription}</Text>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          <View style={styles.featuresGrid}>
            {product.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Specifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specifications</Text>
          <View style={styles.specsGrid}>
            {Object.entries(product.specifications).map(([key, value]) => (
              <View key={key} style={styles.specRow}>
                <Text style={styles.specKey}>{key}</Text>
                <Text style={styles.specValue}>{value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Requirements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Requirements</Text>
          <View style={styles.requirementsList}>
            {product.requirements.map((requirement, index) => (
              <View key={index} style={styles.requirementItem}>
                <Ionicons name="hardware-chip" size={16} color={Colors.primary} />
                <Text style={styles.requirementText}>{requirement}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Version History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Version History</Text>
          <View style={styles.versionTimeline}>
            {product.versionHistory.map((version, index) => (
              <View key={index} style={styles.versionItem}>
                <View style={styles.versionHeader}>
                  <Text style={styles.versionNumber}>v{version.version}</Text>
                  <Text style={styles.versionDate}>{version.date}</Text>
                </View>
                <View style={styles.versionChanges}>
                  {version.changes.map((change, changeIndex) => (
                    <View key={changeIndex} style={styles.changeItem}>
                      <Ionicons name="arrow-forward" size={12} color={Colors.gray[500]} />
                      <Text style={styles.changeText}>{change}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* CTA Section */}
        <LinearGradient
          colors={Gradients.primary as unknown as readonly [string, string, ...string[]]}
          style={styles.ctaSection}
        >
          <Text style={styles.ctaTitle}>Ready to Get Started?</Text>
          <Text style={styles.ctaDescription}>
            Join {product.downloads.toLocaleString()} satisfied customers
          </Text>
          
          <View style={styles.ctaButtons}>
            <TouchableOpacity
              style={[styles.ctaButton, styles.ctaPrimary]}
              onPress={handleBuyNow}
            >
              <Text style={styles.ctaPrimaryText}>
                Buy Now • {formatCurrency(product.price * quantity)}
              </Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.ctaButton, styles.ctaSecondary]}
              onPress={() => Linking.openURL('mailto:support@techinnovate.com')}
            >
              <Text style={styles.ctaSecondaryText}>Request Demo</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.guarantee}>
            <Ionicons name="shield-checkmark" size={20} color="#FFFFFF" />
            <Text style={styles.guaranteeText}>
              30-day money-back guarantee • Free updates for 1 year • 24/7 support
            </Text>
          </View>
        </LinearGradient>

        {/* Related Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Related Products</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.relatedProductsScroll}
            contentContainerStyle={styles.relatedProductsContent}
          >
            <TouchableOpacity style={styles.relatedProduct}>
              <LinearGradient
                colors={[Colors.success + '20', Colors.success + '10']}
                style={styles.relatedProductImage}
              >
                <Text style={styles.relatedProductEmoji}>🛠️</Text>
              </LinearGradient>
              <Text style={styles.relatedProductName}>Design System Pro</Text>
              <Text style={styles.relatedProductPrice}>{formatCurrency(399)}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.relatedProduct}>
              <LinearGradient
                colors={[Colors.warning + '20', Colors.warning + '10']}
                style={styles.relatedProductImage}
              >
                <Text style={styles.relatedProductEmoji}>🎓</Text>
              </LinearGradient>
              <Text style={styles.relatedProductName}>API Development Course</Text>
              <Text style={styles.relatedProductPrice}>{formatCurrency(149)}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notFoundText: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.secondary,
    marginTop: 16,
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
  productBadge: {
    backgroundColor: '#FFFFFF30',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
  },
  productBadgeText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  productName: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
    lineHeight: 38,
  },
  productDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#E0E7FF',
    textAlign: 'center',
    lineHeight: 24,
  },
  imagesSection: {
    padding: 20,
  },
  mainImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mainImage: {
    width: width * 0.8,
    height: width * 0.6,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.md,
  },
  productEmoji: {
    fontSize: 64,
  },
  thumbnailsScroll: {
    marginHorizontal: -20,
  },
  thumbnailsContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbnailActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '10',
  },
  thumbnailEmoji: {
    fontSize: 32,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  quantityButton: {
    padding: 12,
  },
  quantityText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
    paddingHorizontal: 20,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border.light,
    gap: 8,
    ...Shadows.sm,
  },
  downloadButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.primary,
  },
  priceSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  price: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  priceNote: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
  },
  ratingContainer: {
    marginTop: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  downloadsText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.text.tertiary,
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
    marginBottom: 16,
  },
  longDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    lineHeight: 24,
  },
  featuresGrid: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    flex: 1,
    lineHeight: 22,
  },
  specsGrid: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border.light,
    overflow: 'hidden',
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  specKey: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.text.secondary,
  },
  specValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
  },
  requirementsList: {
    gap: 12,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  requirementText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    flex: 1,
    lineHeight: 22,
  },
  versionTimeline: {
    gap: 20,
  },
  versionItem: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border.light,
    ...Shadows.sm,
  },
  versionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  versionNumber: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: Colors.primary,
  },
  versionDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
  },
  versionChanges: {
    gap: 8,
  },
  changeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  changeText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    flex: 1,
  },
  ctaSection: {
    margin: 24,
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#E0E7FF',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
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
    backgroundColor: Colors.background,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ctaPrimaryText: {
    color: Colors.primary,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
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
    fontFamily: 'Inter-SemiBold',
  },
  guarantee: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    gap: 8,
  },
  guaranteeText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#E0E7FF',
    textAlign: 'center',
    lineHeight: 16,
  },
  relatedProductsScroll: {
    marginHorizontal: -24,
  },
  relatedProductsContent: {
    paddingHorizontal: 24,
    gap: 16,
  },
  relatedProduct: {
    width: 200,
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border.light,
    ...Shadows.sm,
  },
  relatedProductImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  relatedProductEmoji: {
    fontSize: 48,
  },
  relatedProductName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
    marginBottom: 8,
    lineHeight: 22,
  },
  relatedProductPrice: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: Colors.primary,
  },
});