import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Share
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

export default function ArticleDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(156);

  const article = {
    id: 1,
    title: 'The Future of Mobile Development in 2024',
    author: 'Alex Johnson',
    date: '2 hours ago',
    readTime: '8 min read',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=500',
    content: `
      The mobile development landscape is evolving at an unprecedented pace. As we enter 2024, several key trends are shaping the future of how we build and experience mobile applications.

      ## The Rise of Cross-Platform Frameworks
      React Native continues to dominate the cross-platform space, but new contenders like Flutter are gaining significant traction. The gap between native and cross-platform performance is closing rapidly.

      ## AI-Powered Development
      Artificial Intelligence is revolutionizing how developers work. From code completion to automated testing, AI tools are becoming essential parts of the development workflow.

      ## Performance Optimization
      Users expect instant loading and buttery-smooth animations. New techniques in code splitting, image optimization, and lazy loading are becoming standard practices.

      ## Privacy and Security
      With increasing concerns about data privacy, developers must prioritize security from day one. Zero-trust architecture and end-to-end encryption are no longer optional.

      ## The Metaverse and AR/VR
      Augmented and Virtual Reality are moving from novelty to necessity. Mobile devices are becoming the primary gateway to immersive experiences.

      ## Sustainable Development
      Energy efficiency and reduced carbon footprint are becoming important considerations in app development.

      As we look ahead, the most successful developers will be those who embrace change while maintaining focus on creating meaningful user experiences.
    `,
    tags: ['Mobile', 'Development', 'React Native', 'AI', 'Future'],
    relatedArticles: [
      { id: 2, title: 'React Native Performance Tips', readTime: '5 min' },
      { id: 3, title: 'State Management in 2024', readTime: '6 min' },
      { id: 4, title: 'UI/UX Design Principles', readTime: '7 min' },
    ]
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this article: ${article.title}`,
        url: 'https://premiumapp.com/articles/' + article.id,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: article.image }}
          style={styles.headerImage}
          resizeMode="cover"
        />
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {/* Article Header */}
        <Animated.View 
          style={styles.articleHeader}
          entering={FadeInUp.duration(600)}
        >
          <Tag label={article.category} variant="primary" />
          
          <Text style={styles.title}>{article.title}</Text>
          
          <View style={styles.metaInfo}>
            <View style={styles.authorInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{article.author[0]}</Text>
              </View>
              <View>
                <Text style={styles.authorName}>{article.author}</Text>
                <Text style={styles.metaText}>{article.date} • {article.readTime}</Text>
              </View>
            </View>
            
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={handleLike}
              >
                <Ionicons 
                  name={isLiked ? 'heart' : 'heart-outline'} 
                  size={24} 
                  color={isLiked ? '#FF6B6B' : '#888'} 
                />
                <Text style={styles.actionCount}>{likeCount}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={handleBookmark}
              >
                <Ionicons 
                  name={isBookmarked ? 'bookmark' : 'bookmark-outline'} 
                  size={24} 
                  color={isBookmarked ? '#4A90E2' : '#888'} 
                />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={handleShare}
              >
                <Ionicons name="share-social" size={24} color="#888" />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Article Content */}
        <Animated.View 
          style={styles.articleContent}
          entering={SlideInRight.delay(200).duration(600)}
        >
          {article.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('## ')) {
              return (
                <Text key={index} style={styles.subheading}>
                  {paragraph.replace('## ', '')}
                </Text>
              );
            }
            return (
              <Text key={index} style={styles.paragraph}>
                {paragraph}
              </Text>
            );
          })}
        </Animated.View>

        {/* Tags */}
        <Animated.View 
          style={styles.tagsContainer}
          entering={FadeInUp.delay(300).duration(600)}
        >
          <Text style={styles.sectionTitle}>Tags</Text>
          <View style={styles.tagsList}>
            {article.tags.map((tag, index) => (
              <Tag key={index} label={tag} variant="default" />
            ))}
          </View>
        </Animated.View>

        {/* Related Articles */}
        <Animated.View 
          style={styles.relatedContainer}
          entering={FadeInUp.delay(400).duration(600)}
        >
          <Text style={styles.sectionTitle}>Related Articles</Text>
          <View style={styles.relatedList}>
            {article.relatedArticles.map((related) => (
              <TouchableOpacity 
                key={related.id}
                style={styles.relatedCard}
                onPress={() => router.push(`/screens/article-detail/${related.id}` as any)}
              >
                <View style={styles.relatedInfo}>
                  <Text style={styles.relatedTitle}>{related.title}</Text>
                  <Text style={styles.relatedReadTime}>{related.readTime}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#888" />
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Author Bio */}
        <Animated.View 
          style={styles.authorContainer}
          entering={FadeInUp.delay(500).duration(600)}
        >
          <Text style={styles.sectionTitle}>About the Author</Text>
          <View style={styles.authorBio}>
            <View style={styles.bioAvatar}>
              <Text style={styles.bioAvatarText}>{article.author[0]}</Text>
            </View>
            <View style={styles.bioContent}>
              <Text style={styles.bioName}>{article.author}</Text>
              <Text style={styles.bioText}>
                Senior Mobile Developer with 8+ years of experience. 
                Passionate about React Native, performance optimization, 
                and creating exceptional user experiences.
              </Text>
              <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followButtonText}>Follow</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Comments Section */}
        <Animated.View 
          style={styles.commentsContainer}
          entering={FadeInUp.delay(600).duration(600)}
        >
          <View style={styles.commentsHeader}>
            <Text style={styles.sectionTitle}>Comments (24)</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.commentForm}>
            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                placeholderTextColor="#666"
                multiline
              />
            </View>
            <TouchableOpacity style={styles.postButton}>
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          </View>

          {/* Sample Comment */}
          <View style={styles.commentCard}>
            <View style={styles.commentHeader}>
              <View style={styles.commenterAvatar}>
                <Text style={styles.commenterAvatarText}>S</Text>
              </View>
              <View>
                <Text style={styles.commenterName}>Sarah Chen</Text>
                <Text style={styles.commentTime}>2 hours ago</Text>
              </View>
            </View>
            <Text style={styles.commentText}>
              Great insights! I particularly agree with the AI-powered 
              development section. The tools available today are game-changers.
            </Text>
            <View style={styles.commentActions}>
              <TouchableOpacity style={styles.commentAction}>
                <Ionicons name="heart-outline" size={16} color="#888" />
                <Text style={styles.commentActionText}>12</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.commentAction}>
                <Text style={styles.commentActionText}>Reply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Newsletter Signup */}
        <Animated.View 
          style={styles.newsletterContainer}
          entering={FadeInUp.delay(700).duration(600)}
        >
          <View style={styles.newsletterContent}>
            <Ionicons name="mail" size={40} color="#4A90E2" />
            <Text style={styles.newsletterTitle}>Never Miss an Update</Text>
            <Text style={styles.newsletterText}>
              Subscribe to our newsletter for the latest articles and insights
            </Text>
            <TouchableOpacity style={styles.newsletterButton}>
              <Text style={styles.newsletterButtonText}>Subscribe Now</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </ScrollView>
  );
}

// Add these missing imports
import { TextInput } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  headerImage: {
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
  contentContainer: {
    padding: 24,
    paddingTop: 0,
  },
  articleHeader: {
    marginTop: -40,
    backgroundColor: '#0A0A0A',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
    marginTop: 16,
    marginBottom: 20,
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  authorName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  metaText: {
    color: '#888',
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  actionButton: {
    alignItems: 'center',
    gap: 4,
  },
  actionCount: {
    color: '#888',
    fontSize: 12,
  },
  articleContent: {
    marginBottom: 32,
  },
  paragraph: {
    color: '#888',
    fontSize: 16,
    lineHeight: 28,
    marginBottom: 24,
  },
  subheading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tagsContainer: {
    marginBottom: 32,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  relatedContainer: {
    marginBottom: 32,
  },
  relatedList: {
    gap: 12,
  },
  relatedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
  },
  relatedInfo: {
    flex: 1,
  },
  relatedTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  relatedReadTime: {
    color: '#888',
    fontSize: 14,
  },
  authorContainer: {
    marginBottom: 32,
  },
  authorBio: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 16,
  },
  bioAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  bioAvatarText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  bioContent: {
    flex: 1,
  },
  bioName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bioText: {
    color: '#888',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  followButton: {
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4A90E2',
    alignSelf: 'flex-start',
  },
  followButtonText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '500',
  },
  commentsContainer: {
    marginBottom: 32,
  },
  commentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  viewAllText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: '500',
  },
  commentForm: {
    marginBottom: 24,
  },
  commentInputContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    marginBottom: 12,
  },
  commentInput: {
    padding: 16,
    color: 'white',
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  postButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  postButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentCard: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  commenterAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#50C878',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  commenterAvatarText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  commenterName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  commentTime: {
    color: '#888',
    fontSize: 12,
  },
  commentText: {
    color: '#888',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  commentAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  commentActionText: {
    color: '#888',
    fontSize: 14,
  },
  newsletterContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 30,
    marginBottom: 50,
    alignItems: 'center',
  },
  newsletterContent: {
    alignItems: 'center',
  },
  newsletterTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  newsletterText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  newsletterButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
  },
  newsletterButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});