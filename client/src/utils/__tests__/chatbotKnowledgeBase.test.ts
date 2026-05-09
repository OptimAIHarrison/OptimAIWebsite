import { describe, it, expect } from "vitest";
import { findBestMatch, getFallbackResponse, formatResponse } from "../chatbotKnowledgeBase";

describe("Chatbot Knowledge Base", () => {
  describe("findBestMatch", () => {
    it("should match service inquiry questions", () => {
      const result = findBestMatch("What services do you offer?");
      expect(result).not.toBeNull();
      expect(result?.confidence).toBeGreaterThan(0.5);
      expect(result?.answer).toContain("Strategic Advisory");
      expect(result?.pageSuggestions.length).toBeGreaterThan(0);
    });

    it("should match pricing questions", () => {
      const result = findBestMatch("How much does this cost?");
      expect(result).not.toBeNull();
      expect(result?.confidence).toBeGreaterThan(0.5);
      expect(result?.answer).toContain("pricing");
    });

    it("should match business process automation questions", () => {
      const result = findBestMatch("Can you automate manual tasks?");
      expect(result).not.toBeNull();
      expect(result?.answer).toContain("Business Process Automation");
    });

    it("should match timeline questions", () => {
      const result = findBestMatch("How long does implementation take?");
      expect(result).not.toBeNull();
      expect(result?.answer).toContain("timeline");
    });

    it("should match qualification questions", () => {
      const result = findBestMatch("Is this right for my startup?");
      expect(result).not.toBeNull();
      expect(result?.confidence).toBeGreaterThan(0.4);
    });

    it("should match ready to go products questions", () => {
      const result = findBestMatch("What are ready to go products?");
      expect(result).not.toBeNull();
      expect(result?.answer).toContain("pre-built");
      expect(result?.pageSuggestions.some((s) => s.includes("/products"))).toBe(true);
    });

    it("should include marketplace links in product suggestions", () => {
      const result = findBestMatch("Do you have quick solutions?");
      expect(result).not.toBeNull();
      expect(result?.pageSuggestions.some((s) => s.includes("/products"))).toBe(true);
    });

    it("should include audit links in service suggestions", () => {
      const result = findBestMatch("What services do you offer?");
      expect(result).not.toBeNull();
      expect(result?.pageSuggestions.some((s) => s.includes("/audit"))).toBe(true);
    });

    it("should include core services section links", () => {
      const result = findBestMatch("Tell me about your services");
      expect(result).not.toBeNull();
      expect(result?.pageSuggestions.some((s) => s.includes("#core-services"))).toBe(true);
    });

    it("should handle unclear questions gracefully", () => {
      const result = findBestMatch("xyz123 random gibberish");
      // Should either return null or a low confidence match
      if (result) {
        expect(result.confidence).toBeLessThan(0.5);
      }
    });

    it("should return page suggestions with all matches", () => {
      const result = findBestMatch("What services do you offer?");
      expect(result).not.toBeNull();
      expect(result?.pageSuggestions).toBeDefined();
      expect(result?.pageSuggestions.length).toBeGreaterThan(0);
      expect(result?.pageSuggestions.every((s) => typeof s === "string")).toBe(true);
    });
  });

  describe("getFallbackResponse", () => {
    it("should return first fallback on first attempt", () => {
      const result = getFallbackResponse(0);
      expect(result.answer).toContain("not sure");
      expect(result.pageSuggestions.length).toBeGreaterThan(0);
    });

    it("should return escalation fallback after 2 attempts", () => {
      const result = getFallbackResponse(2);
      expect(result.answer).toContain("trouble");
      expect(result.pageSuggestions.some((s) => s.includes("Send a Message"))).toBe(true);
    });

    it("should include contact options in fallback", () => {
      const result = getFallbackResponse(0);
      expect(result.pageSuggestions.some((s) => s.includes("/contact"))).toBe(true);
    });

    it("should include audit link in fallback", () => {
      const result = getFallbackResponse(0);
      expect(result.pageSuggestions.some((s) => s.includes("/audit"))).toBe(true);
    });

    it("should include products link in fallback", () => {
      const result = getFallbackResponse(0);
      expect(result.pageSuggestions.some((s) => s.includes("/products"))).toBe(true);
    });
  });

  describe("formatResponse", () => {
    it("should combine answer and suggestions", () => {
      const answer = "This is a test answer";
      const suggestions = ["[Link 1](/page1)", "[Link 2](/page2)"];
      const result = formatResponse(answer, suggestions);

      expect(result).toContain(answer);
      expect(result).toContain("[Link 1](/page1)");
      expect(result).toContain("[Link 2](/page2)");
    });

    it("should include pipe separator between suggestions", () => {
      const answer = "Test";
      const suggestions = ["[Link 1](/page1)", "[Link 2](/page2)", "[Link 3](/page3)"];
      const result = formatResponse(answer, suggestions);

      expect(result).toContain(" | ");
    });

    it("should handle empty suggestions array", () => {
      const answer = "Test answer";
      const suggestions: string[] = [];
      const result = formatResponse(answer, suggestions);

      expect(result).toContain(answer);
    });
  });

  describe("Knowledge Base Coverage", () => {
    it("should handle marketing automation questions", () => {
      const result = findBestMatch("How can you help with lead generation?");
      expect(result).not.toBeNull();
      expect(result?.answer).toContain("Marketing");
    });

    it("should handle AI integration questions", () => {
      const result = findBestMatch("Can you integrate AI into our systems?");
      expect(result).not.toBeNull();
      expect(result?.answer).toContain("AI Integration");
    });

    it("should handle company size questions", () => {
      const result = findBestMatch("Do you work with enterprises?");
      expect(result).not.toBeNull();
      expect(result?.answer).toContain("all sizes");
    });

    it("should handle security questions", () => {
      const result = findBestMatch("Is my data secure?");
      expect(result).not.toBeNull();
      expect(result?.answer).toContain("security");
    });

    it("should handle contact questions", () => {
      const result = findBestMatch("How do I get in touch?");
      expect(result).not.toBeNull();
      expect(result?.pageSuggestions.some((s) => s.includes("/contact"))).toBe(true);
    });

    it("should handle case study questions", () => {
      const result = findBestMatch("Do you have case studies?");
      expect(result).not.toBeNull();
      expect(result?.pageSuggestions.some((s) => s.includes("/case-studies"))).toBe(true);
    });
  });

  describe("Page Suggestions", () => {
    it("should always include at least one CTA link", () => {
      const questions = [
        "What do you do?",
        "How much does it cost?",
        "What's your timeline?",
        "Are you right for me?",
        "Do you have products?",
      ];

      questions.forEach((question) => {
        const result = findBestMatch(question);
        if (result) {
          expect(result.pageSuggestions.length).toBeGreaterThan(0);
        }
      });
    });

    it("should include marketplace links in product-related answers", () => {
      const productQuestions = [
        "What are ready to go products?",
        "Do you have quick solutions?",
        "What products do you offer?",
      ];

      productQuestions.forEach((question) => {
        const result = findBestMatch(question);
        if (result && result.confidence > 0.5) {
          expect(result.pageSuggestions.some((s) => s.includes("/products"))).toBe(true);
        }
      });
    });

    it("should include audit links in service-related answers", () => {
      const serviceQuestions = [
        "What services do you offer?",
        "Tell me about strategic advisory",
        "Can you help with automation?",
      ];

      serviceQuestions.forEach((question) => {
        const result = findBestMatch(question);
        if (result && result.confidence > 0.5) {
          expect(result.pageSuggestions.some((s) => s.includes("/audit"))).toBe(true);
        }
      });
    });
  });
});
