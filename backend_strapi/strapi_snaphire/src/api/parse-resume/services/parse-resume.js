'use strict';

const axios = require('axios');
const mammoth = require('mammoth');

module.exports = {
  async parseFromUrl(fileUrl) {
    try {
      // Build full file URL
      const fullUrl = `${process.env.STRAPI_BASE_URL || 'http://localhost:1337'}${fileUrl}`;
      const response = await axios.get(fullUrl, { responseType: 'arraybuffer' });
      const buffer = response.data;

      // Extract text from DOCX
      const result = await mammoth.extractRawText({ buffer });
      const resumeText = result.value;

      if (!resumeText || resumeText.length < 20) {
        throw new Error("Extracted resume text is too short or empty.");
      }

      console.log('📄 Extracted Resume Text:', resumeText.slice(0, 300) + '...');

      // Send to Gemini
      const geminiResponse = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
        {
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `Extract the following details from this resume text: First Name,Last Name,Job Title,Email,Phone,Summary,Github,LinkedIn,Skills (comma-separated),Education[degree, institution, year],Experience [title, company, duration, description]
                  Output JSON in this format:
                  {
                    "firstName": "",
                    "lastName": "",
                    "jobTitle": "",
                    "email": "",
                    "phone": "",
                    "githubURL": "",
                    "linkedinURL": "",
                    "summary": "",
                    "skills": [],
                    "education": [
                      { "degree": "", "institution": "", "year": "" }
                    ],
                    "experience": [
                      { "title": "", "company": "", "duration": "", "description": "" }
                    ]
                  }

\n\nResume:\n${resumeText}`
                }
              ]
            }
          ]
        },
        {
          headers: { 'Content-Type': 'application/json' },
          params: { key: process.env.GEMINI_API_KEY },
        }
      );

      console.log('🤖 Gemini Full Response:', JSON.stringify(geminiResponse.data, null, 2));

      const resultText = geminiResponse?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      // ✅ Clean and safely parse JSON from Gemini
      const cleanText = resultText.replace(/```json|```/g, '').trim();

      try {
        const parsedJson = JSON.parse(cleanText);
        return parsedJson;
      } catch (err) {
        console.error("❌ Failed to parse cleaned JSON:", cleanText);
        return { error: 'Failed to parse Gemini output', raw: cleanText };
      }

    } catch (error) {
      strapi.log.error('❌ Resume Parse Error:', error);
      console.error('❌ Resume Parse Error:', error);
      return { error: 'Failed to parse resume' };
    }
  },
};
