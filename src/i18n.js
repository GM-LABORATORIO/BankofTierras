import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'es',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        resources: {
            es: {
                translation: {
                    common: {
                        launch_dapp: "Lanzar DApp",
                        explore_globe: "Explorar Globo",
                        connect_wallet: "Conectar Wallet",
                        logout: "Cerrar Sesión",
                    },
                    dashboard: {
                        profile: "Mi Perfil",
                        market: "Mercado Carbono",
                        corporate: "Empresa",
                        technical: "Info Técnica",
                    }
                }
            },
            en: {
                translation: {
                    common: {
                        launch_dapp: "Launch DApp",
                        explore_globe: "Explore Globe",
                        connect_wallet: "Connect Wallet",
                        logout: "Logout",
                    },
                    dashboard: {
                        profile: "My Profile",
                        market: "Carbon Market",
                        corporate: "Corporate",
                        technical: "Tech Info",
                    }
                }
            },
            ar: {
                translation: {
                    common: {
                        launch_dapp: "إطلاق DApp",
                        explore_globe: "استكشاف الكرة الأرضية",
                        connect_wallet: "ربط المحفظة",
                        logout: "تسجيل الخروج",
                    },
                    dashboard: {
                        profile: "ملفي الشخصي",
                        market: "سوق الكربون",
                        corporate: "الشركات",
                        technical: "معلومات تقنية",
                    }
                }
            }
        }
    });

export default i18n;
