const config = {
    // ========== TEMA GLOBAL ==========
    theme: {
        colors: {
            primary: '#48191B',        // brand-dark (cor principal)
            primaryLight: '#6D2B2E',   // brand-light
            background: '#F9F7F2',     // brand-cream
            accent: '#D4AF37',         // brand-gold
            text: {
                dark: '#1F2937',       // gray-800
                medium: '#4B5563',     // gray-600
                light: '#6B7280',      // gray-500
                white: '#FFFFFF'
            }
        },
        fonts: {
            primary: '"Playfair Display", serif',  // Títulos e elementos editoriais
            secondary: '"Inter", sans-serif',      // Texto corrido
            urls: {
                google: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap'
            }
        },
        spacing: {
            container: 'container mx-auto px-6',
            section: 'py-24',
            sectionSmall: 'py-20'
        },
        animations: {
            aos: {
                duration: 800,
                once: true,
                offset: 100
            }
        },
        effects: {
            smoothScroll: true,
            imageZoomOnHover: true,
            scrollbar: {
                width: '8px',
                trackColor: '#F9F7F2',
                thumbColor: '#48191B',
                borderRadius: '4px'
            }
        }
    },

    // ========== SITE ==========
    site: {
        title: "Padaria Flor da Tibúrcio",
        name: "Flor da Tibúrcio",
        established: "Est. Itaim Paulista",
        logoAlt: "Logo Flor da Tibúrcio",
        logoUrl: "https://instagram.fcgh10-2.fna.fbcdn.net/v/t51.2885-19/91290522_610703732816103_2400387192292638720_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fcgh10-2.fna.fbcdn.net&_nc_cat=103&_nc_oc=Q6cZ2QEBsobwS0IXDBSvjyAM04Kr7UBtKtf1H0zqs56r1s5W-3uAoz3FlEzZ1qVTG9uy0mLNvi27dbJwVtzFHYzTyo_V&_nc_ohc=gfNr5Rx2g8EQ7kNvwEKSPob&_nc_gid=3G5UEA6EQC2vEKyIp6mJkg&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_Afl6hCHOrZbCnaqscxh0sr7IZwQFZ_GnwPAwzmWGxogVVw&oe=69477C94&_nc_sid=7a9f4b",
        logoFallback: "https://placehold.co/100x100/48191B/FFFFFF?text=FT",

        style: {
            body: {
                backgroundColor: '#F9F7F2',
                textColor: '#1F2937',
                fontFamily: '"Inter", sans-serif',
                antialiased: true,
                overflowX: 'hidden'
            }
        }
    },

    // ========== CONTATO ==========
    contact: {
        whatsapp: "5511937304737",
        phone: "(11) 93730-4737",
        instagram: "https://instagram.com/flordatiburciopadaria",
        instagramHandle: "@flordatiburciopadaria"
    },

    // ========== ENDEREÇO ==========
    address: {
        street: "Rua Tibúrcio de Sousa, 1351",
        neighborhood: "Itaim Paulista",
        city: "São Paulo",
        state: "SP",
        zipCode: "08140-000",
        full: "Rua Tibúrcio de Sousa, 1351, Itaim Paulista, São Paulo - SP, CEP: 08140-000",
        googleMapsQuery: "Rua+Tibúrcio+de+Sousa,+1351,+São+Paulo"
    },

    // ========== NAVEGAÇÃO ==========
    navigation: {
        about: "Sobre",
        services: "Produtos",
        location: "Localização",
        orderNow: "Peça Agora",
        makeOrder: "Fazer Pedido",

        style: {
            position: 'fixed',
            width: 'full',
            zIndex: 50,
            background: 'rgba(249, 247, 242, 0.9)',  // brand-cream/90
            backdropBlur: 'md',
            shadow: 'sm',
            border: {
                bottom: '1px solid rgba(72, 25, 27, 0.1)'  // brand-dark/10
            },
            logo: {
                size: 'w-12 h-12',
                shape: 'rounded-full',
                border: '2px solid #48191B',  // border-brand-dark
                hoverEffect: 'rotate-12',
                transition: 'transform 300ms'
            },
            siteName: {
                fontFamily: '"Playfair Display", serif',
                fontWeight: 'bold',
                fontSize: 'text-xl',
                color: '#48191B',
                letterSpacing: 'wide'
            },
            established: {
                fontSize: 'text-xs',
                color: '#6B7280',  // gray-500
                textTransform: 'uppercase',
                letterSpacing: 'wider'
            },
            links: {
                fontSize: 'text-sm',
                fontWeight: 'medium',
                hoverColor: '#48191B',  // brand-dark
                transition: 'colors'
            },
            ctaButton: {
                padding: 'px-6 py-2',
                backgroundColor: '#48191B',  // brand-dark
                textColor: '#FFFFFF',
                fontSize: 'text-sm',
                fontWeight: 'medium',
                borderRadius: 'rounded-full',
                hoverBackgroundColor: '#6D2B2E',  // brand-light
                transition: 'all',
                transform: 'hover:-translate-y-0.5',
                shadow: 'lg'
            },
            mobileMenu: {
                backgroundColor: '#F9F7F2',  // brand-cream
                padding: 'p-6',
                gap: 'gap-4',
                fontSize: 'text-lg',
                fontFamily: '"Playfair Display", serif'
            }
        }
    },

    // ========== HERO ==========
    hero: {
        badge: "Desde o coração do Itaim Paulista",
        title: "Sabor que cria",
        titleHighlight: "memórias.",
        subtitle: "Padaria, confeitaria e pizzaria. A tradição do pão quentinho e da pizza artesanal, entregue na sua porta.",
        ctaPrimary: "Fazer Pedido",
        ctaSecondary: "Explorar Cardápio",
        backgroundImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop",
        backgroundAlt: "Pão Fresco",

        style: {
            section: {
                position: 'relative',
                paddingTop: 'pt-20 lg:pt-48',
                paddingBottom: 'pb-20 lg:pb-32',
                overflow: 'hidden'
            },
            backgroundOverlay: {
                position: 'absolute inset-0',
                backgroundColor: 'rgba(72, 25, 27, 0.9)',  // brand-dark/90
                mixBlendMode: 'multiply',
                zIndex: 10
            },
            backgroundImage: {
                width: 'full',
                height: 'full',
                objectFit: 'cover'
            },
            container: {
                textAlign: 'center',
                zIndex: 20
            },
            badge: {
                display: 'inline-block',
                padding: 'py-1 px-3',
                border: '1px solid rgba(212, 175, 55, 0.5)',  // border-brand-gold/50
                borderRadius: 'rounded-full',
                color: '#D4AF37',  // brand-gold
                fontSize: 'text-xs',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                marginBottom: 'mb-6',
                animation: 'fade-down'
            },
            title: {
                fontFamily: '"Playfair Display", serif',
                fontSize: 'text-5xl md:text-7xl lg:text-8xl',
                color: '#FFFFFF',
                fontWeight: 'medium',
                lineHeight: 'tight',
                marginBottom: 'mb-8',
                animation: 'fade-up',
                animationDelay: '100ms'
            },
            titleHighlight: {
                fontStyle: 'italic',
                color: '#D4AF37'  // brand-gold
            },
            subtitle: {
                color: 'rgba(255, 255, 255, 0.8)',  // text-white/80
                maxWidth: 'max-w-xl',
                margin: 'mx-auto',
                fontSize: 'text-lg',
                marginBottom: 'mb-10',
                fontWeight: 'light',
                animation: 'fade-up',
                animationDelay: '200ms'
            },
            buttons: {
                display: 'flex flex-col sm:flex-row',
                justifyContent: 'center',
                gap: 'gap-4',
                animation: 'fade-up',
                animationDelay: '300ms'
            },
            ctaPrimary: {
                padding: 'px-8 py-4',
                backgroundColor: '#D4AF37',  // brand-gold
                color: '#48191B',  // brand-dark
                fontWeight: 'bold',
                borderRadius: 'rounded-full',
                hoverBackgroundColor: '#FFFFFF',
                transition: 'all',
                shadow: 'xl'
            },
            ctaSecondary: {
                padding: 'px-8 py-4',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#FFFFFF',
                fontWeight: 'medium',
                borderRadius: 'rounded-full',
                hoverBackgroundColor: 'rgba(255, 255, 255, 0.1)',
                transition: 'all',
                backdropBlur: 'sm'
            }
        }
    },

    // ========== BARRA DE INFORMAÇÕES ==========
    infoBar: {
        delivery: "Delivery e iFood Disponíveis",
        address: "Rua Tibúrcio de Sousa, 1351",
        hours: "Aberto Todos os Dias",

        style: {
            backgroundColor: '#48191B',  // brand-dark
            textColor: '#FFFFFF',
            padding: 'py-4',
            zIndex: 30,
            container: {
                display: 'flex flex-wrap',
                justifyContent: 'center md:justify-between',
                alignItems: 'center',
                gap: 'gap-4',
                fontSize: 'text-sm',
                opacity: '0.9'
            },
            icon: {
                color: '#D4AF37',  // brand-gold
                marginRight: 'mr-2'
            },
            icons: {
                delivery: 'fas fa-motorcycle',
                location: 'fas fa-map-marker-alt',
                hours: 'far fa-clock'
            }
        }
    },

    // ========== SERVIÇOS/ESPECIALIDADES ==========
    services: {
        title: "Nossas Especialidades",
        items: [
            {
                name: "Padaria",
                description: "Pães franceses crocantes, baguetes artesanais e fornadas saindo a toda hora.",
                image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1926&auto=format&fit=crop",
                alt: "Padaria"
            },
            {
                name: "Confeitaria",
                description: "Bolos decorados, doces finos e sobremesas para tornar seu dia mais doce.",
                image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1989&auto=format&fit=crop",
                alt: "Confeitaria"
            },
            {
                name: "Pizzaria",
                description: "Massa leve e recheios generosos. A escolha perfeita para sua noite.",
                image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop",
                alt: "Pizzaria"
            }
        ],

        style: {
            section: {
                padding: 'py-24',
                backgroundColor: '#F9F7F2'  // brand-cream
            },
            header: {
                textAlign: 'center',
                marginBottom: 'mb-16',
                animation: 'fade-up'
            },
            title: {
                fontFamily: '"Playfair Display", serif',
                fontSize: 'text-4xl',
                color: '#48191B',  // brand-dark
                marginBottom: 'mb-4'
            },
            divider: {
                width: 'w-24',
                height: 'h-1',
                backgroundColor: '#48191B',  // brand-dark
                margin: 'mx-auto',
                opacity: '0.2'
            },
            grid: {
                display: 'grid',
                columns: 'md:grid-cols-3',
                gap: 'gap-8'
            },
            card: {
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 'rounded-2xl',
                aspectRatio: '4/5',
                cursor: 'pointer'
            },
            cardImage: {
                width: 'full',
                height: 'full',
                objectFit: 'cover',
                transition: 'transform 500ms ease',
                hoverTransform: 'scale(1.05)'
            },
            cardOverlay: {
                position: 'absolute inset-0',
                background: 'linear-gradient(to top, rgba(72, 25, 27, 0.9), transparent)',
                display: 'flex flex-col',
                justifyContent: 'end',
                padding: 'p-8'
            },
            cardContent: {
                transform: 'translate-y-4',
                transition: 'transform 300ms',
                hoverTransform: 'translate-y-0'
            },
            cardTitle: {
                fontSize: 'text-2xl',
                fontFamily: '"Playfair Display", serif',
                color: '#FFFFFF',
                marginBottom: 'mb-2'
            },
            cardDescription: {
                color: 'rgba(255, 255, 255, 0.8)',  // text-white/80
                fontSize: 'text-sm',
                opacity: '0',
                transition: 'opacity 300ms',
                transitionDelay: '100ms',
                hoverOpacity: '1'
            }
        }
    },

    // ========== DESTAQUE/FEATURED ==========
    featured: {
        badge: "Aceitamos Encomendas",
        title: "Para festas ou para o café da tarde.",
        description: "Seja um bolo de aniversário personalizado, um cento de salgados para sua reunião, ou apenas aquele pão de queijo quentinho. Na Flor da Tibúrcio, cada receita carrega história e carinho.",
        image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=2032&auto=format&fit=crop",
        imageAlt: "Bolo Destaque",
        features: [
            "Ingredientes selecionados",
            "Entrega rápida no Itaim Paulista",
            "Atendimento via WhatsApp"
        ],
        cta: "Encomendar agora →",

        style: {
            section: {
                padding: 'py-24',
                backgroundColor: '#FFFFFF'
            },
            container: {
                display: 'flex flex-col md:flex-row',
                alignItems: 'center',
                gap: 'gap-16'
            },
            imageWrapper: {
                width: 'md:w-1/2',
                position: 'relative',
                animation: 'fade-right'
            },
            decorator: {
                position: 'absolute',
                top: '-top-4',
                left: '-left-4',
                width: 'w-24',
                height: 'h-24',
                backgroundColor: 'rgba(212, 175, 55, 0.2)',  // brand-gold/20
                borderRadius: 'rounded-full',
                zIndex: 0
            },
            image: {
                position: 'relative',
                zIndex: 10,
                borderRadius: 'rounded-lg',
                shadow: '2xl',
                width: 'full'
            },
            content: {
                width: 'md:w-1/2',
                animation: 'fade-left'
            },
            badge: {
                color: '#48191B',  // brand-dark
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: 'widest',
                fontSize: 'text-sm',
                marginBottom: 'mb-2',
                display: 'block'
            },
            title: {
                fontFamily: '"Playfair Display", serif',
                fontSize: 'text-4xl md:text-5xl',
                color: '#48191B',  // brand-dark
                marginBottom: 'mb-6',
                lineHeight: 'tight'
            },
            description: {
                color: '#4B5563',  // gray-600
                marginBottom: 'mb-8',
                lineHeight: 'relaxed'
            },
            featuresList: {
                spacing: 'space-y-4',
                marginBottom: 'mb-8'
            },
            featureItem: {
                display: 'flex',
                alignItems: 'center',
                gap: 'gap-3'
            },
            featureIcon: {
                width: 'w-8',
                height: 'h-8',
                borderRadius: 'rounded-full',
                backgroundColor: 'rgba(212, 175, 55, 0.2)',  // brand-gold/20
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#48191B',  // brand-dark
                icon: 'fas fa-check',
                iconSize: 'text-xs'
            },
            featureText: {
                color: '#374151',  // gray-700
                fontWeight: 'medium'
            },
            cta: {
                display: 'inline-block',
                borderBottom: '2px solid #48191B',  // border-brand-dark
                color: '#48191B',  // brand-dark
                fontFamily: '"Playfair Display", serif',
                fontSize: 'text-xl',
                paddingBottom: 'pb-1',
                hoverColor: '#D4AF37',  // brand-gold
                hoverBorderColor: '#D4AF37',  // border-brand-gold
                transition: 'colors'
            }
        }
    },

    // ========== CTA (CALL TO ACTION) ==========
    cta: {
        title: "Fome de coisa boa?",
        subtitle: "Peça pelo iFood ou diretamente conosco pelo WhatsApp. Entregamos o sabor da Flor da Tibúrcio na sua casa.",
        whatsappButton: "Pedir no WhatsApp",
        ifoodButton: "Pedir no iFood",

        style: {
            section: {
                padding: 'py-20',
                backgroundColor: '#48191B',  // brand-dark
                textColor: '#FFFFFF',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            },
            patternOverlay: {
                position: 'absolute inset-0',
                opacity: '0.1',
                backgroundImage: 'url(https://www.transparenttextures.com/patterns/food.png)'
            },
            container: {
                position: 'relative',
                zIndex: 10
            },
            title: {
                fontFamily: '"Playfair Display", serif',
                fontSize: 'text-3xl md:text-5xl',
                marginBottom: 'mb-6'
            },
            subtitle: {
                color: 'rgba(255, 255, 255, 0.7)',  // text-white/70
                fontSize: 'text-lg',
                marginBottom: 'mb-10',
                maxWidth: 'max-w-2xl',
                margin: 'mx-auto'
            },
            buttons: {
                display: 'flex flex-col sm:flex-row',
                justifyContent: 'center',
                gap: 'gap-4'
            },
            whatsappButton: {
                padding: 'px-8 py-4',
                backgroundColor: '#10B981',  // green-500
                textColor: '#FFFFFF',
                fontWeight: 'bold',
                borderRadius: 'rounded-full',
                hoverBackgroundColor: '#059669',  // green-600
                transition: 'all',
                shadow: 'lg',
                transform: 'hover:scale(1.05)',
                icon: 'fab fa-whatsapp',
                iconSize: 'text-xl'
            },
            ifoodButton: {
                padding: 'px-8 py-4',
                backgroundColor: '#DC2626',  // red-600
                textColor: '#FFFFFF',
                fontWeight: 'bold',
                borderRadius: 'rounded-full',
                hoverBackgroundColor: '#B91C1C',  // red-700
                transition: 'all',
                shadow: 'lg',
                transform: 'hover:scale(1.05)',
                cursor: 'default',
                icon: 'fas fa-utensils'
            }
        }
    },

    // ========== FOOTER/RODAPÉ ==========
    footer: {
        title: "Visite-nos",
        addressLabel: "Endereço",
        contactLabel: "Contato",
        copyright: "© 2025 Padaria Flor da Tibúrcio. Todos os direitos reservados.",
        categories: ["Padaria", "Confeitaria", "Pizzaria"],

        style: {
            section: {
                backgroundColor: '#F9F7F2',  // brand-cream
                borderTop: '1px solid rgba(72, 25, 27, 0.1)',  // border-brand-dark/10
                paddingTop: 'pt-20',
                paddingBottom: 'pb-10'
            },
            grid: {
                display: 'grid',
                columns: 'md:grid-cols-2',
                gap: 'gap-12',
                alignItems: 'center',
                marginBottom: 'mb-16'
            },
            title: {
                fontFamily: '"Playfair Display", serif',
                fontSize: 'text-3xl',
                color: '#48191B',  // brand-dark
                marginBottom: 'mb-6'
            },
            address: {
                fontStyle: 'not-italic',
                color: '#4B5563',  // gray-600
                spacing: 'space-y-4',
                marginBottom: 'mb-8'
            },
            addressItem: {
                display: 'flex',
                alignItems: 'start',
                gap: 'gap-4'
            },
            addressIcon: {
                marginTop: 'mt-1',
                color: '#48191B',  // brand-dark
                icons: {
                    location: 'fas fa-map-pin',
                    phone: 'fas fa-phone-alt'
                }
            },
            addressLabel: {
                display: 'block',
                color: '#111827',  // gray-900
                marginBottom: 'mb-1',
                fontWeight: 'bold'
            },
            socialButtons: {
                display: 'flex',
                gap: 'gap-4'
            },
            socialButton: {
                width: 'w-12',
                height: 'h-12',
                borderRadius: 'rounded-full',
                border: '1px solid #48191B',  // border-brand-dark
                color: '#48191B',  // brand-dark
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                hoverBackgroundColor: '#48191B',  // brand-dark
                hoverTextColor: '#FFFFFF',
                transition: 'all',
                icons: {
                    instagram: 'fab fa-instagram',
                    facebook: 'fab fa-facebook-f'
                },
                iconSize: 'text-xl'
            },
            map: {
                display: 'block',
                height: 'h-80',
                width: 'full',
                backgroundColor: '#E5E7EB',  // gray-200
                borderRadius: 'rounded-2xl',
                overflow: 'hidden',
                position: 'relative',
                shadow: 'inner'
            },
            mapIframe: {
                width: 'full',
                height: 'full',
                filter: 'grayscale(100%)',
                transition: 'all 500ms',
                hoverFilter: 'grayscale(0%)'
            },
            mapOverlay: {
                position: 'absolute inset-0',
                backgroundColor: 'rgba(72, 25, 27, 0.1)',  // brand-dark/10
                hoverBackgroundColor: 'transparent',
                transition: 'colors',
                pointerEvents: 'none'
            },
            bottom: {
                borderTop: '1px solid #D1D5DB',  // gray-300
                paddingTop: 'pt-8',
                display: 'flex flex-col md:flex-row',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: 'text-sm',
                color: '#6B7280'  // gray-500
            },
            categories: {
                marginTop: 'mt-2 md:mt-0',
                separator: ' • '
            }
        }
    }
};
