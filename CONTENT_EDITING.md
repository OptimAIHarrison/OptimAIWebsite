# OptimAI Website - Content Editing Guide

This guide shows you exactly where to find and edit copy on each page of the OptimAI website.

## Home Page (`client/src/pages/Home.tsx`)

### Hero Section
- **Location**: Lines 80-110
- **Editable Elements**:
  - `"Your Growth Partner in AI & Automation"` - Tagline (Line 82)
  - `"Scale Your Business"` - Main headline (Line 84)
  - `"with Practical AI and Automation"` - Subheadline (Line 85)
  - `"Understandable, scalable, and human-centered..."` - Description (Line 87-89)
  - `"Enough of the jargon and buzzwords."` - Call-out text (Line 91)
  - Button text: `"Check out what we do"` and `"Get Your Free Audit"` (Lines 95-96)

### Trust Badges
- **Location**: Lines 100-107
- **Editable Elements**:
  - `"150+ Projects Completed"` (Line 101)
  - `"$50M+ Client Savings"` (Line 103)
  - `"98% Client Satisfaction"` (Line 105)

### Services Preview Section
- **Location**: Lines 120-190
- **Section Title**: `"Our Core Services"` (Line 121)
- **Editable Elements**: Each service card contains:
  - Service title (e.g., `"Strategic Advisory"`)
  - Service description (e.g., `"Align your business strategy..."`)
  - `"More"` button text

### Testimonials Section
- **Location**: Lines 195-250
- **Section Title**: `"What Our Clients Say"` (Line 196)
- **Editable Elements**: Each testimonial card contains:
  - Client quote text
  - Client name
  - Client company/role
  - Star rating

### CTA Section
- **Location**: Lines 255-270
- **Editable Elements**:
  - Heading: `"Ready to Transform Your Business?"` (Line 256)
  - Description text (Line 257-259)
  - Button text: `"Get Your Free Audit"` (Line 263)

---

## Services Page (`client/src/pages/Services.tsx`)

### Page Header
- **Location**: Lines 50-60
- **Editable Elements**:
  - Page title: `"Our Core Services"` (Line 51)
  - Page description (Line 52-53)

### Service Details
- **Location**: Lines 120-400 (varies by service)
- **Editable Elements**: For each service (Strategic Advisory, Marketing Automation, etc.):
  - Simple overview description
  - Technical details section
  - Implementation details
  - Integration information
  - Support information

To edit a specific service:
1. Find the service in the expanded view (e.g., `if (expanded === "strategic-advisory")`)
2. Update the text in the corresponding section
3. Save the file

---

## About Us Page (`client/src/pages/About.tsx`)

### Page Header
- **Location**: Lines 40-50
- **Editable Elements**:
  - Page title: `"About OptimAI"` (Line 41)
  - Main description (Line 42-45)

### Team/Company Story
- **Location**: Lines 55-100
- **Editable Elements**:
  - Company mission statement
  - Company values
  - Team introduction
  - Company history

### Values Section
- **Location**: Lines 105-150
- **Editable Elements**: Each value card contains:
  - Value title
  - Value description

---

## Why OptimAI Page (`client/src/pages/WhyOptimAI.tsx`)

### Page Header
- **Location**: Lines 40-50
- **Editable Elements**:
  - Page title: `"Why Choose OptimAI"` (Line 41)
  - Main description (Line 42-45)

### Reasons Section
- **Location**: Lines 55-150
- **Editable Elements**: Each reason card contains:
  - Reason title
  - Reason description
  - Icon

---

## Pricing Page (`client/src/pages/Pricing.tsx`)

### Page Header
- **Location**: Lines 40-50
- **Editable Elements**:
  - Page title: `"Simple, Transparent Pricing"` (Line 41)
  - Page description (Line 42-45)

### Pricing Tiers
- **Location**: Lines 60-200
- **Editable Elements**: For each tier (Fixed Fee Assessment, Project-Based, Managed Retainer):
  - Tier name
  - Tier price
  - Tier description
  - Features list
  - CTA button text

### FAQ Section
- **Location**: Lines 205-250
- **Editable Elements**: Each FAQ item contains:
  - Question
  - Answer

---

## ROI Calculator Page (`client/src/pages/ROICalculator.tsx`)

### Page Header
- **Location**: Lines 60-75
- **Editable Elements**:
  - Page title: `"Calculate Your ROI"` (Line 63)
  - Page description (Line 66-67)
  - Privacy notice: `"No data is captured or stored here..."` (Line 68-70)

### Calculation Logic Explanation
- **Location**: Lines 220-235
- **Editable Elements**:
  - Step-by-step calculation explanation
  - Each step description

### Results Section
- **Location**: Lines 240-265
- **Editable Elements**:
  - Result labels (e.g., `"Hours Automated Per Year"`)
  - Result descriptions
  - CTA button text

---

## Contact Us Page (`client/src/pages/Contact.tsx`)

### Page Header
- **Location**: Lines 40-50
- **Editable Elements**:
  - Page title: `"Get In Touch"` (Line 41)
  - Page description (Line 42-45)

### Contact Form
- **Location**: Lines 60-150
- **Editable Elements**:
  - Form labels
  - Form placeholders
  - Form validation messages
  - Submit button text

### Contact Information
- **Location**: Lines 155-180
- **Editable Elements**:
  - Email address
  - Phone number
  - Office address
  - Business hours

---

## Free Audit Page (`client/src/pages/FreeAudit.tsx`)

### Page Header
- **Location**: Lines 40-50
- **Editable Elements**:
  - Page title: `"Get Your Free Audit"` (Line 41)
  - Page description (Line 42-45)

### Form Steps
- **Location**: Lines 60-200
- **Editable Elements**: For each form step:
  - Step title
  - Step description
  - Form field labels
  - Form field placeholders
  - Validation messages

### Success Message
- **Location**: Lines 205-215
- **Editable Elements**:
  - Success message text
  - Next steps description

---

## Resources/Blog Page (`client/src/pages/Resources.tsx`)

### Page Header
- **Location**: Lines 40-50
- **Editable Elements**:
  - Page title: `"Resources & Insights"` (Line 41)
  - Page description (Line 42-45)

### Articles
- **Location**: Lines 60-300
- **Editable Elements**: Each article card contains:
  - Article title
  - Article excerpt
  - Article category
  - Read time
  - Author
  - Publication date

### Adding New Articles
To add a new article:
1. Find the articles array in the Resources page (around line 60)
2. Add a new object with the following structure:
```javascript
{
  id: "article-slug",
  title: "Article Title",
  excerpt: "Brief excerpt of the article...",
  category: "Category Name",
  readTime: "5 min read",
  author: "Author Name",
  date: "Apr 15, 2026",
  image: "article-image-url"
}
```
3. Save the file

---

## FAQ Page (`client/src/pages/FAQ.tsx`)

### Page Header
- **Location**: Lines 40-50
- **Editable Elements**:
  - Page title: `"Frequently Asked Questions"` (Line 41)
  - Page description (Line 42-45)

### FAQ Items
- **Location**: Lines 60-200
- **Editable Elements**: Each FAQ item contains:
  - Question
  - Answer

### Adding New FAQ Items
To add a new FAQ:
1. Find the FAQ items array (around line 60)
2. Add a new object with the following structure:
```javascript
{
  id: "faq-item-id",
  question: "Your question here?",
  answer: "Your answer here..."
}
```
3. Save the file

---

## Case Studies Page (`client/src/pages/CaseStudies.tsx`)

### Page Header
- **Location**: Lines 40-50
- **Editable Elements**:
  - Page title: `"Case Studies"` (Line 41)
  - Page description (Line 42-45)

### Case Study Cards
- **Location**: Lines 60-250
- **Editable Elements**: Each case study contains:
  - Client name
  - Client industry
  - Challenge description
  - Solution description
  - Results (metrics)
  - Client testimonial

### Adding New Case Studies
To add a new case study:
1. Find the case studies array (around line 60)
2. Add a new object with the following structure:
```javascript
{
  id: "case-study-slug",
  client: "Client Name",
  industry: "Industry",
  challenge: "Challenge description...",
  solution: "Solution description...",
  results: {
    metric1: "50%",
    metric2: "3x",
    metric3: "$500k"
  },
  testimonial: "Client quote...",
  image: "case-study-image-url"
}
```
3. Save the file

---

## Privacy Policy Page (`client/src/pages/Privacy.tsx`)

### Page Content
- **Location**: Lines 40-200
- **Editable Elements**:
  - Page title
  - Section headings
  - Section content
  - Legal text

---

## Terms & Conditions Page (`client/src/pages/Terms.tsx`)

### Page Content
- **Location**: Lines 40-200
- **Editable Elements**:
  - Page title
  - Section headings
  - Section content
  - Legal text

---

## Global Content

### Navigation (`client/src/const.ts`)
- **Location**: Lines 23-28
- **Editable Elements**:
  - Navigation menu items
  - Navigation links

### Services List (`client/src/const.ts`)
- **Location**: Lines 32-100
- **Editable Elements**:
  - Service titles
  - Service descriptions
  - Service icons

---

## How to Edit Content

1. **Open the file** in your code editor (e.g., VS Code)
2. **Find the line number** from this guide
3. **Edit the text** between the quotes
4. **Save the file** (Ctrl+S or Cmd+S)
5. **The website will automatically reload** with your changes

## Tips

- Keep headlines concise and impactful
- Use clear, simple language
- Maintain consistent tone and voice
- Test changes on mobile and desktop
- Use the live preview to see changes in real-time
- Back up your changes regularly

---

For questions or help editing content, refer to the specific page sections above.
