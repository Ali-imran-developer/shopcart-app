import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Animated, Dimensions } from 'react-native';
import { useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const { width } = Dimensions.get('window');

export default function NotFoundScreen() {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceAnim, fadeAnim, slideAnim]);

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Page Not Found',
          headerShown: false
        }} 
      />
      <ThemedView style={styles.container}>
        <Animated.View 
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {/* Animated Icon */}
          <Animated.View 
            style={[
              styles.iconContainer,
              { transform: [{ translateY: bounceAnim }] }
            ]}
          >
            <Ionicons 
              name="search-circle-outline" 
              size={120} 
              color="#6366f1" 
              style={styles.icon}
            />
          </Animated.View>

          {/* Error Code */}
          <ThemedText style={styles.errorCode}>404</ThemedText>
          
          {/* Main Message */}
          <ThemedText type="title" style={styles.title}>
            Oops! Page Not Found
          </ThemedText>
          
          {/* Description */}
          <ThemedText style={styles.description}>
            The page you're looking for seems to have wandered off. 
            Don't worry, it happens to the best of us!
          </ThemedText>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <Link href="/" style={styles.primaryButton}>
              <View style={styles.buttonContent}>
                <Ionicons name="home" size={20} color="#ffffff" />
                <ThemedText style={styles.primaryButtonText}>
                  Back to Home
                </ThemedText>
              </View>
            </Link>
            
            <Link href="/" style={styles.secondaryButton}>
              <View style={styles.buttonContent}>
                <Ionicons name="refresh" size={20} color="#6366f1" />
                <ThemedText style={styles.secondaryButtonText}>
                  Try Again
                </ThemedText>
              </View>
            </Link>
          </View>

          {/* Helpful Links */}
          <View style={styles.helpfulLinks}>
            <ThemedText style={styles.helpText}>
              Need help? Try these popular sections:
            </ThemedText>
            <View style={styles.linkGrid}>
              <Link href="/" style={styles.helpLink}>
                <ThemedText style={styles.helpLinkText}>Dashboard</ThemedText>
              </Link>
              <Link href="/" style={styles.helpLink}>
                <ThemedText style={styles.helpLinkText}>Settings</ThemedText>
              </Link>
              <Link href="/" style={styles.helpLink}>
                <ThemedText style={styles.helpLinkText}>Support</ThemedText>
              </Link>
            </View>
          </View>
        </Animated.View>

        {/* Background Decoration */}
        <View style={styles.backgroundDecoration}>
          <View style={[styles.circle, styles.circle1]} />
          <View style={[styles.circle, styles.circle2]} />
          <View style={[styles.circle, styles.circle3]} />
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    position: 'relative',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: width - 40,
    zIndex: 1,
  },
  iconContainer: {
    marginBottom: 20,
  },
  icon: {
    opacity: 0.9,
  },
  errorCode: {
    fontSize: 72,
    fontWeight: '800',
    color: '#6366f1',
    marginBottom: 10,
    letterSpacing: -2,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 12,
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#6366f1',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: '600',
  },
  helpfulLinks: {
    alignItems: 'center',
    width: '100%',
  },
  helpText: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 16,
  },
  linkGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 16,
  },
  helpLink: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  helpLinkText: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '500',
  },
  backgroundDecoration: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  circle: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(99, 102, 241, 0.05)',
  },
  circle1: {
    width: 200,
    height: 200,
    top: 100,
    left: -50,
  },
  circle2: {
    width: 150,
    height: 150,
    bottom: 150,
    right: -30,
  },
  circle3: {
    width: 100,
    height: 100,
    top: 200,
    right: 50,
  },
});
