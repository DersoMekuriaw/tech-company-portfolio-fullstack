import { useEffect } from 'react';
import { Redirect } from 'expo-router';

export default function home() {
  return <Redirect href="/(tabs)/HomeScreen" />;
}