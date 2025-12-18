// import React, { useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   Alert,
//   RefreshControl,
//   Dimensions,
//   Animated as RNAnimated,
//   Platform,
//   // eslint-disable-next-line import/no-duplicates
//   TextInput } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useRouter } from 'expo-router';
// import Animated, {
//   FadeInUp,
//   FadeInRight,
//   SlideInLeft,
//   useSharedValue,
//   useAnimatedStyle,
//   interpolate,
//   Extrapolate,
//   useAnimatedScrollHandler} from 'react-native-reanimated';
// import { Ionicons } from '@expo/vector-icons';
// import { BlurView } from 'expo-blur';
// import * as Haptics from 'expo-haptics';

// // Add missing imports


// const { width } = Dimensions.get('window');
// const HEADER_HEIGHT = 280;
// const HEADER_MIN_HEIGHT = 80;

// const articles = [
//   {
//     id: 1,
//     title: 'The Future of Mobile Development in 2024',
//     excerpt: 'Exploring the latest trends in React Native, Flutter, and mobile app development for the upcoming year.',
//     category: 'Technology',
//     date: '2 hours ago',
//     readTime: '5 min read',
//     image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&q=80',
//     featured: true,
//     author: 'Alex Johnson',
//     authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
//     likes: 124,
//     comments: 28
//   },
//   {
//     id: 2,
//     title: 'UI/UX Design Trends That Will Dominate 2024',
//     excerpt: 'Discover the most innovative design patterns and user experience improvements that will shape digital products.',
//     category: 'Design',
//     date: '1 day ago',
//     readTime: '4 min read',
//     image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
//     featured: false,
//     author: 'Sarah Chen',
//     authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80',
//     likes: 89,
//     comments: 15
//   },
//   {
//     id: 3,
//     title: 'Performance Optimization Techniques for Modern Apps',
//     excerpt: 'Advanced strategies and tools to make your React Native applications faster, smoother, and more efficient.',
//     category: 'Development',
//     date: '2 days ago',
//     readTime: '6 min read',
//     image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
//     featured: false,
//     author: 'Michael Wong',
//     authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
//     likes: 156,
//     comments: 42
//   },
//   {
//     id: 4,
//     title: 'State Management Best Practices in 2024',
//     excerpt: 'Comparing Redux, MobX, Zustand, and Context API for large-scale React applications.',
//     category: 'Development',
//     date: '3 days ago',
//     readTime: '7 min read',
//     image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
//     featured: false,
//     author: 'Emma Wilson',
//     authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
//     likes: 203,
//     comments: 56
//   },
//   {
//     id: 5,
//     title: 'Mastering Complex Animations in React Native',
//     excerpt: 'Learn how to create stunning animations using Reanimated 2, Lottie, and other modern animation libraries.',
//     category: 'Design',
//     date: '1 week ago',
//     readTime: '8 min read',
//     image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
//     featured: false,
//     author: 'David Lee',
//     authorAvatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005-128?w=200&q=80',
//     likes: 178,
//     comments: 31
//   },
//   {
//     id: 6,
//     title: 'The Rise of AI-Powered Development Tools',
//     excerpt: 'How artificial intelligence is transforming the way developers work and create applications.',
//     category: 'Technology',
//     date: '3 hours ago',
//     readTime: '6 min read',
//     image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
//     featured: true,
//     author: 'Rachel Green',
//     authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
//     likes: 245,
//     comments: 67
//   }
// ];

// const categories = [
//   { id: 'all', name: 'All', icon: 'grid' },
//   { id: 'tech', name: 'Technology', icon: 'hardware-chip' },
//   { id: 'design', name: 'Design', icon: 'color-palette' },
//   { id: 'dev', name: 'Development', icon: 'code-slash' },
//   { id: 'business', name: 'Business', icon: 'trending-up' },
//   { id: 'startup', name: 'Startup', icon: 'rocket' },
//   { id: 'ai', name: 'AI', icon: 'sparkles' },
//   { id: 'mobile', name: 'Mobile', icon: 'phone-portrait' }
// ];

// const featuredArticles = articles.filter(article => article.featured);
// const trendingTopics = [
//   { tag: '#ReactNative', posts: 245 },
//   { tag: '#UIUX', posts: 189 },
//   { tag: '#Web3', posts: 156 },
//   { tag: '#AI', posts: 342 },
//   { tag: '#Startup', posts: 98 }
// ];

// export default function NewsScreen() {
//   const router = useRouter();
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [refreshing, setRefreshing] = useState(false);
//   const [savedArticles, setSavedArticles] = useState<number[]>([]);
//   const [likedArticles, setLikedArticles] = useState<number[]>([]);
  
//   const scrollY = useSharedValue(0);
//   const headerHeight = useSharedValue(HEADER_HEIGHT);
//   const headerOpacity = useSharedValue(1);
//   const featuredScrollX = useRef(new RNAnimated.Value(0)).current;

//   const onRefresh = React.useCallback(() => {
//     setRefreshing(true);
//     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//     setTimeout(() => {
//       setRefreshing(false);
//       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
//     }, 2000);
//   }, []);

//   const scrollHandler = useAnimatedScrollHandler({
//     onScroll: (event) => {
//       scrollY.value = event.contentOffset.y;
//       headerHeight.value = interpolate(
//         scrollY.value,
//         [0, HEADER_HEIGHT - HEADER_MIN_HEIGHT],
//         [HEADER_HEIGHT, HEADER_MIN_HEIGHT],
//         Extrapolate.CLAMP
//       );
//       headerOpacity.value = interpolate(
//         scrollY.value,
//         [0, HEADER_HEIGHT - HEADER_MIN_HEIGHT],
//         [1, 0.5],
//         Extrapolate.CLAMP
//       );
//     },
//   });

//   const headerStyle = useAnimatedStyle(() => ({
//     height: headerHeight.value,
//     opacity: headerOpacity.value,
//   }));

//   const titleStyle = useAnimatedStyle(() => ({
//     fontSize: interpolate(
//       scrollY.value,
//       [0, HEADER_HEIGHT - HEADER_MIN_HEIGHT],
//       [32, 20],
//       Extrapolate.CLAMP
//     ),
//     transform: [
//       {
//         translateY: interpolate(
//           scrollY.value,
//           [0, HEADER_HEIGHT - HEADER_MIN_HEIGHT],
//           [0, -20],
//           Extrapolate.CLAMP
//         )
//       }
//     ]
//   }));

//   const handleCategoryPress = (categoryId: string) => {
//     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//     setSelectedCategory(categoryId);
//   };

//   const handleArticlePress = (articleId: number) => {
//     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
//     router.push(`/screens/article-detail/${articleId}` as any);
//   };

//   const handleSaveArticle = (articleId: number) => {
//     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//     setSavedArticles(prev => 
//       prev.includes(articleId) 
//         ? prev.filter(id => id !== articleId)
//         : [...prev, articleId]
//     );
//   };

//   const handleLikeArticle = (articleId: number) => {
//     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//     setLikedArticles(prev => 
//       prev.includes(articleId) 
//         ? prev.filter(id => id !== articleId)
//         : [...prev, articleId]
//     );
//   };

//   const handleTrendingTopicPress = (topic: string) => {
//     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//     setSelectedCategory('all');
//     // In a real app, you would filter articles by topic
//     Alert.alert(`Searching for ${topic}`, 'Filtering articles by this topic...');
//   };

//   const filteredArticles = selectedCategory === 'all' 
//     ? articles 
//     : articles.filter(article => 
//         article.category.toLowerCase() === selectedCategory ||
//         (selectedCategory === 'tech' && article.category === 'Technology') ||
//         (selectedCategory === 'dev' && article.category === 'Development')
//       );

//   const featuredCardScale = (index: number) => {
//     return featuredScrollX.interpolate({
//       inputRange: [
//         (index - 1) * width * 0.8,
//         index * width * 0.8,
//         (index + 1) * width * 0.8,
//       ],
//       outputRange: [0.9, 1, 0.9],
//       extrapolate: 'clamp',
//     });
//   };

//   const renderFeaturedArticles = () => {
//     return (
//       <View style={styles.featuredSection}>
//         <View style={styles.sectionHeader}>
//           <View style={styles.sectionTitleContainer}>
//             <LinearGradient
//               colors={['#FF6B6B', '#FF8E8E']}
//               style={styles.sectionIcon}
//             >
//               <Ionicons name="flame" size={24} color="white" />
//             </LinearGradient>
//             <View>
//               <Text style={styles.sectionTitle}>Featured Stories</Text>
//               <Text style={styles.sectionSubtitle}>Top trending articles of the week</Text>
//             </View>
//           </View>
//         </View>

//         <RNAnimated.ScrollView
//           horizontal
//           pagingEnabled
//           showsHorizontalScrollIndicator={false}
//           snapToInterval={width * 0.8}
//           decelerationRate="fast"
//           onScroll={RNAnimated.event(
//             [{ nativeEvent: { contentOffset: { x: featuredScrollX } } }],
//             { useNativeDriver: true }
//           )}
//           scrollEventThrottle={16}
//           style={styles.featuredScroll}
//           contentContainerStyle={styles.featuredScrollContent}
//         >
//           {featuredArticles.map((article, index) => (
//             <RNAnimated.View
//               key={article.id}
//               style={[
//                 styles.featuredCardWrapper,
//                 {
//                   transform: [{ scale: featuredCardScale(index) }],
//                 },
//               ]}
//             >
//               <TouchableOpacity
//                 style={styles.featuredCard}
//                 onPress={() => handleArticlePress(article.id)}
//                 activeOpacity={0.95}
//               >
//                 <Image
//                   source={{ uri: article.image }}
//                   style={styles.featuredImage}
//                   resizeMode="cover"
//                 />
                
//                 <LinearGradient
//                   colors={['transparent', 'rgba(0,0,0,0.8)']}
//                   style={styles.featuredGradient}
//                 />
                
//                 <View style={styles.featuredBadge}>
//                   <LinearGradient
//                     colors={['#FF6B6B', '#FF8E8E']}
//                     style={styles.featuredBadgeGradient}
//                   >
//                     <Ionicons name="star" size={12} color="white" />
//                     <Text style={styles.featuredBadgeText}>Featured</Text>
//                   </LinearGradient>
//                 </View>

//                 <View style={styles.featuredContent}>
//                   <View style={styles.featuredCategoryContainer}>
//                     <View style={styles.categoryTag}>
//                       <Text style={styles.categoryTagText}>{article.category}</Text>
//                     </View>
//                     <Text style={styles.featuredDate}>{article.date}</Text>
//                   </View>
                  
//                   <Text style={styles.featuredTitle}>{article.title}</Text>
//                   <Text style={styles.featuredExcerpt}>{article.excerpt}</Text>
                  
//                   <View style={styles.featuredFooter}>
//                     <View style={styles.authorContainer}>
//                       <Image
//                         source={{ uri: article.authorAvatar }}
//                         style={styles.authorAvatar}
//                       />
//                       <Text style={styles.authorName}>{article.author}</Text>
//                     </View>
                    
//                     <View style={styles.statsContainer}>
//                       <View style={styles.stat}>
//                         <Ionicons 
//                           name={likedArticles.includes(article.id) ? "heart" : "heart-outline"} 
//                           size={16} 
//                           color={likedArticles.includes(article.id) ? "#FF6B6B" : "white"} 
//                         />
//                         <Text style={styles.statText}>{article.likes}</Text>
//                       </View>
//                       <View style={styles.stat}>
//                         <Ionicons name="chatbubble-outline" size={16} color="white" />
//                         <Text style={styles.statText}>{article.comments}</Text>
//                       </View>
//                       <View style={styles.stat}>
//                         <Ionicons name="time-outline" size={16} color="white" />
//                         <Text style={styles.statText}>{article.readTime}</Text>
//                       </View>
//                     </View>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             </RNAnimated.View>
//           ))}
//         </RNAnimated.ScrollView>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {/* Animated Header */}
//       <Animated.View style={[styles.header, headerStyle]}>
//         <Image
//           source={{ uri: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&q=80' }}
//           style={styles.headerBackground}
//           blurRadius={20}
//         />
//         <BlurView intensity={80} tint="dark" style={styles.blurOverlay} />
        
//         <LinearGradient
//           colors={['rgba(10, 10, 10, 0.8)', 'transparent']}
//           style={styles.headerGradient}
//         />
        
//         <View style={styles.headerContent}>
//           <Animated.Text style={[styles.headerTitle, titleStyle]}>
//             Latest News
//           </Animated.Text>
//           <Animated.Text 
//             style={styles.headerSubtitle}
//             entering={FadeInUp.delay(200).duration(800)}
//           >
//             Stay ahead with cutting-edge insights and trends
//           </Animated.Text>
          
//           <View style={styles.headerActions}>
//             <TouchableOpacity 
//               style={styles.searchButton}
//               onPress={() => router.push('/search' as any)}
//             >
//               <Ionicons name="search" size={20} color="white" />
//               <Text style={styles.searchText}>Search articles...</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               style={styles.notificationButton}
//               onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
//             >
//               <Ionicons name="notifications-outline" size={24} color="white" />
//               <View style={styles.notificationBadge}>
//                 <Text style={styles.notificationBadgeText}>3</Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Animated.View>

//       <Animated.ScrollView 
//         style={styles.scrollContainer}
//         showsVerticalScrollIndicator={false}
//         onScroll={scrollHandler}
//         scrollEventThrottle={16}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             tintColor="#4F46E5"
//             colors={['#4F46E5', '#8B5CF6']}
//             progressBackgroundColor="#1A1A1A"
//           />
//         }
//       >
//         <View style={styles.content}>
//           {/* Featured Articles Carousel */}
//           {renderFeaturedArticles()}

//           {/* Category Filter */}
//           <Animated.View 
//             style={styles.categorySection}
//             entering={FadeInRight.delay(400).duration(600)}
//           >
//             <ScrollView 
//               horizontal 
//               showsHorizontalScrollIndicator={false}
//               style={styles.categoryScroll}
//               contentContainerStyle={styles.categoryScrollContent}
//             >
//               {categories.map((category, index) => (
//                 <TouchableOpacity
//                   key={category.id}
//                   onPress={() => handleCategoryPress(category.id)}
//                 >
//                   <Animated.View
//                     entering={SlideInLeft.delay(500 + index * 50).duration(400)}
//                   >
//                     <LinearGradient
//                       colors={
//                         selectedCategory === category.id 
//                           ? ['#4F46E5', '#7C3AED'] 
//                           : ['#1A1A1A', '#2A2A2A']
//                       }
//                       style={[
//                         styles.categoryChip,
//                         selectedCategory === category.id && styles.selectedCategoryChip
//                       ]}
//                     >
//                       <Ionicons 
//                         name={category.icon as any} 
//                         size={18} 
//                         color={selectedCategory === category.id ? 'white' : '#888'} 
//                       />
//                       <Text style={[
//                         styles.categoryText,
//                         selectedCategory === category.id && styles.selectedCategoryText
//                       ]}>
//                         {category.name}
//                       </Text>
//                     </LinearGradient>
//                   </Animated.View>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//           </Animated.View>

//           {/* Trending Topics */}
//           <Animated.View
//             style={styles.trendingSection}
//             entering={FadeInUp.delay(600).duration(600)}
//           >
//             <View style={styles.sectionHeader}>
//               <View style={styles.sectionTitleContainer}>
//                 <LinearGradient
//                   colors={['#10B981', '#34D399']}
//                   style={styles.sectionIcon}
//                 >
//                   <Ionicons name="trending-up" size={24} color="white" />
//                 </LinearGradient>
//                 <View>
//                   <Text style={styles.sectionTitle}>Trending Topics</Text>
//                   <Text style={styles.sectionSubtitle}>What&apos;s hot right now</Text>
//                 </View>
//               </View>
//             </View>
            
//             <ScrollView 
//               horizontal 
//               showsHorizontalScrollIndicator={false}
//               style={styles.trendingScroll}
//               contentContainerStyle={styles.trendingContent}
//             >
//               {trendingTopics.map((topic, index) => (
//                 <Animated.View
//                   key={topic.tag}
//                   entering={SlideInLeft.delay(700 + index * 100).duration(500)}
//                 >
//                   <TouchableOpacity 
//                     style={styles.trendingTag}
//                     onPress={() => handleTrendingTopicPress(topic.tag)}
//                     activeOpacity={0.9}
//                   >
//                     <Text style={styles.trendingTagText}>{topic.tag}</Text>
//                     <Text style={styles.trendingPosts}>{topic.posts} posts</Text>
//                   </TouchableOpacity>
//                 </Animated.View>
//               ))}
//             </ScrollView>
//           </Animated.View>

//           {/* Latest Articles Grid */}
//           <Animated.View
//             style={styles.articlesSection}
//             entering={FadeInUp.delay(800).duration(600)}
//           >
//             <View style={styles.sectionHeader}>
//               <View style={styles.sectionTitleContainer}>
//                 <LinearGradient
//                   colors={['#8B5CF6', '#A78BFA']}
//                   style={styles.sectionIcon}
//                 >
//                   <Ionicons name="newspaper" size={24} color="white" />
//                 </LinearGradient>
//                 <View>
//                   <Text style={styles.sectionTitle}>Latest Articles</Text>
//                   <Text style={styles.sectionSubtitle}>
//                     {filteredArticles.length} articles found
//                   </Text>
//                 </View>
//               </View>
              
//               <TouchableOpacity 
//                 style={styles.viewToggle}
//                 onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
//               >
//                 <Ionicons name="grid" size={20} color="#4F46E5" />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.articlesGrid}>
//               {filteredArticles.map((article, index) => (
//                 <Animated.View
//                   key={article.id}
//                   entering={FadeInUp.delay(900 + index * 100).duration(600)}
//                   style={styles.articleCardWrapper}
//                 >
//                   <TouchableOpacity
//                     style={styles.articleCard}
//                     onPress={() => handleArticlePress(article.id)}
//                     activeOpacity={0.95}
//                   >
//                     <Image
//                       source={{ uri: article.image }}
//                       style={styles.articleImage}
//                       resizeMode="cover"
//                     />
                    
//                     <LinearGradient
//                       colors={['transparent', 'rgba(0,0,0,0.3)']}
//                       style={styles.articleImageOverlay}
//                     />
                    
//                     <TouchableOpacity
//                       style={styles.saveButton}
//                       onPress={() => handleSaveArticle(article.id)}
//                     >
//                       <Ionicons 
//                         name={savedArticles.includes(article.id) ? "bookmark" : "bookmark-outline"} 
//                         size={20} 
//                         color={savedArticles.includes(article.id) ? "#4F46E5" : "white"} 
//                       />
//                     </TouchableOpacity>
                    
//                     <View style={styles.articleContent}>
//                       <View style={styles.articleHeader}>
//                         <View style={styles.articleCategory}>
//                           <Text style={styles.articleCategoryText}>{article.category}</Text>
//                         </View>
//                         <Text style={styles.articleDate}>{article.date}</Text>
//                       </View>
                      
//                       <Text style={styles.articleTitle} numberOfLines={2}>
//                         {article.title}
//                       </Text>
                      
//                       <Text style={styles.articleExcerpt} numberOfLines={2}>
//                         {article.excerpt}
//                       </Text>
                      
//                       <View style={styles.articleFooter}>
//                         <View style={styles.articleAuthor}>
//                           <Image
//                             source={{ uri: article.authorAvatar }}
//                             style={styles.articleAuthorAvatar}
//                           />
//                           <Text style={styles.articleAuthorName}>{article.author}</Text>
//                         </View>
                        
//                         <View style={styles.articleActions}>
//                           <TouchableOpacity 
//                             style={styles.likeButton}
//                             onPress={() => handleLikeArticle(article.id)}
//                           >
//                             <Ionicons 
//                               name={likedArticles.includes(article.id) ? "heart" : "heart-outline"} 
//                               size={16} 
//                               color={likedArticles.includes(article.id) ? "#FF6B6B" : "#888"} 
//                             />
//                             <Text style={[
//                               styles.likeCount,
//                               likedArticles.includes(article.id) && styles.likedCount
//                             ]}>
//                               {article.likes}
//                             </Text>
//                           </TouchableOpacity>
                          
//                           <View style={styles.readTime}>
//                             <Ionicons name="time-outline" size={14} color="#888" />
//                             <Text style={styles.readTimeText}>{article.readTime}</Text>
//                           </View>
//                         </View>
//                       </View>
//                     </View>
//                   </TouchableOpacity>
//                 </Animated.View>
//               ))}
//             </View>
//           </Animated.View>

//           {/* Newsletter Signup */}
//           <Animated.View
//             style={styles.newsletterSection}
//             entering={FadeInUp.delay(1000).duration(600)}
//           >
//             <LinearGradient
//               colors={['#1A1A1A', '#2A2A2A']}
//               style={styles.newsletterCard}
//             >
//               <View style={styles.newsletterIconContainer}>
//                 <LinearGradient
//                   colors={['#4F46E5', '#8B5CF6']}
//                   style={styles.newsletterIconBg}
//                 >
//                   <Ionicons name="mail" size={40} color="white" />
//                 </LinearGradient>
//               </View>
              
//               <Text style={styles.newsletterTitle}>Stay Updated</Text>
//               <Text style={styles.newsletterSubtitle}>
//                 Get the latest tech news, insights, and trends delivered to your inbox
//               </Text>
              
//               <View style={styles.newsletterForm}>
//                 <View style={styles.emailInputContainer}>
//                   <Ionicons name="mail-outline" size={20} color="#888" />
//                   <TextInput
//                     placeholder="Enter your email address"
//                     placeholderTextColor="#666"
//                     style={styles.emailInput}
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                   />
//                 </View>
                
//                 <TouchableOpacity 
//                   style={styles.subscribeButton}
//                   onPress={() => {
//                     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
//                     Alert.alert('Subscribed!', 'You will receive our newsletter updates.');
//                   }}
//                 >
//                   <LinearGradient
//                     colors={['#4F46E5', '#7C3AED']}
//                     style={styles.subscribeButtonGradient}
//                   >
//                     <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
//                     <Ionicons name="arrow-forward" size={20} color="white" />
//                   </LinearGradient>
//                 </TouchableOpacity>
//               </View>
              
//               <Text style={styles.newsletterDisclaimer}>
//                 No spam ever. Unsubscribe at any time.
//               </Text>
//             </LinearGradient>
//           </Animated.View>

//           {/* Recommended Authors */}
//           <Animated.View
//             style={styles.authorsSection}
//             entering={FadeInUp.delay(1200).duration(600)}
//           >
//             <View style={styles.sectionHeader}>
//               <View style={styles.sectionTitleContainer}>
//                 <LinearGradient
//                   colors={['#EC4899', '#F472B6']}
//                   style={styles.sectionIcon}
//                 >
//                   <Ionicons name="people" size={24} color="white" />
//                 </LinearGradient>
//                 <View>
//                   <Text style={styles.sectionTitle}>Top Authors</Text>
//                   <Text style={styles.sectionSubtitle}>Follow industry experts</Text>
//                 </View>
//               </View>
//             </View>
            
//             <ScrollView 
//               horizontal 
//               showsHorizontalScrollIndicator={false}
//               style={styles.authorsScroll}
//               contentContainerStyle={styles.authorsContent}
//             >
//               {[...new Set(articles.map(a => a.author))].slice(0, 5).map((author, index) => (
//                 <Animated.View
//                   key={author}
//                   entering={SlideInLeft.delay(1300 + index * 100).duration(500)}
//                 >
//                   <TouchableOpacity style={styles.authorCard}>
//                     <Image
//                       source={{ uri: articles.find(a => a.author === author)?.authorAvatar || '' }}
//                       style={styles.authorAvatar}
//                     />
//                     <Text style={styles.authorName}>{author}</Text>
//                     <Text style={styles.authorRole}>Tech Writer</Text>
//                     <TouchableOpacity style={styles.followButton}>
//                       <Text style={styles.followButtonText}>Follow</Text>
//                     </TouchableOpacity>
//                   </TouchableOpacity>
//                 </Animated.View>
//               ))}
//             </ScrollView>
//           </Animated.View>
//         </View>
//       </Animated.ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0A0A0A',
//   },
//   scrollContainer: {
//     flex: 1,
//   },
//   header: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     zIndex: 100,
//     overflow: 'hidden',
//   },
//   headerBackground: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     opacity: 0.7,
//   },
//   blurOverlay: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   headerGradient: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 100,
//   },
//   headerContent: {
//     flex: 1,
//     paddingTop: Platform.OS === 'ios' ? 50 : 30,
//     paddingHorizontal: 24,
//     justifyContent: 'flex-end',
//     paddingBottom: 20,
//   },
//   headerTitle: {
//     fontSize: 32,
//     fontWeight: '800',
//     color: 'white',
//     marginBottom: 8,
//     letterSpacing: 0.5,
//   },
//   headerSubtitle: {
//     fontSize: 16,
//     color: 'rgba(255, 255, 255, 0.8)',
//     marginBottom: 24,
//   },
//   headerActions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//   },
//   searchButton: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderRadius: 12,
//     gap: 8,
//   },
//   searchText: {
//     color: 'rgba(255, 255, 255, 0.6)',
//     fontSize: 14,
//   },
//   notificationButton: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   notificationBadge: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//     backgroundColor: '#FF6B6B',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   notificationBadgeText: {
//     color: 'white',
//     fontSize: 10,
//     fontWeight: '700',
//   },
//   content: {
//     paddingTop: HEADER_HEIGHT,
//   },
//   featuredSection: {
//     marginBottom: 24,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     paddingHorizontal: 24,
//     marginBottom: 16,
//   },
//   sectionTitleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   sectionIcon: {
//     width: 48,
//     height: 48,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 16,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '800',
//     color: 'white',
//     marginBottom: 4,
//   },
//   sectionSubtitle: {
//     fontSize: 14,
//     color: '#888',
//     lineHeight: 20,
//   },
//   featuredScroll: {
//     marginHorizontal: -24,
//   },
//   featuredScrollContent: {
//     paddingHorizontal: 24,
//     paddingRight: 8,
//   },
//   featuredCardWrapper: {
//     width: width * 0.8,
//     marginRight: 16,
//     borderRadius: 24,
//     overflow: 'hidden',
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 8 },
//         shadowOpacity: 0.3,
//         shadowRadius: 16,
//       },
//       android: {
//         elevation: 12,
//       },
//     }),
//   },
//   featuredCard: {
//     height: 400,
//     borderRadius: 24,
//     overflow: 'hidden',
//     position: 'relative',
//   },
//   featuredImage: {
//     width: '100%',
//     height: '100%',
//   },
//   featuredGradient: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 200,
//   },
//   featuredBadge: {
//     position: 'absolute',
//     top: 20,
//     left: 20,
//     zIndex: 2,
//   },
//   featuredBadgeGradient: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 8,
//     gap: 4,
//   },
//   featuredBadgeText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: '700',
//   },
//   featuredContent: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     padding: 24,
//   },
//   featuredCategoryContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   categoryTag: {
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 8,
//   },
//   categoryTagText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   featuredDate: {
//     color: 'rgba(255, 255, 255, 0.8)',
//     fontSize: 12,
//   },
//   featuredTitle: {
//     fontSize: 24,
//     fontWeight: '800',
//     color: 'white',
//     marginBottom: 12,
//     lineHeight: 30,
//   },
//   featuredExcerpt: {
//     fontSize: 16,
//     color: 'rgba(255, 255, 255, 0.9)',
//     lineHeight: 24,
//     marginBottom: 20,
//   },
//   featuredFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   authorContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   authorAvatar: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//   },
//   authorName: {
//     color: 'white',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     gap: 16,
//   },
//   stat: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//   },
//   statText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   categorySection: {
//     marginBottom: 24,
//   },
//   categoryScroll: {
//     marginHorizontal: -24,
//   },
//   categoryScrollContent: {
//     paddingHorizontal: 24,
//     paddingRight: 8,
//   },
//   categoryChip: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     borderRadius: 25,
//     marginRight: 12,
//     borderWidth: 1,
//     borderColor: '#333',
//     gap: 8,
//   },
//   selectedCategoryChip: {
//     borderColor: '#4F46E5',
//     ...Platform.select({
//       ios: {
//         shadowColor: '#4F46E5',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.3,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 6,
//       },
//     }),
//   },
//   categoryText: {
//     color: '#888',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   selectedCategoryText: {
//     color: 'white',
//   },
//   trendingSection: {
//     marginBottom: 24,
//   },
//   trendingScroll: {
//     marginHorizontal: -24,
//   },
//   trendingContent: {
//     paddingHorizontal: 24,
//     paddingRight: 8,
//   },
//   trendingTag: {
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     backgroundColor: '#1A1A1A',
//     borderRadius: 16,
//     marginRight: 12,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#333',
//     minWidth: 120,
//   },
//   trendingTagText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '700',
//     marginBottom: 4,
//   },
//   trendingPosts: {
//     color: '#888',
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   articlesSection: {
//     paddingHorizontal: 24,
//     marginBottom: 24,
//   },
//   viewToggle: {
//     width: 44,
//     height: 44,
//     borderRadius: 12,
//     backgroundColor: 'rgba(79, 70, 229, 0.1)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   articlesGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   articleCardWrapper: {
//     width: (width - 48 - 12) / 2,
//     marginBottom: 16,
//     borderRadius: 20,
//     overflow: 'hidden',
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.2,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 6,
//       },
//     }),
//   },
//   articleCard: {
//     backgroundColor: '#1A1A1A',
//     borderRadius: 20,
//     overflow: 'hidden',
//     height: 320,
//     position: 'relative',
//   },
//   articleImage: {
//     width: '100%',
//     height: 150,
//   },
//   articleImageOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 150,
//   },
//   saveButton: {
//     position: 'absolute',
//     top: 12,
//     right: 12,
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   articleContent: {
//     padding: 16,
//     flex: 1,
//     justifyContent: 'space-between',
//   },
//   articleHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   articleCategory: {
//     backgroundColor: 'rgba(79, 70, 229, 0.1)',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 6,
//   },
//   articleCategoryText: {
//     color: '#8B5CF6',
//     fontSize: 10,
//     fontWeight: '700',
//   },
//   articleDate: {
//     color: '#888',
//     fontSize: 10,
//   },
//   articleTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: 'white',
//     marginBottom: 8,
//     lineHeight: 22,
//   },
//   articleExcerpt: {
//     fontSize: 12,
//     color: '#888',
//     lineHeight: 18,
//     marginBottom: 16,
//     flex: 1,
//   },
//   articleFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   articleAuthor: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 6,
//   },
//   articleAuthorAvatar: {
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//   },
//   articleAuthorName: {
//     color: '#888',
//     fontSize: 10,
//     fontWeight: '500',
//   },
//   articleActions: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   likeButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//   },
//   likeCount: {
//     color: '#888',
//     fontSize: 10,
//     fontWeight: '500',
//   },
//   likedCount: {
//     color: '#FF6B6B',
//   },
//   readTime: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//   },
//   readTimeText: {
//     color: '#888',
//     fontSize: 10,
//     fontWeight: '500',
//   },
//   newsletterSection: {
//     paddingHorizontal: 24,
//     marginBottom: 32,
//   },
//   newsletterCard: {
//     borderRadius: 24,
//     padding: 32,
//     alignItems: 'center',
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 8 },
//         shadowOpacity: 0.3,
//         shadowRadius: 16,
//       },
//       android: {
//         elevation: 12,
//       },
//     }),
//   },
//   newsletterIconContainer: {
//     marginBottom: 24,
//   },
//   newsletterIconBg: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   newsletterTitle: {
//     fontSize: 28,
//     fontWeight: '800',
//     color: 'white',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   newsletterSubtitle: {
//     fontSize: 16,
//     color: '#888',
//     textAlign: 'center',
//     marginBottom: 32,
//     lineHeight: 24,
//   },
//   newsletterForm: {
//     width: '100%',
//     marginBottom: 20,
//   },
//   emailInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#0A0A0A',
//     borderRadius: 16,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     marginBottom: 16,
//     borderWidth: 2,
//     borderColor: '#333',
//   },
//   emailInput: {
//     flex: 1,
//     color: 'white',
//     fontSize: 16,
//     marginLeft: 12,
//   },
//   subscribeButton: {
//     borderRadius: 16,
//     overflow: 'hidden',
//   },
//   subscribeButtonGradient: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 16,
//     paddingHorizontal: 24,
//     borderRadius: 16,
//     gap: 8,
//   },
//   subscribeButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '700',
//   },
//   newsletterDisclaimer: {
//     fontSize: 12,
//     color: '#666',
//     textAlign: 'center',
//   },
//   authorsSection: {
//     marginBottom: 32,
//   },
//   authorsScroll: {
//     marginHorizontal: -24,
//   },
//   authorsContent: {
//     paddingHorizontal: 24,
//     paddingRight: 8,
//   },
//   authorCard: {
//     width: 150,
//     backgroundColor: '#1A1A1A',
//     borderRadius: 20,
//     padding: 20,
//     marginRight: 16,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#333',
//   },
//   // eslint-disable-next-line no-dupe-keys
//   authorAvatar: {
//     width: 64,
//     height: 64,
//     borderRadius: 32,
//     marginBottom: 12,
//   },
//   // eslint-disable-next-line no-dupe-keys
//   authorName: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: 'white',
//     marginBottom: 4,
//     textAlign: 'center',
//   },
//   authorRole: {
//     fontSize: 12,
//     color: '#888',
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   followButton: {
//     paddingHorizontal: 20,
//     paddingVertical: 8,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#4F46E5',
//     backgroundColor: 'rgba(79, 70, 229, 0.1)',
//   },
//   followButtonText: {
//     color: '#4F46E5',
//     fontSize: 14,
//     fontWeight: '600',
//   },
// });