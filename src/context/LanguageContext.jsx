import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
    es: {
        nav: {
            vision: 'Visión',
            identity: 'Identidad',
            legal: 'Legal',
            terminal: 'Acceso Terminal',
            launch: 'Lanzar Terminal',
            market: 'Explorar Mercado'
        },
        hero: {
            title: 'EL ESTÁNDAR GLOBAL DE CONFIANZA.',
            description: 'Transformamos la conservación en el activo financiero más líquido y transparente del planeta. Una terminal institucional para el intercambio de valor ambiental.',
            credits: 'Créditos Gestionados',
            volume: 'Volumen Diario',
            load: 'Carga de Proyecto',
            settlement: 'Liquidación'
        },
        dashboard: {
            portfolio: 'Portafolio Activo',
            identity_id: 'Mi Perfil',
            market: 'Terminal Mercado',
            passport: 'Pasaporte',
            hub: 'Green Hub',
            corporate: 'Corporativo',
            compliance_hub: 'Cumplimiento',
            originator: 'Originador',
            settlement_info: 'Settlement',
            admin: 'Panel Admin',
            logout: 'Salir'
        },
        vision: {
            label: 'Arquitectura Maestra',
            title: 'DE UN DASHBOARD A UNA STATION DE TRADING',
            desc: 'CPX no es solo una plataforma; es una infraestructura diseñada para la precisión. Inspirada en la robustez de Bloomberg y la agilidad de los exchanges modernos.'
        },
        identity: {
            label: 'Sistema Impact ID',
            title: 'TU IDENTIDAD, TU LEGADO',
            desc: 'Cada contribución genera un Impact ID dinámico. Una tarjeta de identidad 3D que rastrea tu rango, tu CPX Score y tu legado en la regeneración planetaria.',
            cta: 'Reclamar mi Identidad'
        },
        compliance: {
            label: 'Marco Blindado',
            title: 'BLINDAJE LEGAL INSTITUCIONAL',
            item1_title: 'Cumplimiento Ley 2173',
            item1_desc: 'Cumplimiento automático de la obligación de siembra para empresas con reporteo legal inmutable.',
            item2_title: 'Activos Digitales VARA',
            item2_desc: 'Estructura operativa bajo estándares de activos virtuales internacionales para máxima seguridad legal.',
            item3_title: 'Certificación RENARE',
            item3_desc: 'Liquidación granular sincronizada con el Registro Nacional de Reducción de Emisiones.'
        },
        marketplace: {
            title: 'Mercado Institucional de Carbono',
            active_signals: 'Señales Activas',
            live: 'EN VIVO',
            search_placeholder: 'BUSCAR PROYECTO O REGID...',
            view_b2b: 'VISTA B2B (t)',
            view_b2c: 'VISTA RETAIL (g)',
            table: {
                project: 'Proyecto',
                location: 'Ubicación',
                available: 'Disponible',
                price: 'Precio Spot',
                status: 'Estado'
            },
            terminal: {
                title: 'Terminal de Ejecución',
                buy: 'COMPRAR',
                sell: 'VENDER',
                amount: 'Cantidad',
                total: 'Total Estimado',
                execute: 'EJECUTAR ORDEN',
                transaction_volume: 'Volumen de Transacción'
            },
            stats: {
                liquidity: 'Liquidez Global',
                market_price: 'Precio de Mercado (Prom)',
                daily_volume: 'Volumen Diario CPX',
                active_nodes: 'Nodos Activos'
            }
        },
        originator: {
            register: 'Registro de Conservación',
            impact: 'Gestión de Impacto',
            projects: 'Mis Proyectos',
            form: {
                name: 'Nombre del Proyecto',
                area: 'Área (Ha)',
                coords: 'Coordenadas',
                regid: 'ID RENARE',
                upload_image: 'Foto de Portada',
                upload_legal: 'Evidencia Legal (PDF)',
                submit: 'Registrar en Ledger'
            },
            management: {
                title: 'Liquidación Legal',
                amount: 'Toneladas a Mitigar',
                nit: 'NIT Contribuyente',
                save: 'Subir al Mapa'
            }
        },
        corporate: {
            profile: 'Perfil Corporativo & ESG',
            status_transition: 'En Transición a Carbono Neutro',
            total_offset: 'Compensación Total',
            certificates_count: 'Certificados DIAN',
            tabs: {
                inventory: 'Inventario de Impacto',
                compliance: 'Cumplimiento Ley 2173',
                vault: 'Bóveda de Certificados'
            },
            compliance: {
                law_title: 'Ley 2173 de 2021',
                employees: 'Empleados',
                goal: 'Meta Anual',
                planted: 'Plantados',
                progress: 'Progreso de Cumplimiento',
                audit_status: 'Estado de Auditoría',
                download: 'Descargar Certificado Anual'
            }
        },
        landing: {
            hero: {
                badge: 'Protocolo RWA • Grado Institucional',
                title_part1: 'GLOBAL',
                title_part2: 'DESCARBONIZACIÓN',
                title_part3: 'INFRAESTRUCTURA',
                desc: 'Conectamos el capital global con activos de regeneración biológica certificados. $80,000,000 EN ACTIVOS VERDES TOKENIZADOS.',
                cta_terminal: 'Lanzar Terminal',
                cta_whitepaper: 'Ver Documentación',
                signals_label: 'Motor de Señales en Vivo',
                stats: {
                    inventory: 'Stock de Inventario',
                    sovereign: 'Protocolo',
                    gas: 'Pool de Gas $SIGNAL',
                    throughput: 'Rendimiento de Red',
                    latest: 'Última Liquidación'
                },
                ribbon: {
                    certified: 'Certificado por: COLCX',
                    region: 'Región: Amazonas + Expansión Multi-Bioma',
                    custody: 'Custodia: Smart Contract Multi-Sig',
                    partner: 'Socio Fintech:'
                }
            },
            nav: {
                vision: 'Visión',
                assets: 'Activos',
                reputation: 'Impacto',
                infrastructure: 'Capa Global',
                sovereignty: 'Conectividad',
                whitepaper: 'Whitepaper 3.0'
            },
            infrastructure: {
                title_part1: 'Climate Pass™:',
                title_part2: 'Identidad Climática Persistente.',
                desc: 'No es un programa de recompensas. Es una infraestructura digital que captura señales económicas reales (CSU) y las convierte en una memoria persistente de tu compromiso con el planeta.',
                csu_title: 'Lógica CSU',
                csu_desc: 'Climate Signal Units: El lenguaje funcional del comportamiento climático.',
                memory_title: 'Memoria On-Chain',
                memory_desc: 'Trayectoria inmutable respaldada por cada acción económica cotidiana.',
                ecosystem_title: 'Ecosistema de Identidad',
                citizenship: {
                    title: 'Green Citizenship™',
                    role: 'Para Personas Naturales',
                    desc: 'Identidad y acumulación conductual basada en hábitos de consumo y vida.'
                },
                steward: {
                    title: 'Climate Steward™',
                    role: 'Para Personas Jurídicas',
                    desc: 'Sello institucional de reputación basado en integración operativa y coherencia.'
                },
                partner: {
                    title: 'CO2Pay™ Partner',
                    role: 'La Pasarela de Impacto',
                    desc: 'Infraestructura fintech que habilita la captura de señales en la economía real.'
                }
            },
            benefits: {
                badge: 'Soberanía por Niveles',
                title_part1: 'Aliados &',
                title_part2: 'Beneficios Exclusivos.',
                executive: {
                    tier: 'Ejecutivo / B2B',
                    benefits: ['Créditos Fiscales (Ley 2173 / ISO 14064)', 'Acceso a Green Loans (Tasa Preferencial)', 'Certificado de Compensación Auditor-Ready', "Logo en 'Global Transparency Wall'"]
                },
                merchant: {
                    tier: 'Comercio / Socio',
                    benefits: ['Captura de Signals en Check-out', "Sello 'Zero-Carbon Business'", 'Priority Network Settlement', 'Dashboard de Analítica Verde']
                },
                citizen: {
                    tier: 'Ciudadano / Guardián',
                    benefits: ['VIP Green Lounges & Eventos', 'Cashback en $CARBON con CO2Pay', 'Gobernanza en Bio-Regeneration Pools', 'NFTs Raros Multi-Bioma']
                },
                cta: 'Verificar Acuerdo'
            },
            co2pay: {
                badge: 'Soberanía Fintech',
                title_part1: 'CO2PAY™',
                title_part2: 'Tarjeta Climática.',
                desc: 'La primera tarjeta diseñada para tokenizar el comportamiento planetario. Obtén beneficios exclusivos con aliados comerciales y empresas que compensan, aumentando tu score mediante señales de acción climática verificadas.',
                rewards: 'Recompensas',
                rewards_desc: 'Cashback en $CARBON',
                access: 'Acceso',
                access_desc: 'VIP Green Lounges',
                cta: 'Solicitar Protocolo de Acceso'
            },
            sovereignty: {
                title_part1: 'INFRAESTRUCTURA:',
                title_part2: 'CONECTIVIDAD GLOBAL',
                desc: 'Una red de grado institucional diseñada para la transición climática. Liquidación de activos con latencia cero y cumplimiento normativo integrado bajo el estándar Subnet.',
                token_title: '$SIGNAL: Motor de Gas',
                token_desc: 'El combustible soberano de la red. Cada acción climática genera una señal validada en tiempo real sobre el ledger de CPX.',
                compliance_title: 'Sello Institucional',
                compliance_desc: 'Validación automática de activos ambientales bajo los estándares globales más exigentes (VARA/VCS).',
                mesh_title: 'Global Mesh Architecture',
                mesh_desc: 'Conectividad absoluta entre capital institucional y activos de regeneración biológica.',
                ux_title: 'UX Invisible',
                ux_desc: 'Tecnología de abstracción total. Gestiona tu huella climática con la fluidez de las finanzas tradicionales.',
                bridge_title: 'Liquidación Atómica',
                bridge_desc: 'Eliminación de fricción burocrática mediante contratos inteligentes de ejecución inmediata.',
                stats: {
                    speed: 'Velocidad de Respuesta',
                    guarantee: 'Garantía de Liquidación',
                    atomic: 'Atómica',
                    structure: 'Estructura Operativa'
                }
            },
            model: {
                step_title: 'Flujo Silent Onboarding™',
                steps: [
                    { title: 'Compensación en Caja', desc: 'El cliente compensa gramos de CO2 en su factura física sin tener cuenta previa.' },
                    { title: 'Oracle de Mensajería', desc: 'El sistema envía un SMS/Email con su trayectoria inicial generada.' },
                    { title: 'Activación de Memoria', desc: 'El usuario completa su registro y reclama su Score acumulado.' }
                ],
                main_title_part1: 'La Exponencialidad',
                main_title_part2: 'del Impacto.',
                main_desc: 'Transformamos cada factura física en una señal climática inmutable. Los comercios se convierten en nodos de regeneración.',
                cta_merchant: 'Registrar Comercio',
                cta_badge: 'Hazte Negocio Verde'
            },
            fractional: {
                title: 'El Mercado Fraccionado de Impacto.',
                subtitle: '1 Tonelada Certificada = 1,000,000 Gramos de Acción Real.',
                item1_title: 'Valor Inherente, No Especulativo',
                item1_desc: 'Cada token $CARBON representa un gramo real de CO2 retirado. Es un mecanismo de compensación.',
                item2_title: '$40 USD / Tonelada',
                item2_desc: 'Benchmark institucional para cumplimiento global, fraccionado para acción ciudadana.',
                stock_badge: 'Stock de Impacto Global',
                stock_title: 'Créditos Certificados ColCX',
                cta_buy: 'Adquirir en Gramos',
                cta_verify: 'Ver Certificaciones'
            },
            leaders: {
                title_part1: 'Líderes de',
                title_part2: 'Global Score',
                desc: 'Transparencia en el corazón de la nueva economía climática.',
                cta_all: 'Listados Globales Completos',
                categories: [
                    { title: 'Empresas Top', players: ['Shell ESG', 'Delta Air', 'Google Cloud'] },
                    { title: 'Negocios Verdes', players: ['Starbucks Bogotá', 'Juan Valdez', 'Crepes & Waffles'] },
                    { title: 'Guardianes Humanos', players: ['Lucas M.', 'Elena R.', 'Sebastian V.'] }
                ]
            },
            footer: {
                desc: 'La infraestructura soberana para la nueva economía climática. Acción planetaria verificable bajo estándares institucionales.',
                columns: {
                    ecosystem: 'Ecosystem',
                    resources: 'Resources',
                    compliance: 'Compliance',
                    legal: 'Legal',
                    marketplace: 'Marketplace RWA',
                    subnet: 'Subred Soberana',
                    co2pay: 'Protocolo CO2Pay',
                    score: 'Puntaje Climático',
                    whitepaper: 'Whitepaper v3.0',
                    devs: 'Documentación Dev',
                    media: 'Kit de Prensa',
                    registry: 'Registro de Quemas',
                    terms: 'Términos Legales',
                    kyc: 'Política KYC/AML',
                    vesting: 'Términos de Vesting',
                    audit: 'Auditoría de Contratos'
                },
                status: 'Estado Global: Estable',
                powered: 'Soportado por Avalanche Evergreen'
            },
            whitepaper: {
                modal_title: 'Whitepaper Institucional v3.0',
                date: 'Infraestructura de Descarbonización Global • Ene 2026',
                manifesto_title: 'Manifiesto de Soberanía Climática',
                manifesto_desc: 'Amazonas Cero no es solo un mercado; es la capa de transaccionalidad de la biósfera.',
                abstract_title: 'Resumen',
                cta_download: 'Descargar Documento Maestro (PDF)',
                close: 'Cerrar Documento'
            }
        }
    },
    en: {
        nav: {
            vision: 'Vision',
            identity: 'Identity',
            legal: 'Legal',
            terminal: 'Terminal Access',
            launch: 'Launch Terminal',
            market: 'Explore Market'
        },
        hero: {
            title: 'THE GLOBAL STANDARD OF TRUST.',
            description: 'We transform conservation into the most liquid and transparent financial asset on the planet. An institutional terminal for environmental value exchange.',
            credits: 'Managed Credits',
            volume: 'Daily Volume',
            load: 'Project Load',
            settlement: 'Settlement'
        },
        dashboard: {
            portfolio: 'Active Portfolio',
            identity_id: 'My Profile',
            market: 'Market Terminal',
            passport: 'Passport',
            hub: 'Green Hub',
            corporate: 'Corporate Cabinet',
            compliance_hub: 'Compliance Hub',
            originator: 'Originator',
            settlement_info: 'Settlement Info',
            admin: 'Admin Panel',
            logout: 'Exit Terminal'
        },
        vision: {
            label: 'Master Architecture',
            title: 'FROM A DASHBOARD TO A TRADING STATION',
            desc: 'CPX is not just a platform; it is an infrastructure designed for precision. Inspired by the robustness of Bloomberg and the agility of modern exchanges.'
        },
        identity: {
            label: 'Impact ID System',
            title: 'YOUR IDENTITY, YOUR LEGACY',
            desc: 'Every contribution generates a dynamic Impact ID. A 3D identity card that tracks your rank, your CPX Score, and your legacy in planetary regeneration.',
            cta: 'Claim my Identity'
        },
        compliance: {
            label: 'Bulletproof Framework',
            title: 'INSTITUTIONAL LEGAL SHIELD',
            item1_title: 'Law 2173 Compliance',
            item1_desc: 'Automatic compliance with the planting obligation for companies with immutable legal reporting.',
            item2_title: 'VARA Digital Assets',
            item2_desc: 'Operational structure under international virtual asset standards for maximum legal security.',
            item3_title: 'RENARE Certification',
            item3_desc: 'Granular settlement synchronized with the National Emission Reduction Registry.'
        },
        marketplace: {
            title: 'Institutional Carbon Market',
            active_signals: 'Active Signals',
            live: 'LIVE',
            search_placeholder: 'SEARCH PROJECT OR REGID...',
            view_b2b: 'B2B VIEW (t)',
            view_b2c: 'RETAIL VIEW (g)',
            table: {
                project: 'Project',
                location: 'Location',
                available: 'Available',
                price: 'Spot Price',
                status: 'Status'
            },
            terminal: {
                title: 'Execution Terminal',
                buy: 'BUY',
                sell: 'SELL',
                amount: 'Amount',
                total: 'Estimated Total',
                execute: 'EXECUTE ORDER',
                transaction_volume: 'Transaction Volume'
            },
            stats: {
                liquidity: 'Global Liquidity',
                market_price: 'Market Price (Avg)',
                daily_volume: 'CPX Daily Volume',
                active_nodes: 'Active Nodes'
            }
        },
        originator: {
            register: 'Conservation Register',
            impact: 'Impact Management',
            projects: 'My Projects',
            form: {
                name: 'Project Name',
                area: 'Area (Ha)',
                coords: 'Coordinates',
                regid: 'RENARE ID',
                upload_image: 'Cover Photo',
                upload_legal: 'Legal Evidence (PDF)',
                submit: 'Register on Ledger'
            },
            management: {
                title: 'Legal Settlement',
                amount: 'Tons to Mitigate',
                nit: 'Tax ID (NIT)',
                save: 'Upload to Map'
            }
        },
        corporate: {
            profile: 'Corporate Profile & ESG',
            status_transition: 'In Transition to Carbon Neutral',
            total_offset: 'Total Offset',
            certificates_count: 'DIAN Certificates',
            tabs: {
                inventory: 'Impact Inventory',
                compliance: 'Law 2173 Compliance',
                vault: 'Certificate Vault'
            },
            compliance: {
                law_title: 'Law 2173 of 2021',
                employees: 'Employees',
                goal: 'Annual Goal',
                planted: 'Planted',
                progress: 'Compliance Progress',
                audit_status: 'Audit Status',
                download: 'Download Annual Certificate'
            }
        },
        landing: {
            hero: {
                badge: 'Real World Asset (RWA) Protocol',
                title_part1: 'DIGITIZING',
                title_part2: 'NATURE',
                title_part3: 'AT GLOBAL SCALE',
                desc: 'The leading platform for carbon offsetting and environmental asset management. Transform your impact into verifiable real value.',
                cta_terminal: 'Launch Terminal',
                cta_whitepaper: 'View Specs',
                signals_label: 'Live Signals Engine',
                stats: {
                    inventory: 'Inventory Stock',
                    sovereign: 'Protocol',
                    gas: '$SIGNAL Gas Pool',
                    throughput: 'Network Throughput',
                    latest: 'Latest Settlement'
                },
                ribbon: {
                    certified: 'Certified by: COLCX',
                    region: 'Region: Amazonas + Multi-Biome Expansion',
                    custody: 'Custody: Multi-Sig Smart Contract',
                    partner: 'Fintech Partner:'
                }
            },
            nav: {
                vision: 'Vision',
                assets: 'Assets',
                reputation: 'Impact',
                infrastructure: 'Global Layer',
                sovereignty: 'Connectivity',
                whitepaper: 'Whitepaper 3.0'
            },
            infrastructure: {
                title_part1: 'Climate Pass™:',
                title_part2: 'Persistent Climate Identity.',
                desc: 'Not a rewards program. It is a digital infrastructure that captures real economic signals (CSU) and converts them into a persistent memory of your commitment to the planet.',
                csu_title: 'CSU Logic',
                csu_desc: 'Climate Signal Units: The functional language of climate behavior.',
                memory_title: 'On-Chain Memory',
                memory_desc: 'Immutable trajectory backed by every daily economic action.',
                ecosystem_title: 'Identity Ecosystem',
                citizenship: {
                    title: 'Green Citizenship™',
                    role: 'For Individuals',
                    desc: 'Behavioral identity and accumulation based on consumption and life habits.'
                },
                steward: {
                    title: 'Climate Steward™',
                    role: 'For Legal Entities',
                    desc: 'Institutional reputation seal based on operational integration and consistency.'
                },
                partner: {
                    title: 'CO2Pay™ Partner',
                    role: 'The Impact Gateway',
                    desc: 'Fintech infrastructure that enables signal capture in the real economy.'
                }
            },
            benefits: {
                badge: 'Tier-Based Sovereignty',
                title_part1: 'Allied Perks &',
                title_part2: 'Exclusive Benefits.',
                executive: {
                    tier: 'Executive / B2B',
                    benefits: ['Tax Credits (Law 2173 / ISO 14064)', 'Green Loans Access (Pref. Rate)', 'Auditor-Ready Offset Certificate', "Logo on 'Global Transparency Wall'"]
                },
                merchant: {
                    tier: 'Merchant / Partner',
                    benefits: ['Signal Capture at Check-out', "'Zero-Carbon Business' Seal", 'Priority Network Settlement', 'Green Analytics Dashboard']
                },
                citizen: {
                    tier: 'Citizen / Guardian',
                    benefits: ['VIP Green Lounges & Events', 'Cashback in $CARBON with CO2Pay', 'Bio-Regeneration Pools Governance', 'Multi-Biome Rare NFTs']
                },
                cta: 'Verify Agreement'
            },
            co2pay: {
                badge: 'Fintech Sovereignty',
                title_part1: 'CO2PAY™',
                title_part2: 'Climated Card.',
                desc: 'The first card designed to tokenize planetary behavior. Get exclusive benefits with merchant allies and companies that offset, increasing your score through verified climate action signals.',
                rewards: 'Rewards',
                rewards_desc: 'Cashback in $CARBON',
                access: 'Access',
                access_desc: 'VIP Green Lounges',
                cta: 'Request Access Protocol'
            },
            sovereignty: {
                title_part1: 'INFRASTRUCTURE:',
                title_part2: 'GLOBAL CONNECTIVITY',
                desc: 'An institutional-grade network designed for climate transition. Zero-latency asset settlement and integrated regulatory compliance under the Subnet standard.',
                token_title: '$SIGNAL: Gas Motor',
                token_desc: 'The sovereign fuel of the network. Every climate action generates a signal validated in real-time on the CPX ledger.',
                compliance_title: 'Institutional Seal',
                compliance_desc: 'Automatic validation of environmental assets under the most demanding global standards (VARA/VCS).',
                mesh_title: 'Global Mesh Architecture',
                mesh_desc: 'Absolute connectivity between institutional capital and biological regeneration assets.',
                ux_title: 'Invisible UX',
                ux_desc: 'Total abstraction technology. Manage your climate footprint with the fluidity of traditional finance.',
                bridge_title: 'Atomic Settlement',
                bridge_desc: 'Elimination of bureaucratic friction through immediate-execution smart contracts.',
                stats: {
                    speed: 'Response Speed',
                    guarantee: 'Settlement Guarantee',
                    atomic: 'Atomic',
                    structure: 'Operational Structure'
                }
            },
            model: {
                step_title: 'Silent Onboarding™ Flow',
                steps: [
                    { title: 'Checkout Offset', desc: 'Customer offsets grams of CO2 in their physical invoice without a prior account.' },
                    { title: 'Messaging Oracle', desc: 'System sends an SMS/Email with their initial generated trajectory.' },
                    { title: 'Memory Activation', desc: 'User completes registration and claims their accumulated Score.' }
                ],
                main_title_part1: 'The Exponential',
                main_title_part2: 'Impact.',
                main_desc: 'We transform every physical invoice into an immutable climate signal. Businesses become regeneration nodes.',
                cta_merchant: 'Register Merchant',
                cta_badge: 'Become a Green Business'
            },
            fractional: {
                title: 'The Fractional Impact Market.',
                subtitle: '1 Certified Ton = 1,000,000 Grams of Real Action.',
                item1_title: 'Inherent Value, Non-Speculative',
                item1_desc: 'Every $CARBON token represents a real retired gram of CO2. It is an offset mechanism.',
                item2_title: '$40 USD / Ton',
                item2_desc: 'Institutional benchmark for global compliance, fractioned for citizen action.',
                stock_badge: 'Global Impact Stock',
                stock_title: 'ColCX Certified Credits',
                cta_buy: 'Purchase in Grams',
                cta_verify: 'View Certifications'
            },
            leaders: {
                title_part1: 'Global',
                title_part2: 'Score Leaders',
                desc: 'Transparency at the heart of the new climate economy.',
                cta_all: 'Full Global Listings',
                categories: [
                    { title: 'Top Companies', players: ['Shell ESG', 'Delta Air', 'Google Cloud'] },
                    { title: 'Green Business', players: ['Starbucks Bogotá', 'Juan Valdez', 'Crepes & Waffles'] },
                    { title: 'Human Guardians', players: ['Lucas M.', 'Elena R.', 'Sebastian V.'] }
                ]
            },
            footer: {
                desc: 'The sovereign infrastructure for the new climate economy. Verifiable planetary action under institutional standards.',
                columns: {
                    ecosystem: 'Ecosystem',
                    resources: 'Resources',
                    compliance: 'Compliance',
                    legal: 'Legal',
                    marketplace: 'Marketplace RWA',
                    subnet: 'Sovereign Subnet',
                    co2pay: 'CO2Pay Protocol',
                    score: 'Climate Score',
                    whitepaper: 'Whitepaper v3.0',
                    devs: 'Developer Docs',
                    media: 'Media Kit',
                    registry: 'Burn Registry',
                    terms: 'Legal Terms',
                    kyc: 'KYC/AML Policy',
                    vesting: 'Vesting Terms',
                    audit: 'Smart Contract Audit'
                },
                status: 'Global Mesh Status: Stable',
                powered: 'Powered by Avalanche Evergreen'
            },
            whitepaper: {
                modal_title: 'Institutional Whitepaper v3.0',
                date: 'Global Decarbon Infrastructure • Jan 2026',
                manifesto_title: 'Climate Sovereignty Manifesto',
                manifesto_desc: 'Amazonas Cero is not just a marketplace; it is the biospheres transaction layer.',
                abstract_title: 'Abstract',
                cta_download: 'Download Master Document (PDF)',
                close: 'Close Document'
            }
        }
    },
    ar: {
        nav: {
            vision: 'رؤية',
            identity: 'هوية',
            legal: 'قانوني',
            terminal: 'دخول المحطة',
            launch: 'إطلاق المحطة',
            market: 'استكشاف السوق'
        },
        hero: {
            title: 'المعيار العالمي للثقة.',
            description: 'نحول الحفاظ على البيئة إلى الأصول المالية الأكثر سيولة وشفافية على الكوكب. محطة مؤسسية لتبادل القيمة البيئية.',
            credits: 'الاعتمادات المدارة',
            volume: 'الحجم اليومي',
            load: 'تحميل المشروع',
            settlement: 'التسوية'
        },
        dashboard: {
            portfolio: 'المحفظة النشطة',
            identity_id: 'هوية التأثير',
            market: 'محطة السوق',
            passport: 'جواز سفر التأثير',
            hub: 'المركز الأخضر',
            corporate: 'مركز الامتثال',
            compliance_hub: 'مركز الامتثال',
            originator: 'المنشئ',
            settlement_info: 'معلومات التسوية',
            admin: 'لوحة الإدارة',
            logout: 'الخروج من المحطة'
        },
        vision: {
            label: 'العمارة الرئيسية',
            title: 'من لوحة معلومات إلى محطة تداول',
            desc: 'CPX ليست مجرد منصة؛ إنها بنية تحتية مصممة للدقة. مستوحاة من قوة بلومبرج ورشاقة البورصات الحديثة.'
        },
        identity: {
            label: 'نظام هوية التأثير',
            title: 'هويتك، إرثك',
            desc: 'كل مساهمة تولد هوية تأثير ديناميكية. بطاقة هوية تأثير تتبع رتبتك ودرجة CPX وإرثك في التجديد الكوكبي.',
            cta: 'المطالبة بهويتي'
        },
        compliance: {
            label: 'إطار لا يمكن اختراقه',
            title: 'درع قانوني مؤسسي',
            item1_title: 'الامتثال للقانون 2173',
            item1_desc: 'الامتثال التلقائي لالتزام الزراعة للشركات مع تقديم تقارير قانونية غير قابلة للتغيير.',
            item2_title: 'أصول فارا الرقمية',
            item2_desc: 'هيكل تشغيلي وفقاً لمعايير الأصول الافتراضية الدولية لأقصى قدر من الأمن القانوني.',
            item3_title: 'شهادة ريناري',
            item3_desc: 'تسوية دقيقة متزامنة مع السجل الوطني للحد من الانبعاثات.'
        },
        marketplace: {
            title: 'سوق الكربون المؤسسي',
            active_signals: 'الإشارات النشطة',
            live: 'مباشر',
            search_placeholder: 'بحث عن مشروع...',
            view_b2b: 'عرض B2B (طن)',
            view_b2c: 'عرض التجزئة (جرام)',
            table: {
                project: 'المشروع',
                location: 'الموقع',
                available: 'المتاح',
                price: 'السعر الفوري',
                status: 'الحالة'
            },
            terminal: {
                title: 'محطة التنفيذ',
                buy: 'شراء',
                sell: 'بيع',
                amount: 'الكمية',
                total: 'الإجمالي المقدر',
                execute: 'تنفيذ الأمر'
            },
            stats: {
                liquidity: 'السيولة العالمية',
                market_price: 'سعر السوق (متوسط)',
                daily_volume: 'حجم التداول اليومي CPX',
                active_nodes: 'العقد النشطة'
            }
        },
        originator: {
            register: 'سجل الحفظ',
            impact: 'إدارة التأثير',
            projects: 'مشاريعي',
            form: {
                name: 'اسم المشروع',
                area: 'المساحة (هكتار)',
                coords: 'الإحداثيات',
                regid: 'معرف RENARE',
                upload_image: 'صورة الغلاف',
                upload_legal: 'الأدلة القانونية (PDF)',
                submit: 'تسجيل في السجل'
            }
        },
        corporate: {
            profile: 'ملف الشركة و ESG',
            status_transition: 'في مرحلة الانتقال إلى حياد الكربون',
            total_offset: 'إجمالي التعويض',
            certificates_count: 'شهادات DIAN',
            tabs: {
                inventory: 'مخزون التأثير',
                compliance: 'الامتثال للقانون 2173',
                vault: 'خزنة الشهادات'
            },
            compliance: {
                law_title: 'القانون 2173 لعام 2021',
                employees: 'الموظفون',
                goal: 'الهدف السنوي',
                planted: 'المزروع',
                progress: 'تقدم الامتثال',
                audit_status: 'حالة التدقيق',
                download: 'تحميل الشهادة السنو'
            }
        },
        landing: {
            hero: {
                badge: 'بروتوكول الأصول الحقيقية (RWA)',
                title_part1: 'الرقمنة',
                title_part2: 'الطبيعة',
                title_part3: 'على نطاق عالمي',
                desc: 'المنصة الرائدة لتعويض الكربون وإدارة الأصول البيئية. حول تأثيرك إلى قيمة حقيقية يمكن التحقق منها.',
                cta_terminal: 'إطلاق المحطة',
                cta_whitepaper: 'عرض الوثائق',
                signals_label: 'محرك الإشارات المباشر',
                stats: {
                    inventory: 'مخزون الجرد',
                    sovereign: 'بروتوكول',
                    gas: 'مجمع غاز $SIGNAL',
                    throughput: 'إنتاجية الشبكة',
                    latest: 'آخر تسوية'
                },
                ribbon: {
                    certified: 'معتمد من قبل: COLCX',
                    region: 'المنطقة: الأمازون + توسع متعدد المناطق البيئية',
                    custody: 'الحفظ: عقد ذكي متعدد التوقيع',
                    partner: 'شريك فينتك:'
                }
            },
            nav: {
                vision: 'الرؤية',
                assets: 'الأصول',
                reputation: 'التأثير',
                infrastructure: 'الطبقة العالمية',
                sovereignty: 'الاتصال',
                whitepaper: 'Whitepaper 3.0'
            },
            infrastructure: {
                title_part1: 'Climate Pass™:',
                title_part2: 'الهوية المناخية المستمرة.',
                desc: 'ليس برنامج مكافآت. إنها بنية تحتية رقمية تلتقط الإشارات الاقتصادية الحقيقية (CSU) وتحولها إلى ذاكرة مستمرة لالتزامك تجاه الكوكب.',
                csu_title: 'منطق CSU',
                csu_desc: 'وحدات إشارة المناخ: اللغة الوظيفية للسلوك المناخي.',
                memory_title: 'الذاكرة على السلسلة',
                memory_desc: 'مسار غير قابل للتغيير مدعوم بكل عمل اقتصادي يومي.',
                ecosystem_title: 'نظام الهوية البيئي',
                citizenship: {
                    title: 'Green Citizenship™',
                    role: 'للأفراد',
                    desc: 'الهوية السلوكية والتراكم القائم على عادات الاستهلاك والحياة.'
                },
                steward: {
                    title: 'Climate Steward™',
                    role: 'للكيانات القانونية',
                    desc: 'ختم السمعة المؤسسية القائم على التكامل التشغيلي والاتساق.'
                },
                partner: {
                    title: 'CO2Pay™ Partner',
                    role: 'بوابة التأثير',
                    desc: 'بنية تحتية للتكنولوجيا المالية تمكن من التقاط الإشارات في الاقتصاد الحقيقي.'
                }
            },
            benefits: {
                badge: 'السيادة القائمة على المستويات',
                title_part1: 'الحلفاء و',
                title_part2: 'المزايا الحصرية.',
                executive: {
                    tier: 'تنفيذي / B2B',
                    benefits: ['الإعفاءات الضريبية (القانون 2173 / ISO 14064)', 'الوصول إلى القروض الخضراء (سعر تفضيلي)', 'شهادة تعويض جاهزة للتدقيق', 'الشعار في جدار الشفافية العالمي']
                },
                merchant: {
                    tier: 'تاجر / شريك',
                    benefits: ['التقاط الإشارات عند الدفع', 'ختم عمل خالٍ من الكربون', 'أولوية تسوية الشبكة', 'لوحة تحليلات خضراء']
                },
                citizen: {
                    tier: 'مواطن / حارس',
                    benefits: ['صالات وأحداث VIP الخضراء', 'استرداد نقدي بـ $CARBON مع CO2Pay', 'حوكمة أحواض التجديد الحيوي', 'NFTs نادرة متعددة المناطق']
                },
                cta: 'التحقق من الاتفاقية'
            },
            co2pay: {
                badge: 'سيادة فينتك',
                title_part1: 'CO2PAY™',
                title_part2: 'البطاقة المناخية.',
                desc: 'أول بطاقة مصممة لترميز السلوك الكوكبي. احصل على مزايا حصرية مع حلفاء التجار والشركات التي تعوض، مما يزيد من درجاتك من خلال إشارات العمل المناخي المعتمدة.',
                rewards: 'مكافآت',
                rewards_desc: 'استرداد نقدي بـ $CARBON',
                access: 'وصول',
                access_desc: 'صالات VIP الخضراء',
                cta: 'طلب بروتوكول الوصول'
            },
            sovereignty: {
                title_part1: 'البنية التحتية:',
                title_part2: 'الاتصال العالمي',
                desc: 'شبكة من الدرجة المؤسسية مصممة للتحول المناخي. تسوية الأصول بزمن وصول صفر وامتثال تنظيمي متكامل تحت معيار Subnet.',
                token_title: '$SIGNAL: محرك الغاز',
                token_desc: 'الوقود السيادي للشبكة. كل عمل مناخي يولد إشارة يتم التحقق منها في الوقت الفعلي على سجل CPX.',
                compliance_title: 'الختم المؤسسي',
                compliance_desc: 'التحقق التلقائي من الأصول البيئية بموجب المعايير العالمية الأكثر صرامة (VARA/VCS).',
                mesh_title: 'هندسة الشبكة العالمية',
                mesh_desc: 'اتصال مطلق بين رأس المال المؤسسي وأصول التجديد البيولوجي.',
                ux_title: 'تجربة مستخدم غير مرئية',
                ux_desc: 'تقنية التجريد الكامل. قم بإدارة بصمتك المناخية بسلاسة التمويل التقليدي.',
                bridge_title: 'التسوية الذرية',
                bridge_desc: 'القضاء على الاحتكاك البيروقراطي من خلال العقود الذكية ذات التنفيذ الفوري.',
                stats: {
                    speed: 'سرعة الاستجابة',
                    guarantee: 'ضمان التسوية',
                    atomic: 'ذرية',
                    structure: 'الهيكل التشغيلي'
                }
            },
            model: {
                step_title: 'تدفق Silent Onboarding™',
                steps: [
                    { title: 'تعويض عند الدفع', desc: 'يعوض العميل جرامات CO2 في فاتورته المادية دون حساب مسبق.' },
                    { title: 'أوراكل الرسائل', desc: 'يرسل النظام رسالة نصية/بريداً إلكترونياً مع مسارهم الأولي المولد.' },
                    { title: 'تنشيط الذاكرة', desc: 'يكمل المستخدم التسجيل ويطالب بنتيجته المتراكمة.' }
                ],
                main_title_part1: 'التأثير',
                main_title_part2: 'الأسي.',
                main_desc: 'نحول كل فاتورة مادية إلى إشارة مناخية غير قابلة للتغيير. تصبح الشركات عقد تجديد.',
                cta_merchant: 'تسجيل التاجر',
                cta_badge: 'كن عملاً أخضر'
            },
            fractional: {
                title: 'سوق التأثير المجزأ.',
                subtitle: '1 طن معتمد = 1,000,000 جرام من العمل الحقيقي.',
                item1_title: 'قيمة جوهرية، ليست للمضاربة',
                item1_desc: 'كل رمز $CARBON يمثل جراماً فعلياً متقاعداً من CO2. إنها آلية تعويض.',
                item2_title: '40 دولار / طن',
                item2_desc: 'معيار مؤسسي للامتثال العالمي، مجزأ لعمل المواطنين.',
                stock_badge: 'مخزون التأثير العالمي',
                stock_title: 'اعتمادات معتمدة من ColCX',
                cta_buy: 'شراء بالجرامات',
                cta_verify: 'عرض الشهادات'
            },
            leaders: {
                title_part1: 'قادة',
                title_part2: 'الدرجات العالمية',
                desc: 'الشفافية في قلب الاقتصاد المناخي الجديد.',
                cta_all: 'القوائم العالمية الكاملة',
                categories: [
                    { title: 'أفضل الشركات', players: ['Shell ESG', 'Delta Air', 'Google Cloud'] },
                    { title: 'أعمال خضراء', players: ['Starbucks Bogotá', 'Juan Valdez', 'Crepes \u0026 Waffles'] },
                    { title: 'حراس البشر', players: ['Lucas M.', 'Elena R.', 'Sebastian V.'] }
                ]
            },
            footer: {
                desc: 'البنية التحتية السيادية للاقتصاد المناخي الجديد. عمل كوكبي قابل للتحقق بموجب المعايير المؤسسية.',
                columns: {
                    ecosystem: 'النظام البيئي',
                    resources: 'الموارد',
                    compliance: 'الامتثال',
                    legal: 'قانوني',
                    marketplace: 'سوق RWA',
                    subnet: 'الشبكة السيادية',
                    co2pay: 'بروتوكول CO2Pay',
                    score: 'النتيجة المناخية',
                    whitepaper: 'Whitepaper v3.0',
                    devs: 'وثائق المطورين',
                    media: 'مجموعة الصحافة',
                    registry: 'سجل الحرق',
                    terms: 'الشروط القانونية',
                    kyc: 'سياسة KYC/AML',
                    vesting: 'شروط الاستحقاق',
                    audit: 'تدقيق العقود'
                },
                status: 'حالة الشبكة العالمية: مستقرة',
                powered: 'مدعوم من Avalanche Evergreen'
            },
            whitepaper: {
                modal_title: 'التقرير المؤسسي v3.0',
                date: 'بنية تحتية عالمية لإزالة الكربون • يناير 2026',
                manifesto_title: 'بيان السيادة المناخية',
                manifesto_desc: 'Amazonas Cero ليس مجرد سوق؛ إنه طبقة معاملات البيئة.',
                abstract_title: 'ملخص',
                cta_download: 'تحميل المستند الرئيسي (PDF)',
                close: 'إغلاق المستند'
            }
        }
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('cpx-lang') || 'es';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.setAttribute('lang', language);
        if (language === 'ar') {
            root.setAttribute('dir', 'rtl');
        } else {
            root.setAttribute('dir', 'ltr');
        }
        localStorage.setItem('cpx-lang', language);
    }, [language]);

    const translate = (key) => {
        const keys = key.split('.');
        let result = translations[language];
        for (const k of keys) {
            if (result[k]) result = result[k];
            else return key;
        }
        return result;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t: translate }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
    return context;
};
