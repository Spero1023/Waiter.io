export const languageMap = {
        en: 'English',
        fr: 'Français', //French
        da: 'Dansk', //Danish
        it: 'Italiano',//Italian
        es: 'Español', // Spanish
        pt: 'Português', // Portuguese
        ar: 'عربى', // Arabic
        he: 'עִבְרִית', // Hebrew
        ru: 'русский', // Russian
        el: 'Ελληνικά', // Greek
        de: 'Deutsch', // German
        zh: '中文', // Chinese
        no: 'Norsk', // Norwegian
        ko: '한국어', // Korean
        ja: '日本語', // Japanese
        fi: 'Suomi', // Finnish
        sv: 'Svenska', // Swedish
        vi: 'Tiếng Việt', // Vietnamese
        tr: 'Türkçe', // Turkish
        hi: 'हिन्दी', // Hindi
        ur: 'اردو', // Urdu
        ps: 'پښتو', // Pashto
        fa: 'فارسی', // Persian/Farsi
        bn: 'বাংলা', // Bengali
        hu: 'Magyar', // Hungarian
        th: 'ไทย', // Thai
        id: 'Bahasa Indonesia', // Indonesian
        pl: 'Polski', // Polish
        tl: 'Tagalog', // Tagalog
        sk: 'Slovenčina', // Slovak
        sl: 'Slovenščina', // Slovenian
        uk: 'Українська', // Ukrainian
    }

  
export const languageReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SELECTED_LANGUAGE':
        return { ...state, selectedLanguage: action.payload };
      default:
        return state;
    }
  };