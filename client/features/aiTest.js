// import axios from 'axios';

// const apiKey = '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';

// async function generateText() {
//   try {
//     const response = await axios.post(
//       `https://api.openai.com/v1/engines/text-davinci-003/completions`,
//       {
//         prompt: `turn this into a menu ${transledText}`,
//         max_tokens: 512,
//         temperature: 0,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${apiKey}`,
//         },
//       }
//     );

//     const generatedText = response.data.choices[0].text;
//     console.log(generatedText);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// generateText();
