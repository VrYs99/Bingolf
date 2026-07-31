import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { NumberBadge } from './NumberBadge';

type Props = {
  number: number | string;
  size: number;
};

const FLIGHT_MS = 460;
const IMPACT_DELAY_MS = 390;

export function LandingBall({ number, size }: Props) {
  const flight = useRef(new Animated.Value(0)).current;
  const squash = useRef(new Animated.Value(0)).current;
  const impact = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(flight, {
        toValue: 1,
        duration: FLIGHT_MS,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.delay(IMPACT_DELAY_MS),
        Animated.timing(impact, {
          toValue: 1,
          duration: 360,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.delay(IMPACT_DELAY_MS),
        Animated.spring(squash, {
          toValue: 1,
          friction: 4.5,
          tension: 210,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [flight, impact, squash]);

  const translateY = flight.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [size * 1.6, -size * 0.3, 0],
  });
  const translateX = flight.interpolate({
    inputRange: [0, 1],
    outputRange: [-size * 0.7, 0],
  });
  const rotate = flight.interpolate({
    inputRange: [0, 1],
    outputRange: ['-200deg', '0deg'],
  });
  const scale = flight.interpolate({
    inputRange: [0, 0.55, 0.8, 1],
    outputRange: [0.3, 0.8, 1.14, 1],
  });
  const opacity = flight.interpolate({
    inputRange: [0, 0.14, 1],
    outputRange: [0, 1, 1],
  });
  const scaleY = squash.interpolate({
    inputRange: [0, 1],
    outputRange: [0.82, 1],
  });

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.shadow,
          {
            width: size * 0.62,
            height: size * 0.16,
            borderRadius: size * 0.31,
            opacity: flight.interpolate({
              inputRange: [0, 0.8, 1],
              outputRange: [0, 0.12, 0.3],
            }),
            transform: [
              {
                scaleX: flight.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 1],
                }),
              },
            ],
          },
        ]}
      />

      <Animated.View
        pointerEvents="none"
        style={[
          styles.impactRing,
          {
            width: size * 0.9,
            height: size * 0.9,
            borderRadius: size * 0.45,
            opacity: impact.interpolate({
              inputRange: [0, 0.25, 1],
              outputRange: [0, 0.5, 0],
            }),
            transform: [
              {
                scale: impact.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.35, 1.75],
                }),
              },
            ],
          },
        ]}
      />

      <Animated.View
        style={{
          opacity,
          transform: [{ translateX }, { translateY }, { rotate }, { scale }, { scaleY }],
        }}
      >
        <NumberBadge number={number} size={size} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#000',
  },
  impactRing: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.9)',
  },
});
