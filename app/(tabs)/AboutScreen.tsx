import{ useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  StatusBar,
 
  Linking
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  FadeInUp,
  FadeInRight,
  SlideInLeft,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useAnimatedScrollHandler,

  useAnimatedRef
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

const teamMembers = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'CEO & Founder',
    description: '10+ years in tech industry, former Google PM',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    experience: '12 years',
    projects: '50+',
    skills: ['Strategy', 'Leadership', 'AI'],
    social: {
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Lead Designer',
    description: 'Award-winning UX designer, Adobe Creative Ambassador',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    experience: '8 years',
    projects: '120+',
    skills: ['UI/UX', 'Research', 'Branding'],
    social: {
      linkedin: '#',
      dribbble: '#'
    }
  },
  {
    id: 3,
    name: 'Marcus Lee',
    role: 'CTO',
    description: 'Expert in scalable systems, PhD in Computer Science',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w-400',
    experience: '10 years',
    projects: '80+',
    skills: ['Architecture', 'AI/ML', 'DevOps'],
    social: {
      linkedin: '#',
      github: '#'
    }
  },
  {
    id: 4,
    name: 'Elena Rodriguez',
    role: 'Product Manager',
    description: 'Product strategy expert, Stanford MBA',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
    experience: '9 years',
    projects: '60+',
    skills: ['Strategy', 'Analytics', 'Growth'],
    social: {
      linkedin: '#',
      medium: '#'
    }
  },
  {
    id: 5,
    name: 'David Park',
    role: 'Lead Developer',
    description: 'Full-stack wizard, open source contributor',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    experience: '7 years',
    projects: '90+',
    skills: ['React', 'Node.js', 'AWS'],
    social: {
      linkedin: '#',
      github: '#'
    }
  },
  {
    id: 6,
    name: 'Olivia Wilson',
    role: 'Creative Director',
    description: 'Brand storytelling expert, former Disney creative',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    experience: '11 years',
    projects: '150+',
    skills: ['Branding', 'Animation', '3D'],
    social: {
      linkedin: '#',
      behance: '#'
    }
  }
];

const milestones = [
  { 
    year: '2018', 
    title: 'Company Founded', 
    description: 'Started with 3 team members in a small garage',
    icon: 'rocket',
    color: '#6366f1'
  },
  { 
    year: '2019', 
    title: 'First Major Client', 
    description: 'Secured enterprise contract with Fortune 500 company',
    icon: 'trophy',
    color: '#10b981'
  },
  { 
    year: '2020', 
    title: 'Mobile App Launch', 
    description: 'Released flagship product with 100K+ downloads',
    icon: 'smartphone',
    color: '#f59e0b'
  },
  { 
    year: '2021', 
    title: 'Team Expansion', 
    description: 'Grew to 20+ employees, opened new office',
    icon: 'users',
    color: '#8b5cf6'
  },
  { 
    year: '2022', 
    title: 'International Reach', 
    description: 'Served clients in 10+ countries worldwide',
    icon: 'globe',
    color: '#ef4444'
  },
  { 
    year: '2023', 
    title: 'Award Recognition', 
    description: 'Won "Best Mobile App" award at Tech Awards',
    icon: 'award',
    color: '#ec4899'
  },
];

const values = [
  { 
    icon: '💡', 
    title: 'Innovation', 
    desc: 'Always pushing boundaries with cutting-edge solutions',
    color: '#6366f1'
  },
  { 
    icon: '🤝', 
    title: 'Collaboration', 
    desc: 'Working together to achieve extraordinary results',
    color: '#10b981'
  },
  { 
    icon: '🎯', 
    title: 'Excellence', 
    desc: 'Delivering quality in everything we do',
    color: '#f59e0b'
  },
  { 
    icon: '❤️', 
    title: 'Passion', 
    desc: 'Love what we do, it shows in our work',
    color: '#ef4444'
  },
  { 
    icon: '🌱', 
    title: 'Growth', 
    desc: 'Continuous learning and improvement',
    color: '#8b5cf6'
  },
  { 
    icon: '🔒', 
    title: 'Integrity', 
    desc: 'Honest, transparent, and ethical in all dealings',
    color: '#06b6d4'
  },
];

export default function AboutScreen() {
  const router = useRouter();
  const scrollY = useSharedValue(0);
  const parallax = useSharedValue(0);
  const [activeValue, setActiveValue] = useState<number | null>(null);
  const [, setSelectedTeamMember] = useState<number | null>(null);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
      parallax.value = event.contentOffset.y;
    },
  });

  const parallaxStyle = useAnimatedStyle(() => ({
    transform: [{
      translateY: interpolate(
        parallax.value,
        [0, 300],
        [0, 150],
        Extrapolate.CLAMP
      )
    }]
  }));

  const fadeInStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [0, 200],
      [1, 0],
      Extrapolate.CLAMP
    ),
    transform: [{
      translateY: interpolate(
        scrollY.value,
        [0, 200],
        [0, 50],
        Extrapolate.CLAMP
      )
    }]
  }));

  const headerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 100], [0, 1]),
    transform: [{
      translateY: interpolate(scrollY.value, [0, 100], [-60, 0])
    }]
  }));

  const handleTeamMemberPress = (id: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedTeamMember(id);
  };

  const handleValueHover = (index: number | null) => {
    setActiveValue(index);
  };

  const stats = [
    { label: 'Projects', value: '50+', color: '#6366f1', icon: 'rocket' },
    { label: 'Happy Clients', value: '100+', color: '#10b981', icon: 'users' },
    { label: 'Team Members', value: '25+', color: '#f59e0b', icon: 'user-plus' },
    { label: 'Awards', value: '12', color: '#8b5cf6', icon: 'award' },
    { label: 'Countries', value: '15+', color: '#ef4444', icon: 'globe' },
    { label: 'Growth', value: '300%', color: '#ec4899', icon: 'trending-up' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />
      
      {/* Animated Header */}
      <Animated.View style={[styles.header, headerStyle]}>
        {/* <LinearGradient
          colors={['rgba(10,10,10,0.95)', 'rgba(26,26,26,0.95)']}
          style={styles.headerGradient}
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About Us</Text>
          <TouchableOpacity style={styles.headerAction}>
            <Feather name="share-2" size={20} color="#888" />
          </TouchableOpacity>
        </LinearGradient> */}
      </Animated.View>

      <Animated.ScrollView 
        ref={scrollRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Animated.View style={[styles.heroBackground, parallaxStyle]}>
            <LinearGradient
              colors={['#6366f1', '#8b5cf6', '#0A0A0A']}
              style={styles.heroGradient}
            />
          </Animated.View>
          
          <Animated.View 
            style={[styles.heroContent, fadeInStyle]}
            entering={FadeInUp.duration(800)}
          >
            <View style={styles.badge}>
              <MaterialIcons name="diamond" size={20} color="white" />
              <Text style={styles.badgeText}>Since 2018</Text>
            </View>
            
            <Text style={styles.heroTitle}>
              We Craft Digital{' '}
              <Text style={styles.gradientText}>Experiences</Text>
            </Text>
            
            <Text style={styles.heroSubtitle}>
              A passionate team of innovators, designers, and developers 
              creating cutting-edge solutions for global clients.
            </Text>
            
            <TouchableOpacity 
              style={styles.heroButton}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                scrollRef.current?.scrollTo({ y: 400, animated: true });
              }}
            >
              <Text style={styles.heroButtonText}>Explore Our Story</Text>
              <Feather name="arrow-down" size={20} color="white" />
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Mission Section */}
        <Animated.View 
          style={styles.missionSection}
          entering={FadeInUp.delay(200).duration(600)}
        >
          <LinearGradient
            colors={['#1A1A1A', '#262626']}
            style={styles.missionCard}
          >
            <View style={styles.missionIcon}>
              <MaterialIcons name="target" size={32} color="#6366f1" />
            </View>
            
            <Text style={styles.sectionTitle}>Our Mission</Text>
            
            <Text style={styles.missionText}>
              To revolutionize the way businesses interact with their customers through 
              cutting-edge digital solutions. We believe in creating technology that is 
              not only powerful but also intuitive, accessible, and delightful to use.
            </Text>
            
            <View style={styles.missionStats}>
              <View style={styles.missionStat}>
                <Feather name="eye" size={20} color="#6366f1" />
                <View style={styles.statContent}>
                  <Text style={styles.statNumber}>95%</Text>
                  <Text style={styles.statLabel}>Client Retention</Text>
                </View>
              </View>
              
              <View style={styles.missionDivider} />
              
              <View style={styles.missionStat}>
                <Feather name="clock" size={20} color="#10b981" />
                <View style={styles.statContent}>
                  <Text style={styles.statNumber}>24/7</Text>
                  <Text style={styles.statLabel}>Support</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Stats Grid */}
        <Animated.View 
          style={styles.statsSection}
          entering={SlideInLeft.delay(300).duration(600)}
        >
          <Text style={styles.sectionTitle}>By The Numbers</Text>
          
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <Animated.View
                key={stat.label}
                entering={FadeInUp.delay(400 + index * 100).duration(500)}
                style={styles.statCard}
              >
                <LinearGradient
                  colors={['#1A1A1A', '#262626']}
                  style={styles.statGradient}
                >
                  <View style={[styles.statIconContainer, { backgroundColor: `${stat.color}20` }]}>
                    <Feather name={stat.icon} size={20} color={stat.color} />
                  </View>
                  
                  <Text style={[styles.statNumberLarge, { color: stat.color }]}>
                    {stat.value}
                  </Text>
                  
                  <Text style={styles.statLabelLarge}>{stat.label}</Text>
                </LinearGradient>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Values Section */}
        <Animated.View 
          style={styles.valuesSection}
          entering={FadeInUp.delay(500).duration(600)}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Our Values</Text>
            <Text style={styles.sectionSubtitle}>What drives us forward</Text>
          </View>
          
          <View style={styles.valuesGrid}>
            {values.map((value, index) => (
              <TouchableOpacity
                key={value.title}
                onPressIn={() => handleValueHover(index)}
                onPressOut={() => handleValueHover(null)}
                activeOpacity={0.9}
              >
                <Animated.View
                  entering={FadeInRight.delay(600 + index * 100).duration(500)}
                  style={[
                    styles.valueCard,
                    activeValue === index && styles.valueCardActive
                  ]}
                >
                  <LinearGradient
                    colors={activeValue === index 
                      ? [value.color, `${value.color}80`]
                      : ['#1A1A1A', '#262626']
                    }
                    style={styles.valueGradient}
                  >
                    <View style={styles.valueIconContainer}>
                      <Text style={styles.valueIcon}>{value.icon}</Text>
                    </View>
                    
                    <Text style={styles.valueTitle}>{value.title}</Text>
                    
                    <Text style={styles.valueDesc}>{value.desc}</Text>
                    
                    <View style={styles.valueHoverIndicator}>
                      <Feather 
                        name="chevron-right" 
                        size={20} 
                        color={activeValue === index ? 'white' : '#888'} 
                      />
                    </View>
                  </LinearGradient>
                </Animated.View>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Team Section */}
        <Animated.View 
          style={styles.teamSection}
          entering={FadeInUp.delay(700).duration(600)}
        >
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Meet Our Team</Text>
              <Text style={styles.sectionSubtitle}>The minds behind innovation</Text>
            </View>
            
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
              <Feather name="arrow-right" size={16} color="#6366f1" />
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.teamScroll}
            contentContainerStyle={styles.teamScrollContent}
          >
            {teamMembers.map((member, index) => (
              <Animated.View
                key={member.id}
                entering={SlideInLeft.delay(800 + index * 100).duration(500)}
                style={styles.teamCardContainer}
              >
                <TouchableOpacity
                  style={styles.teamCard}
                  onPress={() => handleTeamMemberPress(member.id)}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={['#1A1A1A', '#262626']}
                    style={styles.teamCardGradient}
                  >
                    {/* Team Member Image */}
                    <View style={styles.teamImageContainer}>
                      <Image
                        source={{ uri: member.avatar }}
                        style={styles.teamImage}
                        resizeMode="cover"
                      />
                      
                      <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.8)']}
                        style={styles.teamImageOverlay}
                      />
                      
                      <View style={styles.teamBadge}>
                        <Feather name="award" size={16} color="#FFD166" />
                      </View>
                    </View>
                    
                    {/* Team Member Info */}
                    <View style={styles.teamInfo}>
                      <Text style={styles.memberName}>{member.name}</Text>
                      <Text style={styles.memberRole}>{member.role}</Text>
                      
                      <Text style={styles.memberDescription} numberOfLines={2}>
                        {member.description}
                      </Text>
                      
                      {/* Skills */}
                      <View style={styles.skillsContainer}>
                        {member.skills.slice(0, 2).map((skill, skillIndex) => (
                          <View key={skillIndex} style={styles.skillChip}>
                            <Text style={styles.skillText}>{skill}</Text>
                          </View>
                        ))}
                        {member.skills.length > 2 && (
                          <View style={styles.moreSkillsChip}>
                            <Text style={styles.moreSkillsText}>
                              +{member.skills.length - 2}
                            </Text>
                          </View>
                        )}
                      </View>
                      
                      {/* Experience & Projects */}
                      <View style={styles.memberStats}>
                        <View style={styles.memberStat}>
                          <Feather name="briefcase" size={14} color="#888" />
                          <Text style={styles.memberStatText}>{member.experience}</Text>
                        </View>
                        
                        <View style={styles.memberStat}>
                          <Feather name="layers" size={14} color="#888" />
                          <Text style={styles.memberStatText}>{member.projects} projects</Text>
                        </View>
                      </View>
                      
                      {/* Social Links */}
                      <View style={styles.socialContainer}>
                        {Object.entries(member.social).map(([platform, url]) => (
                          <TouchableOpacity 
                            key={platform}
                            style={styles.socialButton}
                            onPress={() => Linking.openURL(url)}
                          >
                            {platform === 'linkedin' && (
                              <Feather name="linkedin" size={16} color="#6366f1" />
                            )}
                            {platform === 'twitter' && (
                              <Feather name="twitter" size={16} color="#1DA1F2" />
                            )}
                            {platform === 'github' && (
                              <Feather name="github" size={16} color="white" />
                            )}
                            {platform === 'dribbble' && (
                              <Feather name="dribbble" size={16} color="#EA4C89" />
                            )}
                            {platform === 'behance' && (
                              <Feather name="behance" size={16} color="#1769FF" />
                            )}
                            {platform === 'medium' && (
                              <Feather name="book" size={16} color="white" />
                            )}
                          </TouchableOpacity>
                        ))}
                      </View>
                      
                      {/* View Profile Button */}
                      <TouchableOpacity 
                        style={styles.profileButton}
                        onPress={() => handleTeamMemberPress(member.id)}
                      >
                        <Text style={styles.profileButtonText}>View Profile</Text>
                      </TouchableOpacity>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Timeline Section */}
        <Animated.View 
          style={styles.timelineSection}
          entering={FadeInUp.delay(900).duration(600)}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Our Journey</Text>
            <Text style={styles.sectionSubtitle}>Milestones that shaped us</Text>
          </View>
          
          <View style={styles.timeline}>
            {milestones.map((milestone, index) => (
              <Animated.View
                key={milestone.year}
                entering={FadeInRight.delay(1000 + index * 100).duration(500)}
                style={styles.timelineItem}
              >
                <View style={styles.timelineLeft}>
                  <View style={[styles.timelineYearContainer, { backgroundColor: `${milestone.color}20` }]}>
                    <Text style={[styles.timelineYear, { color: milestone.color }]}>
                      {milestone.year}
                    </Text>
                  </View>
                  
                  {index < milestones.length - 1 && (
                    <View style={styles.timelineConnector} />
                  )}
                </View>
                
                <LinearGradient
                  colors={['#1A1A1A', '#262626']}
                  style={styles.timelineContent}
                >
                  <View style={styles.timelineHeader}>
                    <View style={[styles.timelineIcon, { backgroundColor: `${milestone.color}20` }]}>
                      <Feather name={milestone.icon} size={20} color={milestone.color} />
                    </View>
                    
                    <Text style={styles.timelineTitle}>{milestone.title}</Text>
                  </View>
                  
                  <Text style={styles.timelineDesc}>{milestone.description}</Text>
                  
                  <View style={styles.timelineDot}>
                    <View style={[styles.timelineInnerDot, { backgroundColor: milestone.color }]} />
                  </View>
                </LinearGradient>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Join Us Section */}
        <Animated.View 
          style={styles.joinSection}
          entering={FadeInUp.delay(1100).duration(600)}
        >
          <LinearGradient
            colors={['#6366f1', '#8b5cf6']}
            style={styles.joinGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Floating Elements */}
            <View style={styles.joinOrb1} />
            <View style={styles.joinOrb2} />
            
            <View style={styles.joinContent}>
              <Text style={styles.joinTitle}>Join Our Journey</Text>
              
              <Text style={styles.joinSubtitle}>
                We&apos;re always looking for passionate individuals to join our 
                growing team. Explore opportunities to work on cutting-edge 
                projects with a talented team.
              </Text>
              
              <View style={styles.joinButtons}>
                <TouchableOpacity 
                  style={styles.joinPrimaryButton}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    // router.push('/careers');
                  }}
                >
                  <Text style={styles.joinPrimaryText}>View Open Positions</Text>
                  <Feather name="arrow-right" size={20} color="white" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.joinSecondaryButton}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    // router.push('/contact');
                  }}
                >
                  <Text style={styles.joinSecondaryText}>Contact Us</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.joinPerks}>
                <View style={styles.perkItem}>
                  <Feather name="dollar-sign" size={20} color="white" />
                  <Text style={styles.perkText}>Competitive Salary</Text>
                </View>
                
                <View style={styles.perkItem}>
                  <Feather name="home" size={20} color="white" />
                  <Text style={styles.perkText}>Remote Friendly</Text>
                </View>
                
                <View style={styles.perkItem}>
                  <Feather name="cpu" size={20} color="white" />
                  <Text style={styles.perkText}>Latest Tech</Text>
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
                Creating digital experiences that inspire and transform businesses.
              </Text>
              
              <View style={styles.footerLinks}>
                <TouchableOpacity style={styles.footerLink}>
                  <Feather name="linkedin" size={20} color="#888" />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.footerLink}>
                  <Feather name="twitter" size={20} color="#888" />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.footerLink}>
                  <Feather name="instagram" size={20} color="#888" />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.footerLink}>
                  <Feather name="github" size={20} color="#888" />
                </TouchableOpacity>
              </View>
              
              <Text style={styles.copyright}>
                © 2025 Tech solution plc. All rights reserved.
              </Text>
            </View>
          </LinearGradient>
        </View>
      </Animated.ScrollView>

      {/* Back to Top Button */}
      <Animated.View style={[styles.backToTop, fadeInStyle]}>
        <TouchableOpacity 
          style={styles.backToTopButton}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            scrollRef.current?.scrollTo({ y: 0, animated: true });
          }}
        >
          <Feather name="chevron-up" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>
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
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(26,26,26,0.95)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroSection: {
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  heroBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    width: '100%',
    height: '100%',
  },
  heroContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
    zIndex: 1,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24,
    gap: 8,
  },
  badgeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: 48,
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
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 32,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#6366f1',
  },
  heroButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  missionSection: {
    paddingHorizontal: 24,
    marginTop: -80,
    marginBottom: 40,
  },
  missionCard: {
    borderRadius: 32,
    padding: 32,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  missionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  missionText: {
    fontSize: 18,
    color: '#888',
    lineHeight: 28,
    marginBottom: 32,
  },
  missionStats: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    padding: 20,
  },
  missionStat: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statContent: {
    flex: 1,
  },
  statNumber: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#888',
    fontSize: 14,
  },
  missionDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 20,
  },
  statsSection: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: (width - 60) / 2,
    borderRadius: 20,
    overflow: 'hidden',
  },
  statGradient: {
    padding: 24,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  statNumberLarge: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statLabelLarge: {
    color: '#888',
    fontSize: 14,
    fontWeight: '500',
  },
  valuesSection: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionSubtitle: {
    color: '#888',
    fontSize: 16,
  },
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  valueCard: {
    width: (width - 60) / 2,
    borderRadius: 20,
    overflow: 'hidden',
    height: 200,
  },
  valueCardActive: {
    transform: [{ translateY: -5 }],
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  valueGradient: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-between',
  },
  valueIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  valueIcon: {
    fontSize: 28,
  },
  valueTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  valueDesc: {
    color: '#888',
    fontSize: 14,
    lineHeight: 20,
  },
  valueHoverIndicator: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  teamSection: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  viewAllText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: '600',
  },
  teamScroll: {
    marginHorizontal: -24,
  },
  teamScrollContent: {
    paddingHorizontal: 24,
  },
  teamCardContainer: {
    width: 300,
    marginRight: 16,
  },
  teamCard: {
    borderRadius: 24,
    overflow: 'hidden',
    height: 450,
  },
  teamCardGradient: {
    borderRadius: 24,
    overflow: 'hidden',
    flex: 1,
  },
  teamImageContainer: {
    height: 180,
    position: 'relative',
  },
  teamImage: {
    width: '100%',
    height: '100%',
  },
  teamImageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  teamBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamInfo: {
    padding: 24,
    flex: 1,
  },
  memberName: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  memberRole: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  memberDescription: {
    color: '#888',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  skillChip: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  skillText: {
    color: '#888',
    fontSize: 12,
  },
  moreSkillsChip: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  moreSkillsText: {
    color: '#6366f1',
    fontSize: 12,
  },
  memberStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  memberStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  memberStatText: {
    color: '#888',
    fontSize: 12,
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  socialButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButton: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#6366f1',
    alignItems: 'center',
  },
  profileButtonText: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '600',
  },
  timelineSection: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  timeline: {
    marginTop: 10,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  timelineLeft: {
    alignItems: 'center',
    width: 80,
    marginRight: 16,
  },
  timelineYearContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  timelineYear: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  timelineConnector: {
    width: 2,
    flex: 1,
    backgroundColor: '#333',
  },
  timelineContent: {
    flex: 1,
    padding: 24,
    borderRadius: 20,
    position: 'relative',
  },
  timelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  timelineIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  timelineDesc: {
    color: '#888',
    fontSize: 14,
    lineHeight: 22,
  },
  timelineDot: {
    position: 'absolute',
    left: -40,
    top: 28,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineInnerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  joinSection: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  joinGradient: {
    borderRadius: 32,
    padding: 40,
    position: 'relative',
    overflow: 'hidden',
  },
  joinOrb1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.1)',
    top: -100,
    right: -100,
  },
  joinOrb2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.05)',
    bottom: -75,
    left: -75,
  },
  joinContent: {
    position: 'relative',
    zIndex: 1,
  },
  joinTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
    textAlign: 'center',
  },
  joinSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  joinButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  joinPrimaryButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: 'white',
    paddingVertical: 16,
    borderRadius: 16,
  },
  joinPrimaryText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: 'bold',
  },
  joinSecondaryButton: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinSecondaryText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  joinPerks: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  perkItem: {
    alignItems: 'center',
  },
  perkText: {
    color: 'white',
    fontSize: 12,
    marginTop: 8,
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
    fontSize: 24,
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
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyright: {
    color: '#666',
    fontSize: 12,
  },
  backToTop: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 1000,
  },
  backToTopButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    borderWidth: 1,
    borderColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});