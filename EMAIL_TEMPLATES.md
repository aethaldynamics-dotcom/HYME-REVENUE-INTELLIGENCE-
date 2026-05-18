# EmailJS Auto-Reply Templates for Hyme

Use these templates in your EmailJS dashboard to automatically respond to brand owners who submit the "Retail Alliance Initiation" (Waitlist) form on the Hyme landing page.

## Template 1: The "Exclusive & Technical" Auto-Reply (Recommended)
*This template matches the high-end, cyberpunk, technical branding of your current landing page.*

**Subject:** Hyme Alliance Protocol: Deployment Request Received

**Body:**
```text
This is an automated confirmation from Hyme Revenue Intelligence. 

We have successfully received your deployment audit request. Your data has been securely processed and logged via our L3 Encryption Protocol.

At Hyme, we engineer bespoke ROI solutions for the world's most prominent brands. Because of the high fidelity and strategic depth required for our Global Orchestration systems, our team is currently evaluating your brand's profile against our alliance criteria.

=========================================
TRANSMISSION DETAILS
Target Entity: Verified
Communication Channel: {{email}}
=========================================

A Deployment Specialist will review your request and reach out within 48 hours with next steps regarding integration capabilities and potential ROI forecasts.

Your position in the Strategic Alliance queue has been secured.

Regards,

Hyme Revenue Intelligence
https://hyme.com (Replace with your actual domain)
```

---

## Template 2: Professional & Direct
*A more standard B2B enterprise template while still maintaining a premium feel.*

**Subject:** Thank you for contacting Hyme - Request Received

**Body:**
```text
Thank you for requesting a deployment audit with Hyme. We have received your preliminary information.

Our team specializes in building custom strategic infrastructure for top-tier retail brands. We are currently reviewing your details to understand how Hyme's ecosystem can best serve your market objectives.

A specialist from Hyme Revenue Intelligence will be in contact with you within the next 1-2 business days to discuss your specific needs and how we might engineer a bespoke solution.

Thank you for your interest in the Hyme Alliance.

Best regards,

Hyme Revenue Intelligence
https://hyme.com (Replace with your actual domain)
```

---

### Instructions for EmailJS Setup:
1. Go to your **EmailJS Dashboard** -> **Email Templates** -> **Create New Template**.
2. Select the **Auto-Reply** tab (if you want this to go to the user).
3. Set the **To Email** field to `{{email}}` (assuming your form input has `name="email"`).
4. Set the **From Name** to `Hyme Revenue Intelligence`.
5. Set the **Reply To** to your company email (e.g., `partnerships@hyme.com`).
6. Copy and paste the Subject and Body from one of the templates above.
7. Ensure the `{{email}}` variable exactly matches the `name` attribute of the email input in your React form.
8. Save and test the template!
