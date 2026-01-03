// User Interests Service
// Handles followed stocks and sectors via backend API

import apiClient from './api';
import { API_ENDPOINTS } from '../config/api';

export interface UserInterests {
  stocks: string[];
  sectors: string[];
  preferredCountry?: string | null;
}

export const userInterestsService = {
  /**
   * Get user interests (stocks, sectors, preferred country) from backend API
   */
  async getInterests(): Promise<UserInterests> {
    try {
      const response = await apiClient.get<UserInterests>(API_ENDPOINTS.USER_INTERESTS);
      return {
        stocks: response.data.stocks || [],
        sectors: response.data.sectors || [],
        preferredCountry: response.data.preferredCountry || null,
      };
    } catch (error: any) {
      console.error('Error getting user interests:', error);
      // Return empty interests on error (user might not have set any yet)
      return { stocks: [], sectors: [], preferredCountry: null };
    }
  },

  /**
   * Update followed stocks via backend API
   */
  async updateStocks(stocks: string[]): Promise<void> {
    try {
      await apiClient.put(API_ENDPOINTS.USER_INTERESTS, { stocks });
    } catch (error: any) {
      console.error('Error updating stocks:', error);
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to update stocks');
    }
  },

  /**
   * Update followed sectors via backend API
   */
  async updateSectors(sectors: string[]): Promise<void> {
    try {
      await apiClient.put(API_ENDPOINTS.USER_INTERESTS, { sectors });
    } catch (error: any) {
      console.error('Error updating sectors:', error);
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to update sectors');
    }
  },

  /**
   * Update preferred country via backend API
   */
  async updatePreferredCountry(country: string): Promise<void> {
    try {
      await apiClient.put(API_ENDPOINTS.USER_INTERESTS, { preferredCountry: country });
    } catch (error: any) {
      console.error('Error updating preferred country:', error);
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to update preferred country');
    }
  },

  /**
   * Update all interests at once via backend API
   */
  async updateInterests(interests: Partial<UserInterests>): Promise<void> {
    try {
      await apiClient.put(API_ENDPOINTS.USER_INTERESTS, interests);
    } catch (error: any) {
      console.error('Error updating interests:', error);
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to update interests');
    }
  },
};

