import { api } from "encore.dev/api";

export interface SubscribeRequest {
  email: string;
}

export interface SubscribeResponse {
  success: boolean;
  message: string;
}

export const subscribe = api(
  { method: "POST", path: "/newsletter/subscribe", expose: true },
  async (req: SubscribeRequest): Promise<SubscribeResponse> => {
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(req.email)) {
        return {
          success: false,
          message: "Please provide a valid email address"
        };
      }

      // Here you would typically integrate with an email service like SendGrid, Mailchimp, etc.
      // For now, we'll just simulate a successful subscription
      console.log(`Newsletter subscription for: ${req.email}`);

      return {
        success: true,
        message: "Successfully subscribed to our newsletter!"
      };
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      return {
        success: false,
        message: "There was an error subscribing. Please try again."
      };
    }
  }
);