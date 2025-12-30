import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_MEMBERSHIP = 'user_membership';
export type MembershipType = 'member' | 'pro';

export async function getMembershipStatus(): Promise<MembershipType> {
  try {
    const value = await AsyncStorage.getItem(USER_MEMBERSHIP);
    // Default to 'member' if no membership is set
    return (value as MembershipType) || 'member';
  } catch (error) {
    console.error('Error reading membership status:', error);
    return 'member';
  }
}

export async function setMembershipStatus(membership: MembershipType): Promise<void> {
  try {
    await AsyncStorage.setItem(USER_MEMBERSHIP, membership);
  } catch (error) {
    console.error('Error setting membership status:', error);
  }
}

export async function isProMember(): Promise<boolean> {
  const membership = await getMembershipStatus();
  return membership === 'pro';
}

